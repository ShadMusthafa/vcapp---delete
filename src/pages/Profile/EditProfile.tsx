import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";
import CropProfileImageModal from "../../components/CropProfileImageModal/CropProfileImageModal";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { updateUserProfile } from "../../utils/api";
import { GrFormClose } from "react-icons/gr";
import { BiMessageSquareEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SET_SIDEBAR } from "../../redux/features/sidebar/sidebarSlice";
import Card from "../../components/Card/Card";
import styles from "./Profile.module.scss";
import "../../styles/buttons.scss";

interface ProfileImageState {
  img: string | null;
  zoom: number;
  croppedImage: string | null;
}

interface ProfileState {
  name: string;
  email: string;
  phone: number;
  bio: string;
  picture: string;
}

const EditProfile = (): JSX.Element => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const inputImageRef = useRef<HTMLInputElement>(null);

  const triggerInputImage = (): void => {
    inputImageRef.current?.click();
  };

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  });
  const initialState: ProfileState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    picture: user?.picture,
  };

  const [profile, setProfile] = useState<ProfileState>(initialState);
  const [profileImage, setProfileImage] = useState<ProfileImageState>({
    img: null,
    zoom: 1.5,
    croppedImage: "",
  });

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let url = URL.createObjectURL(e.target.files![0]);
    setProfileImage({ ...profileImage, img: url });
    dispatch(SET_SIDEBAR(false));
  };

  const saveProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      let imageURL;
      if (profileImage.croppedImage) {
        const image = new FormData();
        image.append("file", profileImage.croppedImage);
        image.append("cloud_name", "dbm544gs6");
        image.append("upload_preset", "or5lxeft");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dbm544gs6/image/upload",
          { method: "post", body: image }
        );

        const imageData = await response.json();
        imageURL = imageData.url.toString();
      }

      const formData = {
        picture: profileImage.croppedImage ? imageURL : profile.picture,
        name: profile.name,
        phonenumber: profile.phone,
        bio: profile.bio,
        email: profile.email,
      };

      await updateUserProfile(formData);

      toast.success("Profile updated succesfully.");
      navigate("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {profileImage.img !== null ? (
        <CropProfileImageModal
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      ) : null}
      <Card cardClass="profile">
        <div className={styles.profile__image}>
          <Avatar
            src={
              profileImage.croppedImage
                ? profileImage.croppedImage
                : user.picture
            }
            alt="Profile"
            style={{ width: 250, height: 250, margin: "auto" }}
          />
          <div
            className={styles.profile__image__edit}
            onClick={triggerInputImage}
          >
            <BiMessageSquareEdit />
            <p>Edit</p>
          </div>
        </div>
        <form onSubmit={saveProfile}>
          <input
            ref={inputImageRef}
            type="file"
            name="image"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <div className={styles.profile__info}>
            <Link to={"/profile"}>
              <GrFormClose className={styles.icon__close} />
            </Link>
            <div className={styles.profile__info__edit}>
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.profile__info__edit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile?.email}
                disabled
              />
              <p>Email can't be changed.</p>
            </div>
            <div className={styles.profile__info__edit}>
              <label>Phone number</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.profile__info__edit}>
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleTextAreaChange}
                cols={20}
                rows={5}
              />
            </div>

            <button type="submit" className="primary-button">
              Save changes
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
