import { useEffect, useRef, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const generateLongRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    return Array(length).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const useEnhancedDevToolsProtection = () => {
    const blockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const SECRET_KEY = useRef(generateLongRandomString(128));

    const blockUserInteraction = useCallback(() => {
        const body = document.body;
        body.style.pointerEvents = 'none';
        body.style.opacity = '0.5';
        body.style.userSelect = 'none';

        window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=BXC1nXRn3weB71Zj';

        if (blockTimeoutRef.current) clearTimeout(blockTimeoutRef.current);
        blockTimeoutRef.current = setTimeout(() => {
            body.style.pointerEvents = 'auto';
            body.style.opacity = '1';
            body.style.userSelect = 'auto';
        }, 10000);
    }, []);

    // Limiter le nombre de clés dans le localStorage
    const secureStorage = {
        setItem: (key: string, value: string) => {
            // Limiter à un certain nombre d'entrées (par exemple 5)
            const maxEntries = 5;
            if (Object.keys(localStorage).length >= maxEntries) {
                console.log('Trop de clés dans le localStorage, suppression de la plus ancienne.');
                localStorage.removeItem(Object.keys(localStorage)[0]); // Supprimer la première entrée
            }
            const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY.current).toString();
            localStorage.setItem(key, encryptedValue);
        },
        getItem: (key: string) => {
            const encryptedValue = localStorage.getItem(key);
            if (encryptedValue) {
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY.current);
                return decryptedBytes.toString(CryptoJS.enc.Utf8);
            }
            return null;
        },
        removeItem: (key: string) => {
            localStorage.removeItem(key);
        },
        clear: () => {
            localStorage.clear();
        }
    };

    // Détection des DevTools
    const detectDevTools = () => {
        let devtoolsOpen = false;
        const threshold = 160; // Largeur minimale pour détecter les DevTools
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            devtoolsOpen = true;
            blockUserInteraction();
        }

        return devtoolsOpen;
    };

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            blockUserInteraction();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Bloquer F12, Ctrl+Shift+I, Cmd+Option+I (Mac)
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.metaKey && e.altKey && e.key === 'I')) {
                e.preventDefault();
                blockUserInteraction();
            }
        };

        // Détection des DevTools à intervalle régulier
        const devToolsCheckInterval = setInterval(detectDevTools, 1000); // Vérifier toutes les secondes

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(devToolsCheckInterval);
        };
    }, [blockUserInteraction]);

    return { secureStorage, blockUserInteraction };
};

export default useEnhancedDevToolsProtection;
