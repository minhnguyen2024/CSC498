import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Outlet } from "@remix-run/react";

export default function CafeRoy() {
  return (
    <>
      <Outlet/>
    </>
  );
}
