// import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between p-3 max-w-7xl mx-auto w-full">
      <ul className="flex justify-between gap-3 items-center font-semibold">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>
        <li>
          <Link href={"/add-destination"}>Add Destinations</Link>
        </li>
      </ul>
      <div>
        <h1 className="text-[#15A1BF] text-3xl font-bold">Wanderlust</h1>
      </div>
      <ul className="flex justify-between gap-3 items-center font-semibold">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/signin"}>Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
