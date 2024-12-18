import { signOut } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { clearDB } from "@/lib/actions/clear-db";
import { paths } from "@/lib/paths";
import Image from "next/image";
import turnOffIcon from "../../../public/image/turn-off.svg";
import { Button } from "../ui/button";
import { AppSidebarLink } from "./app-sidebar-link";
import { Logo } from "./logo";

const items = [
  {
    title: "Home",
    url: paths.main,
    icon: "/image/home.png",
  },
  {
    title: "Friends movies",
    url: paths.friendsMovies,
    icon: "/image/mail-love.png",
  },
  {
    title: "All movies",
    url: paths.allMovies,
    icon: "/image/mail-love.png",
  },
  {
    title: "Watch a movie",
    url: paths.watch,
    icon: "/image/meeting.png",
  },
];

export const AppSidebar = () => (
  <Sidebar>
    <SidebarHeader className="py-6">
      <Logo />
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
      <div className="flex justify-between">
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
              className="mb-5 ml-3"
            />
          </button>
        </form>
        {process.env.NODE_ENV === "development" ? (
          <form action={clearDB}>
            <Button type="submit" variant="destructive">
              {"Clear DB"}
            </Button>
          </form>
        ) : (
          <div />
        )}
      </div>
    </SidebarFooter>
  </Sidebar>
);
