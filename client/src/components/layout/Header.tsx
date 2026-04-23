import React, { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import MainHeader from "../header/MainHeader";
import DesktopNavigation from "../header/DesktopNavigation";
import MobileSideMenu from "../header/MobileSideMenu";
import MobileSearchBar from "../header/MobileSearchBar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <AnnouncementBar />
      <MainHeader 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <DesktopNavigation />
      <MobileSideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default Header;
