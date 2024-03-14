import { useDispatch, useSelector } from "react-redux";
import { selectIsSidebarOpen } from "../../../redux/features/sidebar/sidebarSlice";
import { HiArrowNarrowRight } from "react-icons/hi";
import { SET_ITEM_DETAILS_MODAL } from "../../../redux/features/item/itemSlice";
import DOMPurify from "dompurify";
import moment from "moment";
import { useState } from "react";
import Card from "../../Card/Card";
import styles from "./ItemDetailsModal.module.scss";
import { RootState } from "../../../redux/store";

interface Item {
  image: {
    filePath: string;
    fileName: string;
  };
  quantity: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemDetailsModal = () => {
  const [modalClassName, setModalClassName] = useState<string>(
    "item__details__open"
  );

  const isSidebarOpen: boolean = useSelector(selectIsSidebarOpen);

  const itemEdit: Item | any = useSelector(
    (state: RootState) => state.item.item
  );

  const [item] = useState<Item>(itemEdit);

  const dispatch = useDispatch<any>();

  const stockStatus = (quantity: number): JSX.Element => {
    if (quantity > 0) {
      return <span className={styles.item__in_stock}>In Stock</span>;
    }
    return <span className={styles.item__out_stock}>Out of Stock</span>;
  };

  const handleCloseModal = (): void => {
    setModalClassName("item__details__close");
    setTimeout(() => {
      dispatch(SET_ITEM_DETAILS_MODAL(false));
    }, 400);
  };

  return (
    <div
      className={
        isSidebarOpen
          ? `${styles.item__modal__background} ${styles.modal__sidebarOpen}`
          : `${styles.item__modal__background} ${styles.modal__sidebarClose}`
      }
    >
      <Card cardClass={`item__details ${modalClassName}`}>
        <div className={styles.item__modal__header}>
          <div className={styles.modal__icon}>
            <HiArrowNarrowRight onClick={handleCloseModal} />
          </div>
          <h3>Item details</h3>
        </div>
        <div className={styles.item__info}>
          {item?.image ? (
            <div className={styles.item__img}>
              <img src={item.image.filePath} alt={item.image.fileName} />
            </div>
          ) : (
            <p>No image set for this item.</p>
          )}
          <h4>Product Availability: {stockStatus(item.quantity)}</h4>
          <hr />
          <p>
            <span>Item:</span> {item.name}
          </p>
          <p>
            <span>SKU:</span> {item.sku}
          </p>
          <p>
            <span>Category:</span> {item.category}
          </p>
          <p>
            <span>Price:</span> {"£"}
            {item.price}
          </p>
          <p>
            <span>Quantity:</span> {item.quantity}
          </p>
          <p>
            <span>Total value:</span> {"£"}
            {item.price * item.quantity}
          </p>
          <p>
            <span>Description:</span>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.description),
            }}
          ></div>
          <hr />
          <p>
            <span>Created at:</span> {moment(item.createdAt).format("ll")}
          </p>

          <p>
            <span>Last update:</span> {moment(item.updatedAt).format("ll")}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ItemDetailsModal;
