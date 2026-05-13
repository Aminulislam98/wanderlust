import BookCard from "@/components/BookCard";
import { DeleteUserAlert } from "@/components/DeleteUserAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

const DetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/destination/${id}`);
  const data = await res.json();
  const {
    imageUrl,
    country,
    price,
    departureDate,
    destinationName,
    description,
    duration,
    category,
  } = data;
  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-6 md:py-10">
      <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
        <div className="relative w-full h-62 sm:h-87 md:h-125">
          <Image
            src={imageUrl}
            fill
            alt={destinationName}
            className="object-cover"
          />
        </div>

        <div className="p-5 md:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                <FaLocationDot />
                <p>{country}</p>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mt-2">
                {destinationName}
              </h1>
            </div>

            <div className="bg-gray-100 px-5 py-3 rounded-xl w-fit">
              <p className="text-2xl md:text-3xl font-bold text-black">
                ${price}
              </p>
              <span className="text-sm text-gray-500">Per Person</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm md:text-base border-y py-4">
            <div className="flex items-center gap-2">
              <SlCalender />
              <p>{departureDate}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Duration:</p>
              <span>{duration} Days</span>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-medium">Category:</p>
              <span>{category}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              About This Tour
            </h2>

            <p className="text-gray-700 leading-8 text-sm md:text-base">
              {description}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <BookCard data={data} />
            <EditModal data={data}></EditModal>
            <DeleteUserAlert data={data}></DeleteUserAlert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
