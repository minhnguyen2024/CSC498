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
      {/* <div className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <ul className="p-3 h-full">
            {user.admin == 2 ? (
              <>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="add" className="">
                    Add Inventory
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="view" className="">
                    View Inventory
                  </Link>
                </li>
                <li>
                  <NavigationMenu className="bg-yellow-500 rounded">
                    <NavigationMenuList>
                      <NavigationMenuItem className="flex items-center justify-center">
                        <NavigationMenuTrigger className="justify-center font-medium text-white">Manage Inventory</NavigationMenuTrigger>
                        <NavigationMenuContent className="flex-box">
                          <NavigationMenuLink>
                            <ul className="flex-box gap-3 p-6 lg:grid-cols-[.75fr_1fr] bg-slate-300">
                              <li className="my-2">
                                <ListItem
                                  href="/dashboard/cafeRoyAdmin/manageInventory/add"
                                  title="Order"
                                  className="bg-green-500 hover:bg-green-300 rounded"
                                />
                              </li>
                              <li className="my-2">
                                <ListItem
                                  href="/dashboard/cafeRoyAdmin/manageInventory/view"
                                  className="bg-green-500 hover:bg-green-300 rounded"
                                  title="View Inventory"
                                />
                              </li>
                            </ul>
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <div className="flex-1 p-6">
        </div>
      </div> */}
      <Outlet />
    </>
  );
}
