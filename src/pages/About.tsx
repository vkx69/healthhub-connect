import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Users, Heart, Target } from "lucide-react";

const About = () => {
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
            <Badge variant="medical" className="mb-4 px-4 py-1">About Us</Badge>
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              Your Trusted <span className="text-gradient">Healthcare Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Providing exceptional medical care with compassion and expertise since 2000.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
                alt="Hospital building"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2000, MediCare Hospital began with a simple vision: to provide accessible, 
                high-quality healthcare to every individual. Over the past 25 years, we have grown 
                from a small clinic to a multi-specialty hospital serving thousands of patients annually.
              </p>
              <p className="text-muted-foreground">
                Our commitment to excellence, combined with cutting-edge technology and a compassionate 
                team of healthcare professionals, has made us one of the most trusted names in healthcare.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="rounded-xl border bg-card p-4 shadow-card">
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-card">
                  <div className="text-3xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">Patients Treated</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at MediCare Hospital.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description: "We treat every patient with empathy, kindness, and respect."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for the highest standards in medical care."
              },
              {
                icon: Users,
                title: "Teamwork",
                description: "We collaborate to deliver the best outcomes for our patients."
              },
              {
                icon: Target,
                title: "Innovation",
                description: "We embrace new technologies to improve patient care."
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border bg-card p-6 shadow-card text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals leading our mission to transform healthcare.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Robert Wilson",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop"
              },
              {
                name: "Dr. Patricia Brown",
                role: "Chief Medical Officer",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop"
              },
              {
                name: "Dr. William Lee",
                role: "Chief Operating Officer",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop"
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border bg-card p-6 shadow-card text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
