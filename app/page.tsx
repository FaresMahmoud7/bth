import { Hero } from "@/components/home/Hero";
import { AboutUs } from "@/components/home/AboutUs";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { WhyUs } from "@/components/home/WhyUs";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Contact } from "@/components/home/Contact";
import { getShowcaseData } from "@/actions/showcase";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

// Force dynamic rendering to ensure admin changes reflect immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const showcaseData = await getShowcaseData();

  return (
    <main className="bg-[#0a0a0a] text-white selection:bg-[#C9A84C] selection:text-black">
      <PageViewTracker path="/" />
      <Hero />
      <AboutUs />
      <ClientsMarquee />
      <CategoryShowcase categories={showcaseData} />
      <WhyUs />
      <CtaBanner />
      <Contact />
    </main>
  );
}
