import React from "react";
import { Modal } from "../Modal/Modal";
import { getImageUrl } from "../../utils";
import styles from "./ProjectModal.module.css";

export const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  const handleSourceClick = () => {
    window.open(project.source, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title}>
      <div className={styles.container}>
        <img
          src={getImageUrl(project.imageSrc)}
          alt={project.title}
          className={styles.image}
        />
        <p className={styles.description}>{project.description}</p>
        <div className={styles.skills}>
          {project.skills.map((skill, id) => (
            <span key={id} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={styles.sourceBtn}
          onClick={handleSourceClick}
        >
          View Source Code →
        </button>
      </div>
    </Modal>
  );
};
