import React from "react";

const TotalAmount = ({ total }) => {
  return (
    <div className="total">
      <h3>Your total Amount: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default TotalAmount;
