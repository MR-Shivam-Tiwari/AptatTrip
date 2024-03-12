import { Avatar } from "@mui/joy";
import React from "react";

function Notification() {
  return (
    <div className=" flex justify-center mt-5 px-3">
      <div className="rounded-lg border bg-card bg-gray-200 shadow-sm w-full max-w-6xl">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            You have 3 unread messages.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar />
            <div className="space-y-1 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold leading-none">
                  @lauradavis{" "}
                  <span className="text-sm font-normal leading-none">
                    created a new trip
                  </span>
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  5 min ago
                </time>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exploring the beautiful beaches of Maui, Hawaii 🏝. Who's ready
                for some fun in the sun? Trip dates: July 15 - July 22.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Avatar />
            <div className="space-y-1 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold leading-none">
                  @johndoe{" "}
                  <span className="text-sm font-normal leading-none">
                    created a new trip
                  </span>
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  12 min ago
                </time>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Heading to the mountains for a weekend getaway! 🏔 Trip dates:
                June 25 - June 27.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Avatar />
            <div className="space-y-1 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold leading-none">
                  @sarahsmith{" "}
                  <span className="text-sm font-normal leading-none">
                    created a new trip
                  </span>
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  20 min ago
                </time>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Planning a trip to Paris! 🇫🇷 Trip dates: August 10 - August 15.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
