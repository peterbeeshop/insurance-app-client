"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "./index.module.css";
import { Upload } from "lucide-react";

// Define claim types
const CLAIM_TYPES = ["theft", "accident", "medical", "other"];

const ClaimSetupPage: React.FC = () => {
  // State for form fields
  const [claimType, setClaimType] = useState<string>("");
  const [otherClaimType, setOtherClaimType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  // Handle claim type change
  const handleClaimTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setClaimType(e.target.value);
    // Clear other claim type if not "other"
    if (e.target.value !== "other") {
      setOtherClaimType("");
    }
  };

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  // Handle next button click
  const handleNext = () => {
    // Validate and process form data
    console.log({
      claimType: claimType === "other" ? otherClaimType : claimType,
      description,
      contactNumber,
      images,
    });
    // Add navigation to next step here
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.claimSetupCard}>
        <div className={styles.leftSection}>
          <h1 className={styles.mainHeading}>Welcome to claim setup</h1>
          <h2 className={styles.subHeading}>Create an insurance claim</h2>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="claimType" className={styles.label}>
              Claim type
            </label>
            <select
              id="claimType"
              className={styles.input}
              value={claimType}
              onChange={handleClaimTypeChange}
            >
              <option value="" disabled>
                Select claim type
              </option>
              {CLAIM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {claimType === "other" && (
            <div className={styles.formGroup}>
              <label htmlFor="otherClaimType" className={styles.label}>
                Specify claim type
              </label>
              <input
                type="text"
                id="otherClaimType"
                className={styles.input}
                value={otherClaimType}
                onChange={(e) => setOtherClaimType(e.target.value)}
                placeholder="Enter claim type"
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your claim"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactNumber" className={styles.label}>
              Contact number
            </label>
            <input
              type="tel"
              id="contactNumber"
              className={styles.input}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Upload Images</label>
            <div className={styles.uploadArea}>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className={styles.fileInput}
                onChange={handleFileUpload}
              />
              <label htmlFor="images" className={styles.uploadButton}>
                <Upload size={24} />
                <span>Upload Images</span>
              </label>
              {images.length > 0 && (
                <div className={styles.imagesPreview}>
                  <p>{images.length} file(s) selected</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={styles.nextButton} onClick={handleNext}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimSetupPage;
