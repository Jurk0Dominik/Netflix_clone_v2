import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import logo from "../assets/logo.png";
import accountImg from "../assets/accountImg.jpg";
import classes from "./UserProfile.module.css";
import { useRecoilState } from "recoil";
import { subscribePlan } from "../atoms/modalAtom";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();
  const [subPlan, setsubPlan] = useState("");
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useRecoilState(subscribePlan);

  const dataSlice = (data) => data.slice(0, -4);

  return (
    <div className={classes.containerInformation}>
      <div className={classes.userInformation}>
        <div className={classes.imgContainer}>
          <img src={logo} alt="" />
          <img src={accountImg} alt="accountImage" />
        </div>
        <h1>Account information</h1>
        <p>Emial: {user.email}</p>
        <p>Subscribe plan: {subscribe}</p>
        <button
          onClick={() => {
            console.log("click");
            navigate("/payment");
          }}
        >
          Change plan
        </button>
        <p>
          Account verificated:{" "}
          {user.emailVerified ? "verified" : "not verified"}
        </p>
        <p>Data created account: {dataSlice(user.metadata.creationTime)}</p>
        <p>Last login: {dataSlice(user.metadata.lastSignInTime)}</p>
        <p>Phone number: {user?.phoneNumber || "-"}</p>
        <button onClick={() => navigate("/main")}>Return</button>
      </div>
    </div>
  );
}

export default UserProfile;
