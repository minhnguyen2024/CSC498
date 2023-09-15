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
  return { orders };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();

  return null;
};
//TODO: No display order when status is finshed
export default function CafeRoyViewOrder() {
  const { orders } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <Table>
          <TableCaption>Order Status</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Iced</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length !== 0 ? (
              <>
                {orders.map((item: any) => {
                  if(item.orderStatus === "finshed"){
                    return <></>
                  }
                  return (
                    <TableRow className="border rounded" key={item.ordId}>
                      <TableCell>{item.ordId}</TableCell>
                      <TableCell>{item.orderName}</TableCell>
                      <TableCell>{item.iced === 1 ? "Iced" : "Hot"}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.orderStatus}</TableCell>
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <>
                <p>No Pending Orders</p>
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <Outlet />
    </div>
  );
}
