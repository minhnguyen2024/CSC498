import { type LoaderArgs} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getAllUsers, getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export default function DashboardCafeRoyAdminManageInventory() {
  return (
    <>
      <Outlet />
    </>
  );
}
