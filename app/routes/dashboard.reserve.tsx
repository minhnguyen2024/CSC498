import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type LoaderArgs, json, ActionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
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
  const partitionedBy10 = partitionArrayByChunk(blocks, 10);
  const partitionedBy10By7 = partitionArrayByChunk(partitionedBy10, 7)
  partitionedBy10By7.map((item: any) => {
    console.log(item)
    console.log("--------------------------")
})
  return { partitionedBy10, partitionedBy10By7 };
}

export async function action({ request }: ActionArgs) {
  const userId = requireUserId(request);
  const formData = await request.formData();
  let { _action } = Object.fromEntries(formData);
  if (_action == "reserve") {
    console.log("hello from action");
  }
  console.log(_action)
  return null;
}
export default function DashboardReserve() {
//   let data: Array<object[]> = useLoaderData<typeof loader>();
  const { partitionedBy10, partitionedBy10By7 } = useLoaderData<typeof loader>();
//   console.log(partitionedBy10By7) //3D array

    const renderCardsInColumn = (roomsByBlock: any[]) =>{
        const cardItems = []
        for (let i = 0; i < roomsByBlock.length; i++){
            cardItems.push(<div key={i}>
                <Card
                  className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                >
                  <CardContent>
                    <form method="post">
                      {/* <input type="hidden" value={[entry]} name="_action" /> */}
                      <Button className="bg-red-500 rounded text-white">
                        Reserve
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>)
        }
        return cardItems
    //     return <div key={index}>
    //     <Card
    //       key={index}
    //       className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
    //     >
    //       <CardContent>
    //         {numAvailableRooms}
    //         <form method="post">
    //           <input type="hidden" value={[entry]} name="_action" />
    //           <Button className="bg-red-500 rounded text-white">
    //             Reserve
    //           </Button>
    //         </form>
    //       </CardContent>
    //     </Card>
    //   </div>
    }

    // const renderSingleCardItem = (roomsByBlock: any[], ) =>{
    //     return <div key={index}>
    //                 <Card
    //                   key={index}
    //                   className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
    //                 >
    //                   <CardContent>
    //                     {numAvailableRooms}
    //                     <form method="post">
    //                       <input type="hidden" value={[entry]} name="_action" />
    //                       <Button className="bg-red-500 rounded text-white">
    //                         Reserve
    //                       </Button>
    //                     </form>
    //                   </CardContent>
    //                 </Card>
    //               </div>
        
    // }

    
  return (
    <div>
      <p>Reserve</p>
      <form method="post">
        <input type="hidden" value="reserve" name="_action" />
        <Button className="bg-red-500 rounded text-white">Reserve</Button>
      </form>
      <div className="flex h-full bg-white">
        {partitionedBy10By7.map((item: any, index: any) => {
          //this is one column of 7 cards, each card contains array of 10 rooms
          //[[Array(10), Array(10),....]] => length = 7
          
          return (
            <div className="h-full w-40 border-r bg-gray-50" key={index}>
              {item.map((entry: any, index: any) => {
                const sum = entry.reduce(
                  (arr: any, curr: any) => arr + curr.time,
                  0,
                );
                let numAvailableRooms = 0;
                entry.map((item: any) =>
                  item.booked_user_id === 0
                    ? (numAvailableRooms += 1)
                    : undefined,
                );
                const entryArr = [entry]
                // console.log(`entryArr ${entryArr[0][9].id}`)
                return (
                  <div key={index}>
                    <Card
                      key={index}
                      className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                    >
                      <CardContent>
                        {numAvailableRooms}
                        <form method="post">
                          <input type="hidden" value={[entry]} name="_action" />
                          <Button className="bg-red-500 rounded text-white">
                            Reserve
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="h-full w-40 border-r bg-gray-50" key={0}>
            {renderCardsInColumn(partitionedBy10By7[0])}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={1}></div>
        <div className="h-full w-40 border-r bg-gray-50" key={2}></div>
        <div className="h-full w-40 border-r bg-gray-50" key={3}></div>
        <div className="h-full w-40 border-r bg-gray-50" key={4}></div>
        <div className="h-full w-40 border-r bg-gray-50" key={5}></div>
        <div className="h-full w-40 border-r bg-gray-50" key={6}></div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
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
