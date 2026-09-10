import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { EmergencyBanner } from '../components/common/EmergencyBanner';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#D4AF37] selection:text-[#070E18]">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
