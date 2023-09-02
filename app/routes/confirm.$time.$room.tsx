import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { confirmRoomBookingWithUserId } from "~/models/confirm.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.time, "time not found");
  invariant(params.room, "room not found");
  // const isConfirmed = await confirmRoomBookingWithUserId(userId.toString())
  const room = JSON.parse(decodeURIComponent(params.room));
  console.log(room);
  return json(room);
};

export default function ConfirmReservation() {
    const data = useLoaderData<typeof loader>()

  return (
    <div>
      <p></p>
      <Card>
        <CardHeader>
          <CardTitle>Your Reservation Has Been Confirmed!</CardTitle>
          <CardDescription>See below for details</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Room Number: {data.roomId}</p>
          {data.accessible === 1 ? <p>✅ Accessible</p> : <></>}
          {data.power === 1 ? <p>✅ Power </p> : <></>}
          {data.reservable === 1 ? <p>✅ Reservable</p> : <></>}
          {data.softSeating === 1 ? <p>✅ Soft Seating</p> : <></>}
          {data.tableChairs === 1 ? <p>✅ Table and Chairs</p> : <></>}
          {data.monitor === 1 ? <p>✅ Monitor</p> : <></>}
          {data.whiteboard === 1 ? <p>✅ Whiteboard</p> : <></>}
          {data.window === 1 ? <p>✅ Window</p> : <></>}
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
