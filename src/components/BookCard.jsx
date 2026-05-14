"use client";
import { authClient } from "@/lib/auth-client";
import { DateField, Label } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const BookCard = ({ data }) => {
  const { _id, imageUrl, price, destinationName } = data;
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [date, setDate] = useState(null);

  const handleBooking = async () => {
    // 1. Check if user is logged in
    if (!user) {
      return toast.error("Please login to book a destination");
    }

    // 2. Check if date is selected
    if (!date) {
      return toast.error("Please select a departure date");
    }

    try {
      // Convert HeroUI/React-Aria date to JS Date
      const jsDate = date.toDate ? date.toDate("UTC") : new Date(date);

      const bookingData = {
        userId: user.id,
        userName: user.name,
        destinationId: _id,
        destinationName,
        price,
        imageUrl,
        departureDate: jsDate,
      };

      // 3. Fetch Token
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;

      if (!token) {
        throw new Error("Authentication token missing");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Failed to save booking");
      }

      toast.success("Booked Successfully!");
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl">
      <DateField
        value={date}
        onChange={setDate}
        className="w-full"
        label="Departure Date"
      />

      <button
        onClick={handleBooking}
        className="w-full bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400"
        disabled={!date}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookCard;
