import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  FileText,
  Lock,
  Scale,
  Search,
  Printer,
  Share2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Mail,
  Building2,
  Users,
  CreditCard,
  Eye,
  Key,
  HelpCircle,
  Check,
  Phone,
  Cookie,
} from 'lucide-react';

const LAST_UPDATED = 'September 1, 2026';
const EFFECTIVE_DATE = 'September 1, 2026';

const termsSections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    badge: 'Agreement',
    icon: Scale,
    summary: 'By using StayNest, you legally agree to these Terms, safety standards, and local property regulations.',
    content: [
      {
        heading: 'Agreement to Legally Binding Terms',
        text: 'Welcome to StayNest. By accessing, browsing, registering on, or utilizing our website, mobile applications, APIs, or related accommodation services (collectively, the "Platform"), you ("User", "Guest", "Resident", or "Host") enter into a legally enforceable contract with StayNest Technologies India Private Limited ("StayNest", "we", "us", or "our").',
      },
      {
        heading: 'Eligibility Criteria',
        text: 'You must be at least 18 years of age or possess legal parental/guardian consent to enter into accommodations via StayNest. By registering, you warrant that you possess full legal capacity under the Indian Contract Act, 1872, and are not barred from accessing accommodation services under applicable laws.',
      },
      {
        heading: 'Amendments and Revisions',
        text: 'StayNest reserves the right to modify, adjust, or supplement these Terms at any time. Any changes will become effective upon posting with a revised "Last Updated" timestamp. Continued use of our Platform after revisions signifies your conclusive agreement to updated terms.',
      },
    ],
  },
  {
    id: 'platform-role',
    title: '2. Role of the Platform',
    badge: 'Marketplace',
    icon: Building2,
    summary: 'StayNest operates an online marketplace connecting guests with independent PG hosts and operators.',
    content: [
      {
        heading: 'Marketplace Intermediary Status',
        text: 'StayNest acts strictly as a digital technology intermediary and facilitator under Section 79 of the Information Technology Act, 2000. StayNest does not own, manage, or operate Paying Guest (PG) properties directly unless explicitly designated as a "StayNest Managed Prime" facility.',
      },
      {
        heading: 'Independent Host Relationship',
        text: 'PG property owners, managers, and franchise operators ("Hosts") are independent contracting third parties. StayNest curates, verifies, and audits listings, but the ultimate license to occupy, room condition, and on-premises services remain the responsibility of the respective Host.',
      },
      {
        heading: 'Physical Verification & Badges',
        text: 'Properties displaying the "Verified Property" badge have undergone standard physical audits for basic amenities, cleanliness, and security. However, guests are encouraged to inspect rooms during the move-in check-in window.',
      },
    ],
  },
  {
    id: 'kyc-accounts',
    title: '3. User Accounts & KYC Verification',
    badge: 'Identity',
    icon: Users,
    summary: 'Valid government ID and KYC verification are mandatory for guest safety and statutory compliance.',
    content: [
      {
        heading: 'Account Accuracy & Security',
        text: 'Users must provide accurate, current, and verifiable information during registration. You are responsible for safeguarding your login credentials and for all activities occurring under your account.',
      },
      {
        heading: 'Mandatory Government KYC',
        text: 'Under Indian municipal guidelines, local police verification mandates, and tenancy safety statutes, all Residents must submit valid Government ID (such as Aadhaar Card, Passport, Voter ID, or Driving License) along with student/employment verification prior to check-in.',
      },
      {
        heading: 'Immediate Revocation for Fraudulent Data',
        text: 'Submission of counterfeit documents, impersonation, or misrepresentation will lead to immediate account termination, forfeiture of pending booking tokens, and reporting to law enforcement authorities.',
      },
    ],
  },
  {
    id: 'booking-payments',
    title: '4. Bookings, Rent & Security Deposits',
    badge: 'Financials',
    icon: CreditCard,
    summary: 'Clear guidelines regarding booking tokens, monthly rents, maintenance fees, and refundable security deposits.',
    content: [
      {
        heading: 'Booking Confirmation & Token Amount',
        text: 'A booking reservation is confirmed only when the designated booking token or advance rent is successfully processed through our authorized payment gateways (UPI, Credit/Debit Cards, Net Banking).',
      },
      {
        heading: 'Security Deposit Custody & Refund',
        text: 'Security deposits are collected to protect Hosts against property damage, unpaid utility bills, or early breach of lock-in periods. Refundable security deposits are processed back to the resident within 7 to 10 business days following an official move-out inspection and settlement of all dues.',
      },
      {
        heading: 'Monthly Rent Payment Schedule',
        text: 'Monthly rent is payable in advance on or before the 5th day of every calendar month. Late payments beyond the grace period may incur a daily late fee of ₹100/day as determined by individual property policies.',
      },
      {
        heading: 'Utility & Maintenance Dues',
        text: 'Listing prices clearly detail included amenities (e.g., Wi-Fi, daily housekeeping, 3-times meals). Individual room electricity sub-meters or air conditioning usage may be billed separately as per actual local DISCOM tariff rates.',
      },
    ],
  },
  {
    id: 'house-rules',
    title: '5. House Rules & Resident Conduct',
    badge: 'Community',
    icon: Shield,
    summary: 'Code of conduct ensuring quiet hours, guest policies, hygiene standards, and a zero-tolerance policy for harassment.',
    content: [
      {
        heading: 'Community Harmony & Quiet Hours',
        text: 'Residents agree to respect fellow co-habitants. Strict quiet hours are observed between 11:00 PM and 7:00 AM. Loud music, disruptive gatherings, and anti-social behavior in shared areas are strictly prohibited.',
      },
      {
        heading: 'Zero-Tolerance Policy',
        text: 'StayNest maintains an uncompromising zero-tolerance policy against physical violence, harassment, discrimination, hate speech, narcotics, illegal substances, and hazardous weapons. Violation results in immediate eviction without refund and notification of police authorities.',
      },
      {
        heading: 'Visitor & Overnight Guest Protocols',
        text: 'Visitors must be registered in the property visitor log at the reception/security gate. Overnight visitor permissions, timings, and charges depend on property-specific gender guidelines (Boys, Girls, or Co-ed rules).',
      },
    ],
  },
  {
    id: 'cancellation-refund',
    title: '6. Cancellation & Refund Policy',
    badge: 'Refunds',
    icon: FileText,
    summary: 'Transparent rules for pre-move-in cancellations, lock-in periods, and emergency lease terminations.',
    content: [
      {
        heading: 'Pre-Move-in Cancellation Matrix',
        text: 'Cancellations made 7 or more days before the scheduled check-in date are eligible for a 100% refund of the booking token (excluding nominal gateway processing fees). Cancellations within 3 to 6 days receive a 50% refund. Cancellations made less than 48 hours prior to check-in are non-refundable.',
      },
      {
        heading: 'Lock-in Period & Move-out Notice',
        text: 'Most PG accommodations operate on a standard 1-month or 3-month lock-in period. Residents must serve at least 30 days written notice via the StayNest platform before vacating the premises to guarantee full security deposit return.',
      },
      {
        heading: 'Unfit Property Guarantee',
        text: 'If a property deviates fundamentally from the verified listing description upon your physical arrival (e.g., missing critical amenities, non-functional water/power), notify StayNest within 24 hours of check-in for an alternative accommodation transfer or full refund.',
      },
    ],
  },
  {
    id: 'liability-disclaimers',
    title: '7. Limitation of Liability & Disclaimers',
    badge: 'Legal Shield',
    icon: AlertCircle,
    summary: 'Platform disclaimers regarding third-party services, personal belongings, and force majeure events.',
    content: [
      {
        heading: 'Platform Provided "As Is"',
        text: 'The StayNest platform and listing content are provided on an "as is" and "as available" basis without express or implied warranties of any kind. We do not guarantee uninterrupted or error-free access.',
      },
      {
        heading: 'Personal Belongings & Valuables',
        text: 'Residents are solely responsible for securing their personal belongings, laptops, cash, and valuables. StayNest and property hosts are not liable for theft or loss within private rooms or communal premises.',
      },
      {
        heading: 'Aggregate Liability Cap',
        text: 'To the maximum extent permitted by applicable Indian law, StayNest’s aggregate financial liability for any dispute arising out of or related to these terms shall not exceed the service fee retained by StayNest for the disputed booking.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '8. Governing Law & Dispute Redressal',
    badge: 'Jurisdiction',
    icon: Scale,
    summary: 'Governed by the laws of India with exclusive jurisdiction in courts of Bengaluru, Karnataka.',
    content: [
      {
        heading: 'Jurisdiction & Applicable Law',
        text: 'These Terms of Service are governed by and construed in accordance with the laws of the Republic of India, without regard to conflict of law principles.',
      },
      {
        heading: 'Amicable Settlement & Arbitration',
        text: 'Any disagreement or dispute shall first be addressed through good-faith mediation with StayNest Customer Support. If unresolved within 30 days, the dispute shall be resolved through binding individual arbitration under the Arbitration and Conciliation Act, 1996 in Bengaluru.',
      },
    ],
  },
];

const privacySections = [
  {
    id: 'info-collected',
    title: '1. Information We Collect',
    badge: 'Data Collection',
    icon: FileText,
    summary: 'Personal identification, KYC documentation, payment details, and device usage statistics.',
    content: [
      {
        heading: 'Personal Information You Provide',
        text: 'When you register, book a PG, or communicate with us, we collect your full legal name, email address, mobile phone number, emergency contacts, gender, and college/company affiliation.',
      },
      {
        heading: 'Statutory KYC & Identity Documents',
        text: 'To comply with local municipal regulations and residential tenant verification laws, we securely capture government-issued identification (Aadhaar, Passport, Voter ID) and facial verification photographs for check-in authentication.',
      },
      {
        heading: 'Payment & Financial Metadata',
        text: 'Payment transactions are processed by RBI-licensed third-party payment gateways (Razorpay, Cashfree). StayNest never stores raw debit/credit card numbers or CVV codes on our servers; we retain only payment tokens, transaction IDs, and receipt references.',
      },
      {
        heading: 'Automated Device & Location Data',
        text: 'We collect IP addresses, browser types, device operating systems, location coordinates (with your permission for property search proximity), and browsing behaviors across our listings.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    badge: 'Processing',
    icon: CheckCircle2,
    summary: 'Facilitating bookings, ensuring resident safety, processing payments, and personalizing accommodation searches.',
    content: [
      {
        heading: 'Service Delivery & Booking Execution',
        text: 'Your information is used to schedule property visits, confirm room allocations, transmit move-in tokens, and generate digital rental license agreements between you and the host.',
      },
      {
        heading: 'Safety, Tenant Verification & Crime Prevention',
        text: 'We utilize KYC data for resident authentication, fraud prevention, verifying roommate safety preferences, and complying with statutory police verification filings.',
      },
      {
        heading: 'Transactional Alerts & Communication',
        text: 'We send rent due notifications, booking confirmations, payment receipts, maintenance updates, and important security advisories via SMS, WhatsApp, email, or in-app alerts.',
      },
    ],
  },
  {
    id: 'data-sharing',
    title: '3. Information Sharing & Disclosure',
    badge: 'Third Parties',
    icon: Users,
    summary: 'Strict boundaries on sharing data solely with verified hosts, payment providers, and legal authorities.',
    content: [
      {
        heading: 'Sharing with Verified Hosts & PG Operators',
        text: 'Once a booking is requested or confirmed, your name, contact phone, and check-in date are shared with the prospective Host to organize your move-in and room assignment.',
      },
      {
        heading: 'Service Providers & Infrastructure',
        text: 'We collaborate with trusted cloud hosting partners (AWS, Google Cloud), analytics providers, and SMS gateway vendors under strict contractual confidentiality and data protection obligations.',
      },
      {
        heading: 'Legal Compliance & Law Enforcement',
        text: 'We may disclose personal information if required by law, subpoena, or written request from Indian law enforcement agencies, courts, or local municipal authorities investigating tenancy matters.',
      },
      {
        heading: 'No Selling of Personal Data',
        text: 'StayNest does not sell, rent, or lease your personal contact details or KYC records to commercial marketing brokers or third-party advertisers.',
      },
    ],
  },
  {
    id: 'data-security',
    title: '4. Data Security & Storage',
    badge: 'Security',
    icon: Lock,
    summary: 'Industry-standard 256-bit encryption, role-based access control, and ISO-compliant servers.',
    content: [
      {
        heading: 'Technical & Organizational Safeguards',
        text: 'All data transmitted between your device and StayNest is secured with SSL/TLS 256-bit encryption. Sensitive KYC files are stored in encrypted object stores with restricted, audit-logged administrative access.',
      },
      {
        heading: 'Storage Location',
        text: 'In accordance with the Digital Personal Data Protection (DPDP) Act, 2023, user data is primarily processed and stored on secure data centers situated within the territory of India.',
      },
    ],
  },
  {
    id: 'cookies-tracking',
    title: '5. Cookies & Tracking Technologies',
    badge: 'Cookies',
    icon: Eye,
    summary: 'Cookies help keep you logged in, save your PG search filters, and analyze platform performance.',
    content: [
      {
        heading: 'Types of Cookies Utilized',
        text: 'We use essential session cookies (for authentication and keeping you logged in), preference cookies (remembering your selected city and budget preferences), and analytical cookies (evaluating listing engagement).',
      },
      {
        heading: 'Managing Your Preferences',
        text: 'You can control or disable non-essential cookies via your browser settings. Note that disabling essential cookies may impact your ability to log in or complete booking payments.',
      },
    ],
  },
  {
    id: 'user-rights',
    title: '6. Your Privacy Rights',
    badge: 'Your Rights',
    icon: Key,
    summary: 'Rights to review, correct, export, or request deletion of your personal records.',
    content: [
      {
        heading: 'Access and Correction',
        text: 'You have the right to inspect and update personal information stored in your account profile at any time through our settings portal.',
      },
      {
        heading: 'Account Deletion & Data Erasure',
        text: 'You may request account deletion and removal of personal information, subject to mandatory statutory retention rules (such as maintaining past tax invoices or active rental agreement audit trails).',
      },
    ],
  },
  {
    id: 'grievance-contact',
    title: '7. Grievance Redressal & Contact',
    badge: 'Statutory',
    icon: Mail,
    summary: 'Contact our designated Grievance Officer under the Information Technology Act & DPDP Act.',
    content: [
      {
        heading: 'Designated Grievance Officer',
        text: 'Pursuant to the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and DPDP Act, 2023, our Grievance Officer can be contacted at: grievances@staynest.com.',
      },
      {
        heading: 'Response Timelines',
        text: 'We acknowledge grievance tickets within 24 hours and resolve reported issues within 15 working days.',
      },
    ],
  },
];

const cookieSections = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies & Web Storage?',
    badge: 'Fundamentals',
    icon: Cookie,
    summary: 'Cookies and browser local storage store essential session tokens, recent searches, and performance stats.',
    content: [
      {
        heading: 'Understanding Cookies and Local Storage',
        text: 'Cookies are small text files placed on your computer, tablet, or smartphone when you visit StayNest. In addition to HTTP cookies, we also utilize modern web technologies including HTML5 localStorage and sessionStorage to maintain state across pages and visits.',
      },
      {
        heading: 'Session vs. Persistent Technologies',
        text: 'Session cookies and sessionStorage are temporary and automatically erased once you close your web browser. Persistent cookies and localStorage remain on your device until they expire or until you manually clear them via your browser cache.',
      },
      {
        heading: 'First-Party vs. Third-Party Trackers',
        text: 'First-party cookies are set directly by StayNest (e.g. your login session and search preferences). Third-party cookies are set by trusted external partners such as Google OAuth and analytics providers to enable seamless authentication and platform insights.',
      },
    ],
  },
  {
    id: 'cookie-categories',
    title: '2. Categories of Cookies We Use',
    badge: 'Classification',
    icon: FileText,
    summary: 'We classify cookies into Strictly Necessary, Functional/Preferences, and Analytics/Performance.',
    content: [
      {
        heading: 'Strictly Necessary & Authentication Cookies',
        text: 'These files are essential for you to navigate StayNest and use core features. They enable user authentication tokens (keeping you logged in securely), cross-site request forgery (CSRF) defenses, and secure booking checkout flows. These cookies cannot be turned off without disabling key site functions.',
      },
      {
        heading: 'Preferences & Functional Cookies',
        text: 'Functional cookies allow StayNest to remember the choices you make while searching for accommodations (such as your chosen city, filtered budget range, gender filter, and favorite listings). They provide a personalized and smoother browsing experience.',
      },
      {
        heading: 'Performance & Analytics Cookies',
        text: 'These tools (e.g. Vercel Web Analytics, Speed Insights) anonymously capture diagnostic telemetry such as page load speed, responsiveness, and popular PG categories. They contain no personally identifiable contact data and help us optimize platform performance.',
      },
    ],
  },
  {
    id: 'cookie-inventory',
    title: '3. StayNest Cookie & Storage Inventory',
    badge: 'Inventory',
    icon: Lock,
    summary: 'An explicit inventory of the primary cookies and local storage keys utilized by StayNest.',
    content: [
      {
        heading: 'staynest_token (Local Storage / Session)',
        text: 'Purpose: Stores your secure JWT authentication token when you log in so you stay authenticated as you browse PGs and view booking details. Lifespan: 30 days or until explicit logout. Category: Strictly Necessary.',
      },
      {
        heading: 'staynest_user (Local Storage)',
        text: 'Purpose: Caches basic profile details (name, email, avatar URL) to render the navigation header without requesting profile APIs on every page load. Lifespan: Synchronized with authentication session. Category: Strictly Necessary.',
      },
      {
        heading: 'staynest_city / staynest_filters (Local Storage)',
        text: 'Purpose: Remembers your last selected city (Bangalore, Delhi, Mumbai, etc.) and applied room filters so you do not have to reconfigure them every visit. Lifespan: 90 days. Category: Functional / Preferences.',
      },
      {
        heading: '_vercel_speed_insights / _va (First-Party Cookie)',
        text: 'Purpose: Measures Core Web Vitals, page rendering latency, and anonymous user interaction counts to ensure speedy page loads across India. Lifespan: Up to 1 year. Category: Performance & Analytics.',
      },
    ],
  },
  {
    id: 'third-party-services',
    title: '4. Third-Party Integrations & Cookies',
    badge: 'Integrations',
    icon: Users,
    summary: 'How Google OAuth and payment providers deploy tracking technologies during your interactions.',
    content: [
      {
        heading: 'Google Sign-In Authentication',
        text: 'When you choose "Sign in with Google", Google LLC sets session and authentication cookies (such as g_state) to securely authenticate your Google identity without exposing your Google password to StayNest.',
      },
      {
        heading: 'Payment Gateway Security',
        text: 'During booking deposit checkout, authorized payment providers (Razorpay, Cashfree) deploy fraud-prevention telemetry to detect unusual transaction patterns and protect your financial credentials.',
      },
    ],
  },
  {
    id: 'managing-cookies',
    title: '5. How You Can Manage or Disable Cookies',
    badge: 'User Controls',
    icon: Key,
    summary: 'Learn how to control, inspect, or delete cookies via your browser preferences.',
    content: [
      {
        heading: 'Configuring Your Web Browser',
        text: 'Most browsers (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) automatically accept cookies, but allow you to adjust settings to refuse new cookies, receive alerts before saving cookies, or delete cookies entirely.',
      },
      {
        heading: 'Browser Guidance Links',
        text: 'You can adjust cookie settings in Chrome under Settings > Privacy & Security; in Safari under Preferences > Privacy; and in Firefox under Options > Privacy & Security.',
      },
      {
        heading: 'Impact of Disabling Cookies',
        text: 'Please note that if you reject or delete strictly necessary cookies and local storage tokens, you will be unable to log in to your StayNest resident dashboard or confirm online PG bookings.',
      },
    ],
  },
  {
    id: 'cookie-updates',
    title: '6. Policy Revisions & Contact Inquiries',
    badge: 'Revisions',
    icon: Mail,
    summary: 'Periodic updates to our cookie inventory and how to reach our technology team.',
    content: [
      {
        heading: 'Periodic Review & Updates',
        text: 'We regularly audit our platform and update this Cookie Policy whenever new accommodation features, tracking tags, or regulatory requirements are introduced.',
      },
      {
        heading: 'Contact the Privacy Officer',
        text: 'If you have questions regarding our cookie practices or browser tracking technologies, please contact us at: privacy@staynest.com.',
      },
    ],
  },
];

const LegalPage = ({ initialTab }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on route or prop
  const currentTab = useMemo(() => {
    if (initialTab) return initialTab;
    if (location.pathname.includes('/cookies') || location.pathname.includes('/cookie-policy')) return 'cookies';
    if (location.pathname.includes('/privacy')) return 'privacy';
    return 'terms';
  }, [location.pathname, initialTab]);

  const [activeTab, setActiveTab] = useState(currentTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('');
  const [copiedSection, setCopiedSection] = useState(null);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const sections = useMemo(() => {
    if (activeTab === 'cookies') return cookieSections;
    if (activeTab === 'privacy') return privacySections;
    return termsSections;
  }, [activeTab]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.content.some(
          (c) =>
            c.heading.toLowerCase().includes(q) ||
            c.text.toLowerCase().includes(q)
        )
    );
  }, [sections, searchQuery]);

  // Handle Tab Switch
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchQuery('');
    let routePath = '/terms';
    if (newTab === 'privacy') routePath = '/privacy';
    if (newTab === 'cookies') routePath = '/cookies';
    navigate(routePath, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to section
  const scrollToSection = (id) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Copy section link
  const handleCopyLink = (id) => {
    let routePath = '/terms';
    if (activeTab === 'privacy') routePath = '/privacy';
    if (activeTab === 'cookies') routePath = '/cookies';
    const url = `${window.location.origin}${routePath}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-warm-gray-50 pt-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-white to-warm-gray-50 border-b border-warm-gray-200 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-warm-gray-500 hover:text-primary transition-colors mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-gray-900 tracking-tight">
                {activeTab === 'terms' && (
                  <>
                    Terms of <span className="text-primary">Service</span>
                  </>
                )}
                {activeTab === 'privacy' && (
                  <>
                    Privacy <span className="text-primary">Policy</span>
                  </>
                )}
                {activeTab === 'cookies' && (
                  <>
                    Cookie <span className="text-primary">Policy</span>
                  </>
                )}
              </h1>
              <p className="text-warm-gray-600 mt-2 max-w-2xl text-base">
                {activeTab === 'terms' &&
                  'Our commitment to transparency, safety, and community standards across all StayNest PG accommodations.'}
                {activeTab === 'privacy' &&
                  'How StayNest collects, protects, processes, and respects your personal data and statutory residency records.'}
                {activeTab === 'cookies' &&
                  'How StayNest uses cookies, local browser storage, and performance telemetry to power your accommodation search.'}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-warm-gray-500">
                <span className="flex items-center gap-1.5 bg-white border border-warm-gray-200 px-3 py-1 rounded-full shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Last Updated: {LAST_UPDATED}
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-warm-gray-200 px-3 py-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Effective: {EFFECTIVE_DATE}
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-warm-gray-200 px-3 py-1 rounded-full shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  Governed by Indian Law
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-warm-gray-200 hover:bg-warm-gray-100 hover:border-warm-gray-300 text-warm-gray-700 text-sm font-medium rounded-xl transition-all shadow-sm cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4 text-warm-gray-500" />
                <span className="hidden sm:inline">Print Document</span>
              </button>
              <a
                href="mailto:support@staynest.com"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Legal</span>
              </a>
            </div>
          </div>

          {/* Tab Navigation Pill Switcher */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-warm-gray-200 pt-6">
            <div className="inline-flex bg-warm-gray-100 p-1.5 rounded-2xl border border-warm-gray-200 flex-wrap gap-1">
              <button
                onClick={() => handleTabChange('terms')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'terms'
                    ? 'text-white bg-primary shadow-md'
                    : 'text-warm-gray-600 hover:text-warm-gray-900'
                }`}
              >
                <Scale className="w-4 h-4" />
                Terms of Service
              </button>
              <button
                onClick={() => handleTabChange('privacy')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'text-white bg-primary shadow-md'
                    : 'text-warm-gray-600 hover:text-warm-gray-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </button>
              <button
                onClick={() => handleTabChange('cookies')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'cookies'
                    ? 'text-white bg-primary shadow-md'
                    : 'text-warm-gray-600 hover:text-warm-gray-900'
                }`}
              >
                <Cookie className="w-4 h-4" />
                Cookie Policy
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-warm-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab} clauses...`}
                className="w-full pl-9 pr-4 py-2 bg-white border border-warm-gray-200 rounded-xl text-sm placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-warm-gray-400 hover:text-warm-gray-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white border border-warm-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-warm-gray-900 text-sm tracking-wide uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Table of Contents
                </span>
                <span className="text-xs text-warm-gray-400 font-medium">
                  {filteredSections.length} sections
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                      activeSectionId === section.id
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-900'
                    }`}
                  >
                    <span className="truncate pr-2">{section.title}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-warm-gray-400 transition-transform ${
                        activeSectionId === section.id
                          ? 'text-primary translate-x-0.5'
                          : 'group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>

            {/* Need Help Box */}
            <div className="bg-gradient-to-br from-primary/10 via-white to-warm-gray-50 border border-primary/20 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-3 shadow-md shadow-primary/20">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-warm-gray-900 text-sm">
                Have questions about our policies?
              </h4>
              <p className="text-xs text-warm-gray-600 mt-1 leading-relaxed">
                Our support team and legal department are here to help clarify any aspect of your PG agreement and data privacy.
              </p>
              <div className="mt-4 pt-3 border-t border-primary/10 flex flex-col gap-2 text-xs">
                <a
                  href="mailto:support@staynest.com"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  support@staynest.com
                </a>
                <a
                  href="tel:+918000000000"
                  className="inline-flex items-center gap-2 text-warm-gray-700 font-medium hover:text-primary"
                >
                  <Phone className="w-3.5 h-3.5 text-warm-gray-400" />
                  +91 80000 00000 (Mon–Sat, 9AM–7PM)
                </a>
              </div>
            </div>
          </aside>

          {/* Main Legal Clauses */}
          <main className="lg:col-span-8 space-y-6">
            {/* Quick Overview Card */}
            <div className="bg-white border border-warm-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
                  {activeTab === 'terms' && <Scale className="w-5 h-5" />}
                  {activeTab === 'privacy' && <Shield className="w-5 h-5" />}
                  {activeTab === 'cookies' && <Cookie className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-warm-gray-900">
                    {activeTab === 'terms' && 'Key Summary for Residents'}
                    {activeTab === 'privacy' && 'Key Summary of Data Protection'}
                    {activeTab === 'cookies' && 'Key Summary of Cookie Usage'}
                  </h2>
                  <p className="text-sm text-warm-gray-600 mt-1 leading-relaxed">
                    {activeTab === 'terms' &&
                      'StayNest is an accommodation marketplace. Bookings include verified listings, standard security deposits, and house safety rules. By booking, you confirm providing authentic KYC documents and adhering to community guidelines.'}
                    {activeTab === 'privacy' &&
                      'We collect personal identification and verification documents exclusively to fulfill your PG bookings, satisfy statutory police verification, and protect resident safety. We never sell your data.'}
                    {activeTab === 'cookies' &&
                      'StayNest uses essential cookies and local storage to keep you logged in, save your search preferences (cities, price ranges), and gauge anonymous platform performance. We do not use intrusive cross-site ad trackers.'}
                  </p>
                </div>
              </div>
            </div>

            {/* If search returns no results */}
            {filteredSections.length === 0 && (
              <div className="bg-white border border-warm-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-warm-gray-100 flex items-center justify-center mx-auto text-warm-gray-400 mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-warm-gray-800 text-lg">No matching clauses found</h3>
                <p className="text-warm-gray-500 text-sm mt-1">
                  We couldn't find any section matching "{searchQuery}". Try searching with terms like "deposit", "refund", "Aadhaar", "token", or "storage".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Render Sections */}
            {filteredSections.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <motion.article
                  id={section.id}
                  key={section.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border border-warm-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28 relative group hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-warm-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-warm-gray-50 border border-warm-gray-200 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="inline-block text-[11px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md mb-1">
                          {section.badge}
                        </span>
                        <h2 className="font-display text-xl font-bold text-warm-gray-900">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyLink(section.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-warm-gray-400 hover:text-primary transition-colors self-start sm:self-auto py-1 px-2 rounded-lg hover:bg-warm-gray-50 cursor-pointer"
                      title="Copy link to this section"
                    >
                      {copiedSection === section.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Highlight Box */}
                  <div className="mt-4 p-3.5 bg-warm-gray-50 rounded-xl border border-warm-gray-200/70 text-xs text-warm-gray-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-warm-gray-900">Summary: </span>
                      {section.summary}
                    </div>
                  </div>

                  {/* Detailed Clauses */}
                  <div className="mt-6 space-y-5 text-warm-gray-700 leading-relaxed text-sm">
                    {section.content.map((item, itemIdx) => (
                      <div key={itemIdx} className="space-y-1.5">
                        <h3 className="font-display font-semibold text-warm-gray-900 text-base">
                          {item.heading}
                        </h3>
                        <p className="text-warm-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}

            {/* Statutory & Contact Notice Footer Box */}
            <div className="bg-warm-gray-900 text-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary-light">
                    Regulatory Compliance
                  </span>
                  <h3 className="font-display font-bold text-xl mt-1">
                    StayNest Technologies India Pvt. Ltd.
                  </h3>
                  <p className="text-warm-gray-400 text-xs mt-2 max-w-xl leading-relaxed">
                    CIN: U72900KA2024PTC184512 • Registered Office: 4th Floor, Salarpuria Towers, Koramangala 5th Block, Bengaluru, Karnataka, 560095, India.
                  </p>
                  <p className="text-warm-gray-400 text-xs mt-1">
                    For legal notices and statutory service of process: <span className="text-white font-medium">legal@staynest.com</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href="mailto:grievances@staynest.com"
                    className="px-4 py-2.5 bg-warm-gray-800 hover:bg-warm-gray-700 text-white text-xs font-semibold rounded-xl text-center transition-colors border border-warm-gray-700 flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Grievance Officer
                  </a>
                  <button
                    onClick={() => handleTabChange(activeTab === 'terms' ? 'privacy' : activeTab === 'privacy' ? 'cookies' : 'terms')}
                    className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl text-center transition-colors shadow-md shadow-primary/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Next:{' '}
                    {activeTab === 'terms'
                      ? 'Privacy Policy'
                      : activeTab === 'privacy'
                      ? 'Cookie Policy'
                      : 'Terms of Service'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
