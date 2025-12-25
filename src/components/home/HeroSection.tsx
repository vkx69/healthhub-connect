import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, 
  Calendar, 
  Shield, 
  Clock,
  ArrowRight 
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-medical-blue-light via-background to-medical-teal-light">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="medical" className="px-4 py-1.5">
                <Shield className="mr-1 h-3 w-3" />
                Trusted Healthcare Partner
              </Badge>
              
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your Health Is Our{" "}
                <span className="text-gradient">Top Priority</span>
              </h1>
              
              <p className="max-w-lg text-lg text-muted-foreground">
                Experience world-class healthcare with our team of expert doctors. 
                Book appointments, consult online, and access comprehensive medical services all in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/appointments">
                <Button variant="hero" size="xl">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/doctors">
                <Button variant="hero-outline" size="xl">
                  Find a Doctor
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: "50+", label: "Expert Doctors" },
                { value: "10k+", label: "Happy Patients" },
                { value: "24/7", label: "Emergency Care" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=700&fit=crop"
                  alt="Doctor consulting with patient"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Card - Emergency */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                    <Phone className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">24/7 Emergency</p>
                    <p className="font-semibold text-destructive">123-456-7999</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Availability */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-6 top-1/4 rounded-2xl bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                    <Clock className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Working Hours</p>
                    <p className="font-semibold">8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
