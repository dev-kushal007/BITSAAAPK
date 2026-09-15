import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Eye, Lock, Info, CheckCircle2, Globe, Users, Building2, EyeOff, Download, UserX, FileText, MessagesSquare, UserCheck, Briefcase, Calendar, Network } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';

interface PrivacySettingsProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

type VisibilityLevel = 'public' | 'approval' | 'chapter-leaders' | 'hidden';
type DiscoveryMode = 'discoverable' | 'private' | 'event' | 'chapter';
type ContactMethod = 'in-app' | 'linkedin' | 'email' | 'phone' | 'request';

interface FieldVisibility {
  email: VisibilityLevel;
  phone: VisibilityLevel;
  linkedin: VisibilityLevel;
  location: VisibilityLevel;
  company: VisibilityLevel;
  jobTitle: VisibilityLevel;
}

export function PrivacySettings({ userRole }: PrivacySettingsProps) {
  // Field-level visibility (with defaults as specified)
  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>({
    email: 'approval',      // default: Approval basis
    phone: 'hidden',        // default: Hidden
    linkedin: 'public',     // default: Public
    location: 'public',     // default: Public
    company: 'public',      // default: Public
    jobTitle: 'public'      // default: Public
  });

  // Profile Discovery Mode
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>('discoverable');

  // Preferred Contact Method
  const [preferredContact, setPreferredContact] = useState<ContactMethod>('in-app');

  // Communication Privacy
  const [requireMessageApproval, setRequireMessageApproval] = useState(true);
  const [allowContactRequests, setAllowContactRequests] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(false);

  // Open to...
  const [openToNetworking, setOpenToNetworking] = useState(true);
  const [openToMentoring, setOpenToMentoring] = useState(false);
  const [openToJobReferrals, setOpenToJobReferrals] = useState(false);
  const [openToChapterEvents, setOpenToChapterEvents] = useState(true);

  const visibilityOptions: { value: VisibilityLevel; label: string; icon: any; color: string }[] = [
    { value: 'public', label: 'Public (all alumni)', icon: Globe, color: 'text-green-600' },
    { value: 'approval', label: 'Approval basis', icon: UserCheck, color: 'text-blue-600' },
    { value: 'chapter-leaders', label: 'Chapter Leaders Only', icon: Building2, color: 'text-orange-600' },
    { value: 'hidden', label: 'Hidden', icon: EyeOff, color: 'text-red-600' }
  ];

  const handleFieldVisibilityChange = (field: keyof FieldVisibility, value: VisibilityLevel) => {
    setFieldVisibility({
      ...fieldVisibility,
      [field]: value
    });
  };

  const getVisibilityColor = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return 'text-green-600';
      case 'approval': return 'text-blue-600';
      case 'chapter-leaders': return 'text-orange-600';
      case 'hidden': return 'text-red-600';
    }
  };

  const getVisibilityIcon = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return Globe;
      case 'approval': return UserCheck;
      case 'chapter-leaders': return Building2;
      case 'hidden': return EyeOff;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Privacy Mode Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-[#8B1538]" />
            <CardTitle>Profile Discovery Mode</CardTitle>
          </div>
          <CardDescription>
            Master control for how your profile appears in searches and directories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 border-[#8B1538]/20 bg-[#8B1538]/5">
            <Info className="w-4 h-4 text-[#8B1538]" />
            <AlertDescription>
              Your privacy is our priority. All settings are enforced at the server level and your data is encrypted.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {[
              {
                value: 'discoverable',
                title: 'Fully Discoverable',
                description: 'Your profile is visible to all alumni based on your field settings below',
                icon: Globe
              },
              {
                value: 'private',
                title: 'Private Mode',
                description: 'Invisible in directory searches. Only direct connections can see you',
                icon: Lock
              },
              {
                value: 'event',
                title: 'Event Mode',
                description: 'Visible only during event participation to co-attendees',
                icon: Calendar
              },
              {
                value: 'chapter',
                title: 'Chapter Mode',
                description: 'Visible only to members of your city chapter',
                icon: Building2
              }
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.value}
                  onClick={() => setDiscoveryMode(mode.value as DiscoveryMode)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    discoveryMode === mode.value
                      ? 'border-[#8B1538] bg-[#8B1538]/5'
                      : 'border-border hover:border-[#8B1538]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`w-5 h-5 mt-0.5 ${discoveryMode === mode.value ? 'text-[#8B1538]' : 'text-muted-foreground'}`} />
                      <div>
                        <h4 className="font-medium">{mode.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{mode.description}</p>
                      </div>
                    </div>
                    {discoveryMode === mode.value && (
                      <CheckCircle2 className="w-5 h-5 text-[#8B1538] flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Field-Level Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Per-Field Visibility Controls</CardTitle>
          <CardDescription>
            Set visibility for each contact field independently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { field: 'email' as keyof FieldVisibility, label: 'Email Address', sensitive: true },
            { field: 'phone' as keyof FieldVisibility, label: 'Phone Number', sensitive: true },
            { field: 'linkedin' as keyof FieldVisibility, label: 'LinkedIn Profile', sensitive: false },
            { field: 'location' as keyof FieldVisibility, label: 'Current City/Location', sensitive: false },
            { field: 'company' as keyof FieldVisibility, label: 'Current Company', sensitive: false },
            { field: 'jobTitle' as keyof FieldVisibility, label: 'Job Title/Role', sensitive: false }
          ].map(({ field, label, sensitive }) => {
            const currentVisibility = fieldVisibility[field];
            const Icon = getVisibilityIcon(currentVisibility);
            
            return (
              <div
                key={field}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className={`w-4 h-4 ${getVisibilityColor(currentVisibility)}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{label}</Label>
                      {sensitive && (
                        <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                          <Lock className="w-3 h-3 mr-1" />
                          Sensitive
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentVisibility === 'public' && '🟢 Visible to all alumni'}
                      {currentVisibility === 'approval' && '🔵 Requires approval to view'}
                      {currentVisibility === 'chapter-leaders' && '🟠 Chapter leaders only'}
                      {currentVisibility === 'hidden' && '🔴 Completely hidden'}
                    </p>
                  </div>
                </div>
                <Select
                  value={currentVisibility}
                  onValueChange={(value) => handleFieldVisibilityChange(field, value as VisibilityLevel)}
                >
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visibilityOptions.map((option) => {
                      const OptionIcon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <OptionIcon className={`w-3.5 h-3.5 ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Preferred Contact Method */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Contact Method</CardTitle>
          <CardDescription>
            Choose how other alumni should reach you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                value: 'in-app',
                title: 'In-app messages only',
                description: 'Most secure - no personal details shared',
                icon: MessagesSquare,
                badge: 'Recommended'
              },
              {
                value: 'linkedin',
                title: 'LinkedIn only',
                description: 'Connect via LinkedIn profile',
                icon: Network
              },
              {
                value: 'email',
                title: 'Email (requires approval)',
                description: 'Share email after approval',
                icon: Eye
              },
              {
                value: 'phone',
                title: 'Phone (requires approval)',
                description: 'Share phone number after approval',
                icon: Eye
              },
              {
                value: 'request',
                title: 'Contact requests required',
                description: 'All contact attempts need explicit approval',
                icon: Lock
              }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.value}
                  onClick={() => setPreferredContact(method.value as ContactMethod)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    preferredContact === method.value
                      ? 'border-[#8B1538] bg-[#8B1538]/5'
                      : 'border-border hover:border-[#8B1538]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`w-5 h-5 mt-0.5 ${preferredContact === method.value ? 'text-[#8B1538]' : 'text-muted-foreground'}`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{method.title}</h4>
                          {method.badge && (
                            <Badge variant="secondary" className="text-xs">{method.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    {preferredContact === method.value && (
                      <CheckCircle2 className="w-5 h-5 text-[#8B1538] flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Privacy</CardTitle>
          <CardDescription>
            Control how others can interact with you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Require approval before anyone can message me</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Messages from new contacts will go to a "Message Requests" folder for your approval
              </p>
            </div>
            <Switch
              checked={requireMessageApproval}
              onCheckedChange={setRequireMessageApproval}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Allow contact requests</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Let alumni request access to your private contact information
              </p>
            </div>
            <Switch
              checked={allowContactRequests}
              onCheckedChange={setAllowContactRequests}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Show online status</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Display when you're active on the platform
              </p>
            </div>
            <Switch
              checked={showOnlineStatus}
              onCheckedChange={setShowOnlineStatus}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Open to... */}
      <Card>
        <CardHeader>
          <CardTitle>Open to...</CardTitle>
          <CardDescription>
            Let others know what you're open to receiving
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Networking</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Allows fellow BITSians to reach out to you via messaging for networking
              </p>
            </div>
            <Switch
              checked={openToNetworking}
              onCheckedChange={setOpenToNetworking}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Mentoring</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Allows fellow BITSians to reach out for mentorship requests & enroll in BITSAA Mentorship program
              </p>
            </div>
            <Switch
              checked={openToMentoring}
              onCheckedChange={setOpenToMentoring}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Providing Job Referrals</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Allows fellow BITSians to reach out to you for job referrals at your company
              </p>
            </div>
            <Switch
              checked={openToJobReferrals}
              onCheckedChange={setOpenToJobReferrals}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>

          <Separator />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#8B1538]" />
                <Label className="font-medium">Attending Chapter Events</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive notifications for chapter events in your city
              </p>
            </div>
            <Switch
              checked={openToChapterEvents}
              onCheckedChange={setOpenToChapterEvents}
              className="data-[state=checked]:bg-[#8B1538]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your data and account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Download className="w-4 h-4 text-[#8B1538]" />
                  <span className="font-medium">Download my data</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Export all your information
                </p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <UserX className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Disable account</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Temporarily deactivate
                </p>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#8B1538]" />
                  <span className="font-medium">Privacy audit log</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  View access history
                </p>
              </div>
            </Button>
          </div>

          <Alert className="border-[#8B1538]/20 bg-[#8B1538]/5">
            <Shield className="w-4 h-4 text-[#8B1538]" />
            <AlertDescription>
              <strong>Your data is protected:</strong> All personal information is encrypted at rest and in transit. Privacy settings are enforced server-side. You maintain full control over your data.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
