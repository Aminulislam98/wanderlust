import { Delete } from "@/components/DeleteAlert";
import { auth } from "@/lib/auth";
import { div } from "framer-motion/client";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const result = await res.json();
  const data = Array.isArray(result) ? result : [];

  return data ? (
    <div>
      {data?.map((item) => (
        <div key={item._id}>
          <div>
            <Image
              src={item.imageUrl}
              width={200}
              height={200}
              alt={item.destinationName}
            ></Image>
          </div>
          <p>{item.destinationName}</p>
          <Delete bookingId={item._id} />
        </div>
      ))}
    </div>
  ) : (
    <h1>No data found</h1>
  );
};

export default MyBookingPage;
