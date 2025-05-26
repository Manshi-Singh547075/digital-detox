
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
          console.log('Checking profile for user:', user.id);
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name, username')
            .eq('id', user.id)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
            setHasCompletedOnboarding(false);
          } else if (!profile) {
            // Profile doesn't exist, user needs to complete setup
            console.log('No profile found, redirecting to profile setup');
            setHasCompletedOnboarding(false);
          } else {
            // Check if user has completed basic onboarding (has full_name and username)
            const isComplete = profile?.full_name && profile?.username;
            console.log('Profile found:', profile, 'Is complete:', isComplete);
            setHasCompletedOnboarding(!!isComplete);
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
  }, [user, loading]);

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

  if (!user) {
    console.log('No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // If user hasn't completed onboarding and is not already on the profile setup page
  if (!hasCompletedOnboarding && location.pathname !== '/profile-setup') {
    console.log('Redirecting to profile setup, hasCompletedOnboarding:', hasCompletedOnboarding);
    return <Navigate to="/profile-setup" replace />;
  }

  // If user has completed onboarding but is on the profile setup page, redirect to dashboard
  if (hasCompletedOnboarding && location.pathname === '/profile-setup') {
    console.log('User has completed onboarding, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
