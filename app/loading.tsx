import DotsLoader from "@/components/Loader";

/** Shown by Next.js while a page is still being prepared on the server. */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-cream-light">
      <DotsLoader size={16} label="Loading page" />
    </div>
  );
}
