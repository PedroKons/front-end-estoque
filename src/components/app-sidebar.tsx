import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Menu items.
const items = [
  {
    id: "view",
    title: "Ver Produtos",
    icon: Home,
  },
  {
    id: "register",
    title: "Cadastrar Produtos",
    icon: Inbox,
  },
  {
    id: "update",
    title: "Atualizar Produtos",
    icon: Calendar,
  },
  {
    id: "search",
    title: "Buscar",
    icon: Search,
  },
  {
    id: "settings",
    title: "Configurações",
    icon: Settings,
  },
];

interface AppSidebarProps {
  setActiveContent: (content: string) => void;
}

export function AppSidebar({ setActiveContent }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };




  return (
    <Sidebar className={`${collapsed ? "w-10" : "w-64"} bg-gray-800 text-black transition-all duration-300`}>
      <SidebarContent>
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white transition"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <SidebarGroup>
          {!collapsed && (
              <SidebarGroupLabel className="text-gray-300 px-4">Application</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => setActiveContent(item.id)}
                      className="flex items-center gap-4 p-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
