import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollReset } from "@/components/ScrollReset";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollReset />
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
