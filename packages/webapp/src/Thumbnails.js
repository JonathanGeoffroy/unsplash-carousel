import React from "react";
import "./Thumbnails.scss";

export default function Thumbnails({ data, selectedIndex, onSelectionChange }) {
  return (
    <div className="thumbnails">
      {data.map((item, index) => (
        <button key={item.id} onClick={() => onSelectionChange(index)}>
          <img
            className={index === selectedIndex ? "selected" : ""}
            src={item.thumbnailUrl}
            alt=""
          />
        </button>
      ))}
    </div>
  );
}
