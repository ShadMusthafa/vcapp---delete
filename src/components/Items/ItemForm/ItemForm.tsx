import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import styles from "./ItemForm.module.scss";

/* interface Item {
  name: string;
  category: string;
  price: number;
  quantity: number;
}
 */
interface Item {
  _id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

/* interface ItemFormProps {
  item: Item | null;
  itemImage: string | null;
  imagePreview: string | null;
  description: string;
  setDescription: (value: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  saveItem: (e: FormEvent) => void;
} */

const ItemForm = ({
  item,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveItem,
}: {
  item: Item | null;
  imagePreview: string | null;
  description: string;
  setDescription: (description: string) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveItem: (event: React.ChangeEvent<HTMLButtonElement> | any) => void;
}) => {
  return (
    <div>
      <form className={styles.form__items} onSubmit={saveItem}>
        <div className={styles.card__image}>
          <label>Choose an image</label>
          <span>(Supported formats: .jpg, .jpeg, .png)</span>
          {imagePreview !== null ? (
            <div className={styles.image__preview}>
              <img src={imagePreview} alt="Item image" />
            </div>
          ) : (
            <p>No image set for this item.</p>
          )}
          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <div>
          <div className={styles.form__item}>
            <label>Item</label>
            <input
              type="text"
              placeholder="Enter item name"
              name="name"
              value={item?.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.form__category}>
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              name="category"
              value={item?.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.form__price}>
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter price"
              name="price"
              value={item?.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.form__quantity}>
            <label>Quantity</label>
            <input
              type="text"
              placeholder="Enter quantity"
              name="quantity"
              value={item?.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className={styles.form__description}>
          <label>Description</label>
          <ReactQuill
            placeholder="Write item's description..."
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ItemForm.modules}
            formats={ItemForm.formats}
          />
        </div>
      </form>
    </div>
  );
};

ItemForm.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ItemForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ItemForm;
