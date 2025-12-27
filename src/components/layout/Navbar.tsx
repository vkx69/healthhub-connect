import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
const navigation = [{
  name: "Home",
  href: "/"
}, {
  name: "Doctors",
  href: "/doctors"
}, {
  name: "Services",
  href: "/services"
}, {
  name: "Health Assistant",
  href: "/health-assistant"
}, {
  name: "Appointments",
  href: "/appointments"
}, {
  name: "Consultation",
  href: "/consultation"
}, {
  name: "Patient Portal",
  href: "/patient-portal"
}, {
  name: "About",
  href: "/about"
}, {
  name: "Contact",
  href: "/contact"
}];
export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }} className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero">
            <span className="text-xl font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-bold text-foreground">​ArogyaAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map(item => <Link key={item.name} to={item.href} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent ${location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
              {item.name}
            </Link>)}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <a href="tel:+1234567890" className="hidden items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm font-medium text-success md:flex">
            <Phone className="h-4 w-4" />
            <span>Emergency: 123-456-7890</span>
          </a>
          
          <Link to="/appointments">
            <Button variant="hero" size="lg" className="hidden sm:flex">
              Book Appointment
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" size="default" className="hidden sm:flex">
              Login
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero">
                      <span className="text-xl font-bold text-primary-foreground">M</span>
                    </div>
                    <span className="text-xl font-bold">MediCare</span>
                  </Link>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className={`rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent ${location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
                      {item.name}
                    </Link>)}
                </nav>

                <div className="flex flex-col gap-3 pt-4 border-t">
                  <a href="tel:+1234567890" className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm font-medium text-success">
                    <Phone className="h-4 w-4" />
                    <span>Emergency: 123-456-7890</span>
                  </a>
                  
                  <Link to="/appointments" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" size="lg" className="w-full">
                      Book Appointment
                    </Button>
                  </Link>

                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="lg" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>;
}