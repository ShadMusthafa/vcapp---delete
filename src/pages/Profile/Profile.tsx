import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { BiMessageSquareEdit } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import Card from "../../components/Card/Card";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import { getUser } from "../../utils/api";
import {
  selectisOpenChangePasswordModal,
  selectUser,
  SET_CHANGE_PASSWORD_MODAL,
  SET_USER,
} from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import styles from "./Profile.module.scss";

interface User {
  picture: string;
  name: string;
  email: string;
  phone: number;
  bio: string;
}

const Profile = () => {
  useRedirectLoggedOutUser("/login");

  const user: User = useSelector(selectUser);
  const isChangePasswordModalOpen: boolean = useSelector(
    selectisOpenChangePasswordModal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData() {
      const data: User = await getUser();

      dispatch(SET_USER(data));
    }
    getUserData();
  }, [user]);

  return (
    <>
      {isChangePasswordModalOpen ? <ChangePasswordModal /> : null}
      <div className={styles.container}>
        <Card cardClass="profile">
          <div className={styles.profile__image}>
            <Avatar
              src={user.picture}
              alt="Profile"
              style={{ width: 250, height: 250, margin: "auto" }}
            />
          </div>

          <div className={styles.profile__info}>
            <p>
              <span>Name:</span> {user.name}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>Phone number:</span> {user.phone}
            </p>
            <p>
              <span>Bio:</span> {user.bio}
            </p>
            <hr />
            <Link to={"/update-profile"} className={styles.profile__edit}>
              <BiMessageSquareEdit className={styles.icon} />
              <span>
                <p>Edit Profile</p>
              </span>
            </Link>
            <div
              className={styles.profile__edit}
              onClick={() => dispatch(SET_CHANGE_PASSWORD_MODAL(true))}
            >
              <RiLockPasswordLine className={styles.icon} />
              <span>
                <p>Change Password</p>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
