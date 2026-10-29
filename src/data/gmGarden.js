// The site photograph. It appears in exactly two places now: the full-screen
// "visual story" section and the social/link preview image. The hero and the
// introduction are built from typography and generated artwork instead.
const SITE_AERIAL = {
  src: 'https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GMG/gmg.png',
  alt: 'Aerial view of the GM Garden Villas site in Nanal Nagar, Hyderabad',
  width: 3840,
  height: 2160,
};

export const gmGarden = {
  slug: 'gm-garden',
  title: 'GM Garden',

  ogImage: SITE_AERIAL,

  seo: {
    title: 'GM Garden | Flivv Developers',
    description:
      'GM Garden Villas in Nanal Nagar, Hyderabad — a prime city-center plot with access to HITEC City, Financial District, transport hubs, and nearby lifestyle, education, and healthcare infrastructure.',
  },

  hero: {
    eyebrow: 'Discover Prime City Plots at',
    title: 'GM Garden, Nanal Nagar',
    subtitle: 'Limited. Central. Yours',
    description:
      'Open plots inside Hyderabad have become extremely rare. GM Garden Villas brings you 9 carefully planned villa plots in the established locality of Nanal Nagar, close to everyday conveniences, major roads and most importantly it lies right in the pulse of the city. An appreciated opportunity with lasting value, designed for those who want the freedom to build their own home without leaving the city.',
    ctaLabel: 'Register Your Interest',
    ctaTarget: '#book-a-visit',
  },

  introduction: {
    eyebrow: 'The location is a Rare Find',
    title: 'A city-centre address where buildable land is almost gone',
    description: [
      'In Hyderabad, open plots have become extremely scarce. As any resident is aware, around city centers, the land is finite. ',
      'Most land in established neighbourhoods like Nanal Nagar has already been built up.',
    ],
    highlights: [
      {
        title: 'Scarcity',
        description: 'Opportunities to own and build from scratch in this part of the city are now exceptionally limited',
      },
      {
        title: 'Versatility',
        description: 'Ideal for residential villas, commercial use or mixed-use development',
      },
    ],
    // Caption for the generated site-plan artwork that stands in for a
    // photograph in this section.
    art: {
      caption: 'Nanal Nagar · Hyderabad',
      meta: 'Total area 3,888 Sq. Yds.',
    },
  },

  stats: {
    items: [
      {
        value: '3888',
        suffix: 'Sq. Yds.',
        label: 'Plot Size',
        description: 'Total Area 3888 Sq. Yds.',
      },
      {
        value: '9',
        suffix: 'Plots',
        label: 'Limited Inventory',
        description: 'Ranging from 165 to 767 Sq. Yds.',
      },
      {
        value: '4.2–4.4',
        suffix: 'km',
        label: 'Nearest Metro Stations',
        description: 'Khairatabad Metro Station and Jubilee Hills Road No. 5 Metro Station.',
      },
      {
        value: '11',
        suffix: 'km',
        label: 'IT Hubs',
        description: 'IT hubs like Gachibowli and HITEC City are easily accessible.',
      },
    ],
  },

  visualStory: {
    eyebrow: 'EXCEPTIONAL CONNECTIVITY',
    title: 'Centrally placed. Effortlessly connected',
    description:
      'Well connected to some of the most happening roads of Hyderabad, offering convenient access to both the traditional heart of Hyderabad and at the same time even connected to the expanding western corridor.',
    primaryImage: SITE_AERIAL,
    secondaryImage: null,
    imageAlt: 'Our projection of how GM Garden would look',
  },

  benefits: {
    eyebrow: 'The location speaks for itself',
    title: 'Why GM Garden',
    description:
      '',
    items: [
      {
        title: 'Scarcity',
        description: 'Buildable land in this established central locality is exceptionally limited.',
        icon: 'Star',
      },
      {
        title: 'Versatility',
        description: 'Suitable for residential villas, commercial use, or mixed-use development.',
        icon: 'Building2',
      },
      {
        title: 'Connectivity',
        description: 'Well connected to major arterial roads, with balanced access to both the Old City and the western corridor.',
        icon: 'Compass',
      },
      {
        title: 'Everyday Convenience',
        description: 'Schools, hospitals, parks, retail, and essential services are all within close proximity.',
        icon: 'Trees',
      },
    ],
  },

  location: {
    eyebrow: 'Location Details',
    title: 'Transport hubs and nearby infrastructure',
    description:
      'The document calls out access, lifestyle amenities, education, and healthcare around the site.',
    address: 'Beside Kakatiya nagar, Langar House Rd, Nanal Nagar, Hyderabad',
    groups: [
      {
        title: 'Transport Hubs',
        items: [
          'Financial District, IT Hubs & Educational Universities all lie on the same stretch, approximately 13.5 KMS distant from GM Garden.',
          'Hyderabad Deccan Railway Station (Nampally) — about 4.5 kilometers away.',
          'Khairatabad Metro Station and Jubilee Hills Road No. 5 Metro Station — both around 4.2 to 4.4 kilometers away.',
          'Rajiv Gandhi International Airport — roughly 30 to 35 kilometers via the PV Narasimha Rao Expressway or Nehru Outer Ring Road.',
        ],
      },
    
      {
        title: 'Education',
        items: [
          'Glendale International School',
          'Orchids The International School',
          'Kendriya Vidyalaya No. 1',
          'Army Public School'
        ],
      },
      {
        title: 'Healthcare',
        items: [
          'Olive Hospital',
          'Mythri Hospital', 
          'Premier Hospital',
          'Majestic Hospital'
        ],
      },
    ],
  },

  details: {
    eyebrow: 'Essential Plot Details',
    title: 'Documented plot details',
    description: 'Clear and documented specifications',
    tableRows: [
      { label: 'Layout Size', value: 'Total Area 3888 Sq. Yds.' },
      { label: 'Road Access', value: '40 Ft wide road with 9-inch CC surface' },
      { label: 'Utilities', value: 'Underground electricity, drainage, water & high-speed fiber ready' },
      { label: 'Boundary & Finish', value: 'Granite boundary wall with state-of-the-art curb stones' },
    ],
    chips: [ 'GHMC approved'],
  },

  // Google Maps location section. Restore-and-keep: this section is part of the
  // page permanently. The embed URL is the keyless "output=embed" form Google
  // serves for iframes; it deliberately carries no API key.
  map: {
    eyebrow: 'Find Us',
    title: 'A city-centre address you can navigate to',
    description:
      'Set beside Kakatiya Nagar on Langar House Road, with Mehdipatnam Bus Station roughly 1.5–2 km away and Hyderabad Deccan Railway Station about 4.5 km away.',
    address: 'Beside Kakatiya nagar, Langar House Rd, Nanal Nagar, Hyderabad',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1546.128657346252!2d78.42450375805007!3d17.392471104825052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96e3737abc97%3A0x7e40627febec1ae!2sG%20M%20Garden!5e0!3m2!1sen!2sin!4v1792232106248!5m2!1sen!2sin',
  },

  bookVisit: {
    title: 'Register Your Interest',
    description:
      'Share your details and our team will get in touch to walk you through the project details.',
    formHeading: 'Schedule a Call',
  },

  hubspot: {
    portalId: '21626983',
    region: 'na2',
    formId: '2c7c42df-c38f-4ed5-83ed-74485b65f1a4',
    scriptUrl: 'https://js-na2.hsforms.net/forms/embed/21626983.js',
  },
};

export default gmGarden;
