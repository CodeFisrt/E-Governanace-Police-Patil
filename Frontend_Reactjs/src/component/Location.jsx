import React, { useEffect, useState } from "react";

const Location = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationClick = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (err) => {
          // Error callback
          setError(err.message);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 } // Options
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location permission granted");
          console.log("Lat:", position.coords.latitude);
          console.log("Lng:", position.coords.longitude);
        },
        (error) => {
          console.log("Location permission denied", error.message);
        }
      );
    } else {
      console.log("Geolocation not supported by browser");
    }
  }, []);

  return (
    <div className="location-form">
      <h3>Capture Live Location</h3>
      <button type="button" onClick={handleLocationClick} disabled={isLoading}>
        {isLoading ? "Fetching Location..." : "Get My Location"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {/* You can add hidden form inputs to submit this data */}
          <input type="hidden" name="latitude" value={location.latitude} />
          <input type="hidden" name="longitude" value={location.longitude} />
        </div>
      )}
    </div>
  );
};

export default Location;
