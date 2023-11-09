import { Button } from "@/components/ui/button";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { updateUserPassword, verifyLogin } from "~/models/user.server";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();

  const username: string = body.get("username") as string;
  const tempPassword: string = body.get("tempPassword") as string;
  const password: string = body.get("password") as string;
  const confirmPassword: string = body.get("confirmPassword") as string;

  const user = await verifyLogin(username, tempPassword);
  console.log(user)

  if (user.id == 0 || user.username == "" || user.password == "") {
    return json(
      {
        errors: {
          message: `Invalid username or password`,
        },
      },
      { status: 400 },
    );
  }

  if (confirmPassword != password) {
    return json(
      {
        errors: {
          message: `Password and Confirm Password does not match`,
        },
      },
      { status: 400 },
    );
  }

  await updateUserPassword({ username, password });
  return redirect("/login");
};

export default function ResetPasswordRoute() {
  const actionData = useActionData<typeof action>();
  const messsageRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (actionData?.errors?.message) {
      messsageRef.current?.focus();
    }
  }, [actionData]);
  return (
    <div>
      <form method="post">
        <div className="m-3">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              ref={messsageRef}
              id="username"
              name="username"
              type="username"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
        </div>
        <div className="m-3">
          <label
            htmlFor="tempPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Temporary Password
          </label>
          <div className="mt-1">
            <input
              ref={messsageRef}
              id="tempPassword"
              name="tempPassword"
              type="password"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
        </div>
        <div className="m-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
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
        <div className="m-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <div className="mt-1">
            <input
              ref={messsageRef}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-64 rounded border border-gray-500 px-2 py-1 text-lg"
            />
          </div>
        </div>
        {actionData?.errors?.message ? (
          <div className="pt-1 text-red-700" id="password-error">
            {actionData.errors.message}
          </div>
        ) : null}
        <Button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">
          Submit
        </Button>
      </form>
    </div>
  );
}
