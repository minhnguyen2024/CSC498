import { CafeOrder } from "@prisma/client";
import { json, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { MyDoughnutChart } from "~/components/MyDoughnutChart";
import { getCafeOrderHistoryByUserId } from "~/models/order.server";

import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId: number = parseInt((await requireUserId(request)).toString());
  const orders: any[] = await getCafeOrderHistoryByUserId({ userId });
  // console.log(serializedOrdersArr);
  return { orders };
}

export default function CafeRoy() {
  const {orders } = useLoaderData<typeof loader>();
  const labels: any[] = []
  orders.forEach(order => labels.push(order.name))
  const values: any[] = []
  labels.forEach(label => {
    let labelCt = 0
    orders.forEach(order =>{
      if(order.name === label){
        labelCt += 1
      }
    })
    values.push(labelCt)
  })
  console.log(values)
  const data = {
    labels,
    datasets: [
      {
        label: "# of Orders",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className={`h-[400px] w-[400px]`}>
        <MyDoughnutChart data={data} />
      </div>
      <Outlet />
    </div>
  );
}
