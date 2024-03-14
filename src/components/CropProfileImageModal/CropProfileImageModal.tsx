import { ChangeEvent, MouseEvent, useRef } from "react";
import { Slider } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import { useSelector } from "react-redux";
import { selectIsSidebarOpen } from "../../redux/features/sidebar/sidebarSlice";
import Card from "../Card/Card";
import styles from "./CropProfileImageModal.module.scss";
import "../../styles/buttons.scss";

interface CropProfileImageModalProps {
  profileImage: {
    img: string | File | null | any;
    zoom: number;
    croppedImage: string | null;
  };
  setProfileImage: React.Dispatch<
    React.SetStateAction<{
      img: string | File | null | any;
      zoom: number;
      croppedImage: string | null;
    }>
  >;
}

const CropProfileImageModal = ({
  profileImage,
  setProfileImage,
}: CropProfileImageModalProps) => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleSlider = (e: ChangeEvent<{}>, value: number | number[]): void => {
    e.preventDefault();
    setProfileImage({
      ...profileImage,
      zoom: value as number,
    });
  };

  const handleCancel = (): void => {
    setProfileImage({ ...profileImage, img: null });
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvasScaled.toDataURL();

      setProfileImage({
        ...profileImage,
        img: null,
        croppedImage: croppedImage,
      });
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
      <Card cardClass="crop__profile">
        <AvatarEditor
          className={styles.crop__avatar}
          ref={editorRef}
          image={profileImage.img}
          width={250}
          height={250}
          border={10}
          borderRadius={200}
          color={[108, 122, 137, 0.6]}
          rotate={0}
          scale={profileImage.zoom}
        />
        <Slider
          aria-label="raceSlider"
          value={profileImage.zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={handleSlider}
        ></Slider>
        <div className={styles.buttons}>
          <button className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="primary-button" onClick={handleSave}>
            Crop image
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CropProfileImageModal;
