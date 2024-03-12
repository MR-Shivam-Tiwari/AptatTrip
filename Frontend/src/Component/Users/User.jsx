import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/joy";
import NearByUsers from "./NearByUsers";
import axios from "axios";

function User() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // State to store the logged-in user ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
        console.log("Fetched Users:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    // Fetch the logged-in user details or ID when the component mounts
    const fetchLoggedInUser = async () => {
      try {
        // Replace the following line with your actual authentication logic
        const response = await axios.get("http://localhost:5000/api/loggedInUser");
        setLoggedInUserId(response.data.userId);
        console.log("Logged-in user ID:", response.data.userId);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };
  
    fetchUsers();
    fetchLoggedInUser();
  }, []);
  

  const handleFollow = async (userIdToFollow) => {
    try {
      // Check if the logged-in user ID is available
      if (!loggedInUserId) {
        console.error("Logged-in user ID not available");
        return;
      }

      // Send a request to the follow endpoint
      await axios.post("http://localhost:5000/api/follow", {
        userIdToFollow,
        loggedInUserId,
      });

      // Optionally, you can update the UI to reflect the user is now being followed
      // For example, you might disable the follow button or change its text

      console.log("User followed successfully");
    } catch (error) {
      console.error("Error following user:", error);
    }
  };


  const filterUsers = (term) => {
    const filtered = users.filter((user) =>
      user?.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  
  
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterUsers(term);
  };
  
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    filterUsers(searchTerm);
  };

  return (
    <div>
      <div className="grid min-h-screen items-start gap-6 px-6 lg:px-14 lg:gap-10">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h1 className="text-3xl font-semibold"> Users</h1>

            <form
              onSubmit={handleFormSubmit}
              className="flex items-center max-w-sm mx-auto"
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Users....."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:gap-4 lg:gap-2 xl:gap-4 lg:px-14 xl:grid-cols-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg"
              >
                <Avatar src={user.avtar} />
                <div className="flex-1 grid gap-1.5">
                  <div className="font-semibold">
                    {user.name || user.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500"></div>
                </div>
                <button
                  style={{ background: "black" }}
                  onClick={() => handleFollow(user._id)}
                  className="inline-flex items-center text-white justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-3xl font-semibold pt-14 p-4"> Nearby Users </h1>
            <div className="p-3 ">
              <NearByUsers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
