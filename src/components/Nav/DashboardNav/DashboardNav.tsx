import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_USER } from "../../../redux/features/auth/authSlice";
import { getUser } from "../../../utils/api";
import DropdownProfile from "../../DropdownProfile/DropdownProfile";
import useOnclickOutside from "react-cool-onclickoutside";
import { selectIsOpenAddItemModal } from "../../../redux/features/item/itemSlice";
import styles from "./DashboardNav.module.scss";

interface User {
  picture: string;
  name: string;
}

const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const isAddItemModalOpen = useSelector(selectIsOpenAddItemModal);
  const user = useSelector(selectUser) as User;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = useOnclickOutside((e) => {
    if (!e.target?.addEventListener.bind("ignoreOnOutsideClick")) {
      setIsOpen(false);
    }
    return;
  });

  useEffect(() => {
    async function getUserData() {
      const data = await getUser();

      dispatch(SET_USER(data));
    }
    getUserData();
  }, [user]);

  return (
    <div className={styles.header}>
      <div className={styles.imageCropperHeader}>
        <img
          src={user.picture}
          alt="Rounded image representing the profile picture of the user"
        />
      </div>

      <div className={styles.text}>
        <p>
          Welcome,
          <strong> {user.name}</strong>
        </p>
      </div>
      <IoIosArrowDown
        className={
          isOpen
            ? `${styles.icon} ${styles.iconRotateDown} ${styles.ignoreOnOutsideClick}`
            : `${styles.icon} ${styles.iconRotateUp}`
        }
        onClick={!isAddItemModalOpen ? toggleDropdown : undefined}
      />
      {isOpen && (
        <DropdownProfile closeDropdown={closeDropdown} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default DashboardNav;
