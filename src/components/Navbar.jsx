// import Image from "next/image";
"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const handleLogout = async () => {
    await authClient.signOut();
    alert("logout ");
  };
  return (
    <div className="flex justify-between p-3 max-w-7xl mx-auto w-full">
      <ul className="flex justify-between gap-3 items-center font-semibold">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destination"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/myBookings"}>My Bookings</Link>
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
          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        </li>
        <li>
          <Link href={"/signup"}>Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
