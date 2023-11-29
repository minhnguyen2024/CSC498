import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PlusSquare } from "lucide-react";
import { deleteRoombyId, selectAllRooms } from "~/models/room.server";

export const loader = async ({ request }: LoaderArgs) => {
  const rooms = await selectAllRooms();
  return { rooms };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const roomId: number = parseInt(body.get("roomId") as string);
  //SQL delete study room
  await deleteRoombyId({ roomId });
  return null;
};

export default function ViewRooms() {
  const { rooms } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex flex-row items-stretch justify-between px-4 bg-slate-200">

        <h1 className="px-2 font-bold text-lg my-4 ">Study Rooms</h1>
        <div className="mt-5">
          <Link to="/dashboard/admin/manageStudyRooms/add" className="bg-green-400 p-3 rounded">
            Create Room
          </Link>
        </div>
      </div>
      <TableHeader className="bg-slate-300">
        <TableRow>
          <TableHead className="">Room #</TableHead>
          <TableHead>Amenities</TableHead>
        </TableRow>
      </TableHeader>
      <div className="max-h-[600px] overflow-y-auto">
        <Table>
          <TableBody>
            {rooms.map((item: any) => (
              <TableRow className="border-b" key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {item.accessible == 1 ? "Accessible, " : " "}
                  {item.power == 1 ? "Power, " : " "}
                  {item.reservable == 1 ? "Reservable, " : " "}
                  {item.softSeating == 1 ? "Soft-seating, " : " "}
                  {item.tableChairs == 1 ? "Table and Chairs, " : " "}
                  {item.monitor == 1 ? "Monitor, " : " "}
                  {item.whiteboard == 1 ? "Whiteboard, " : " "}
                  {item.window == 1 ? "Window, " : " "}
                </TableCell>
                <TableCell>
                  <form method="post">
                    <input type="hidden" value={item.id} name="roomId" />
                    <input
                      type="hidden"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                    <Button className="border rounded bg-red-500 text-white">
                      Delete
                    </Button>
                  </form>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/dashboard/admin/manageStudyRooms/update/${item.id}`}
                    className="bg-green-400 p-3 rounded"
                  >
                    Update
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
