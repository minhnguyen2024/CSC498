import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getSession, requireUserId, sessionStorage } from "~/session.server";


export async function loader({ request }: LoaderArgs) {
    const userId = await requireUserId(request);
    console.log(userId)
    return null
  }

export default function DashboardIndex(){
    return <>
        <p>This is Dashboard</p>
        <Outlet/>
    </>
}