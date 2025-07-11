import React from "react";

function Prayer({ name, time }) {
  return (
    <div className="prayer">
      <h4>{name}</h4>
      <p>{time}</p>
    </div>
  );
}

export default Prayer;
