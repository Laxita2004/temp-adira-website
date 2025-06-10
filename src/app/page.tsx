"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import Themes from "../components/Themes";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeIn";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <FadeInSection>
        <Collection />
      </FadeInSection>

      <FadeInSection>
        <Themes />
      </FadeInSection>

      <FadeInSection>
        <WhyUs />
      </FadeInSection>

      <FadeInSection>
        <Testimonials />
      </FadeInSection>

      <Footer />
    </>
  );
}
