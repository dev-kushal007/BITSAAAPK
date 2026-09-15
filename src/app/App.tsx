import React, { useState } from 'react';
import { VersionSelector } from './components/VersionSelector';
import { MVPApp } from './components/mvp/MVPApp';
import { V1App } from './components/v1/V1App';
import { V2App } from './components/v2/V2App';
import { SuperAppVision } from './components/super-app/SuperAppVision';

export type AppVersion = 'mvp' | 'v1' | 'v2' | 'super-app' | null;

export default function App() {
  const [selectedVersion, setSelectedVersion] = useState<AppVersion>(null);
  const [userRole, setUserRole] = useState<'alumni' | 'chapter-leader' | 'admin' | 'new-alumni'>('alumni');

  const handleVersionSelect = (version: AppVersion, role: 'alumni' | 'chapter-leader' | 'admin' | 'new-alumni') => {
    setSelectedVersion(version);
    setUserRole(role);
  };

  const handleBack = () => {
    setSelectedVersion(null);
  };

  if (!selectedVersion) {
    return <VersionSelector onVersionSelect={handleVersionSelect} />;
  }

  return (
    <>
      {selectedVersion === 'mvp' && <MVPApp userRole={userRole} onBack={handleBack} />}
      {selectedVersion === 'v1' && <V1App userRole={userRole} onBack={handleBack} />}
      {selectedVersion === 'v2' && <V2App userRole={userRole} onBack={handleBack} />}
      {selectedVersion === 'super-app' && <SuperAppVision userRole={userRole} onBack={handleBack} />}
    </>
  );
}