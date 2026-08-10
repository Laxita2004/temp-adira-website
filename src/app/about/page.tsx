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
              <p className="text-lg lg:text-xl text-white/80 max-w-md mx-auto">
                A saree can be beautiful. But we believe it can also carry a
                story. To many, a homemaker is someone who keeps the house
                running, remembers the little things, welcomes everyone with a
                smile and somehow keeps an entire family together. But there is
                a part of every woman that belongs only to herself — her dreams,
                her interests, the things that bring her joy. For Dharmnishtha
                Singh Thakur, that joy has always been found in sarees.
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
                In the softness of a flowing fabric, the beauty of an unusual
                design, the charm of intricate handwork and the excitement of
                discovering something you simply wouldn't find in an ordinary
                retail store. But over time, that fascination became something
                more. She began to see sarees not simply as clothes, but as
                pieces of art — carrying the hands, skill and stories of the
                people who created them. She wanted to build something of her
                own. Something beyond the role of being a homemaker. Something
                she could look towards with the same sense of purpose and
                fulfilment that she found in the things she loved. And that
                thought became the beginning of Ratnawad.
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
          backgroundImage: `url('/about/about.png')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <FadeInSection>
          <div className="relative z-10 max-w-6xl mx-auto text-center text-white space-y-20">
            <div className="y-5">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                What We Believe
              </h2>

              <div className="mt-8 space-y-0">
                <p className="text-lg lg:text-xl leading-relaxed text-white/80 max-w-3xl mx-auto">
                  Fashion, to us, is not about how much a label costs. It is
                  about knowing what you are bringing home.
                  <br />
                  <br />
                  We live in a world where clothes are produced faster than we
                  can wear them, trends change every few weeks and low prices
                  often come at a cost that isn't visible on the tag.
                  <br />
                  <br />
                  We believe it is time to slow down.
                  <br />
                  <br />
                  Slow fashion, for us, means creating fewer pieces with greater
                  thought. It means choosing fabrics that are made to last,
                  designs that aren't dependent on a trend cycle and
                  craftsmanship that deserves to be seen rather than replaced by
                  mass production.
                  <br />
                  <br />
                  Because a saree shouldn't be valuable simply because it
                  carries a fancy label or a high price tag. Its value lies in
                  the story behind it — who made it, how it was made, what it is
                  made from, whether the people behind it were fairly
                  compensated and whether it is something you will still want to
                  wear years from now.
                  <br />
                  <br />
                  We want to look at fashion as collecting rather than
                  consuming.
                  <br />
                  <br />
                  Pieces that you genuinely love. Pieces you wear again and
                  again. Pieces that gather memories with you and eventually
                  become something you can pass on.
                  <br />
                  <br />
                  For us, sustainability isn't just about using better
                  materials. It is also about changing the way we think about
                  what we buy, how often we buy it and how long we expect it to
                  stay with us.
                </p>
              </div>
            </div>

            <div>
              <div className="space-y-0">
                <h3 className="text-2xl lg:text-3xl font-bold text-muted">
                  What We Bring to Your Wardrobe
                </h3>

                <h5 className="text-muted">
                  Pieces made to be kept, not replaced.
                </h5>
              </div>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg max-w-5xl mx-auto text-left">
                {[
                  {
                    icon: <TbNeedleThread />,
                    title: "Heritage, Reimagined",
                    desc: "We draw from India's rich textile and artistic traditions, bringing them into sarees that feel relevant to the woman wearing them today.",
                  },
                  {
                    icon: <FaLeaf />,
                    title: "Craftsmanship Over Mass Production",
                    desc: "Our designs are brought to life through skilled hands and intricate techniques, giving each piece its own character and imperfections that make it human.",
                  },
                  {
                    icon: <FaExchangeAlt />,
                    title: "Thoughtful Materials",
                    desc: "We choose fabrics for how they feel, move and age — not simply because they are convenient to produce.",
                  },
                  {
                    icon: <FaPaintBrush />,
                    title: "Slow by Choice",
                    desc: "We don't create around every passing trend. We would rather take the time to create something you will genuinely want to wear years from now.",
                  },
                  {
                    icon: <FaHeart />,
                    title: "Fairness Behind the Beauty",
                    desc: "The beauty of a handcrafted piece should never come at the cost of the person who made it. We believe artisans deserve to be valued for their skill and compensated fairly for their work.",
                  },
                  {
                    icon: <TbSparkles />,
                    title: "Collect, Don't Consume",
                    desc: "We want your wardrobe to hold pieces you remember — the saree you wore to your sister's wedding, the one you danced in all night, the one your daughter eventually discovers in your wardrobe.",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="group bg-light text-gray-800 shadow-md rounded-2xl p-6 flex items-center gap-4 border border-transparent hover:border-primary/50 hover:shadow-[0_0_10px_rgba(94,15,15,0.4)] transition duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[#5e0f0f] group-hover:scale-110 transition-transform text-2xl">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-sm text-secondary mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-center text-muted max-w-3xl mx-auto leading-relaxed">
                Because perhaps the most beautiful thing a saree can become
                isn't something new.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-center px-6 lg:px-20"
        style={{ backgroundImage: "url('/about/showroom.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
        <div className="relative z-10 text-white space-y-6 max-w-4xl">
          <FadeInSection>
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Our Journey Began Here
              </h2>
              <p className="text-lg font-semibold lg:text-xl text-white/90 leading-relaxed">
                We started with very little, except the belief that we could
                build something meaningful.
                <br />
                <br />
                Our journey began as Adira.
                <br />
                <br />
                We entered the world of fashion as complete newcomers — with no
                big resources, no established connections and very little
                knowledge of what it actually takes to build a brand. We were
                learning everything as we went: fabrics, craftsmanship,
                designing, sourcing, production, customers and, most
                importantly, ourselves. The years since then have taught us more
                than we could have imagined. We learnt to understand our
                products beyond how they looked. We learnt what quality truly
                means to us, what details we refuse to compromise on and, most
                importantly, what we want every saree we create to feel like
                when it finally reaches you. That process made us look inward.
                <br />
                <br />
                And somewhere along the way, Adira evolved into RATNAWAD™.
                <br />
                <br />
                The name itself comes from our roots — a combination of our two
                ठिकाना, Ratwada and Sanawad. It felt like the right name for the
                brand we were becoming: one that is deeply connected to where we
                come from, while creating something that can travel far beyond
                it. Our logo is inspired by the Goolar tree, a tree deeply
                rooted in the Indian landscape and known for its strength,
                longevity and ability to flourish through generations.
                <br />
                <br />
                RATNAWAD™ today is not the brand we started with. It is the
                result of everything we have learnt, unlearnt, changed and
                refined along the way.
                <br />
                <br />
                And we are still learning.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
