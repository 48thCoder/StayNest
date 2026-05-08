export const pgData = [
  {
    id: 1,
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
    description: "Premium boys PG with modern amenities in the heart of Koramangala. Close to major IT parks and colleges.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["No smoking inside premises", "Guests allowed till 8 PM", "80% attendance for meals compulsory"],
    owner: { name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@greenvalley.com" }
  },
  {
    id: 2,
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
    description: "Safe and secure ladies PG with 24/7 security, home-cooked meals, and AC rooms in a prime location.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Entry after 10 PM requires ID proof", "No male visitors after 6 PM", "Washing machine use scheduled"],
    owner: { name: "Priya Sharma", phone: "+91 98765 43211", email: "priya@sunshinepg.com" }
  },
  {
    id: 3,
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
    description: "Modern co-living space for professionals with community events, networking opportunities, and premium amenities.",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Separate floors for male and female", "Common areas close at 11 PM", "No pets allowed"],
    owner: { name: "Amit Patel", phone: "+91 98765 43212", email: "amit@urbannest.com" }
  },
  {
    id: 4,
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
    description: "Affordable PG near metro station with easy connectivity to Delhi University and corporate hubs.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["No alcohol on premises", "Curfew at 11 PM", "Weekly room cleaning mandatory"],
    owner: { name: "Suresh Gupta", phone: "+91 98765 43213", email: "suresh@metroview.com" }
  },
  {
    id: 5,
    name: "Comfort Zone PG",
    location: "Madhapur, Hyderabad",
    city: "hyderabad",
    price: 9500,
    gender: "girls",
    roomTypes: ["single"],
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "food", "laundry", "parking"],
    description: "Premium single occupancy rooms with attached bathroom, study area, and nutritious meal plans for working women.",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Entry after 9 PM by prior notice", "Parents/guardians can visit anytime", "Food menu rotates weekly"],
    owner: { name: "Lakshmi Reddy", phone: "+91 98765 43214", email: "lakshmi@comfortzone.com" }
  },
  {
    id: 6,
    name: "City Center Homes",
    location: "Andheri West, Mumbai",
    city: "mumbai",
    price: 18000,
    gender: "coed",
    roomTypes: ["double", "triple"],
    rating: 4.4,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["wifi", "ac", "laundry", "parking"],
    description: "Modern co-living space in the heart of Mumbai with excellent connectivity to business districts and entertainment hubs.",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rules: ["Quiet hours 10 PM - 7 AM", "No parties without prior approval", "Monthly rent due by 5th"],
    owner: { name: "Vikram Shah", phone: "+91 98765 43215", email: "vikram@citycenter.com" }
  }
];

export const testimonials = [
  {
    name: "Rohit Sharma",
    occupation: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    quote: "Found my perfect PG within 2 days of using StayNest. The verification process gave me confidence, and the place exactly matched the photos."
  },
  {
    name: "Priya Patel",
    occupation: "Medical Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    quote: "As a student, safety was my top priority. StayNest helped me find a secure girls PG near my college with great amenities at an affordable price."
  },
  {
    name: "Arjun Nair",
    occupation: "Marketing Professional",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    rating: 4,
    quote: "The co-living space I found through StayNest has an amazing community. Made great friends and the location is perfect for my office commute."
  }
];

export const amenityIcons = {
  wifi: { icon: 'Wifi', label: 'WiFi' },
  ac: { icon: 'Snowflake', label: 'AC' },
  food: { icon: 'Utensils', label: 'Meals' },
  laundry: { icon: 'Shirt', label: 'Laundry' },
  parking: { icon: 'Car', label: 'Parking' }
};

export const cities = [
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'pune', label: 'Pune' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' }
];
