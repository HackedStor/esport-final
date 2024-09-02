/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const useDevToolsProtection = () => {
    useEffect(() => {
        // Désactiver le clic droit
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        // Désactiver certains raccourcis clavier
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.shiftKey && e.key === 'C') || 
                (e.ctrlKey && e.shiftKey && e.key === 'J') || 
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Détecter si les DevTools sont ouverts
        const devtools = { isOpen: false, orientation: null as string | null };
        const threshold = 160;

        const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            const orientation = widthThreshold ? 'vertical' : 'horizontal';

            if (!(heightThreshold && widthThreshold) && 
                ((window as any).Firebug && (window as any).Firebug.chrome && (window as any).Firebug.chrome.isInitialized) || 
                widthThreshold || heightThreshold) {
                if (!devtools.isOpen || devtools.orientation !== orientation) {
                    window.dispatchEvent(new CustomEvent('devtoolschange', {
                        detail: {
                            isOpen: true,
                            orientation
                        }
                    }));
                }
                devtools.isOpen = true;
                devtools.orientation = orientation;
            } else {
                if (devtools.isOpen) {
                    window.dispatchEvent(new CustomEvent('devtoolschange', {
                        detail: {
                            isOpen: false,
                            orientation: null
                        }
                    }));
                }
                devtools.isOpen = false;
                devtools.orientation = null;
            }
        };

        const interval = setInterval(checkDevTools, 500);

        const handleDevToolsChange = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail.isOpen) {
                window.location.replace('https://youtu.be/dQw4w9WgXcQ?si=BXC1nXRn3weB71Zj');
            }
        };
        window.addEventListener('devtoolschange', handleDevToolsChange);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
            window.removeEventListener('devtoolschange', handleDevToolsChange);
        };
    }, []);
};

export default useDevToolsProtection;
