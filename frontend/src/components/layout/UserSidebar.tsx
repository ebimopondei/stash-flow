import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Home, TrendingUp, Settings, User, HelpCircle, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import useAuth from "@/hooks/auth-provider";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Goals",
    url: "/dashboard/goals",
    icon: Target,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Help & Support",
    url: "/dashboard/help",
    icon: HelpCircle,
  },
];

export function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAuth } = useAuth()
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userInitials = userEmail.split("@")[0].slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logoutAuth();
    toast.success('Logging out ')
    setTimeout(()=>{

      navigate('/login')

    }, 3000)
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Target className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">SaveFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userEmail}</p>
            <p className="text-xs text-muted-foreground">User Account</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}