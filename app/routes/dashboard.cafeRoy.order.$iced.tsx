import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Inventory,
  createOrder,
  selectAllInventoryByCondition,
  selectInventoryByNameCondition,
  selectInventoryByNameConditionSize,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";
import { getRandomImageURL } from "~/utils/helpers";

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const iced: number = parseInt(params.iced as string);
  const availableInventory: Inventory[] = await selectAllInventoryByCondition({ iced });
  const name = search.get("name") as string;

  const availableInventoryCondensedMap = new Map();
  let availableInventoryCondensed: Inventory[] = [];
  let availableSizePriceArr: object[] = [];

  for (let i = 0; i < availableInventory.length; i++) {
    if (
      !Array.from(availableInventoryCondensedMap.values()).includes(JSON.stringify(availableInventory[i]))
    ) {
      availableInventoryCondensedMap.set(i, JSON.stringify(availableInventory[i]));
    }
  }
  Array.from(availableInventoryCondensedMap.values()).forEach((item: string) => availableInventoryCondensed.push(JSON.parse(item)))
  if (name) {
    const availableSizePrice: any[] = await selectInventoryByNameCondition({
      name,
      iced,
    });
    let availableSizePriceMap = new Map();
    for (let i = 0; i < availableSizePrice.length; i++) {
      const singleSizePrice = {
        size: availableSizePrice[i].size,
        price: availableSizePrice[i].price,
      };
      if (
        //force deep equal comparison
        !Array.from(availableSizePriceMap.values()).includes(
          JSON.stringify(singleSizePrice),
        )
      ) {
        availableSizePriceMap.set(i, JSON.stringify(singleSizePrice));
      }
    }
    const result: string[] = Array.from(availableSizePriceMap.values());
    result.forEach((item: string) =>
      availableSizePriceArr.push(JSON.parse(item)),
    );
    return { availableInventoryCondensed, iced, availableSizePriceArr, name };
  }
  return { availableInventoryCondensed, iced, availableSizePriceArr, name };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const body = await request.formData();
  const name: string = body.get("name") as string;
  const size: string = body.get("size") as string;
  const iced: number = parseInt(body.get("iced") as string);
  const result: any = await selectInventoryByNameConditionSize({
    name,
    iced,
    size,
  });
  console.log(result);
  //error check if result = []
  const invId: any = result[0].invId;
  const createdAt: number = Date.now();
  await createOrder({ invId, userId, createdAt });
  return redirect("/dashboard/cafeRoy/viewOrder");
};

export default function CafeRoyOrder() {
  const { availableInventoryCondensed, iced, availableSizePriceArr, name } =
    useLoaderData<typeof loader>();

    console.log(availableInventoryCondensed)
  return (
    <div>
      <div className="flex-box">
        {availableInventoryCondensed.length !== 0 ? (
          <>
            <div className="grid grid-cols-4 gap-4">
              {availableInventoryCondensed.map((item: Inventory, index: number) => (
                <div key={item.image}>
                  <Card className="rounded">
                    <img
                      className="h-full w-full object-cover"
                      src={item.image}
                    />
                    <Form method="get">
                      <input type="hidden" name="name" value={item.name} />
                      <Button className="border w-full rounded bg-slate-500 hover:bg-slate-300 text-white">
                        {item.name}
                      </Button>
                    </Form>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>Not available</p>
          </>
        )}
      </div>
      {availableSizePriceArr.length !== 0 && name !== null ? (
        <>
          <Form method="post">
            <input type="hidden" value={name} name="name" />
            <input type="hidden" value={iced} name="iced" />
            <p>Select Size for {name}</p>
            <div className="flex">
              {availableSizePriceArr.map((item: any) => (
                <div className="flex w-full items-center justify-center hover:bg-slate-200">
                  <input type="radio" name="size" value={item.size}/>
                  <label className="mx-4">
                    <p className="font-bold">
                      {item.size === "M" ? "Medium" : "Large"} - ${item.price}
                    </p>
                    <p className="font-medium">{item.size === "M" ? "12 fl oz" : "16 fl oz"}</p>
                  </label>
                </div>
              ))}
            </div>

            <Button className="w-full border rounded bg-green-500 hover:bg-green-300 text-white">
              Place Order
            </Button>
          </Form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

// <div>
//     <input type="hidden" value={name}/>
//     <p>Select Size for {name}</p>
//     {availableSizePriceArr.map((item: any) => ( */}
//         <div>
//           <input type="radio" name="size" value={item.size} />
//           <label>{item.size}  {item.price}</label>
//         </div>
//     ))}
//   <div/>) : (<></>)
