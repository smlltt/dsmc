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
import { Logo } from "./logo";

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
    <SidebarFooter />
  </Sidebar>
);
