import Navbar from "@/components/Navbar";
import FormCreateLink from "../FormCreateLink";

export default function CreatePage() {
  return (
    <>
      <div className="space-y-4 py-4">
        <h1 className="font-bold text-2xl">Create a link</h1>

        <p>You can create 48 more links this month.</p>
      </div>

      <div className="p-8 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
        <FormCreateLink />
      </div>
    </>
  );
}
