import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { selectAllInventoryByCondition } from "~/models/order.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const iced: number = body.get("condition") === "iced" ? 1 : 0;
  return redirect(`/dashboard/cafeRoy/order/${iced}`);
};

export default function CafeRoyOrder() {
  return (
    <div className="">
      <div className="flex-box">
        <Form method="post">
          <div className="flex">
            <Button
              name="condition"
              value="iced"
              className="border w-full rounded bg-orange-500 hover:bg-orange-300 text-white"
            >
              Iced
            </Button>
            <Button
              name="condition"
              value="hot"
              className="border w-full rounded bg-blue-500 hover:bg-blue-300 text-white"
            >
              Hot
            </Button>
          </div>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
