"use client";
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CarouselCard } from "../../payload-types";

import { getMatchedSchool } from "../helpers/getMatchedSchool";
import { IdProvider } from "./idContext";

interface UserLocationContextProps {
  matchedSchools: CarouselCard[];
  setMatchedSchools: React.Dispatch<React.SetStateAction<any[]>>;
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
  vertical: string;
  setVertical: React.Dispatch<React.SetStateAction<string>>;
  oneTrust: any;
}

const UserLocationContext = createContext<UserLocationContextProps>(null!);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [matchedSchools, setMatchedSchools] = useState<any[]>([]);
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
        // console.log("Setting OneTrust");
        // console.log(
        //   "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ handleOneTrustUpdated ~ window.OneTrustActiveGroups:",
        //   window.OnetrustActiveGroups,
        // );
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

  const [formData, setFormData] = useState<any>(null);

  const [utmSource, setUtmSource] = useState<any>(null);

  const [vertical, setVertical] = useState<string>("Business");

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

  // wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const matchedSchoolInternal = await getMatchedSchool(
          location?.region_iso_code || "VA",
          vertical,
        );
        // grab first school from schools and set matchedSchool
        setMatchedSchools(matchedSchoolInternal);
      }
    };

    fetchData();
  }, [location, vertical]);

  const valueUser = useMemo(
    () => ({
      matchedSchools,
      setMatchedSchools,
      location,
      formData,
      setFormData,
      utmSource,
      setUtmSource,
      setLocation,
      vertical,
      setVertical,
      globalPrivacyControl,
      oneTrust,
      oneTrustActiveGroups,
    }),
    [
      matchedSchools,
      setMatchedSchools,
      location,
      formData,
      setFormData,
      utmSource,
      setUtmSource,
      setLocation,
      vertical,
      setVertical,
      globalPrivacyControl,
      oneTrust,
      oneTrustActiveGroups,
    ],
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

