import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type LoaderArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  selectInventoryBySearchQuery,
  selectAllInventory,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";
import { Filter, PlusSquare } from "lucide-react";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  console.log("before SQL model");
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

    if (Number.isNaN(price)) {
      price = -1;
    }
    if (Number.isNaN(iced)) {
      iced = -1;
    }
    if (Number.isNaN(sold)) {
      sold = -1;
    }

    let inventory = await selectInventoryBySearchQuery({
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

export default function CafeRoyManageInventoryView() {
  const { inventory } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <div className="bg-slate-200 px-3 flex">
          <Form>
            <input type="hidden" name="query" value={1} />
            <div className="flex flex-row pt-3">
              <div className="basis-1/6 hover:bg-slate-300 mx-2 flex flex-col">
                <label>Inventory #</label>
                <input
                  type="text"
                  name="invId"
                  className="rounded border border-gray-500 px-2 w-48" 
                />
              </div>
              <div className="basis-1/6 hover:bg-slate-300 mx-2 flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="rounded border border-gray-500 px-2 w-36" 
                />
              </div>
              <div className="basis-1/6 mx-2 flex flex-col">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  className="rounded border border-gray-500 px-2 w-10" 
                />
              </div>
              <div className="basis-1/6 p-2 flex hover:bg-slate-300 mx-2 items-center justify-center">
                <Select name="size">
                  <SelectTrigger className=" w-16 border-black rounded px-2">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent className="w-36 bg-slate-100">
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
              <div className="basis-1/6 p-2 flex hover:bg-slate-300 mx-2 items-center justify-center">
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
              <div className="basis-1/6 flex flex-row">
                <div>
                  <Button className="bg-green-500 hover:bg-green-400 text-white p-2 rounded">
                    <Filter />
                  </Button>
                </div>
                <div className="px-2">
                  <div className="rounded w-10 items-center justify-center bg-green-500 hover:bg-green-400 p-2 font-medium text-white">
                    <Link to="/dashboard/cafeRoyAdmin/manageInventory/add">
                      <PlusSquare />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="overflow-y-auto">
          <Table>
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
      </div>
      <Outlet />
    </div>
  );
}
