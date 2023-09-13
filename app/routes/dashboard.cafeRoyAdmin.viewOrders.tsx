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
import { Outlet, useLoaderData } from "@remix-run/react";
import { selectOrders } from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  //userId will be a admin = 2 id
  const userId = (await requireUserId(request)).toString();
  //SQL model to fetch all orders and their status
  const orders: any = await selectOrders();
  return { orders };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  //SQL models to handle
  return null;
};

export default function DashboardReserveUserId() {
  const { orders } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <Table>
          <TableCaption>Available Study Rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item: any) => (
              <TableRow className="border rounded" key={item.id}>
                <TableCell>{item.ordId}</TableCell>
                <TableCell>{item.orderName}</TableCell>
                <TableCell>{item.temperature === 1 ? "Iced" : "Hot"}</TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.orderStatus}</TableCell>
                {/* <TableCell>
                  <form method="post">
                    <input type="hidden" value={} name="time" />
                    <input
                      type="hidden"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                    <Button className="border rounded bg-green-500 text-white">
                      
                    </Button>
                  </form>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Outlet />
    </div>
  );
}
