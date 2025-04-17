// "use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { userSelectors } from "@/store/user.store";

const Navbar = () => {
  const pathname = usePathname();

  const user = useSelector(userSelectors.selectUser);

  return (
    <nav className={styles.navbar}>
      {/* Logo and App Name */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <div className={styles.dotRed}></div>
          <div className={styles.dotTeal}></div>
          <div className={styles.dotWhite}></div>
        </div>
        <span className={styles.appName}>Insurance App</span>
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinksContainer}>
        <div className={styles.navLinks}>
          <Link
            href="/home"
            className={`${styles.navLink} ${
              pathname === "/home" ? styles.activeNavLink : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/claims"
            className={`${styles.navLink} ${
              pathname === "/claims" ? styles.activeNavLink : ""
            }`}
          >
            Claims
          </Link>
        </div>
      </div>

      {/* User Info and Logout */}
      <div className={styles.userSection}>
        <span className={styles.greeting}>Hello, {user.first_name}</span>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
