import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
      <div className="top-0 right-0 bottom-0 left-0 -z-50 fixed w-full h-screen">
        <BackgroundBeams />
      </div>
      <Spotlight className="-top-72 -left-64 -z-40" fill="blue" />
      <Footer />
    </div>
  );
}
