import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock } from "lucide-react";
const quickLinks = [{
  name: "Find a Doctor",
  href: "/doctors"
}, {
  name: "Book Appointment",
  href: "/appointments"
}, {
  name: "Our Services",
  href: "/services"
}, {
  name: "Patient Portal",
  href: "/patient"
}, {
  name: "Emergency Care",
  href: "/emergency"
}];
const services = [{
  name: "OPD Services",
  href: "/services/opd"
}, {
  name: "Emergency Care",
  href: "/services/emergency"
}, {
  name: "Diagnostics",
  href: "/services/diagnostics"
}, {
  name: "Surgery",
  href: "/services/surgery"
}, {
  name: "Pharmacy",
  href: "/services/pharmacy"
}];
const socialLinks = [{
  icon: Facebook,
  href: "#",
  label: "Facebook"
}, {
  icon: Twitter,
  href: "#",
  label: "Twitter"
}, {
  icon: Instagram,
  href: "#",
  label: "Instagram"
}, {
  icon: Linkedin,
  href: "#",
  label: "LinkedIn"
}];
export function Footer() {
  return <footer className="border-t bg-card">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-bold">ArogyaAI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner in healthcare. We provide comprehensive medical services with compassion and excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={social.label}>
                  <social.icon className="h-4 w-4" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-3">
              {services.map(service => <li key={service.name}>
                  <Link to={service.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {service.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">123  Center Drive
Healthcare City, HC 12345<br />
                  Healthcare City, HC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground">General: (123) 456-7890</p>
                  <p className="font-medium text-success">Emergency: (123) 456-7999</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">info@ ArogyaAI.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p>Emergency: 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025  ArogyaAI All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-primary">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}