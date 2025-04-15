"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import styles from "../login/login.module.css";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/user.mutations";

type RegisterUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  // Mutation
  const [createUserMutation, { loading, error }] = useMutation(CREATE_USER);

  // Form state
  const [registerUser, setRegisterUser] = useState<Partial<RegisterUserType>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Confirm password state (not part of the actual user data)
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form validation state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password match validation
  const passwordsMatch = registerUser.password === confirmPassword;

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle confirm password changes
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    // Clear confirm password error
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };

    // Check required fields
    if (!registerUser.firstName?.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!registerUser.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!registerUser.email?.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerUser.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!registerUser.password?.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (registerUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (confirmPassword !== registerUser.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await createUserMutation({
        variables: {
          data: {
            first_name: registerUser.firstName,
            last_name: registerUser.lastName,
            email: registerUser.email,
            password: registerUser.password,
          },
        },
      });

      // Handle successful registration
      console.log("User registered successfully:", data);

      // Redirect to login page or show success message
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

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
          <h2 className={styles.loginTitle}>Register</h2>

          {error && (
            <div className={styles.errorMessage}>
              {error.message || "Registration failed. Please try again."}
            </div>
          )}

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {/* firstname field */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={styles.input}
                value={registerUser.firstName || ""}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            {/* lastname field */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={styles.input}
                value={registerUser.lastName || ""}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>

            {/* Email field */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className={styles.input}
                value={registerUser.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            {/* Password field */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                value={registerUser.password || ""}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            {/* Confirm password field */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={styles.input}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading || !passwordsMatch}
            >
              {loading ? "Registering..." : "Register"}
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
