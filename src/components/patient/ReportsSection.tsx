import { useState } from "react";
import { Upload, FileText, Image, Download, Eye, Trash2, Search, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: number;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  doctor: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    name: "Blood Test Results - December 2024",
    type: "PDF",
    category: "Lab Report",
    uploadDate: "Dec 20, 2024",
    size: "1.2 MB",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 2,
    name: "Chest X-Ray",
    type: "Image",
    category: "Radiology",
    uploadDate: "Dec 15, 2024",
    size: "3.5 MB",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 3,
    name: "ECG Report",
    type: "PDF",
    category: "Cardiology",
    uploadDate: "Dec 10, 2024",
    size: "856 KB",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 4,
    name: "MRI Scan - Knee",
    type: "Image",
    category: "Radiology",
    uploadDate: "Nov 25, 2024",
    size: "8.2 MB",
    doctor: "Dr. Emily Davis",
  },
  {
    id: 5,
    name: "Lipid Profile",
    type: "PDF",
    category: "Lab Report",
    uploadDate: "Nov 20, 2024",
    size: "542 KB",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 6,
    name: "COVID-19 Test Certificate",
    type: "PDF",
    category: "Lab Report",
    uploadDate: "Nov 10, 2024",
    size: "256 KB",
    doctor: "Dr. Robert Wilson",
  },
];

const categories = ["All", "Lab Report", "Radiology", "Cardiology", "Prescription", "Other"];

const ReportsSection = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { toast } = useToast();

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    toast({
      title: "Report Uploaded",
      description: "Your medical report has been uploaded successfully.",
    });
    setIsUploadOpen(false);
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter((r) => r.id !== id));
    toast({
      title: "Report Deleted",
      description: "The report has been removed from your records.",
      variant: "destructive",
    });
  };

  const getFileIcon = (type: string) => {
    return type === "Image" ? (
      <Image className="w-5 h-5 text-purple-500" />
    ) : (
      <FileText className="w-5 h-5 text-blue-500" />
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Lab Report":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Radiology":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "Cardiology":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "Prescription":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">
              {reports.filter((r) => r.category === "Lab Report").length}
            </p>
            <p className="text-sm text-muted-foreground">Lab Reports</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Image className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-600">
              {reports.filter((r) => r.type === "Image").length}
            </p>
            <p className="text-sm text-muted-foreground">Scans/Images</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 text-center">
            <Upload className="w-6 h-6 mx-auto mb-2 text-amber-600" />
            <p className="text-2xl font-bold text-amber-600">14.5 MB</p>
            <p className="text-sm text-muted-foreground">Storage Used</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Medical Report</DialogTitle>
                  <DialogDescription>
                    Upload your medical reports, test results, or scans.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, JPG, PNG up to 10MB
                    </p>
                    <Button variant="outline" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label>Report Name</Label>
                      <Input placeholder="e.g., Blood Test Results" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter((c) => c !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleUpload} className="w-full">
                    Upload Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Your Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border">
                    {getFileIcon(report.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(report.category)}`}>
                        {report.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {report.uploadDate} • {report.size}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploaded by {report.doctor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Download">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDelete(report.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No reports found</p>
                <p className="text-sm text-muted-foreground/70">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
