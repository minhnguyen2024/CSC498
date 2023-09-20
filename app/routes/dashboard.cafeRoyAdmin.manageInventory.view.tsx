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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  Inventory,
  SelectInventoryBySearchQuery,
  selectAllInventory,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";
import { Filter, PlusSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
        <div className="bg-slate-200 px-3 flex">
          <Form>
            <input type="hidden" name="query" value={1} />
            <div className="flex">
              <div className="flex-box hover:bg-slate-300 mx-2">
                <label>Inventory #</label>
                <input
                  type="text"
                  name="invId"
                  className="my-2 border-2 h-10 border-black rounded w-64 px-2 py-1"
                />
              </div>
              <div className="hover:bg-slate-300 mx-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="my-2 border-2 h-10 border-black rounded w-48 px-2 py-1"
                />
              </div>
              <div className="p-2 flex hover:bg-slate-300 mx-2">
                <Select name="size">
                  <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent className="w-[100px] bg-slate-100">
                    <SelectGroup>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="">None</SelectItem>
                      </div>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="M">Medium</SelectItem>
                      </div>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="L" className="hover:bg-slate-300">
                          Large
                        </SelectItem>
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="hover:bg-slate-300 mx-2">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  className="my-2 border-2 h-10 border-black rounded w-14 px-2 py-1"
                />
              </div>
              <div className="p-2 flex hover:bg-slate-300 mx-2">
                <Select name="sold">
                  <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
                    <SelectValue placeholder="Sold" />
                  </SelectTrigger>
                  <SelectContent className="w-[100px] bg-slate-100">
                    <SelectGroup>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="-1">None</SelectItem>
                      </div>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="1">Yes</SelectItem>
                      </div>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="0" className="hover:bg-slate-300">
                          No
                        </SelectItem>
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <div>
                  <Button className="bg-green-500 hover:bg-green-400 text-white my-2 rounded">
                    <Filter />
                  </Button>
                </div>
                <div className="my-2 mx-2 rounded bg-green-500 hover:bg-green-400 px-4 py-2 font-medium text-white">
                  <Link to="/dashboard/cafeRoyAdmin/manageInventory/add">
                    <PlusSquare />
                  </Link>
                </div>
              </div>
            </div>
          </Form>
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
