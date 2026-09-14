import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Heart,
  Users,
  Sparkles,
  Building2,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Compass,
  Smile,
  Zap,
  MapPin,
  Coffee,
  Lock,
  Star,
  Check,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';

const stats = [
  {
    number: 50,
    suffix: 'k+',
    label: 'Happy Residents',
    description: 'Students & professionals who found their second home',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    number: 1200,
    suffix: '+',
    label: 'Verified Properties',
    description: 'Physically audited rooms with 100% verified photos',
    icon: Building2,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    number: 15,
    suffix: '+',
    label: 'Metro Cities',
    description: 'Expanding across India’s major education & tech hubs',
    icon: MapPin,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    number: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    description: 'Consistently rated 4.8+ stars across all major platforms',
    icon: Star,
    color: 'text-cta',
    bg: 'bg-rose-50',
  },
];

const coreValues = [
  {
    title: '100% Verified Living',
    description:
      'Every PG listed undergoes a rigorous 45-point physical audit. What you see on your screen is exactly what you get when you unlock your room door.',
    icon: Shield,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: 'Trust & Truth',
  },
  {
    title: 'Zero Brokerage, Forever',
    description:
      'Say goodbye to exploitative middlemen and surprise commissions. We connect you directly with certified property hosts with clear, transparent pricing.',
    icon: Sparkles,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    badge: 'Fair Pricing',
  },
  {
    title: 'Safety & Peace of Mind',
    description:
      '24/7 CCTV surveillance, biometric security, verified warden staff, and emergency SOS integration ensure you and your loved ones sleep peacefully.',
    icon: Lock,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    badge: 'Security First',
  },
  {
    title: 'Vibrant Youth Community',
    description:
      'Moving to a new city can be intimidating. StayNest builds warm, inclusive student and young professional communities with game nights, networking, and festivals.',
    icon: Heart,
    color: 'text-cta',
    bg: 'bg-rose-50',
    badge: 'Belonging',
  },
  {
    title: 'Tech-Driven Living',
    description:
      'From digital KYC onboarding and in-app rent payment to 24-hour SLA maintenance ticket resolution, manage your entire living experience in a few taps.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    badge: 'Effortless Tech',
  },
  {
    title: 'Nutritious & Hygienic Meals',
    description:
      'Home-cooked, balanced daily meals prepared in FSSAI-compliant hygienic kitchens with customizable vegetarian, non-veg, and regional menu choices.',
    icon: Coffee,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    badge: 'Good Health',
  },
];

const comparisonData = [
  {
    feature: 'Room Verification',
    traditional: 'Misleading photos, unverified amenities, surprise conditions',
    staynest: '45-point physical verification, 360° tours, genuine photos',
  },
  {
    feature: 'Brokerage Fees',
    traditional: '1 to 2 months of non-refundable agent commissions',
    staynest: 'Zero brokerage, transparent pricing with no hidden charges',
  },
  {
    feature: 'Security Deposit',
    traditional: 'Heavy 3-6 months advance deposits with deduction disputes',
    staynest: '1-month refundable deposit with guaranteed automated return',
  },
  {
    feature: 'Maintenance & Repairs',
    traditional: 'Endless calls to elusive landlords, delayed repairs',
    staynest: 'In-app maintenance ticketing with 24-hour resolution guarantee',
  },
  {
    feature: 'Safety & Women Security',
    traditional: 'Sporadic locks, untrained staff, minimal security cameras',
    staynest: 'Biometric doors, 24/7 CCTV, background-checked staff & emergency SOS',
  },
  {
    feature: 'Community & Vibes',
    traditional: 'Isolated rooms, restrictive rules, awkward social environment',
    staynest: 'Co-working lounges, weekly events, weekend meetups & study groups',
  },
];

const milestones = [
  {
    year: '2023',
    quarter: 'Q2',
    title: 'The Spark in Bangalore',
    description:
      'Founded by university graduates who struggled firsthand with untrustworthy brokers and poor student housing in Koramangala. StayNest began with 15 verified homes.',
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Expansion to NCR & Pune',
    description:
      'Expanded operations across Delhi, Gurgaon, Noida, and Pune. Introduced proprietary 45-point physical safety audit and crossed 10,000 active residents.',
  },
  {
    year: '2025',
    quarter: 'Q3',
    title: 'Smart Tech & Zero Brokerage Campaign',
    description:
      'Launched our mobile resident application featuring one-click digital rent agreements, instant repair ticketing, and automated security deposit returns.',
  },
  {
    year: '2026',
    quarter: 'Present',
    title: 'Nationwide Network & Co-Living Revolution',
    description:
      'Present in 15+ metro cities with 1,200+ partner properties and over 50,000 residents loving the modern, community-centered StayNest lifestyle.',
  },
];

