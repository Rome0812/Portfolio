import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>About</h2>
        <p className={styles.subtitle}>What I bring to the table</p>
      </div>
      <ul className={styles.content}>
        <li className={styles.aboutItem}>
          <div className={styles.icon}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Frontend" />
          </div>
          <div className={styles.aboutItemText}>
              <h3>Frontend Developer</h3>
              <p>
                I'm a frontend developer with experience in building responsive
                and optimized sites
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <div className={styles.icon}>
              <img src={getImageUrl("about/serverIcon.png")} alt="Backend" />
            </div>
            <div className={styles.aboutItemText}>
              <h3>Backend Developer</h3>
              <p>
                I have experience developing fast and optimised back-end systems
                and APIs
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <div className={styles.icon}>
              <img src={getImageUrl("about/cursorIcon.png")} alt="UI Design" />
            </div>
            <div className={styles.aboutItemText}>
              <h3>UI Designer</h3>
              <p>
                I have designed multiple landing pages and have created design
                systems as well
              </p>
            </div>
          </li>
        </ul>
    </section>
  );
};
