import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper"; // ✅ Only import the wrapper

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
        
        {/* <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TGRWCJ9M');`}
        </Script> */}


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
        
        {/* meta pixel script */}
        <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

         {/* Google Tag Manager (noscript) */}
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGRWCJ9M"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
        
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
