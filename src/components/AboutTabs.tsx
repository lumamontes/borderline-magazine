'use client';

import React from 'react';
import { AboutHero } from './about/AboutHero';
import { StoryDiscovery } from './about/StoryDiscovery';
import { MissionSection } from './about/MissionSection';
import { ScrollHighlightSection } from './about/ScrollHighlightSection';
import { GreenSection } from './about/GreenSection';
import { MeetTheTeamSection } from './about/MeetTheTeamSection';
import ContactForm from './ContactForm';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './ui/tabs';

export function AboutTabs() {
  return (
    <Tabs defaultTab="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24">
        <TabList>
          <Tab value="about">About</Tab>
          <Tab value="contact">Contact</Tab>
        </TabList>
      </div>
      <TabPanels>
        <TabPanel value="about">
          <AboutHero />
          <StoryDiscovery />
          <MissionSection />
          <ScrollHighlightSection />
          <GreenSection />
          <MeetTheTeamSection />
        </TabPanel>
        <TabPanel value="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            <ContactForm />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

