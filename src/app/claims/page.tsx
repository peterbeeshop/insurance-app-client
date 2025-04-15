"use client";
import React, { useState } from "react";
import styles from "./index.module.css";

// Define mock data for claims
const mockClaims = [
  {
    id: "claim1",
    description: "The description about the insurance will go here...",
    type: "Medical",
    created: "20th March, 2025",
    status: "pending",
  },
  {
    id: "claim2",
    description: "The description about the insurance will go here...2",
    type: "Medical",
    created: "22nd March, 2025",
    status: "pending",
  },
  {
    id: "claim3",
    description: "Car accident on highway 101. Vehicle damage to front bumper.",
    type: "Accident",
    created: "15th March, 2025",
    status: "approved",
  },
  {
    id: "claim4",
    description: "Phone stolen at the downtown mall during shopping.",
    type: "Theft",
    created: "10th March, 2025",
    status: "denied",
  },
];

type ClaimStatus = "pending" | "approved" | "denied";

const ClaimsPage: React.FC = () => {
  // State for active status filter
  const [activeStatus, setActiveStatus] = useState<ClaimStatus>("pending");

  // Filter claims based on active status
  const filteredClaims = mockClaims.filter(
    (claim) => claim.status === activeStatus
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {/* Status Filter Tabs */}
        <div className={styles.statusTabs}>
          <button
            className={`${styles.statusTab} ${
              activeStatus === "pending" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveStatus("pending")}
          >
            Pending
          </button>
          <button
            className={`${styles.statusTab} ${
              activeStatus === "approved" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveStatus("approved")}
          >
            Approved
          </button>
          <button
            className={`${styles.statusTab} ${
              activeStatus === "denied" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveStatus("denied")}
          >
            Denied
          </button>
        </div>

        {/* Claims List */}
        <div className={styles.claimsList}>
          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim) => (
              <div key={claim.id} className={styles.claimCard}>
                <p className={styles.claimDescription}>{claim.description}</p>
                <div className={styles.claimFooter}>
                  <span className={styles.claimType}>{claim.type}</span>
                  <span className={styles.claimDate}>
                    Created: {claim.created}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noClaimsMessage}>
              No {activeStatus} claims found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimsPage;
