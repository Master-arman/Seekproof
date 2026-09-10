import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { getPool, isConnected } from '../database/db';
import { Service, Lead, LeadNote, Testimonial, BlogPost, ContactMessage, SiteSetting, Admin, AuditLog } from '../types';

// ============================================================================
// In-Memory Fallback Store (Used when MySQL is offline)
// ============================================================================
const memoryStore = {
  services: [
    {
      id: 1,
      title: 'Missing Persons & Locating',
      slug: 'missing-persons',
      category: 'Personal',
      short_description: 'Advanced locating and tracing of missing family members, runaway juveniles, long-lost relatives, and absconding individuals.',
      full_description: 'Our specialized Missing Persons unit employs multi-layered human intelligence, cross-referenced databases, field reconnaissance, and digital tracing.',
      icon_name: 'Search',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 1,
      meta_title: 'Missing Persons Investigation Services | SeekProof',
      meta_description: 'Professional missing person tracing and location investigations with dedicated field operatives.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      title: 'Personal Investigation & Character Checks',
      slug: 'personal-investigation',
      category: 'Personal',
      short_description: 'Discreet inquiries into individual character, personal habits, daily routines, social circles, and lifestyle veracity.',
      full_description: 'SeekProof provides confidential personal investigations tailored for individuals needing clarity on personal matters.',
      icon_name: 'UserCheck',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 2,
      meta_title: 'Confidential Personal Investigation Services | SeekProof',
      meta_description: 'Discreet personal investigations and lifestyle checks by licensed private detectives.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      title: 'Lady Detective Specialized Operations',
      slug: 'lady-detectives',
      category: 'Personal',
      short_description: 'Specialized female investigative operatives skilled in high-discretion undercover assignments, sensitive personal inquiries, and domestic vetting.',
      full_description: 'Our certified lady detectives provide high-empathy, discreet field intelligence for sensitive domestic, personal, and family matters.',
      icon_name: 'User',
      featured_image: null,
      is_featured: false,
      is_active: true,
      display_order: 3,
      meta_title: 'Lady Detective Services | SeekProof',
      meta_description: 'Discreet and compassionate female private investigators for domestic and personal cases.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      title: 'Pre-Matrimonial Background Investigation',
      slug: 'marital-investigations',
      category: 'Matrimonial',
      short_description: 'Thorough pre-matrimonial background vetting verifying financial status, family reputation, employment, and past conduct.',
      full_description: 'Our Pre-Matrimonial Investigation protocol thoroughly verifies prospective matches, including educational credentials, employment status, family background, and financial solvency.',
      icon_name: 'HeartHandshake',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 4,
      meta_title: 'Pre-Matrimonial Background Investigation | SeekProof',
      meta_description: 'Comprehensive pre-matrimonial background checks and personal verification services.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      title: 'Post-Matrimonial & Infidelity Inquiries',
      slug: 'post-matrimonial-investigations',
      category: 'Matrimonial',
      short_description: 'Discreet verification of suspected infidelity, extra-marital affairs, hidden financial accounts, and spousal deceit.',
      full_description: 'Empathetic and legally sound post-matrimonial verification delivering timestamped photo/video evidence and financial transparency.',
      icon_name: 'ShieldAlert',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 5,
      meta_title: 'Post-Matrimonial & Infidelity Investigation | SeekProof',
      meta_description: 'Discreet spousal infidelity and post-matrimonial verification with court-admissible proof.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      title: 'Corporate Fraud & Embezzlement Probes',
      slug: 'corporate-fraud',
      category: 'Corporate',
      short_description: 'Internal forensic investigations uncovering systemic corporate fraud, kickback schemes, data theft, and executive breach of fiduciary duty.',
      full_description: 'SeekProof conducts forensic corporate inquiries for boards of directors, general counsels, and special audit committees.',
      icon_name: 'Building2',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 6,
      meta_title: 'Corporate Fraud & Embezzlement Probes | SeekProof',
      meta_description: 'Discreet corporate fraud investigations adhering to ISO 27037 chain of custody.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 7,
      title: 'Strategic Due Diligence & IPR Protection',
      slug: 'due-diligence',
      category: 'Corporate',
      short_description: 'Exhaustive due diligence on target acquisitions, business partners, executive leadership, and intellectual property defense.',
      full_description: 'Uncovering undisclosed liabilities, anti-counterfeiting operations, trademark violations, and regulatory exposure before deal closing.',
      icon_name: 'Fingerprint',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 7,
      meta_title: 'Due Diligence & IPR Investigations | SeekProof',
      meta_description: 'M&A due diligence, intellectual property defense, and corporate background intelligence.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 8,
      title: 'Cross-Border Asset Tracing & Recovery',
      slug: 'asset-recovery',
      category: 'Corporate',
      short_description: 'Global financial tracking locating hidden wealth, nominee-held properties, luxury maritime assets, and bank conduits across offshore havens.',
      full_description: 'We unmask nominee structures and trace fund flows to assist litigators in obtaining worldwide freezing injunctions.',
      icon_name: 'Compass',
      featured_image: null,
      is_featured: false,
      is_active: true,
      display_order: 8,
      meta_title: 'Cross-Border Asset Tracing | SeekProof',
      meta_description: 'Multi-jurisdictional financial intelligence and offshore asset recovery support.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 9,
      title: 'Background Checks & Personnel Vetting',
      slug: 'background-checks-verifications',
      category: 'Verification',
      short_description: 'Rigorous screening of key personnel, executive hires, business partners, domestic staff, and vendors.',
      full_description: 'Multi-jurisdiction employment history, criminal registry, credit verification, and directorship vetting.',
      icon_name: 'FileCheck',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 9,
      meta_title: 'Background Checks & Personnel Verification | SeekProof',
      meta_description: 'Comprehensive C-Suite executive and vendor background checks.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 10,
      title: 'Identity & Credential Authentication',
      slug: 'identity-verification',
      category: 'Verification',
      short_description: 'Deep authentication of educational credentials, corporate affiliations, professional licenses, and address veracity.',
      full_description: 'Verification of documents, residency, professional certifications, and identity integrity.',
      icon_name: 'ShieldCheck',
      featured_image: null,
      is_featured: false,
      is_active: true,
      display_order: 10,
      meta_title: 'Identity & Credential Verification | SeekProof',
      meta_description: 'Authentication of identity, educational documents, and regulatory licenses.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 11,
      title: 'Technical Surveillance Counter-Measures (TSCM)',
      slug: 'counter-surveillance',
      category: 'Security',
      short_description: 'Tactical electronic sweeps using military-grade RF spectrum analyzers to detect active bugging devices, GPS trackers, and hidden cameras.',
      full_description: 'TSCM sweeps protect executive boardrooms, off-site negotiation suites, private aircraft, and executive residences against electronic eavesdropping.',
      icon_name: 'Eye',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 11,
      meta_title: 'TSCM Bug Sweeping & Counter Surveillance | SeekProof',
      meta_description: 'Military-grade RF sweeps and electronic bug detection for corporate and private facilities.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 12,
      title: 'Corporate Risk Assessment & Facility Defense',
      slug: 'corporate-security',
      category: 'Security',
      short_description: 'Comprehensive physical security audits, executive threat management, access control assessments, and crisis response planning.',
      full_description: 'In-depth physical vulnerability assessments and executive protection logistics for high-risk enterprise assets.',
      icon_name: 'Shield',
      featured_image: null,
      is_featured: false,
      is_active: true,
      display_order: 12,
      meta_title: 'Corporate Security & Threat Management | SeekProof',
      meta_description: 'Enterprise facility security audits and executive threat management logistics.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 13,
      title: 'Forensic Analysis & Litigation Support',
      slug: 'forensic-analysis-legal-support',
      category: 'Legal Support',
      short_description: 'Digital forensics (ISO 27037), handwriting analysis, document verification, and litigation intelligence.',
      full_description: 'Court-admissible forensic documentation, expert witness briefings, and unbroken chain-of-custody handling for legal disputes.',
      icon_name: 'Scale',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 13,
      meta_title: 'Forensic Analysis & Legal Support | SeekProof',
      meta_description: 'Expert witness briefs, forensic document inspection, and litigation evidence.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 14,
      title: 'Digital Forensics & Cyber Threat Attribution',
      slug: 'digital-forensics',
      category: 'Legal Support',
      short_description: 'ISO/IEC 27037 compliant electronic evidence extraction from encrypted systems, cloud environments, and mobile hardware.',
      full_description: 'Deep sector carving, volatile RAM capture, malware forensics, and cryptocurrency blockchain tracking for legal enforcement.',
      icon_name: 'Cpu',
      featured_image: null,
      is_featured: true,
      is_active: true,
      display_order: 14,
      meta_title: 'Digital Forensics & Cyber Evidence | SeekProof',
      meta_description: 'ISO 27037 certified digital evidence extraction and cyber forensics for judicial proceedings.',
      created_at: new Date(),
      updated_at: new Date()
    }
  ] as Service[],

  testimonials: [
    {
      id: 1,
      client_name: 'Rajesh Sharma',
      designation: 'Senior Director, Corporate Governance',
      testimonial_text: 'SeekProof demonstrated absolute professionalism and discretion when investigating a major procurement irregularity in our supply chain. Their forensic documentation was clear, undeniable, and enabled us to take swift legal action.',
      rating: 5,
      image_url: null,
      is_published: true,
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      client_name: 'Vikram Mehta',
      designation: 'Managing Partner, Mehta & Associates Legal Counsel',
      testimonial_text: 'In high-stakes commercial litigation, evidentiary integrity is everything. SeekProof delivered court-admissible proof with an unbroken chain of custody. Their team is our go-to intelligence partner.',
      rating: 5,
      image_url: null,
      is_published: true,
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      client_name: 'Priya Patel',
      designation: 'Private Client',
      testimonial_text: 'Dealing with a sensitive family matter was overwhelming, but the lady detective team at SeekProof handled my case with immense empathy, patience, and complete confidentiality. I am truly grateful for their support.',
      rating: 5,
      image_url: null,
      is_published: true,
      display_order: 3,
      created_at: new Date(),
      updated_at: new Date()
    }
  ] as Testimonial[],

  leadNotes: [
    {
      id: 1,
      lead_id: 1,
      admin_id: 3,
      admin_name: 'Agent V. Vance',
      note: 'Conducted initial background sweep on subject company. High probability of shell transactions detected in UAE filings. Scheduled follow-up consultation.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4)
    },
    {
      id: 2,
      lead_id: 2,
      admin_id: 1,
      admin_name: 'Principal Director',
      note: 'Client confirmed NDA execution. Requested expedited asset verification report ahead of arbitration proceedings.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 18)
    },
    {
      id: 3,
      lead_id: 4,
      admin_id: 2,
      admin_name: 'Executive Director Vance',
      note: 'Engagement agreement signed. Retainer received and transferred to active case dossier #SP-CASE-2026-089.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48)
    }
  ] as { id: number; lead_id: number; admin_id?: number | null; admin_name: string; note: string; created_at: Date }[],

  leads: [
    {
      id: 1,
      full_name: 'Arthur Sterling',
      phone: '+1 (555) 234-8901',
      email: 'a.sterling@sterlingcap.com',
      city: 'New York, NY',
      service_id: 6,
      service_type: 'Corporate Fraud & Embezzlement Probes',
      preferred_date: '2026-09-15',
      preferred_contact_method: 'phone',
      message: 'Suspected internal fraud in regional supply chain department involving over-invoicing and kickback schemes to offshore shell accounts. Need covert forensic audit and asset tracing.',
      consent_given: true,
      status: 'New',
      assigned_to: 3,
      source: 'website',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'corporate_fraud_q3',
      ip_address: '198.51.100.42',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      created_at: new Date(Date.now() - 1000 * 60 * 45),
      updated_at: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
      id: 2,
      full_name: 'Elena Rostova',
      phone: '+44 20 7946 0912',
      email: 'elena.rostova@crestview-legal.co.uk',
      city: 'London, UK',
      service_id: 8,
      service_type: 'Cross-Border Asset Tracing & Recovery',
      preferred_date: '2026-09-12',
      preferred_contact_method: 'encrypted_portal',
      message: 'High court litigation support required to locate luxury yacht and real estate assets held under nominee trusts in Panama and Cyprus.',
      consent_given: true,
      status: 'In Progress',
      assigned_to: 1,
      source: 'linkedin',
      utm_source: 'linkedin_ads',
      utm_medium: 'sponsored_content',
      utm_campaign: 'asset_recovery_emea',
      ip_address: '194.73.12.88',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 22),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 18)
    },
    {
      id: 3,
      full_name: 'David K. Morrison',
      phone: '+1 (555) 442-9981',
      email: 'dmorrison@apexhealth.org',
      city: 'Chicago, IL',
      service_id: 11,
      service_type: 'Technical Surveillance Counter-Measures (TSCM)',
      preferred_date: '2026-09-11',
      preferred_contact_method: 'phone',
      message: 'Urgent requirement for technical RF sweep of board executive suite and C-suite teleconference rooms prior to annual merger summit.',
      consent_given: true,
      status: 'Contacted',
      assigned_to: 2,
      source: 'referral',
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      ip_address: '172.56.21.104',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 36),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12)
    },
    {
      id: 4,
      full_name: 'Victoria Hawthorne',
      phone: '+1 (555) 887-3412',
      email: 'vhawthorne@hawthornelaw.com',
      city: 'San Francisco, CA',
      service_id: 14,
      service_type: 'Digital Forensics & Cyber Threat Attribution',
      preferred_date: '2026-09-14',
      preferred_contact_method: 'email',
      message: 'Former senior executive exfiltrated source code repository and encrypted customer datasets to personal cloud storage. Need bit-stream analysis and forensic court affidavit.',
      consent_given: true,
      status: 'Converted',
      assigned_to: 3,
      source: 'website',
      utm_source: 'bing',
      utm_medium: 'organic',
      utm_campaign: 'digital_forensics',
      ip_address: '108.162.245.91',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2)',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 72),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
      id: 5,
      full_name: 'Rajiv Sengupta',
      phone: '+91 98201 55432',
      email: 'rajiv.sengupta@mumbai-ventures.in',
      city: 'Mumbai, India',
      service_id: 7,
      service_type: 'Strategic Due Diligence & IPR Protection',
      preferred_date: '2026-09-18',
      preferred_contact_method: 'whatsapp',
      message: 'Pre-acquisition reputational vetting and regulatory compliance inspection on founders of target fintech startup.',
      consent_given: true,
      status: 'New',
      assigned_to: null,
      source: 'website',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'due_diligence_apac',
      ip_address: '103.22.201.44',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5)
    },
    {
      id: 6,
      full_name: 'Clara Dupont',
      phone: '+33 1 42 68 55 00',
      email: 'clara.dupont@orange.fr',
      city: 'Paris, France',
      service_id: 4,
      service_type: 'Pre-Matrimonial Background Investigation',
      preferred_date: '2026-09-16',
      preferred_contact_method: 'email',
      message: 'Comprehensive confidential lifestyle and financial veracity check on prospective match before family commitment.',
      consent_given: true,
      status: 'Closed',
      assigned_to: 1,
      source: 'website',
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      ip_address: '185.15.247.19',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 120),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 96)
    },
    {
      id: 7,
      full_name: 'SEO Marketing Bot',
      phone: '+1 (800) 000-0000',
      email: 'bot@randommarketingpromo.xyz',
      city: 'Unknown',
      service_id: 1,
      service_type: 'Missing Persons & Locating',
      preferred_date: null,
      preferred_contact_method: 'email',
      message: 'Buy cheap SEO backlink packages for your investigative agency website now!',
      consent_given: true,
      status: 'Spam',
      assigned_to: null,
      source: 'bot_submission',
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      ip_address: '45.142.122.9',
      user_agent: 'Python-urllib/3.8',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 150),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 150)
    }
  ] as Lead[],

  contactMessages: [
    {
      id: 1,
      name: 'Geraldine Vance',
      email: 'gvance@vanceholdings.com',
      phone: '+1 (555) 789-1029',
      subject: 'Inquiry regarding retainer agreement for ongoing corporate threat intelligence',
      message: 'We are evaluating third-party counter-surveillance partners for our family office headquarters. Kindly provide enterprise briefing materials.',
      status: 'unread',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8)
    },
    {
      id: 2,
      name: 'Marcus Brody',
      email: 'mbrody@brodylegal.com',
      phone: '+1 (555) 341-9088',
      subject: 'Court-admissible digital forensic expert testimony inquiry',
      message: 'Need urgent consultation regarding an ongoing federal civil subpoena involving encrypted server logs.',
      status: 'read',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 30)
    }
  ] as ContactMessage[],
  blogPosts: [
    {
      id: 1,
      title: 'Chain of Custody in Digital Forensics: The ISO/IEC 27037 Standard',
      slug: 'chain-of-custody-digital-forensics-iso-27037',
      category: 'Cyber Forensics',
      excerpt: 'A technical analysis of electronic evidence acquisition protocols required to ensure court-admissibility under international evidentiary rules.',
      content: `## The Imperative of Evidentiary Integrity\n\nIn high-stakes corporate espionage and financial fraud litigation, the authenticity and integrity of digital evidence is frequently the pivotal factor between judicial victory and case dismissal. Digital artifacts—ranging from non-volatile sector copies to volatile RAM dumps—are inherently fragile and vulnerable to claims of spoliation or tampering.\n\n### The Four Pillars of ISO/IEC 27037 Compliance\n\n1. **Identification**: Discerning the exact physical hardware and logical boundaries of the target evidence without alerting unauthorized personnel.\n2. **Collection**: Extracting volatile artifacts in order of volatility (RAM, network sockets, routing tables) before non-volatile drive imaging.\n3. **Acquisition**: Creating bit-stream forensic images verified by SHA-256 and MD5 dual hashing algorithms.\n4. **Preservation**: Storing write-blocked master images in tamper-evident physical vaults with continuous environmental monitoring.\n\n### Practical Implications for Litigation Support\n\nSeekProof forensic operatives maintain an unbroken, double-witnessed chain of custody documentation log for every byte extracted. When litigators present our findings in judicial proceedings, our strict adherence to ISO 27037 guarantees seamless cross-examination defense.`,
      featured_image: '/images/hero-bg.jpg',
      author_id: 3,
      author_name: 'Agent V. Vance (Chief Forensic Examiner)',
      read_time: '6 min read',
      status: 'published',
      meta_title: 'Chain of Custody in Digital Forensics (ISO 27037) | SeekProof',
      meta_description: 'Technical analysis of ISO/IEC 27037 digital forensics evidence handling and court admissibility.',
      published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: 2,
      title: 'Unmasking Shell Companies & Nominee Structures in Asset Recovery',
      slug: 'unmasking-shell-companies-asset-recovery',
      category: 'Asset Tracing',
      excerpt: 'Investigative strategies for piercing corporate veils and tracing concealed capital across multi-jurisdictional offshore havens.',
      content: `## The Modern Landscape of Asset Concealment\n\nSophisticated debtors and bad-faith executives rarely hold luxury real estate, maritime vessels, or liquidity directly under their own names. Instead, multi-tiered nominee corporate structures spanning Panama, Cyprus, the BVI, and Delaware are orchestrated to obstruct standard creditor enforcement.\n\n### Advanced Reconnaissance Methodology\n\n- **Cross-Jurisdictional Registry Synthesis**: Linking beneficial owners across disconnected corporate registers.\n- **Signal Intelligence on Nominee Directors**: Identifying systemic proxy directors used by rogue wealth managers.\n- **Transaction Path Reconstruction**: Correlating banking SWIFT conduits and escrow disbursements.\n\n### Evidentiary Packages for Worldwide Freezing Injunctions\n\nOur asset recovery dossiers provide litigators with actionable intelligence necessary to support Mareva injunctions and worldwide disclosure orders.`,
      featured_image: '/images/office.jpg',
      author_id: 1,
      author_name: 'Principal Director',
      read_time: '8 min read',
      status: 'published',
      meta_title: 'Unmasking Shell Companies & Nominee Structures | SeekProof',
      meta_description: 'Investigative strategies for asset recovery, nominee unmasking, and worldwide freezing injunctions.',
      published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)
    },
    {
      id: 3,
      title: 'Counter-Surveillance & TSCM: Protecting Executive Boardrooms from RF Eavesdropping',
      slug: 'counter-surveillance-tscm-executive-boardroom-defense',
      category: 'Security',
      excerpt: 'An operative brief on spectrum analysis, thermal reconnaissance, and physical sweep countermeasures against hostile corporate eavesdropping.',
      content: `## The Reality of Corporate Espionage\n\nDuring high-stakes M&A negotiations, boardroom discussions are high-value targets for hostile corporate intelligence actors. Modern listening devices utilize burst transmissions, GSM conduits, and optical reflections that evade basic consumer-grade RF detectors.\n\n### Technical Countermeasure Sweeps (TSCM)\n\n1. **RF Spectrum Analysis**: Broad-spectrum sweeps from 10 kHz to 24 GHz detecting pulsed RF and hidden frequency modulations.\n2. **Non-Linear Junction Detection (NLJD)**: Detecting dormant silicon microcircuits embedded in walls, light fixtures, or furniture regardless of active transmission.\n3. **Thermal Infrared Scans**: Uncovering microscopic heat signatures produced by powered internal components.`,
      featured_image: null,
      author_id: 2,
      author_name: 'Executive Director Vance',
      read_time: '5 min read',
      status: 'draft',
      meta_title: 'Executive Boardroom TSCM Counter-Surveillance | SeekProof',
      meta_description: 'Technical surveillance countermeasures and RF bug sweeping for corporate executive facilities.',
      published_at: null,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24)
    }
  ] as BlogPost[],

  settings: {
    site_name: 'SeekProof Private Intelligence',
    contact_email: 'seekproof47@gmail.com',
    contact_phone: '+91 7304679756',
    contact_phone_alt: '+91 9152695373',
    contact_whatsapp: '+91 7304679756',
    emergency_hotline: '+91 7304679756',
    office_address: 'Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021, India',
    encryption_protocol: '256-bit AES PGP Vault Enabled'
  } as Record<string, string>,

  auditLogs: [] as AuditLog[],
  admins: [
    {
      id: 1,
      name: config.adminSeed.name || 'Principal Director',
      email: config.adminSeed.email || 'admin@seekproof.com',
      password_hash: bcrypt.hashSync(config.adminSeed.password || 'Admin@SeekProof2026!', 10),
      role: config.adminSeed.role || 'super_admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Executive Director Vance',
      email: 'director@seekproof.com',
      password_hash: bcrypt.hashSync('Admin@SeekProof2026!', 10),
      role: 'super_admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Agent V. Vance (Chief Investigator)',
      email: 'demo@seekproof.com',
      password_hash: bcrypt.hashSync('Investigate2026!', 10),
      role: 'super_admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ] as Admin[]
};

// ============================================================================
// Service Repository
// ============================================================================
export const ServicesService = {
  async getAll(): Promise<Service[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM services WHERE is_active = TRUE ORDER BY display_order ASC');
      return rows;
    }
    return memoryStore.services.filter(s => s.is_active).sort((a, b) => a.display_order - b.display_order);
  },

  async getAllAdmin(): Promise<Service[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM services ORDER BY display_order ASC, created_at DESC');
      return rows;
    }
    return [...memoryStore.services].sort((a, b) => a.display_order - b.display_order);
  },

  async getById(id: number): Promise<Service | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM services WHERE id = ? LIMIT 1', [id]);
      return rows[0] || null;
    }
    return memoryStore.services.find(s => Number(s.id) === Number(id)) || null;
  },

  async getBySlug(slug: string): Promise<Service | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM services WHERE slug = ? LIMIT 1', [slug]);
      return rows[0] || null;
    }
    return memoryStore.services.find(s => s.slug === slug) || null;
  },

  async create(data: {
    title: string;
    slug: string;
    category?: string;
    shortDescription: string;
    fullDescription: string;
    iconName?: string | null;
    featuredImage?: string | null;
    isFeatured?: boolean;
    isActive?: boolean;
    displayOrder?: number;
    metaTitle?: string | null;
    metaDescription?: string | null;
  }): Promise<{ id: number }> {
    const isFeatured = data.isFeatured ?? false;
    const isActive = data.isActive ?? true;
    const displayOrder = data.displayOrder ?? (memoryStore.services.length + 1);

    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO services (title, slug, category, short_description, full_description, icon_name, featured_image, is_featured, is_active, display_order, meta_title, meta_description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.slug, data.category || 'General', data.shortDescription, data.fullDescription, data.iconName || null, data.featuredImage || null, isFeatured ? 1 : 0, isActive ? 1 : 0, displayOrder, data.metaTitle || null, data.metaDescription || null]
      );
      return { id: res.insertId };
    }

    const newId = memoryStore.services.length + 1;
    const newService: Service = {
      id: newId,
      title: data.title,
      slug: data.slug,
      category: data.category || 'General',
      short_description: data.shortDescription,
      full_description: data.fullDescription,
      icon_name: data.iconName || null,
      featured_image: data.featuredImage || null,
      is_featured: isFeatured,
      is_active: isActive,
      display_order: displayOrder,
      meta_title: data.metaTitle || null,
      meta_description: data.metaDescription || null,
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryStore.services.push(newService);
    return { id: newId };
  },

  async update(id: number, data: Partial<{
    title: string;
    slug: string;
    category: string;
    short_description: string;
    full_description: string;
    icon_name: string | null;
    featured_image: string | null;
    is_featured: boolean;
    is_active: boolean;
    display_order: number;
    meta_title: string | null;
    meta_description: string | null;
  }>): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const fields: string[] = [];
      const values: any[] = [];

      if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
      if (data.slug !== undefined) { fields.push('slug = ?'); values.push(data.slug); }
      if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
      if (data.short_description !== undefined) { fields.push('short_description = ?'); values.push(data.short_description); }
      if (data.full_description !== undefined) { fields.push('full_description = ?'); values.push(data.full_description); }
      if (data.icon_name !== undefined) { fields.push('icon_name = ?'); values.push(data.icon_name); }
      if (data.featured_image !== undefined) { fields.push('featured_image = ?'); values.push(data.featured_image); }
      if (data.is_featured !== undefined) { fields.push('is_featured = ?'); values.push(data.is_featured ? 1 : 0); }
      if (data.is_active !== undefined) { fields.push('is_active = ?'); values.push(data.is_active ? 1 : 0); }
      if (data.display_order !== undefined) { fields.push('display_order = ?'); values.push(data.display_order); }
      if (data.meta_title !== undefined) { fields.push('meta_title = ?'); values.push(data.meta_title); }
      if (data.meta_description !== undefined) { fields.push('meta_description = ?'); values.push(data.meta_description); }

      if (fields.length === 0) return true;
      values.push(id);

      const [res]: any = await pool.query(
        `UPDATE services SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
        values
      );
      return res.affectedRows > 0;
    }

    const item = memoryStore.services.find(s => Number(s.id) === Number(id));
    if (!item) return false;

    if (data.title !== undefined) item.title = data.title;
    if (data.slug !== undefined) item.slug = data.slug;
    if (data.category !== undefined) item.category = data.category;
    if (data.short_description !== undefined) item.short_description = data.short_description;
    if (data.full_description !== undefined) item.full_description = data.full_description;
    if (data.icon_name !== undefined) item.icon_name = data.icon_name;
    if (data.featured_image !== undefined) item.featured_image = data.featured_image;
    if (data.is_featured !== undefined) item.is_featured = data.is_featured;
    if (data.is_active !== undefined) item.is_active = data.is_active;
    if (data.display_order !== undefined) item.display_order = data.display_order;
    if (data.meta_title !== undefined) item.meta_title = data.meta_title;
    if (data.meta_description !== undefined) item.meta_description = data.meta_description;
    item.updated_at = new Date();
    return true;
  },

  async toggleActive(id: number): Promise<boolean> {
    const item = await this.getById(id);
    if (!item) return false;
    return this.update(id, { is_active: !item.is_active });
  },

  async delete(id: number): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query('DELETE FROM services WHERE id = ?', [id]);
      return res.affectedRows > 0;
    }

    const idx = memoryStore.services.findIndex(s => Number(s.id) === Number(id));
    if (idx !== -1) {
      memoryStore.services.splice(idx, 1);
      return true;
    }
    return false;
  }
};

// ============================================================================
// Blog Repository
// ============================================================================
export const BlogService = {
  async getPublished(): Promise<BlogPost[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC");
      return rows;
    }
    return memoryStore.blogPosts
      .filter(p => p.status === 'published')
      .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
  },

  async getAllAdmin(): Promise<BlogPost[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
      return rows;
    }
    return [...memoryStore.blogPosts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getById(id: number): Promise<BlogPost | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [id]);
      return rows[0] || null;
    }
    return memoryStore.blogPosts.find(p => Number(p.id) === Number(id)) || null;
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
      return rows[0] || null;
    }
    return memoryStore.blogPosts.find(p => p.slug === slug) || null;
  },

  async create(data: {
    title: string;
    slug: string;
    category?: string;
    excerpt: string;
    content: string;
    featuredImage?: string | null;
    authorName?: string | null;
    authorId?: number | null;
    readTime?: string | null;
    status?: 'draft' | 'published' | 'archived';
    metaTitle?: string | null;
    metaDescription?: string | null;
    publishedAt?: string | null;
  }): Promise<{ id: number }> {
    const status = data.status || 'draft';
    const publishedAt = status === 'published' ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : (data.publishedAt ? new Date(data.publishedAt) : null);

    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, author_id, author_name, read_time, status, meta_title, meta_description, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.slug, data.category || 'Intelligence', data.excerpt, data.content, data.featuredImage || null, data.authorId || null, data.authorName || 'Intelligence Officer', data.readTime || '5 min read', status, data.metaTitle || null, data.metaDescription || null, publishedAt]
      );
      return { id: res.insertId };
    }

    const newId = memoryStore.blogPosts.length + 1;
    const newPost: BlogPost = {
      id: newId,
      title: data.title,
      slug: data.slug,
      category: data.category || 'Intelligence',
      excerpt: data.excerpt,
      content: data.content,
      featured_image: data.featuredImage || null,
      author_id: data.authorId || null,
      author_name: data.authorName || 'Intelligence Officer',
      read_time: data.readTime || '5 min read',
      status,
      meta_title: data.metaTitle || null,
      meta_description: data.metaDescription || null,
      published_at: publishedAt,
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryStore.blogPosts.unshift(newPost);
    return { id: newId };
  },

  async update(id: number, data: Partial<{
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    author_name: string | null;
    read_time: string | null;
    status: 'draft' | 'published' | 'archived';
    meta_title: string | null;
    meta_description: string | null;
    published_at: Date | null;
  }>): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const fields: string[] = [];
      const values: any[] = [];

      if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
      if (data.slug !== undefined) { fields.push('slug = ?'); values.push(data.slug); }
      if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
      if (data.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(data.excerpt); }
      if (data.content !== undefined) { fields.push('content = ?'); values.push(data.content); }
      if (data.featured_image !== undefined) { fields.push('featured_image = ?'); values.push(data.featured_image); }
      if (data.author_name !== undefined) { fields.push('author_name = ?'); values.push(data.author_name); }
      if (data.read_time !== undefined) { fields.push('read_time = ?'); values.push(data.read_time); }
      if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
      if (data.meta_title !== undefined) { fields.push('meta_title = ?'); values.push(data.meta_title); }
      if (data.meta_description !== undefined) { fields.push('meta_description = ?'); values.push(data.meta_description); }
      if (data.published_at !== undefined) { fields.push('published_at = ?'); values.push(data.published_at); }

      if (fields.length === 0) return true;
      values.push(id);

      const [res]: any = await pool.query(
        `UPDATE blog_posts SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
        values
      );
      return res.affectedRows > 0;
    }

    const item = memoryStore.blogPosts.find(p => Number(p.id) === Number(id));
    if (!item) return false;

    if (data.title !== undefined) item.title = data.title;
    if (data.slug !== undefined) item.slug = data.slug;
    if (data.category !== undefined) item.category = data.category;
    if (data.excerpt !== undefined) item.excerpt = data.excerpt;
    if (data.content !== undefined) item.content = data.content;
    if (data.featured_image !== undefined) item.featured_image = data.featured_image;
    if (data.author_name !== undefined) item.author_name = data.author_name;
    if (data.read_time !== undefined) item.read_time = data.read_time;
    if (data.status !== undefined) {
      item.status = data.status;
      if (data.status === 'published' && !item.published_at) {
        item.published_at = new Date();
      }
    }
    if (data.meta_title !== undefined) item.meta_title = data.meta_title;
    if (data.meta_description !== undefined) item.meta_description = data.meta_description;
    if (data.published_at !== undefined) item.published_at = data.published_at;
    item.updated_at = new Date();
    return true;
  },

  async delete(id: number): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
      return res.affectedRows > 0;
    }

    const idx = memoryStore.blogPosts.findIndex(p => Number(p.id) === Number(id));
    if (idx !== -1) {
      memoryStore.blogPosts.splice(idx, 1);
      return true;
    }
    return false;
  }
};


