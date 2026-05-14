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
    if (!user) {
      return toast.error("Please login to book a destination");
    }
    // 2. Check if date is selected
    if (!date) {
      return toast.error("Please select a departure date");
    }
    const bookingData = {
      userId: user?.id,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      departureDate: new Date(date),
    };

    // getting token inside client side :
    const { data: token } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token?.token}`,
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
