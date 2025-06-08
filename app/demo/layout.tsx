import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdjusterTrack - Demo",
  description: "Demonstration of the AdjusterTrack dashboard.",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-2xl font-bold tracking-tight">AdjusterTrack Demo</h1>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  );
}
