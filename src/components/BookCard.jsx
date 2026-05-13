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
    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      departureDate: new Date(date),
    };

    const res = await fetch("http://localhost:4000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();

    toast.success("booked Successful");
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
      >
        Book Now
      </button>
      <DateField onChange={setDate} className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
    </div>
  );
};

export default BookCard;
