import { motion } from "framer-motion";
import { Activity, Users, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Activity,
    value: "50,000+",
    label: "Successful Treatments",
    color: "text-primary"
  },
  {
    icon: Users,
    value: "100+",
    label: "Expert Doctors",
    color: "text-secondary"
  },
  {
    icon: Award,
    value: "25+",
    label: "Years of Excellence",
    color: "text-warning"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Emergency Support",
    color: "text-success"
  },
];

export function StatsSection() {
  return (
    <section className="border-y bg-card py-16">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`mb-4 rounded-2xl bg-muted p-4 ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
