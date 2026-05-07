import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Torch Lab CRM',
  description: 'CRM Lead Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}