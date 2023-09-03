import { json, type LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import { logout, requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  // const user = await getUserById(userId);
  if (userId){
    logout(request);
  }
  return json({});
}

export default function Index() {
  return (
    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
      <title>Authentication</title>
      <Link
        to="/join"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
      >
        Log In
      </Link>
    </div>
  );
}
