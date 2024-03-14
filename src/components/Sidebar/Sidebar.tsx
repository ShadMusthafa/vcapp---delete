import { MdOutlineInventory2 } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  SET_SIDEBAR,
} from "../../redux/features/sidebar/sidebarSlice";
import {
  selectIsOpenAddItemModal,
  selectisOpenItemDetailsModal,
} from "../../redux/features/item/itemSlice";

import sidebar from "../../data/sidebar";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const dispatch = useDispatch();

  const isSidebarOpen: boolean = useSelector(selectIsSidebarOpen);
  const isAddItemModalOpen: boolean = useSelector(selectIsOpenAddItemModal);
  const isItemDetailsModalOpen: boolean = useSelector(
    selectisOpenItemDetailsModal
  );

  const toggleSidebar = () => dispatch(SET_SIDEBAR(!isSidebarOpen));
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate("/");
  };

  const handleClick = () => {
    if (!isAddItemModalOpen && !isItemDetailsModalOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={styles.layout}>
      <div
        className={
          isSidebarOpen
            ? `${styles.sidebar}`
            : `${styles.sidebar} ${styles.sidebarClosed}`
        }
      >
        <div className={styles.topSection}>
          <div
            className={styles.logo}
            style={{ display: isSidebarOpen ? "flex" : "none" }}
          >
            <MdOutlineInventory2 onClick={goHome} />
            <p>Invent</p>
          </div>
          <div
            className={
              isSidebarOpen
                ? `${styles.hamburguerIcon}`
                : `${styles.hamburguerIcon} ${styles.hamburguerIconClosed}`
            }
          >
            <CgMenu onClick={handleClick} />
          </div>
        </div>
        {sidebar.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              item={item}
              isSidebarOpen={isSidebarOpen}
            />
          );
        })}
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
