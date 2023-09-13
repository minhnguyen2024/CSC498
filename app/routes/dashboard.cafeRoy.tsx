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
  return redirect(`/dashboard/cafeRoy/${iced}`);
};

export default function CafeRoyOrder() {
  return (
    <div>
      <div className="flex-box">
        <Form method="post">
          <div className="flex">
            <input type="radio" name="condition" value="iced" />
            <label>Iced</label>
          </div>
          <div className="flex">
            <input type="radio" name="condition" value="hot" />
            <label>Hot</label>
          </div>
          <div className="flex">
            <input type="radio" name="whippedCream" value="on" />
            <label>Whipped Cream</label>
          </div>

          <Button className="border rounded bg-blue-500 text-white">
            Continue
          </Button>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}
