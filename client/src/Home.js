import React from "react";
import "./Home.css";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import { AccountCircle, Lock } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const history = useHistory();
  const [position, setPosition] = useState({ lat: 41.3851, lng: 2.1734 });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  }, []);

  const attemptLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      dispatch({
        type: "SET_USER",
        user: res.data,
      });
      if (res.data.role === "user") {
        // push to user dashboard
        toast.success("Login success as user");
      } else {
        // push to hospital dashboard
        toast.success("Login success as hospital");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Incorrect Email or Password");
      } else {
        toast.error("Unknown network error occured");
      }
    }
  };

  return (
    <div className="home">
      <div className="home__map">
        <LoadScript googleMapsApiKey="AIzaSyBLP_Yh3tf9ci2ZEvx1JasDmn6rR2-rf5E">
          <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100%" }}
            zoom={17}
            center={position}
          />
        </LoadScript>
      </div>
      <div className="home__login">
        <form>
          <div className="home__inputContainer">
            <AccountCircle />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="home__inputContainer">
            <Lock />
            <input type="password" placeholder="Password" />
          </div>
          <button
            className="home__button"
            onClick={attemptLogin}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
