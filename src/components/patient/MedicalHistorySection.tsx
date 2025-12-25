import { Calendar, Activity, Stethoscope, Pill, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const medicalHistory = [
  {
    id: 1,
    date: "Dec 20, 2024",
    type: "Consultation",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    diagnosis: "Mild Hypertension",
    notes: "Blood pressure slightly elevated. Recommended lifestyle changes and follow-up in 2 weeks.",
    status: "Completed",
  },
  {
    id: 2,
    date: "Dec 10, 2024",
    type: "Lab Test",
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    diagnosis: "Routine Checkup",
    notes: "All blood work within normal range. Cholesterol levels good.",
    status: "Completed",
  },
  {
    id: 3,
    date: "Nov 28, 2024",
    type: "Surgery",
    doctor: "Dr. Emily Davis",
    specialty: "Orthopedic",
    diagnosis: "Knee Arthroscopy",
    notes: "Successful procedure. Physical therapy recommended for 6 weeks.",
    status: "Completed",
  },
  {
    id: 4,
    date: "Nov 15, 2024",
    type: "Emergency",
    doctor: "Dr. Robert Wilson",
    specialty: "Emergency Medicine",
    diagnosis: "Acute Gastritis",
    notes: "Treated with IV fluids and medication. Discharged same day.",
    status: "Completed",
  },
];

const allergies = ["Penicillin", "Shellfish", "Latex"];
const conditions = ["Hypertension", "Type 2 Diabetes (controlled)"];

const MedicalHistorySection = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Consultation":
        return <Stethoscope className="w-4 h-4" />;
      case "Lab Test":
        return <Activity className="w-4 h-4" />;
      case "Surgery":
        return <Pill className="w-4 h-4" />;
      case "Emergency":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Emergency":
        return "destructive";
      case "Surgery":
        return "warning";
      case "Lab Test":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Total Visits</p>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">3</p>
            <p className="text-sm text-muted-foreground">This Year</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/5 border-secondary/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-secondary">5</p>
            <p className="text-sm text-muted-foreground">Doctors Seen</p>
          </CardContent>
        </Card>
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-warning">1</p>
            <p className="text-sm text-muted-foreground">Surgeries</p>
          </CardContent>
        </Card>
      </div>

      {/* Allergies & Conditions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Known Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive" className="rounded-full">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 dark:border-amber-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              Chronic Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition) => (
                <Badge key={condition} variant="warning" className="rounded-full">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visit History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalHistory.map((record, index) => (
              <div
                key={record.id}
                className={`relative pl-6 pb-4 ${
                  index !== medicalHistory.length - 1 ? "border-l-2 border-border" : ""
                }`}
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>
                <div className="bg-muted/30 rounded-xl p-4 ml-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getTypeBadgeVariant(record.type) as any} className="gap-1">
                        {getTypeIcon(record.type)}
                        {record.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                    <Badge variant="success">{record.status}</Badge>
                  </div>
                  <h4 className="font-semibold text-foreground">{record.diagnosis}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {record.doctor} • {record.specialty}
                  </p>
                  <p className="text-sm text-foreground/80 mt-2">{record.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistorySection;
