import React from "react";

function ConnectionRequests({ requests, onAccept, onDecline }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Connection Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.name}
            <button onClick={() => onAccept(request.id)}>Accept</button>
            <button onClick={() => onDecline(request.id)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectionRequests;
