import { useState, ChangeEvent, FormEvent } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../../utils/api";
import { validateEmail } from "../../utils/utils";
import Card from "../../components/Card/Card";
import styles from "./auth.module.scss";
import "../../styles/buttons.scss";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const forgotPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    const userData = {
      email,
      password,
    };

    await forgotPassword(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card cardClass="auth">
        <div className={styles.form}>
          <div className={styles.formTop}>
            <HiOutlineMail className={styles.icon} />
            <h2>Forgot Password?</h2>
          </div>

          <form onSubmit={forgotPass}>
            <div className={styles.input}>
              <input
                type="email"
                placeholder="Email"
                // required
                name="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <button
              className={`${styles.authButton} primary-button`}
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
