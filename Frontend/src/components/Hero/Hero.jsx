import React, { useState, useEffect } from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const Hero = ({ onContactClick }) => {
  const [specialMessage, setSpecialMessage] = useState(null);
  const [specialLoading, setSpecialLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/special-feature`)
      .then((res) => res.json())
      .then((data) => setSpecialMessage(data.message))
      .catch(() => setSpecialMessage(null))
      .finally(() => setSpecialLoading(false));
  }, []);

  const handleContactClick = () => {
    if (typeof onContactClick === "function") {
      onContactClick();
    } else {
      window.location.href = "#contact";
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.label}>Information Technology</p>
          <h1 className={styles.title}>Hi, I'm Jerrome</h1>
          <p className={styles.description}>
          4th Year BS Information Technology student at National University,
          passionate about creating impactful digital solutions and advancing my
          expertise in modern software development.
        </p>
        {!specialLoading && specialMessage && (
          <p className={styles.specialMessage}>{specialMessage}</p>
        )}
        <button
          type="button"
          className={styles.contactBtn}
          onClick={handleContactClick}
        >
          Contact Me
        </button>
        </div>
        <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
