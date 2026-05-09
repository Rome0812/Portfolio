import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({ project, onProjectClick }) => {
  const { title, imageSrc, description, skills, source } = project;

  const handleCardClick = (e) => {
    if (!e.target.closest(`.${styles.link}`)) {
      onProjectClick?.(project);
    }
  };

  const handleSourceClick = (e) => {
    e.stopPropagation();
    window.open(source, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      className={styles.container}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`${title} project preview`}
          className={styles.image}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
        </ul>
        <div className={styles.links}>
        <button
          type="button"
          className={styles.link}
          onClick={handleSourceClick}
        >
          View Source
        </button>
        </div>
      </div>
    </article>
  );
};
