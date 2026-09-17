import React from "react";
import { Link } from "react-router-dom";
import "./LegalPage.css";

const PrivacyPolicy = () => {
  return (
    <main className="legal-page">
      <div className="legal-content-container">
        {/* ── Top Page Breadcrumb ── */}
        <div className="legal-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="legal-breadcrumb-sep">/</span>
          <span>PRIVACY POLICY</span>
        </div>

        {/* ── Single White Card Container ── */}
        <div className="legal-card">
          <h1 className="legal-card-title">PRIVACY POLICY</h1>
          <p className="legal-card-subtitle">
            Please read this Privacy Policy carefully to understand how Unnati Jewellers collects, uses, stores, and protects your personal information.
          </p>

          {/* Section 1 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              1. INTRODUCTION
            </h2>
            <p className="legal-text">
              Welcome to <strong>Unnati Jewellers</strong> (“we”, “our”, “us”). We value your privacy and are committed to protecting the personal information you share with us through our website.
            </p>
            <p className="legal-text">
              This Privacy Policy explains what information we collect, how we use it, how we protect it, and your rights regarding your personal information when you visit or use our website.
            </p>
            <p className="legal-text">
              By accessing or using this website, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

          {/* Section 2 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              2. INFORMATION WE COLLECT
            </h2>
            <p className="legal-text">
              We collect only the information that is necessary to provide our services and respond to your requests.
            </p>

            <p className="legal-text">
              <strong>A. Contact Us Form</strong><br />
              When you submit an enquiry through our Contact Us form, we may collect:
            </p>
            <ul className="legal-list">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address (if provided)</li>
              <li>Your Message</li>
            </ul>

            <p className="legal-text">
              <strong>B. Appointment Booking</strong><br />
              When you schedule an appointment through our website, we may collect:
            </p>
            <ul className="legal-list">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address (if provided)</li>
              <li>Preferred Appointment Date and Time</li>
              <li>Any additional information you choose to provide</li>
            </ul>

            <p className="legal-text">
              <strong>C. Newsletter Subscription</strong><br />
              If you subscribe to receive updates from us, we may collect:
            </p>
            <ul className="legal-list">
              <li>Name (if requested)</li>
              <li>Email Address</li>
            </ul>

            <p className="legal-text">
              <strong>D. Technical Information</strong><br />
              When you browse our website, certain information may be collected automatically, including:
            </p>
            <ul className="legal-list">
              <li>IP Address</li>
              <li>Browser Type and Version</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Date and Time of Visit</li>
              <li>Pages Visited</li>
              <li>Referring Website (if applicable)</li>
              <li>Cookies and Website Usage Data</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              3. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="legal-text">
              The information collected through our website may be used to:
            </p>
            <ul className="legal-list">
              <li>Respond to your enquiries.</li>
              <li>Schedule and manage appointments.</li>
              <li>Communicate with you regarding your requests.</li>
              <li>Send newsletters and promotional updates (only if you have subscribed).</li>
              <li>Improve our website, products, and customer experience.</li>
              <li>Analyse website usage and performance.</li>
              <li>Maintain website security and prevent misuse.</li>
              <li>Comply with applicable legal and regulatory obligations.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              4. WHATSAPP COMMUNICATION
            </h2>
            <p className="legal-text">
              Our website may provide a WhatsApp button or link that enables you to contact us directly. Any communication made through WhatsApp is subject to WhatsApp’s own Privacy Policy and Terms of Service. We encourage users to review WhatsApp’s policies before sharing sensitive personal information through the platform.
            </p>
          </div>

          {/* Section 5 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              5. COOKIES
            </h2>
            <p className="legal-text">
              Our website may use cookies and similar technologies to improve website functionality, remember user preferences, analyse website traffic and visitor behaviour, and enhance your browsing experience. Most web browsers allow you to manage or disable cookies through their settings.
            </p>
          </div>

          {/* Section 6 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              6. SHARING OF INFORMATION
            </h2>
            <p className="legal-text">
              We respect your privacy and do not sell, rent, or trade your personal information. Your information may be shared only when necessary with website hosting and cloud providers, technology partners responsible for maintaining our website, email newsletter service providers, and government authorities or law enforcement agencies where required by applicable law.
            </p>
          </div>

          {/* Section 7 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              7. DATA SECURITY
            </h2>
            <p className="legal-text">
              We implement reasonable administrative, technical, and organisational safeguards to protect your personal information against unauthorised access, disclosure, alteration, misuse, or destruction. No method of electronic transmission or storage over the Internet can be guaranteed to be completely secure.
            </p>
          </div>

          {/* Section 8 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              8. DATA RETENTION
            </h2>
            <p className="legal-text">
              We retain personal information only for as long as necessary to respond to your enquiries, manage appointment bookings, deliver newsletter services, or meet legal, regulatory, accounting, or business requirements.
            </p>
          </div>

          {/* Section 9 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              9. YOUR RIGHTS
            </h2>
            <p className="legal-text">
              Subject to applicable laws, you may have the right to request access to your personal information, request correction or updating of inaccurate information, request deletion of personal information where applicable, or withdraw your consent for receiving promotional communications.
            </p>
          </div>

          {/* Section 10 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              10. CHILDREN’S PRIVACY
            </h2>
            <p className="legal-text">
              Our website may be accessed by users of all ages. However, we do not knowingly collect personal information from children without the consent of a parent or legal guardian where such consent is required by applicable law.
            </p>
          </div>

          {/* Section 11 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              11. THIRD-PARTY LINKS
            </h2>
            <p className="legal-text">
              Our website may contain links to third-party websites, social media platforms, or messaging services. We are not responsible for the privacy practices, content, or policies of such third-party websites.
            </p>
          </div>

          {/* Section 12 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              12. APPLICABLE LAW
            </h2>
            <p className="legal-text">
              This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts located in Bhavnagar, Gujarat, India.
            </p>
          </div>

          {/* Section 13 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              13. CHANGES TO THIS PRIVACY POLICY
            </h2>
            <p className="legal-text">
              We may update this Privacy Policy from time to time to reflect changes in our practices, operational requirements, or applicable laws. Any revised version will be published on this page with an updated “Last Updated” date.
            </p>
          </div>

          {/* Section 14 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              14. CONTACT US
            </h2>
            <p className="legal-text">
              If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us:
            </p>
            <div className="legal-contact-card">
              <p><strong>Unnati Jewellers</strong></p>
              <p>Email: support@unnatijewellers.com</p>
              <p>Phone: +91 63516 30432</p>
              <p>Address: G.Floor, Shanti Sky, Parimal Chowk, Waghawadi Road, Bhavnagar, Gujarat, India - 364001</p>
              <p>Business Hours: 11:00 AM to 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
