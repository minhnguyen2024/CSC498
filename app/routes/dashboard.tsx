import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const allUsers = await getAllUsers();
  return json(allUsers);
}

export default function DashboardIndex() {
  const users = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
              <Link to="reserve" className="">Reserve a Study Room</Link>
            </li>
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
              <Link to="" className="">Order at Cafe Roy</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
