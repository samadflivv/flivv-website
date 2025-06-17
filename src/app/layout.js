import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flivv Developers",
  description: "Dedicated to helping you Invest Wisely in Real Estate",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google analytics Code */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2EBCG8YCRC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2EBCG8YCRC');
          `}
        </Script>

        {/* ✅ Add HubSpot Tracking Code via Next.js Script */}
        <Script
          id="hubspot-tracking"
          src="//js.hs-scripts.com/21626983.js"
          strategy="afterInteractive"
        />     

        {/* ✅ Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s0w31v8v2n");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
 );
}