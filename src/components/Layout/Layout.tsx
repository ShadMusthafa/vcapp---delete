import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import DashboardNav from "../Nav/DashboardNav/DashboardNav";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DashboardNav />
      <section className={styles.children}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
