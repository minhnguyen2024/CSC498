import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.time, "time not found");
  invariant(params.rooms, "rooms not found");
  const deserializedRooms = JSON.parse(decodeURIComponent(params.rooms));
  const time: string = params.time;
  const obj = { userId, time, deserializedRooms };
  return json(obj);
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = body.get("userId");
  const time = body.get("time");
  const room = JSON.parse(body.get("room")?.toString() || "")
  console.log("time ", time);
  console.log("room ", )
  return null;
};
export default function AvailableRoomsByTimeBlock() {
  const { userId, time, deserializedRooms } = useLoaderData<
    typeof action
  >() || { userId: 0, time: "0", deserializedRooms: [] };
//   console.log(deserializedRooms);
  return (
    <div>
      <p>Avaiable rooms</p>
      <div>
        <Table>
          <TableCaption>A list of available Study Rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room #</TableHead>
              <TableHead>Amenities</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deserializedRooms.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {item.accessible == 1 ? "Accessible, " : " "}
                  {item.power == 1 ? "Power, " : " "}
                  {item.reservable == 1 ? "Reservable, " : " "}
                  {item.softSeating == 1 ? "Soft-seating, " : " "}
                  {item.tableChairs == 1 ? "Table and Chairs, " : " "}
                  {item.monitor == 1 ? "Monitor, " : " "}
                  {item.whiteboard == 1 ? "Whiteboard, " : " "}
                  {item.window == 1 ? "Window, " : " "}
                </TableCell>
                <TableCell>
                  <form method="post">
                    <input type="hidden" value={userId} name="userId" />
                    <input type="hidden" value={time} name="time" />
                    <input
                      type="hidden"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                    <Button>Confirm</Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
