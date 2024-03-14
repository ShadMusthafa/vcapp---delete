import { NavLink } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
  };
  isSidebarOpen: boolean;
}

const SidebarItem = ({ item, isSidebarOpen }: SidebarItemProps) => {
  const activeSublink = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active}` : "";

  return (
    <NavLink className={activeSublink} to={item.path}>
      <nav className={styles.sidebarTitle}>
        <span>
          {item.icon && <div className={styles.icon}>{item.icon}</div>}
          {isSidebarOpen && <div>{item.title}</div>}
        </span>
      </nav>
    </NavLink>
  );
};

export default SidebarItem;
