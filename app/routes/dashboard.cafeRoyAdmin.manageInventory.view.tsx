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
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { selectAllInventory } from "~/models/order.server";
import { requireUserId } from "~/session.server";

/**
 * admin insert iced or hot, name, number of inventory
 *
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  const inventory: any = await selectAllInventory();
  return { inventory };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();

  return null;
};

export default function CafeRoyManageInventoryView() {
  const { inventory } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <div className="my-2 flex items-center justify-center rounded bg-green-500 hover:bg-green-400 px-4 py-3 font-medium text-white">
          <Link to="/dashboard/cafeRoyAdmin/manageInventory/add">
            Add Inventory
          </Link>
        </div>
        <Table>
          <TableCaption>Available Inventory</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Inventory #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Iced</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item: any) => (
              <TableRow className="border-b hover:bg-slate-400" key={item.id}>
                <TableCell className="p-3">{item.id}</TableCell>
                <TableCell className="p-3">{item.name}</TableCell>
                <TableCell className="p-3">{item.iced === 1 ? "Iced" : "Hot"}</TableCell>
                <TableCell className="p-3">{item.size}</TableCell>
                <TableCell className="p-3">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Outlet />
    </div>
  );
}
