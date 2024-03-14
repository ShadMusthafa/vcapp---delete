import { ShowOnLogin, ShowOnLogout } from "../../Protect/HiddenLinks";
import { Link } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import styles from "./HomeNav.module.scss";
import "../../../styles/buttons.scss";

const HomeNav = () => {
  return (
    <nav aria-label="left navigation" className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <MdOutlineInventory2 />
          <p>Vendor Collaboration Portal</p>
        </div>
        <nav aria-label="right navigation">
          <ul>
            <ShowOnLogout>
              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <button className="primary-button-home">
                  <Link to="/login">Log in</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="primary-button-home">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default HomeNav;
