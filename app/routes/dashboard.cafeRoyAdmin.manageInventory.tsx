import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";



export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = (await requireUserId(request)).toString();
  return null
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const userId = (await requireUserId(request)).toString();
  return null
};

export default function DashboardReserveUserId() {
  return (
    <div>
      <form method="get">
        
      </form>
      <Outlet/>
    </div>
  );
}
