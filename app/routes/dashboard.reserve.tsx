import { Card, CardContent } from "@/components/ui/card";
import { type LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllBlocks } from "~/models/reserve.server";
import { requireUserId } from "~/session.server";

function partitionArrayByChunk(arr: any, chunk: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }
  return result;
}

export async function loader({ request }: LoaderArgs) {
  const userId = requireUserId(request);
  const blocks: any = await getAllBlocks();
  return partitionArrayByChunk(blocks, 10);
}

export async function action() {
  return null;
}
export default function DashboardReserve() {
  let data: Array<object[]> = useLoaderData<typeof loader>();
  data = partitionArrayByChunk(data, 7)
  return (
    <>
      <main className="flex h-full bg-white">
        {data.map((item: any) => {
            return <div className="h-full w-40 border-r bg-gray-50">
                {item.map((entry: any, index: any) =>{
                    let numAvailableRooms = 0
                    numAvailableRooms = entry.reduce((acc: any, cur: any) =>{
                        return cur.booked_room_id !== 0 ? acc + 1 : undefined
                    }, 0)
                    console.log(entry.length)
                    return (
                      <>
                          <Card
                            key={index}
                            className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                          >
                            <CardContent>{numAvailableRooms}</CardContent>
                          </Card>
                      </>
                    );})
                }
            </div>
            })}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}

//render each time block in a 7-day calendar
//for-loop? Need a tag to indicate if time block is available
//pseudo:
/**
 * for each time block
 *      if available
 *          renders clickable button to reserve
 *      else
 *          renders non-clickable card
 */

{/* <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"></li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"></li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"></li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"></li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"></li>
          </ul>
        </div> */}