import React from "react";

import "./Action.scss";

export default function Action({ autoplay, onAutoplayChange, time = 0 }) {
  return (
    <div className="Action">
      <button onClick={() => onAutoplayChange(!autoplay)}>
        {autoplay ? "▶" : "■"}
      </button>
      <div className="timeline" style={{ width: `${time}%` }} />
    </div>
  );
}
