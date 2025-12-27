'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './ui/tabs';
import ContactForm from './ContactForm';
import { MeetTheTeamSection } from './about/MeetTheTeamSection';
import { Reveal } from './animations/Reveal';
import birdsImage from '../assets/birds.png';

export function AboutPageContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="min-h-screen bg-white dark:bg-zinc-950"
    >
      <Tabs defaultTab="about">
        {/* Minimal tab navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 sm:pt-32 md:pt-40 pb-12">
            <TabList className="!border-b !border-zinc-200 dark:!border-zinc-800 !mb-0">
              <Tab 
                value="about" 
                className="!px-0 !py-3 !mr-12 !text-sm !font-normal !tracking-normal !border-b-2 !border-transparent hover:!border-zinc-400 dark:hover:!border-zinc-600 data-[selected=true]:!border-zinc-900 dark:data-[selected=true]:!border-zinc-50 data-[selected=true]:!text-zinc-900 dark:data-[selected=true]:!text-zinc-50 !text-zinc-600 dark:!text-zinc-400 !font-sans"
              >
                About
              </Tab>
              <Tab 
                value="contact" 
                className="!px-0 !py-3 !text-sm !font-normal !tracking-normal !border-b-2 !border-transparent hover:!border-zinc-400 dark:hover:!border-zinc-600 data-[selected=true]:!border-zinc-900 dark:data-[selected=true]:!border-zinc-50 data-[selected=true]:!text-zinc-900 dark:data-[selected=true]:!text-zinc-50 !text-zinc-600 dark:!text-zinc-400 !font-sans"
              >
                Contact
              </Tab>
            </TabList>
          </div>
        </div>
        
        <TabPanels>
          <TabPanel value="about">
            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 sm:pb-40">
              {/* Title Page / Hero Section */}
              <section className="relative py-24 sm:py-32">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal>
                  <header className="relative pt-24 sm:pt-32 md:pt-40 pb-32 sm:pb-40 md:pb-48 min-h-[60vh] flex items-center overflow-hidden">
                    {/* Birds Image Background */}
                    <div 
                      className="absolute inset-0 -z-10"
                      style={{
                        backgroundImage: `url(${birdsImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: 'opacity(0.4)',
                      }}
                      aria-hidden="true"
                    />
                    
                    <div className="relative z-10 w-full">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 leading-tight kodchasan-hero">
                        The Borderline
                      </h1>
                      <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium uppercase tracking-wider kodchasan-hero">
                        Literary Magazine
                      </p>
                    </div>
                  </header>
                </Reveal>
              </section>

              {/* Body Pages - Introduction */}
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal delay={0.1}>
                  <div className="space-y-8">
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      Drawing 'borderlines' of connection amongst the litmag community through thought-provoking, frontier-pushing publications and projects.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      Since 2021, the borderline literary magazine has been active as a youth literary magazine focused on uplifting youth creative voices through publications, interviews, and occasional standalone projects.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      During 2024-2025, after more than a year of thought, our team worked on reshaping our mission as a development that has been quite natural behind the scenes and both reflects how our editorial interests and skills have grown and provides ways for us to better contribute to the litmag community.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      In our expanded form, you'll still recognize many of our core activities and interests, including our main litmag volumes. At the same time, we hope you will find thought-provoking surprises and more avenues to participate in our wider range of activities, including new litmag community-centred projects and publications.
                    </p>
                  </div>
                </Reveal>
              </section>

              {/* Body Pages - Mission */}
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Mission
                      </h2>
                    </div>
                    <div className="pt-2">
                      <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                        A literary magazine drawing rich and collaborative 'borderlines' of connection within the litmag community. Through inventive publications and projects, we create spaces for emerging and established voices to flourish across print, digital, writing, and visual art.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Body Pages - Story */}
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal delay={0.3}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Story
                      </h2>
                    </div>
                    <div className="pt-2 space-y-6">
                      <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                        Connecting borderlines since 2021.
                      </p>
                      <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                        We began as a platform for emerging voices, and have grown into a space where established and emerging writers and artists come together. Our publications span poetry, prose, and visual art, creating a rich tapestry of contemporary literary expression.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Colophon / Team */}
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <MeetTheTeamSection />
              </section>

              {/* Contact Reference */}
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal delay={0.4}>
                  <div className="pt-2">
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      For inquiries, submissions, or to get in touch, please visit our{' '}
                      <a 
                        href="#contact" 
                        onClick={(e) => {
                          e.preventDefault();
                          const tabs = document.querySelector('[role="tablist"]');
                          const contactTab = tabs?.querySelector('[value="contact"]') as HTMLElement;
                          contactTab?.click();
                          window.history.replaceState(null, '', '/about#contact');
                        }}
                        className="text-zinc-900 dark:text-zinc-50 underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-zinc-600 dark:hover:decoration-zinc-400 transition-colors duration-200"
                      >
                        contact page
                      </a>
                      .
                    </p>
                  </div>
                </Reveal>
              </section>
            </article>
          </TabPanel>
          
          <TabPanel value="contact">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 pb-32 sm:pb-40">
              <section className="relative py-16 sm:py-20 md:py-24">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
                <Reveal>
                  <header className="mb-16 sm:mb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-tight">
                      Contact
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                      We'd love to hear from you. Send us a message and we'll respond within 48 hours.
                    </p>
                  </header>
                </Reveal>
                <Reveal delay={0.1}>
                  <ContactForm />
                </Reveal>
              </section>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </motion.div>
  );
}
