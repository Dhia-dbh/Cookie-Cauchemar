import React, { useState, useEffect, useRef } from 'react';
import './cookie.css';
import cursorimg from './assets/arrow.png';

const Cookie = () => {
  const [isGeneratingPointers, setIsGeneratingPointers] = useState(false);
  const [pointers, setPointers] = useState([]);
  const [mainCursorPosition, setMainCursorPosition] = useState({ x: 0, y: 0 });
  const [isCancelButtonVisible, setCancelButtonVisible] = useState(false);
  const [cancelButtonPosition, setCancelButtonPosition] = useState({ x: 80, y: 470 });
  const [isConfirmButtonVisible, setConfirmButtonVisible] = useState(false);
  const [confirmButtonPosition, setConfirmButtonPosition] = useState({ x: 450, y: 60 });

  const containerRef = useRef(null);
  const cancelButtonInterval = useRef(null); // Store the interval for moving the cancel button randomly
  const confirmButtonMoveRef = useRef(null); // Store the reference for confirming button movement

  // Track the main cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMainCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle generating fake pointers when the button is clicked
  const handleButtonClick = () => {
    setIsGeneratingPointers(true);
    const randomPointers = Array.from({ length: 100 }).map(() => ({
      id: Math.random(),
      initialOffsetX: Math.random() * window.innerWidth, // Random position within the window width
      initialOffsetY: Math.random() * window.innerHeight, // Random position within the window height
    }));
    setPointers(randomPointers);
    setCancelButtonVisible(true); // Show the cancel button when the pointers are generated

    // Move the cancel button randomly
    startCancelButtonMovement();

    // Hide the "Generate More Pointers" button
    const button = document.querySelector('#cliquer');
    if (button) button.style.display = 'none'; // Hide the generate button
  };

  // Function to move the cancel button smoothly
  const startCancelButtonMovement = () => {
    cancelButtonInterval.current = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      setCancelButtonPosition({ x: randomX, y: randomY });
    }, 2000); // Update the position every 2 seconds
  };

  // Function to move the confirm button when the mouse is close
  const handleConfirmButtonMovement = () => {
    const distance = Math.sqrt(
      Math.pow(mainCursorPosition.x - confirmButtonPosition.x, 2) + Math.pow(mainCursorPosition.y - confirmButtonPosition.y, 2)
    );

    if (distance < 150) {
      // Move the confirm button further away from the cursor
      let randomX = Math.random() * window.innerWidth;
      let randomY = Math.random() * window.innerHeight;

      // Ensure the button doesn't go out of bounds
      randomX = Math.min(Math.max(randomX, 0), window.innerWidth - 100); // Keep within window width
      randomY = Math.min(Math.max(randomY, 0), window.innerHeight - 50); // Keep within window height

      setConfirmButtonPosition({ x: randomX, y: randomY });
    }
  };

  // Monitor cursor proximity to the "Are you sure?" button
  useEffect(() => {
    if (!isConfirmButtonVisible) return;

    const intervalId = setInterval(() => {
      handleConfirmButtonMovement();
    }, 0.5); 

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount
    };
  }, [mainCursorPosition, isConfirmButtonVisible, confirmButtonPosition]);

  // Handle the cancel button click
  const handleCancelClick = () => {
    setCancelButtonVisible(false); // Hide the cancel button after it's clicked
    
    // Stop moving the cancel button
    if (cancelButtonInterval.current) {
      clearInterval(cancelButtonInterval.current);
    }

    // Show the "Are you sure?" button and start its movement
    setConfirmButtonVisible(true);
  };

  // Handle the "Are you sure?" button click
  const handleConfirmClick = () => {
    console.log("Confirmed!");
    // Reset everything after confirmation
    setIsGeneratingPointers(false);
    setPointers([]);
    setCancelButtonVisible(false);
    setConfirmButtonVisible(false);

    // Stop moving both buttons
    if (cancelButtonInterval.current) {
      clearInterval(cancelButtonInterval.current);
    }
  };

  // Update the positions of fake pointers whenever the main cursor moves
  useEffect(() => {
    if (!isGeneratingPointers) return;

    // Update the positions of the fake pointers
    const updatedPointers = pointers.map((pointer) => {
      const deltaX = mainCursorPosition.x;
      const deltaY = mainCursorPosition.y;
      return {
        ...pointer,
        offsetX: pointer.initialOffsetX + deltaX - window.innerWidth / 2, // Spread the fake pointers across the screen more evenly
        offsetY: pointer.initialOffsetY + deltaY - window.innerHeight / 2,
      };
    });

    setPointers(updatedPointers);
  }, [mainCursorPosition, isGeneratingPointers]);

  // Styles for the fake pointers
  const fakePointerStyle = (pointer) => ({
    position: 'absolute',
    top: pointer.offsetY,
    left: pointer.offsetX,
    pointerEvents: 'none',
    zIndex: 3000, // Ensure fake pointers are above the cancel button
  });

  return (
    <div className="App" ref={containerRef}>
      {/* Centered button container */}
      <div className="button-container">
        <button onClick={handleButtonClick} id="cliquer"
        
        >cliquer moi</button>
      </div>

      {/* Cancel button that moves smoothly on the screen */}
      {isCancelButtonVisible && (
        <button
          className="cancel-button"
          style={{ top: cancelButtonPosition.y, left: cancelButtonPosition.x }}
          onClick={handleCancelClick}
        >
          Annuler
        </button>
      )}

      {/* "Are you sure?" button that moves smoothly */}
      {isConfirmButtonVisible && (
        <button
          className="confirm-button"
          style={{ top: confirmButtonPosition.y, left: confirmButtonPosition.x }}
          onClick={handleConfirmClick}
        >
          Vous etes sur?
        </button>
      )}

      {isGeneratingPointers &&
        pointers.map((pointer) => (
          <div
            key={pointer.id}
            className="fake-pointer"
            style={fakePointerStyle(pointer)}
          >
            {/* The pointer icon */}
            <img
              src={cursorimg}
              alt="fake pointer"
              width="35"
              height="35"
            />
          </div>
        ))}
    </div>
  );
};

export default Cookie;
