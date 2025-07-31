import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";

type AccessibilitySettings = {
  highContrast: boolean;
  fontSize: number;
  screenReader: boolean;
  keyboardNav: boolean;
};

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 18,
  screenReader: false,
  keyboardNav: false,
};

const AccessibilityContext = createContext<{
  settings: AccessibilitySettings;
  setSettings: (s: AccessibilitySettings) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setSettings(defaultSettings);
        return;
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const prefs = userDoc.data().preferences;
        if (prefs) setSettings({ ...defaultSettings, ...prefs });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AccessibilityContext.Provider value={{ settings, setSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export default AccessibilityProvider;
