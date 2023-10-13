import { type LoaderArgs} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getAllUsers, getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";


export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  await getAllUsers();
  const user: any = await getUserById(userId);
  return { user: user[0] };
}

export default function DashboardIndex() {
  return (
    <>
      <Outlet />
    </>
  );
}
