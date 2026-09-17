import React from "react";
import { Link } from "react-router-dom";
import "./LegalPage.css";

const TermsConditions = () => {
  return (
    <main className="legal-page">
      <div className="legal-content-container">
        {/* ── Top Page Breadcrumb ── */}
        <div className="legal-breadcrumb">
          <Link to="/">HOME</Link>
          <span className="legal-breadcrumb-sep">/</span>
          <span>TERMS &amp; CONDITIONS</span>
        </div>

        {/* ── Single White Card Container ── */}
        <div className="legal-card">
          <h1 className="legal-card-title">TERMS &amp; CONDITIONS</h1>
          <p className="legal-card-subtitle">
            Please read these Terms &amp; Conditions carefully before using the Unnati Jewellers website.
          </p>

          {/* Section 1 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              1. ACCEPTANCE OF TERMS
            </h2>
            <p className="legal-text">
              Welcome to <strong>Unnati Jewellers</strong> (“we”, “our”, “us”).
            </p>
            <p className="legal-text">
              By accessing or using this website, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please discontinue using our website.
            </p>
          </div>

          {/* Section 2 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              2. PURPOSE OF THE WEBSITE
            </h2>
            <p className="legal-text">This website is intended to:</p>
            <ul className="legal-list">
              <li>Showcase our jewellery collections and products.</li>
              <li>Display indicative live gold, silver, and bullion rates.</li>
              <li>Provide information about Unnati Jewellers and our services.</li>
              <li>Enable customers to submit enquiries.</li>
              <li>Allow customers to book showroom appointments.</li>
              <li>Allow visitors to subscribe to our newsletter.</li>
              <li>Facilitate communication through WhatsApp, telephone, and email.</li>
            </ul>
            <p className="legal-text">
              This website is provided for informational and promotional purposes only. No online purchase, payment, or reservation of products is completed through this website unless expressly stated otherwise.
            </p>
          </div>

          {/* Section 3 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              3. PRODUCT INFORMATION
            </h2>
            <p className="legal-text">
              We endeavour to ensure that the information published on this website is accurate and regularly updated. However:
            </p>
            <ul className="legal-list">
              <li>Product availability may change without prior notice.</li>
              <li>Product specifications, dimensions, and weights are approximate unless expressly stated.</li>
              <li>Product colours and appearance may vary depending on lighting, photography, craftsmanship, monitor settings, and natural characteristics of jewellery.</li>
              <li>Displayed prices, where applicable, may exclude making charges, GST, wastage, premiums, labour charges, or other applicable charges.</li>
              <li>Prices may change without prior notice.</li>
            </ul>
            <p className="legal-text">
              Nothing published on this website shall constitute a legally binding quotation, offer, or commitment to sell any product at a particular price.
            </p>
          </div>

          {/* Section 4 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              4. LIVE GOLD &amp; SILVER RATES
            </h2>
            <p className="legal-text">
              This website may display live or periodically updated gold, silver, bullion, or other precious metal rates for informational purposes only. Although reasonable efforts are made to ensure accuracy, Unnati Jewellers does not guarantee the accuracy, completeness, availability, or timeliness of the displayed rates.
            </p>
            <p className="legal-text">The displayed rates:</p>
            <ul className="legal-list">
              <li>Are indicative only.</li>
              <li>May be delayed due to market movements, internet connectivity, third-party API providers, technical issues, or other factors.</li>
              <li>May not include GST, making charges, wastage, labour charges, premiums, discounts, or other applicable costs.</li>
              <li>Shall not be considered a quotation, offer, commitment, or final buying or selling price.</li>
              <li>May differ from the rates available at our showroom at the time of the actual transaction.</li>
            </ul>
            <p className="legal-text">
              The final applicable rate for any transaction shall always be the rate determined by Unnati Jewellers at the time the transaction is confirmed at our showroom.
            </p>
            <p className="legal-text">
              Unnati Jewellers reserves the right to modify, suspend, discontinue, or correct displayed rates at any time without prior notice and shall not be liable for any loss, damage, or decision arising from reliance on such information.
            </p>
          </div>

          {/* Section 5 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              5. PRODUCT IMAGES
            </h2>
            <p className="legal-text">
              Product photographs are provided for illustrative purposes only.
            </p>
            <p className="legal-text">
              Actual products may differ slightly in colour, finish, texture, appearance, or detailing due to photography, lighting conditions, display settings, manufacturing variations, or natural characteristics of jewellery.
            </p>
          </div>

          {/* Section 6 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              6. APPOINTMENT BOOKING
            </h2>
            <p className="legal-text">
              Appointment requests submitted through this website are subject to availability.
            </p>
            <p className="legal-text">
              Submission of a request does not constitute confirmation.
            </p>
            <p className="legal-text">
              Appointments shall be confirmed only after communication from Unnati Jewellers through telephone, WhatsApp, email, or any other official communication channel.
            </p>
            <p className="legal-text">
              We reserve the right to reschedule, refuse, or cancel appointments where reasonably necessary.
            </p>
          </div>

          {/* Section 7 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              7. ENQUIRIES &amp; COMMUNICATION
            </h2>
            <p className="legal-text">Visitors may contact us through:</p>
            <ul className="legal-list">
              <li>Contact Us Form</li>
              <li>WhatsApp</li>
              <li>Telephone</li>
              <li>Email</li>
            </ul>
            <p className="legal-text">
              Users agree to provide accurate and truthful information while communicating with us.
            </p>
            <p className="legal-text">
              While we endeavour to respond promptly, we do not guarantee response times.
            </p>
          </div>

          {/* Section 8 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              8. NEWSLETTER SUBSCRIPTION
            </h2>
            <p className="legal-text">
              Users subscribing to our newsletter consent to receive promotional communications, product updates, announcements, and marketing information from Unnati Jewellers.
            </p>
            <p className="legal-text">
              Users may unsubscribe at any time using the unsubscribe link included in our emails or by contacting us directly.
            </p>
          </div>

          {/* Section 9 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              9. INTELLECTUAL PROPERTY &amp; CONTENT PROTECTION
            </h2>
            <p className="legal-text">
              Unless otherwise stated, all original content published on this website, including but not limited to product photographs, videos, descriptions, arrangement, logos, brand name "Unnati Jewellers", graphics, icons, design, layout, marketing materials, text, and digital assets is the exclusive intellectual property of Unnati Jewellers or is used with permission.
            </p>
            <p className="legal-text">
              Certain jewellery designs, styles, patterns, or product concepts displayed on this website may originate from manufacturers, designers, or suppliers and may not be the exclusive intellectual property of Unnati Jewellers. Nothing contained in these Terms shall be interpreted as claiming ownership over such third-party intellectual property.
            </p>
            <p className="legal-text">
              Without our prior written permission, no person, business, competitor, or other entity may copy, reproduce, download, store, distribute, publish, transmit, modify, or commercially exploit our original website content or product images. Unauthorised use of our original content may result in civil and/or criminal proceedings.
            </p>
          </div>

          {/* Section 10 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              10. PROHIBITED DATA COLLECTION &amp; AUTOMATED ACCESS
            </h2>
            <p className="legal-text">
              Users are strictly prohibited from using this website or its contents for commercial intelligence, competitor research, automated data collection, or unauthorised commercial purposes. Without our prior written consent, you may not scrape, crawl, harvest, extract, mirror, or systematically download website content, or use bots, crawlers, artificial intelligence systems, or scripts to collect or compile our catalogue or rates.
            </p>
          </div>

          {/* Section 11 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              11. THIRD-PARTY LINKS
            </h2>
            <p className="legal-text">
              This website may contain links to third-party websites, messaging platforms, or social media services. Unnati Jewellers neither controls nor endorses such third-party websites and shall not be responsible for their content, services, availability, security, or privacy practices.
            </p>
          </div>

          {/* Section 12 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              12. DISCLAIMER
            </h2>
            <p className="legal-text">
              The information, product descriptions, photographs, specifications, pricing, live rates, and other materials available on this website are provided solely for general informational purposes. Unnati Jewellers makes no representation or warranty, express or implied, regarding the accuracy, completeness, reliability, suitability, availability, or timeliness of any information published on this website. Your reliance upon any information contained on this website is entirely at your own risk.
            </p>
          </div>

          {/* Section 13 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              13. LIMITATION OF LIABILITY
            </h2>
            <p className="legal-text">
              To the fullest extent permitted by applicable law, Unnati Jewellers, its proprietor, employees, representatives, affiliates, technology partners, and service providers shall not be liable for any direct, indirect, incidental, consequential, financial, or punitive damages arising from or relating to your access or inability to access this website, errors in content, live rate delays, technical failures, or reliance upon any website materials.
            </p>
          </div>

          {/* Section 14 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              14. WEBSITE AVAILABILITY
            </h2>
            <p className="legal-text">
              While we endeavour to maintain uninterrupted availability of this website, we do not guarantee continuous or error-free access. We reserve the right to suspend, modify, update, restrict, or discontinue any feature, content, or service available on this website at any time without prior notice.
            </p>
          </div>

          {/* Section 15 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              15. PRIVACY
            </h2>
            <p className="legal-text">
              Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how your personal information is collected, used, stored, and protected.
            </p>
          </div>

          {/* Section 16 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              16. AMENDMENTS
            </h2>
            <p className="legal-text">
              Unnati Jewellers reserves the right to amend or update these Terms &amp; Conditions at any time without prior notice. Any revised version shall become effective immediately upon publication on this website.
            </p>
          </div>

          {/* Section 17 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              17. GOVERNING LAW &amp; JURISDICTION
            </h2>
            <p className="legal-text">
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or relating to these Terms or the website shall be subject to the exclusive jurisdiction of the competent courts located in Bhavnagar, Gujarat, India.
            </p>
          </div>

          {/* Section 18 */}
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-title-bar" />
              18. CONTACT US
            </h2>
            <p className="legal-text">
              If you have any questions regarding these Terms &amp; Conditions, please contact us:
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

export default TermsConditions;
