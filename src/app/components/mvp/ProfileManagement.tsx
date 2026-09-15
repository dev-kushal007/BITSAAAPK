import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Camera, Save, Edit, Plus, X, Shield, Eye, EyeOff, Lock, Globe, UserCheck, Building2 } from 'lucide-react';

interface ProfileManagementProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
}

type VisibilityLevel = 'public' | 'approval' | 'chapter-leaders' | 'hidden';

export function ProfileManagement({ userRole }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(['Machine Learning', 'Python', 'Cloud Architecture']);
  const [newSkill, setNewSkill] = useState('');

  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    batch: '2015',
    campus: 'Pilani',
    degree: 'B.E. Computer Science',
    company: 'Google India',
    role: 'Senior Software Engineer',
    location: 'Bengaluru, India',
    bio: 'Passionate about building scalable systems and mentoring junior developers. Love to connect with fellow BITSians!',
    linkedin: 'linkedin.com/in/rajeshkumar',
    availableForMentorship: true,
    emailPrivacy: 'approval' as VisibilityLevel,
    phonePrivacy: 'hidden' as VisibilityLevel,
    linkedinPrivacy: 'public' as VisibilityLevel,
    locationPrivacy: 'public' as VisibilityLevel,
    companyPrivacy: 'public' as VisibilityLevel,
    rolePrivacy: 'public' as VisibilityLevel
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    // Save profile logic
    setIsEditing(false);
  };

  const getVisibilityIcon = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return Globe;
      case 'approval': return UserCheck;
      case 'chapter-leaders': return Building2;
      case 'hidden': return EyeOff;
    }
  };

  const getVisibilityColor = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return 'text-green-600';
      case 'approval': return 'text-blue-600';
      case 'chapter-leaders': return 'text-orange-600';
      case 'hidden': return 'text-red-600';
    }
  };

  const getVisibilityDot = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return '🟢';
      case 'approval': return '🔵';
      case 'chapter-leaders': return '🟠';
      case 'hidden': return '🔴';
    }
  };

  const getVisibilityLabel = (level: VisibilityLevel) => {
    switch (level) {
      case 'public': return 'Public';
      case 'approval': return 'Approval only';
      case 'chapter-leaders': return 'Chapter leaders';
      case 'hidden': return 'Hidden';
    }
  };

  const visibilityOptions: { value: VisibilityLevel; label: string; icon: any }[] = [
    { value: 'public', label: 'Public (all alumni)', icon: Globe },
    { value: 'approval', label: 'Approval basis', icon: UserCheck },
    { value: 'chapter-leaders', label: 'Chapter Leaders Only', icon: Building2 },
    { value: 'hidden', label: 'Hidden', icon: EyeOff }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Section - Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#8B1538] text-white flex items-center justify-center text-3xl font-medium">
                    {profile.name.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#8B1538] text-white flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-medium mb-1">{profile.name}</h2>
                      <p className="text-muted-foreground">{profile.role}</p>
                    </div>
                    <Button
                      variant={isEditing ? 'default' : 'outline'}
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className={isEditing ? 'bg-[#8B1538] hover:bg-[#8B1538]/90' : ''}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{profile.batch} • {profile.campus}</Badge>
                    <Badge variant="secondary">{profile.company}</Badge>
                    {profile.availableForMentorship && (
                      <Badge className="bg-[#8B1538] text-white hover:bg-[#8B1538]/90">Available for Mentorship</Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{profile.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your core profile details with privacy controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                {/* Email with inline privacy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      Email Address
                      <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                        <Lock className="w-3 h-3 mr-1" />
                        Sensitive
                      </Badge>
                    </Label>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={getVisibilityColor(profile.emailPrivacy)}>
                        {getVisibilityDot(profile.emailPrivacy)} {getVisibilityLabel(profile.emailPrivacy)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                    <Select
                      value={profile.emailPrivacy}
                      onValueChange={(value) => setProfile({ ...profile, emailPrivacy: value as VisibilityLevel })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Eye className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visibilityOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Phone with inline privacy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      Phone Number
                      <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                        <Lock className="w-3 h-3 mr-1" />
                        Sensitive
                      </Badge>
                    </Label>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={getVisibilityColor(profile.phonePrivacy)}>
                        {getVisibilityDot(profile.phonePrivacy)} {getVisibilityLabel(profile.phonePrivacy)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                    <Select
                      value={profile.phonePrivacy}
                      onValueChange={(value) => setProfile({ ...profile, phonePrivacy: value as VisibilityLevel })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Eye className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visibilityOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location with inline privacy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={getVisibilityColor(profile.locationPrivacy)}>
                        {getVisibilityDot(profile.locationPrivacy)} {getVisibilityLabel(profile.locationPrivacy)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                    <Select
                      value={profile.locationPrivacy}
                      onValueChange={(value) => setProfile({ ...profile, locationPrivacy: value as VisibilityLevel })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Eye className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visibilityOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Tell others about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your BITS Pilani details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="batch">Batch</Label>
                  <Select value={profile.batch} disabled={!isEditing}>
                    <SelectTrigger id="batch">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2015">2015</SelectItem>
                      <SelectItem value="2016">2016</SelectItem>
                      <SelectItem value="2017">2017</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="campus">Campus</Label>
                  <Select value={profile.campus} disabled={!isEditing}>
                    <SelectTrigger id="campus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pilani">Pilani</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Dubai">Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={profile.degree}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your current work details with privacy controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Company with inline privacy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="company">Company</Label>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={getVisibilityColor(profile.companyPrivacy)}>
                      {getVisibilityDot(profile.companyPrivacy)} {getVisibilityLabel(profile.companyPrivacy)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Select
                    value={profile.companyPrivacy}
                    onValueChange={(value) => setProfile({ ...profile, companyPrivacy: value as VisibilityLevel })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Eye className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Role with inline privacy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="role">Job Title/Role</Label>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={getVisibilityColor(profile.rolePrivacy)}>
                      {getVisibilityDot(profile.rolePrivacy)} {getVisibilityLabel(profile.rolePrivacy)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Select
                    value={profile.rolePrivacy}
                    onValueChange={(value) => setProfile({ ...profile, rolePrivacy: value as VisibilityLevel })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Eye className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* LinkedIn with inline privacy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={getVisibilityColor(profile.linkedinPrivacy)}>
                      {getVisibilityDot(profile.linkedinPrivacy)} {getVisibilityLabel(profile.linkedinPrivacy)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    disabled={!isEditing}
                    placeholder="linkedin.com/in/yourprofile"
                    className="flex-1"
                  />
                  <Select
                    value={profile.linkedinPrivacy}
                    onValueChange={(value) => setProfile({ ...profile, linkedinPrivacy: value as VisibilityLevel })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Eye className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Add your professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill} className="bg-[#8B1538] hover:bg-[#8B1538]/90">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Privacy Preview Panel - Right column */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className="border-[#8B1538]/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#8B1538]" />
                  <CardTitle>Privacy Preview</CardTitle>
                </div>
                <CardDescription>
                  How others see your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#8B1538] text-white flex items-center justify-center text-lg font-medium">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.batch} • {profile.campus}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">Email:</span>
                      <div className="text-right">
                        {profile.emailPrivacy === 'public' ? (
                          <span className="text-green-600">✓ Visible</span>
                        ) : profile.emailPrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.emailPrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <div className="text-right">
                        {profile.phonePrivacy === 'public' ? (
                          <span className="text-green-600">✓ Visible</span>
                        ) : profile.phonePrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.phonePrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">LinkedIn:</span>
                      <div className="text-right">
                        {profile.linkedinPrivacy === 'public' ? (
                          <span className="text-green-600">✓ Visible</span>
                        ) : profile.linkedinPrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.linkedinPrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">Location:</span>
                      <div className="text-right">
                        {profile.locationPrivacy === 'public' ? (
                          <span className="text-green-600">✓ {profile.location}</span>
                        ) : profile.locationPrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.locationPrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">Company:</span>
                      <div className="text-right">
                        {profile.companyPrivacy === 'public' ? (
                          <span className="text-green-600">✓ {profile.company}</span>
                        ) : profile.companyPrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.companyPrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-muted-foreground">Role:</span>
                      <div className="text-right">
                        {profile.rolePrivacy === 'public' ? (
                          <span className="text-green-600">✓ {profile.role}</span>
                        ) : profile.rolePrivacy === 'approval' ? (
                          <span className="text-blue-600">🔵 Request needed</span>
                        ) : profile.rolePrivacy === 'chapter-leaders' ? (
                          <span className="text-orange-600">🟠 Leaders only</span>
                        ) : (
                          <span className="text-red-600">🔒 Hidden</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#8B1538]/5 border border-[#8B1538]/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#8B1538] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-[#8B1538] mb-1">Privacy Status</p>
                      <p className="text-xs text-muted-foreground">
                        Your profile is protected. Change visibility settings above to control what others see.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}