const services = [
  { slug: "consultation", icon: "🩺", title: "General Consultation", short: "Meet our qualified doctors for routine checkups and medical advice.", link: "/consultation" },
  { slug: "pharmacy", icon: "💊", title: "Pharmacy", short: "Get trusted medicines and essentials directly from our pharmacy.", link: "/products" },
  {
    slug: "lab-tests", icon: "🧪", title: "Lab Tests",
    short: "Access accurate diagnostic tests and reports quickly and securely.",
    intro: "Book common diagnostic tests and receive your reports digitally. Prices below are sample values for this demo.",
    items: [
      { title: "Complete Blood Count (CBC)", text: "Rs. 600 · Report in 24 hours" },
      { title: "Blood Sugar (Fasting)", text: "Rs. 250 · Same-day report" },
      { title: "Lipid Profile", text: "Rs. 1500 · Report in 24 hours" },
      { title: "Liver Function Test", text: "Rs. 1400 · Report in 24 hours" },
      { title: "Thyroid Profile", text: "Rs. 1800 · Report in 48 hours" },
    ],
    cta: { label: "Book a Consultation", to: "/consultation" },
  },
  {
    slug: "emergency-care", icon: "🚑", title: "Emergency Care",
    short: "Immediate medical attention available for urgent health needs.",
    intro: "For life-threatening situations, call Rescue 1122 or go to the nearest hospital straight away. Our team can guide you on next steps.",
    items: [
      { title: "24/7 Emergency Guidance", text: "First-aid advice and triage support" },
      { title: "Ambulance Coordination", text: "Help arranging transport to the nearest hospital" },
      { title: "First Aid Supplies", text: "Order first-aid kits and antiseptics from our pharmacy" },
    ],
    cta: { label: "Shop First Aid", to: "/products" },
  },
  {
    slug: "vaccination", icon: "💉", title: "Vaccination",
    short: "Stay protected with our safe and reliable vaccination services.",
    intro: "Routine and travel vaccines for adults and children, given by trained staff. Availability and prices are sample values for this demo.",
    items: [
      { title: "Seasonal Flu Vaccine", text: "Adults and children · Rs. 1500" },
      { title: "Hepatitis B", text: "3-dose course · Rs. 1200 per dose" },
      { title: "Typhoid", text: "Single dose · Rs. 1800" },
      { title: "Tetanus", text: "Booster · Rs. 600" },
      { title: "Child Immunization", text: "As per the national schedule" },
    ],
    cta: { label: "Book a Consultation", to: "/consultation" },
  },
  {
    slug: "telemedicine", icon: "💻", title: "TeleMedicine",
    short: "Consult with doctors online from the comfort of your home.",
    intro: "Talk to a doctor without leaving home. In this demo, you book the appointment online and choose a time slot.",
    items: [
      { title: "Step 1: Choose a doctor", text: "Pick a specialist from the consultation page" },
      { title: "Step 2: Book a time slot", text: "Select your preferred date and time" },
      { title: "Step 3: Online consultation", text: "Attend the session and receive advice" },
    ],
    cta: { label: "Book Online Appointment", to: "/consultation" },
  },
];

export default services;