-- ==============================================================================
-- SeekProof Enterprise Relational Database Schema
-- Charset: utf8mb4 | Collation: utf8mb4_unicode_ci | Engine: InnoDB
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS seekproof_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE seekproof_db;

-- ------------------------------------------------------------------------------
-- 1. Table: admins
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_admins_email (email),
    INDEX idx_admins_role (role),
    INDEX idx_admins_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Table: services
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description VARCHAR(500) NOT NULL,
    full_description LONGTEXT NOT NULL,
    icon_name VARCHAR(100) NULL,
    featured_image VARCHAR(500) NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    meta_title VARCHAR(255) NULL,
    meta_description VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_services_slug (slug),
    INDEX idx_services_active_order (is_active, display_order),
    INDEX idx_services_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Table: leads
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(100) NULL,
    service_id BIGINT UNSIGNED NULL,
    preferred_contact_method VARCHAR(50) NOT NULL DEFAULT 'email',
    message TEXT NOT NULL,
    consent_given BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    assigned_to BIGINT UNSIGNED NULL,
    source VARCHAR(100) NOT NULL DEFAULT 'website',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_leads_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_leads_admin FOREIGN KEY (assigned_to) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_leads_email (email),
    INDEX idx_leads_status (status),
    INDEX idx_leads_service (service_id),
    INDEX idx_leads_assigned (assigned_to),
    INDEX idx_leads_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Table: testimonials
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    testimonial_text TEXT NOT NULL,
    rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
    image_url VARCHAR(500) NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_testimonials_published (is_published, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Table: blog_posts
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt VARCHAR(500) NOT NULL,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(500) NULL,
    author_id BIGINT UNSIGNED NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    meta_title VARCHAR(255) NULL,
    meta_description VARCHAR(500) NULL,
    published_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_blog_author FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_blog_slug (slug),
    INDEX idx_blog_status_published (status, published_at),
    INDEX idx_blog_author (author_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Table: contact_messages
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_status (status),
    INDEX idx_contact_email (email),
    INDEX idx_contact_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Table: site_settings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value LONGTEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_settings_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. Table: audit_logs
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT UNSIGNED NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NULL,
    ip_address VARCHAR(45) NULL,
    user_agent VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_audit_admin (admin_id),
    INDEX idx_audit_action (action),
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- SEED DATA: Default Admin, Services, Testimonials, Settings
-- ------------------------------------------------------------------------------

-- Default Super Admin (password: Admin@SeekProof2026! / bcrypt hashed)
INSERT INTO admins (name, email, password_hash, role, is_active)
VALUES (
    'Executive Director',
    'director@seekproof.com',
    '$2a$10$iZg7y9qN76s5K7rO0y46VOUH50dY4uP6Y4dJekZ21rQ98VvH8X7cO',
    'super_admin',
    TRUE
)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Default Production Services
INSERT INTO services (title, slug, short_description, full_description, icon_name, is_featured, is_active, display_order, meta_title, meta_description)
VALUES 
(
    'Corporate Fraud & Internal Embezzlement',
    'corporate-fraud-investigation',
    'Comprehensive forensic inquiries uncovering systemic corporate fraud, kickback schemes, data theft, and executive breach of fiduciary trust.',
    'SeekProof conducts discreet internal corporate investigations for boards of directors, general counsels, and special audit committees. Our operatives uncover complex procurement kickback operations, asset diversion, shadow entities, and intellectual property expropriation. All evidentiary acquisitions follow ISO/IEC 27037 standards and provide court-admissible chain of custody.',
    'Scale',
    TRUE,
    TRUE,
    1,
    'Corporate Fraud Investigation | SeekProof Private Intelligence',
    'Discreet internal corporate fraud and embezzlement investigations with legal-grade evidence standards.'
),
(
    'Digital Forensics & Incident Attribution',
    'digital-forensics-investigation',
    'ISO/IEC 27037 compliant forensic analysis extracting electronic evidence from encrypted systems, shadow cloud accounts, and decentralized networks.',
    'Our cyber forensics lab acquires and analyzes bit-stream forensic images from workstations, mobile devices, remote cloud buckets, and encrypted communication channels. We specialize in exfiltration source attribution, deleted artifact reconstruction, and cryptocurrency transaction tracing for cross-border enforcement.',
    'Cpu',
    TRUE,
    TRUE,
    2,
    'Digital Forensics & Cyber Intelligence | SeekProof',
    'Court-admissible digital forensics, deleted artifact recovery, and cyber threat attribution.'
),
(
    'Technical Surveillance Counter-Measures (TSCM)',
    'tscm-counter-surveillance-sweeps',
    'Tactical electronic sweeps using military-grade RF spectrum analyzers to detect active bugging devices, GPS trackers, and hidden cameras.',
    'TSCM sweeps protect executive boardrooms, off-site negotiation suites, private aircraft, and executive residences against electronic eavesdropping. Using state-of-the-art non-linear junction detectors and broad-spectrum analyzers, our counter-surveillance specialists locate active, passive, and dormant surveillance hardware.',
    'Eye',
    TRUE,
    TRUE,
    3,
    'TSCM Bug Sweeps & Counter Surveillance | SeekProof',
    'Sanitize boardrooms and executive facilities against unauthorized electronic listening devices and bugs.'
),
(
    'Cross-Border Asset Tracing & Recovery',
    'asset-tracing-recovery',
    'Multi-jurisdictional intelligence operations locating concealed offshore funds, maritime vessels, private aircraft, and hidden real estate holdings.',
    'We assist sovereign entities, commercial litigators, and judgment creditors in locating and securing concealed wealth across offshore havens and banking secrecy jurisdictions. By unmasking nominee ownership structures and tracing fund flows, we produce actionable intelligence for global asset freeze orders.',
    'Fingerprint',
    TRUE,
    TRUE,
    4,
    'Global Asset Tracing & Enforcement Support | SeekProof',
    'Locate concealed offshore assets, nominee entities, and real estate for commercial litigation enforcement.'
),
(
    'Strategic Executive & M&A Due Diligence',
    'strategic-due-diligence',
    'Exhaustive background intelligence on target companies and high-profile executives prior to major acquisitions, partnerships, or joint ventures.',
    'Going far beyond public database searches, our human intelligence operatives and forensic analysts uncover undisclosed litigation, regulatory sanction vulnerabilities, hidden liabilities, and reputational risk footprints in high-value cross-border transactions.',
    'Building2',
    FALSE,
    TRUE,
    5,
    'Strategic M&A & Executive Due Diligence | SeekProof',
    'Exhaustive pre-transaction intelligence on corporate entities and executive leadership.'
),
(
    'Covert Tactical Field Surveillance',
    'field-surveillance',
    'High-definition optical lens surveillance and operative field tracking providing verifiable, time-stamped visual proof for legal proceedings.',
    'Conducted by seasoned field operatives with federal background experience, our surveillance teams operate with absolute discretion. We produce court-ready time-stamped 4K video evidence, detailed chronological logs, and sworn affidavits.',
    'Search',
    FALSE,
    TRUE,
    6,
    'Covert Field Surveillance & Evidence Capture | SeekProof',
    'Discreet optical and physical surveillance providing definitive court-ready proof.'
)
ON DUPLICATE KEY UPDATE title=VALUES(title), short_description=VALUES(short_description);

-- Default Testimonials (Institutional Clients)
INSERT INTO testimonials (client_name, designation, testimonial_text, rating, is_published, display_order)
VALUES
(
    'Managing Partner',
    'International Commercial Litigation Practice',
    'SeekProof delivered conclusive digital forensic evidence that decisively resolved our multi-million dollar corporate dispute. Their operational discretion and chain of custody documentation are second to none.',
    5,
    TRUE,
    1
),
(
    'General Counsel',
    'Global Private Investment Firm',
    'Their international asset tracing operatives mapped complex offshore holding structures across multiple banking hubs, directly enabling our legal counsel to obtain freezing injunctions.',
    5,
    TRUE,
    2
),
(
    'Special Committee Chair',
    'Enterprise Technology Group',
    'Prior to our transatlantic acquisition, SeekProof conducted strategic due diligence that uncovered critical undisclosed regulatory exposure, protecting our transaction.',
    5,
    TRUE,
    3
)
ON DUPLICATE KEY UPDATE designation=VALUES(designation);

-- Default Site Settings
INSERT INTO site_settings (setting_key, setting_value)
VALUES
('site_name', 'SeekProof Private Intelligence'),
('contact_email', 'inquiry@seekproof.com'),
('contact_phone', '+1 (800) 555-8328'),
('contact_whatsapp', '+1 (800) 555-8328'),
('office_address', 'Financial District Intelligence Bureau, Suite 4800, New York, NY 10005'),
('emergency_hotline', '+1 (800) 555-SEEK'),
('encryption_protocol', '256-bit AES PGP Vault Enabled')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);
