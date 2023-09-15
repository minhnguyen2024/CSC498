import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { selectAllInventory } from "~/models/order.server";
import { requireUserId } from "~/session.server";


/**
 * admin insert iced or hot, name, number of inventory 
 * 
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  const inventory: any = await selectAllInventory()
  return { inventory }
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
 
  return null
};

export default function CafeRoyManageInventoryView() {
  const { inventory } = useLoaderData<typeof loader>()
  return (
    <div>
        <div>
        <Table>
          <TableCaption>Available Study Rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Inventory #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Iced</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item: any) => (
              <TableRow className="border rounded" key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.iced === 1 ? "Iced" : "Hot"}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>

        </div>
      <Outlet/>
    </div>
  );
}