// ============================================================================
// Leads Repository
// ============================================================================
export const LeadsService = {
  async create(data: {
    fullName: string;
    phone: string;
    email: string;
    city?: string;
    serviceId?: number;
    serviceType?: string;
    preferredDate?: string;
    preferredContactMethod?: string;
    message: string;
    consentGiven: boolean;
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ id: number; message: string }> {
    const defaultStatus = 'New';

    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO leads (full_name, phone, email, city, service_id, preferred_contact_method, message, consent_given, status, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.fullName, 
          data.phone, 
          data.email, 
          data.city || null, 
          data.serviceId || null, 
          data.preferredContactMethod || 'phone', 
          data.message, 
          data.consentGiven ? 1 : 0, 
          defaultStatus, 
          data.source || 'website'
        ]
      );
      return { id: res.insertId, message: 'Consultation request received securely under full NDA protection.' };
    }

    const newId = memoryStore.leads.length + 1;
    const newLead: Lead = {
      id: newId,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      city: data.city || null,
      service_id: data.serviceId || null,
      service_type: data.serviceType || null,
      preferred_date: data.preferredDate || null,
      preferred_contact_method: data.preferredContactMethod || 'phone',
      message: data.message,
      consent_given: data.consentGiven,
      status: defaultStatus,
      assigned_to: null,
      source: data.source || 'website',
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      ip_address: data.ipAddress || null,
      user_agent: data.userAgent || null,
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryStore.leads.unshift(newLead);
    return { id: newId, message: 'Consultation request received securely under full NDA protection.' };
  },

  async getAll(filters?: {
    search?: string;
    status?: string;
    serviceId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Lead[]> {
    let leadsList: Lead[] = [];

    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query(`
        SELECT l.*, a.name AS assigned_admin_name, a.email AS assigned_admin_email, s.title AS service_title
        FROM leads l
        LEFT JOIN admins a ON l.assigned_to = a.id
        LEFT JOIN services s ON l.service_id = s.id
        ORDER BY l.created_at DESC
      `);
      leadsList = rows.map((r: any) => ({
        ...r,
        service_type: r.service_type || r.service_title || 'General Consultation',
        notes: []
      }));
    } else {
      leadsList = memoryStore.leads.map(lead => {
        const assignedAdmin = lead.assigned_to 
          ? memoryStore.admins.find(a => Number(a.id) === Number(lead.assigned_to)) 
          : null;
        const matchedService = lead.service_id
          ? memoryStore.services.find(s => Number(s.id) === Number(lead.service_id))
          : null;
        const leadNotes = (memoryStore.leadNotes || []).filter(n => Number(n.lead_id) === Number(lead.id));

        return {
          ...lead,
          service_type: lead.service_type || (matchedService ? matchedService.title : 'General Consultation'),
          assigned_admin_name: assignedAdmin ? assignedAdmin.name : null,
          assigned_admin_email: assignedAdmin ? assignedAdmin.email : null,
          notes: leadNotes
        };
      });
    }

    if (!filters) return leadsList;

    return leadsList.filter(lead => {
      // Status filter
      if (filters.status && filters.status !== 'all') {
        if (lead.status.toLowerCase() !== filters.status.toLowerCase()) return false;
      }

      // Service filter
      if (filters.serviceId) {
        if (Number(lead.service_id) !== Number(filters.serviceId)) return false;
      }

      // Date range filter
      if (filters.startDate) {
        const leadDate = new Date(lead.created_at);
        const start = new Date(filters.startDate);
        if (leadDate < start) return false;
      }
      if (filters.endDate) {
        const leadDate = new Date(lead.created_at);
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        if (leadDate > end) return false;
      }

      // Search term filter
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchesName = lead.full_name?.toLowerCase().includes(q);
        const matchesEmail = lead.email?.toLowerCase().includes(q);
        const matchesPhone = lead.phone?.toLowerCase().includes(q);
        const matchesCity = lead.city?.toLowerCase().includes(q);
        const matchesService = lead.service_type?.toLowerCase().includes(q);
        const matchesMessage = lead.message?.toLowerCase().includes(q);
        const matchesNotes = lead.notes?.some(n => n.note.toLowerCase().includes(q));

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesCity && !matchesService && !matchesMessage && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  },

  async getById(id: number): Promise<Lead | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query(`
        SELECT l.*, a.name AS assigned_admin_name, a.email AS assigned_admin_email, s.title AS service_title
        FROM leads l
        LEFT JOIN admins a ON l.assigned_to = a.id
        LEFT JOIN services s ON l.service_id = s.id
        WHERE l.id = ? LIMIT 1
      `, [id]);
      if (!rows || rows.length === 0) return null;
      const lead = rows[0];
      return {
        ...lead,
        service_type: lead.service_type || lead.service_title || 'General Consultation',
        notes: []
      };
    }

    const lead = memoryStore.leads.find(l => Number(l.id) === Number(id));
    if (!lead) return null;

    const assignedAdmin = lead.assigned_to 
      ? memoryStore.admins.find(a => Number(a.id) === Number(lead.assigned_to)) 
      : null;
    const matchedService = lead.service_id
      ? memoryStore.services.find(s => Number(s.id) === Number(lead.service_id))
      : null;
    const leadNotes = (memoryStore.leadNotes || []).filter(n => Number(n.lead_id) === Number(lead.id));

    return {
      ...lead,
      service_type: lead.service_type || (matchedService ? matchedService.title : 'General Consultation'),
      assigned_admin_name: assignedAdmin ? assignedAdmin.name : null,
      assigned_admin_email: assignedAdmin ? assignedAdmin.email : null,
      notes: leadNotes
    };
  },

  async updateStatus(id: number, status: string, assignedTo?: number): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        'UPDATE leads SET status = ?, assigned_to = COALESCE(?, assigned_to), updated_at = NOW() WHERE id = ?',
        [status, assignedTo || null, id]
      );
      return res.affectedRows > 0;
    }

    const lead = memoryStore.leads.find(l => Number(l.id) === Number(id));
    if (lead) {
      lead.status = status;
      if (assignedTo !== undefined) {
        lead.assigned_to = assignedTo;
      }
      lead.updated_at = new Date();
      return true;
    }
    return false;
  },

  async assignStaff(id: number, staffId: number | null): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        'UPDATE leads SET assigned_to = ?, updated_at = NOW() WHERE id = ?',
        [staffId, id]
      );
      return res.affectedRows > 0;
    }

    const lead = memoryStore.leads.find(l => Number(l.id) === Number(id));
    if (lead) {
      lead.assigned_to = staffId;
      lead.updated_at = new Date();
      return true;
    }
    return false;
  },

  async addNote(leadId: number, adminId: number | null, adminName: string, note: string): Promise<LeadNote> {
    const newNote: LeadNote = {
      id: (memoryStore.leadNotes?.length || 0) + 1,
      lead_id: leadId,
      admin_id: adminId,
      admin_name: adminName,
      note,
      created_at: new Date()
    };

    if (!memoryStore.leadNotes) {
      memoryStore.leadNotes = [];
    }
    memoryStore.leadNotes.unshift(newNote);
    return newNote;
  },

  async delete(id: number): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query('DELETE FROM leads WHERE id = ?', [id]);
      return res.affectedRows > 0;
    }

    const initialLength = memoryStore.leads.length;
    memoryStore.leads = memoryStore.leads.filter(l => Number(l.id) !== Number(id));
    if (memoryStore.leadNotes) {
      memoryStore.leadNotes = memoryStore.leadNotes.filter(n => Number(n.lead_id) !== Number(id));
    }
    return memoryStore.leads.length < initialLength;
  }
};

