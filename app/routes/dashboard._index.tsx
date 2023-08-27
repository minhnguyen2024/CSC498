import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/models/user.server";
import { getSession, requireUserId, sessionStorage } from "~/session.server";


export async function loader({ request }: LoaderArgs) {
    const userId = await requireUserId(request);
    const allUsers = await getAllUsers()
    return json(allUsers)
  }

export default function DashboardIndex(){
    const users = useLoaderData<typeof loader>()
    return <>
        <p>This is Dashboard</p>
        <Outlet/>
    </>
}