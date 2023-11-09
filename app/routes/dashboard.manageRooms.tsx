import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
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
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  confirmRoomBookingWithUserId,
  updateBlockWithUserId,
} from "~/models/confirm.server";
import { selectAllReserved } from "~/models/manage.server";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { X } from "lucide-react";
import { militaryTo12Hour } from "~/utils/helpers";

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
    timeObjJSONString: ""
  });
  const userReservation: object[] = await confirmRoomBookingWithUserId(userId);
  let isUserCancelled = userReservation.length === 0 ? true : false;
  if (isUserCancelled) {
    return redirect("/dashboard/manageRooms");
  }
};

export default function ManageRoomsConsole() {
  const { reservedRooms } = useLoaderData<typeof loader>();

  const bookedTimeJsonStringtoString = (booked_time: string) =>{
    const bookedTime = JSON.parse(JSON.parse(booked_time))
    const hour = militaryTo12Hour(bookedTime["timeOfDay"])
    const string = `${bookedTime["dayOfWeek"]} - ${hour}`
    return string
  }
  return (
    <div>
      <div>
      <h1 className="px-2 font-bold text-lg my-4">List of Reserved Study Rooms</h1>
        <Table>
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
              <TableRow className="border-b hover:bg-slate-400" key={item.blockId}>
                <TableCell>{item.blockId}</TableCell>
                <TableCell>{item.roomId}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{bookedTimeJsonStringtoString(item.booked_time)}</TableCell>
                <TableCell>
                  {/* <Form method="post">
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
                  </Form> */}
                  <Dialog.Root>
                    <Dialog.Trigger className="rounded p-2 hover:bg-red-400 bg-red-500 w-32">
                      Remove Reservation
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                      <Dialog.Content className="fixed bg-white text-grey-900 p-8 shadow rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex justify-between">
                          <div>
                            <p className="my-2">Are you sure?</p>
                            <p>Remove Reservation is not a reversible action.</p>
                          </div>
                          <div>
                            <Dialog.Close className="text-grey-400 hover:text-grey-500">
                              <X />
                            </Dialog.Close>
                          </div>
                        </div>
                        <div className="justify-center items-start">
                          <Form method="post">
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
                            <input
                              type="hidden"
                              value={item.blockId}
                              name="blockId"
                            />
                            <Button className="my-3 border rounded bg-red-500 text-white justify-center items-start">
                              Confirm
                            </Button>
                          </Form>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
