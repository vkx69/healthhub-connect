import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "Patient",
    content: "The care I received at MediCare was exceptional. The doctors were thorough and the staff made me feel comfortable throughout my treatment.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Robert Thompson",
    role: "Patient",
    content: "Quick appointment scheduling, minimal wait times, and excellent follow-up care. I highly recommend MediCare to everyone.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Patient",
    content: "The online consultation feature is amazing. I was able to speak with a specialist from home and get the prescription I needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
  },
];

export function TestimonialsSection() {
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
            What Our <span className="text-gradient">Patients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from patients who have experienced our healthcare services.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border bg-card p-8 shadow-card"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="rounded-full bg-primary p-2">
                  <Quote className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
