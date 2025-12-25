import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Ambulance, 
  Syringe, 
  FlaskConical, 
  Pill,
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Ear,
  Activity,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "OPD Services",
    description: "Comprehensive outpatient consultations across all medical specialties. Our OPD operates with scheduled appointments and walk-in facilities.",
    features: ["General Medicine", "Specialist Consultations", "Follow-up Care", "Health Checkups"],
    color: "bg-primary/10 text-primary",
    href: "/services/opd"
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description: "24/7 emergency services with state-of-the-art trauma care and critical care units. Immediate response for life-threatening conditions.",
    features: ["24/7 Availability", "Trauma Care", "Critical Care Unit", "Ambulance Services"],
    color: "bg-destructive/10 text-destructive",
    href: "/services/emergency"
  },
  {
    icon: Syringe,
    title: "Surgery",
    description: "Advanced surgical procedures performed by experienced surgeons using minimally invasive techniques and cutting-edge technology.",
    features: ["General Surgery", "Laparoscopic Surgery", "Day Care Surgery", "Post-op Care"],
    color: "bg-secondary/10 text-secondary",
    href: "/services/surgery"
  },
  {
    icon: FlaskConical,
    title: "Diagnostics",
    description: "Modern diagnostic laboratory and imaging center with quick turnaround times and accurate results.",
    features: ["Blood Tests", "MRI & CT Scan", "X-Ray", "Ultrasound"],
    color: "bg-warning/10 text-warning",
    href: "/services/diagnostics"
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "In-house pharmacy stocked with genuine medicines. Available round the clock with home delivery options.",
    features: ["24/7 Pharmacy", "Genuine Medicines", "Home Delivery", "Prescription Refills"],
    color: "bg-success/10 text-success",
    href: "/services/pharmacy"
  },
  {
    icon: Heart,
    title: "Cardiology",
    description: "Comprehensive cardiac care from prevention to intervention, including advanced heart procedures.",
    features: ["ECG & Echo", "Angiography", "Bypass Surgery", "Cardiac Rehab"],
    color: "bg-destructive/10 text-destructive",
    href: "/services/cardiology"
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Expert care for brain and nervous system disorders with advanced diagnostic and treatment options.",
    features: ["EEG & EMG", "Stroke Care", "Epilepsy Treatment", "Neuro Surgery"],
    color: "bg-primary/10 text-primary",
    href: "/services/neurology"
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Compassionate healthcare for infants, children, and adolescents with specialized pediatric facilities.",
    features: ["Well-baby Clinic", "Vaccinations", "NICU", "Pediatric Surgery"],
    color: "bg-secondary/10 text-secondary",
    href: "/services/pediatrics"
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Complete bone and joint care including trauma, joint replacement, and sports medicine.",
    features: ["Joint Replacement", "Spine Surgery", "Sports Medicine", "Physiotherapy"],
    color: "bg-warning/10 text-warning",
    href: "/services/orthopedics"
  },
];

const Services = () => {
  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-gradient-to-br from-medical-blue-light via-background to-medical-teal-light py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Our <span className="text-gradient">Medical Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive healthcare services designed to meet all your medical needs with excellence and compassion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <div className="group h-full rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                    <div className={`mb-4 inline-flex rounded-xl p-3 ${service.color}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mb-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;
