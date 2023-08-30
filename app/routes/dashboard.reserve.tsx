import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type LoaderArgs, json, ActionArgs, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllBlocks } from "~/models/reserve.server";
import { getSession, requireUserId } from "~/session.server";

function partitionArrayByChunk(arr: any, chunk: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }
  return result;
}

export async function loader({ request }: LoaderArgs) {
  const userId = requireUserId(request);
  const session = await getSession(request)
  console.log(session.get("userId"))
  const blocks: any = await getAllBlocks();
  const partitionedBy10 = partitionArrayByChunk(blocks, 10);
  const partitionedBy10By7 = partitionArrayByChunk(partitionedBy10, 7);
  return { partitionedBy10, partitionedBy10By7 };
}

export async function action({ request }: ActionArgs) {
  const userId = requireUserId(request);
  console.log(userId)
  const body = await request.formData();
  const items: string = body.get("items")?.toString() || ""
    const blockIDByTime = JSON.parse(items)
    const serializedArray = encodeURIComponent(JSON.stringify(items));
  return redirect(`/dashboard/${serializedArray}`);
}
export default function DashboardReserve() {
  const { partitionedBy10, partitionedBy10By7 } =
    useLoaderData<typeof loader>();

  const renderCardsInColumn = (roomsByBlock: any[], partitionIndex: number) => {
    const cardItems = [];

    for (let i = 0; i < roomsByBlock.length; i++) {
      const availableRoomIdArr: object[] = [];
      roomsByBlock[i].map((item: any) => {
        availableRoomIdArr.push({ id: item.id, time: item.time });
      });
      cardItems.push(
        <div key={i}>
          <Card className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            <CardContent>
              <form method="post">
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(roomsByBlock[i])}
                />
                <input type="hidden" name="time" value={i} />
                <button className="bg-red-500 rounded text-white">
                  Reserve
                </button>
              </form>
              <dialog open={true}></dialog>
            </CardContent>
          </Card>
        </div>,
      );
    }
    return cardItems;
  };

  return (
    <div>
      <form method="post">
        <input type="hidden" name="title" value="title 1" />
        <input type="hidden" name="title" value="title 2" />
        <input type="hidden" name="title" value="title 3" />
        <button className="bg-red-500 rounded text-white">Reserve</button>
      </form>
      {/* <Link to='/reserve/:userId'>To Reserve Page</Link> */}
      <div className="flex h-full bg-white">
        <div className="h-full w-40 border-r bg-gray-50" key={0}>
          {renderCardsInColumn(partitionedBy10By7[0], 0)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={1}>
          {renderCardsInColumn(partitionedBy10By7[1], 1)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={2}>
          {renderCardsInColumn(partitionedBy10By7[2], 2)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={3}>
          {renderCardsInColumn(partitionedBy10By7[3], 3)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={4}>
          {renderCardsInColumn(partitionedBy10By7[4], 4)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={5}>
          {renderCardsInColumn(partitionedBy10By7[5], 5)}
        </div>
        <div className="h-full w-40 border-r bg-gray-50" key={6}>
          {renderCardsInColumn(partitionedBy10By7[6], 6)}
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
