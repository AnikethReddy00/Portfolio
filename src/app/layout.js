import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Aniketh — Interactive 3D Portfolio',
  description: 'Interactive 3D character experience built with Next.js and React Three Fiber.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#fcfcfc] font-sans overflow-x-hidden overflow-y-auto">
        {children}
      </body>
    </html>
  );
}
