"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import FadeInSection from "@/components/FadeIn";
import { FaLeaf, FaExchangeAlt, FaPaintBrush, FaHeart } from "react-icons/fa";
import { TbNeedleThread, TbSparkles } from "react-icons/tb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaThreads } from "react-icons/fa6";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <Header />
      <section
        className="relative min-h-screen w-full bg-cover bg-center text-primary mt-[100px] px-6 lg:px-20 py-16"
        style={{ backgroundImage: "url('/about/aboutbg.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative flex flex-col lg:flex-row md:mt-5 text-center items-center justify-between w-full gap-12 z-10 -w-7xl mx-auto mt-20">
          {/* Left */}
          <div className="flex-1 space-y-6 mt-10">
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl md:mt-5 font-bold tracking-tight text-white mt-10">
                Passion Meets Purpose
              </h2>
              <p className="text-lg lg:text-xl text-white/80 max-w-md mx-auto">
                At RATNAWAD, every drape tells a story — a story woven with
                passion, rooted in purpose. What began as a love for timeless
                textiles has grown into a commitment to celebrate India’s rich
                heritage through sarees that feel both soulful and modern. We
                don’t just design fabrics — we preserve traditions, embrace
                elegance, and create pieces that resonate with the women who
                wear them.
              </p>
            </FadeInSection>
          </div>

          {/* Center Image */}
          <FadeInSection>
            <Image
              src="/about/founder.png"
              alt="Portrait of Mrs. Dharmnishtha Singh Thakur"
              width={350}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </FadeInSection>

          {/* Right */}
          <div className="flex-1 space-y-6">
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Meet the Founder
              </h2>
              <h3 className="text-xl lg:text-2xl text-white font-bold">
                Mrs. Dharmnishtha Singh Thakur
              </h3>
              <p className="text-base lg:text-lg font-bold text-white/80 leading-relaxed max-w-md mx-auto">
                Born and raised amidst the regal essence of Rajputi culture,
                Mrs. Dharmnishtha Singh Thakur grew up wrapped in the quiet
                grace of chiffons. She understood its elegance to the core — its
                softness, its flow, its understated charm. But beyond her own
                world, she noticed chiffon often went unrecognized, overlooked
                among louder fabrics and modern trends.
                <br />
                Driven by a desire to give chiffon its rightful place in
                contemporary fashion, she envisioned a brand where this fabric
                could shine — not just as a cultural heirloom, but as a
                statement of quiet luxury. Her creative spirit and deep-rooted
                love for ethnic fashion inspired her to build Adira — a space
                where heritage meets modern minimalism, and where every saree
                speaks softly, yet powerfully. What keeps her going, even today,
                is the smile that lights up on a woman’s face when she sees
                herself draped in RATNAWAD — when she pauses, admires her own
                reflection, and feels something shift. That quiet moment of
                confidence, pride, and self-love is the true heartbeat of the
                brand.
              </p>
              <div className="italic font-semibold text-md text-light mt-2">
                "Tradition is not the worship of ashes, but the preservation of
                fire."
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-6 lg:px-20"
        style={{
          backgroundImage: `url('/about/about.png')`, // Replace with your own image path
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <FadeInSection>
          <div className="relative z-10 max-w-6xl mx-auto text-center text-white space-y-20">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              What Drives Us at RATNAWAD
            </h2>

            {/* Mission/Vision/Values Cards */}
            {[
              {
                title: "Our Essence – The Mission",
                desc: "At RATNAWAD, our mission is simple yet soulful — to preserve the timeless grace of Indian textiles, especially chiffons, and present them through a lens of modern elegance. We’re here to make heritage wearable, not just for occasions, but for everyday moments of grace. By working closely with skilled local artisans, we ensure that every saree is not only a reflection of tradition, but also a means of preserving livelihoods and craftsmanship passed down through generations.",
              },
              {
                title: "Our Horizon – The Vision",
                desc: "We envision a world where heritage is not confined to ceremonies, but celebrated in everyday choices. RATNAWAD strives to become a global symbol of quiet luxury — where the softest fabrics, the subtlest designs, and the deepest cultural threads come together to dress a woman not just in beauty, but in meaning. As we grow, we remain deeply committed to empowering local artisans, bringing their work to the forefront, and creating a space where handmade meets high fashion with integrity.",
              },
              {
                title: "Our Soul – The Values",
                desc: "RATNAWAD is woven with values that define our every thread and thought. We believe in grace — in the way we design, drape, and express femininity. Authenticity guides our sourcing, storytelling, and craftsmanship, ensuring each piece carries truth and tradition. We hold deep respect for heritage, for the women who wear our sarees, and for the hands that create them. Our aesthetic is rooted in simplicity, allowing elegance to breathe without excess. We proudly extend our support to local artisans, preserving sustainable artistry with every creation. And above all, we remain committed to consistency — in quality, care, and the experience we offer to every RATNAWAD woman.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed text-white/80 max-w-3xl mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* What We Offer */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-muted mb-6">
                What We Bring to Your Wardrobe
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg max-w-5xl mx-auto text-left">
                {[
                  {
                    icon: <TbNeedleThread />,
                    text: "Heritage-Inspired Handcrafted Sarees",
                  },
                  { icon: <FaLeaf />, text: "Sustainably Made, Gently Styled" },
                  {
                    icon: <FaExchangeAlt />,
                    text: "Tradition Meets Contemporary Elegance",
                  },
                  {
                    icon: <FaPaintBrush />,
                    text: "Hand Embroidery Rooted in Legacy",
                  },
                  { icon: <FaHeart />, text: "Crafted with Intention & Care" },
                  {
                    icon: <TbSparkles />,
                    text: "Timeless Pieces with Quiet Luxury",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="group bg-light text-gray-800 shadow-md rounded-2xl p-6 flex items-center gap-4 border border-transparent hover:border-primary/50 hover:shadow-[0_0_10px_rgba(94,15,15,0.4)] transition duration-300"
                  >
                    <span className="text-[#5e0f0f] group-hover:scale-110 transition-transform text-2xl">
                      {item.icon}
                    </span>
                    <span className="font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center text-center px-6 lg:px-20"
        style={{ backgroundImage: "url('/about/showroom.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
        <div className="relative z-10 text-white space-y-6 max-w-4xl">
          <FadeInSection>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Our Journey Began Here
            </h2>
            <p className="text-lg font-semibold lg:text-xl text-white/90 leading-relaxed">
              In the early days of 2024, RATNAWAD was just a quiet dream — one
              stitched together with care, curiosity, and a lot of heart. We
              began by immersing ourselves in the world of fabrics,
              understanding their language, their origins, and their stories. We
              weren’t just choosing materials — we were choosing emotions,
              values, and a purpose to build around. Every decision — from our
              brand’s name to its colors, from the weaves we use to the vision
              we hold — was made with utmost thought and soul. We spent months
              defining our "why" — what RATNAWAD should stand for, what it must
              never compromise on, and how it could make women not just look
              beautiful, but feel truly seen. After months of research,
              designing, dreaming, and refining, RATNAWAD officially came to life
              in August 2024 — not as just a label, but as a heartfelt offering.
              From day one, it has been more than fabric — it’s about stories,
              slow fashion, and that spark of confidence a saree can bring when
              it’s worn with love.
            </p>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
