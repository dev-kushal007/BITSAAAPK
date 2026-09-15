import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Users, MessageSquare, UserCircle, Settings, Shield, Menu } from 'lucide-react';
import { AlumniDirectory } from './AlumniDirectory';
import { ProfileManagement } from './ProfileManagement';
import { Messaging } from './Messaging';
import { PrivacySettings } from './PrivacySettings';
import { Onboarding } from './Onboarding';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '../ui/sheet';

interface MVPAppProps {
  userRole: 'alumni' | 'chapter-leader' | 'admin' | 'new-alumni';
  onBack: () => void;
}

export function MVPApp({ userRole, onBack }: MVPAppProps) {
  const [activeTab, setActiveTab] = useState<'directory' | 'messages' | 'profile' | 'privacy'>('directory');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Show onboarding for new alumni
  if (userRole === 'new-alumni' && !hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  // Use alumni role for display after onboarding
  const displayRole = userRole === 'new-alumni' ? 'alumni' : userRole;

  const tabs = [
    { id: 'directory' as const, label: 'Directory', icon: Users },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare },
    { id: 'profile' as const, label: 'Profile', icon: UserCircle },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield }
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
                <p className="text-xs text-muted-foreground">MVP Version • {displayRole.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
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
            {activeTab === 'directory' && <AlumniDirectory userRole={displayRole} />}
            {activeTab === 'messages' && <Messaging userRole={displayRole} />}
            {activeTab === 'profile' && <ProfileManagement userRole={displayRole} />}
            {activeTab === 'privacy' && <PrivacySettings userRole={displayRole} />}
          </div>
        </main>
      </div>
    </div>
  );
}