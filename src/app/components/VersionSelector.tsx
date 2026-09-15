import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Check, Rocket, TrendingUp, Sparkles, Zap } from 'lucide-react';
import type { AppVersion } from '../App';

interface VersionSelectorProps {
  onVersionSelect: (version: AppVersion, role: 'alumni' | 'chapter-leader' | 'admin' | 'new-alumni') => void;
}

export function VersionSelector({ onVersionSelect }: VersionSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<'alumni' | 'chapter-leader' | 'admin' | 'new-alumni'>('alumni');

  const versions = [
    {
      id: 'mvp' as const,
      title: 'MVP',
      subtitle: 'Minimum Viable Product',
      timeline: '3-4 months',
      icon: Check,
      description: 'Core foundation with privacy-first networking',
      features: [
        'Authentication & Onboarding',
        'Global Alumni Directory',
        'Profile Management',
        'In-App Messaging',
        'Contact Requests',
        'Privacy Settings'
      ],
      color: 'bg-primary'
    },
    {
      id: 'v1' as const,
      title: 'Version 1',
      subtitle: 'Community & Career Growth',
      timeline: '6-8 months',
      icon: TrendingUp,
      description: 'Deeper engagement through professional and social features',
      features: [
        'Interest Groups',
        'Mentorship Hub',
        'Jobs & Referral System',
        'Chapter Management',
        'Event Creation & RSVP',
        'Campus Feed'
      ],
      color: 'bg-accent'
    },
    {
      id: 'v2' as const,
      title: 'Version 2',
      subtitle: 'Ecosystem Expansion',
      timeline: '8-12 months',
      icon: Rocket,
      description: 'Advanced features, city intelligence, and philanthropy',
      features: [
        'Relocation Assistant',
        'City Buddy Program',
        'Event Ticketing & QR Check-in',
        'Structured Mentorship Programs',
        'Donations & Giving',
        'Startup Hiring Hub'
      ],
      color: 'bg-[#d4a574]'
    },
    {
      id: 'super-app' as const,
      title: 'Super-App Vision',
      subtitle: 'Global Alumni Network',
      timeline: '12-24 months',
      icon: Sparkles,
      description: 'AI-powered global professional and social powerhouse',
      features: [
        'AI-Powered Networking',
        'AI Career Coach',
        'Alumni Business Marketplace',
        'Global BITS Map',
        'Travel Mode',
        'Social Impact Hub'
      ],
      color: 'bg-gradient-to-br from-[#8B1538] to-[#d4a574]'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">BITSAA International</h1>
              <p className="text-sm text-muted-foreground">Alumni Engagement Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-3 text-foreground">Welcome to the BITS Alumni App</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore different versions of our roadmap to see how we're building the world's most engaged, 
            trusted, and purpose-driven alumni community platform.
          </p>
          
          {/* Role Selection */}
          <div className="flex items-center justify-center gap-3">
            <label className="text-sm text-muted-foreground">Experience as:</label>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="chapter-leader">Chapter Leader</SelectItem>
                <SelectItem value="admin">BITSAA Admin</SelectItem>
                <SelectItem value="new-alumni">New Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Version Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {versions.map((version) => {
            const Icon = version.icon;
            return (
              <Card key={version.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${version.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary">{version.timeline}</Badge>
                  </div>
                  <CardTitle>{version.title}</CardTitle>
                  <CardDescription className="text-base">{version.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{version.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium text-foreground">Key Features:</p>
                    <ul className="space-y-1.5">
                      {version.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => onVersionSelect(version.id, selectedRole)}
                  >
                    Explore {version.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Note:</span> Each version builds upon the previous one, creating a comprehensive 
            alumni engagement ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}