// ============================================================================
// Audit Logs Repository
// ============================================================================
export const AuditLogService = {
  async log(entry: {
    adminId?: number | null;
    action: string;
    entityType: string;
    entityId?: string | number | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<number> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO audit_logs (admin_id, action, entity_type, entity_id, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          entry.adminId || null, 
          entry.action, 
          entry.entityType, 
          entry.entityId ? String(entry.entityId) : null, 
          entry.ipAddress || null, 
          entry.userAgent || null
        ]
      );
      return res.insertId;
    }

    const newId = memoryStore.auditLogs.length + 1;
    memoryStore.auditLogs.unshift({
      id: newId,
      admin_id: entry.adminId || null,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId ? String(entry.entityId) : null,
      ip_address: entry.ipAddress || null,
      user_agent: entry.userAgent || null,
      created_at: new Date()
    });
    return newId;
  },

  async getAll(): Promise<AuditLog[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 500');
      return rows;
    }
    return memoryStore.auditLogs;
  }
};

// ============================================================================
// Testimonials Repository
// ============================================================================
export const TestimonialsService = {
  async getPublished(): Promise<Testimonial[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT id, client_name, designation, testimonial_text, rating, image_url, is_published, display_order FROM testimonials WHERE is_published = TRUE ORDER BY display_order ASC');
      return rows;
    }
    return memoryStore.testimonials.filter(t => t.is_published);
  },

  async getAll(): Promise<Testimonial[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC');
      return rows;
    }
    return memoryStore.testimonials;
  },

  async getById(id: number): Promise<Testimonial | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM testimonials WHERE id = ? LIMIT 1', [id]);
      return rows[0] || null;
    }
    return memoryStore.testimonials.find(t => Number(t.id) === Number(id)) || null;
  },

  async create(data: {
    clientName: string;
    designation?: string;
    testimonialText: string;
    rating?: number;
    imageUrl?: string;
    isPublished?: boolean;
    displayOrder?: number;
  }): Promise<{ id: number }> {
    const isPublished = data.isPublished !== undefined ? data.isPublished : false;
    const rating = data.rating || 5;
    const displayOrder = data.displayOrder || 0;

    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO testimonials (client_name, designation, testimonial_text, rating, image_url, is_published, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.clientName, data.designation || null, data.testimonialText, rating, data.imageUrl || null, isPublished, displayOrder]
      );
      return { id: res.insertId };
    }

    const newId = memoryStore.testimonials.length + 1;
    const newTestimonial: Testimonial = {
      id: newId,
      client_name: data.clientName,
      designation: data.designation || '',
      testimonial_text: data.testimonialText,
      rating,
      image_url: data.imageUrl || null,
      is_published: isPublished,
      display_order: displayOrder,
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryStore.testimonials.push(newTestimonial);
    return { id: newId };
  },

  async update(id: number, data: Partial<{
    client_name: string;
    designation: string;
    testimonial_text: string;
    rating: number;
    image_url: string | null;
    is_published: boolean;
    display_order: number;
  }>): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const fields: string[] = [];
      const values: any[] = [];

      if (data.client_name !== undefined) { fields.push('client_name = ?'); values.push(data.client_name); }
      if (data.designation !== undefined) { fields.push('designation = ?'); values.push(data.designation); }
      if (data.testimonial_text !== undefined) { fields.push('testimonial_text = ?'); values.push(data.testimonial_text); }
      if (data.rating !== undefined) { fields.push('rating = ?'); values.push(data.rating); }
      if (data.image_url !== undefined) { fields.push('image_url = ?'); values.push(data.image_url); }
      if (data.is_published !== undefined) { fields.push('is_published = ?'); values.push(data.is_published); }
      if (data.display_order !== undefined) { fields.push('display_order = ?'); values.push(data.display_order); }

      if (fields.length === 0) return true;
      values.push(id);

      const [res]: any = await pool.query(
        `UPDATE testimonials SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
        values
      );
      return res.affectedRows > 0;
    }

    const item = memoryStore.testimonials.find(t => Number(t.id) === Number(id));
    if (!item) return false;
    if (data.client_name !== undefined) item.client_name = data.client_name;
    if (data.designation !== undefined) item.designation = data.designation;
    if (data.testimonial_text !== undefined) item.testimonial_text = data.testimonial_text;
    if (data.rating !== undefined) item.rating = data.rating;
    if (data.image_url !== undefined) item.image_url = data.image_url;
    if (data.is_published !== undefined) item.is_published = data.is_published;
    if (data.display_order !== undefined) item.display_order = data.display_order;
    item.updated_at = new Date();
    return true;
  },

  async delete(id: number): Promise<boolean> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
      return res.affectedRows > 0;
    }
    const idx = memoryStore.testimonials.findIndex(t => Number(t.id) === Number(id));
    if (idx !== -1) {
      memoryStore.testimonials.splice(idx, 1);
      return true;
    }
    return false;
  }
};

// ============================================================================
// Contact Messages Repository
// ============================================================================
export const ContactService = {
  async getAll(): Promise<ContactMessage[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
      return rows;
    }
    return memoryStore.contactMessages;
  },

  async create(data: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<{ id: number }> {
    if (isConnected()) {
      const pool = getPool();
      const [res]: any = await pool.query(
        `INSERT INTO contact_messages (name, email, phone, subject, message, status)
         VALUES (?, ?, ?, ?, ?, 'unread')`,
        [data.name, data.email, data.phone || null, data.subject, data.message]
      );
      return { id: res.insertId };
    }
    const newId = memoryStore.contactMessages.length + 1;
    memoryStore.contactMessages.push({
      id: newId,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      status: 'unread',
      created_at: new Date()
    });
    return { id: newId };
  }
};

// ============================================================================
// Site Settings Repository
// ============================================================================
export const SettingsService = {
  async getPublicSettings(): Promise<Record<string, string>> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT setting_key, setting_value FROM site_settings');
      const settingsMap: Record<string, string> = {};
      for (const row of rows) {
        settingsMap[row.setting_key] = row.setting_value;
      }
      return settingsMap;
    }
    return memoryStore.settings;
  }
};

// ============================================================================
// Admin & Auth Repository
// ============================================================================
export const AdminAuthService = {
  async findByEmail(email: string): Promise<Admin | null> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT * FROM admins WHERE email = ? AND is_active = TRUE LIMIT 1', [email]);
      return rows[0] || null;
    }
    return memoryStore.admins.find(a => a.email.toLowerCase() === email.toLowerCase() && a.is_active) || null;
  },

  async getAllStaff(): Promise<{ id: number; name: string; email: string; role: string }[]> {
    if (isConnected()) {
      const pool = getPool();
      const [rows]: any = await pool.query('SELECT id, name, email, role FROM admins WHERE is_active = TRUE ORDER BY name ASC');
      return rows;
    }
    return memoryStore.admins
      .filter(a => a.is_active)
      .map(a => ({ id: a.id, name: a.name, email: a.email, role: a.role }));
  },

  async updateLastLogin(id: number): Promise<void> {
    if (isConnected()) {
      const pool = getPool();
      await pool.execute('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [id]);
    }
  }
};
