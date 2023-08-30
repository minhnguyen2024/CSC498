import { type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.serializedArray, "noteId not found");
  const dataArray = JSON.parse(decodeURIComponent(params.serializedArray));
  // console.log("data ",dataArray)
  return { userId, dataArray };
};

export const action = async () => {
  return null;
};

export default function DashboardReserveUserId() {
  const { userId, dataArray } = useLoaderData<typeof loader>();
  console.log(dataArray);
  return (
    <div>
      <div className="items-top flex-box">
        <div className="items-top flex space-x-2">
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
          <input type="checkbox" name="" id="" />
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
  );
}
