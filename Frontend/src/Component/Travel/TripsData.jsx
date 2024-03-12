import { Button } from "@mui/joy";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "@mui/joy/Stack";
function TripsData() {
  const [userTrips, setUserTrips] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editedTrip, setEditedTrip] = useState({
    destination: "",
    dates: { start: null, end: null },
    activities: "",
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    // Fetch user trips when the component mounts
    fetchUserTrips();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchUserTrips = async () => {
    try {
      const userDataString = localStorage.getItem("UserData");
      if (!userDataString) {
        console.error("User data not found in localStorage");
        return;
      }

      const userData = JSON.parse(userDataString);
      if (!userData || !userData.email) {
        console.error("Invalid user data stored in localStorage");
        return;
      }

      const userEmail = userData.email;

      const response = await fetch(
        `http://localhost:5000/api/trips/user-trips?userEmail=${encodeURIComponent(
          userEmail
        )}`, // Make sure to encode the email
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching user trips: ${response.statusText}`);
      }

      const data = await response.json();
      setUserTrips(data.trips || []);
    } catch (error) {
      console.error("Error fetching user trips:", error.message);
      // Handle the error as needed
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trips/delete-trip/${tripId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting trip: ${response.statusText}`);
      }

      // Remove the deleted trip from the userTrips state
      setUserTrips(userTrips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error.message);
      // Handle the error as needed
    }
  };

  const handleEditTrip = (trip) => {
    setOpen(true);
    setSelectedDate(new Date(trip.dates.start));
    setEditedTrip({
      _id: trip._id,
      destination: trip.destination,
      dates: { ...trip.dates },
      activities: trip.activities.join(", "),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/trips/edit-trip/${editedTrip._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination: editedTrip.destination,
            dates: editedTrip.dates,
            activities: editedTrip.activities
              .split(",")
              .map((activity) => activity.trim()),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error editing trip: ${response.statusText}`);
      }

      // Handle successful edit
      setOpen(false);
      // Optionally, you can fetch the updated user trips to reflect the changes immediately
      fetchUserTrips();
    } catch (error) {
      console.error("Error editing trip:", error.message);
      // Handle the error as needed
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Map over userTrips and render the trip details */}
      {userTrips.map((trip) => (
        <div
          key={trip._id} // Make sure each trip has a unique identifier
          className="flex p-4 md:p-6 space-y-6"
        >
          {/* Render trip details here */}
          <div className="border text-card-foreground bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
            <div className="flex-col p-6 flex items-center justify-between pb-2 space-y-0">
              <h3 className="whitespace-nowrap tracking-tight text-lg font-semibold">
                Trip Details
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-2 text-sm">
              <dl className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Destination</div>
                <div className="font-semibold text-right">
                  {trip.destination}
                </div>
                <div className="text-gray-500"> Date</div>
                <div className="font-semibold text-right">
                  {new Date(trip.dates.start).toLocaleDateString()} -{" "}
                  {new Date(trip.dates.end).toLocaleDateString()}
                </div>
                <div className="text-gray-500">Activities</div>
                <div className="font-semibold text-right">
                  {trip.activities.join(", ")}
                </div>
              </dl>
            </div>
            <div>
              <div className="px-2 flex justify-between items-center">
                <Button
                  variant="outlined"
                  color="neutral"
                  // startDecorator={<Add />}
                  onClick={() => handleEditTrip(trip)}
                >
                  Edit
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog>
                    <DialogTitle>Edit the Trip</DialogTitle>
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={2} p={2}>
                        <FormControl>
                          <FormLabel>Destination</FormLabel>
                          <Input
                            placeholder="Enter Your Destination"
                            autoFocus
                            required
                            value={editedTrip.destination}
                            onChange={(e) =>
                              setEditedTrip({
                                ...editedTrip,
                                destination: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Date</FormLabel>
                          <DatePicker
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-not-allowed"
                            id="dates"
                            placeholderText="Enter a Date"
                            dateFormat="dd/MM/yyyy"
                            selected={selectedDate}
                            onChange={handleDateChange}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Activity</FormLabel>
                          <Input
                            placeholder="Enter Your Activity"
                            autoFocus
                            required
                            value={editedTrip.activities}
                            onChange={(e) =>
                              setEditedTrip({
                                ...editedTrip,
                                activities: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <Button type="submit">Submit</Button>
                      </Stack>
                    </form>
                  </ModalDialog>
                </Modal>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteTrip(trip._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripsData;
