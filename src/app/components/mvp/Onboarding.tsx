import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Checkbox } from '../ui/checkbox';
import { Shield, CheckCircle2, Mail, Lock, User, GraduationCap, Briefcase, Target, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface OnboardingProps {
  onComplete: () => void;
}

type OnboardingStep = 'email' | 'verify' | 'basic' | 'privacy' | 'contact' | 'interests' | 'welcome';

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [profile, setProfile] = useState({
    fullName: '',
    batch: '',
    campus: '',
    degree: '',
    branch: ''
  });
  const [privacyMode, setPrivacyMode] = useState<'high' | 'moderate' | 'open'>('high');
  const [contactDetails, setContactDetails] = useState({
    personalEmail: '',
    phone: '',
    linkedin: ''
  });
  const [interests, setInterests] = useState({
    networking: false,
    jobOpportunities: false,
    mentorship: false,
    seekingMentorship: false,
    relocating: false,
    chapterEvents: false,
    reconnecting: false,
    givingBack: false
  });

  const steps: OnboardingStep[] = ['email', 'verify', 'basic', 'privacy', 'contact', 'interests', 'welcome'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleEmailSubmit = () => {
    // Validate BITS email
    const bitsEmailPattern = /@(pilani|goa|hyderabad|dubai)\.bits-pilani\.ac\.in$/;
    if (bitsEmailPattern.test(email)) {
      setCurrentStep('verify');
      // Send verification code
    }
  };

  const handleVerifySubmit = () => {
    // Verify code
    if (verificationCode.length === 6) {
      setCurrentStep('basic');
    }
  };

  const handleBasicSubmit = () => {
    if (profile.fullName && profile.batch && profile.campus && profile.degree && profile.branch) {
      setCurrentStep('privacy');
    }
  };

  const handlePrivacySubmit = () => {
    setCurrentStep('contact');
  };

  const handleContactSubmit = () => {
    setCurrentStep('interests');
  };

  const handleInterestsSubmit = () => {
    setCurrentStep('welcome');
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B1538]/5 via-white to-[#8B1538]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {currentStep !== 'welcome' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-[#8B1538]">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Step 1: Email Verification */}
        {currentStep === 'email' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Welcome to BITSAA Alumni Platform</CardTitle>
              <CardDescription className="text-base mt-2">
                Let's get started by verifying your BITS Pilani email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">BITS Pilani Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@pilani.bits-pilani.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Accepted domains: @pilani, @goa, @hyderabad, or @dubai.bits-pilani.ac.in
                </p>
              </div>

              <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#8B1538] mb-1">
                      Why BITS email only?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      We verify all alumni through official BITS email addresses to maintain a trusted and secure community.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleEmailSubmit}
                disabled={!email.match(/@(pilani|goa|hyderabad|dubai)\.bits-pilani\.ac\.in$/)}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90"
              >
                Send Verification Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Verify Code */}
        {currentStep === 'verify' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Enter Verification Code</CardTitle>
              <CardDescription className="text-base mt-2">
                We've sent a 6-digit code to<br />
                <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center">
                <Button variant="link" className="text-[#8B1538]">
                  Didn't receive the code? Resend
                </Button>
              </div>

              <Button
                onClick={handleVerifySubmit}
                disabled={verificationCode.length !== 6}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90"
              >
                Verify & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Basic Profile */}
        {currentStep === 'basic' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Create Your Profile</CardTitle>
              <CardDescription className="text-base mt-2">
                Tell us about your time at BITS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch/Year *</Label>
                  <Select value={profile.batch} onValueChange={(value) => setProfile({ ...profile, batch: value })}>
                    <SelectTrigger id="batch">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campus">Campus *</Label>
                  <Select value={profile.campus} onValueChange={(value) => setProfile({ ...profile, campus: value })}>
                    <SelectTrigger id="campus">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pilani">Pilani</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Dubai">Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Degree *</Label>
                <Select value={profile.degree} onValueChange={(value) => setProfile({ ...profile, degree: value })}>
                  <SelectTrigger id="degree">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B.E.(Hons.)">B.E. (Hons.)</SelectItem>
                    <SelectItem value="M.Sc.(Hons.)">M.Sc. (Hons.)</SelectItem>
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="M.E.">M.E.</SelectItem>
                    <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch/Discipline *</Label>
                <Select value={profile.branch} onValueChange={(value) => setProfile({ ...profile, branch: value })}>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical & Electronics">Electrical & Electronics</SelectItem>
                    <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="Civil">Civil Engineering</SelectItem>
                    <SelectItem value="Chemical">Chemical Engineering</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleBasicSubmit}
                disabled={!profile.fullName || !profile.batch || !profile.campus || !profile.degree || !profile.branch}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Privacy Setup */}
        {currentStep === 'privacy' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Set Your Privacy Preferences</CardTitle>
              <CardDescription className="text-base mt-2">
                We prioritize your safety. Choose how visible you want to be
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                onClick={() => setPrivacyMode('high')}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  privacyMode === 'high'
                    ? 'border-[#8B1538] bg-[#8B1538]/5'
                    : 'border-border hover:border-[#8B1538]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Lock className={`w-5 h-5 mt-0.5 ${privacyMode === 'high' ? 'text-[#8B1538]' : 'text-muted-foreground'}`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">High Privacy</h4>
                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        → Only name and batch visible<br />
                        → All contact info hidden<br />
                        → Require approval for messages
                      </p>
                    </div>
                  </div>
                  {privacyMode === 'high' && (
                    <CheckCircle2 className="w-5 h-5 text-[#8B1538] flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPrivacyMode('moderate')}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  privacyMode === 'moderate'
                    ? 'border-[#8B1538] bg-[#8B1538]/5'
                    : 'border-border hover:border-[#8B1538]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Eye className={`w-5 h-5 mt-0.5 ${privacyMode === 'moderate' ? 'text-[#8B1538]' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="font-medium mb-1">Moderate Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        → Basic profile visible<br />
                        → Contact info requires approval
                      </p>
                    </div>
                  </div>
                  {privacyMode === 'moderate' && (
                    <CheckCircle2 className="w-5 h-5 text-[#8B1538] flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPrivacyMode('open')}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  privacyMode === 'open'
                    ? 'border-[#8B1538] bg-[#8B1538]/5'
                    : 'border-border hover:border-[#8B1538]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <User className={`w-5 h-5 mt-0.5 ${privacyMode === 'open' ? 'text-[#8B1538]' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="font-medium mb-1">Open Networker</h4>
                      <p className="text-sm text-muted-foreground">
                        → Full profile visible to all alumni<br />
                        → Direct messaging enabled
                      </p>
                    </div>
                  </div>
                  {privacyMode === 'open' && (
                    <CheckCircle2 className="w-5 h-5 text-[#8B1538] flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>

              <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      💡 You can change these settings anytime from your privacy settings
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePrivacySubmit}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90"
              >
                Continue with {privacyMode === 'high' ? 'High Privacy' : privacyMode === 'moderate' ? 'Moderate Privacy' : 'Open Networker'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Contact Information */}
        {currentStep === 'contact' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Add Contact Details</CardTitle>
              <CardDescription className="text-base mt-2">
                Optional - These details will follow your privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personalEmail">Personal Email (Optional)</Label>
                <Input
                  id="personalEmail"
                  type="email"
                  value={contactDetails.personalEmail}
                  onChange={(e) => setContactDetails({ ...contactDetails, personalEmail: e.target.value })}
                  placeholder="john.doe@gmail.com"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  Visibility: Approval basis (as per your privacy settings)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  Visibility: Hidden (as per your privacy settings)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                <Input
                  id="linkedin"
                  value={contactDetails.linkedin}
                  onChange={(e) => setContactDetails({ ...contactDetails, linkedin: e.target.value })}
                  placeholder="linkedin.com/in/johndoe"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Visibility: Public (as per your privacy settings)
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleContactSubmit}
                  className="flex-1"
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleContactSubmit}
                  className="flex-1 bg-[#8B1538] hover:bg-[#8B1538]/90"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Interests & Goals */}
        {currentStep === 'interests' && (
          <Card className="border-[#8B1538]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">What brings you here?</CardTitle>
              <CardDescription className="text-base mt-2">
                Select all that apply - helps us personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { key: 'networking', label: 'Networking with alumni', icon: User },
                  { key: 'jobOpportunities', label: 'Finding job opportunities', icon: Briefcase },
                  { key: 'mentorship', label: 'Offering mentorship', icon: GraduationCap },
                  { key: 'seekingMentorship', label: 'Seeking mentorship', icon: Target },
                  { key: 'relocating', label: 'Relocating to new city', icon: ArrowRight },
                  { key: 'chapterEvents', label: 'Chapter events & meetups', icon: User },
                  { key: 'reconnecting', label: 'Reconnecting with batchmates', icon: User },
                  { key: 'givingBack', label: 'Giving back to BITS', icon: GraduationCap }
                ].map((interest) => {
                  const Icon = interest.icon;
                  return (
                    <div
                      key={interest.key}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                    >
                      <Checkbox
                        id={interest.key}
                        checked={interests[interest.key as keyof typeof interests]}
                        onCheckedChange={(checked) =>
                          setInterests({ ...interests, [interest.key]: checked })
                        }
                        className="data-[state=checked]:bg-[#8B1538] data-[state=checked]:border-[#8B1538]"
                      />
                      <Label
                        htmlFor={interest.key}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <Icon className="w-4 h-4 text-[#8B1538]" />
                        {interest.label}
                      </Label>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={handleInterestsSubmit}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90 mt-6"
              >
                Finish Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Welcome */}
        {currentStep === 'welcome' && (
          <Card className="border-[#8B1538]/20">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-[#8B1538] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-medium mb-3">🎉 Welcome to BITSAA!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your profile is set with <strong>{privacyMode === 'high' ? 'High Privacy Mode' : privacyMode === 'moderate' ? 'Moderate Privacy' : 'Open Networker Mode'}</strong>
              </p>

              <div className="bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#8B1538] mb-2">Your Privacy Settings:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ {privacyMode === 'high' ? 'Only your name and batch are visible' : 'Basic profile information is visible'}</li>
                      <li>✓ {privacyMode === 'high' ? 'Contact details are private' : 'Contact details require approval'}</li>
                      <li>✓ {privacyMode === 'high' ? 'You control who can message you' : 'Alumni can message you directly'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Ready to explore the platform?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <Button variant="outline" className="h-auto py-4">
                  <div className="text-left w-full">
                    <p className="font-medium">Browse Alumni</p>
                    <p className="text-xs text-muted-foreground">Find BITSians</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4">
                  <div className="text-left w-full">
                    <p className="font-medium">Find Mentors</p>
                    <p className="text-xs text-muted-foreground">Get guidance</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4">
                  <div className="text-left w-full">
                    <p className="font-medium">Discover Events</p>
                    <p className="text-xs text-muted-foreground">Join meetups</p>
                  </div>
                </Button>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-[#8B1538] hover:bg-[#8B1538]/90"
                size="lg"
              >
                Enter BITSAA Platform
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
