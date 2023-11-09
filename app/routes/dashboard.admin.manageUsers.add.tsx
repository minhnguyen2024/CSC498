import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { createUser } from "~/models/user.server";
import { sendSetPasswordEmail } from "~/utils/nodemailer_helper";

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  await requireUserId(request);
  const username: string = body.get("username") as string;
  const email: string = body.get("email") as string;
  const password: string = body.get("password") as string;
  const permission: number = parseInt(body.get("permission") as string);

  //enter nodemailer here
  await sendSetPasswordEmail({ username, email, password})
  await createUser({ username, password, accountBalance: 0, permission });
  return redirect("/dashboard/admin/manageUsers");
};

export default function AdminManageUsersAdd() {
  return (
    <div>
      <Form method="post">
        <div className="m-3">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              required
              autoFocus={true}
              name="username"
              type="username"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
        </div>
        <div className="m-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              required
              autoFocus={true}
              name="email"
              type="email"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
        </div>
        <div className="m-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
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
