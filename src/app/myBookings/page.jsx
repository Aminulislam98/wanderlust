import { Delete } from "@/components/DeleteAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;
  const res = await fetch(`http://localhost:4000/booking/${user.id}`);
  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto">
      {data.map((item) => (
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
  );
};

export default MyBookingPage;
