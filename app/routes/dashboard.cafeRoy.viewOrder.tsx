import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { selectAllInventory, selectOrderByUserId } from "~/models/order.server";
import { requireUserId } from "~/session.server";

/**
 * admin insert iced or hot, name, number of inventory
 *
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  const orders: any = await selectOrderByUserId({ userId });
  const activeOrder = orders.find(
    (order: any) => order.orderStatus !== "finished",
  );
  console.log(activeOrder);
  if (activeOrder === undefined) {
    return { activeOrder };
  } else if (activeOrder.length > 1) {
    throw new Error("There is more than one active order");
  }
  return { activeOrder };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();

  return null;
};
//TODO: No display order when status is finshed
export default function CafeRoyViewOrder() {
  const { activeOrder } = useLoaderData<typeof loader>();
  console.log(activeOrder);
  return (
    <div>
      <div className="w-full">
        {activeOrder !== undefined ? (
          <>
            <div className="flex-box w-[1200px] bg-[#1e3932] justify-center h-screen">
              <img
                className=" object-scale-down mx-auto"
                src={activeOrder.image}
              />
              <div className="flex items-center justify-center">
                <h1 className="text-white text-5xl font-extrabold">
                  {activeOrder.orderName}
                </h1>
              </div>
              <div className="text-white font-extrabold flex items-center justify-center text-2xl">
                {activeOrder.orderStatus === "notPrepared" ? (
                  <>
                    <h2>Your order has been received</h2>
                  </>
                ) : activeOrder.orderStatus === "preparing" ? (
                  <>
                    <h2>Your order is being prepared</h2>
                  </>
                ) : activeOrder.orderStatus === "ready" ? (
                  <>
                    <h2>Your order is ready for pick-up</h2>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <p>No pending order</p>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}