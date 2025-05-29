
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, Target, Palette, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
  onProfileUpdate: () => void;
}

const SettingsModal = ({ open, onOpenChange, profile, onProfileUpdate }: SettingsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    age: '',
    primary_goal: '',
    daily_screen_time_goal: '',
    device_usage: '',
    app_preferences: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly_reports: true,
    goal_reminders: true
  });
  const [privacy, setPrivacy] = useState({
    data_sharing: false,
    analytics: true,
    public_profile: false
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        age: profile.age?.toString() || '',
        primary_goal: profile.primary_goal || '',
        daily_screen_time_goal: profile.daily_screen_time_goal?.toString() || '',
        device_usage: profile.device_usage || '',
        app_preferences: profile.app_preferences || ''
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          username: formData.username,
          age: parseInt(formData.age) || null,
          primary_goal: formData.primary_goal,
          daily_screen_time_goal: parseInt(formData.daily_screen_time_goal) || null,
          device_usage: formData.device_usage,
          app_preferences: formData.app_preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: "Your profile settings have been saved successfully.",
      });
      onProfileUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Settings & Preferences
          </DialogTitle>
          <DialogDescription>
            Manage your account settings, preferences, and privacy options
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your basic profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device_usage">Primary Device</Label>
                    <Select value={formData.device_usage} onValueChange={(value) => setFormData({ ...formData, device_usage: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary device" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="multiple">Multiple Devices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Wellness Goals</CardTitle>
                <CardDescription>Set your personal targets and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_goal">Primary Goal</Label>
                  <Select value={formData.primary_goal} onValueChange={(value) => setFormData({ ...formData, primary_goal: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reduce-usage">Reduce Screen Time</SelectItem>
                      <SelectItem value="better-balance">Better Work-Life Balance</SelectItem>
                      <SelectItem value="family-time">More Family Time</SelectItem>
                      <SelectItem value="productivity">Increase Productivity</SelectItem>
                      <SelectItem value="sleep-better">Better Sleep Quality</SelectItem>
                      <SelectItem value="mindfulness">Digital Mindfulness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daily_goal">Daily Screen Time Goal (hours)</Label>
                  <Input
                    id="daily_goal"
                    type="number"
                    value={formData.daily_screen_time_goal}
                    onChange={(e) => setFormData({ ...formData, daily_screen_time_goal: e.target.value })}
                    placeholder="Enter your daily goal"
                    min="1"
                    max="24"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app_preferences">App Categories of Interest</Label>
                  <Select value={formData.app_preferences} onValueChange={(value) => setFormData({ ...formData, app_preferences: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity Apps</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="games">Gaming</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="education">Educational</SelectItem>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive updates and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Real-time alerts and reminders</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly usage summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weekly_reports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weekly_reports: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Goal Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders about your daily goals</p>
                  </div>
                  <Switch
                    checked={notifications.goal_reminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, goal_reminders: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                  </div>
                  <Switch
                    checked={privacy.data_sharing}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, data_sharing: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage analytics</p>
                  </div>
                  <Switch
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={privacy.public_profile}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, public_profile: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
