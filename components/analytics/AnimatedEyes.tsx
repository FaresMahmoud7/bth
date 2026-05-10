"use client";

export function AnimatedEyes() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bth-blink {
            0%, 85%          { transform: scaleY(1); }
            89%, 93%         { transform: scaleY(0.05); }
            96%, 100%        { transform: scaleY(1); }
          }
          @keyframes bth-blink-r {
            0%, 87%          { transform: scaleY(1); }
            91%, 95%         { transform: scaleY(0.05); }
            98%, 100%        { transform: scaleY(1); }
          }
          @keyframes bth-look {
            0%,  10%  { transform: translateX(0px);  }
            20%, 35%  { transform: translateX(-5px); }
            50%, 65%  { transform: translateX(5px);  }
            78%, 88%  { transform: translateX(-3px); }
            95%, 100% { transform: translateX(0px);  }
          }

          .bth-eye-l  { transform-origin: 14px 15px; animation: bth-blink   4.8s ease-in-out infinite; }
          .bth-eye-r  { transform-origin: 40px 15px; animation: bth-blink-r 4.8s ease-in-out infinite; }
          .bth-pupil  { animation: bth-look 6s ease-in-out infinite; }
        `
      }} />

      <svg
        width="56"
        height="30"
        viewBox="0 0 56 30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Left eye ── */}
        <g className="bth-eye-l">
          {/* sclera */}
          <ellipse cx="14" cy="15" rx="12" ry="13" fill="#111827" stroke="#F58220" strokeWidth="1.8" />
          {/* pupil + iris (moves left-right) */}
          <g className="bth-pupil">
            <circle cx="14" cy="15" r="7"   fill="#F58220" opacity="0.15" />
            <circle cx="14" cy="15" r="4.5" fill="#F58220" opacity="0.55" />
            <circle cx="14" cy="15" r="2.8" fill="#F58220" />
            {/* glint */}
            <circle cx="11.8" cy="12.5" r="1.3" fill="white" opacity="0.85" />
            <circle cx="15.2" cy="13.8" r="0.6" fill="white" opacity="0.5" />
          </g>
        </g>

        {/* ── Right eye ── */}
        <g className="bth-eye-r">
          {/* sclera */}
          <ellipse cx="40" cy="15" rx="12" ry="13" fill="#111827" stroke="#F58220" strokeWidth="1.8" />
          {/* pupil + iris (moves left-right) */}
          <g className="bth-pupil">
            <circle cx="40" cy="15" r="7"   fill="#F58220" opacity="0.15" />
            <circle cx="40" cy="15" r="4.5" fill="#F58220" opacity="0.55" />
            <circle cx="40" cy="15" r="2.8" fill="#F58220" />
            {/* glint */}
            <circle cx="37.8" cy="12.5" r="1.3" fill="white" opacity="0.85" />
            <circle cx="41.2" cy="13.8" r="0.6" fill="white" opacity="0.5" />
          </g>
        </g>
      </svg>
    </>
  );
}
