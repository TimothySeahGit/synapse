import React from "react";

function Background({ imageUrl }) {
  const styles = { width: "18rem" };

  return (
    <div
      className="card m-3"
      style={{
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        position: "absolute"
      }}
    >
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body" />
    </div>
  );
}

export default Background;
