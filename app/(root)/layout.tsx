import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/**
 * The main layout component for all pages.
 *
 * It renders a layout with a Navbar at the top, a Footer at the bottom, and
 * the page content in the middle. It also renders a fixed position background
 * of animated background beams, and a spotlight that shines on the top left
 * corner of the screen.
 *
 * @param {{ children: React.ReactNode }} props The props for the component.
 * @returns {JSX.Element} The JSX element representing the layout.
 */
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
