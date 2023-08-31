import { Button } from "@/components/ui/button";
import { type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.serializedArray, "noteId not found");
  const dataArray = JSON.parse(decodeURIComponent(params.serializedArray));
  return { userId, dataArray };
};

export const action = async ({ request }: ActionArgs) => {
    const body = await request.formData()
    const userId = await requireUserId(request);
    const accessible = body.get("accessible")
    const power = body.get("power")
    const reservable = body.get("reservable")
    const softSeating = body.get("soft-seating")
    const tableChairs = body.get("tableChairs")
    const monitor = body.get("monitor")
    const whiteboard = body.get("whiteboard")
    const window = body.get("window")
    console.log({accessible, power, reservable, softSeating, tableChairs, monitor, whiteboard, window})
  return null;
};

export default function DashboardReserveUserId() {
  const { userId, dataArray } = useLoaderData<typeof loader>();
//   console.log(dataArray);
  return (
    <div>
      <form method="post">
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
    </div>
  );
}
