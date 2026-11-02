const services = [
  { slug: "consultation", icon: "🩺", title: "General Consultation", short: "Meet our qualified doctors for routine checkups and medical advice.", link: "/consultation" },
  { slug: "pharmacy", icon: "💊", title: "Pharmacy", short: "Get trusted medicines and essentials directly from our pharmacy.", link: "/products" },
    {
    slug: "lab-tests", icon: "🧪", title: "Lab Tests",
    short: "Access accurate diagnostic tests and reports quickly and securely.",
    intro: "Book common diagnostic tests and receive your reports digitally.",
    items: [
      { title: "Complete Blood Count (CBC)", price: 600, text: "Report in 24 hours" },
      { title: "Blood Sugar (Fasting)", price: 250, text: "Same-day report" },
      { title: "Lipid Profile", price: 1500, text: "Report in 24 hours" },
      { title: "Liver Function Test", price: 1400, text: "Report in 24 hours" },
      { title: "Thyroid Profile", price: 1800, text: "Report in 48 hours" },
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
    intro: "Routine and travel vaccines for adults and children, given by trained staff.",
    items: [
      { title: "Seasonal Flu Vaccine", price: 1500, text: "Adults and children" },
      { title: "Hepatitis B", price: 1200, text: "3-dose course, price per dose" },
      { title: "Typhoid", price: 1800, text: "Single dose" },
      { title: "Tetanus", price: 600, text: "Booster" },
      { title: "Child Immunization", price: 800, text: "As per the national schedule" },
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