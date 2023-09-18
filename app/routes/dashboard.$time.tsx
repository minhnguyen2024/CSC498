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
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { getAllAvailableRoomsByBlockAndAmenities } from "~/models/reserve.server";
import { requireUserId } from "~/session.server";

function getAvailableRoomsByBlock(arr: any) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].id);
  }
  return result;
}

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  invariant(params.time, "time not found");
  const time = JSON.parse(decodeURIComponent(params.time));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  let accessible = search.get("accessible");
  if (!accessible) {
    accessible = "off";
  }
  let power = search.get("power");
  if (!power) {
    power = "off";
  }
  let reservable = search.get("reservable");
  if (!reservable) {
    reservable = "off";
  }
  let softSeating = search.get("soft-seating");
  if (!softSeating) {
    softSeating = "off";
  }
  let tableChairs = search.get("table-chairs");
  if (!tableChairs) {
    tableChairs = "off";
  }
  let monitor = search.get("monitor");
  if (!monitor) {
    monitor = "off";
  }
  let whiteboard = search.get("whiteboard");
  if (!whiteboard) {
    whiteboard = "off";
  }
  let window = search.get("window");
  if (!window) {
    window = "off";
  }
  const queryObject = {
    userId,
    time,
    accessible,
    power,
    reservable,
    softSeating,
    tableChairs,
    monitor,
    whiteboard,
    window,
  };
  const result = await getAllAvailableRoomsByBlockAndAmenities(queryObject);
  const serializedArray = encodeURIComponent(JSON.stringify(result));
  return { time, serializedArray };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  const time = body.get("time");
  const room = body.get("room");
  invariant(room, "room not found");
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserReserved = userReservation.length === 1 ? true : false;
  if (isUserReserved) {
    return redirect("/error/reservationDenied");
  }

  const confirmResult = await updateBlockWithUserId({ userId, room });
  return redirect(`/confirm/${time}/${room}`);
};

export default function DashboardReserveUserId() {
  const { time, serializedArray } = useLoaderData<typeof loader>();
  const deserializedRooms = JSON.parse(decodeURIComponent(serializedArray));
  return (
    <div>
      <form method="get">
        <div className="items-center justify-center">
          <div className="grid grid-cols-2">
            <div className="p-3">
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="accessible" id="accessible" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accessible Seat/Space
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="power" id="power" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Power Available
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="reservable" id="reservable" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Reservable
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="soft-seating" id="soft-seating" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Soft Seating Only
                  </label>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="table-chairs" id="table-chairs" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Table and Chairs
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="monitor" id="monitor" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Wall-mounted Monitor
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="whiteboard" id="whiteboard" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Whiteboard
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2 my-2">
                <input type="checkbox" name="window" id="window" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Window
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="border rounded hover:bg-blue-300 bg-blue-500 text-white"
        >
          Filter
        </Button>
      </form>
      <div>
        <form method="post">
          <input type="hidden" value={time} name="time" />

          <Table>
            <TableCaption>Available Study Rooms</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Room #</TableHead>
                <TableHead>Amenities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deserializedRooms.map((item: any) => (
                <TableRow
                  className="border rounded hover:bg-slate-200"
                  key={item.roomId}
                >
                  <TableCell>{item.roomId}</TableCell>
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
                    <input
                      type="checkbox"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="border rounded hover:bg-green-300 bg-green-500 text-white">
            Confirm
          </Button>
        </form>
      </div>
      <Outlet />
    </div>
  );
}
