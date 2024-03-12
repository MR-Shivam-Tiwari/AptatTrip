import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home";
import Login from "./Component/Auth/Login";
import Signup from "./Component/Auth/Signup";
import './index.css'

import Navbar from "./Component/Navbar";
import ContactUs from "./Component/ContactUs";
import Profile from "./Component/Profile/Profile";
import AddTravel from "./Component/Travel/AddTravel";
import User from "./Component/Users/User";
import Notification from "./Component/Notifications/Notification";



function App() {
  return (
    <div className="">
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-new-trip" element={<AddTravel />} />
          <Route path="/users" element={<User />} />
          <Route path="/notifications" element={<Notification />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
