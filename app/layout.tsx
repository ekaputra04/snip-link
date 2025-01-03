import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://snip-link-five.vercel.app/";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Snip Link",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

/**
 * The root layout component for the entire app.
 *
 * This component renders the app's main page structure, including the HTML
 * document, the main content area, and the app's theme and layout.
 *
 * The `children` prop is the content that will be rendered inside the main
 * content area.
 *
 * This component also renders a `Toaster` component for displaying toasts, and
 * a `BackgroundBeams` component for displaying a background animation.
 *
 * @param {{ children: React.ReactNode }} props The props for the component.
 * @returns {JSX.Element} The JSX element representing the component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <div className="px-8 md:px-16 lg:px-64">{children}</div>
            <Toaster />
            <div className="top-0 right-0 bottom-0 left-0 -z-50 fixed w-full h-screen">
              <BackgroundBeams />
            </div>
            <Spotlight className="-top-72 -left-64 -z-40" fill="blue" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
