import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers, getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { ListItem } from "./dashboard";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const allUsers = await getAllUsers();
  const user: any = await getUserById(userId);
  return { user: user[0] };
}

export default function DashboardIndex() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <Outlet />
    </>
  );
}
