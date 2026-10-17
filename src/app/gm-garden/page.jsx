import { Cormorant_Garamond } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GMGardenPage from '@/components/projects/gm-garden/GMGardenPage';
import { gmGarden } from '@/data/gmGarden';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-gm-serif',
  display: 'swap',
});

export const metadata = {
  title: gmGarden.seo.title,
  description: gmGarden.seo.description,
  openGraph: {
    title: gmGarden.seo.title,
    description: gmGarden.seo.description,
    type: 'website',
    images: [
      {
        url: gmGarden.ogImage.src,
        alt: gmGarden.ogImage.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <div className={serif.variable}>
      <Navigation />
      <GMGardenPage content={gmGarden} />
      <Footer />
    </div>
  );
}
