import { Toaster } from "@/components/ui/toaster";

// Layout cho Payload CMS Admin trong route group (payload)
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
