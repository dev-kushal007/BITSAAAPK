import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Users, MessageSquare, UserCircle, Shield, UsersRound, Briefcase, Calendar, Newspaper, MapPin, Heart, Rocket, Sparkles, Globe, Bot, Plane, ShoppingBag, Menu } from 'lucide-react';
import { AlumniDirectory } from '../mvp/AlumniDirectory';
import { ProfileManagement } from '../mvp/ProfileManagement';
import { Messaging } from '../mvp/Messaging';
import { PrivacySettings } from '../mvp/PrivacySettings';
import { InterestGroups } from '../v1/InterestGroups';
import { MentorshipHub } from '../v1/MentorshipHub';
import { JobsReferrals } from '../v1/JobsReferrals';
import { ChaptersEvents } from '../v1/ChaptersEvents';
import { CampusFeed } from '../v1/CampusFeed';
import { RelocationAssistant } from '../v2/RelocationAssistant';
import { DonationsGiving } from '../v2/DonationsGiving';
import { StartupHub } from '../v2/StartupHub';
import { AINetworking } from './AINetworking';
import { AICareerCoach } from './AICareerCoach';
import { GlobalMap } from './GlobalMap';
import { TravelMode } from './TravelMode';
import { AlumniMarketplace } from './AlumniMarketplace';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '../ui/sheet';

interface SuperAppVisionProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
  onBack: () => void;
}

export function SuperAppVision({ userRole, onBack }: SuperAppVisionProps) {
  const [activeTab, setActiveTab] = useState<string>('ai-networking');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabs = [
    { id: 'ai-networking', label: 'AI Network', icon: Sparkles },
    { id: 'ai-career', label: 'AI Career', icon: Bot },
    { id: 'global-map', label: 'Global Map', icon: Globe },
    { id: 'travel', label: 'Travel', icon: Plane },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'groups', label: 'Groups', icon: UsersRound },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'startup', label: 'Startups', icon: Rocket },
    { id: 'relocation', label: 'Relocation', icon: MapPin },
    { id: 'giving', label: 'Giving', icon: Heart },
    { id: 'chapters', label: 'Events', icon: Calendar },
    { id: 'campus', label: 'Campus', icon: Newspaper },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const SidebarContent = () => (
    <nav className="space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">BITSAA Alumni Platform</h1>
                <p className="text-xs text-muted-foreground">Super-App Vision • AI-Powered Global Network</p>
              </div>
            </div>
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Navigate through different sections
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card min-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-4">
            <SidebarContent />
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {activeTab === 'ai-networking' && <AINetworking userRole={userRole} />}
            {activeTab === 'ai-career' && <AICareerCoach userRole={userRole} />}
            {activeTab === 'global-map' && <GlobalMap userRole={userRole} />}
            {activeTab === 'travel' && <TravelMode userRole={userRole} />}
            {activeTab === 'marketplace' && <AlumniMarketplace userRole={userRole} />}
            {activeTab === 'directory' && <AlumniDirectory userRole={userRole} />}
            {activeTab === 'groups' && <InterestGroups userRole={userRole} />}
            {activeTab === 'mentorship' && <MentorshipHub userRole={userRole} />}
            {activeTab === 'jobs' && <JobsReferrals userRole={userRole} />}
            {activeTab === 'startup' && <StartupHub userRole={userRole} />}
            {activeTab === 'relocation' && <RelocationAssistant userRole={userRole} />}
            {activeTab === 'giving' && <DonationsGiving userRole={userRole} />}
            {activeTab === 'chapters' && <ChaptersEvents userRole={userRole} />}
            {activeTab === 'campus' && <CampusFeed userRole={userRole} />}
            {activeTab === 'messages' && <Messaging userRole={userRole} />}
            {activeTab === 'profile' && <ProfileManagement userRole={userRole} />}
            {activeTab === 'privacy' && <PrivacySettings userRole={userRole} />}
          </div>
        </main>
      </div>
    </div>
  );
}