import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { selectAllRooms } from "~/models/room.server"

export const loader = async ({ request }: LoaderArgs) => {
    const rooms = await selectAllRooms()
    return { rooms }
}

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData()
  const roomId: number = parseInt(body.get("roomId") as string);
  return redirect(`/dashboard/admin/manageStudyRooms/update/${roomId}`)
}



export default function ViewRooms(){
    const { rooms } = useLoaderData<typeof loader>()

    return <div>
        <div>
        <Table>
          <TableCaption>Study Rooms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Room #</TableHead>
              <TableHead>Amenities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((item: any) => (
              <TableRow className="border rounded" key={item.id}>
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
                    <Button className="border rounded bg-blue-500 text-white">Update</Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
}