import { motion } from 'framer-motion';
import styled from 'styled-components';

const Hero = styled.section`
  min-height: 90vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-heading);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
`;

const Headline = styled(motion.h1)`
  font-size: 3rem;
  font-family: var(--font-heading);
  margin-bottom: 1rem;
  letter-spacing: -1px;
`;

const Subheadline = styled(motion.h2)`
  font-size: 1.5rem;
  font-family: var(--font-subheading);
  font-weight: 400;
  margin-bottom: 2.5rem;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CTAButton = styled(motion.button)`
  background: #fff;
  color: #000;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2.5rem;
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

export default function HeroSection() {
  return (
    <Hero>
      <Headline
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        India's #1 Platform to Hire Vetted Student Talent.
      </Headline>
      <Subheadline
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Only the top 5% make it. You get the best — fast, affordable, guaranteed.
      </Subheadline>
      <CTAGroup>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          as="a"
          href="/get-started?type=client"
        >
          Hire a Hustlr
        </CTAButton>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{ background: "#000", color: "#fff", border: "1px solid #fff" }}
          as="a"
          href="/get-started?type=student"
        >
          Apply as a Hustlr
        </CTAButton>
      </CTAGroup>
    </Hero>
  );
} 