const teamMembers = [
  {
    name: 'Aarav Singhania',
    role: 'Co-Founder & CEO',
    bio: 'Ex-consultant and passionate urban planner obsessed with fixing youth accommodation through technology and human-centric design.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    accent: 'border-primary/30',
  },
  {
    name: 'Meera Deshmukh',
    role: 'Co-Founder & Chief Product Officer',
    bio: 'Former product lead passionate about seamless digital onboarding, smart property management, and resident community engagement.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    accent: 'border-cta/30',
  },
  {
    name: 'Rohan Varma',
    role: 'Head of Operations & Safety',
    bio: '12+ years of hospitality and facility security management. Spearheads our strict 45-point physical safety and verification audits.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    accent: 'border-blue-400/30',
  },
  {
    name: 'Ananya Kapoor',
    role: 'Head of Resident Experience',
    bio: 'Dedicated to turning buildings into vibrant, empathetic communities. Curates wellness workshops, game nights, and resident care.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    accent: 'border-amber-400/30',
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-warm-gray-50 pt-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-white border-b border-warm-gray-200">
        {/* Decorative ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -right-20 w-80 h-80 bg-cta/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm tracking-wide mb-6">
              <Sparkles className="w-4 h-4" />
              <span>THE STORY OF STAYNEST</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-warm-gray-900 leading-tight tracking-tight mb-6">
              Making Urban Living Feel Like <span className="gradient-text">Home</span>
            </h1>

            <p className="text-lg sm:text-xl text-warm-gray-600 leading-relaxed font-normal">
              We are on a mission to redefine student and young professional living in India.
              No misleading pictures, no broker scams, and no compromises on comfort, community, or safety.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 btn-shine"
              >
                <span>Find Your Ideal PG</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#our-story"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-warm-gray-100 hover:bg-warm-gray-200 text-warm-gray-800 font-semibold transition-all"
              >
                <span>Read Our Story</span>
                <Compass className="w-4 h-4 text-warm-gray-500" />
              </a>
            </div>
          </AnimatedSection>

          {/* Quick Stats Grid */}
          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection
                  key={stat.label}
                  animation="fadeUp"
                  delay={index * 0.1}
                  className="bg-white rounded-2xl p-6 border border-warm-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-bold text-warm-gray-900">
                        <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs uppercase tracking-wider font-semibold text-warm-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-warm-gray-600 leading-snug">{stat.description}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section id="our-story" className="py-20 lg:py-24 bg-warm-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image Showcase */}
            <AnimatedSection animation="fadeRight" className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative colored glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary-light/10 to-cta/20 rounded-3xl blur-2xl -z-10" />

                {/* Primary Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="StayNest Co-living Interior"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary-light uppercase tracking-wider mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary-light" />
                        Verified StayNest Home
                      </div>
                      <p className="font-display font-medium text-lg text-white">
                        Curated Spaces Designed For Focus, Comfort & Community
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="hidden sm:flex absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-warm-gray-100 max-w-xs items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-warm-gray-900">45-Point Physical Audit</h5>
                    <p className="text-xs text-warm-gray-500">Every room verified in-person before going live</p>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Narrative */}
            <AnimatedSection animation="fadeLeft" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                Our Genesis
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
                Born Out of the Frustration of <span className="text-primary">City Relocation</span>
              </h2>

              <p className="text-warm-gray-600 leading-relaxed text-base sm:text-lg">
                Like millions of young Indians, our founders packed their bags to pursue engineering and
                careers in Bangalore. What was meant to be an exciting chapter quickly turned into weeks of
                exhausting PG hunts, misleading photos, brokers demanding hefty commissions, and dingy rooms
                with broken locks and substandard food.
              </p>

              <p className="text-warm-gray-600 leading-relaxed text-base">
                We realized that while India’s youth was powering the global tech economy, their most fundamental
                need—a safe, comfortable, and dignified place to sleep and connect—was fundamentally broken and
                unregulated.
              </p>

              <div className="border-l-4 border-primary pl-4 py-1 italic text-warm-gray-700 bg-primary/5 rounded-r-lg">
                "StayNest was founded with a singular promise: to give every newcomer the peace of mind,
                warmth, and security of home, right from day one in the city."
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-800 text-sm">No Middlemen</h4>
                    <p className="text-xs text-warm-gray-500">Direct bookings with certified hosts</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-800 text-sm">Full Transparency</h4>
                    <p className="text-xs text-warm-gray-500">Real photos, live reviews, upfront costs</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="py-20 bg-white border-y border-warm-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              What Drives Us
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-900 mt-3 mb-4">
              Our Mission & Core Values
            </h2>
            <p className="text-warm-gray-600">
              The foundational pillars that guide every property audit, every host partnership, and every resident interaction.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection
                  key={value.title}
                  animation="fadeUp"
                  delay={i * 0.1}
                  className="bg-white rounded-2xl p-7 border border-warm-gray-200 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 card-hover group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${value.bg} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-7 h-7 ${value.color}`} />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-warm-gray-100 text-warm-gray-600">
                        {value.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-warm-gray-800 mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    <p className="text-warm-gray-600 text-sm leading-relaxed mb-6">
                      {value.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-warm-gray-100 flex items-center text-xs font-semibold text-primary gap-1">
                    <span>StayNest Standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. The StayNest Difference (Comparison Table) */}
      <section className="py-20 lg:py-24 bg-warm-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cta font-bold text-xs uppercase tracking-widest bg-cta/10 px-3 py-1 rounded-full">
              Why Choose StayNest
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-900 mt-3 mb-4">
              Traditional PG Hunting vs. The <span className="text-primary">StayNest Way</span>
            </h2>
            <p className="text-warm-gray-600">
              See how our resident-first ecosystem transforms your living experience from day one.
            </p>
          </AnimatedSection>

          <div className="bg-white rounded-2xl shadow-lg border border-warm-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 bg-warm-gray-800 text-white p-4 sm:p-6 text-sm sm:text-base font-semibold">
              <div className="col-span-4 sm:col-span-3">Living Factor</div>
              <div className="col-span-4 sm:col-span-4 text-warm-gray-400">Traditional PGs & Hostels</div>
              <div className="col-span-4 sm:col-span-5 text-primary-light flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>StayNest Advantage</span>
              </div>
            </div>

            <div className="divide-y divide-warm-gray-100">
              {comparisonData.map((item, idx) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-12 p-4 sm:p-6 items-center text-xs sm:text-sm transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-warm-gray-50/50'
                  }`}
                >
                  <div className="col-span-4 sm:col-span-3 font-display font-bold text-warm-gray-800">
                    {item.feature}
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-warm-gray-500 pr-3 flex items-start gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 hidden sm:block" />
                    <span>{item.traditional}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-5 text-warm-gray-800 font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 hidden sm:block" />
                    <span className="text-primary-dark font-semibold">{item.staynest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Journey / Timeline */}
      <section className="py-20 bg-white border-b border-warm-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Growth & Milestones
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-900 mt-3 mb-4">
              Our Journey So Far
            </h2>
            <p className="text-warm-gray-600">
              From a single shared apartment idea in Bangalore to an all-India modern living network.
            </p>
          </AnimatedSection>

          <div className="relative max-w-4xl mx-auto">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-warm-gray-200" />

            <div className="space-y-12">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <AnimatedSection
                    key={milestone.year + milestone.quarter}
                    animation={isEven ? 'fadeRight' : 'fadeLeft'}
                    delay={idx * 0.15}
                    className="relative flex flex-col md:flex-row items-center"
                  >
                    {/* Content Left (Even) or Empty */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                      <div className="bg-warm-gray-50 border border-warm-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                            {milestone.quarter}
                          </span>
                          <span className="font-display font-bold text-lg text-warm-gray-900">
                            {milestone.year}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-lg text-warm-gray-800 mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-warm-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-8 h-8 rounded-full bg-primary text-white items-center justify-center shadow-lg ring-4 ring-white z-10">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>

                    {/* Space filler for the opposite side */}
                    <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`} />
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Leadership & Team */}
      <section className="py-20 bg-warm-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              The People Behind StayNest
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-900 mt-3 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-warm-gray-600">
              A diverse team of engineers, hospitality experts, and designers committed to transforming urban living.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <AnimatedSection
                key={member.name}
                animation="fadeUp"
                delay={i * 0.1}
                className="bg-white rounded-2xl overflow-hidden border border-warm-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 card-hover group"
              >
                <div className="relative aspect-square overflow-hidden bg-warm-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-display font-bold text-lg leading-tight">{member.name}</h4>
                    <p className="text-xs text-primary-light font-medium mt-0.5">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs sm:text-sm text-warm-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action (Bottom Banner) */}
      <section className="py-20 bg-warm-gray-900 text-white relative overflow-hidden">
        {/* Background abstract glowing accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/15 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection animation="fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-light font-semibold text-xs uppercase tracking-wider mb-6">
              <Smile className="w-4 h-4" />
              <span>Ready for a better stay?</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
              Experience the New Standard of <br />
              <span className="gradient-text">Paying Guest Accommodation</span>
            </h2>

            <p className="text-warm-gray-300 max-w-2xl mx-auto text-base sm:text-lg mb-10 leading-relaxed">
              Whether you are moving to a new city for college or kicking off your corporate journey,
              find a safe, vibrant, and verified PG in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/listings"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-xl shadow-primary/30 transform hover:-translate-y-0.5 btn-shine"
              >
                <span>Browse Verified PGs</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/#testimonials"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-warm-gray-800 hover:bg-warm-gray-700 text-white font-semibold transition-all border border-warm-gray-700"
              >
                <span>Read Resident Stories</span>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-warm-gray-800 flex flex-wrap justify-center items-center gap-8 text-xs text-warm-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> No Hidden Fees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Verified Landlords
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Instant Booking Assistance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> 24/7 Support Hotline
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
