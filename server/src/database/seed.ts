import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { config } from '../config';

export async function runSeeds() {
  console.log('🌱 [SeekProof Seed] Initializing database seeding...');
  console.log(`📡 Connecting to MySQL database '${config.db.name}' on ${config.db.host}:${config.db.port}...`);

  const connection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
  });

  try {
    // ------------------------------------------------------------------------
    // 1. Seed Super Admin (Read credentials from env, hashed with bcrypt)
    // ------------------------------------------------------------------------
    const adminEmail = config.adminSeed.email;
    const adminRawPassword = config.adminSeed.password;
    const adminName = config.adminSeed.name;
    const adminRole = config.adminSeed.role;

    console.log(`🔐 Hashing secure password for initial admin: ${adminEmail}...`);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminRawPassword, salt);

    const [adminCheck]: any = await connection.execute(
      'SELECT id FROM admins WHERE email = ?',
      [adminEmail]
    );

    if (adminCheck.length === 0) {
      await connection.execute(
        `INSERT INTO admins (name, email, password_hash, role, is_active)
         VALUES (?, ?, ?, ?, TRUE)`,
        [adminName, adminEmail, passwordHash, adminRole]
      );
      console.log(`✅ [Admin Seeded] Initial administrator created: ${adminEmail}`);
    } else {
      await connection.execute(
        `UPDATE admins SET name = ?, password_hash = ?, role = ?, is_active = TRUE WHERE email = ?`,
        [adminName, passwordHash, adminRole, adminEmail]
      );
      console.log(`ℹ️ [Admin Updated] Administrator already exists, updated credentials: ${adminEmail}`);
    }

    // ------------------------------------------------------------------------
    // 2. Seed All 12 Primary Services
    // ------------------------------------------------------------------------
    console.log('📦 Seeding primary investigation services...');

    const services = [
      {
        title: 'Missing Persons',
        slug: 'missing-persons',
        short_description: 'Advanced locating and tracing of missing family members, runaway juveniles, long-lost relatives, and absconding individuals.',
        full_description: 'Our specialized Missing Persons unit employs multi-layered human intelligence, cross-referenced public and specialized databases, field reconnaissance, and digital footprint analysis. Whether finding a missing family member, locating an estranged relative, or tracing individuals who have disappeared under suspicious circumstances, SeekProof operates with extreme diligence, compassion, and speed.',
        icon_name: 'UserSearch',
        display_order: 1,
        meta_title: 'Missing Persons Investigation Services | SeekProof',
        meta_description: 'Professional missing person tracing and location investigations with dedicated field operatives.'
      },
      {
        title: 'Personal Investigation',
        slug: 'personal-investigation',
        short_description: 'Discreet inquiries into individual character, personal habits, daily routines, social circles, and lifestyle veracity.',
        full_description: 'SeekProof provides confidential personal investigations tailored for individuals needing clarity on personal matters. Our discreet operatives document daily activities, verify habits, investigate suspicious associations, and provide photographic and video evidence with utmost confidentiality.',
        icon_name: 'UserCheck',
        display_order: 2,
        meta_title: 'Confidential Personal Investigation Services | SeekProof',
        meta_description: 'Discreet personal investigations and lifestyle checks by licensed private detectives.'
      },
      {
        title: 'Marital Investigations',
        slug: 'marital-investigations',
        short_description: 'Thorough pre-matrimonial background vetting verifying financial status, family reputation, employment, and past conduct.',
        full_description: 'Before taking a life-defining step, ensure total peace of mind. Our Pre-Matrimonial Investigation protocol thoroughly verifies prospective matches, including educational credentials, employment status, family background, financial solvency, previous marital history, and personal character.',
        icon_name: 'HeartHandshake',
        display_order: 3,
        meta_title: 'Pre-Matrimonial Background Investigation | SeekProof',
        meta_description: 'Comprehensive pre-matrimonial background checks and personal verification services.'
      },
      {
        title: 'Post-Matrimonial Investigations',
        slug: 'post-matrimonial-investigations',
        short_description: 'Discreet verification of suspected infidelity, extra-marital affairs, hidden financial accounts, and spousal deceit.',
        full_description: 'When trust is compromised, definitive clarity is necessary. Our operatives conduct non-intrusive, legally compliant physical and digital surveillance to confirm or dispel suspicions of infidelity, undisclosed assets, or secret double lives, delivering irrefutable time-stamped evidence.',
        icon_name: 'ShieldAlert',
        display_order: 4,
        meta_title: 'Post-Matrimonial & Infidelity Investigations | SeekProof',
        meta_description: 'Discreet spousal infidelity and post-matrimonial investigations with legally admissible proof.'
      },
      {
        title: 'Lady Detectives',
        slug: 'lady-detectives',
        short_description: 'Specialized female investigative operatives skilled in high-discretion undercover assignments, sensitive personal inquiries, and domestic vetting.',
        full_description: 'Certain sensitive cases require an intuitive touch and undetectable undercover presence. Our elite team of licensed female private investigators excels in environments where conventional surveillance is conspicuous, providing nuanced intelligence for sensitive personal, marital, and corporate cases.',
        icon_name: 'User',
        display_order: 5,
        meta_title: 'Professional Lady Detective Services | SeekProof',
        meta_description: 'Experienced female private investigators for discreet, sensitive personal and family cases.'
      },
      {
        title: 'Women Detective Services',
        slug: 'women-detective-services',
        short_description: 'Dedicated investigative support for women dealing with domestic harassment, marital fraud, cyberstalking, and asset concealment.',
        full_description: 'Our Women Detective Services unit is specifically dedicated to supporting women facing complex personal challenges. From cyber stalking and extortion to matrimonial deceit and hidden assets during divorce proceedings, we provide compassionate counsel backed by decisive investigative evidence.',
        icon_name: 'Users',
        display_order: 6,
        meta_title: 'Dedicated Women Detective Agency | SeekProof',
        meta_description: 'Confidential and empathetic investigation services tailored for women facing sensitive disputes.'
      },
      {
        title: 'Surveillance',
        slug: 'surveillance',
        short_description: '24/7 mobile and static optical surveillance capturing court-admissible high-definition photo and video documentation.',
        full_description: 'Our surveillance operatives are veterans of state and federal tactical units, operating specialized long-range optical lenses and night-vision equipment. We deliver chronological movement logs, geo-tagged route maps, and high-definition video evidence that withstands scrutiny in court.',
        icon_name: 'Eye',
        display_order: 7,
        meta_title: 'Covert Tactical Surveillance Services | SeekProof',
        meta_description: 'High-definition optical and mobile surveillance providing verifiable, court-ready proof.'
      },
      {
        title: 'Corporate Investigation',
        slug: 'corporate-investigation',
        short_description: 'Internal investigations into corporate fraud, employee embezzlement, procurement kickbacks, and data theft.',
        full_description: 'SeekProof partners with corporate boards, legal counsel, and risk committees to investigate internal corruption, systemic embezzlement, intellectual property theft, and executive misconduct. We provide comprehensive forensic audit trails and expert testimony for litigation.',
        icon_name: 'Building2',
        display_order: 8,
        meta_title: 'Corporate Fraud & Internal Investigations | SeekProof',
        meta_description: 'Discreet corporate fraud, embezzlement, and employee misconduct investigations.'
      },
      {
        title: 'Corporate Security',
        slug: 'corporate-security',
        short_description: 'Comprehensive facility security audits, executive protection logistics, and vulnerability assessments.',
        full_description: 'Protect your enterprise against physical intrusion, executive blackmail, and corporate sabotage. We design and execute end-to-end security audits, access control reviews, VIP transport security protocols, and crisis response frameworks.',
        icon_name: 'ShieldCheck',
        display_order: 9,
        meta_title: 'Corporate Security & Executive Protection | SeekProof',
        meta_description: 'Enterprise security risk audits, facility vulnerability assessments, and executive protection.'
      },
      {
        title: 'Background Checks and Verifications',
        slug: 'background-checks-verifications',
        short_description: 'Rigorous screening of key personnel, executive hires, business partners, domestic staff, and vendors.',
        full_description: 'Prevent disastrous hiring mistakes and fraudulent partnerships. Our multi-stage verification verifies criminal records, civil litigation history, educational credentials, regulatory enforcement sanctions, financial credit health, and real-world reputation.',
        icon_name: 'FileCheck',
        display_order: 10,
        meta_title: 'Comprehensive Background Checks & Verification | SeekProof',
        meta_description: 'In-depth pre-employment, executive, and partner background screening services.'
      },
      {
        title: 'Forensic Analysis and Legal Support',
        slug: 'forensic-analysis-legal-support',
        short_description: 'Digital forensics (ISO 27037), handwriting analysis, document verification, and litigation intelligence.',
        full_description: 'We bridge the gap between technical investigation and courtroom success. Our accredited forensic lab extracts deleted electronic evidence, performs handwriting and signature authenticity analysis, and prepares court-admissible witness statements and forensic affidavits.',
        icon_name: 'Scale',
        display_order: 11,
        meta_title: 'Forensic Analysis & Litigation Support | SeekProof',
        meta_description: 'ISO 27037 digital forensics, document examination, and litigation support services.'
      },
      {
        title: 'Due Diligence and IPR',
        slug: 'due-diligence-ipr',
        short_description: 'Strategic M&A risk intelligence, anti-counterfeiting operations, patent infringement probes, and trademark defense.',
        full_description: 'Safeguard your intellectual property and capital investments. We conduct deep-dive due diligence on cross-border acquisition targets and execute covert market raids, factory tracing, and supply chain audits to neutralize counterfeiters and patent infringers.',
        icon_name: 'Fingerprint',
        display_order: 12,
        meta_title: 'Due Diligence & Intellectual Property (IPR) Protection | SeekProof',
        meta_description: 'Strategic pre-transaction due diligence, counterfeit supply chain tracing, and IPR enforcement.'
      }
    ];

    for (const service of services) {
      await connection.execute(
        `INSERT INTO services (
          title, slug, short_description, full_description, icon_name,
          is_featured, is_active, display_order, meta_title, meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          title = VALUES(title),
          short_description = VALUES(short_description),
          full_description = VALUES(full_description),
          icon_name = VALUES(icon_name),
          display_order = VALUES(display_order),
          meta_title = VALUES(meta_title),
          meta_description = VALUES(meta_description),
          is_active = VALUES(is_active)`,
        [
          service.title,
          service.slug,
          service.short_description,
          service.full_description,
          service.icon_name,
          service.display_order <= 6, // feature top 6
          true,
          service.display_order,
          service.meta_title,
          service.meta_description
        ]
      );
    }
    console.log(`✅ [Services Seeded] Successfully seeded all ${services.length} primary investigation disciplines.`);

    // ------------------------------------------------------------------------
    // 3. Seed Required Testimonials (Rajesh Sharma, Vikram Mehta, Priya Patel)
    // ------------------------------------------------------------------------
    console.log('💬 Seeding client testimonials...');

    const testimonials = [
      {
        client_name: 'Rajesh Sharma',
        designation: 'Senior Director, Corporate Governance',
        testimonial_text: 'SeekProof demonstrated absolute professionalism and discretion when investigating a major procurement irregularity in our supply chain. Their forensic documentation was clear, undeniable, and enabled us to take swift legal action.',
        rating: 5,
        display_order: 1
      },
      {
        client_name: 'Vikram Mehta',
        designation: 'Managing Partner, Mehta & Associates Legal Counsel',
        testimonial_text: 'In high-stakes commercial litigation, evidentiary integrity is everything. SeekProof delivered court-admissible proof with an unbroken chain of custody. Their team is our go-to intelligence partner.',
        rating: 5,
        display_order: 2
      },
      {
        client_name: 'Priya Patel',
        designation: 'Private Client',
        testimonial_text: 'Dealing with a sensitive family matter was overwhelming, but the lady detective team at SeekProof handled my case with immense empathy, patience, and complete confidentiality. I am truly grateful for their support.',
        rating: 5,
        display_order: 3
      }
    ];

    for (const t of testimonials) {
      const [existing]: any = await connection.execute(
        'SELECT id FROM testimonials WHERE client_name = ?',
        [t.client_name]
      );

      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO testimonials (client_name, designation, testimonial_text, rating, is_published, display_order)
           VALUES (?, ?, ?, ?, TRUE, ?)`,
          [t.client_name, t.designation, t.testimonial_text, t.rating, t.display_order]
        );
      } else {
        await connection.execute(
          `UPDATE testimonials 
           SET designation = ?, testimonial_text = ?, rating = ?, is_published = TRUE, display_order = ?
           WHERE client_name = ?`,
          [t.designation, t.testimonial_text, t.rating, t.display_order, t.client_name]
        );
      }
    }
    console.log(`✅ [Testimonials Seeded] Successfully seeded ${testimonials.length} client testimonials.`);

    // ------------------------------------------------------------------------
    // 4. Seed Site Settings
    // ------------------------------------------------------------------------
    const siteSettings = [
      { key: 'site_name', value: 'SeekProof Private Intelligence' },
      { key: 'contact_email', value: 'inquiry@seekproof.com' },
      { key: 'contact_phone', value: '+1 (800) 555-8328' },
      { key: 'contact_whatsapp', value: '+1 (800) 555-8328' },
      { key: 'office_address', value: 'Financial District Intelligence Bureau, Suite 4800, New York, NY 10005' },
      { key: 'emergency_hotline', value: '+1 (800) 555-SEEK' },
      { key: 'encryption_protocol', value: '256-bit AES PGP Vault Enabled' }
    ];

    for (const setting of siteSettings) {
      await connection.execute(
        `INSERT INTO site_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [setting.key, setting.value]
      );
    }
    console.log(`✅ [Settings Seeded] Successfully seeded default site settings.`);

    console.log('🎉 [SeekProof Seed] Database seed completed successfully!');
  } catch (error: any) {
    console.error('❌ [SeekProof Seed] Seeding error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

// Execute directly if run via CLI
if (require.main === module) {
  runSeeds()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
