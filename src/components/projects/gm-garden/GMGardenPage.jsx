'use client';

import { MotionConfig } from 'framer-motion';
import GMGardenHero from './GMGardenHero';
import GMGardenIntroduction from './GMGardenIntroduction';
import GMGardenStats from './GMGardenStats';
import GMGardenImageStory from './GMGardenImageStory';
import GMGardenBenefits from './GMGardenBenefits';
import GMGardenLocation from './GMGardenLocation';
import GMGardenMap from './GMGardenMap';
import GMGardenDetails from './GMGardenDetails';
import GMGardenBookVisit from './GMGardenBookVisit';

// Section order, and the only place the page composition is decided. Content
// arrives as one object so the whole page can be driven from Payload CMS later
// without touching any of the section components.
//
// `MotionConfig reducedMotion="user"` makes every framer-motion animation here
// honour prefers-reduced-motion.
export default function GMGardenPage({ content }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-[#F7F4EC]">
        <GMGardenHero hero={content.hero} />
        <GMGardenIntroduction introduction={content.introduction} />
        <GMGardenStats stats={content.stats} />
        <GMGardenImageStory story={content.visualStory} />
        <GMGardenBenefits benefits={content.benefits} />
        <GMGardenLocation location={content.location} mapHref="#location-map" />
        <GMGardenMap map={content.map} />
        <GMGardenDetails details={content.details} />
        <GMGardenBookVisit bookVisit={content.bookVisit} hubspot={content.hubspot} />
      </main>
    </MotionConfig>
  );
}
