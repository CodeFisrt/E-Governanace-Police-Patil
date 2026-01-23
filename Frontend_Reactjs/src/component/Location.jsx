import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Location({ isAttendance }) {
  const [address, setAddress] = useState("");

  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      alert("GeoLocation Not Supported !");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const data = await res.data;
          // console.log(data);

          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress("Address not found");
          }
        } catch (error) {
          console.error("Error fetching ", error);
          setAddress("Failed to get address");
        }
      },
      (error) => {
        console.error("Error getting  ", error);
        alert("Please allow location permission");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    handleCaptureLocation();
  }, []);

  return (
    <div>
      {isAttendance ? (
        <div className="">
          <div className="text-gray-400 font-medium">Current Location</div>
          <div className=" border-gray-300 rounded w-full p-2">{address}</div>
        </div>
      ) : (
        <div className="grid gap-2 ">
          <label htmlFor="location">GPS Location</label>
          <div className="flex gap-3 w-full ">
            <div className="border-1 border-gray-300 rounded w-full p-4">
              {/* {data.display_name} */}
              {address}
            </div>
            {/* <button
              className="border-1 border-gray-300 rounded p-1 w-1/4 bg-gray-300 "
              onClick={(e) => {
                e.preventDefault();
                handleCaptureLocation();
              }}
            >
              Get Location
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
