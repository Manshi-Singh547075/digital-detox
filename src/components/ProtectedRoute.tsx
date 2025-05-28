import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkUserProfile = async () => {
      if (user) {
        try {
          console.log('Checking comprehensive profile for user:', user.id);
          
          // Check for comprehensive profile data including digital wellness info
          const { data: profile, error } = await supabase
            .from('profiles')
            .select(`
              full_name, 
              username,
              age,
              role,
              primary_goal,
              daily_screen_time_goal,
              concerns,
              has_children,
              children_ages,
              current_screen_time,
              device_usage,
              app_preferences,
              onboarding_completed
            `)
            .eq('id', user.id)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
            setHasCompletedOnboarding(false);
          } else if (!profile) {
            console.log('No profile found, user needs to complete profile setup');
            setHasCompletedOnboarding(false);
          } else {
            // More lenient check - primarily rely on onboarding_completed flag
            // but also verify essential data exists
            const hasEssentialData = Boolean(
              profile.full_name && 
              profile.username && 
              profile.age &&
              profile.role &&
              profile.primary_goal &&
              profile.daily_screen_time_goal &&
              profile.current_screen_time
            );
            
            // If onboarding_completed is explicitly true, trust it
            // Otherwise, check if essential data exists
            const isOnboardingComplete = profile.onboarding_completed === true || hasEssentialData;
            
            console.log('Profile data:', profile);
            console.log('Has essential data:', hasEssentialData);
            console.log('onboarding_completed flag:', profile.onboarding_completed);
            console.log('Final onboarding status:', isOnboardingComplete);
            
            setHasCompletedOnboarding(isOnboardingComplete);
          }
        } catch (error) {
          console.error('Profile check error:', error);
          setHasCompletedOnboarding(false);
        }
      }
      setProfileLoading(false);
    };

    if (user && !loading) {
      checkUserProfile();
    } else if (!loading) {
      setProfileLoading(false);
    }
  }, [user, loading, location.pathname]); // Add location.pathname to dependencies

  // Show loading state while checking auth and profile
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading your digital wellness dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Setting up your personalized experience</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    console.log('No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // If user hasn't completed comprehensive onboarding and is not already on the profile setup page
  if (!hasCompletedOnboarding && location.pathname !== '/profile-setup') {
    console.log('Redirecting to profile setup, comprehensive onboarding incomplete');
    return <Navigate to="/profile-setup" replace />;
  }

  // If user has completed onboarding but is on the profile setup page, redirect to dashboard
  if (hasCompletedOnboarding && location.pathname === '/profile-setup') {
    console.log('User has completed comprehensive onboarding, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
