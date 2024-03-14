import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import {
  getItems,
  selectIsOpenAddItemModal,
  selectIsOpenDeleteItemModal,
  selectIsOpenEditItemModal,
  selectisOpenItemDetailsModal,
} from "../../redux/features/item/itemSlice";
import AddItemModal from "../../components/Items/AddItemModal/AddItemModal";
import DeleteItemModal from "../../components/Items/DeleteItemModal/DeleteItemModal";
import EditItemModal from "../../components/Items/EditItemModal/EditItemModal";
import ItemDetailsModal from "../../components/Items/ItemDetailsModal/ItemDetailsModal";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import ItemsStats from "../../components/Items/ItemsStats/ItemsStats";
import useRedirectLoggedOutUser from "../../hooks/useRedirectLoggedOutUser";
import { RootState } from "../../redux/store";

const Dashboard = () => {
  // useRedirectLoggedOutUser("/login");

  // const dispatch = useDispatch();

  // const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  // const isAddItemModalOpen: boolean = useSelector(selectIsOpenAddItemModal);
  // const isEditItemModalOpen: boolean = useSelector(selectIsOpenEditItemModal);
  // const isDeleteModalOpen: boolean = useSelector(selectIsOpenDeleteItemModal);
  // const isItemDetailsModalOpen: boolean = useSelector(
  //   selectisOpenItemDetailsModal
  // );

  // const { items, isLoading, isError, message } = useSelector(
  //   (state: RootState) => state.item
  // );

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch<any>(getItems());
  //   }

  //   if (isError) {
  //     toast.error(message);
  //   }
  // }, [isLoggedIn, isError]);

  return (
    <div>
      {/* {isAddItemModalOpen ? <AddItemModal /> : null}
      {isEditItemModalOpen ? <EditItemModal /> : null}
      {isDeleteModalOpen ? <DeleteItemModal /> : null}
      {isItemDetailsModalOpen ? <ItemDetailsModal /> : null} */}

      {/* <ItemsStats items={items} /> */}
      {/* <ItemsList items={items} isLoading={isLoading} /> */}
    </div>
  );
};

export default Dashboard;
