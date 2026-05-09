import { useState } from "react";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Footer } from "./components/Footer/Footer";
import { ContactModal } from "./components/ContactModal/ContactModal";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";
import { Projects } from "./components/Projects/Projects";

function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [projectModal, setProjectModal] = useState({ open: false, project: null });

  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  const openProjectModal = (project) => setProjectModal({ open: true, project });
  const closeProjectModal = () => setProjectModal({ open: false, project: null });

  return (
    <div className={styles.App}>
      <Navbar />
      <Hero onContactClick={openContactModal} />
      <About />
      <Experience />
      <Projects onProjectClick={openProjectModal} />
      <Footer onContactClick={openContactModal} />
      <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} />
      <ProjectModal
        isOpen={projectModal.open}
        onClose={closeProjectModal}
        project={projectModal.project}
      />
    </div>
  );
}

export default App;
