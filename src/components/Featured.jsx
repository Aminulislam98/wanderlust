import { div } from "framer-motion/client";
import Image from "next/image";
import React from "react";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const data = await res.json();
  console.log("this is data of featured : ", data);
  return (
    <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-3xl py-5">Featured </h1>
      <div className=" grid grid-cols-3">
        {data.map((item) => (
          <div key={item._id}>
            <div>
              {item?.imageUrl && (
                <Image
                  width={400}
                  height={400}
                  src={item?.imageUrl}
                  alt={item?.destinationName}
                ></Image>
              )}
            </div>
            <p>{item.destinationName}</p>
            <p>{item.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
