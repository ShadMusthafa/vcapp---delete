import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebarOpen } from "../../redux/features/sidebar/sidebarSlice";
import { updatePassword } from "../../utils/api";
import { GrFormClose } from "react-icons/gr";
import Card from "../Card/Card";
import styles from "./ChangePassword.module.scss";
import { SET_CHANGE_PASSWORD_MODAL } from "../../redux/features/auth/authSlice";

interface FormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormData = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePasswordModal = () => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  const dispatch = useDispatch();

  const { oldPassword, password, confirmPassword } = formData;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePassword = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("New password do not match!");
    }

    const formData = {
      oldPassword,
      password,
      confirmPassword,
    };

    const response = await updatePassword(formData);

    dispatch(SET_CHANGE_PASSWORD_MODAL(false));
    if (response !== undefined) {
      toast.success(response);
    }
  };

  return (
    <div
      className={
        isSidebarOpen
          ? `${styles.modal__background} ${styles.modal__sidebarOpen}`
          : `${styles.modal__background} ${styles.modal__sidebarClose}`
      }
    >
      <Card cardClass="password">
        <div className={styles.modal__header}>
          <h3>Change password</h3>
          <div className={styles.modal__close}>
            <GrFormClose
              onClick={() => dispatch(SET_CHANGE_PASSWORD_MODAL(false))}
            />
          </div>
        </div>
        <form onSubmit={changePassword}>
          <div className={styles.password__info}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
            />
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.modal__buttons}>
            <button
              className="secondary-button-password"
              onClick={() => dispatch(SET_CHANGE_PASSWORD_MODAL(false))}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button-password"
              onClick={changePassword}
            >
              Change password
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChangePasswordModal;
