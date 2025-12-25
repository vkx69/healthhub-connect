import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Ambulance, 
  Syringe, 
  FlaskConical, 
  Pill,
  Heart,
  Brain,
  Baby
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Stethoscope,
    title: "OPD Services",
    description: "Comprehensive outpatient care with expert consultations across all specialties.",
    color: "bg-primary/10 text-primary",
    href: "/services/opd"
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description: "24/7 emergency services with state-of-the-art trauma care facilities.",
    color: "bg-destructive/10 text-destructive",
    href: "/services/emergency"
  },
  {
    icon: Syringe,
    title: "Surgery",
    description: "Advanced surgical procedures with minimally invasive techniques.",
    color: "bg-secondary/10 text-secondary",
    href: "/services/surgery"
  },
  {
    icon: FlaskConical,
    title: "Diagnostics",
    description: "Modern diagnostic facilities including lab tests, imaging, and more.",
    color: "bg-warning/10 text-warning",
    href: "/services/diagnostics"
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "In-house pharmacy with genuine medicines and doorstep delivery.",
    color: "bg-success/10 text-success",
    href: "/services/pharmacy"
  },
  {
    icon: Heart,
    title: "Cardiology",
    description: "Expert cardiac care from prevention to advanced heart procedures.",
    color: "bg-destructive/10 text-destructive",
    href: "/services/cardiology"
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Specialized care for brain and nervous system disorders.",
    color: "bg-primary/10 text-primary",
    href: "/services/neurology"
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Compassionate healthcare for infants, children, and adolescents.",
    color: "bg-secondary/10 text-secondary",
    href: "/services/pediatrics"
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Our <span className="text-gradient">Medical Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive healthcare services designed to meet all your medical needs 
            with the highest standards of care.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
