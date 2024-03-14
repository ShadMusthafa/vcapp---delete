import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  SET_ADD_ITEM_MODAL,
} from "../../../redux/features/item/itemSlice";
import { selectIsSidebarOpen } from "../../../redux/features/sidebar/sidebarSlice";
import ItemForm from "../ItemForm/ItemForm";
import { GrFormClose } from "react-icons/gr";
import Card from "../../Card/Card";
import styles from "./AddItemModal.module.scss";
import "../../../styles/buttons.scss";

interface Item {
  _id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

const initialState: Item = {
  _id: 0,
  name: "",
  category: "",
  quantity: 0,
  price: 0,
  createdAt: new Date(),
};

const AddItemModal = () => {
  const [item, setItem] = useState<Item>(initialState);
  const [itemImage, setItemImage] = useState<File | null | any>(null);
  const [imagePreview, setImagePreview] = useState<string | null | any>(null);
  const [description, setDescription] = useState<string>("");

  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  const dispatch = useDispatch<any>();

  const { name, category, quantity, price } = item;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItemImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const generateSKU = (category: string): string => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveItem = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity.toString());
    formData.append("price", price.toString());
    formData.append("description", description);
    if (itemImage) {
      formData.append("image", itemImage);
    }

    await dispatch(SET_ADD_ITEM_MODAL(false));
    await dispatch(addItem(formData));
  };
  /*
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image: null;*/

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
          <h3>Add New Item</h3>
          <div className={styles.modal__close}>
            <GrFormClose onClick={() => dispatch(SET_ADD_ITEM_MODAL(false))} />
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
            onClick={() => dispatch(SET_ADD_ITEM_MODAL(false))}
          >
            Cancel
          </button>
          <button className="primary-button" type="submit" onClick={saveItem}>
            Save item
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AddItemModal;
//itemImage={itemImage}
