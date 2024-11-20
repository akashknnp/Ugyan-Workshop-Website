import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/UGYAN(1).png";
import poster from "../assets/poster.jpg";
import { SlCalender } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { GiSandsOfTime } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Vlsi = () => {
  const navigate = useNavigate(); // Move useNavigate to the top level of the component

  const gotoregister = () => {
    navigate("/register"); // Correct usage
  };

  const [time, setTime] = useState(24 * 60 * 60); // Default 24 hours in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    // Check if there's a saved timer state in localStorage
    const savedEndTime = localStorage.getItem('timerEndTime');

    if (savedEndTime) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const remainingTime = parseInt(savedEndTime) - currentTime;

      if (remainingTime > 0) {
        setTime(remainingTime);
      } else {
        setTime(0); // Timer has expired
      }
    } else {
      // Set the initial end time (24 hours from now)
      const endTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      localStorage.setItem('timerEndTime', endTime);
    }

    // Start the timer
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        else{
          if (prevTime <= 0) {
            return 86400; // Reset to 24 hours
          }
        }
        // }
        //  else {
        //   clearInterval(timerRef.current);
        //   return 0;
        // }
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerRef.current);
  }, []);

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className='background-div'>
      <div className='top-nav-work'>
        <div className='logo'><img className="logo-img" src={logo}></img></div>
        <div className='vlsi'><p>VLSI Workshop</p></div>
      </div>
      <div className='description'>
        <p>
          Our VLSI workshop offers an in-depth understanding of integrated circuit (IC) design and fabrication, covering both digital and analog circuits. Through hands-on sessions, students explore tools, software, and challenges in VLSI, preparing for careers in semiconductor technology and related fields.
        </p>
      </div>
      <div className='header3'>
        <div className='poster'>
          <img className="poster-img" src={poster}></img>
        </div>
        <div>
          <p className='todo'>Things You'll Gain:</p>
          <div className='points'>
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
      <div className='header4'>
        <div className='options'><SlCalender className='icon'/><p>On November 24, 2024</p></div>
        <div className='options'><GiSandsOfTime className='icon'/><p className='timer'>2 + hours</p></div>
        <div className='options'><RiLiveLine className='icon'/><p>Live Session</p></div>
        <div className='options'><IoTimeOutline className='icon'/><p>10:30am Onwards</p></div>
      </div>
      <div className='footer'>
        <div className='money-rate'><p className='money-real'>Rs. 59</p><p className='money-price'>Rs. 299</p></div>
        <div className='offer-end'><p>Offer Ends In</p> {formatTime(time)}</div>
        <div className='any-class' onClick={gotoregister}> <p className='register-link'>Click to Register</p> </div>
      </div>
    </div>
  );
};

export default Vlsi;
