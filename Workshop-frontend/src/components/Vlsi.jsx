import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/UGYAN(1).png";
import poster from "../assets/poster.jpg";
import { SlCalender } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { GiSandsOfTime } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import pop from "../assets/popup.jpg";

const Vlsi = () => {
  const navigate = useNavigate();

  const gotoregister = () => {
    navigate("/register");
  };

  const [time, setTime] = useState(0); // Default to 0 initially
  const timerRef = useRef(null);

  // Specify the start time directly (e.g., November 24, 2024, 10:30:00 UTC)
  const startTime = new Date('2024-11-24T10:30:00Z').getTime(); // Convert to milliseconds

  // Function to calculate remaining time (in seconds)
  const calculateRemainingTime = () => {
    const currentTime = Date.now(); // Current time in milliseconds
    const remainingTime = startTime - currentTime; // Difference in time

    if (remainingTime > 0) {
      setTime(Math.floor(remainingTime / 1000)); // Set time to remaining seconds
    } else {
      setTime(0); // Time has expired, set to 0
    }
  };

  useEffect(() => {
    // Initial calculation when the component is mounted
    calculateRemainingTime();

    // Update the remaining time every second (1000 ms)
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Decrease by 1 second
        } else {
          clearInterval(timerRef.current); // Stop the timer when it reaches 0
          return 0;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24)); // Calculate number of days
    const hours = Math.floor((seconds % (3600 * 24)) / 3600); // Calculate number of hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate number of minutes
    const secs = seconds % 60; // Calculate number of seconds

    if (days > 0) {
      return `${days}D:${hours.toString().padStart(2, '0')}H:${minutes.toString().padStart(2, '0')}M:${secs.toString().padStart(2, '0')}s`;
    } else {
      return `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${secs.toString().padStart(2, '0')}s`;
    }
  };

  return (
    <div className="background-div">
      <div className="top-nav-work">
        <div className="logo"><img className="logo-img" src={logo} alt="Logo" /></div>
        <div className="vlsi"><p>VLSI Workshop</p></div>
      </div>
      <div className="description">
        <p>
          Our VLSI workshop offers an in-depth understanding of integrated circuit (IC) design and fabrication, covering both digital and analog circuits. Through hands-on sessions, students explore tools, software, and challenges in VLSI, preparing for careers in semiconductor technology and related fields.
        </p>
      </div>
      <div className="header3">
        <div className="poster">
          <img className="poster-img" src={poster} alt="Poster" />
        </div>
        <div>
          <p className="todo">Things You'll Gain:</p>
          <div className="points">
            <p>1. Introduction to VLSI Technology: what is VLSI</p>
            <p>2. VLSI Design Flow: From concept to final product</p>
            <p>3. Digital & Analog Circuit Design: Logic gates, amplifiers, and more</p>
            <p>4. Industry-Standard Tools: Learn tools like Cadence, Synopsys, and Mentor Graphics</p>
            <p>5. Fabrication Process: Insights into semiconductor manufacturing</p>
            <p>6. Power Optimization: Techniques for low power consumption</p>
            <p>7. Career pathway & Emerging Trends: AI, 5G, IoT, and future technologies in VLSI</p>
          </div>
        </div>
      </div>
      <div className="header4">
        <div className="options"><SlCalender className="icon" /><p>On November 24, 2024</p></div>
        <div className="options"><GiSandsOfTime className="icon" /><p className="timer">2 + hours</p></div>
        <div className="options"><RiLiveLine className="icon" /><p>Live Session</p></div>
        <div className="options"><IoTimeOutline className="icon" /><p>10:30am Onwards</p></div>
      </div>
      <div className="footer">
        <div className="money-rate">
          <p className="money-real">Rs. 59</p>
          <p className="money-price">Rs. 299</p>
        </div>
        <div className="offer-end">
          <p>Offer Ends In:</p> <span className='timer1'>{formatTime(time)}</span>
        </div>
        <div className="any-class" onClick={gotoregister}>
          <p className="register-link">Click to Register</p>
        </div>
      </div>
      <div>
        <img className="popup" src={pop} alt="Logo" />  
      </div>
    </div>
  );
};

export default Vlsi;
