import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

// Helper for lazy imports with retry logic
const lazyWithRetry = (componentImport: () => Promise<any>) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error("Failed to load component, retrying...", error);
      // Wait a bit and retry once
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return componentImport();
    }
  });

// Lazy load below-fold sections with retry logic
const ProblemSection = lazyWithRetry(() => import("@/components/sections/ProblemSection"));
const SolutionSection = lazyWithRetry(() => import("@/components/sections/SolutionSection"));
const WhoWeServeSection = lazyWithRetry(() => import("@/components/sections/WhoWeServeSection"));
const WhyUsSection = lazyWithRetry(() => import("@/components/sections/WhyUsSection"));
const TrustSection = lazyWithRetry(() => import("@/components/sections/TrustSection"));
const TeamSection = lazyWithRetry(() => import("@/components/sections/TeamSection"));
const ContactSection = lazyWithRetry(() => import("@/components/sections/ContactSection"));
const CTASection = lazyWithRetry(() => import("@/components/sections/CTASection"));
const FranchiseChatbot = lazyWithRetry(() => import("@/components/FranchiseChatbot"));

// Minimal loading placeholder
const SectionLoader = () => (
  <div className="section-padding">
    <div className="section-container">
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Study Buddy AI - Improving How Students Study</title>
        <meta
          name="description"
          content="Study Buddy AI is an AI-powered study companion that supports Indian students during self-study while providing clear academic visibility to schools and parents."
        />
        <meta
          name="keywords"
          content="EdTech, India, study companion, student learning, school technology, parent visibility, academic progress, self-study"
        />
        <link rel="canonical" href="https://studybuddy.ai" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Study Buddy AI - Improving How Students Study" />
        <meta
          property="og:description"
          content="A digital study companion that helps students develop better self-study habits while keeping schools and parents informed."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studybuddy.ai" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Study Buddy AI" />
        <meta
          name="twitter:description"
          content="Improving how students study — with trust, clarity, and accountability."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionLoader />}>
            <ProblemSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SolutionSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <WhoWeServeSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <WhyUsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TrustSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TeamSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <FranchiseChatbot />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
