import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebarOpen } from "../../../redux/features/sidebar/sidebarSlice";
import Card from "../../Card/Card";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import {
  getItems,
  selectItemID,
  SET_EDIT_ITEM_MODAL,
  updateItem,
} from "../../../redux/features/item/itemSlice";
import ItemForm from "../ItemForm/ItemForm";
import styles from "./EditItemModal.module.scss";
import "../../../styles/buttons.scss";
import { RootState } from "../../../redux/store";

interface Item {
  _id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string | File | any;
  description: string;
  createdAt: Date;
}

const EditItemModal = () => {
  const itemEdit: Item | any = useSelector(
    (state: RootState) => state.item.item
  );

  const [item, setItem] = useState<Item>(itemEdit);
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const isSidebarOpen: boolean = useSelector(selectIsSidebarOpen);
  const itemID: number = useSelector(selectItemID);

  const dispatch = useDispatch<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setItemImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    setImagePreview(
      itemEdit && itemEdit.image ? `${itemEdit.image.filePath}` : null
    );

    setDescription(
      itemEdit && itemEdit.description ? itemEdit.description : ""
    );
  }, [itemEdit]);

  const saveItem = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", item?.name);
    formData.append("category", item?.category);
    formData.append("quantity", item?.quantity.toString());
    formData.append("price", item?.price.toString());
    formData.append("description", description);

    if (itemImage) {
      formData.append("image", itemImage);
    }

    await dispatch(SET_EDIT_ITEM_MODAL(false));
    await dispatch(updateItem({ itemID, formData }));
    await dispatch(getItems());
  };

  return (
    <div
      className={
        isSidebarOpen
          ? `${styles.modal__background} ${styles.modal__sidebarOpen}`
          : `${styles.modal__background} ${styles.modal__sidebarClose}`
      }
    >
      <Card cardClass="add__item">
        <div className={styles.modal__header}>
          <h3>Edit item</h3>
          <div className={styles.modal__close}>
            <GrFormClose onClick={() => dispatch(SET_EDIT_ITEM_MODAL(false))} />
          </div>
        </div>
        <ItemForm
          item={item}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveItem={saveItem}
        />
        <div className={styles.modal__buttons}>
          <button
            className="secondary-button"
            onClick={() => dispatch(SET_EDIT_ITEM_MODAL(false))}
          >
            Cancel
          </button>
          <button className="primary-button" type="submit" onClick={saveItem}>
            Update item
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EditItemModal;

//itemImage={itemImage}
