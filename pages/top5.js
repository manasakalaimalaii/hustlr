import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

// Helper to render headline with mixed fonts
function MixedHeadline({ text }) {
  return (
    <>
      {text.split("").map((char, i) =>
        char === "#" || char === "%" || char === "'" || char === "-" || char === "(" || char === ")" || char === "&" ? (
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

// Counter component with animation
function Counter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count === 4 ? (
        <span className="font-ovo" style={{ fontFamily: "'Ovo', serif" }}>4</span>
      ) : (
        count
      )}
    </span>
  );
}

// Stage component for the vetting process
function Stage({ number, title, description, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
    >
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
          {number}
        </div>
        <div>
          <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: "'The Seasons', serif" }}>
            <MixedHeadline text={title} />
          </h3>
          <p className="text-white/80 mb-6">
            <MixedHeadline text={description} />
          </p>
          {items && (
            <ul className="list-disc pl-6">
              {items.map((item, index) => (
                <li key={index} className="text-white/80">
                  <MixedHeadline text={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Top5() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Top 5% - Hustlr</title>
      </Head>

      <main className="min-h-screen bg-black text-white">
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

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              Only the Top <Counter end={5} /><span style={{ fontFamily: "'Ovo', serif" }}>%</span> Make It In
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8"
            >
              <MixedHeadline text="Because clients deserve excellence — and students deserve to rise to it." />
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto px-4"
            >
              <MixedHeadline text="At Hustlr, we believe freelancing isn't just about doing work — it's about doing it with grit, creativity, and ownership. That's why only the top 5% of applicants ever make it onto the platform." />
            </motion.p>
          </div>
        </section>

        {/* Vetting Process Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal mb-8 sm:mb-16 text-center"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              The 5<span style={{ fontFamily: "'Ovo', serif" }}>-</span>Stage Vetting Process
            </motion.h2>
            <p className="text-lg sm:text-xl text-white/80 text-center mb-8 sm:mb-16 max-w-3xl mx-auto px-4">
              <MixedHeadline text="Each student goes through a rigorous, multi-step screening inspired by the world's top talent networks — to ensure every project on Hustlr gets done right." />
            </p>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                {
                  number: 1,
                  title: "Language, Personality & Profile Review",
                  description: "We screen for clarity, credibility, and character.",
                  items: [
                    "College & CGPA",
                    "Work experience",
                    "Technical skills",
                    "Communication style",
                    "Overall professionalism"
                  ]
                },
                {
                  number: 2,
                  title: "Portfolio & Skill Assessment",
                  description: "Past work speaks volumes. Students submit a project demo, plus complete a skill-specific challenge. We assess:",
                  items: [
                    "Problem-solving approach",
                    "Depth of understanding",
                    "Craftsmanship & design rationale"
                  ]
                },
                {
                  number: 3,
                  title: "The Test Project (1–3 Weeks)",
                  description: "Real work. Real pressure. Real results. We assign a hands-on, realistic task that tests:",
                  items: [
                    "Attention to detail",
                    "Time & project management",
                    "Execution quality under deadline"
                  ]
                },
                {
                  number: 4,
                  title: "Conversational AI Live Screening",
                  description: "Not just smart — sharp on the spot. An AI-driven live session tests:",
                  items: [
                    "Their test project knowledge",
                    "Communication clarity",
                    "Adaptability & creativity",
                    "Deeper thinking and professionalism"
                  ]
                },
                {
                  number: 5,
                  title: "Final Approval",
                  description: "Only the top 5% who pass all previous stages are onboarded to Hustlr. And we don't stop there — regular quality audits ensure our standards stay sky-high."
                }
              ].map((stage, index) => (
                <Stage
                  key={index}
                  number={stage.number}
                  title={stage.title}
                  description={stage.description}
                  items={stage.items}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 sm:mb-8"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              <MixedHeadline text="Hustlr's Vision" />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8"
            >
              <MixedHeadline text="To redefine the standard for hiring top college talent — with speed, trust, and zero compromises." />
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-white/60"
            >
              <MixedHeadline text="We're building the first platform that truly cares for both students and clients. Because when we protect the hustle — everyone wins." />
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 sm:mb-8"
              style={{ fontFamily: "'The Seasons', serif" }}
            >
              <MixedHeadline text="Ready to Hire or Hustle?" />
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-8 sm:mb-12"
            >
              <p className="text-lg sm:text-xl text-white/80">
                <MixedHeadline text="For clients: Hire Gen Z's top 5% — fast, verified, and guaranteed." />
              </p>
              <p className="text-lg sm:text-xl text-white/80">
                <MixedHeadline text="For students: Earn, grow, and build your future. No noise. No scams. Just real work." />
              </p>
            </motion.div>
            <motion.a
              href="/get-started"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg shadow-lg hover:scale-105 hover:bg-black hover:text-white border border-white transition-all duration-300"
            >
              Get Started with Hustlr
            </motion.a>
          </div>
        </section>
      </main>
    </>
  );
} 