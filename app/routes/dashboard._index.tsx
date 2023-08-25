import { Outlet } from "@remix-run/react";

export default function DashboardIndex(){
    return <>
        <p>This is Dashboard</p>
        <Outlet/>
    </>
}