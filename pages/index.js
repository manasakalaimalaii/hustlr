import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// Helper to render headline with mixed fonts
function MixedHeadline({ text }) {
  return (
    <>
      {text.split("").map((char, i) =>
        char === "#" || char === "%" || char === "'" ? (
          <span key={i} className="font-ovo" style={{ fontFamily: "'Ovo', serif" }}>
            {char}
          </span>
        ) : (
          <span key={i}>{char}</span>
        )
      )}
    </>
  );
}

// Typewriter effect for two parts (before and after line break)
function useSplitTypewriter(fullText, breakAfter, speed = 90) {
  const [typed, setTyped] = useState(["", ""]);
  useEffect(() => {
    setTyped(["", ""]);
    let i = 0;
    let j = 0;
    let part = 0;
    const before = fullText.slice(0, breakAfter);
    const after = fullText.slice(breakAfter);
    const interval = setInterval(() => {
      if (part === 0) {
        setTyped(([prev]) => [before.slice(0, i + 1), ""]);
        i++;
        if (i === before.length) part = 1;
      } else if (part === 1) {
        setTyped(([prev0]) => [prev0, after.slice(0, j + 1)]);
        j++;
        if (j === after.length) clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [fullText, breakAfter, speed]);
  return typed;
}

const heroHeadline = "Hire The Top 5% of India's Student Talent";
const breakAfter = heroHeadline.indexOf("5%") + "5%".length;

const heroSubtitle =
  "Hustlr is the fastest, easiest way to hire pre-vetted Gen Z students for design, content, tech, and research gigs — in hours, not weeks. Swipe right, get matched.";

const clientBenefits = [
  "Top 5% Talent Only – We vet every student so you don't have to.",
  "Swipe to Hire – Simplified, quick hiring.",
  "Find Future Employees – Discover students you may want to recruit full-time.",
  "Replacement Guarantee – If it's not right, we fix it.",
];

const studentBenefits = [
  "Easy job discovery — Swipe, match, and start fast.",
  "Work with real clients — No fake gigs, ever.",
  "Gain real world experience — Build a strong portfolio.",
  "Get paid fast & fair — Escrow-protected payouts.",
];

function splitBenefit(benefit) {
  const match = benefit.match(/(.+?)[\u2013\u2014-]+(.+)/);
  if (match) {
    return {
      main: match[1].trim(),
      info: match[2].trim(),
    };
  }
  return { main: benefit, info: "" };
}

const clientSteps = [
  "Join and get verified — Upload ID and business documents for a trusted ecosystem.",
  "Post your gig — Set your scope, timeline, and budget.",
  "Swipe and shortlist — Discover top 5% student talent instantly.",
  "Chat and hire — Connect, brief, and fund via escrow.",
  "Approve and pay — Release payment after delivery, with replacement guarantee.",
  "Trust built-in every step of the way. Verified clients only. Quality guaranteed or we replace."
];

const studentSteps = [
  "Apply to Hustlr — Share resume and personal details.",
  "Get shortlisted — Skill test, portfolio check, and test project.",
  "Clear AI interview — Prove you're top 5% material.",
  "Swipe to find gigs — Discover paid, real-world projects.",
  "Deliver and earn — Submit, get rated, and paid via escrow.",
  "Top 5% only: Real gigs, verified clients, fast payments"
];

// Mobile menu component
function MobileMenu({ isOpen, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg z-50 p-6"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <nav className="flex flex-col gap-6 mt-12">
        <a
          href="/"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          style={{ fontFamily: "'The Seasons', serif" }}
          onClick={onClose}
        >
          home
        </a>
        <a
          href="/top5"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          style={{ fontFamily: "'The Seasons', serif" }}
          onClick={onClose}
        >
          top 5<span style={{ fontFamily: "'Ovo', serif" }}>%</span>
        </a>
        <a
          href="/get-started"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          style={{ fontFamily: "'The Seasons', serif" }}
          onClick={onClose}
        >
          get started
        </a>
      </nav>
    </motion.div>
  );
}

export default function Home() {
  // Typewriter for two parts
  const [typedBefore, typedAfter] = useSplitTypewriter(heroHeadline, breakAfter, 90);

  // Scroll logic
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Parallax Logic ---
  const heroTextStartFade = 100; // When hero text starts fading
  const heroTextEndFade = 400;   // When hero text is gone

  const imgStartScroll = 100;    // When images start appearing
  const imgCenterScroll = 400;   // When images are centered and fully visible
  const imgEndScroll = 800;     // When images are gone

  // Calculate scroll progress for different phases
  const heroFadeProgress = Math.max(0, Math.min(1, (scrollY - heroTextStartFade) / (heroTextEndFade - heroTextStartFade)));
  const imgMoveProgress = Math.max(0, Math.min(1, (scrollY - imgStartScroll) / (imgEndScroll - imgStartScroll)));
  const imgScaleProgress = Math.max(0, Math.min(1, (scrollY - imgStartScroll) / (imgCenterScroll - imgStartScroll)));
  const imgFadeProgress = Math.max(0, Math.min(1, (scrollY - imgCenterScroll) / (imgEndScroll - imgCenterScroll)));

  // Hero Text Transformation (stays put then moves up and fades)
  const heroTranslateY = heroFadeProgress * -50;
  const heroOpacity = 1 - heroFadeProgress;

  // Images Transformation (move up, scale, fade)
  const imgTranslateY = 120 - imgMoveProgress * 160; // Start at 120vh, end at -40vh
  const imgScale = 0.5 + imgScaleProgress * 0.4;
  const imgOpacity = Math.min(imgScaleProgress, 1 - imgFadeProgress);

  // Background color transition
  const bgColorProgress = Math.max(0, Math.min(1, (scrollY - imgStartScroll) / (imgCenterScroll - imgStartScroll)));
  const bgFadeOutProgress = Math.max(0, Math.min(1, (scrollY - imgCenterScroll) / (imgEndScroll - imgCenterScroll)));
  const bgColor = `rgb(${Math.round(bgColorProgress * 30 - bgFadeOutProgress * 30)}, ${Math.round(bgColorProgress * 30 - bgFadeOutProgress * 30)}, ${Math.round(bgColorProgress * 30 - bgFadeOutProgress * 30)})`;

  // "What Hustlr Offers" section fades in after images are mostly gone
  const offersOpacity = Math.min(Math.max((scrollY - imgEndScroll + 200) / 200, 0), 1);

  // Tabs
  const [tab, setTab] = useState("clients");
  const benefits = tab === "clients" ? clientBenefits : studentBenefits;

  // Show cursor if still typing
  const isTyping = (typedBefore.length + typedAfter.length) < heroHeadline.length;

  const [activeStep, setActiveStep] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Hustlr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main 
        className="relative min-h-[200vh] w-full font-body overflow-x-hidden" 
        style={{ 
          backgroundColor: bgColor,
          transition: 'background-color 0.1s linear'
        }}
      >
        {/* HEADER BAR */}
        <header className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-transparent">
          <a href="/" className="font-logo text-xl sm:text-2xl tracking-tight text-white" style={{ fontFamily: "'The Seasons', serif" }}>
            hustlr
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <a
              href="/"
              className="text-white/90 hover:text-white transition text-lg font-normal"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              home
            </a>
            <a
              href="/top5"
              className="text-white/90 hover:text-white transition text-lg font-normal"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              top 5<span style={{ fontFamily: "'Ovo', serif" }}>%</span>
            </a>
            <a
              href="/get-started"
              className="text-white/90 hover:text-white transition text-lg font-normal"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              get started
            </a>
          </nav>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        {/* HERO SECTION CONTAINER */}
        <section
          className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24"
        >
          {/* Left side content */}
          <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left max-w-2xl">
            <h1
              className="font-logo text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight font-normal"
              style={{
                fontFamily: "'The Seasons', serif",
                color: "#fff",
                textShadow: "0 2px 32px #fff2, 0 0px 0px #fff",
                letterSpacing: "-1px",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              <MixedHeadline text={typedBefore} />
              {typedBefore.length === breakAfter && <br />}
              <MixedHeadline text={typedAfter} />
              {isTyping && (
                <span className="inline-block w-2 h-7 align-middle bg-white ml-1 animate-pulse" />
              )}
            </h1>
            <p
              className="font-body text-base sm:text-lg md:text-xl text-white/90 mt-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {heroSubtitle}
            </p>
            <div className="flex flex-col items-center sm:items-start mt-8">
              <a href="/get-started" className="px-6 sm:px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:scale-105 hover:bg-black hover:text-white border border-white transition-all duration-300">
                Hire Now
              </a>
              <p className="text-sm sm:text-base md:text-xl text-white/60 mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                3000+ students on the waitlist
              </p>
            </div>
          </div>

          {/* Right side 3D images */}
          <div className="relative w-[45%] h-[80vh] hidden lg:block">
            <div 
              className="absolute top-[10%] right-[10%] w-[240px] h-[480px] transform perspective-1000 animate-fadeInTop"
            >
              <img
                src="/images/client.png"
                alt="Client UI"
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                style={{
                  transform: 'rotateY(-20deg) rotateX(5deg) translateZ(100px)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
                onError={(e) => {
                  console.error('Error loading client image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div 
              className="absolute top-[25%] right-[65%] w-[240px] h-[480px] transform perspective-1000 animate-fadeInBottom"
            >
              <img
                src="/images/freelancer.png"
                alt="Freelancer UI"
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                style={{
                  transform: 'rotateY(20deg) rotateX(5deg) translateZ(100px)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
                onError={(e) => {
                  console.error('Error loading freelancer image:', e);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </section>

        {/* WHAT HUSTLR OFFERS (Appears after parallax) */}
        <section
          className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4 transition-opacity duration-500"
           style={{
            opacity: offersOpacity,
            pointerEvents: offersOpacity < 0.1 ? "none" : "auto",
            marginTop: "20vh" /* Push this section down initially */
          }}
        >
          <h2
            className="font-logo text-xl sm:text-2xl md:text-4xl font-normal mb-8 sm:mb-16 text-white"
            style={{ fontFamily: "'The Seasons', serif" }}
          >
            What Hustlr Offers
          </h2>
          {/* Tabs */}
          <div className="flex justify-center mb-8 gap-4 sm:gap-16">
            <button
              className={`px-4 sm:px-8 py-2 rounded-t-lg font-semibold transition-all duration-300 text-base sm:text-lg md:text-xl ${
                tab === "clients"
                  ? "bg-white text-black shadow"
                  : "bg-transparent text-white border-b-2 border-transparent hover:border-white"
              }`}
              onClick={() => setTab("clients")}
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              For Clients
            </button>
            <button
              className={`px-4 sm:px-8 py-2 rounded-t-lg font-semibold transition-all duration-300 text-base sm:text-lg md:text-xl ${
                tab === "students"
                  ? "bg-white text-black shadow"
                  : "bg-transparent text-white border-b-2 border-transparent hover:border-white"
              }`}
              onClick={() => setTab("students")}
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              For Students
            </button>
          </div>
          {/* Benefits */}
          <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
            {benefits.map((benefit, i) => {
              const { main, info } = splitBenefit(benefit);
              return (
                <div
                  key={benefit}
                  className="group relative flex flex-col items-center justify-center w-[280px] h-[280px] bg-black text-white rounded-2xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-white/10"
                  style={{
                    opacity: offersOpacity, /* Fade with the section */
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>
                  <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center transition-all duration-300 z-10">
                    <span
                      className="font-ovo text-lg sm:text-xl font-normal break-words transition-all duration-300 group-hover:text-black"
                      style={{ fontFamily: "'Ovo', serif" }}
                    >
                      {main}
                    </span>
                    <span
                      className="opacity-0 group-hover:opacity-100 mt-4 text-base font-ovo font-normal text-black transition-all duration-300 break-words"
                      style={{ fontFamily: "'Ovo', serif" }}
                    >
                      {info}
                    </span>
                  </div>
                  {/* Shadow/enlarge on hover */}
                  <style jsx>{`
                    .group:hover,
                    .group:focus {
                      box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 #fff2;
                      transform: scale(1.05);
                    }
                  `}</style>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW HUSTLR WORKS section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 mt-32">
          <h2
            className="font-logo text-2xl sm:text-4xl font-normal mb-16 text-white"
            style={{ fontFamily: "'The Seasons', serif" }}
          >
            How Hustlr Works
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-16 gap-16">
            <button
              className={`px-8 py-2 rounded-t-lg font-semibold transition-all duration-300 text-lg sm:text-1xl ${
                tab === "clients"
                  ? "bg-white text-black shadow"
                  : "bg-transparent text-white border-b-2 border-transparent hover:border-white"
              }`}
              onClick={() => {
                setTab("clients");
                setActiveStep(0);
              }}
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              For Clients
            </button>
            <button
              className={`px-8 py-2 rounded-t-lg font-semibold transition-all duration-300 text-lg sm:text-1xl ${
                tab === "students"
                  ? "bg-white text-black shadow"
                  : "bg-transparent text-white border-b-2 border-transparent hover:border-white"
              }`}
              onClick={() => {
                setTab("students");
                setActiveStep(0);
              }}
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              For Students
            </button>
          </div>

          {/* Timeline */}
          <div className="w-full max-w-6xl mx-auto">
            {/* Timeline dots and lines */}
            <div className="flex flex-wrap justify-center items-center mb-8 sm:mb-16 px-4 gap-2 sm:gap-0">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-base sm:text-lg transition-all duration-300 ${
                      index <= activeStep
                        ? "bg-white text-black"
                        : "bg-white/20 text-white/50"
                    }`}
                  >
                    {index + 1}
                  </button>
                  {index < 4 && (
                    <div 
                      className={`h-1 w-16 sm:w-32 transition-all duration-300 ${
                        index < activeStep ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="relative h-48 sm:h-64">
              {(tab === "clients" ? clientSteps : studentSteps).map((step, index) => {
                if (index === 5) return null; // Skip trust message for now
                
                return (
                  <div
                    key={step}
                    className={`absolute w-full transition-all duration-500 ${
                      index === activeStep
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className="flex flex-col items-center px-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-normal mb-2 sm:mb-4 text-center" style={{ fontFamily: "'The Seasons', serif" }}>
                        {step.split(" — ")[0]}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl text-center">
                        {step.split(" — ")[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust message */}
            <div className="font-ovo mt-4 sm:mt-8 text-base sm:text-lg md:text-2xl text-white/90 text-center px-4" style={{ fontFamily: "'Ovo', serif" }}>
              {tab === "clients" ? clientSteps[5] : studentSteps[5]}
            </div>
          </div>
        </section>

        {/* VISION STATEMENT section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-32">
          <h2 
            className="text-3xl sm:text-4xl font-normal mb-24 text-white"
            style={{ fontFamily: "'The Seasons', serif" }}
          >
            Hustlr<span style={{ fontFamily: "'Poppins', sans-serif" }}>'</span>s Promise
          </h2>
          <div 
            className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-3xl p-12 sm:p-16 shadow-2xl"
            style={{
              boxShadow: "0 0 50px rgba(255,255,255,0.1), 0 0 100px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}
          >
            <h3 
              className="text-2xl sm:text-4xl md:text-3xl font-normal mb-8 text-white"
              style={{ 
                fontFamily: "'The Seasons', serif",
                lineHeight: "1.6"
              }}
            >
              To redefine the standard for hiring top college talent — with speed, trust, and zero compromises
            </h3>

            <p 
              className="text-xl sm:text-1xl text-white/80 mb-6 leading-relaxed"
              style={{ fontFamily: "'Ovo', serif",
                lineHeight: "1.6"
              }}
            >
              At Hustlr, we're building the first freelance platform that truly cares for both sides — where trust isn't a feature, it's a commitment.
            </p>

            {/* <div className="space-y-8 mb-12">
              <div>
                <h4 
                  className="text-xl sm:text-2xl font-normal mb-3 text-white"
                  style={{ fontFamily: "'The Seasons', serif" }}
                >
                  For students
                </h4>
                <p 
                  className="text-lg text-white/80"
                  style={{ fontFamily: "'Ovo', serif" }}
                >
                  It's real work, real growth, and real money.
                </p>
              </div>
              <div>
                <h4 
                  className="text-xl sm:text-2xl font-normal mb-3 text-white"
                  style={{ fontFamily: "'The Seasons', serif" }}
                >
                  For clients
                </h4>
                <p 
                  className="text-lg text-white/80"
                  style={{ fontFamily: "'Ovo', serif" }}
                >
                  It's the smartest way to hire the brightest minds — pre-vetted, fast, and risk-free.
                </p>
              </div> */}
            {/* </div> */}

            <div className="space-y-4">
              <p 
                className="text-2xl sm:text-2xl text-white font-normal"
                style={{ fontFamily: "'The Seasons', serif" }}
              >
                This is the new future of freelancing.
                <br />
                <span className="mt-4 block">Powered by Gen Z. Protected by Hustlr.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16 sm:py-32 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4 sm:mb-8 text-white"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              <MixedHeadline text="Join the Waitlist" />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            >
              <MixedHeadline text="Be among the first to experience the future of student freelancing. Limited spots available." />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <a href="/get-started?type=student" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg shadow-lg hover:scale-105 hover:bg-black hover:text-white border border-white transition-all duration-300">
                Join as a Student
              </a>
              <a href="/get-started?type=client" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent text-white font-semibold text-base sm:text-lg shadow-lg hover:scale-105 hover:bg-white hover:text-black border border-white transition-all duration-300">
                Join as a Client
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}