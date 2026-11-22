import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AppPreviewSection } from "@/components/AppPreviewSection";
import { DownloadSection } from "@/components/DownloadSection";
import { FaqSection } from "@/components/FaqSection";
import { AboutDeveloperSection } from "@/components/AboutDeveloperSection";
import { FooterSection } from "@/components/FooterSection";
import { PricingSection } from "@/components/PricingSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AppPreviewSection />
        <PricingSection />
        <DownloadSection />
        <FaqSection />
        <AboutDeveloperSection />
      </main>
      <FooterSection />
    </div>
  );
}
