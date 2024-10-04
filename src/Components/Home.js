/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Home = () => {
//   const [entryTime, setEntryTime] = useState("");
//   const [breakTime, setBreakTime] = useState("");
//   const [remainingTime, setRemainingTime] = useState("");
//   const [leaveTime, setLeaveTime] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [bgImage, setBgImage] = useState('');

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const savedEntryTime = localStorage.getItem("entryTime");
//     const savedBreakTime = localStorage.getItem("breakTime");
//     const savedSelectedOption = localStorage.getItem("selectedOption");

//     if (savedEntryTime) setEntryTime(savedEntryTime);
//     if (savedBreakTime) setBreakTime(savedBreakTime);
//     if (savedSelectedOption) setSelectedOption(savedSelectedOption);
//   }, []);

//   // Save data to localStorage whenever values change
//   useEffect(() => {
//     localStorage.setItem("entryTime", entryTime);
//   }, [entryTime]);

//   useEffect(() => {
//     localStorage.setItem("breakTime", breakTime);
//   }, [breakTime]);

//   useEffect(() => {
//     localStorage.setItem("selectedOption", selectedOption);
//   }, [selectedOption]);

//   const calculateRemainingTime = () => {
//     const entryTimeParts = entryTime.split(":");
//     const entryDate = new Date();
//     entryDate.setHours(parseInt(entryTimeParts[0], 10));
//     entryDate.setMinutes(parseInt(entryTimeParts[1], 10));
//     entryDate.setSeconds(0);

//     let breakMinutes = 0;
//     if (breakTime) {
//       breakMinutes = parseInt(breakTime, 10);
//     }

//     const breakTimeMillis = breakMinutes * 60 * 1000;
//     let workDurationMillis;

//     if (selectedOption === "Full Day") {
//       workDurationMillis = 8.5 * 60 * 60 * 1000;
//     } else if (selectedOption === "Half Day") {
//       workDurationMillis = 4.5 * 60 * 60 * 1000;
//     } else if (selectedOption === "Early Leave") {
//       workDurationMillis = 8.5 * 60 * 60 * 1000 - 90 * 60 * 1000;
//     }

//     const workEndDate = new Date(
//       entryDate.getTime() + workDurationMillis + breakTimeMillis
//     );

//     const currentDate = new Date();
//     const remainingTimeMillis = workEndDate - currentDate;

//     const hours = String(Math.floor(remainingTimeMillis / (1000 * 60 * 60))).padStart(2, '0');
//     const minutes = String(Math.floor((remainingTimeMillis % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
//     const seconds = String(Math.floor((remainingTimeMillis % (1000 * 60)) / 1000)).padStart(2, '0');

//     const leaveHours = workEndDate.getHours();
//     const leaveMinutes = workEndDate.getMinutes();
//     const leaveTimeFormatted = `${String(leaveHours).padStart(2, "0")}:${String(leaveMinutes).padStart(2, "0")}`;

//     if (remainingTimeMillis <= 0) {
//       setStatusMessage("You Can Go Home");
//       clearInterval(timerInterval);
//       setRemainingTime("00 hours and 00 minutes");
//       setLeaveTime(leaveTimeFormatted);
//     } else {
//       setRemainingTime(`${hours}:${minutes}:${seconds}`);
//       setLeaveTime(leaveTimeFormatted);
//       setStatusMessage(""); // Clear any previous messages
//     }
//   };

//   const handleCalculate = () => {
//     // Validation
//     const entryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex to match HH:MM format
//     if (!entryTimeRegex.test(entryTime)) {
//       setStatusMessage("Please enter a valid entry time (HH:MM).");
//       return;
//     }

//     const breakMinutes = parseInt(breakTime, 10);
//     if (isNaN(breakMinutes) || breakMinutes < 0) {
//       setStatusMessage("Please enter a valid number for break time.");
//       return;
//     }

//     if (!selectedOption) {
//       setStatusMessage("Please select a day type.");
//       return;
//     }

//     // Clear previous status message
//     setStatusMessage("");

//     if (timerInterval) {
//       clearInterval(timerInterval);
//     }

//     calculateRemainingTime();
//     const interval = setInterval(calculateRemainingTime, 1000);
//     setTimerInterval(interval);
//   };

//   useEffect(() => {
//     return () => {
//       if (timerInterval) {
//         clearInterval(timerInterval);
//       }
//     };
//   }, [timerInterval]);

//   const getRandomPhoto = async () => {
//     try {
//       const response = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: 'NQbGNg6P_ebvp7gWanWrbq9r_RzOXwFpwAXR28w_kqc'
//         }
//       });
//       if (response.data) {
//         setBgImage(response.data.urls.full);
//         document.body.style.backgroundImage = `url(${response.data.urls.full})`;
//         document.body.style.backgroundSize = "cover";
//         document.body.style.backgroundRepeat = "no-repeat";
//         document.body.style.height = '100vh'; // Make sure the div takes the full height of the viewport
//         document.body.style.display = 'flex'; // Optional: Center the button
//         document.body.style.justifyContent = 'center';
//         document.body.style.alignItems = 'center';
//         document.body.style.textAlign = 'center'; // Optional: Center text
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className="main">
//       <div className="inner-container">
//         <div className="form-group">
//           <label>Entry Time (HH:MM)</label>
//           <input
//             type="text"
//             value={entryTime}
//             onChange={(e) => setEntryTime(e.target.value)}
//             placeholder="e.g., 10:30"
//             style={{ backgroundColor: 'white' }}
//           />
//         </div>
//         <div className="form-group">
//           <label>Break Time (minutes)</label>
//           <input
//             type="text"
//             value={breakTime}
//             onChange={(e) => setBreakTime(e.target.value)}
//             placeholder="e.g., 30"
//             style={{ backgroundColor: 'white' }}
//           />
//         </div>
//         <div className="form-group">
//           <label>Select Option</label>
//           <select
//             onChange={(e) => setSelectedOption(e.target.value)}
//             value={selectedOption}
//             style={{ backgroundColor: 'white' }}
//           >
//             <option value="">Select The Day Type</option>
//             <option value="Full Day">Full Day (8:30 Hours)</option>
//             <option value="Half Day">Half Day (4:30 Hours)</option>
//             <option value="Early Leave">Early Leave (90 Minutes early)</option>
//           </select>
//         </div>
//         <button onClick={handleCalculate}>Calculate</button>
//         <div>
//           <div>
//             <button type="button" onClick={getRandomPhoto}>
//               BG-change
//             </button>
//           </div>
//           {remainingTime && (
//             <p>
//               <span>Remaining Time: </span>
//               <span className="remaining-time-label">{remainingTime}</span>
//             </p>
//           )}
//           {leaveTime && (
//             <p>
//               <span>You can leave at: </span>
//               <span className="leave-time-label">{leaveTime}</span>
//             </p>
//           )}
//           {statusMessage && <p className="status-message">{statusMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [entryTime, setEntryTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const [bgImage, setBgImage] = useState("");

  const breakTimeRef = useRef(null);
  const selectedOptionRef = useRef(null);
  const calculateButtonRef = useRef(null);

  useEffect(() => {
    const savedEntryTime = localStorage.getItem("entryTime");
    const savedBreakTime = localStorage.getItem("breakTime");
    const savedSelectedOption = localStorage.getItem("selectedOption");
    const savedBgImage = localStorage.getItem("bgImage");

    if (savedEntryTime) setEntryTime(savedEntryTime);
    if (savedBreakTime) setBreakTime(savedBreakTime);
    if (savedSelectedOption) setSelectedOption(savedSelectedOption);
    if (savedBgImage) {
      setBgImage(savedBgImage);
      document.body.style.backgroundImage = `url(${savedBgImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.height = "100vh";
      document.body.style.display = "flex";
      document.body.style.justifyContent = "center";
      document.body.style.alignItems = "center";
      document.body.style.textAlign = "center";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entryTime", entryTime);
  }, [entryTime]);

  useEffect(() => {
    localStorage.setItem("breakTime", breakTime);
  }, [breakTime]);

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  const calculateRemainingTime = () => {
    const entryTimeParts = entryTime.split(":");
    const entryDate = new Date();
    entryDate.setHours(parseInt(entryTimeParts[0], 10));
    entryDate.setMinutes(parseInt(entryTimeParts[1], 10));
    entryDate.setSeconds(0);

    let breakMinutes = 0;
    if (breakTime) {
      breakMinutes = parseInt(breakTime, 10);
    }

    const breakTimeMillis = breakMinutes * 60 * 1000;
    let workDurationMillis;

    if (selectedOption === "Full Day") {
      workDurationMillis = 8.5 * 60 * 60 * 1000;
    } else if (selectedOption === "Half Day") {
      workDurationMillis = 4.5 * 60 * 60 * 1000;
    } else if (selectedOption === "Early Leave") {
      workDurationMillis = 8.5 * 60 * 60 * 1000 - 90 * 60 * 1000;
    }

    const workEndDate = new Date(
      entryDate.getTime() + workDurationMillis + breakTimeMillis
    );

    const currentDate = new Date();
    const remainingTimeMillis = workEndDate - currentDate;

    const hours = String(
      Math.floor(remainingTimeMillis / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((remainingTimeMillis % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
      Math.floor((remainingTimeMillis % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    const leaveHours = workEndDate.getHours();
    const leaveMinutes = workEndDate.getMinutes();
    const leaveTimeFormatted = `${String(leaveHours).padStart(2, "0")}:${String(
      leaveMinutes
    ).padStart(2, "0")}`;

    if (remainingTimeMillis <= 0) {
      setStatusMessage("You Can Go Home");
      clearInterval(timerInterval);
      setRemainingTime("00 hours and 00 minutes");
      setLeaveTime(leaveTimeFormatted);
    } else {
      setRemainingTime(`${hours}:${minutes}:${seconds}`);
      setLeaveTime(leaveTimeFormatted);
      setStatusMessage("");
    }
  };

  const handleCalculate = () => {
    const entryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!entryTimeRegex.test(entryTime)) {
      setStatusMessage("Please enter a valid entry time (HH:MM).");
      return;
    }

    const breakMinutes = parseInt(breakTime, 10);
    if (isNaN(breakMinutes) || breakMinutes < 0) {
      setStatusMessage("Please enter a valid number for break time.");
      return;
    }

    if (!selectedOption) {
      setStatusMessage("Please select a day type.");
      return;
    }

    setStatusMessage("");

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);
    setTimerInterval(interval);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const getRandomPhoto = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            client_id: "NQbGNg6P_ebvp7gWanWrbq9r_RzOXwFpwAXR28w_kqc",
          },
        }
      );
      if (response.data) {
        const newBgImage = response.data.urls.full;
        setBgImage(newBgImage);
        localStorage.setItem("bgImage", newBgImage);
        document.body.style.backgroundImage = `url(${newBgImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100vh";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.textAlign = "center";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextFieldRef && nextFieldRef.current) {
        nextFieldRef.current.focus();
      }
    }
  };

  return (
    <div className="main">
      <div className="inner-container">
        <div className="form-group">
          <label>Entry Time (HH:MM)</label>
          <input
            type="text"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            placeholder="e.g., 10:30"
            onKeyPress={(e) => handleKeyPress(e, breakTimeRef)}
            style={{ backgroundColor: "white" }}
          />
        </div>
        <div className="form-group">
          <label>Break Time (minutes)</label>
          <input
            type="text"
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
            placeholder="e.g., 30"
            onKeyPress={(e) => handleKeyPress(e, selectedOptionRef)}
            ref={breakTimeRef}
            style={{ backgroundColor: "white" }}
          />
        </div>
        <div className="form-group">
          <label>Select Option</label>
          <select
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
            ref={selectedOptionRef}
            onKeyPress={(e) => handleKeyPress(e, calculateButtonRef)}
            style={{ backgroundColor: "white" }}
          >
            <option value="">Select The Day Type</option>
            <option value="Full Day">Full Day (8:30 Hours)</option>
            <option value="Half Day">Half Day (4:30 Hours)</option>
            <option value="Early Leave">Early Leave (90 Minutes early)</option>
          </select>
        </div>
        <div>
          <div className="button-container">
            <button onClick={handleCalculate} ref={calculateButtonRef}>
              Calculate
            </button>
            <button type="button" onClick={getRandomPhoto}>
              BG-change
            </button>
          </div>

          {remainingTime && (
            <p>
              <span>Remaining Time: </span>
              <span className="remaining-time-label">{remainingTime}</span>
            </p>
          )}
          {leaveTime && (
            <p>
              <span>You can leave at: </span>
              <span className="leave-time-label">{leaveTime}</span>
            </p>
          )}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;