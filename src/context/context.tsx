"use client";
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { IdProvider } from "./idContext";

interface UserLocationContextProps {
  location: {
    region_iso_code: string;
    country_code: string;
    notUS: boolean;
  } | null;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  utmSource: any;
  setUtmSource: React.Dispatch<React.SetStateAction<any>>;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      region_iso_code?: string;
      country_code?: string;
      notUS?: boolean;
    } | null>
  >;
  globalPrivacyControl: boolean;
  oneTrust: any;
}

const UserLocationContext = createContext<UserLocationContextProps>(null!);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [oneTrust, setOneTrust] = useState<any>(null);
  const [oneTrustActiveGroups, setOneTrustActiveGroups] = useState<any>(null);

  const [globalPrivacyControl, setGlobalPrivacyControl] = useState(null);

  // useEffect(() => {
  //   console.log("OneTrust", oneTrust);
  // }, [oneTrust]);

  // check if window.OneTrust is defined and if so, set a listener for the OneTrustUpdated event
  useEffect(() => {
    const handleOneTrustUpdated = () => {
      // console.log(
      //   "🚀 ~ file: context.tsx:49 ~ handleOneTrustUpdated ~ handleOneTrustUpdated:",
      //   handleOneTrustUpdated,
      // );
      if (window.OneTrust) {
        setOneTrust(window.OneTrust);
        setOneTrustActiveGroups(window.OnetrustActiveGroups);
      }
    };

    if (typeof window !== "undefined") {
      if (window.OneTrust) {
        // console.log("window is defined... Setting OneTrust");
        setOneTrust(window.OneTrust);
        setOneTrustActiveGroups(window.OnetrustActiveGroups);
      } else {
        // console.log("Adding event listener for OneTrustUpdated");
        window.addEventListener("OneTrustUpdated", handleOneTrustUpdated);

        const intervalId = setInterval(() => {
          if (window.OneTrust) {
            // console.log("OneTrust is now available... Setting OneTrust");
            setOneTrust(window.OneTrust);
            setOneTrustActiveGroups(window.OnetrustActiveGroups);
            clearInterval(intervalId); // Clear the interval once OneTrust is available
          }
        }, 1000);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        // console.log("Removing event listener for OneTrustUpdated");
        window.removeEventListener("OneTrustUpdated", handleOneTrustUpdated);
      }
    };
  }, []);

  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      "globalPrivacyControl" in navigator
    ) {
      //@ts-ignore
      setGlobalPrivacyControl(navigator.globalPrivacyControl);
    }
  }, []);

  // const [location, setLocation] = useLocalStorage('489hLocation', null);
  const [location, setLocation] = useState<{
    region_iso_code: string | null;
    country_code: string | null;
    notUS: boolean;
  } | null>({
    region_iso_code: null,
    country_code: null,
    notUS: true,
  });

  const [utmSource, setUtmSource] = useState<any>(null);

  // check oneTrust.getGeolocation(), that returns an object of { country: 'US', region: 'CA' }, and set location
  useEffect(() => {
    if (oneTrust) {
      const { country, state } = oneTrust.getGeolocationData();
      setLocation({
        region_iso_code: state,
        country_code: country,
        notUS: country !== "US",
      });
    }
  }, [oneTrust, setLocation]);

  const valueUser = useMemo(
    () => ({
      location,
      utmSource,
      setUtmSource,
      setLocation,
      globalPrivacyControl,
      oneTrust,
      oneTrustActiveGroups,
    }),
    [
      location,
      utmSource,
      setUtmSource,
      setLocation,
      globalPrivacyControl,
      oneTrust,
      oneTrustActiveGroups,
    ]
  );

  return (
    <IdProvider>
      {/*@ts-ignore */}
      <UserLocationContext.Provider value={valueUser}>
        {children}
      </UserLocationContext.Provider>
    </IdProvider>
  );
}

function useUser() {
  const context = useContext(UserLocationContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a ContextProvider");
  }
  return context;
}

export { ContextProvider, useUser };
