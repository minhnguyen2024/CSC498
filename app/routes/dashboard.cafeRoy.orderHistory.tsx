import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CafeOrder, User } from "@prisma/client";
import { json, type LoaderArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { MyDoughnutChart } from "~/components/MyDoughnutChart";
import { getCafeOrderHistoryByUserId } from "~/models/order.server";
import { getUserById } from "~/models/user.server";

import { requireUserId } from "~/session.server";
import { DAY_IN_MILISECONDS, MONTH_IN_MILISECONDS, WEEK_IN_MILISECONDS } from "~/utils/data";

export async function loader({ request }: LoaderArgs) {
  const userId: number = parseInt((await requireUserId(request)).toString());
  const users: User[] = await getUserById(userId)
  const user = users[0]


  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  let period: number = parseInt(search.get("period") as string);
  switch(period){
    case 30: 
      period = MONTH_IN_MILISECONDS
      break
    case 7:
      period = WEEK_IN_MILISECONDS
      break
    case 1:
      period = DAY_IN_MILISECONDS
      break
    default:
      period = Date.now()
      break
  }
  const orders: any[] = await getCafeOrderHistoryByUserId({
    userId,
    period,
  });

  // console.log(serializedOrdersArr);
  return { orders, user };
}

export default function CafeRoy() {
  const { orders, user } = useLoaderData<typeof loader>();
  const labels: any[] = [];
  orders.forEach((order) => labels.push(order.name));
  let priceArr: any[] = []
  orders.map((order) => priceArr.push(order.price))
  let total: number = priceArr.reduce((acc, cur) => parseFloat(cur) + parseFloat(acc), 0)
  console.log(total)
  const values: any[] = [];

  labels.forEach((label) => {
    let labelCt = 0;
    orders.forEach((order) => {
      if (order.name === label) {
        labelCt += 1;
      }
    });
    values.push(labelCt);
  });
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
      <div>
        <div>
          <p>Username: {user.username}</p>
          <p>Current Balance: {user.accountBalance}</p>
          <p>Total spent: ${total}</p>

        </div>
        <Form>
          <div className="p-2 flex hover:bg-slate-300 mx-2">
            <Select name="period">
              <SelectTrigger className="w-[100px] border-2 border-black rounded px-2">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent className="w-[100px] bg-slate-100">
                <SelectGroup>
                <div className="hover:bg-slate-300 p-2">
                    <SelectItem value="0">All</SelectItem>
                  </div>
                  <div className="hover:bg-slate-300 p-2">
                    <SelectItem value="30">Last 30 days</SelectItem>
                  </div>
                  <div className="hover:bg-slate-300 p-2">
                    <SelectItem value="7">Last 7 Days</SelectItem>
                  </div>
                  <div className="hover:bg-slate-300 p-2">
                    <SelectItem value="1">Today</SelectItem>
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>Search</Button>
          </div>
        </Form>
      </div>
      <div className={`h-[400px] w-[400px]`}>
        <MyDoughnutChart data={data} />
      </div>
      <Outlet />
    </div>
  );
}
