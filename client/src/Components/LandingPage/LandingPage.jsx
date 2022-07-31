import React from "react";
import "./LandingPage.css";
import btnImg from "./btnImg.png";
import backgroundLandingPage from "./ackgroundLandingPage.jpg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="greatDiv">
      <div className="mainLandingDiv">
        <img
          src={backgroundLandingPage}
          alt="noneImg"
          className="backgroundImg"
        ></img>
        <div className="logoLanding">
          <h2>WELCOME TO DOG API</h2>
          <Link to="/home" alt="noneImg" className="link">
            <img src={btnImg} alt="" className="imgBtn"></img>
          </Link>
          <button className="button">
            <a className="link" href="/home">
              Start
            </a>
          </button>
        </div>
      </div>
      <div className="sectionIIDiv">
        <h3 className="">Here you can:</h3>
        <ul className="callerLanding">
          <li>Know all info about existing Dogs Breeds</li>
          <li>Create your own Breed</li>
        </ul>
      </div>
    </div>
  );
}
