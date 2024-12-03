import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { AppSidebarLink } from "./app-sidebar-link";
import Image from "next/image";
import turnOffIcon from "../../../public/image/turn-off.svg";
import { signOut } from "@/auth";

const items = [
  {
    title: "Home",
    url: "/",
    icon: "/image/home.png",
  },
  {
    title: "Friends movies",
    url: "/friends-movies",
    icon: "/image/mail-love.png",
  },
  {
    title: "Watch a movie",
    url: "/watch",
    icon: "/image/meeting.png",
  },
];

export const AppSidebar = () => (
  <Sidebar>
    <SidebarHeader>
      <h1 className="my-4 text-center font-iceland text-7xl text-red-500">
        {"DSMC"}
      </h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            {items.map((item) => (
              <AppSidebarLink key={item.title} {...item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">
          <Image
            src={turnOffIcon}
            alt={"logout icon"}
            width={24}
            height={24}
            className="ml-3 mb-5"
          />
        </button>
      </form>
    </SidebarFooter>
  </Sidebar>
);
