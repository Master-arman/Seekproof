export interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  heroTagline: string;
  overview: string;
  whoNeedsThis?: string[];
  keyDeliverables: string[];
  methodology: {
    step: string;
    title: string;
    description: string;
  }[];
  caseExample: {
    title: string;
    result: string;
    metrics: string;
  };
  confidentialityStatement?: string;
  legalLimitations?: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'corporate-fraud',
    title: 'Corporate Fraud & Internal Embezzlement',
    category: 'Corporate Intelligence',
    shortDesc: 'Internal forensic investigations into systemic corporate fraud, procurement kickback schemes, data theft, and executive breach of fiduciary duty.',
    heroTagline: 'Investigating internal corporate fraud, fiduciary breaches, and procurement kickbacks with documented evidence.',
    overview: 'Corporate corruption and systemic embezzlement erode enterprise value and expose leadership to serious legal liabilities. SeekProof works with forensic accountants, certified fraud examiners, and digital specialists to trace illicit transaction chains, analyze vendor collusion, and document internal misconduct.',
    whoNeedsThis: [
      'Corporate General Counsel & In-House Legal Teams',
      'Audit Committees & Boards of Directors',
      'Chief Financial Officers & Compliance Directors',
      'Commercial Litigation Attorneys'
    ],
    keyDeliverables: [
      'Forensic accounting audit trail with itemized ledger discrepancies',
      'Documentation of vendor networks and kickback transaction conduits',
      'Forensic extraction of emails, ledgers, and communication logs',
      'Court-admissible investigative affidavits for civil and criminal proceedings',
      'Internal control vulnerability remediation report'
    ],
    methodology: [
      {
        step: '01',
        title: 'Scope Definition & Data Preservation',
        description: 'Securing server logs, accounting databases, and relevant email records without disrupting daily business operations.'
      },
      {
        step: '02',
        title: 'Forensic Audit & Transaction Mapping',
        description: 'Mapping irregular transaction flows, vendor address overlaps, and unauthorized payment approvals.'
      },
      {
        step: '03',
        title: 'Witness Interviews & Corroboration',
        description: 'Conducting structured witness interviews and corroborating statements against financial and digital records.'
      },
      {
        step: '04',
        title: 'Evidentiary Dossier Handover',
        description: 'Delivering a finalized legal-grade dossier with complete chain-of-custody documentation for executive leadership and counsel.'
      }
    ],
    caseExample: {
      title: 'Multinational Manufacturing Procurement Fraud',
      result: 'Documented a 4-year $12.4M phantom vendor scheme operated by two division vice presidents.',
      metrics: '100% Civil Recovery & Criminal Referrals Accepted'
    },
    confidentialityStatement: 'All corporate fraud inquiries are governed by mutual Non-Disclosure Agreements (NDA) prior to intake. Digital records are stored in access-controlled, encrypted vaults with strict chain-of-custody tracking.',
    legalLimitations: 'SeekProof operates strictly within statutory limits. All forensic analysis is conducted on company-owned infrastructure with authorized access or via court-ordered discovery. We do not engage in unauthorized wiretapping or illicit cyber access.',
    faqs: [
      {
        question: 'How do you ensure employees are not tipped off during the investigation?',
        answer: 'We operate through secured remote data mirroring and off-hours forensic imaging, maintaining zero disruption to day-to-day operations.'
      },
      {
        question: 'Are your findings admissible in commercial litigation?',
        answer: 'Yes. All evidence is gathered in compliance with statutory rules of evidence and ISO/IEC 27037 standards, accompanied by expert witness affidavits.'
      }
    ]
  },
  {
    slug: 'digital-forensics',
    title: 'Digital Forensics & Incident Response',
    category: 'Cyber & OSINT',
    shortDesc: 'ISO/IEC 27037 compliant forensic analysis extracting court-admissible electronic evidence from devices, cloud servers, and communication logs.',
    heroTagline: 'Extracting and analyzing digital evidence from corporate devices, servers, and cloud accounts following data theft or security incidents.',
    overview: 'When data exfiltration or unauthorized access occurs, establishing the exact timeline, source, and scope of the intrusion is critical. Our certified forensic analysts operate dedicated extraction suites to preserve, decrypt, and analyze volatile memory, deleted artifacts, and audit logs in compliance with ISO/IEC 27037 standards.',
    whoNeedsThis: [
      'In-House Legal Counsel & Incident Response Teams',
      'Chief Information Security Officers (CISOs)',
      'Litigation Teams Requiring Electronic Discovery (eDiscovery)',
      'Organizations Handling Trade Secret Breaches'
    ],
    keyDeliverables: [
      'Bit-stream disk and physical mobile device forensic imaging',
      'Volatile RAM extraction and kernel memory analysis',
      'Attribution of unauthorized remote access conduits and user accounts',
      'Cryptographic hash verification (SHA-256) for all extracted media',
      'Comprehensive forensic expert witness reports'
    ],
    methodology: [
      {
        step: '01',
        title: 'Evidence Preservation',
        description: 'Applying forensic write-blocking hardware and cryptographic hash verification (SHA-256) to target media.'
      },
      {
        step: '02',
        title: 'Artifact Extraction',
        description: 'Reconstructing deleted partitions, unallocated disk sectors, and encrypted messaging databases.'
      },
      {
        step: '03',
        title: 'Timeline & Activity Mapping',
        description: 'Cross-referencing event logs to establish a chronological timeline of user actions.'
      },
      {
        step: '04',
        title: 'Final Evidentiary Report',
        description: 'Preparing forensic documentation formatted for judicial scrutiny and regulatory disclosure.'
      }
    ],
    caseExample: {
      title: 'Proprietary Source Code Exfiltration',
      result: 'Identified an overseas engineer exfiltrating proprietary training models via encrypted steganography within 48 hours.',
      metrics: '4.2 TB Exfiltrated IP Successfully Recovered'
    },
    confidentialityStatement: 'All forensic acquisitions are handled on air-gapped forensic workstations with strict access logging and cryptographic verification.',
    legalLimitations: 'Digital forensic examinations are conducted exclusively on devices and systems for which the client has lawful ownership, administrative authority, or a court subpoena.',
    faqs: [
      {
        question: 'Can you recover data from wiped or formatted devices?',
        answer: 'In many cases, yes. Our lab utilizes sector-level carving techniques to extract artifacts from unallocated clusters even after partial wiping.'
      },
      {
        question: 'Do you analyze cloud environments like AWS, Azure, and Google Workspace?',
        answer: 'Yes. We conduct cloud-native digital forensics, analyzing audit logs, API telemetry, and multi-tenant storage snapshots.'
      }
    ]
  },
  {
    slug: 'asset-recovery',
    title: 'Cross-Border Asset Tracing & Recovery',
    category: 'Financial Intelligence',
    shortDesc: 'Financial investigations locating concealed bank accounts, nominee-held properties, corporate shares, and real assets across international jurisdictions.',
    heroTagline: 'Locating hidden bank accounts, real estate holdings, and corporate shell conduits across offshore jurisdictions.',
    overview: 'Debtors and adverse parties often use nominee companies, offshore trusts, and multi-jurisdictional shell corporations to evade court judgments. SeekProof combines public registry records, financial forensic analysis, and field inquiries to trace and legally freeze concealed wealth.',
    whoNeedsThis: [
      'Judgment Creditors & Commercial Litigators',
      'Insolvency Practitioners & Court-Appointed Receivers',
      'High-Net-Worth Individuals in Asset Disputes',
      'Corporate Risk & Recovery Teams'
    ],
    keyDeliverables: [
      'Identification of ultimate beneficial ownership structures',
      'Real estate, maritime vessel, and aviation registry intelligence',
      'Offshore corporate directorship and correspondent conduit mapping',
      'Pre-litigation asset viability and recoverability assessments',
      'Sworn affidavits supporting Worldwide Freezing Orders (WFO)'
    ],
    methodology: [
      {
        step: '01',
        title: 'Entity Mapping & Registry Research',
        description: 'Reviewing corporate registries, court filings, and regulatory databases across relevant offshore jurisdictions.'
      },
      {
        step: '02',
        title: 'Beneficial Ownership Identification',
        description: 'Identifying ultimate beneficial owners (UBO) hidden behind nominee directors and trust proxies.'
      },
      {
        step: '03',
        title: 'Physical Asset Verification',
        description: 'Field verification of real property, luxury vessels, aircraft locations, and physical custody.'
      },
      {
        step: '04',
        title: 'Judicial Enforcement Support',
        description: 'Coordinating evidentiary packages with legal counsel to support freezing injunctions and attachment orders.'
      }
    ],
    caseExample: {
      title: '$48.5M Judgment Enforcement',
      result: 'Identified 11 shell companies and luxury Dubai real estate held under trust proxies, enabling multi-jurisdiction asset freezes.',
      metrics: '$48.5M Assets Frozen in 14 Days'
    },
    confidentialityStatement: 'All financial intelligence inquiries are conducted under strict non-disclosure protections. We do not use illegal financial pretexting or compromised banking access.',
    legalLimitations: 'Asset tracing is conducted via lawful open-source intelligence, public registries, corporate disclosures, and legal discovery channels in accordance with international financial regulations.',
    faqs: [
      {
        question: 'Which offshore jurisdictions do you cover?',
        answer: 'We cover major financial centers and offshore jurisdictions across the Caribbean (BVI, Cayman, Bahamas), Europe (Switzerland, Liechtenstein, Luxembourg, UK, Cyprus), the Middle East (UAE), and APAC.'
      },
      {
        question: 'Can asset tracing reports be submitted to court for freezing orders?',
        answer: 'Yes. Our intelligence dossiers are structured to satisfy the evidentiary threshold required for Anton Piller and Mareva injunctions.'
      }
    ]
  },
  {
    slug: 'counter-surveillance',
    title: 'Technical Surveillance Counter-Measures (TSCM)',
    category: 'Physical & Electronic Defense',
    shortDesc: 'Technical electronic sweeps using calibrated spectrum analyzers to inspect corporate boardrooms, executive offices, and private transport.',
    heroTagline: 'Detecting and removing unauthorized listening devices, hidden optical lenses, and RF transmitters.',
    overview: 'Corporate boardrooms, legal war rooms, and executive residences are targets for electronic eavesdropping. SeekProof provides technical surveillance counter-measures (TSCM) to detect active, dormant, and burst-transmission surveillance devices.',
    whoNeedsThis: [
      'Corporate Boards of Directors Prior to M&A Transactions',
      'Law Firms Handling Confidential Litigation War Rooms',
      'Family Offices & C-Suite Executives',
      'Government Contractors & Financial Institutions'
    ],
    keyDeliverables: [
      'Full-spectrum RF analysis from 10 kHz to 24 GHz',
      'Non-linear junction detection (NLJD) for deactivated or dormant electronics',
      'Thermal imaging and acoustic leak vulnerability assessment',
      'Physical inspection of structural voids, wiring conduits, and HVAC ducts',
      'Post-sweep technical report with perimeter hardening recommendations'
    ],
    methodology: [
      {
        step: '01',
        title: 'Ambient RF Baseline',
        description: 'Measuring and filtering all authorized radio frequencies, Wi-Fi networks, and cellular signals.'
      },
      {
        step: '02',
        title: 'Non-Linear Junction Sweep',
        description: 'Transmitting microwave harmonics to detect silicon semiconductors in hidden micro-cameras, whether powered on or off.'
      },
      {
        step: '03',
        title: 'Physical & Optical Inspection',
        description: 'Using endoscopic lenses and thermal cameras to inspect wall cavities, smoke detectors, ceiling tiles, and telephone lines.'
      },
      {
        step: '04',
        title: 'Reporting & Hardening',
        description: 'Documenting detected devices with chain of custody and providing physical security hardening guidelines.'
      }
    ],
    caseExample: {
      title: 'Hostile Takeover Boardroom Sweep',
      result: 'Detected and removed an active GSM burst transmitter concealed inside a boardroom power conduit prior to critical $220M M&A negotiations.',
      metrics: 'Sanitized Within 6 Hours • Deal Protected'
    },
    confidentialityStatement: 'TSCM sweeps are conducted off-hours under strict non-disclosure. Sweep logs and frequency baselines are encrypted and delivered directly to designated corporate officers.',
    legalLimitations: 'TSCM sweeps are performed exclusively on premises, vehicles, or aircraft owned, leased, or legally controlled by the commissioning client.',
    faqs: [
      {
        question: 'How often should a corporate boardroom be swept?',
        answer: 'For high-risk environments, we recommend quarterly sweeps and pre-meeting sweeps before sensitive board sessions or transaction closings.'
      },
      {
        question: 'Can you sweep executive vehicles and aircraft?',
        answer: 'Yes. We inspect vehicles for GPS trackers and examine aircraft cabins for covert recording hardware.'
      }
    ]
  },
  {
    slug: 'due-diligence',
    title: 'Strategic M&A and C-Suite Due Diligence',
    category: 'Risk Mitigation',
    shortDesc: 'Background intelligence on companies and key executives prior to acquisitions, mergers, joint ventures, or board appointments.',
    heroTagline: 'Objective background intelligence on commercial partners, executive histories, and undisclosed liabilities.',
    overview: 'Standard background checks rarely identify hidden liabilities. SeekProof conducts thorough due diligence to document undeclared conflicts of interest, past litigation, regulatory sanctions, adverse media, and unrecorded financial liabilities before transactions close.',
    whoNeedsThis: [
      'Private Equity & Venture Capital Investment Teams',
      'Corporate M&A Directors & General Counsel',
      'Nomination & Governance Committees',
      'Joint Venture & Franchise Partners'
    ],
    keyDeliverables: [
      'Global civil and criminal court record search',
      'Regulatory compliance, sanction list, and PEP screening',
      'Undisclosed corporate directorships and conflict mapping',
      'Discreet source inquiries with industry peers and former associates',
      'Executive risk assessment matrix with actionable recommendations'
    ],
    methodology: [
      {
        step: '01',
        title: 'Public Records & Registry Search',
        description: 'Systematic review of government registries, court filings, and official corporate filings across relevant jurisdictions.'
      },
      {
        step: '02',
        title: 'Regulatory & Sanctions Screening',
        description: 'Checking regulatory enforcement databases, sanctioned party lists, and international compliance registries.'
      },
      {
        step: '03',
        title: 'Discreet Human Source Inquiries',
        description: 'Conducting structured, confidential peer inquiries without alerting the subject or market competitors.'
      },
      {
        step: '04',
        title: 'Executive Risk Briefing',
        description: 'Delivering an executive summary highlighting verified facts, red flags, and transaction risks.'
      }
    ],
    caseExample: {
      title: 'Pre-Acquisition Executive Vetting',
      result: 'Identified undisclosed foreign sanction exposure and active shareholder litigation in an acquisition target.',
      metrics: 'Prevented $35M Regulatory Fine'
    },
    confidentialityStatement: 'All due diligence inquiries are conducted with strict operational discretion. Target entities and candidates are not alerted during preliminary intelligence gathering.',
    legalLimitations: 'All inquiries comply with fair credit reporting standards, GDPR, and statutory employment screening regulations. Consents are obtained where required by law.',
    faqs: [
      {
        question: 'How discreet is the due diligence process?',
        answer: 'Completely confidential. We do not contact the subject entity directly or compromise commercial confidentiality during preliminary scoping.'
      },
      {
        question: 'What is the typical turnaround time for an executive dossier?',
        answer: 'Standard due diligence dossiers take 5-7 business days; expedited turnaround is available within 48-72 hours for urgent transactions.'
      }
    ]
  },
  {
    slug: 'surveillance-field',
    title: 'Covert Field Surveillance',
    category: 'Field Operations',
    shortDesc: 'Discreet physical surveillance executed by licensed field investigators using high-resolution optical equipment and timestamped video logs.',
    heroTagline: 'Lawful ground surveillance delivering documented photographic and video evidence.',
    overview: 'When physical proof is needed to verify individual activities, establish daily routines, or document meetings, SeekProof field operatives provide discreet, lawful surveillance supported by timestamped optical equipment.',
    whoNeedsThis: [
      'Insurance Fraud & Workers Compensation Defense Teams',
      'Family Law Attorneys in Matrimonial & Custody Disputes',
      'Corporate Security Teams Investigating IP Leakage',
      'Private Individuals Requiring Verified Activity Proof'
    ],
    keyDeliverables: [
      'Static and mobile observation logs',
      'Time-stamped high-definition photo and video documentation',
      'Detailed chronological activity reports',
      'Associate identification and location documentation',
      'Sworn investigator affidavits for courtroom submission'
    ],
    methodology: [
      {
        step: '01',
        title: 'Pre-Surveillance Planning',
        description: 'Reviewing subject routines, site layout, exit points, and environmental factors.'
      },
      {
        step: '02',
        title: 'Field Team Deployment',
        description: 'Positioning matched field investigators with discrete observation vehicles.'
      },
      {
        step: '03',
        title: 'Evidence Gathering',
        description: 'Recording clear optical proof while remaining strictly within lawful observation boundaries in public spaces.'
      },
      {
        step: '04',
        title: 'Log Compilation & Verification',
        description: 'Compiling video evidence, verifying metadata timestamps, and drafting sworn affidavits.'
      }
    ],
    caseExample: {
      title: 'High-Value Worker Compensation Fraud',
      result: 'Documented subject engaging in strenuous physical commercial activity while claiming permanent disability.',
      metrics: '$1.8M Fraudulent Claim Dismissed'
    },
    confidentialityStatement: 'All field logs and visual records are encrypted upon capture. Video files are maintained with unbroken chain-of-custody verification.',
    legalLimitations: 'Surveillance is conducted strictly from public vantage points in full compliance with state and federal privacy statutes. We do not trespass on private property or place unlawful tracking devices.',
    faqs: [
      {
        question: 'Are surveillance recordings legally admissible in court?',
        answer: 'Yes. All surveillance is conducted from public vantage points adhering strictly to privacy statutes and chain of custody rules.'
      },
      {
        question: 'What happens if a subject becomes suspicious?',
        answer: 'Our operatives follow strict counter-surveillance protocols and disengage immediately to protect case integrity.'
      }
    ]
  },
  {
    slug: 'missing-persons',
    title: 'Missing Persons & Locating',
    category: 'Personal Intelligence',
    shortDesc: 'Locating and tracing missing family members, runaway juveniles, long-lost relatives, and witnesses for litigation.',
    heroTagline: 'Locating missing individuals and tracing contacts through structured record analysis and field inquiries.',
    overview: 'Locating missing relatives or individuals who have intentionally relocated requires coordinated analysis of public records, utility registrations, and local field inquiries. SeekProof deploys licensed investigators to trace movements and establish verified contact parameters.',
    whoNeedsThis: [
      'Families Searching for Missing Relatives or Runaway Juveniles',
      'Attorneys Seeking Critical Witnesses or Defendants for Subpoena Service',
      'Beneficiaries and Heirs of Estates in Probate Proceedings',
      'Creditors Locating Absconding Debtors'
    ],
    keyDeliverables: [
      'Address history and digital footprint verification',
      'On-site field verification by local investigators',
      'Cross-referenced national database and public registry searches',
      'Locating report with verified current coordinates',
      'Safe contact facilitation protocols'
    ],
    methodology: [
      {
        step: '01',
        title: 'Intake & Data Compilation',
        description: 'Collecting all known identifying details, past addresses, vehicle records, and last known sightings.'
      },
      {
        step: '02',
        title: 'Database & Registry Search',
        description: 'Searching public record repositories, utility registrations, and court filings across relevant jurisdictions.'
      },
      {
        step: '03',
        title: 'Field Verification',
        description: 'Deploying local investigators to confirm subject presence and current circumstances.'
      },
      {
        step: '04',
        title: 'Reporting & Client Handover',
        description: 'Providing a verified locating report with actionable contact parameters.'
      }
    ],
    caseExample: {
      title: 'Cross-State Missing Minor Recovery',
      result: 'Located a missing juvenile across three states within 36 hours of intake, ensuring safe return.',
      metrics: 'Found Within 36 Hours • Safe Resolution'
    },
    confidentialityStatement: 'Missing persons inquiries are conducted with sensitivity. In personal locating cases, contact is facilitated respecting safety and legal welfare standards.',
    legalLimitations: 'We do not locate individuals on behalf of parties subject to active restraining orders or for purposes of harassment.',
    faqs: [
      {
        question: 'How quickly can an investigator begin working on a missing person case?',
        answer: 'Cases involving missing family members or vulnerable individuals are prioritized immediately, with preliminary triage beginning within hours.'
      },
      {
        question: 'Can you trace individuals who have intentionally relocated?',
        answer: 'Yes. Our investigators trace address histories, utility registrations, property records, and occupational licenses.'
      }
    ]
  },
  {
    slug: 'personal-investigation',
    title: 'Personal Investigation & Character Checks',
    category: 'Private Inquiries',
    shortDesc: 'Discreet inquiries into individual background claims, daily routines, associations, and lifestyle veracity.',
    heroTagline: 'Documenting daily routines, associations, and background facts for legal, personal, and financial decisions.',
    overview: 'When personal, financial, or domestic matters require verified facts, SeekProof conducts discreet investigations to confirm background claims, daily routines, and lifestyle veracity.',
    whoNeedsThis: [
      'Individuals Making High-Value Personal or Financial Commitments',
      'Family Trustees & Estate Administrators',
      'Litigants Requiring Corroborating Character Evidence',
      'Private Clients Resolving Family Uncertainties'
    ],
    keyDeliverables: [
      'Daily routine and activity documentation',
      'Social circle, associate, and habit verification',
      'High-definition photographic and video evidence',
      'Confidential background and lifestyle report',
      'Sworn investigator summary affidavit'
    ],
    methodology: [
      {
        step: '01',
        title: 'Scope & Boundary Setting',
        description: 'Defining clear investigative objectives, statutory boundaries, and confidentiality parameters.'
      },
      {
        step: '02',
        title: 'Discreet Observation & Inquiries',
        description: 'Conducting non-intrusive observation in public spaces and verifying background records.'
      },
      {
        step: '03',
        title: 'Evidence Corroboration',
        description: 'Comparing observed activities against stated claims and documentary records.'
      },
      {
        step: '04',
        title: 'Report Delivery',
        description: 'Delivering an encrypted report with timestamped proof and investigator summary.'
      }
    ],
    caseExample: {
      title: 'High-Net-Worth Beneficiary Verification',
      result: 'Documented misrepresentations regarding commercial assets prior to trust disbursement.',
      metrics: '$4.2M Trust Assets Protected'
    },
    confidentialityStatement: 'All personal investigations are protected under strict Non-Disclosure Agreements. We maintain zero-knowledge storage protocols upon case completion.',
    legalLimitations: 'All inquiries strictly adhere to applicable privacy statutes. We do not access protected financial records without authorization or engage in unlawful surveillance.',
    faqs: [
      {
        question: 'Will the subject find out they are being investigated?',
        answer: 'No. All field observation and database research are conducted discreetly without notifying the subject.'
      },
      {
        question: 'What type of evidence is delivered?',
        answer: 'You will receive a timestamped chronological report accompanied by photographic and video documentation gathered from public spaces.'
      }
    ]
  },
  {
    slug: 'lady-detectives',
    title: 'Specialized Female Investigative Services',
    category: 'Specialized Operations',
    shortDesc: 'Experienced female investigative operatives skilled in high-discretion personal inquiries, matrimonial verification, and sensitive workplace interviews.',
    heroTagline: 'Licensed female private investigators handling sensitive matrimonial, custody, and undercover workplace inquiries.',
    overview: 'Certain sensitive family, matrimonial, and workplace inquiries require specialized undercover integration and delicate interpersonal handling. SeekProof provides experienced female private investigators for these assignments.',
    whoNeedsThis: [
      'Clients Seeking Direct Interaction with Female Case Officers',
      'Contested Child Custody and Domestic Welfare Matters',
      'Undercover Workplace Environment Inquiries',
      'Sensitive Family and Matrimonial Disputes'
    ],
    keyDeliverables: [
      'Discreet social and workplace environment observation',
      'Child welfare and domestic routine observation',
      'Confidential client consultation with dedicated female lead',
      'Court-admissible photographic and video evidence',
      'Encrypted case reporting and debriefings'
    ],
    methodology: [
      {
        step: '01',
        title: 'Confidential Consultation',
        description: 'Detailed intake with a female lead case officer to establish objectives and comfort levels.'
      },
      {
        step: '02',
        title: 'Discreet Deployment',
        description: 'Field observation tailored for environments where conventional operatives may attract attention.'
      },
      {
        step: '03',
        title: 'Evidence Gathering',
        description: 'Documenting relevant activities, associations, and timelines in public spaces.'
      },
      {
        step: '04',
        title: 'Case Briefing',
        description: 'Providing court-ready documentation and direct personal debriefing.'
      }
    ],
    caseExample: {
      title: 'Complex Domestic Custody Verification',
      result: 'Documented critical child welfare evidence in a contested custody proceeding without escalating family tensions.',
      metrics: 'Favorable Custody Ruling Granted'
    },
    confidentialityStatement: 'Dedicated female case officers manage every aspect of the inquiry with absolute confidentiality and compassionate communication.',
    legalLimitations: 'All operations strictly comply with statutory privacy rules and family law evidentiary standards.',
    faqs: [
      {
        question: 'Can I request to speak only with female investigators?',
        answer: 'Yes. You can request a dedicated female case manager and field investigator from your initial consultation through case completion.'
      },
      {
        question: 'How do female detectives handle sensitive family matters?',
        answer: 'With discretion, empathy, and strict adherence to verifiable evidence standards.'
      }
    ]
  },
  {
    slug: 'marital-investigations',
    title: 'Pre-Matrimonial Background Investigation',
    category: 'Matrimonial Verification',
    shortDesc: 'Pre-matrimonial background checks verifying educational claims, employment history, family background, financial standing, and marital status.',
    heroTagline: 'Documenting background, employment, financial standing, and character prior to marriage.',
    overview: 'Marriage represents an important personal, family, and financial commitment. SeekProof conducts discreet pre-matrimonial background checks to verify educational credentials, employment history, family background, and financial stability.',
    whoNeedsThis: [
      'Prospective Brides, Grooms, and Concerned Families',
      'Families Arranging Matrimonial Alliances',
      'Individuals Entering Cross-Border or NRI Marriages',
      'High-Net-Worth Families Protecting Generational Assets'
    ],
    keyDeliverables: [
      'Educational credential and employment history verification',
      'Financial standing, business directorships, and property checks',
      'Family background and neighborhood reputation inquiries',
      'Past marital status and civil/criminal record verification',
      'Discreet lifestyle and habit assessment'
    ],
    methodology: [
      {
        step: '01',
        title: 'Background Scope Definition',
        description: 'Reviewing declared details, professional credentials, and areas requiring verification.'
      },
      {
        step: '02',
        title: 'Credential & Employment Verification',
        description: 'Verifying degrees with educational institutions and confirming employment with corporate registries.'
      },
      {
        step: '03',
        title: 'Discreet Local Inquiries',
        description: 'Conducting quiet neighborhood and peer inquiries to verify living standards and family reputation.'
      },
      {
        step: '04',
        title: 'Decision Dossier Delivery',
        description: 'Delivering an objective, factual report outlining verified records and any discrepancies.'
      }
    ],
    caseExample: {
      title: 'Cross-Border Pre-Matrimonial Vetting',
      result: 'Identified undisclosed prior marriage and multiple fraudulent business directorships in a pre-marital vetting assignment.',
      metrics: 'Family Assets & Reputation Preserved'
    },
    confidentialityStatement: 'Pre-matrimonial inquiries are conducted with absolute discretion. Neither the prospective partner nor their family will be alerted to the inquiry.',
    legalLimitations: 'Inquiries are conducted through public records, institutional verifications, and discreet neighborhood inquiries within lawful boundaries.',
    faqs: [
      {
        question: 'Will the prospective bride/groom or their family know about the inquiry?',
        answer: 'No. Our methods are strictly discreet and never alert the subject, their workplace, or their family.'
      },
      {
        question: 'What is the turnaround time for pre-matrimonial checks?',
        answer: 'Standard comprehensive checks take 5 to 7 business days; expedited turnaround is available upon request.'
      }
    ]
  },
  {
    slug: 'post-matrimonial-investigations',
    title: 'Post-Matrimonial & Infidelity Inquiries',
    category: 'Matrimonial Verification',
    shortDesc: 'Discreet verification of suspected infidelity, extra-marital relationships, hidden financial assets, and spousal deceit.',
    heroTagline: 'Lawful surveillance and asset documentation for family court and marital disputes.',
    overview: 'When questions of infidelity or hidden marital finances arise, SeekProof provides objective facts through lawful surveillance and financial inquiries, delivering court-admissible documentation for legal counsel.',
    whoNeedsThis: [
      'Spouses Seeking Verified Facts for Marital Decisions',
      'Family Law Attorneys Preparing Divorce or Custody Petitions',
      'Individuals Suspecting Concealed Marital Assets or Alimony Fraud',
      'Parties Facing False Accusations in Matrimonial Proceedings'
    ],
    keyDeliverables: [
      'High-definition photographic and video documentation from public spaces',
      'Time-stamped activity timelines and travel logs',
      'Identification of undisclosed bank accounts and real property',
      'Court-admissible evidence package formatted for family law counsel',
      'Confidential and supportive case handling'
    ],
    methodology: [
      {
        step: '01',
        title: 'Pattern & Routine Review',
        description: 'Reviewing schedule changes, unexplained absences, and stated travel itineraries.'
      },
      {
        step: '02',
        title: 'Discreet Field Surveillance',
        description: 'Deploying licensed investigators to document meetings and activities in public spaces.'
      },
      {
        step: '03',
        title: 'Asset & Account Analysis',
        description: 'Identifying diverted marital funds or undisclosed business interests.'
      },
      {
        step: '04',
        title: 'Evidentiary Handover',
        description: 'Supplying a court-ready dossier with sworn investigator affidavits.'
      }
    ],
    caseExample: {
      title: 'High-Asset Divorce Infidelity & Asset Concealment',
      result: 'Documented infidelity and located $2.8M in hidden overseas accounts prior to divorce settlement.',
      metrics: '100% Asset Disclosure Achieved'
    },
    confidentialityStatement: 'All communications take place over encrypted channels, and files are stored in access-controlled vaults or purged per client instructions.',
    legalLimitations: 'Surveillance is conducted exclusively from public spaces. We do not tap phone lines, install unauthorized spyware, or trespass on private property.',
    faqs: [
      {
        question: 'Can your surveillance video be used in divorce proceedings?',
        answer: 'Yes. All evidence is gathered lawfully in public spaces with an unbroken chain of custody, making it fully admissible in family court.'
      },
      {
        question: 'How do you protect client privacy during the case?',
        answer: 'All communications take place via encrypted channels, and files are permanently purged or archived in encrypted vaults per client instructions.'
      }
    ]
  },
  {
    slug: 'background-checks-verifications',
    title: 'Background Checks & Personnel Vetting',
    category: 'Risk Mitigation',
    shortDesc: 'Rigorous screening of executive hires, key personnel, business partners, domestic staff, and vendors.',
    heroTagline: 'Comprehensive background screening protecting organizations from fraud, legal liability, and insider risk.',
    overview: 'Automated database searches frequently miss critical court filings and regulatory sanctions. SeekProof provides thorough background vetting on executive candidates, key personnel, vendors, and business partners across multi-jurisdictional records.',
    whoNeedsThis: [
      'Human Resources & Talent Acquisition Directors',
      'Executive Search Firms & Board Search Committees',
      'Companies Onboarding Critical Vendors and Contractors',
      'Private Clients Hiring Domestic Staff or Caregivers'
    ],
    keyDeliverables: [
      'Civil litigation and criminal court record checks',
      'Educational credential and past employment authentication',
      'Regulatory compliance, sanctions, and PEP screening',
      'Adverse media and professional reputation analysis',
      'Credit history and corporate directorship conflict mapping'
    ],
    methodology: [
      {
        step: '01',
        title: 'Scope & Authorization',
        description: 'Confirming candidate authorizations and determining appropriate screening depth.'
      },
      {
        step: '02',
        title: 'Court & Official Records Search',
        description: 'Searching official judicial, educational, and professional licensing repositories.'
      },
      {
        step: '03',
        title: 'Reference Corroboration',
        description: 'Conducting structured peer inquiries to evaluate performance and professional standing.'
      },
      {
        step: '04',
        title: 'Executive Summary Delivery',
        description: 'Providing a clear risk assessment matrix with supporting documentation.'
      }
    ],
    caseExample: {
      title: 'CFO Candidate Background Vetting',
      result: 'Documented fabricated credentials and active civil fraud judgments against a prospective financial officer.',
      metrics: 'Protected Firm from Catastrophic Hire'
    },
    confidentialityStatement: 'All background checks strictly comply with applicable data protection laws, FCRA standards, and GDPR requirements.',
    legalLimitations: 'Candidate consent is obtained where required by law. All data is gathered from legitimate public and official sources.',
    faqs: [
      {
        question: 'Are your background checks FCRA and GDPR compliant?',
        answer: 'Yes. All vetting protocols strictly comply with global data privacy regulations and jurisdictional employment screening laws.'
      },
      {
        question: 'Can you vet overseas candidates and credentials?',
        answer: 'Yes. We verify international university degrees, foreign corporate directorships, and international criminal registries.'
      }
    ]
  },
  {
    slug: 'identity-verification',
    title: 'Identity & Credential Authentication',
    category: 'Verification Services',
    shortDesc: 'Forensic verification of educational degrees, professional licenses, corporate affiliations, and physical addresses.',
    heroTagline: 'Document and credential verification for institutions and enterprises.',
    overview: 'With increasing rates of document forgery and synthetic identity theft, verifying the authenticity of individuals and their credentials is vital for institutional risk defense.',
    whoNeedsThis: [
      'Financial Institutions & Fintech Underwriting Teams',
      'Universities & Professional Licensing Boards',
      'Government Contractors & Procurement Teams',
      'Immigration & Corporate Mobility Counsel'
    ],
    keyDeliverables: [
      'Physical address and residency verification',
      'Professional license and regulatory standing audit',
      'Document integrity and authenticity inspection',
      'Digital footprint and identity corroboration',
      'Official verification summary report'
    ],
    methodology: [
      {
        step: '01',
        title: 'Document Intake & Analysis',
        description: 'Digital capture and metadata analysis of submitted credentials.'
      },
      {
        step: '02',
        title: 'Issuing Authority Verification',
        description: 'Direct verification with registrars, government portals, and licensing boards.'
      },
      {
        step: '03',
        title: 'Physical Address Inspection',
        description: 'Field operative visits to confirm physical residence and operational veracity.'
      },
      {
        step: '04',
        title: 'Verification Certificate',
        description: 'Issuing an official SeekProof authenticity report.'
      }
    ],
    caseExample: {
      title: 'High-Value Vendor Executive Verification',
      result: 'Identified a synthetic identity ring attempting to secure a $15M government procurement contract.',
      metrics: 'Contract Fraud Prevented'
    },
    confidentialityStatement: 'All submitted identity records are hashed and stored in secure vaults, accessible only by assigned verification officers.',
    legalLimitations: 'Verifications are conducted through authorized registrar checks and lawful physical visits.',
    faqs: [
      {
        question: 'How do you detect forged certificates or degrees?',
        answer: 'We verify directly with institutional registrars and analyze security features, microprint, and document metadata.'
      },
      {
        question: 'How fast can an identity verification be completed?',
        answer: 'Most standard identity verifications are completed within 48 to 72 hours.'
      }
    ]
  },
  {
    slug: 'corporate-security',
    title: 'Corporate Risk Assessment & Facility Defense',
    category: 'Enterprise Defense',
    shortDesc: 'Physical security audits, executive threat management, access control assessments, and crisis response planning.',
    heroTagline: 'Physical security assessments and executive threat management for corporate facilities.',
    overview: 'Facility and executive security requires proactive assessment. SeekProof conducts physical security audits, access control reviews, and executive protection consulting for corporate facilities and leadership.',
    whoNeedsThis: [
      'Corporate Real Estate & Facility Managers',
      'Chief Security Officers (CSOs) & Risk Committees',
      'Executive Leadership Facing Specific Threats',
      'Critical Infrastructure & Data Center Operators'
    ],
    keyDeliverables: [
      'Physical vulnerability and access audit',
      'Access control and surveillance camera coverage review',
      'Executive travel threat management protocols',
      'Crisis contingency and emergency response plans',
      'Comprehensive security assessment report'
    ],
    methodology: [
      {
        step: '01',
        title: 'Baseline Facility Audit',
        description: 'Reviewing perimeter security, access logs, entry vulnerabilities, and surveillance coverage.'
      },
      {
        step: '02',
        title: 'Authorized Physical Assessment',
        description: 'Testing access points and social engineering resilience under written client authorization.'
      },
      {
        step: '03',
        title: 'Gap Analysis',
        description: 'Identifying physical, technical, and procedural security deficiencies.'
      },
      {
        step: '04',
        title: 'Remediation Blueprint',
        description: 'Delivering prioritized recommendations, staff guidelines, and mitigation strategies.'
      }
    ],
    caseExample: {
      title: 'Global Headquarters Facility Security Overhaul',
      result: 'Identified and remediated 14 physical access vulnerabilities across a 20-acre corporate facility.',
      metrics: 'Facility Security Rating Raised to Tier-1'
    },
    confidentialityStatement: 'Facility blueprints and vulnerability assessments are classified as strictly confidential and delivered solely to designated client executives.',
    legalLimitations: 'Physical audits and access testing are performed solely under explicit written authorization from property owners or legal tenants.',
    faqs: [
      {
        question: 'Do you provide on-site security guards?',
        answer: 'We provide specialized risk assessments, security consulting, and executive protection details rather than static guard forces.'
      },
      {
        question: 'Can you assess international office branches?',
        answer: 'Yes. We conduct cross-border facility security assessments worldwide.'
      }
    ]
  },
  {
    slug: 'forensic-analysis-legal-support',
    title: 'Forensic Analysis & Litigation Support',
    category: 'Legal Support',
    shortDesc: 'Digital forensics (ISO 27037), handwriting analysis, document verification, and litigation intelligence.',
    heroTagline: 'Court-admissible forensic documentation and expert witness testimony for legal proceedings.',
    overview: 'Commercial and civil litigation requires documented, court-admissible evidence. SeekProof provides certified digital forensics, handwriting analysis, document verification, and expert witness testimony that withstand judicial scrutiny.',
    whoNeedsThis: [
      'Commercial Litigators & Trial Counsel',
      'Arbitration Tribunals & Mediators',
      'Corporate Legal Departments in Contract Disputes',
      'Estate Litigators Contesting Wills or Signatures'
    ],
    keyDeliverables: [
      'ISO 27037 certified digital evidence extraction',
      'Forensic document and handwriting examination reports',
      'Complete chain-of-custody documentation and secure evidence storage',
      'Court-ready expert witness reports and affidavits',
      'Litigation intelligence and asset mapping'
    ],
    methodology: [
      {
        step: '01',
        title: 'Evidence Preservation',
        description: 'Securing original physical documents and digital storage devices under strict chain-of-custody protocols.'
      },
      {
        step: '02',
        title: 'Laboratory Analysis',
        description: 'Employing spectral comparison, ink dating, and forensic software tools.'
      },
      {
        step: '03',
        title: 'Corroboration & Peer Review',
        description: 'Validating findings against statutory legal standards and evidentiary thresholds.'
      },
      {
        step: '04',
        title: 'Expert Testimony Preparation',
        description: 'Compiling trial-ready exhibits and preparing expert witness testimony.'
      }
    ],
    caseExample: {
      title: 'Commercial Contract Forgery Litigation',
      result: 'Documented forged signatures and altered dates on a disputed $18M shareholder agreement, leading to summary judgment.',
      metrics: '$18M Judgment Granted'
    },
    confidentialityStatement: 'All legal exhibits are stored in tamper-evident physical safes or air-gapped cryptographic vaults with signed transfer logs.',
    legalLimitations: 'Forensic analysis is conducted strictly in compliance with statutory rules of evidence. Expert opinions are delivered objectively without bias toward outcome.',
    faqs: [
      {
        question: 'Are your forensic experts available to testify in court?',
        answer: 'Yes. Our senior forensic examiners routinely deliver expert witness testimony in state, federal, and international courts.'
      },
      {
        question: 'How do you protect chain of custody?',
        answer: 'All physical and digital artifacts are logged in tamper-evident storage with cryptographic hashing (SHA-256) and signed transfer logs.'
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const directMatch = servicesData.find(s => s.slug === slug);
  if (directMatch) return directMatch;

  // Flexible normalized lookup
  const normalized = slug.toLowerCase().trim();
  const flexibleMatch = servicesData.find(s => s.slug.toLowerCase().trim() === normalized);
  if (flexibleMatch) return flexibleMatch;

  // Dynamic fallback for any unlisted slug to ensure no 404
  const formattedTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    slug,
    title: formattedTitle,
    category: 'Investigation Services',
    shortDesc: `Professional investigative services and evidence documentation for ${formattedTitle.toLowerCase()}.`,
    heroTagline: `Private investigation and evidence gathering for ${formattedTitle}.`,
    overview: `SeekProof provides licensed private investigators and technical specialists to conduct legally compliant investigations for ${formattedTitle.toLowerCase()}. All inquiries adhere strictly to ISO 27037 standards with court-admissible chain of custody.`,
    whoNeedsThis: [
      'Corporate General Counsel & Legal Teams',
      'Commercial Litigators & In-House Counsel',
      'Private Clients & Family Offices',
      'Compliance and Risk Managers'
    ],
    keyDeliverables: [
      'Comprehensive evidentiary dossier',
      'Time-stamped photographic and video logs',
      'Field operative reports',
      'Court-ready expert witness brief',
      'Confidential client consultation debrief'
    ],
    methodology: [
      {
        step: '01',
        title: 'Confidential Case Scoping',
        description: 'Conflict check, intake review, and scope definition under binding NDA.'
      },
      {
        step: '02',
        title: 'Investigative Deployment',
        description: 'Deploying licensed field investigators, digital forensic tools, and public records research.'
      },
      {
        step: '03',
        title: 'Evidence Corroboration',
        description: 'Cross-referencing observed activities and extracted artifacts for legal veracity.'
      },
      {
        step: '04',
        title: 'Dossier Handover',
        description: 'Delivering encrypted final reports and conducting partner-level client debriefings.'
      }
    ],
    caseExample: {
      title: `${formattedTitle} Mandate`,
      result: 'Conducted discreet inquiries yielding documented, court-admissible proof.',
      metrics: '100% Client Discretion Maintained'
    },
    confidentialityStatement: 'All communications are protected under strict Non-Disclosure Agreements and encrypted channels.',
    legalLimitations: 'All inquiries operate strictly within statutory limits and applicable privacy regulations.',
    faqs: [
      {
        question: 'How quickly can an investigation commence?',
        answer: 'Preliminary triage begins within 24 hours of retainer execution, with emergency priority deployment available.'
      },
      {
        question: 'How is client confidentiality maintained?',
        answer: 'All communications are protected under strict Non-Disclosure Agreements and encrypted channels.'
      }
    ]
  };
}
