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
import { ActionArgs, redirect, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { selectAllReserved } from "~/models/manage.server";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const user: any = await getUserById(userId);
  const reservedRooms = await selectAllReserved();
  return { reservedRooms, user: user[0] };
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = body.get("booked_userId")?.toString() || "-1";
  let blockId = body.get("blockId");
  invariant(blockId, "blockId not found");
  const roomObj: any = { blockId: blockId.toString() };
  await updateBlockWithUserId({
    userId: "0",
    room: roomObj,
  });
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserCancelled = userReservation.length === 0 ? true : false;
  if (isUserCancelled) {
    return redirect("/dashboard/admin/manageRooms");
  }
};

export default function ManageRoomsConsole() {
  const { reservedRooms } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <Table>
          <TableCaption>List of Reserved Study Rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Block #</TableHead>
              <TableHead>Room #</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservedRooms.map((item: any) => (
              <TableRow className="border rounded" key={item.blockId}>
                <TableCell>{item.blockId}</TableCell>
                <TableCell>{item.roomId}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <form method="post">
                    <input
                      type="hidden"
                      value={item.userId}
                      name="booked_userId"
                    />
                    <input
                      type="hidden"
                      value={JSON.stringify(item)}
                      name="room"
                    />
                    <input type="hidden" value={item.blockId} name="blockId" />
                    <Button className="border rounded bg-red-500 text-white">
                      Remove
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
