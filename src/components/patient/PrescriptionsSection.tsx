import { Download, Eye, Pill, Clock, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril 10mg",
    purpose: "Blood Pressure Control",
    doctor: "Dr. Sarah Johnson",
    prescribedDate: "Dec 20, 2024",
    dosage: "1 tablet daily",
    duration: "30 days",
    refillsLeft: 2,
    status: "Active",
    daysRemaining: 25,
    totalDays: 30,
  },
  {
    id: 2,
    medication: "Metformin 500mg",
    purpose: "Diabetes Management",
    doctor: "Dr. Michael Chen",
    prescribedDate: "Dec 15, 2024",
    dosage: "1 tablet twice daily",
    duration: "90 days",
    refillsLeft: 1,
    status: "Active",
    daysRemaining: 78,
    totalDays: 90,
  },
  {
    id: 3,
    medication: "Ibuprofen 400mg",
    purpose: "Pain Relief - Post Surgery",
    doctor: "Dr. Emily Davis",
    prescribedDate: "Nov 28, 2024",
    dosage: "As needed, max 3 daily",
    duration: "14 days",
    refillsLeft: 0,
    status: "Completed",
    daysRemaining: 0,
    totalDays: 14,
  },
  {
    id: 4,
    medication: "Omeprazole 20mg",
    purpose: "Acid Reflux",
    doctor: "Dr. Robert Wilson",
    prescribedDate: "Nov 15, 2024",
    dosage: "1 capsule before breakfast",
    duration: "30 days",
    refillsLeft: 0,
    status: "Expired",
    daysRemaining: 0,
    totalDays: 30,
  },
];

const PrescriptionsSection = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Completed":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "Expired":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Pill className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Completed":
        return "secondary";
      case "Expired":
        return "warning";
      default:
        return "default";
    }
  };

  const activePrescriptions = prescriptions.filter((p) => p.status === "Active");

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <Pill className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">{activePrescriptions.length}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <RefreshCw className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-muted-foreground">Refills Available</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-amber-600" />
            <p className="text-2xl font-bold text-amber-600">1</p>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-600">{prescriptions.length}</p>
            <p className="text-sm text-muted-foreground">Total Prescriptions</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Active Prescriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activePrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-muted/30 rounded-xl p-4 border border-border/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{prescription.medication}</h4>
                    <Badge variant={getStatusVariant(prescription.status) as any}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{prescription.purpose}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Dosage</p>
                  <p className="font-medium text-foreground">{prescription.dosage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Prescribed By</p>
                  <p className="font-medium text-foreground">{prescription.doctor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Prescribed Date</p>
                  <p className="font-medium text-foreground">{prescription.prescribedDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Refills Remaining</p>
                  <p className="font-medium text-foreground">{prescription.refillsLeft}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Supply Remaining</span>
                  <span className="font-medium text-foreground">
                    {prescription.daysRemaining} / {prescription.totalDays} days
                  </span>
                </div>
                <Progress
                  value={(prescription.daysRemaining / prescription.totalDays) * 100}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Prescription History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Prescription History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prescriptions
              .filter((p) => p.status !== "Active")
              .map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(prescription.status)}
                    <div>
                      <h4 className="font-medium text-foreground">{prescription.medication}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prescription.doctor} • {prescription.prescribedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(prescription.status) as any}>
                      {prescription.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionsSection;
