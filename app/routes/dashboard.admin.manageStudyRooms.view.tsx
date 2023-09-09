import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { selectAllRooms } from "~/models/room.server"

export const loader = async ({ request }: LoaderArgs) => {
    const rooms = await selectAllRooms()
    return { rooms }
}



export default function ViewRooms(){
    const { rooms } = useLoaderData<typeof loader>()

    return <div>
        <div>
        <Table>
          <TableCaption>A list of available Study Rooms</TableCaption>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
}