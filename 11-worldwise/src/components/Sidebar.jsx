import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />

        <Outlet />

        <Footer publishYear="2026" author="Worldwise Inc." />
      </div>
    </>
  );
}

export default Sidebar;
