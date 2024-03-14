import { useState, ChangeEvent, FormEvent } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../utils/api";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import "../../styles/buttons.scss";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const navigate = useNavigate();

  const { email, password, confirmPassword } = formData;

  const { resetToken = "" } = useParams();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    const userData = {
      email,
      password,
      confirmPassword,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card cardClass="auth">
        <div className={styles.form}>
          <div className={styles.formTop}>
            <RiLockPasswordLine className={styles.icon} />
            <h2>Reset Password</h2>
          </div>

          <form onSubmit={reset}>
            <div className={styles.input}>
              <input
                type="password"
                placeholder="New Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <button
              className={`${styles.authButton} primary-button`}
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
