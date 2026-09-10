import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Phone, 
  MessageCircle, 
  LockKeyhole, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Button, PrimaryButton, SecondaryButton } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../ui/Container';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';

const PHONE_NUMBER = '+91 7304679756';
const WHATSAPP_URL = 'https://wa.me/917304679756';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Nav links specification
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Detect scroll position for sticky transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Accessibility: Handle Escape key, focus lock, and body scroll lock for Mobile Menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          triggerButtonRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on location route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-0'
            : 'bg-white border-b border-slate-200 py-0.5'
        }`}
      >
        <Container size="xl" className="flex h-16 sm:h-18 items-center justify-between">
          {/* Brand Logo with Shield and Magnifying Glass iconography */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] rounded-sm p-1"
            aria-label="SeekProof Home - Private Intelligence & Forensics"
          >
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-sm bg-[#0F1E2E] border border-[#0F1E2E] transition-colors duration-150">
              <Shield className="h-5 w-5 text-[#D4AF37] transition-transform duration-150 group-hover:scale-105" aria-hidden="true" strokeWidth={2} />
              <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white border border-[#0F1E2E]">
                <Search className="h-2 w-2 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F1E2E] font-mono leading-tight">
                SEEK<span className="text-[#D4AF37]">PROOF</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">
                Private Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-6 lg:gap-8" 
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs lg:text-sm font-semibold tracking-wide transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-[#0F1E2E] font-bold'
                      : 'text-slate-600 hover:text-[#0F1E2E]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F1E2E] rounded-full"
                      transition={{ duration: 0.15, ease: 'easeInOut' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Search, Phone, WhatsApp, CTA, Client Portal */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm text-slate-600 hover:text-[#0F1E2E] hover:bg-slate-100 border border-slate-200 transition-colors duration-150 group cursor-pointer"
              title="Search Services (Ctrl+K)"
              aria-label="Search SeekProof Services (Shortcut Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#0F1E2E] transition-colors" aria-hidden="true" strokeWidth={2} />
              <span className="text-xs text-slate-600 group-hover:text-slate-900">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.2 text-[9px] font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-sm">
                ⌘K
              </kbd>
            </button>

            {/* Direct Contact Icons Strip */}
            <div className="flex items-center gap-2 text-slate-600 border-l border-r border-slate-200 px-3">
              {/* Call Now Link */}
              <a
                href={`tel:${PHONE_NUMBER.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 p-1 rounded-sm text-slate-700 hover:text-[#0F1E2E] hover:bg-slate-100 transition-colors"
                title={`Call Confidential Hotline: ${PHONE_NUMBER}`}
                aria-label={`Call Confidential Hotline at ${PHONE_NUMBER}`}
              >
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2.5} />
                <span className="text-xs font-mono font-medium hidden xl:inline">{PHONE_NUMBER}</span>
              </a>

              {/* WhatsApp Link */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-sm text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                title="Encrypted WhatsApp Consultation"
                aria-label="Start Encrypted WhatsApp Consultation"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" strokeWidth={2} />
              </a>
            </div>

            {/* Auth / Client Portal State */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link to="/portal">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <UserIcon className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                    <span className="max-w-[110px] truncate text-xs">{user.name.split(' ')[0]}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-600 hover:bg-slate-100"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-mono"
                  aria-label="Client Portal Access"
                >
                  <LockKeyhole className="h-3.5 w-3.5 mr-1 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} /> Portal
                </Button>
              </Link>
            )}

            {/* Dark Mode Theme Toggle */}
            <ThemeToggle />

            {/* Prominent Free Consultation CTA Button */}
            <Link to="/free-consultation">
              <PrimaryButton 
                size="sm" 
                className="text-xs font-semibold tracking-wider font-mono shadow-none"
                aria-label="Request Free Case Consultation"
              >
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-[#D4AF37]" aria-hidden="true" />
                Free Consultation
              </PrimaryButton>
            </Link>
          </div>

          {/* Mobile Right Controls: Quick Consultation, Theme Toggle & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 rounded-sm text-slate-600 hover:text-[#0F1E2E] hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Open Search Modal"
            >
              <Search className="h-4.5 w-4.5 text-slate-600" aria-hidden="true" strokeWidth={2} />
            </button>

            {/* Mobile Theme Toggle */}
            <ThemeToggle className="p-1.5" />

            {/* Quick Free Consultation CTA Button for Small screens */}
            <Link to="/free-consultation" className="hidden sm:inline-block">
              <PrimaryButton size="sm" className="text-xs font-mono py-1 px-2.5">
                Free Consultation
              </PrimaryButton>
            </Link>

            {/* Hamburger / Menu Toggle Button */}
            <button
              ref={triggerButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-sm text-slate-700 hover:text-[#0F1E2E] hover:bg-slate-100 border border-slate-300 transition-colors focus-visible:ring-1 focus-visible:ring-[#0F1E2E] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer Overlay using Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-slate-900/40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-Down Drawer Container */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-white border-b border-slate-300 shadow-md z-50 flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-[#F8FAFC]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                  aria-label="SeekProof Home"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#0F1E2E]">
                    <Shield className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
                  </div>
                  <span className="text-base font-bold text-[#0F1E2E] font-mono">
                    SEEK<span className="text-[#D4AF37]">PROOF</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-slate-600" aria-hidden="true" strokeWidth={2} />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4 space-y-4">
                {/* Search Bar Action */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm bg-[#F8FAFC] border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer"
                  aria-label="Search intelligence and services"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="h-4 w-4 text-slate-500" aria-hidden="true" strokeWidth={2} />
                    <span className="text-xs font-sans">Search intelligence & services...</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[9px] font-mono text-slate-500 bg-white border border-slate-200 rounded-sm">
                    Ctrl+K
                  </kbd>
                </button>

                {/* Primary Nav Links */}
                <nav className="space-y-1" aria-label="Mobile Navigation Links">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                          isActive
                            ? 'bg-slate-100 text-[#0F1E2E] border border-slate-300 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`h-3.5 w-3.5 ${isActive ? 'text-[#0F1E2E]' : 'text-slate-400'}`} aria-hidden="true" strokeWidth={2} />
                      </Link>
                    );
                  })}
                </nav>

                {/* Direct Action Channels: Call Now & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {/* Click to Call */}
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-[#F8FAFC] border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors font-mono text-xs font-semibold"
                    aria-label={`Call Now at ${PHONE_NUMBER}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2.5} />
                    <span>Call ({PHONE_NUMBER})</span>
                  </a>

                  {/* WhatsApp Link */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-[#F8FAFC] border border-slate-200 text-emerald-700 hover:bg-emerald-50 transition-colors font-mono text-xs font-semibold"
                    aria-label="Direct WhatsApp Consultation"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" strokeWidth={2} />
                    <span>WhatsApp Inquiries</span>
                    <ArrowUpRight className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                  </a>
                </div>

                {/* Primary CTA & Portal Section */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <Link
                    to="/free-consultation"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <PrimaryButton className="w-full justify-center py-2 text-xs font-mono font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-[#D4AF37]" aria-hidden="true" />
                      Get Free Confidential Consultation
                    </PrimaryButton>
                  </Link>

                  {isAuthenticated && user ? (
                    <div className="space-y-1.5">
                      <Link
                        to="/portal"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <SecondaryButton className="w-full justify-center gap-1.5 py-2 text-xs font-mono">
                          <UserIcon className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                          Case Portal ({user.name})
                        </SecondaryButton>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-center gap-1.5 py-1.5 text-xs font-mono text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} /> Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <SecondaryButton className="w-full justify-center gap-1.5 py-2 text-xs font-mono">
                        <LockKeyhole className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                        Client Portal Login
                      </SecondaryButton>
                    </Link>
                  )}
                </div>

                {/* Security Footer Note */}
                <div className="pt-1 text-center text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
                  <Clock className="h-3 w-3 text-slate-400" aria-hidden="true" strokeWidth={2} />
                  <span>24/7 Rapid Response Operative Dispatch</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
