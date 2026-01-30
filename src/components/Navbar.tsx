'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const navItems = [
  { name: 'About', href: '/#about-us' }, 
  { name: 'Volunteer', href: '/#volunteer' },
  { name: 'Partner', href: '/#partner' },
  { name: 'Portfolio', href: '/#portfolio' },
];

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (isMenuOpen && event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop blur when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" />
      )}

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F8FFFF]/80 backdrop-blur-xl ' 
          : 'bg-[#F8FFFF] shadow-sm border-b'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>

            {/* Center Links - Desktop Only */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-nunito text-gray-800 hover:text-primary-500 font-semibold text-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Donate Button - Desktop Only */}
            <div className="hidden md:block">
              <Link
               href="/donate"
               > 
               <button className="font-nunito bg-[#61A326] hover:bg-[#61A326] text-black  px-8 py-3 rounded-full transition-colors focus:outline-none">
                Donate
              </button>
              </Link>
              
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 p-2 transition-transform hover:scale-110 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            ref={menuRef}
            className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'translate-y-0 opacity-100 visible'
                : '-translate-y-4 opacity-0 invisible'
            }`}
          >
            <div className="px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-primary-500 font-semibold text-xl py-3 px-4 rounded-xl hover:bg-white/50 transition-all duration-200 focus:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <button 
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg py-4 rounded-full transition-colors shadow-lg hover:shadow-xl focus:outline-none mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
