import { ActionArgs, LoaderArgs } from "@remix-run/node"

export const loader = async ({params, request}: LoaderArgs) => {
    return null
}

export const action =async ({ request }: ActionArgs) => {
    return null
}
export default function AvailableRoomsByTimeBlock(){
    return <div>
        <p>Avaiable rooms</p>
    </div>
}