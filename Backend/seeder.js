const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PG = require('./models/PG');

dotenv.config();

const samplePGs = [
  {
    name: "Green Valley Residency",
    location: "Koramangala, Bangalore",
    city: "bangalore",
    price: 8500,
    gender: "boys",
    roomTypes: ["single", "double"],
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry", "parking"],
    description: "Premium boys PG with modern amenities in the heart of Koramangala. Close to major IT parks and colleges with 24/7 security and high-speed fiber internet.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["No smoking inside premises", "Guests allowed till 8 PM", "80% attendance for meals compulsory"],
    owner: { name: "Rajesh Kumar", phone: "9876543210", email: "rajesh@greenvalley.com" }
  },
  {
    name: "Sunshine Ladies PG",
    location: "HSR Layout, Bangalore",
    city: "bangalore",
    price: 12000,
    gender: "girls",
    roomTypes: ["double", "triple"],
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry"],
    description: "Safe and secure ladies PG with biometric entry, 24/7 CCTV surveillance, home-cooked three times meals, and daily housekeeping.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Entry after 10 PM requires prior notice", "No male visitors after 6 PM", "Washing machine use scheduled"],
    owner: { name: "Priya Sharma", phone: "9876543211", email: "priya@sunshinepg.com" }
  },
  {
    name: "Urban Nest Co-Living",
    location: "Koregaon Park, Pune",
    city: "pune",
    price: 15000,
    gender: "coed",
    roomTypes: ["single", "double"],
    rating: 4.3,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "parking", "laundry"],
    description: "Modern co-living space for professionals with community co-working areas, gaming lounges, high-speed internet, and regular networking events.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Separate wings for male and female", "Common lounges close at 11 PM", "No loud music post 10 PM"],
    owner: { name: "Amit Patel", phone: "9876543212", email: "amit@urbannest.com" }
  },
  {
    name: "Metro View Residency",
    location: "Dwarka, Delhi",
    city: "delhi",
    price: 11000,
    gender: "boys",
    roomTypes: ["double", "triple"],
    rating: 4.2,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "food", "laundry", "parking"],
    description: "Affordable and convenient PG situated 2 minutes away from Dwarka Sector 12 metro station. High connectivity to North Campus and Gurgaon cyber city.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["No smoking on premises", "Curfew at 10:30 PM", "Weekly room cleaning mandatory"],
    owner: { name: "Suresh Gupta", phone: "9876543213", email: "suresh@metroview.com" }
  },
  {
    name: "Comfort Zone PG",
    location: "Madhapur, Hyderabad",
    city: "hyderabad",
    price: 9500,
    gender: "girls",
    roomTypes: ["single", "double"],
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry", "parking"],
    description: "Premium single & double occupancy rooms with attached washrooms, ergonomic study desks, South & North Indian meal choices, walking distance from HITEC City.",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Entry after 9:30 PM by prior notice", "Visitors allowed in common lounge", "Fresh linens provided weekly"],
    owner: { name: "Lakshmi Reddy", phone: "9876543214", email: "lakshmi@comfortzone.com" }
  },
  {
    name: "City Center Homes",
    location: "Andheri West, Mumbai",
    city: "mumbai",
    price: 18000,
    gender: "coed",
    roomTypes: ["single", "double", "triple"],
    rating: 4.4,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "laundry", "parking"],
    description: "Modern co-living space in the vibrant heart of Mumbai. High connectivity to local train and metro stations, fully furnished rooms with attached balconies.",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Quiet hours 10 PM - 7 AM", "No parties without prior management approval", "Monthly rent due by 5th"],
    owner: { name: "Vikram Shah", phone: "9876543215", email: "vikram@citycenter.com" }
  },
  {
    name: "Silicon Oasis Luxury Living",
    location: "Electronic City Phase 1, Bangalore",
    city: "bangalore",
    price: 10500,
    gender: "boys",
    roomTypes: ["single", "double"],
    rating: 4.7,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry", "parking"],
    description: "Executive stay tailored for techies working at Infosys, Wipro, and surrounding tech zones. Includes buffet breakfast & dinner, power backup, gym access.",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Power conservation: turn off AC when leaving", "Zero tolerance for substance abuse", "Guests allowed till 9 PM"],
    owner: { name: "Naveen Gowda", phone: "9876543216", email: "naveen@siliconoasis.com" }
  },
  {
    name: "Lotus Palace Girls PG",
    location: "Viman Nagar, Pune",
    city: "pune",
    price: 13500,
    gender: "girls",
    roomTypes: ["double", "triple"],
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry"],
    description: "Boutique girls accommodation opposite Phoenix Marketcity. Safe neighborhood, gated security, hygienic mess, and peaceful study atmosphere for students.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Gate closing time 10:00 PM", "Visitor entry restricted to reception", "Strict adherence to hygiene standards"],
    owner: { name: "Sunita Kulkarni", phone: "9876543217", email: "sunita@lotuspalace.com" }
  },
  {
    name: "Coastal Breeze Co-Living",
    location: "Adyar, Chennai",
    city: "chennai",
    price: 12500,
    gender: "coed",
    roomTypes: ["single", "double"],
    rating: 4.5,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "parking", "laundry"],
    description: "Charming stay close to Elliot's Beach and major educational institutions like IIT Madras. Serene, breezy environment with modern co-working setup.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Respect quiet hours post 10:30 PM", "Eco-friendly campus: switch off appliances", "No outside caterers in dining hall"],
    owner: { name: "Ramanathan Iyer", phone: "9876543218", email: "raman@coastalbreeze.com" }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { tlsAllowInvalidCertificates: true });
    console.log('MongoDB Atlas Connected...');

    if (process.argv[2] === '-d') {
      await PG.deleteMany();
      console.log('Data destroyed successfully!');
      process.exit();
    }

    await PG.deleteMany();
    await PG.insertMany(samplePGs);

    console.log(`Successfully seeded ${samplePGs.length} PG listings into MongoDB Atlas!`);
    process.exit();
  } catch (error) {
    console.error('Seeder Error:', error);
    process.exit(1);
  }
};

seedDB();
