import './globals.css';

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
    <html lang="en">
      <body className="antialiased bg-[#fcfcfc] font-sans overflow-x-hidden overflow-y-auto">
        {children}
      </body>
    </html>
  );
}
