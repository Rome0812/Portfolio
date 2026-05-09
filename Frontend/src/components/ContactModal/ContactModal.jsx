import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./ContactModal.module.css";

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setError("");
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (!apiUrl) {
      setError("Contact API is not configured. Please try the email option instead.");
      setIsSubmitting(false);
      return;
    }

    fetch(apiUrl + "/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = data?.message || data?.error || `Failed to send message (${res.status}).`;
          throw new Error(msg);
        }
        return data;
      })
      .then(() => {
        setSubmitted(true);
        setFormData({ email: "", subject: "", message: "" });
        setFieldErrors({});
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 1500);
      })
      .catch((err) => {
        const isNetworkError = err.name === "TypeError" && /fetch|network/i.test(err.message || "");
        if (isNetworkError) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError(err.message || "Sorry, something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleMailto = () => {
    window.location.href = "mailto:jerromebato7@gmail.com";
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Me">
      <div className={styles.container}>
        {submitted ? (
          <p className={styles.success}>
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.field} ${fieldErrors.email ? styles.fieldError : ""}`}>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              />
              {fieldErrors.email && (
                <span id="contact-email-error" className={styles.fieldErrorText} role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>
            <div className={`${styles.field} ${fieldErrors.subject ? styles.fieldError : ""}`}>
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                aria-invalid={!!fieldErrors.subject}
                aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
              />
              {fieldErrors.subject && (
                <span id="contact-subject-error" className={styles.fieldErrorText} role="alert">
                  {fieldErrors.subject}
                </span>
              )}
            </div>
            <div className={`${styles.field} ${fieldErrors.message ? styles.fieldError : ""}`}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message..."
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              />
              {fieldErrors.message && (
                <span id="contact-message-error" className={styles.fieldErrorText} role="alert">
                  {fieldErrors.message}
                </span>
              )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
