"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import styles from "./index.module.css";

interface NavbarProps {
  username?: string;
}

const Navbar: React.FC<NavbarProps> = ({ username = "John" }) => {
  const pathname = usePathname();

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
        <span className={styles.greeting}>Hello, {username}</span>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
