import { LoaderArgs } from "@remix-run/node"
import invariant from "tiny-invariant";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    const userId = await requireUserId(request)
    invariant(params.time, "time not found");
    invariant(params.room, "room not found");
    const room = JSON.parse(decodeURIComponent(params.room))
    const time = params.time
    console.log(time, room)
    
    return null
}

export default function ConfirmReservation(){
    return <div>
        <p>Your Reservation Has Been Confirmed!</p>
    </div>
}