import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TripsData from "./TripsData";

function AddTravel() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [activity, setActivity] = useState("");

  const handleSave = async () => {
    try {
      const userDataString = localStorage.getItem("UserData");
      const userData = JSON.parse(userDataString);

      const userEmail = userData.email;
      const apiUrl = "http://localhost:5000/api/trips/create-trip"; // Replace with your backend API URL

      // Calculate end date (24 hours from start date)
      const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

      const tripData = {
        userEmail,
        destination,
        dates: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
        activities: [activity],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        console.log("Trip created successfully");
        alert("Trip created successfully");
        // Add logic here to update the UI or navigate to another page
      } else {
        console.error("Error creating trip:", response.statusText);
        // Add logic here to handle errors, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Plan your trip
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Effortlessly plan your trips. Add multiple destinations, specify
          dates, and plan activities.
        </p>
      </div>
      <div className="rounded-lg bg-card text-card-foreground shadow-sm border">
        <div className="p-4 md:p-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                htmlFor="destination"
              >
                Destination
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="destination"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                htmlFor="dates"
              >
                Dates
              </label>
              <DatePicker
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-not-allowed"
                id="dates"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                htmlFor="activity"
              >
                Activity
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="activity"
                placeholder="Enter activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6" id="uirk506jfu">
          <div className="grid gap-4">
            <div className="flex justify-end items-center gap-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Cancel
              </button>
              <button
                style={{ background: "black" }}
                className="inline-flex text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <TripsData />
    </div>
  );
}

export default AddTravel;
