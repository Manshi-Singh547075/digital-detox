
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Target, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalysisData {
  insights: string[];
  trends: string;
  recommendations: string[];
  risks: string[];
  goalProgress: number;
  suggestedTargets: {
    daily: number;
    weekly?: number;
  };
}

interface RealTimeAnalysisProps {
  profile: any;
}

const RealTimeAnalysis = ({ profile }: RealTimeAnalysisProps) => {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { user } = useAuth();

  const fetchAnalysis = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-screen-time', {
        body: {
          userId: user.id,
          timeRange: '7days'
        }
      });

      if (error) throw error;

      if (data.success) {
        setAnalysis(data.analysis);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchAnalysis, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const getTrendIcon = () => {
    if (!analysis) return <Brain className="w-5 h-5" />;
    
    if (analysis.trends.toLowerCase().includes('improving') || analysis.goalProgress > 80) {
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    } else if (analysis.trends.toLowerCase().includes('declining') || analysis.goalProgress < 40) {
      return <TrendingDown className="w-5 h-5 text-red-600" />;
    }
    return <TrendingUp className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Analysis Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <CardTitle>AI-Powered Real-Time Analysis</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchAnalysis}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {lastUpdated && (
                <Badge variant="secondary">
                  Updated {lastUpdated.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            Powered by Gemini AI • Real-time insights for {profile?.full_name || 'your'} digital wellness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Analyzing your data...</span>
            </div>
          ) : analysis ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{analysis.goalProgress}%</div>
                <p className="text-sm text-green-700">Goal Achievement</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center text-2xl font-bold text-blue-600">
                  {getTrendIcon()}
                </div>
                <p className="text-sm text-blue-700">Trend Analysis</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{analysis.suggestedTargets.daily}h</div>
                <p className="text-sm text-purple-700">AI Suggested Target</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click refresh to get your personalized AI analysis
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights Cards */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {analysis.risks.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Areas to Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.risks.map((risk, index) => (
                    <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800">{risk}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default RealTimeAnalysis;
