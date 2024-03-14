import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./SearchItems.module.scss";

interface SearchItemsProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchItems = ({ value, onChange }: SearchItemsProps) => {
  return (
    <div className={styles.search}>
      <BiSearch className={styles.search__icon} />
      <input
        type="text"
        placeholder="Search items"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchItems;
