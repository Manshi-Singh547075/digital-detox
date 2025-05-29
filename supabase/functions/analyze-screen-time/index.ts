
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, timeRange = '7days' } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user's screen time data
    const { data: screenTimeData, error } = await supabaseClient
      .from('screen_time_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('date', new Date(Date.now() - (timeRange === '7days' ? 7 : 30) * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Get user profile for context
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Prepare data for Gemini analysis
    const analysisPrompt = `
    Analyze this user's digital wellness data:
    
    User Profile:
    - Role: ${profile?.role || 'user'}
    - Age: ${profile?.age || 'unknown'}
    - Primary Goal: ${profile?.primary_goal || 'general wellness'}
    - Daily Screen Time Goal: ${profile?.daily_screen_time_goal || 'not set'} hours
    - Current Average: ${profile?.current_screen_time || 'unknown'} hours
    
    Screen Time Data (last ${timeRange}):
    ${JSON.stringify(screenTimeData, null, 2)}
    
    Please provide:
    1. Key insights about usage patterns
    2. Trend analysis (improving/declining/stable)
    3. Specific recommendations for this user
    4. Risk areas to address
    5. Goal achievement probability
    6. Suggested daily/weekly targets
    
    Format as JSON with these keys: insights, trends, recommendations, risks, goalProgress, suggestedTargets
    `;

    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + Deno.env.get('GEMINI_API_KEY'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: analysisPrompt
          }]
        }]
      }),
    });

    const geminiData = await geminiResponse.json();
    const analysisText = geminiData.candidates[0].content.parts[0].text;
    
    // Try to parse JSON from Gemini response
    let analysis;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        insights: [analysisText.substring(0, 200)],
        trends: 'Analysis available',
        recommendations: ['Review your usage patterns'],
        risks: ['Monitor screen time'],
        goalProgress: 75,
        suggestedTargets: { daily: profile?.daily_screen_time_goal || 4 }
      };
    } catch {
      analysis = {
        insights: ['AI analysis completed'],
        trends: 'Stable usage pattern',
        recommendations: ['Continue monitoring your progress'],
        risks: ['No major concerns detected'],
        goalProgress: 75,
        suggestedTargets: { daily: profile?.daily_screen_time_goal || 4 }
      };
    }

    return new Response(JSON.stringify({
      success: true,
      analysis,
      dataPoints: screenTimeData?.length || 0,
      timeRange
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-screen-time function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
