import React from 'react';

const Loader = () => {
  // Letters arranged in correct order: L-O-A-D-I-N-G
  const letters = ["L", "O", "A", "D", "I", "N", "G"].reverse(); // Reverse to start with "G" first

  return (
    <div className="min-h-screen w-full relative bg-[#EED36D] dark:bg-[#1A1A2E] transition-colors duration-300 overflow-hidden">
      <style>
        {`
          #load {
            position: absolute;
            width: 600px;
            height: 36px;
            left: 50%;
            top: 45%;
            margin-left: -300px;
            overflow: visible;
            user-select: none;
            cursor: default;
          }

          #load div {
            position: absolute;
            width: 20px;
            height: 36px;
            opacity: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: 900;
            animation: move 2s linear infinite;
            transform: rotate(180deg);
            /* Using your brand colors: Primary Blue for Light, Amber for Dark */
            color: #194F70; 
          }

          /* Dark mode specific letter color override */
          .dark #load div {
            color: #FFB400;
          }

          @keyframes move {
            0% {
              left: 0;
              opacity: 0;
            }
            35% {
              left: 41%;
              transform: rotate(0deg);
              opacity: 1;
            }
            65% {
              left: 59%;
              transform: rotate(0deg);
              opacity: 1;
            }
            100% {
              left: 100%;
              transform: rotate(-180deg);
              opacity: 0;
            }
          }
        `}
      </style>

      <div id="load">
        {letters.map((char, index) => (
          <div 
            key={index} 
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;