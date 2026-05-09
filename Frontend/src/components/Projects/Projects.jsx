import React from "react";

import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = ({ onProjectClick }) => {
  return (
    <section className={styles.container} id="projects">
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.subtitle}>Selected work and experiments</p>
      </div>
      <div className={styles.projects}>
        {projects.map((project, id) => (
          <ProjectCard
            key={id}
            project={project}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>
    </section>
  );
};
