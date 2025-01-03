import Hero from "@/components/hero";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-8 py-8">
        <Hero />
      </div>
    </>
  );
}
