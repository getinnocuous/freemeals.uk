import React, { createContext, useState, useEffect } from "react";
import { geolocated } from "react-geolocated";

export const GeoContext = createContext(null);

function GeoProvider({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords: geoCoords,
  children,
}) {
  const checkGeoIsAvailable = isGeolocationAvailable && geoCoords != null;
  const [mode, setMode] = useState(
    checkGeoIsAvailable ? { name: "geo", coords: geoCoords } : { name: null }
  );
  const [coords, setCoords] = useState(geoCoords);

  useEffect(() => {
    if (isGeolocationAvailable) {
      setMode({ name: "geo" });
    }
  }, [isGeolocationAvailable]);

  useEffect(() => {
    const switchMode = () => {
      switch (mode.name) {
        case "geo":
          setCoords(geoCoords);
          break;
        case "postcode":
          setCoords(mode.coords);
          break;
        default:
          setCoords(null);
          break;
      }
    };
    switchMode();
  }, [mode, geoCoords]);

  return (
    <GeoContext.Provider
      value={{
        isGeolocationAvailable,
        isGeolocationEnabled,
        coords,
        mode: mode.name,
        setMode,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoProvider);
