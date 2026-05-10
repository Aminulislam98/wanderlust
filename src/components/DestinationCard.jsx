import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RxArrowTopRight } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";

const DestinationCard = ({ destination }) => {
  const {
    category,
    country,
    departureDate,
    description,
    destinationName,
    duration,
    imageUrl,
    price,
    _id,
  } = destination;
  return (
    <div className=" border">
      <div>
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt={destinationName}
        ></Image>
      </div>
      <div className="flex-col p-3 space-y-2 ">
        <div className="flex gap-2 justify-start items-center">
          <FaLocationDot />
          <p className="font-medium text-base">{country}</p>
        </div>
        <div className="flex justify-between items-center text-xl font-semibold">
          <p>{destinationName}</p>
          <div>
            ${price}
            <span className="text-sm">/Person</span>
          </div>
        </div>
        <div className="flex justify-start text-gray-600 items-center gap-2 text-sm">
          <SlCalender /> <p>{departureDate}</p>
        </div>
        <div>
          <Link
            className="flex justify-start font-semibold items-center text-blue-500"
            href={"#"}
          >
            BOOK NOW <RxArrowTopRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DestinationCard;
