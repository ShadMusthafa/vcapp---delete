import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { validateEmail } from "../../utils/utils";
import { loginUser } from "../../utils/api";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { PulseLoader } from "react-spinners";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import "../../styles/buttons.scss";

interface FormState {
  email: string;
  password: string;
}

const initialState: FormState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");

    // if (!email || !password) {
    //   return toast.error("All fields are required.");
    // }
    // if (!validateEmail(email)) {
    //   return toast.error("Please enter a valid email.");
    // }

    // const userData = {
    //  userid:email,
    //   password,
    // };
    // setIsLoading(true);


    // try {
    //   const data = await loginUser(userData);
    //   await dispatch(SET_LOGIN(true));
    //   await dispatch(SET_NAME(data.fname));
    //   navigate("/dashboard");
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className={styles.auth}>
      {isLoading ? (
        <PulseLoader color="#252f3c" size={11} />
      ) : (
        <Card cardClass="auth">
          <div className={styles.form}>
            <div className={styles.formTop}>
              <FiLogIn className={styles.icon} />
              <h2>Log in</h2>
            </div>

            <form onSubmit={login}>
              <div className={styles.input}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <span className={styles.forgotPassword}>
                <Link to="/forgot-password">
                  <p>Forgot password?</p>
                </Link>
              </span>
              <button
                className={`${styles.authButton} primary-button`}
                type="submit"
              >
                Log in
              </button>
            </form>
            <hr />
            <span className={styles.register}>
              Don't have an account yet?
              <Link to="/register">
                <strong> Register</strong>
              </Link>
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Login;
