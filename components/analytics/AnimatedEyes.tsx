"use client";

export function AnimatedEyes() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bth-blink {
            0%, 82%       { transform: scaleY(1); }
            86%, 90%      { transform: scaleY(0.07); }
            93%, 100%     { transform: scaleY(1); }
          }
          @keyframes bth-blink2 {
            0%, 78%       { transform: scaleY(1); }
            82%, 86%      { transform: scaleY(0.07); }
            89%, 100%     { transform: scaleY(1); }
          }
          @keyframes bth-pupil-move {
            0%,  12%  { transform: translate(0px, 0px);  }
            22%, 38%  { transform: translate(-3.5px, 0px); }
            50%, 64%  { transform: translate(3.5px, 0px);  }
            76%, 88%  { transform: translate(-2px, 1px); }
            95%, 100% { transform: translate(0px, 0px);  }
          }

          .bth-L { transform-origin: 13px 15px; animation: bth-blink  5s ease-in-out infinite; }
          .bth-R { transform-origin: 37px 15px; animation: bth-blink2 5s ease-in-out infinite; }
          .bth-P { animation: bth-pupil-move 7s ease-in-out infinite; }
        `
      }} />

      <svg width="50" height="30" viewBox="0 0 50 30"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

        {/* ── Left Eye ── */}
        <g className="bth-L">
          {/* outline */}
          <ellipse cx="13" cy="15" rx="11" ry="13"
            fill="none" stroke="#F58220" strokeWidth="1.6" />
          {/* iris glow */}
          <ellipse cx="13" cy="15" rx="7" ry="8"
            fill="#F58220" opacity="0.08" />
          {/* moving part */}
          <g className="bth-P">
            {/* iris */}
            <circle cx="13" cy="15" r="5"
              fill="#F58220" opacity="0.25" />
            {/* pupil */}
            <circle cx="13" cy="15" r="3.2"
              fill="#F58220" opacity="0.9" />
            {/* glint */}
            <circle cx="11.4" cy="13.2" r="1.1"
              fill="white" opacity="0.9" />
          </g>
        </g>

        {/* ── Right Eye ── */}
        <g className="bth-R">
          <ellipse cx="37" cy="15" rx="11" ry="13"
            fill="none" stroke="#F58220" strokeWidth="1.6" />
          <ellipse cx="37" cy="15" rx="7" ry="8"
            fill="#F58220" opacity="0.08" />
          <g className="bth-P">
            <circle cx="37" cy="15" r="5"
              fill="#F58220" opacity="0.25" />
            <circle cx="37" cy="15" r="3.2"
              fill="#F58220" opacity="0.9" />
            <circle cx="35.4" cy="13.2" r="1.1"
              fill="white" opacity="0.9" />
          </g>
        </g>

      </svg>
    </>
  );
}
