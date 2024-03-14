import { useEffect } from "react";
import { BsCart, BsCartX, BsCurrencyDollar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_OUT_OF_STOCK,
  CALC_STORE_VALUE,
  selectItemsOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/item/itemSlice";
import { formatTotalStoreValue } from "../../../utils/utils";
import ItemsInfo from "./ItemsInfo/ItemsInfo";
import styles from "./ItemsStats.module.scss";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

interface ItemsStatsProps {
  items: Item[];
}

const cartIcon = <BsCart color="#6D1BE7" />;
const outOfStockIcon = <BsCartX color="#FA3B3B" />;
const storeValueIcon = <BsCurrencyDollar color="#009764" />;

const ItemsStats = ({ items }: ItemsStatsProps) => {
  const dispatch = useDispatch<any>();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const itemsOutOfStock = useSelector(selectItemsOutOfStock);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(items));
    dispatch(CALC_OUT_OF_STOCK(items));
  }, [items]);

  return (
    <div className={styles.itemsStats__container}>
      <h3>Items Stats</h3>
      <div className={styles.itemsStats__info}>
        <ItemsInfo
          iconBackgroundColor={styles.icon1}
          icon={cartIcon}
          title={"Total Items"}
          count={items.length}
        />
        <ItemsInfo
          iconBackgroundColor={styles.icon2}
          icon={storeValueIcon}
          title={"Total Store Value"}
          count={`£ ${formatTotalStoreValue(totalStoreValue.toFixed(2))}`}
        />
        <ItemsInfo
          iconBackgroundColor={styles.icon3}
          icon={outOfStockIcon}
          title={"Items Out of Stock"}
          count={itemsOutOfStock}
        />
      </div>
    </div>
  );
};

export default ItemsStats;

//count={`£ ${formatTotalStoreValue(totalStoreValue.toFixed(2))}`}
