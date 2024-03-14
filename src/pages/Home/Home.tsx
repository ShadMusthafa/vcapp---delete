import { Link } from "react-router-dom";
import HomeNav from "../../components/Nav/HomeNav/HomeNav";
import heroImg from "../../assets/stellium-logo.png";
import styles from "./Home.module.scss";
import "../../styles/buttons.scss";

interface NumberTextProps {
  num: string;
  text: string;
}

const NumberText = ({ num, text }: NumberTextProps) => {
  return (
    <div className={styles.number__text}>
      <h3>{num}</h3>
      <p>{text}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className={styles.home}>
      <nav>
        <HomeNav />
      </nav>
      <section className={styles.home__container}>
        <header className={styles.home__hero_text}>
          <h2>Vendor {"&"} Supply Chain Management Solution</h2>
          <p>
            The Vendor collaboration module is targeted at vendors who don't
            have electronic data interchange (EDI) integration with any Supply
            Chain Management.
          </p>

          <button className="secondary-button-home">
            <Link to="/dashboard">Free Trial 1 Month</Link>
          </button>

          <div className={styles.home__numbers}>
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </header>
        <div className={styles.home__hero__img}>
          <img src={heroImg} alt="Stellium" />
        </div>
      </section>
    </div>
  );
};

export default Home;
