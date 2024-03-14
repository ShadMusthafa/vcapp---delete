import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import styles from "./DropdownItems.module.scss";

interface DropdownItemProps {
  item: {
    path: string;
    icon?: ReactNode;
    title: string;
  };
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownItems = ({ item, setIsOpen }: DropdownItemProps) => {
  return (
    <NavLink to={item.path} onClick={() => setIsOpen(false)}>
      <div className={styles.dropdownTitle}>
        <span>
          {item.icon && <div className={styles.icon}>{item.icon}</div>}
          {item.title}
        </span>
      </div>
    </NavLink>
  );
};

export default DropdownItems;
