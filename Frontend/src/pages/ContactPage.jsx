import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  Headphones,
  Building2,
  User,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

/* ─── Contact info cards ─────────────────────────────── */
const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 80000 00000'],
    sub: 'Mon – Sat, 9 AM – 8 PM IST',
    color: 'text-primary',
    bg: 'bg-primary/10',
    action: 'tel:+919876543210',
    actionLabel: 'Call now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['support@staynest.in', 'hello@staynest.in'],
    sub: 'We reply within 2 business hours',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    action: 'mailto:support@staynest.in',
    actionLabel: 'Send email',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['12th Floor, Prestige Tower', 'MG Road, Bengaluru – 560001'],
    sub: 'By appointment only',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    action: 'https://maps.google.com',
    actionLabel: 'Get directions',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon – Fri: 9 AM – 8 PM', 'Sat: 10 AM – 6 PM'],
    sub: 'Closed on Sundays & national holidays',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    action: null,
    actionLabel: null,
  },
];

/* ─── FAQ data ───────────────────────────────────────── */
const faqs = [
  {
    q: 'How quickly will I get a response to my inquiry?',
    a: 'Our support team typically responds within 2 business hours via email, and immediately via phone during working hours.',
  },
  {
    q: 'Can I schedule a property visit through the contact form?',
    a: 'Yes! Simply select "Property Visit" as your subject and mention your preferred date and city. Our team will confirm a slot within 24 hours.',
  },
  {
    q: 'I am a property owner. How do I list my PG on StayNest?',
    a: 'Select "List My Property" in the subject field and share a few details. Our onboarding team will reach out within one working day to begin the verification process.',
  },
  {
    q: 'Is there live chat support available?',
    a: 'Live chat is available on our platform for registered users. For general queries before sign-up, the contact form or phone is the fastest route.',
  },
  {
    q: 'How do I report an issue with a property or booking?',
    a: 'Use the contact form with the subject "Report an Issue". For urgent matters, please call us directly so we can prioritise your case.',
  },
];

/* ─── FAQ Accordion item ─────────────────────────────── */
const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-warm-gray-200 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-warm-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-primary"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-warm-gray-600 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main component ─────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subjects = [
    'General Inquiry',
    'Property Visit',
    'List My Property',
    'Report an Issue',
    'Billing & Payments',
    'Partnership',
    'Other',
  ];

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-black text-white overflow-hidden py-28 md:py-36">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light rounded-full px-4 py-2 text-sm font-medium mb-6"
          >
            <Headphones className="w-4 h-4" />
            We&apos;re here to help
          </motion.div>

          <motion.h1
            className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get in{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>

          <motion.p
            className="text-warm-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you&apos;re looking for your perfect PG, wanting to list your property, or just
            have a question — our friendly team is always ready to assist.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 z-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl shadow-lg border border-warm-gray-100 p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900 mb-1">{card.title}</h3>
                {card.lines.map((l) => (
                  <p key={l} className="text-gray-700 font-medium text-sm">
                    {l}
                  </p>
                ))}
                <p className="text-warm-gray-500 text-xs mt-1">{card.sub}</p>
              </div>
              {card.action && (
                <a
                  href={card.action}
                  target={card.action.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`text-sm font-semibold ${card.color} hover:underline mt-auto`}
                >
                  {card.actionLabel} →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left sidebar */}
          <AnimatedSection animation="fadeLeft" className="lg:col-span-2">
            <div className="sticky top-28 space-y-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">
                  Let&apos;s start a conversation
                </h2>
                <p className="text-warm-gray-600 leading-relaxed">
                  Fill out the form and our team will get back to you as quickly as possible. No
                  bots, no auto-replies — just real people who care.
                </p>
              </div>

              {/* Commitment badges */}
              <div className="space-y-3">
                {[
                  { icon: CheckCircle2, text: 'Response within 2 hours', color: 'text-primary' },
                  { icon: MessageCircle, text: 'Dedicated support team', color: 'text-blue-500' },
                  { icon: Building2, text: '1200+ verified properties', color: 'text-amber-500' },
                  { icon: User, text: 'Real people, real help', color: 'text-rose-500' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color} shrink-0`} />
                    <span className="text-gray-700 text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-warm-gray-100 shadow-md">
                <iframe
                  title="StayNest Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.893580013487!2d77.6072!3d12.9721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  className="grayscale"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection animation="fadeRight" className="lg:col-span-3">
            <div className="bg-white border border-warm-gray-100 rounded-3xl shadow-lg p-8 md:p-10">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900">
                    Message Received!
                  </h3>
                  <p className="text-warm-gray-600 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 2 business
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="mt-4 text-primary font-semibold hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-display font-bold text-2xl text-gray-900">
                    Send us a message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Rahul Sharma"
                        className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-800 placeholder-warm-gray-400 bg-warm-gray-50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="rahul@email.com"
                        className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-800 placeholder-warm-gray-400 bg-warm-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-800 placeholder-warm-gray-400 bg-warm-gray-50"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-800 bg-warm-gray-50 appearance-none"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-800 placeholder-warm-gray-400 bg-warm-gray-50 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-semibold py-4 rounded-xl transition-colors"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending&hellip;
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-warm-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-warm-gray-600">
              Can&apos;t find what you&apos;re looking for? Use the form above to reach us directly.
            </p>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
