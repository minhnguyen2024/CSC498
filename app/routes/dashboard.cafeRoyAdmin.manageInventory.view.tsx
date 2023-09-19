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
import { useState } from "react";
import {
  Inventory,
  SelectInventoryBySearchQuery,
  selectAllInventory,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";
import { Filter, PlusSquare } from 'lucide-react';

/**
 * admin insert iced or hot, name, number of inventory
 *
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  let inventory: any = await selectAllInventory();
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  //search fields
  const query: number = parseInt(search.get("query") as string);
  if (query === 1) {
    let invId: string = search.get("invId") as string;
    let name = search.get("name") as string;
    let size: string = search.get("size") as string;
    let price: number = parseFloat(search.get("price") as string);
    let iced: number = parseInt(search.get("iced") as string);
    let sold: number = parseInt(search.get("sold") as string);
    console.log("sold: ", sold);
    console.log("price: ", price);
    if (Number.isNaN(price)) {
      price = 0;
    }
    if (Number.isNaN(iced)) {
      iced = -1;
    }
    if (Number.isNaN(sold)) {
      sold = -1;
    }

    let inventory = await SelectInventoryBySearchQuery({
      invId,
      name,
      size,
      price,
      iced,
      sold,
    });
    return { inventory };
  }

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
        <div>
          <Form>
            <label></label>
            <input type="hidden" name="query" value={1} />
            <div className="grid grid-cols-2">
              <div>
                <div>
                  <label>Inventory #</label>
                  <input type="text" name="invId" className="my-2 border" />
                </div>
                <div>
                  <label>Name</label>
                  <input type="text" name="name" className="my-2 border" />
                </div>
                <div>
                  <label>Size</label>
                  <select id="size" name="size">
                    <option value="">None</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label>Price</label>
                  <input type="text" name="price" className="my-2 border" />
                </div>
                <div>
                  <label>Sold</label>
                  <input type="text" name="sold" className="my-2 border" />
                </div>
              </div>
            </div>
            <Button className="bg-green-500 hover:bg-green-400 text-white">
              <Filter/>
            </Button>
          </Form>
        </div>
        <div className="my-2 flex items-center justify-center rounded bg-green-500 hover:bg-green-400 px-4 py-3 font-medium text-white">
          <Link to="/dashboard/cafeRoyAdmin/manageInventory/add">
            <PlusSquare/>
          </Link>
        </div>
        <Table>
          <TableCaption>Available Inventory</TableCaption>
          <TableHeader className="items-start justify-start bg-slate-300">
            <TableRow>
              <TableHead className="text-left">Inventory #</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Iced</TableHead>
              <TableHead className="text-left">Size</TableHead>
              <TableHead className="text-left">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item: any) => (
              <TableRow className="border-b hover:bg-slate-400" key={item.id}>
                <TableCell className="p-3">{item.id}</TableCell>
                <TableCell className="p-3">{item.name}</TableCell>
                <TableCell className="p-3">
                  {item.iced === 1 ? "Iced" : "Hot"}
                </TableCell>
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
