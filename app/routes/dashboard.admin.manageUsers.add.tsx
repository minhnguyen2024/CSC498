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
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { createInventory } from "~/models/order.server";
import { requireUserId } from "~/session.server";
import { createUser } from "~/models/user.server";

/**
 * admin insert iced or hot, name, number of inventory
 *
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  const username: string = body.get("username") as string;
  const password: string = body.get("password") as string;
  const permission: number = parseInt(body.get("permission") as string);
  await createUser({username, password, permission})
  return redirect("/dashboard/cafeRoyAdmin/manageInventory/view");
};

export default function AdminManageUsersAdd() {
  return (
    <div>
      <Form method="post">
        <div className="flex">
          <label>Username</label>
          <input type="text" name="username" className="border" />
        </div>
        <div className="flex">
          <label>Password</label>
          <input type="text" name="password" className="border" />
        </div>
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

        <Button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">
          Submit
        </Button>
      </Form>
      <Outlet />
    </div>
  );
}
