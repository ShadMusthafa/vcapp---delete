import { RxDashboard } from "react-icons/rx";
import { HiOutlineMail } from "react-icons/hi";

interface SidebarItem {
  title: string;
  icon: JSX.Element;
  path: string;
}

const sidebar: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    title: "Contact",
    icon: <HiOutlineMail />,
    path: "/contact-us",
  },
];

export default sidebar;
