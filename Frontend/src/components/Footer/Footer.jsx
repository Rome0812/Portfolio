import React from "react";

import styles from "./Footer.module.css";
import { getImageUrl } from "../../utils";

export const Footer = ({ onContactClick }) => {
  return (
    <footer id="footer" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
        {onContactClick && (
          <button
            type="button"
            className={styles.contactModalBtn}
            onClick={onContactClick}
          >
            Send a Message
          </button>
        )}
        </div>
        <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a>jerromebato7@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a href="https://www.linkedin.com/in/jerrome-bato/">linkedin.com/jerrome-bato</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/Rome0812">github.com/Rome0812</a>
        </li>
      </ul>
      </div>
    </footer>
  );
};
