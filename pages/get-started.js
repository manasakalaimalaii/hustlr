import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// Helper to render headline with mixed fonts
function MixedHeadline({ text }) {
  return (
    <>
      {text.split("").map((char, i) =>
        char === "#" || char === "%" || char === "'" || char === "-" || char === "(" || char === ")" || char === "@" || char === "–" || char === "&" ? (
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

export default function GetStarted() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get user type from URL query parameter using Next.js router
    const type = router.query.type;
    if (type === 'student' || type === 'client') {
      setUserType(type);
    }
  }, [router.query.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Get Started - Hustlr</title>
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
              <MixedHeadline text="Get Early Access to Hustlr" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8"
            >
              <MixedHeadline text="The fastest, smartest way to hire or earn — coming soon." />
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-white/60 mb-8 sm:mb-12 px-4"
            >
              <MixedHeadline text="Over 3,000 people have already signed up. Join the waitlist to get first access to India's top 5% of student freelancers — before everyone else." />
            </motion.p>

            {/* Email Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 sm:px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 sm:px-8 py-3 rounded-full bg-white text-black font-semibold text-base sm:text-lg shadow-lg hover:scale-105 hover:bg-black hover:text-white border border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Joining...' : 'Join Waitlist'}
                    </button>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setUserType('student')}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        userType === 'student'
                          ? 'bg-white text-black'
                          : 'bg-transparent text-white border border-white/30'
                      }`}
                    >
                      <MixedHeadline text="I'm a Student" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('client')}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        userType === 'client'
                          ? 'bg-white text-black'
                          : 'bg-transparent text-white border border-white/30'
                      }`}
                    >
                      <MixedHeadline text="I'm a Client" />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: "'The Seasons', serif" }}>
                    <MixedHeadline text="You are on the List" />
                  </h3>
                  <p className="text-white/80 mb-6">
                    <MixedHeadline text="Thanks for joining the waitlist. We'll be in touch soon with your early access details." />
                  </p>
                  <p className="text-sm text-white/60">
                    <MixedHeadline text="Keep an eye on your inbox for updates." />
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
} 