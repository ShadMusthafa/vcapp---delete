import { ReactNode } from "react";
import { HiOutlineUser } from "react-icons/hi";

interface DropDownProfile {
  title: string;
  icon: ReactNode;
  path: string;
}

const dropdownProfile: DropDownProfile[] = [
  {
    title: "Profile",
    icon: <HiOutlineUser />,
    path: "/profile",
  },
];

export default dropdownProfile;
