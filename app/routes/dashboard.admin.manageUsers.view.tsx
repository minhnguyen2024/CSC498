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
import { User, getAllUsers, selectUsersBySearchQuery } from "~/models/user.server";


export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  const users: User[] = await getAllUsers()

  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const query: number = parseInt(search.get("query") as string);
  if (query === 1) {
    let userId: number = parseInt(search.get("userId") as string);
    let username: string = search.get("username") as string;
    let permission: number = parseInt(search.get("permission") as string);
    if(Number.isNaN(permission)){
      permission = -1
    }
    if(Number.isNaN(userId)){
      userId = 0
    }
    
    const users: User[] = await selectUsersBySearchQuery({userId, username, permission})
    console.log(users)
    return { users };
  }
  

  return { users };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();

  return null;
};

export default function AdminManageUsers() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <div className="bg-slate-200 px-3 flex">
          <Form>
            <input type="hidden" name="query" value={1} />
            <div className="flex">
              <div className="flex-box hover:bg-slate-300 mx-2">
                <label>User ID</label>
                <input
                  type="text"
                  name="userId"
                  className="my-2 border-2 h-10 border-black rounded w-64 px-2 py-1"
                />
              </div>
              <div className="hover:bg-slate-300 mx-2">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="my-2 border-2 h-10 border-black rounded w-48 px-2 py-1"
                />
              </div>
              <div className="p-2 flex hover:bg-slate-300 mx-2">
                <Select name="permission">
                  <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
                    <SelectValue placeholder="Permission" />
                  </SelectTrigger>
                  <SelectContent className="w-[100px] bg-slate-100">
                    <SelectGroup>
                    
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="0">Student</SelectItem>
                      </div>
                      <div className="hover:bg-slate-300 p-2">
                        <SelectItem value="2">Cafe Roy Employee</SelectItem>
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
                  <Link to="./add">
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
              <TableHead className="text-left">User ID</TableHead>
              <TableHead className="text-left">Username</TableHead>
              <TableHead className="text-left">Permission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item: any) => (
              <TableRow className="border-b hover:bg-slate-400" key={item.id}>
                <TableCell className="p-3">{item.id}</TableCell>
                <TableCell className="p-3">{item.username}</TableCell>
                <TableCell className="p-3">
                  {item.admin === 0 ? "Student" : item.admin === 1 ? "Admin" : "Cafe Roy Employee"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Outlet />
    </div>
  );
}
