import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";

const BookIcon = () => {
  return (
    <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
  );
};

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") setIsScrolled(true);
    else setIsScrolled(false);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full flex justify-between px-4 md:px-16 z-50 transition-all duration-500 
      ${isScrolled ? "bg-white shadow-md text-gray-700 py-3" : "py-6"}`}>

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className={`h-9 ${isScrolled ? "invert" : ""}`} />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((l, i) => (
          <Link key={i} to={l.path} className={isScrolled ? "text-gray-700" : "text-white"}>
            {l.name}
          </Link>
        ))}

        <button onClick={() => navigate("/owner")} className="border px-4 py-1 rounded-full">
          Dashboard
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate("/my-bookings")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="bg-black text-white px-6 py-2 rounded-full">
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        {user && <UserButton />}
        <img src={assets.menuIcon} className="h-4" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 transition-all
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <button onClick={() => setIsMenuOpen(false)}>Close</button>

        {navLinks.map((l, i) => (
          <Link key={i} to={l.path} onClick={() => setIsMenuOpen(false)}>{l.name}</Link>
        ))}

        {!user && (
          <button onClick={openSignIn} className="bg-black text-white px-6 py-2 rounded-full">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;