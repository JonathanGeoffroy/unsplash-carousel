import React from "react";
import "./Thumbnails.scss";

export default function Thumbnails({ data }) {
  return (
    <div className="thumbnails">
      {data.map((item) => (
        <img key={item.id} src={item.thumbnailUrl} alt="" />
      ))}
    </div>
  );
}
