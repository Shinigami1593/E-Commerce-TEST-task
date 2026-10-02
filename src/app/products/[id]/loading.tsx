import Spinner from "@/components/ui/Spinner";

export default function ProductLoading() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <Spinner label="Loading product..." />
    </main>
  );
}