import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";

export default function Logout({user} : {user: any}) {
  return (
    <div className="mt-[525px]">
      <li className="bottom-0 my-2 mt-auto flex items-center justify-center rounded bg-red-500 py-3 font-medium text-white hover:bg-red-600">
        <div>
          {user ? (
            <div className="user-info">
              <form action="/logout" method="post">
                <Button type="submit" className="">
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </li>
    </div>
  );
}
