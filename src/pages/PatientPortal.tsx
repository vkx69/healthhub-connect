import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, FileText, Pill, FolderOpen, Calendar, Settings, ArrowLeft, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MainLayout } from "@/components/layout/MainLayout";
import MedicalHistorySection from "@/components/patient/MedicalHistorySection";
import PrescriptionsSection from "@/components/patient/PrescriptionsSection";
import ReportsSection from "@/components/patient/ReportsSection";
const PatientPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("history");

  // Mock patient data
  const patient = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "March 15, 1985",
    bloodType: "O+",
    memberId: "MED-2024-78542",
    memberSince: "January 2020"
  };
  const upcomingAppointments = [{
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Dec 28, 2024",
    time: "10:00 AM"
  }, {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "Jan 5, 2025",
    time: "2:30 PM"
  }];
  return <MainLayout>
      <div className="bg-gradient-to-b from-primary/5 to-background min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Patient Portal
                </h1>
                <p className="text-muted-foreground">
                  Manage your health records and appointments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Patient Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="relative pt-12 pb-6">
                  <Avatar className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-card">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-foreground text-center">{patient.name}</h3>
                    
                    <Badge variant="medical" className="mt-2">
                      {patient.memberId}
                    </Badge>
                  </div>
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date of Birth</span>
                      <span className="font-medium text-foreground">{patient.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Type</span>
                      <Badge variant="destructive">{patient.bloodType}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium text-foreground">{patient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="font-medium text-foreground">{patient.memberSince}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Upcoming Appointments
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {upcomingAppointments.map(apt => <div key={apt.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                        <p className="font-medium text-foreground text-sm">{apt.doctor}</p>
                        <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <Badge variant="outline">{apt.date}</Badge>
                          <Badge variant="secondary">{apt.time}</Badge>
                        </div>
                      </div>)}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-primary" onClick={() => navigate("/appointments")}>
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/appointments")}>
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/consultation")}>
                      <User className="w-4 h-4" />
                      Start Consultation
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Pill className="w-4 h-4" />
                      Request Refill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-border px-6 pt-4">
                    <TabsList className="w-full justify-start gap-2 bg-transparent p-0">
                      <TabsTrigger value="history" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg gap-2">
                        <FileText className="w-4 h-4" />
                        Medical History
                      </TabsTrigger>
                      <TabsTrigger value="prescriptions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg gap-2">
                        <Pill className="w-4 h-4" />
                        Prescriptions
                      </TabsTrigger>
                      <TabsTrigger value="reports" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg gap-2">
                        <FolderOpen className="w-4 h-4" />
                        Reports
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="p-6">
                    <TabsContent value="history" className="m-0">
                      <MedicalHistorySection />
                    </TabsContent>
                    <TabsContent value="prescriptions" className="m-0">
                      <PrescriptionsSection />
                    </TabsContent>
                    <TabsContent value="reports" className="m-0">
                      <ReportsSection />
                    </TabsContent>
                  </div>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>;
};
export default PatientPortal;