import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  json,
  type ActionArgs,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const userReservation: object[] = await confirmRoomBookingWithUserId(
    userId.toString(),
  );
  if (userReservation.length > 0) {
    const userReservationObj = userReservation[0];
    return json(userReservationObj);
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const userId = (await requireUserId(request)).toString();
  const body = await request.formData();
  let blockId = body.get("blockId");
  invariant(blockId, "blockId not found");
  const roomObj: any = { blockId: blockId.toString() };
  await updateBlockWithUserId({
    userId: "0",
    room: roomObj,
  });
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserCancelled = userReservation.length === 0 ? true : false;
  if (isUserCancelled) {
    return redirect("/dashboard/reserve");
  }
  return null;
}

export default function ReservationStatus() {
  const data: any = useLoaderData<typeof loader>();
  return (
    <div>
      {data ? (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-[380px] border rounded">
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
              <Form method="post">
                <input type="hidden" value={data.blockId} name="blockId" />
                <Button className="border rounded bg-red-500 text-white">
                  Cancel Reservation
                </Button>
              </Form>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <p>No Study Rooms Reserved</p>
      )}
    </div>
  );
}
