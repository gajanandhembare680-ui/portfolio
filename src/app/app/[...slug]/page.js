'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';
import Home from '@/app/page';

export default function DeepLinkHandler() {
    const params = useParams();
    const router = useRouter();
    const { openApp, setLocked } = useOSStore();

    // Extract slug from URL: /app/projects -> ['projects']
    const slug = params.slug || [];
    const appName = slug[0];

    useEffect(() => {
        if (appName) {
            // Find app ID from name (case insensitive)
            const matchedApp = APPS.find(app =>
                app.id.toLowerCase() === appName.toLowerCase() ||
                app.name.toLowerCase().replace(/\s+/g, '') === appName.toLowerCase()
            );

            if (matchedApp) {
                // Unlock OS and Open App
                setLocked(false);
                openApp(matchedApp.id);
            }
        }
    }, [appName, openApp, setLocked]);

    // We render the full OS (Home component)
    // The useEffect above effectively initializes the state "over" the default state
    return <Home />;
}
