-- SeekProof Database Schema Migration 001
-- Description: Initial Core Schema for Users, Inquiries, Cases, Evidence, and Logs

CREATE DATABASE IF NOT EXISTS seekproof_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE seekproof_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role ENUM('client', 'investigator', 'admin') DEFAULT 'client',
    agency_tier ENUM('standard', 'priority', 'vip_corporate') DEFAULT 'standard',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- 2. Inquiries Table (Confidential Public Inquiries)
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    case_type ENUM(
        'corporate_fraud',
        'background_intelligence',
        'surveillance',
        'digital_forensics',
        'asset_recovery',
        'infidelity_marital',
        'counter_surveillance',
        'other'
    ) NOT NULL DEFAULT 'other',
    service_requested VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency ENUM('routine', 'time_sensitive', 'immediate_threat') DEFAULT 'routine',
    status ENUM('pending', 'reviewed', 'converted_to_case', 'declined') DEFAULT 'pending',
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_inquiry_status (status),
    INDEX idx_inquiry_created (created_at)
) ENGINE=InnoDB;

-- 3. Cases Table
CREATE TABLE IF NOT EXISTS cases (
    id VARCHAR(36) PRIMARY KEY,
    case_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    case_type ENUM(
        'corporate_fraud',
        'background_intelligence',
        'surveillance',
        'digital_forensics',
        'asset_recovery',
        'infidelity_marital',
        'counter_surveillance',
        'other'
    ) NOT NULL,
    status ENUM(
        'inquiry',
        'under_review',
        'active_investigation',
        'evidence_gathering',
        'reporting',
        'closed'
    ) DEFAULT 'under_review',
    priority ENUM('standard', 'high', 'urgent', 'critical') DEFAULT 'standard',
    confidentiality_level ENUM('confidential', 'secret', 'top_secret') DEFAULT 'confidential',
    client_id VARCHAR(36) NOT NULL,
    lead_investigator_id VARCHAR(36),
    progress_percentage INT DEFAULT 0,
    target_subject VARCHAR(255),
    location VARCHAR(255),
    estimated_completion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lead_investigator_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_case_number (case_number),
    INDEX idx_case_status (status),
    INDEX idx_case_client (client_id)
) ENGINE=InnoDB;

-- 4. Evidence Files / Milestones
CREATE TABLE IF NOT EXISTS evidence_files (
    id VARCHAR(36) PRIMARY KEY,
    case_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_type ENUM('document', 'image', 'video', 'audio', 'forensic_dump', 'report') NOT NULL,
    file_url VARCHAR(512) NOT NULL,
    file_size_bytes BIGINT,
    checksum_sha256 VARCHAR(64),
    classification ENUM('unclassified', 'restricted', 'strictly_confidential') DEFAULT 'restricted',
    uploaded_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_evidence_case (case_id)
) ENGINE=InnoDB;

-- 5. Audit and Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    case_id VARCHAR(36),
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activity_case (case_id),
    INDEX idx_activity_user (user_id)
) ENGINE=InnoDB;
