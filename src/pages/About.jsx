import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiHeart,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiBookOpen,
} from "react-icons/fi";
import "../styles/About/AboutUs.css";

const AboutUs = () => {
  // Framer Motion Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 55 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="about-page">
      {/* 1. HERO BANNER SECTION (Full Viewport Height) */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-subtitle"
          >
            Established 1992 • Bhavnagar, Gujarat
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Unnati Jewellers
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-divider"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-tagline"
          >
            Where Trust Meets Growth
          </motion.p>
        </div>
      </section>

      {/* 2. THE FOUNDATION & ETHICS (Background: Cream #FEF8F6) */}
      <section className="about-section bg-cream section-padding" id="foundation">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="editorial-quote-block"
              >
                <span className="section-label">Our Foundation</span>
                <h2 className="editorial-title">
                  Never recommend a purchase that is not in our customer's best
                  interest.
                </h2>
                <div className="quote-separator"></div>
                <p className="editorial-lead">
                  For more than three decades, we have served families not
                  merely as jewellers, but as trusted advisors, value creators,
                  and long-term partners in some of life's most important
                  decisions.
                </p>
                <p className="editorial-text">
                  At Unnati Jewellers, we believe that business is built on
                  ethics. Trends change, markets fluctuate, and customer
                  expectations evolve, but integrity remains timeless. Our
                  experience has taught us a simple truth: When business is
                  conducted with ethics, growth follows naturally. This belief
                  has guided every customer interaction, every recommendation,
                  and every relationship we have built since 1992.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT UNNATI MEANS (Background: Deep Maroon #810B38) */}
      <section className="about-section bg-maroon text-white section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 pr-lg-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="section-label text-accent">
                  The Philosophy
                </span>
                <h2 className="section-heading text-white">
                  What "Unnati" Means
                </h2>
                <p className="section-desc text-cream-muted">
                  The word "Unnati" translates to growth, progress, and
                  prosperity. But to us, growth is never measured solely by
                  business balances or sale turnovers.
                </p>
                <p className="section-paragraph">
                  True growth occurs when our customers make informed decisions,
                  achieve their goals, strengthen their financial security, and
                  celebrate life's milestones with absolute confidence.
                </p>
                <p className="section-paragraph">
                  We sincerely wish growth for every individual and family that
                  places their trust in us. Because we believe that when our
                  customers grow, we grow with them.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="row g-4"
              >
                <div className="col-sm-6">
                  <motion.div variants={fadeInUp} className="feature-box-dark">
                    <FiTrendingUp className="feature-icon" />
                    <h4>True Growth</h4>
                    <p>
                      Calculated through customer prosperity, not just numbers.
                    </p>
                  </motion.div>
                </div>
                <div className="col-sm-6">
                  <motion.div variants={fadeInUp} className="feature-box-dark">
                    <FiHeart className="feature-icon" />
                    <h4>Celebrations</h4>
                    <p>
                      Adding confidence to your life's most meaningful moments.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR BELIEFS & VALUE CREATION (Background: White #FFFFFF) */}
      <section className="about-section bg-white section-padding">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="belief-card highlight-border"
              >
                <span className="section-label">Our Stance</span>
                <h3 className="belief-title">
                  Honest Guidance Over Transaction Value
                </h3>
                <p className="belief-text">
                  We believe that customers deserve honest guidance, transparent
                  advice, and complete clarity before making any purchase. We do
                  not believe in creating pressure, encouraging unnecessary
                  spending, or promoting purchases simply for appearances.
                </p>
                <p className="belief-text">
                  In fact, many of our most meaningful customer relationships
                  have been built through conversations where we advised
                  customers to stay within their budget and choose what was
                  genuinely right for them.
                </p>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="belief-card highlight-border"
              >
                <span className="section-label">Gold & Jewels</span>
                <h3 className="belief-title">More Than Jewellery</h3>
                <p className="belief-text">
                  We believe that gold is not just a precious metal. It is a
                  family's strongest supporter during difficult times, a trusted
                  store of value, and a symbol of financial security that can
                  serve generations.
                </p>
                <p className="belief-text">
                  We believe that jewellery is not just an ornament. It is a
                  reflection of personality, confidence, culture, celebration,
                  and self-expression. It represents memories, milestones,
                  achievements, and moments that become part of a family's
                  story.
                </p>
                <p className="belief-text">
                  That is why every purchase deserves careful thought, honest
                  advice, and complete transparency.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
      Our Journey
========================= */}
      <section className="timeline-section" id="journy">
        <div className="timeline-container">
          <header className="timeline-header">
            <p className="timeline-subtitle">OUR JOURNEY</p>
            <h2 className="timeline-title">Our Legacy</h2>
          </header>
          <div className="timeline-wrapper">
            {/* 1978 */}
            <div className="timeline-item right-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">1978</h3>
                <h4 className="timeline-event-title">Where It All Began</h4>
                <p className="timeline-description">
                  Our story began with silver bullion trading, built on the
                  enduring values of trust, integrity, and lasting
                  relationships.
                </p>
              </div>
            </div>

            {/* 1980 */}
            <div className="timeline-item left-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">1980</h3>
                <h4 className="timeline-event-title">
                  Expanding Our Foundation
                </h4>
                <p className="timeline-description">
                  With growing expertise, we broadened our journey into gold
                  bullion, strengthening our presence in the precious metals
                  industry.
                </p>
              </div>
            </div>

            {/* 1993 */}
            <div className="timeline-item right-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">1993</h3>
                <h4 className="timeline-event-title">
                  The Beginning of Our Jewellery Heritage
                </h4>
                <p className="timeline-description">
                  A defining milestone marked our transformation into a
                  jewellery house, with the introduction of our first silver
                  daily wear collection.
                </p>
              </div>
            </div>

            {/* 1996 */}
            <div className="timeline-item left-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">1996</h3>
                <h4 className="timeline-event-title">
                  Crafting Everyday Elegance
                </h4>
                <p className="timeline-description">
                  Our gold daily wear collection was unveiled, bringing together
                  exceptional craftsmanship, timeless design, and everyday
                  sophistication.
                </p>
              </div>
            </div>

            {/* 2002 */}
            <div className="timeline-item right-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">2002</h3>
                <h4 className="timeline-event-title">
                  Celebrating Life's Cherished Moments
                </h4>
                <p className="timeline-description">
                  Our silver bridal collection was introduced, becoming a
                  meaningful part of countless celebrations and family
                  traditions.
                </p>
              </div>
            </div>

            {/* 2010 */}
            <div className="timeline-item left-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">2010</h3>
                <h4 className="timeline-event-title">
                  A New Chapter in Bridal Excellence
                </h4>
                <p className="timeline-description">
                  The launch of our gold bridal collection reflected our
                  commitment to creating jewellery worthy of life's most
                  treasured occasions.
                </p>
              </div>
            </div>

            {/* 2018 */}
            <div className="timeline-item right-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">2018</h3>
                <h4 className="timeline-event-title">
                  A Complete Jewellery Destination
                </h4>
                <p className="timeline-description">
                  With an expanded portfolio and enhanced capabilities, we
                  evolved into a full-fledged jewellery destination, offering
                  thoughtfully curated collections in gold and silver.
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="timeline-item left-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">2025</h3>
                <h4 className="timeline-event-title">
                  A Landmark Transformation
                </h4>
                <p className="timeline-description">
                  The opening of our new luxury showroom marked a defining
                  chapter in our journey, offering an elevated experience where
                  elegance, craftsmanship, and trust come together.
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="timeline-item right-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-year">2026</h3>
                <h4 className="timeline-event-title">
                  Embracing the Digital Era
                </h4>
                <p className="timeline-description">
                  Our legacy extended beyond the showroom as we launched our
                  digital presence, making our collections and personalised
                  service accessible to customers everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUAL-BANNER DETAILS: EDUCATION & VALUE (Background: Grey/Beige #EFEEEB) */}
      <section className="about-section bg-grey section-padding">
        <div className="container">
          <div className="row align-items-center mb-xl-5 mb-lg-5 mb-md-2 mb-sm-1 mb-0 pb-4" id="protocol">
            <div className="col-md-6 order-md-2 mb-4 mb-md-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="editorial-image-frame"
              >
                <div className="luxury-placeholder-image text-center bg-cream flex-center">
                  <FiBookOpen className="decor-icon" />
                  <span>Education First</span>
                </div>
              </motion.div>
            </div>
            <div className="col-md-6 order-md-1 pr-md-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="section-label">Our Protocol</span>
                <h3 className="editorial-heading-small">
                  Education Before Transaction
                </h3>
                <p className="editorial-paragraph">
                  One of the principles that distinguishes Unnati Jewellers is
                  our commitment to customer education. We believe that informed
                  customers make better decisions.
                </p>
                <p className="editorial-paragraph">
                  Before making a purchase, customers deserve to understand
                  every aspect of it - purity, pricing, making charges, value,
                  exchange benefits, investment considerations, and long-term
                  implications.
                </p>
                <p className="editorial-paragraph font-italic">
                  Our goal is not simply to complete a transaction. Our goal is
                  to ensure that every customer leaves with confidence, clarity,
                  and peace of mind. We want our customers to leave happier and
                  more knowledgeable than when they entered.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="row align-items-center" id="mindset">
            <div className="col-md-6 mb-4 mb-md-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="editorial-image-frame"
              >
                <div className="luxury-placeholder-image text-center bg-cream flex-center">
                  <FiAward className="decor-icon" />
                  <span>Value Creators</span>
                </div>
              </motion.div>
            </div>
            <div className="col-md-6 pl-md-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="section-label">Our Mindset</span>
                <h3 className="editorial-heading-small">
                  Creating Value, Not Transactions
                </h3>
                <p className="editorial-paragraph">
                  We do not see ourselves as jewellery sellers. We see ourselves
                  as value creators. Every recommendation, every design, every
                  service, and every customer interaction is guided by one
                  question:
                </p>
                <div className="value-question-box">
                  "How can we create the maximum value for this customer?"
                </div>
                <p className="editorial-paragraph">
                  Sometimes that means helping a customer find the perfect
                  design. Sometimes it means guiding them toward a better
                  investment decision. Sometimes it means advising them not to
                  spend beyond their means. For us, value creation always comes
                  before transaction value.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMITMENT TO INNOVATION & SUVARNA UNNATI SCHEME (Background: White #FFFFFF) */}
      <section className="about-section bg-white section-padding">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="scheme-overview-card bg-cream"
              >
                <span className="section-label text-accent">
                  Evolving Standards
                </span>
                <h3 className="belief-title">Our Commitment to Innovation</h3>
                <p className="belief-text">
                  As a modern luxury jeweller, we continuously evolve with
                  changing customer expectations, new technologies, and emerging
                  design trends. We take pride in offering contemporary
                  jewellery collections while preserving the values that have
                  defined our business for decades.
                </p>
                <p className="belief-text">
                  From trending designs to highly customized creations, we
                  welcome challenges that allow us to bring our customers'
                  visions to life. No matter how unique or demanding a
                  requirement may be, we approach it with dedication,
                  craftsmanship, and a determination to deliver excellence.
                  Because we never like to see our customers leave disappointed.
                </p>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="scheme-overview-card bg-cream"
              >
                <span className="section-label text-accent">
                  The Suvarna Program
                </span>
                <h3 className="belief-title text-primary">
                  Suvarna Unnati Scheme
                </h3>
                <p className="belief-text">
                  For many years, families trusted us to help them acquire
                  jewellery through flexible and comfortable payment
                  arrangements built on mutual trust and long-term
                  relationships. As times changed and customer needs evolved,
                  this philosophy was transformed into the Suvarna Unnati
                  Scheme.
                </p>
                <p className="belief-text">
                  The scheme represents our ongoing commitment to helping
                  customers plan their jewellery purchases responsibly while
                  enjoying meaningful benefits. Although the structure has
                  evolved, the objective remains unchanged: making jewellery
                  ownership more accessible, convenient, and rewarding for our
                  customers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GENERATIONS OF TRUST & QUALITY (Background: Deep Maroon #810B38) */}
      <section className="about-section bg-maroon text-white section-padding">
        <div className="container">
          <div className="row align-items-center text-center justify-content-center">
            <div className="col-lg-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <FiUsers className="trust-icon-center" />
                <span className="section-label text-accent">Our Legacy</span>
                <h2 className="editorial-title text-white">
                  Generations of Trust
                </h2>
                <div className="quote-separator bg-accent"></div>
                <p className="editorial-text-1">
                  One of our greatest achievements is not the jewellery we have
                  sold, but the relationships we have built.
                </p>
                <p className="editorial-text-1">
                  Today, many families who first visited us decades ago continue
                  to trust us through their children and grandchildren. Being a
                  part of multiple generations of the same family's journey is a
                  privilege we deeply value and never take for granted. These
                  relationships remind us that trust is earned slowly, protected
                  carefully, and passed forward through consistent actions over
                  time.
                </p>
                <div className="quality-assurance-bar bg-white text-dark mt-5">
                  <FiShield className="shield-icon" />
                  <span>
                    <strong>Quality Without Compromise:</strong> Every jewellery
                    piece offered by Unnati Jewellers is BIS Hallmarked,
                    ensuring authenticity, purity, and absolute confidence.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUR PROMISE (Background: Cream #FEF8F6) */}
      <section className="about-section bg-cream section-padding text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="promise-box"
              >
                <span className="section-label">Our Pledge</span>
                <h2 className="promise-title">The Unnati Promise</h2>
                <p className="promise-text">
                  At Unnati Jewellers, success is not measured by the size of a
                  transaction. Success is measured by the confidence a customer
                  feels after making the right decision. It is measured by
                  relationships that last decades. It is measured by trust that
                  extends across generations. And it is measured by the growth,
                  prosperity, and happiness of the families we proudly serve.
                </p>
                <div className="promise-signature mt-4">
                  <span className="sig-text">
                    That is the meaning of Unnati.
                  </span>
                  <span className="sig-text font-serif italic text-accent">
                    That is our purpose. And that is our promise.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
