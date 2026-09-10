# SeekProof Enterprise Launch Readiness Checklist

## 1. Administrative Infrastructure (Phase 20 & 21)
- [x] Admin Dashboard Overview Cards (New Leads, Total Leads, Leads in Progress, Converted Leads, Contact Messages, Published Services).
- [x] Searchable, filterable, and paginated Leads table with status controls and date range.
- [x] Lead details slide-over drawer with internal notes thread and staff assignment.
- [x] CSV Lead export restricted to authorized administrators.
- [x] Audit logging on all status changes and destructive operations.
- [x] Zero sensitive customer data leaked to browser `console.log`.
- [x] Full CRUD on Investigation Services with category filtering, display order reordering, active toggle switch, Lucide icon selector, and live preview modal.
- [x] Full CRUD on Intelligence Briefings & Blog with draft/published/archived workflow, author assigning, read time, and sanitized HTML.

## 2. Technical SEO & Schema Structured Data (Phase 22)
- [x] `SEOHead` component dynamically injecting title, description, canonical link, OpenGraph, and Twitter tags.
- [x] `LocalBusiness` / `ProfessionalService` JSON-LD schema with verified Nariman Point address, coordinates, and phone numbers.
- [x] `BreadcrumbList` JSON-LD schema across all subpages.
- [x] `FAQPage` JSON-LD schema on homepage and service detail pages.
- [x] `Article` JSON-LD schema for blog publications.
- [x] Valid `sitemap.xml` conforming to Sitemaps.org XML schema.
- [x] Production `robots.txt` disallowing `/admin/`, `/portal/`, and `/api/`.
- [x] Proper heading hierarchy (`<h1>` on every page) and accessible focus rings.

## 3. High-Conversion Contact Experience (Phase 23)
- [x] Exact verified Mumbai office address: `Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021, India`.
- [x] Exact verified phone lines: `+91 7304679756` (Duty Line) and `+91 9152695373` (Advisory Desk).
- [x] Exact verified email: `seekproof47@gmail.com`.
- [x] Operational office hours: Mon-Fri 09:00 - 20:00, Sat 10:00 - 16:00 (IST) with 24/7 operative dispatch.
- [x] Lazy-loaded interactive Google Map with privacy consent and direct navigation link.
- [x] Floating encrypted WhatsApp CTA widget with safe prefilled greeting.
- [x] Emergency ethical notice advising users in physical danger to call police emergency `112`/`100`.

## 4. Legal Compliance & Security Hardening (Phase 24)
- [x] Privacy Policy updated with DPDP Act 2023, GDPR, zero-knowledge storage, and DPO contact.
- [x] Terms of Service updated with retainer terms, limitation of liability, and Mumbai jurisdiction.
- [x] Cookie Policy created with zero-adware commitment and essential session controls.
- [x] Legal Disclaimer created with non-guarantee of judicial outcomes and ethical limits.
- [x] `DEPLOYMENT.md` guide completed with Nginx, SSL, PM2, and backup scripts.

## 5. Build & Typecheck Verification (Phase 25)
- [x] Server TypeScript validation clean.
- [x] Client TypeScript and Vite production bundle clean.
