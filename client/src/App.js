import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./background/socket";
import UserDashboard from "./UserDashboard";
import { LoadScript } from "@react-google-maps/api";

function App() {
  return (
    <div className="app">
      <LoadScript googleMapsApiKey="AIzaSyBLP_Yh3tf9ci2ZEvx1JasDmn6rR2-rf5E">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/user" component={UserDashboard} />
          </Switch>
          <ToastContainer hideProgressBar />
        </Router>
      </LoadScript>
    </div>
  );
}

export default App;
