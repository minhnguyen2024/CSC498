import { Button } from "@/components/ui/button";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  createOrder,
  selectAllInventoryByCondition,
  selectInventoryByNameCondition,
  selectInventoryByNameConditionSize,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const iced: number = parseInt(params.iced as string);
  const availableInventory: any = await selectAllInventoryByCondition({ iced });
  const name = search.get("name") as string;

  const availableNames = new Map();
  let availableItemsArr: string[] = [];
  let availableSizePriceArr: object[] = [];

  for (let i = 0; i < availableInventory.length; i++) {
    if (
      !Array.from(availableNames.values()).includes(availableInventory[i].name)
    ) {
      availableNames.set(i, availableInventory[i].name);
    }
  }
  availableItemsArr = Array.from(availableNames.values());

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
    return { availableItemsArr, iced, availableSizePriceArr, name };
  }
  return { availableItemsArr, iced, availableSizePriceArr, name };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const body = await request.formData();
  const name: string = body.get("name") as string;
  const size: string = body.get("size") as string;
  const iced: number = parseInt(body.get("iced") as string);
  console.log({ userId, name, size, iced})
  const result: any = await selectInventoryByNameConditionSize({ name, iced, size });
  console.log(result)
  //error check if result = [] 
  const invId: any = result[0].invId;
  const createdAt: number = Date.now();
  await createOrder({ invId, userId, createdAt });
  return redirect("/dashboard/cafeRoy/viewOrder");
};

export default function CafeRoyOrder() {
  const { availableItemsArr, iced, availableSizePriceArr, name } =
    useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex-box">
        {availableItemsArr.length !== 0 ? (
          <>
            <div className="flex-box">
              
              {availableItemsArr.map((item: string, index: number) => (
                <div key={item}>
                  <Form method="get">
                    <input type="hidden" name="name" value={item} />
                    <Button className="border rounded bg-slate-500 hover:bg-slate-300 text-white">
                      {item}
                    </Button>
                  </Form>
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
            {availableSizePriceArr.map((item: any) => (
              <div>
                <input type="radio" name="size" value={item.size} />
                <label>
                  {item.size} {item.price}
                </label>
              </div>
            ))}
            <Button className="border rounded bg-blue-500 hover:bg-blue-300 text-white">Place Order</Button>
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
