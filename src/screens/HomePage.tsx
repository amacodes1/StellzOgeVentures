import React from "react";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import RecentProductsSection from "../components/home/RecentProductsSection";
import CategoryProductsSection from "../components/home/CategoryProductsSection";
import BulkPricingBanner from "../components/home/BulkPricingBanner";
import BenefitsSection from "../components/home/BenefitsSection";
import CallToActionSection from "../components/home/CallToActionSection";

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <CategoriesSection />
      <RecentProductsSection />
      <CategoryProductsSection
        categoryName="Biscuit"
        backgroundColor="bg-white"
      />
      <CategoryProductsSection
        categoryName="Chocolate"
        backgroundColor="bg-white"
      />
      <CategoryProductsSection
        categoryName="Milk"
        backgroundColor="bg-gray-50"
      />
      <BulkPricingBanner />
      <BenefitsSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
