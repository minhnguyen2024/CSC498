import { Button } from "@/components/ui/button";

import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { requireUserId } from "~/session.server";
import { Filter, PlusSquare, XSquare } from "lucide-react";
import { User, addFundToUserByUserId, getUserById } from "~/models/user.server";
import invariant from "tiny-invariant";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.userId, "userId not found")
  const users = await getUserById(parseInt(params.userId));
  const user: User = users[0];
  return { user };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const _action = body.get("_action");
  const id = body.get("id")
  if (_action === null || id === null) {
    throw new Error("_action or id does not exist");
  }
  switch (_action.toString()){
    
    case "addFund":
      let amount = body.get("amount")
      if (amount === null) {
        throw new Error("anount does not exist");
      }
      await addFundToUserByUserId({ userId: parseInt(id.toString()), amount: parseFloat(amount.toString())})
      return redirect("")
    case "deleteUser":
      break
    default:
      throw new Error("_action does not exist");
  }

  // const currentBalance = body.get("currentBalance");
  // console.log({ id, currentBalance });
  console.log(`action: ${_action.toString()}`);

  // return redirect("/dashboard");
  return null;
};

export default function AdminManageUsers() {
  const { user } = useLoaderData<typeof loader>();
  console.log(user)

  return (
    <div>
      <div>
        <p>{user.id}</p>
        <p>{user.username}</p>
        <Form method="post">
          <p>{user.accountBalance}</p>
          <input type="hidden" name="_action" value="addFund" />
          <label>Amount</label>
          <input type="text" name="amount" className="border"/>
          <input type="hidden" name="id" value={user.id} />
          <Button
            className={`my-2 mx-2 rounded bg-green-500 hover:bg-green-400 px-4 py-2 font-medium text-white`}
            type="submit"
          >
            Add Fund
          </Button>
        </Form>
        <p>
          {user.admin === 0
            ? "Student"
            : user.admin === 2
            ? "Cafe Roy Employee"
            : "Admin"}
        </p>
        <Form method="post">
          <input type="hidden" name="_action" value="deleteUser" />
          <input type="hidden" name="id" value={user.id} />
          <Button
            type="submit"
            className={`my-2 mx-2 rounded bg-red-500 hover:bg-red-400 px-4 py-2 font-medium text-white`}
          >
            Delete User
          </Button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
