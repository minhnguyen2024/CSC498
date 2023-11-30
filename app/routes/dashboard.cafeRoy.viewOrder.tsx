import { Card, CardContent } from "@/components/ui/card";
import { type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  getCafeOrderHistoryByUserId,
  selectOrderByUserId,
} from "~/models/order.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  const orders: any = await selectOrderByUserId({ userId });
  await getCafeOrderHistoryByUserId({
    userId: parseInt(userId),
    period: Date.now(),
  });
  const activeOrder = orders.find(
    (order: any) => order.orderStatus !== "finished",
  );
  if (activeOrder === undefined) {
    return { activeOrder };
  } else if (activeOrder.length > 1) {
    throw new Error("There is more than one active order");
  }
  return { activeOrder };
};

export default function CafeRoyViewOrder() {
  const { activeOrder } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        {activeOrder !== undefined ? (
          <>
            <div className="flex flex-col bg-[#1e3932] justify-center h-screen">
              <div className="h-4/5">
                <img
                  className="object-scale-down mx-auto"
                  src={activeOrder.image}
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-white text-3xl font-extrabold">
                  {activeOrder.orderName}
                </h1>
              </div>

              <div className="text-white flex flex-1 font-extrabold items-center justify-center text-2xl">
                {activeOrder.orderStatus === "notPrepared" ? (
                  <>
                    <h2>Your order has been received</h2>
                  </>
                ) : activeOrder.orderStatus === "preparing" ? (
                  <>
                    <h2>Your order is being prepared</h2>
                  </>
                ) : activeOrder.orderStatus === "ready" ? (
                  <>
                    <h2>Your order is ready for pick-up</h2>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center justify-center">
                <h1 className="text-white text-2xl font-extrabold">
                  {activeOrder.orderId}
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-screen items-center justify-center p-5">
            <Card className="w-fit h-fit bg-slate-200 p-4 rounded">
              <CardContent>
                <p>No pending Cafe Roy orders.</p>
                <p>Please navigate to Cafe Roy/Make an Order to start your order</p>
              </CardContent>
            </Card>
          </div>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
