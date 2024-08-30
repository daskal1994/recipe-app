import '../styles/globals.css';

export const metadata = {
  title: 'Recipe Creator',
  description: 'Create and manage your recipes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}