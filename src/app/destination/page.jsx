import React from "react";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:4000/destination ");
  const data = await res.json();
  console.log("this is data form mongodb:", data);
  return <div className="max-w-7xl mx-auto w-full"></div>;
};

export default DestinationPage;
