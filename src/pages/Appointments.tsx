import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, User, Stethoscope, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "ENT",
  "Gynecology",
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

const steps = [
  { id: 1, title: "Select Department", icon: Stethoscope },
  { id: 2, title: "Choose Date & Time", icon: CalendarIcon },
  { id: 3, title: "Patient Details", icon: User },
  { id: 4, title: "Confirm Booking", icon: CheckCircle2 },
];

const Appointments = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [department, setDepartment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${date ? format(date, "PPP") : ""} at ${selectedTime}.`,
    });
    setCurrentStep(4);
  };

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
              Book an <span className="text-gradient">Appointment</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule your visit in just a few simple steps
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Progress Steps */}
            <div className="mb-12 flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                        currentStep >= step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-background text-muted-foreground"
                      )}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      "mt-2 text-xs font-medium hidden sm:block",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 mx-2",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border bg-card p-8 shadow-card"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Select Department</h2>
                  <p className="text-muted-foreground">Choose the department for your appointment</p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {departments.map((dept) => (
                      <div
                        key={dept}
                        onClick={() => setDepartment(dept)}
                        className={cn(
                          "cursor-pointer rounded-xl border p-4 transition-all hover:border-primary",
                          department === dept
                            ? "border-primary bg-primary/5"
                            : "border-muted"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            department === dept ? "bg-primary text-primary-foreground" : "bg-muted"
                          )}>
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <span className="font-medium">{dept}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Choose Date & Time</h2>
                  <p className="text-muted-foreground">Select your preferred appointment slot</p>
                  
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <Label className="mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-xl border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-3 block">Available Time Slots</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Patient Details</h2>
                  <p className="text-muted-foreground">Please provide your information</p>
                  
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea
                        id="reason"
                        placeholder="Briefly describe your symptoms or reason for appointment"
                        rows={4}
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-semibold">Appointment Confirmed!</h2>
                  <p className="text-muted-foreground">
                    Your appointment has been successfully booked. You will receive a confirmation email shortly.
                  </p>
                  
                  <div className="mx-auto max-w-sm rounded-xl border bg-muted/30 p-6 text-left">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Department:</span>
                        <span className="font-medium">{department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{date ? format(date, "PPP") : "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              {currentStep < 4 && (
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  {currentStep < 3 ? (
                    <Button variant="hero" onClick={handleNext}>
                      Continue
                    </Button>
                  ) : (
                    <Button variant="hero" onClick={handleSubmit}>
                      Confirm Booking
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Appointments;
