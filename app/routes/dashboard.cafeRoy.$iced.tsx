import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  createOrder,
  selectAllInventoryByCondition,
  selectInventoryByNameAndCondition,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const iced: number = parseInt(params.iced as string);
  const availableInventory: any = await selectAllInventoryByCondition({ iced });
  const availableNames = new Map();
  for (let i = 0; i < availableInventory.length; i++) {
    if (
      !Array.from(availableNames.values()).includes(availableInventory[i].name)
    ) {
      availableNames.set(i, availableInventory[i].name);
    }
  }
  const availableItemsArr: string[] = Array.from(availableNames.values());
  return { availableItemsArr, iced };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const body = await request.formData();
  const name: string = body.get("name") as string;
  const size: string = body.get("size") as string;
  const iced: number = parseInt(body.get("iced") as string);
  const result: any = await selectInventoryByNameAndCondition({ name, iced });
  const invId: any = result[0].invId;
  const createdAt: number = Date.now()
  await createOrder({ invId, userId, createdAt });
  return redirect("/dashboard");
};

export default function CafeRoyOrder() {
  const { availableItemsArr, iced } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex-box">
        {availableItemsArr.length !== 0 ? (
          <>
            <div className="flex-box">
              <Form method="post">
                <input type="hidden" value={iced} name="iced" />
                {availableItemsArr.map((item: string, index: number) => (
                  <div key={index}>
                    <input type="radio" name="name" value={item} />
                    <label>{item}</label>
                  </div>
                ))}
                <p>Select Size</p>
                <div>
                  <input type="radio" name="size" value="M" />
                  <label>Medium</label>
                </div>
                <div>
                  <input type="radio" name="size" value="L" />
                  <label>Large</label>
                </div>

                <Button className="border rounded bg-green-500 hover:bg-green-200 text-white">
                  Confirm
                </Button>
              </Form>
            </div>
          </>
        ) : (
          <>
            <p>Not available</p>
          </>
        )}
      </div>
    </div>
  );
}
