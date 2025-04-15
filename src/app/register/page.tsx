"use client";
import React from "react";
import styles from "../login/login.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span>Insurance App</span>
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Submit, Track, Settle — All in One Place.
          </h1>
          <p className={styles.heroText}>
            Insurance App is a next-generation insurance solution that empowers
            users to file, track, and settle claims faster through smart
            automation.
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Sign in</h2>

          <form className={styles.loginForm}>
            {/* firstname field */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="First name"
                className={styles.input}
              />
            </div>

            {/* lastname field */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Last name"
                className={styles.input}
              />
            </div>

            {/* Email field */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="E-mail"
                className={styles.input}
              />
            </div>

            {/* Password field */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
              />
            </div>

            {/* Confirm assword field */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm password"
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Register
            </button>
          </form>

          <div className={styles.registerLink}>
            <Link href="/login">Login here →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
