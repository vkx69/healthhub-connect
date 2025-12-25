import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MessageSquare, Video, FileText, ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/MainLayout";
import VideoCallPlaceholder from "@/components/consultation/VideoCallPlaceholder";
import ChatInterface from "@/components/consultation/ChatInterface";

const Consultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get("mode") || "chat");
  const [isCallActive, setIsCallActive] = useState(false);

  // Mock doctor data - would come from context/API
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "",
    experience: "15 years",
    rating: 4.9,
    consultationFee: 150,
  };

  const consultationHistory = [
    { id: 1, date: "Dec 20, 2024", type: "Video Call", duration: "25 mins", status: "Completed" },
    { id: 2, date: "Dec 15, 2024", type: "Chat", duration: "15 mins", status: "Completed" },
    { id: 3, date: "Dec 10, 2024", type: "Video Call", duration: "30 mins", status: "Completed" },
  ];

  const startVideoCall = () => {
    setIsCallActive(true);
    setActiveTab("video");
  };

  const endVideoCall = () => {
    setIsCallActive(false);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-primary/5 to-background min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Online Consultation
                </h1>
                <p className="text-muted-foreground">
                  Connect with your doctor via chat or video call
                </p>
              </div>
            </div>
            <Badge variant="success" className="hidden md:flex">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Doctor Available
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main consultation area */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-border/50">
                <CardHeader className="border-b border-border bg-muted/30 pb-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full max-w-md grid grid-cols-2 mb-4">
                      <TabsTrigger value="chat" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video Call
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] md:h-[600px]">
                    {activeTab === "chat" && (
                      <ChatInterface doctorName={doctor.name} />
                    )}
                    {activeTab === "video" && (
                      <>
                        {isCallActive ? (
                          <VideoCallPlaceholder
                            doctorName={doctor.name}
                            doctorSpecialty={doctor.specialty}
                            onEndCall={endVideoCall}
                          />
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                              <Video className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              Start Video Consultation
                            </h3>
                            <p className="text-muted-foreground max-w-md mb-6">
                              Connect face-to-face with {doctor.name} for a more personalized consultation experience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button onClick={startVideoCall} size="lg" className="gap-2">
                                <Video className="w-5 h-5" />
                                Start Video Call
                              </Button>
                              <Button variant="outline" size="lg" className="gap-2">
                                <Calendar className="w-5 h-5" />
                                Schedule for Later
                              </Button>
                            </div>
                            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                HD Video Quality
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                End-to-End Encrypted
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Doctor Info Card */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Consulting With</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-muted-foreground">• {doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-muted-foreground">Fee</p>
                      <p className="font-semibold text-foreground">${doctor.consultationFee}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-semibold text-green-600">Online</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="w-4 h-4" />
                    Request Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <User className="w-4 h-4" />
                    View Doctor Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Calendar className="w-4 h-4" />
                    Book Follow-up
                  </Button>
                </CardContent>
              </Card>

              {/* Consultation History */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {consultationHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.type === "Video Call" ? "bg-primary/10" : "bg-secondary/10"
                          }`}>
                            {item.type === "Video Call" ? (
                              <Video className="w-4 h-4 text-primary" />
                            ) : (
                              <MessageSquare className="w-4 h-4 text-secondary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.type}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {item.duration}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Consultation;
