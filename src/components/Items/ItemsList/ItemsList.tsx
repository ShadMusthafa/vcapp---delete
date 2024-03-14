import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { BiMessageSquareEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import moment from "moment";
import ReactPaginate from "react-paginate";
import {
  FILTER_ITEMS,
  selectFilteredItems,
} from "../../../redux/features/item/filterSlice";
import {
  SET_ADD_ITEM_MODAL,
  SET_DELETE_ITEM_MODAL,
  SET_EDIT_ITEM_MODAL,
  SET_ITEM_DETAILS_MODAL,
  SET_ITEM_ID,
  getItem,
} from "../../../redux/features/item/itemSlice";
import { SET_SIDEBAR } from "../../../redux/features/sidebar/sidebarSlice";
import { shortenText } from "../../../utils/utils";
import SearchItems from "../../SearchItems/SearchItems";
import styles from "./ItemsList.module.scss";
import "../../../styles/buttons.scss";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

interface Item {
  _id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

interface ItemsListProps {
  items: Item[];
  isLoading: boolean;
}

const ItemsList = ({ items, isLoading }: ItemsListProps) => {
  const [search, setSearch] = useState<string>("");
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const filteredItems = useSelector(selectFilteredItems);

  const dispatch = useDispatch<any>();

  const { height, width } = useWindowDimensions();

  let itemsPerPage: number;

  if (height < 700) {
    itemsPerPage = 5;
  } else {
    itemsPerPage = 10;
  }

  const handleClickOnRow = async (id: number) => {
    await dispatch(getItem(id));
    dispatch(SET_ITEM_DETAILS_MODAL(true));
    dispatch(SET_SIDEBAR(false));
  };

  const handleOpenAddItemModal = () => {
    dispatch(SET_ADD_ITEM_MODAL(true));
    dispatch(SET_SIDEBAR(false));
  };

  const handleOpenDeleteItemModal = (id: number) => {
    dispatch(SET_DELETE_ITEM_MODAL(true));
    dispatch(SET_SIDEBAR(false));
    dispatch(SET_ITEM_ID(id));
  };

  const handleOpenEditItemModal = async (id: number) => {
    await dispatch(getItem(id));
    dispatch(SET_EDIT_ITEM_MODAL(true));
    dispatch(SET_SIDEBAR(false));
    dispatch(SET_ITEM_ID(id));
  };

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredItems]);

  useEffect(() => {
    dispatch(FILTER_ITEMS({ items, search }));
  }, [items, search]);

  return (
    <div className={styles.list__container}>
      <hr />
      <div className={styles.list__topSection}>
        <h3>Items List</h3>
        <SearchItems
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primary-button" onClick={handleOpenAddItemModal}>
          + Add Item
        </button>
      </div>

      {isLoading ? (
        <div className={styles.list__loader}>
          <PulseLoader />
        </div>
      ) : (
        <div className={styles.list__table}>
          {!isLoading && items.length === 0 ? (
            <p>No items found, please add an item.</p>
          ) : (
            <div className={styles.list__table__wrapper}>
              <table>
                <thead>
                  <tr className={styles.list__title}>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => {
                    const { _id, name, category, price, quantity, createdAt } =
                      item;
                    return (
                      <tr className={styles.list__info} key={_id}>
                        <td onClick={() => handleClickOnRow(_id)}>
                          {index + 1 + "."}
                        </td>
                        <td
                          className={styles.list__info__name}
                          onClick={() => handleClickOnRow(_id)}
                        >
                          {width >= 1440
                            ? shortenText(name, 30)
                            : shortenText(name, 15)}
                        </td>
                        <td onClick={() => handleClickOnRow(_id)}>
                          {category}
                        </td>
                        <td onClick={() => handleClickOnRow(_id)}>
                          {"£"}
                          {price}
                        </td>
                        <td onClick={() => handleClickOnRow(_id)}>
                          {quantity}
                        </td>
                        <td onClick={() => handleClickOnRow(_id)}>
                          {"£"}
                          {price * quantity}
                        </td>
                        <td>
                          <span className={styles.list__date}>
                            {moment(createdAt).format("ll")}
                          </span>

                          <div className={styles.list__icons__container}>
                            <div className={styles.list__icons__edit}>
                              <BiMessageSquareEdit
                                onClick={() => {
                                  handleOpenEditItemModal(_id);
                                }}
                              />
                            </div>
                            <div className={styles.list__icons__delete}>
                              <BsTrash
                                onClick={() => handleOpenDeleteItemModal(_id)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.page__num}
        previousLinkClassName={styles.page__next__prev}
        nextLinkClassName={styles.page__next__prev}
        activeLinkClassName={styles.page__active}
        disabledClassName={styles.page__disabled}
        disabledLinkClassName={styles.page__disabled__link}
      />
    </div>
  );
};

export default ItemsList;
