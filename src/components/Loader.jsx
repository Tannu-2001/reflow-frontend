import React, { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 1;              // 👈 slow & smooth

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          onFinish && onFinish();
        }, 400);
      }

      setProgress(value);
    }, 50); // 👈 speed control

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader-wrap">
      {/* TOP LOADING LINE */}
      <div className="loader-line">
        <div
          className="loader-line-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TOP RIGHT % */}
      <div className="loader-percent">
        {progress}%
      </div>
    </div>
  );
}