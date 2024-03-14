import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import dropdownProfile from "../../data/dropdownProfile";
import DropdownItems from "./DropdownItems";
import { FiLogOut } from "react-icons/fi";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import styles from "./DropdownProfile.module.scss";

interface DropdownProfileProps {
  setIsOpen: (isOpen: boolean) => void;
  closeDropdown: React.RefObject<HTMLDivElement> | any;
}

const DropdownProfile = ({
  setIsOpen,
  closeDropdown,
}: DropdownProfileProps) => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div ref={closeDropdown} className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.imageCropper}>
          <img
            src={user.picture}
            alt="Rounded image representing the profile picture of the user"
          />
        </div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div>
        {dropdownProfile.map((item, index) => {
          return (
            <>
              <hr />
              <DropdownItems key={index} item={item} setIsOpen={setIsOpen} />
              <hr />
            </>
          );
        })}
      </div>
      <button className={styles.logoutBtn} onClick={logout}>
        <FiLogOut className={styles.icon} />
        Log out
      </button>
    </div>
  );
};

export default DropdownProfile;
