import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { createInventory } from "~/models/order.server";
import { requireUserId } from "~/session.server";

/**
 * admin insert iced or hot, name, number of inventory
 *
 */

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  await requireUserId(request);
  const iced: number = body.get("condition") === "iced" ? 1 : 0;
  const name: string = body.get("name") as string;
  const quantity: number = parseInt(body.get("quantity") as string);
  const price: number = parseFloat(body.get("quantity") as string);
  const size: string = body.get("size") as string;
  const image: string = body.get("image") as string;
  // console.log({ iced, name, quantity, price, size, image })
  //create SQL insert model
  await createInventory({ iced, name, quantity, size, price, image });
  return redirect("/dashboard/cafeRoyAdmin/manageInventory/view");
};

export default function CafeRoyManageInventoryAdd() {
  return (
    <div>
      <title>Add Inventory</title>
      <div className="flex items-center justify-center ">
        <Card className="my-2 w-fit p-3 flex items-center justify-center rounded font-medium bg-slate-200">
          <CardContent>
            <h1 className="flex items-center justify-start text-lg">Add Inventory</h1>
            <Form method="post">
              <label>Select Type</label>
              <div className="flex flex-row p-3 justify-evenly">
                <div>
                  <input type="radio" name="condition" value="iced" />
                  <label className="ml-2">Iced</label>
                </div>
                <div>
                  <input type="radio" name="condition" value="hot" />
                  <label className="ml-2">Hot</label>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label>Inventory Name</label>
                <input type="text" name="name" className="w-full rounded border border-gray-500 px-2" />
              </div>
              <label>Select Size</label>
              <div className="flex flex-row p-3 justify-evenly">
                <div className="">
                  <input type="radio" name="size" value="M" />
                  <label className="ml-2">Medium</label>
                </div>
                <div className="">
                  <input type="radio" name="size" value="L" />
                  <label className="ml-2">Large</label>
                </div>
              </div>
              <div className="flex flex-col my-4">
                <label>Price</label>
                <input type="text" name="price" className="rounded border border-gray-500 px-2" />
              </div>
              <div className="flex">
                <label className="mr-4">Quantity</label>
                <input type="text" name="quantity" className="w-10 rounded border border-gray-500 px-2" />
              </div>
              <div className="flex flex-col my-4">
                <label>Image URL</label>
                <input type="text" name="image" className="w-96 rounded border border-gray-500 px-2" />
              </div>
              <div className="flex items-center justify-end">
                <Button 
                className="border rounded bg-blue-500 hover:bg-blue-300 text-white">
                  Confirm
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Outlet />
    </div>
  );
}
