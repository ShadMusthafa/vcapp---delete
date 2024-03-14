import Card from "../../../Card/Card";
import styles from "./ItemsInfo.module.scss";

interface ItemsInfoProps {
  iconBackgroundColor: string;
  title: string;
  count: string | number;
  icon: string | null | any;
}

const ItemsInfo = ({
  iconBackgroundColor,
  title,
  count,
  icon,
}: ItemsInfoProps) => {
  return (
    <div>
      <Card cardClass="items__info">
        <span
          className={`${styles.info__iconBackground} ${iconBackgroundColor}`}
        >
          <span className={styles.info__icon}>{icon}</span>
        </span>
        <span className={styles.info__text}>
          <h4>{count}</h4>
          <p>{title}</p>
        </span>
      </Card>
    </div>
  );
};

export default ItemsInfo;
