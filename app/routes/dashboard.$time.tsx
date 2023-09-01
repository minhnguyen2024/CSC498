import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
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
  const userId = await requireUserId(request);
  invariant(params.time, "time not found");
  const time = JSON.parse(decodeURIComponent(params.time));
  return { time };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  let time = body.get("time")?.toString();
  if (typeof time !== "string") {
    time = "null";
  }
  let accessible = body.get("accessible");
  if (typeof accessible !== "string") {
    accessible = "off";
  }
  let power = body.get("power");
  if (typeof power !== "string") {
    power = "off";
  }
  let reservable = body.get("reservable");
  if (typeof reservable !== "string") {
    reservable = "off";
  }
  let softSeating = body.get("soft-seating");
  if (typeof softSeating !== "string") {
    softSeating = "off";
  }
  let tableChairs = body.get("tableChairs");
  if (typeof tableChairs !== "string") {
    tableChairs = "off";
  }
  let monitor = body.get("monitor");
  if (typeof monitor !== "string") {
    monitor = "off";
  }
  let whiteboard = body.get("whiteboard");
  if (typeof whiteboard !== "string") {
    whiteboard = "off";
  }
  let window = body.get("window");
  if (typeof window !== "string") {
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
  }
  const result = await getAllAvailableRoomsByBlockAndAmenities(queryObject)
  const serializedArray = encodeURIComponent(JSON.stringify(result))
  // const availableRooms = getAvailableRoomsByBlock(result)
  return redirect(`/dashboard/${time}/${serializedArray}`);
};

export default function DashboardReserveUserId() {
  const { time } = useLoaderData<typeof loader>();
  return (
    <div>
      <form method="post">
        <input type="hidden" value={time} name="time" />
        <div className="items-top flex-box">
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
          <div className="items-top flex space-x-2">
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
        <Button type="submit">Search</Button>
      </form>
      <Outlet/>
    </div>
  );
}
