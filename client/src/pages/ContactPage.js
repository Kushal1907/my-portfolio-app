import {
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
  XCircle,
} from "lucide-react"; // Import icons used here
import { useState } from "react";
import { sendContactMessage } from "../api"; // Adjusted path
import { Section } from "../App"; // Assuming Section is exported from App.js or a common components file

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setShowToast(false);

    try {
      const response = await sendContactMessage(formData);
      const successMessage =
        response.data.msg ||
        "Message sent successfully! I'll be in touch soon.";
      setToastType("success");
      setToastMessage(successMessage);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(
        "Contact form submission error:",
        err.response || err.message || err
      );
      const errorMessage =
        err.response?.data?.msg ||
        "Oops! Something went wrong. Please try again.";
      setToastType("error");
      setToastMessage(errorMessage);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    }
    setIsSending(false);
  };

  return (
    <>
      {showToast && (
        <div
          className={`toast-notification show ${toastType}`}
          role={toastType === "error" ? "alert" : "status"}>
          {toastType === "success" ? (
            <CheckCircle size={20} className="toast-icon" />
          ) : (
            <XCircle size={20} className="toast-icon" />
          )}
          {toastMessage}
          <button
            onClick={() => setShowToast(false)}
            className="toast-close-button"
            aria-label="Close notification">
            <X size={18} />
          </button>
        </div>
      )}

      <Section id="contact" className="contact-section">
        <h2 className="section-title animate-fadeInUp">Get In Touch</h2>
        <div className="contact-content-grid animate-fadeInUp stagger-delay-1">
          <div className="contact-details">
            <h3 className="contact-details-heading">Reach Me Directly</h3>
            <p
              className="contact-intro-text"
              style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities. Feel free to reach out via email or phone.
            </p>
            <ul className="contact-info-list">
              <li>
                <Mail size={20} className="contact-info-icon" />
                <a href="mailto:kusharora19072001@gmail.com">
                  kusharora19072001@gmail.com
                </a>
              </li>
              <li>
                <Phone size={20} className="contact-info-icon" />
                <a href="tel:+919817864314">+91 9817864314</a>
              </li>
              <li>
                <MapPin size={20} className="contact-info-icon" />
                <span>Ambala, Haryana, India</span>
              </li>
            </ul>
            <p className="contact-page-form-cta">
              Or, use the form to send a message:
            </p>
          </div>
          <div className="contact-form-wrapper">
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group animate-fadeInUp stagger-delay-2">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group animate-fadeInUp stagger-delay-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group animate-fadeInUp stagger-delay-4">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    className="form-textarea"
                    placeholder="Let's build something amazing..."
                    value={formData.message}
                    onChange={handleChange}
                    required></textarea>
                </div>
                <div className="animate-fadeInUp stagger-delay-5">
                  <button
                    type="submit"
                    className={`button button-submit contact-submit-button ${
                      isSending ? "sending" : ""
                    }`}
                    disabled={isSending}>
                    {isSending ? (
                      <Loader2
                        size={20}
                        className="animate-spin button-icon-leading"
                      />
                    ) : (
                      <Send size={20} className="button-icon-leading" />
                    )}
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
