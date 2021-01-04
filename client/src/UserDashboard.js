import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import io from "./background/socket";
import { useStateValue } from "./StateProvider";
import "./UserDashboard.css";

function UserDashboard() {
  const [{ user, auth, position }, dispatch] = useStateValue();

  const history = useHistory();

  const sos = (e) => {
    e.preventDefault();
    io.emit("sos");
  };

  useEffect(() => {
    if (!auth) {
      return history.push("/");
    }
    console.log("this is in useeffect", position);
  }, []);

  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((p) => {
        // console.log("BEFORE DISPATCHING", position);
        dispatch({
          type: "SET_POSITION",
          position: {
            lat: p.coords.latitude,
            lng: p.coords.longitude,
          },
        });
        // console.log("After updating", p, position);
      });
    }, 3000);
  }, []);

  useEffect(() => {
    return io.on("no-hospitals", () => {
      toast.error("No hospitals online.");
    });
  }, []);

  useEffect(() => {
    io.emit("location", position);
  }, [position]);

  return (
    <div className="userDashboard">
      <div className="userDashboard__map">
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={17}
          center={position}
        >
          <Marker position={position} />
        </GoogleMap>
      </div>
      <div className="userDashboard__panel">
        <div className="userDashboard__panelText">Hello {user.name}!</div>
        <div className="userDashboard__panelSos">
          <button className="userDashboard__sosBtn" onClick={sos}>
            SOS
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
