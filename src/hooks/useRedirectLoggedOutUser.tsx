import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../utils/api";
import { BsInfoCircle } from "react-icons/bs";

const useRedirectLoggedOutUser = (path: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn: boolean = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast("Session expired, please log in to continue.", {
          icon: <BsInfoCircle />,
        });
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, []);
};

export default useRedirectLoggedOutUser;
/*
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../utils/api';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path: string) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const redirectLoggedOutUser = async () => {
			const isLoggedIn = await getLoginStatus();
			dispatch(SET_LOGIN(isLoggedIn));

			if (!isLoggedIn) {
				navigate(path);
				toast.error('Not authorized, please log in');
				return;
			}
		};
		redirectLoggedOutUser();
	}, []);
};

export default useRedirectLoggedOutUser;

*/
