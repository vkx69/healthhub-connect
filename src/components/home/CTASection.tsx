import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
            Ready to Take the First Step Towards Better Health?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Schedule an appointment today and experience healthcare like never before. 
            Our team of experts is ready to provide you with personalized care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointments">
              <Button size="xl" className="bg-card text-foreground hover:bg-card/90">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
