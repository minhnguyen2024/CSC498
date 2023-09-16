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
  const order: any = await selectOrderByUserId({ userId });

  if (order.length > 1) {
    throw new Error("not valid");
  }

  return { order: order[0] };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();

  return null;
};
//TODO: No display order when status is finshed
export default function CafeRoyViewOrder() {
  const { order } = useLoaderData<typeof loader>();
  console.log(order);
  return (
    <div>
      <div>
        <div className="flex-box w-full bg-[#1e3932] justify-center h-screen">
          <img
            className=" object-scale-down mx-auto"
            src={order.image}
          />
          <div className="">
            <h1 className="text-white text-4xl font-extrabold">
              {order.orderName}
            </h1>
          </div>
          <p className="text-white font-extrabold">
            Status: {order.orderStatus}
          </p>
        </div>
        <div></div>
      </div>
      <Outlet />
    </div>
  );
}
