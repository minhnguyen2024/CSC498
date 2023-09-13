import { Button } from "@/components/ui/button";
import { type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { selectAllInventoryByCondition, selectInventoryByNameAndCondition } from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const iced: number = parseInt(params.iced as string);
  const availableInventory: any = await selectAllInventoryByCondition({ iced });
  const availableNames = new Map();
  for (let i = 0; i < availableInventory.length; i++) {
    if (!Array.from(availableNames.values()).includes(availableInventory[i].name)) {
      availableNames.set(i, availableInventory[i].name);
    }
  }
  const availableItemsArr: string[] = Array.from(availableNames.values());
  return { availableItemsArr, iced };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request)
  const body = await request.formData()
  const name: string = body.get("name") as string
  const size: string = body.get("size") as string
  const iced: number = parseInt(body.get("iced") as string);
  console.log({ name, size, iced})
  //SQL insert a new order with according userId
  const result: any = await selectInventoryByNameAndCondition({name, iced})
  console.log(result)
  //get info of the first element to use for order
  const item: any = result[0]
  //SQL delete ONE entry by order name
  return null;
};

export default function CafeRoyOrder() {
  const { availableItemsArr, iced } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex-box">
        <div className="flex-box">
          <Form method="post">
            <input type="hidden" value={iced} name="iced"/>
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

            <Button>Confirm</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
