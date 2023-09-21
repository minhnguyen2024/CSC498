import { Feature, toggleFeature } from "~/models/manage.server";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  let viewRooms = search.get("view-rooms");
  if (viewRooms) {
    return redirect("/dashboard/admin/manageStudyRooms/view");
  }
  let addRoom = search.get("add-room");
  if (addRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/add");
  }
  let updateRoom = search.get("update-room");
  if (updateRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/update");
  }
  let deleteRoom = search.get("delete-room");
  if (deleteRoom) {
    return redirect("/dashboard/admin/manageStudyRooms/delete");
  }

  const features: Feature[] = await toggleFeature();
  return null;
};

export default function SelectFeature() {
  return (
    <div>
      {/* <form method="get">
        <div className="items-top flex-box">
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="view-rooms" id="view-rooms" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                View All Rooms
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="add-room" id="add-room" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add a Study Room
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="update-room" id="update-room" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Update a Current Study Room
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <input type="checkbox" name="delete-room" id="delete-room" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Delete a Room
              </label>
            </div>
          </div>
          <Button type="submit">Select</Button>
        </div>
      </form> */}
      <div>
      </div>
        <Outlet />
    </div>
  );
}
