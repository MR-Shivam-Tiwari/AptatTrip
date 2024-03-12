import { Avatar } from "@mui/joy";
import React, { useEffect, useState } from "react";
import axios from "axios";

function NearByUsers() {
  const [usersData, setUsersData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Function to fetch nearby users
    const fetchNearbyUsers = async () => {
      try {
        // Get user's current location using Geolocation API
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update the userLocation state
            setUserLocation({ latitude, longitude });

            // Fetch nearby users from the backend API
            axios
              .get("http://localhost:5000/api/nearbyUsers", {
                params: { longitude, latitude },
              })
              .then((response) => {
                // Update the state with the fetched users
                setUsersData(response.data);
              });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } catch (error) {
        console.error("Error fetching nearby users:", error);
      }
    };

    // Call the fetchNearbyUsers function when the component mounts
    fetchNearbyUsers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3 md:gap-4 px-5 lg:gap-2 xl:gap-4 xl:grid-cols-6">
        {usersData.map((user) => (
          <div
            key={user.id}
            className="flex justify-center items-center gap-4 p-4 bg-blue-100 border dark:bg-blue-900 rounded-lg"
          >
            <div>
              <div className="flex justify-center">
                <Avatar src={user.avtar} />
              </div>
              <div className="mb-3 mt-2 flex justify-center">
                <div className="font-semibold">
                  {user.username ||
                    (user.name ? user.name : "No Name Available")}
                </div>
              </div>

              <button
                style={{ background: "white", width: "160px" }}
                className="flex items-center border justify-center text-sm font-medium h-9 rounded-md px-3"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearByUsers;
