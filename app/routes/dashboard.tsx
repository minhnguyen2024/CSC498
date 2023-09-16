import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers, getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

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
import { cn } from "@/lib/utils";
import React from "react";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const allUsers = await getAllUsers();
  const user: any = await getUserById(userId);
  // console.log(new Date().toUTCString())
  // console.log(new Date().toISOString())
  // console.log(Date.now())
  return { user: user[0] };
}

export default function DashboardIndex() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <p>Welcome, {user.username}</p>

          <ul className="p-3 h-full">
            {user.admin == 1 ? (
              <>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="reserve" className="">
                    Reserve a Study Room
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="/dashboard/reservationStatus" className="">
                    Check Resvervation Status
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="" className="">
                    Order at Cafe Roy
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="/dashboard/admin/manageStudentUsers" className="">
                    Manage Student Users
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="/dashboard/admin/manageFeatures" className="">
                    Manage Features
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="manageRooms" className="">
                    Manage Rooms
                  </Link>
                </li>
              </>
            ) : user.admin == 0 ? (
              <>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="reserve" className="">
                    Reserve a Study Room
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="/dashboard/reservationStatus" className="">
                    Check Resvervation Status
                  </Link>
                </li>
                <li>
                  <NavigationMenu className="bg-yellow-500 rounded">
                    <NavigationMenuList>
                      <NavigationMenuItem className="flex items-center justify-center">
                        <NavigationMenuTrigger className="justify-center font-medium text-white">Cafe Roy</NavigationMenuTrigger>
                        <NavigationMenuContent className="flex-box">
                          <NavigationMenuLink>
                            <ul className="flex-box gap-3 p-6 lg:grid-cols-[.75fr_1fr] bg-slate-300">
                              <li className="my-2">
                                <ListItem
                                  href="/dashboard/cafeRoy/order"
                                  title="Order"
                                  className="bg-green-500 hover:bg-green-300 rounded"
                                />
                              </li>
                              <li className="my-2">
                                <ListItem
                                  href="/dashboard/cafeRoy/viewOrder"
                                  className="bg-green-500 hover:bg-green-300 rounded"
                                  title="View Order Status"
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
              <>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link to="/dashboard/cafeRoyAdmin/viewOrders" className="">
                    View Orders
                  </Link>
                </li>
                <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                  <Link
                    to="/dashboard/cafeRoyAdmin/manageInventory/view"
                    className=""
                  >
                    Manage Inventory
                  </Link>
                </li>
              </>
            )}
            <div className="mt-[500px]">
              <li className="my-2 mt-auto flex items-center justify-center rounded bg-red-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                <div>
                  {user ? (
                    <div className="user-info">
                      <form action="/logout" method="post">
                        <button type="submit" className="button">
                          Logout
                        </button>
                      </form>
                    </div>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </div>
              </li>
            </div>
          </ul>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
