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
  const session = await getSession(request);
  const blocks = await getAllBlocks();
  const partitionedBy10 = partitionArrayByChunk(blocks, 10);
  const partitionedBy10By7 = partitionArrayByChunk(partitionedBy10, 7);
  return { partitionedBy10, partitionedBy10By7 };
}

export async function action({ request }: ActionArgs) {
  const userId = requireUserId(request);
  const body = await request.formData();
  const dataArrayString = body.get("items")?.toString() || "";
  const dataArray = JSON.parse(dataArrayString);
  const time = dataArray[0].time;
  return redirect(`/dashboard/${time}`);
}
export default function DashboardReserve() {
  const { partitionedBy10By7 } = useLoaderData<typeof loader>();

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
              <p>{availableRoomIdArr.length} open rooms</p>
              <form method="post">
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(roomsByBlock[i])}
                />
                <input type="hidden" name="time" value={i} />
                <button className="bg-green-500 px-1 rounded text-white">
                  Reserve
                </button>
              </form>
            </CardContent>
          </Card>
        </div>,
      );
    }
    return cardItems;
  };

  return (
    <div>
      <div className="flex h-full">
        <div className="h-full w-15 mb-8 px-2 border-r">
          <p className="pt-7 pb-14">8:AM</p>
          <p className="pt-2 pb-14">10:AM</p>
          <p className="pt-2 pb-14">12:PM</p>
          <p className="pt-2 pb-14">2:PM</p>
          <p className="pt-2 pb-14">4:PM</p>
          <p className="pt-2 pb-14">6:PM</p>
          <p className="pt-2 pb-14">8:PM</p>
          <p className="">10:PM</p>
        </div>
        <div className="h-full w-40" key={0}>
          <p>Monday</p>
          {renderCardsInColumn(partitionedBy10By7[0], 0)}
        </div>
        <div className="h-full w-40" key={1}>
          <p>Tuesday</p>
          {renderCardsInColumn(partitionedBy10By7[1], 1)}
        </div>
        <div className="h-full w-40" key={2}>
          <p>Wednesday</p>
          {renderCardsInColumn(partitionedBy10By7[2], 2)}
        </div>
        <div className="h-full w-40" key={3}>
          <p>Thursday</p>
          {renderCardsInColumn(partitionedBy10By7[3], 3)}
        </div>
        <div className="h-full w-40" key={4}>
          <p>Friday</p>
          {renderCardsInColumn(partitionedBy10By7[4], 4)}
        </div>
        <div className="h-full w-40" key={5}>
          <p>Saturday</p>
          {renderCardsInColumn(partitionedBy10By7[5], 5)}
        </div>
        <div className="h-full w-40" key={6}>
          <p>Sunday</p>
          {renderCardsInColumn(partitionedBy10By7[6], 6)}
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
