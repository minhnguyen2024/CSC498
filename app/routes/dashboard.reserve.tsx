import { Card } from "@/components/ui/card"
import { json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { getAllBlocks } from "~/models/reserve.server"

// function partitionAvailableBlocks(blocks: []){
//     const partionedArray = []
//     for (let i = 0; i < 49; i++){
//         partionedArray.push(blocks)
//     }
// }

export const loader = () =>{
    const blocks = getAllBlocks()
    return json(blocks)
}

export const action = () =>{
    return json({})
}
export default function DashboardReserve(){
    const blocks = useLoaderData<typeof loader>()

    const items = [1,2,3,4,5,6,7]
    return <>
        <p>Reserve</p>
        <main className="flex h-full bg-white">
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            {items.map(item => (
                <Card className="my-2 h-20 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                    {item}
                </Card>
            ))}
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            </li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            </li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            </li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            </li>
          </ul>
        </div>
        <div className="h-full w-40 border-r bg-gray-50">
          <ul className="p-3">
            <li className="my-2 flex items-center justify-center rounded bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600">
            </li>
          </ul>
        </div>
        
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </>
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