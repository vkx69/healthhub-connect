import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Calendar } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    available: true
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "12+ years",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    available: true
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    available: true
  },
  {
    id: 4,
    name: "Dr. James Anderson",
    specialty: "Orthopedic Surgeon",
    experience: "18+ years",
    rating: 4.7,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    available: false
  },
];

export function DoctorsSection() {
  return (
    <section className="bg-muted/50 py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row"
        >
          <div>
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
              Meet Our <span className="text-gradient">Expert Doctors</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Experienced healthcare professionals dedicated to your wellbeing.
            </p>
          </div>
          <Link to="/doctors">
            <Button variant="outline" size="lg">
              View All Doctors
            </Button>
          </Link>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={doctor.available ? "success" : "secondary"}>
                    {doctor.available ? "Available" : "Busy"}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-primary">{doctor.specialty}</p>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{doctor.experience}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviews})</span>
                  </div>
                </div>

                <Link to={`/doctors/${doctor.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
