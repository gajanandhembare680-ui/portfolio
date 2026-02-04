'use client';

import { AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import Desktop from '@/components/os/Desktop';
import StatusBar from '@/components/os/StatusBar';
import Dock from '@/components/os/Dock';
import WindowManager from '@/components/os/WindowManager';
import LockScreen from '@/components/os/LockScreen';
import AppGrid from '@/components/os/AppGrid';

export default function Home() {
  const { isLocked } = useOSStore();

  return (
    <main className="h-screen w-screen overflow-hidden font-sans select-none">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <LockScreen key="lock-screen" />
        ) : (
          <div key="desktop" className="h-full w-full relative">
            <StatusBar />
            <Desktop>
              <AppGrid />
              <WindowManager />
            </Desktop>
            <Dock />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
