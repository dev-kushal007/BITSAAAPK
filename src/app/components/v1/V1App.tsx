import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Users, MessageSquare, UserCircle, Shield, UsersRound, Briefcase, Calendar, Newspaper, Menu, X } from 'lucide-react';
import { AlumniDirectory } from '../mvp/AlumniDirectory';
import { ProfileManagement } from '../mvp/ProfileManagement';
import { Messaging } from '../mvp/Messaging';
import { PrivacySettings } from '../mvp/PrivacySettings';
import { InterestGroups } from './InterestGroups';
import { MentorshipHub } from './MentorshipHub';
import { JobsReferrals } from './JobsReferrals';
import { ChaptersEvents } from './ChaptersEvents';
import { CampusFeed } from './CampusFeed';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '../ui/sheet';

interface V1AppProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin';
  onBack: () => void;
}

export function V1App({ userRole, onBack }: V1AppProps) {
  const [activeTab, setActiveTab] = useState<string>('directory');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabs = [
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'groups', label: 'Groups', icon: UsersRound },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'chapters', label: 'Chapters', icon: Calendar },
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
                <p className="text-xs text-muted-foreground">V1 • Community & Career Growth</p>
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
                    Navigate through different sections of the platform
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
            {activeTab === 'directory' && <AlumniDirectory userRole={userRole} />}
            {activeTab === 'groups' && <InterestGroups userRole={userRole} />}
            {activeTab === 'mentorship' && <MentorshipHub userRole={userRole} />}
            {activeTab === 'jobs' && <JobsReferrals userRole={userRole} />}
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