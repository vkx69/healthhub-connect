import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Star, Calendar, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
  "Dermatologist",
  "ENT Specialist",
  "Gynecologist",
];

const allDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    available: true,
    nextAvailable: "Today, 3:00 PM"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "12+ years",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    available: true,
    nextAvailable: "Tomorrow, 10:00 AM"
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    available: true,
    nextAvailable: "Today, 5:00 PM"
  },
  {
    id: 4,
    name: "Dr. James Anderson",
    specialty: "Orthopedic",
    experience: "18+ years",
    rating: 4.7,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    available: false,
    nextAvailable: "Dec 28, 9:00 AM"
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    specialty: "Dermatologist",
    experience: "8+ years",
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
    available: true,
    nextAvailable: "Today, 4:30 PM"
  },
  {
    id: 6,
    name: "Dr. David Kim",
    specialty: "ENT Specialist",
    experience: "14+ years",
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    available: true,
    nextAvailable: "Tomorrow, 11:00 AM"
  },
];

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

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
              Find Your <span className="text-gradient">Doctor</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Search from our network of experienced healthcare professionals
            </p>

            {/* Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search doctors by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 text-base"
                />
              </div>
              <Button variant="hero" size="xl">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12">
        <div className="container">
          {/* Specialty Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
            </p>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Doctors Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex gap-4 p-5">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                      </div>
                      <Badge variant={doctor.available ? "success" : "secondary"}>
                        {doctor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{doctor.experience}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t bg-muted/30 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Next Available:</span>
                    <span className="font-medium">{doctor.nextAvailable}</span>
                  </div>
                  <Link to={`/appointments?doctor=${doctor.id}`}>
                    <Button variant="hero" className="w-full">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Doctors;
