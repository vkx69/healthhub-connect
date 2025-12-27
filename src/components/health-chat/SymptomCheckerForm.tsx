import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList, ArrowRight } from 'lucide-react';

interface SymptomData {
  symptoms: string[];
  duration: string;
  severity: string;
  age: string;
  gender: string;
  additionalInfo: string;
}

interface SymptomCheckerFormProps {
  onSubmit: (data: SymptomData) => void;
  language: 'en' | 'hi';
}

const SYMPTOMS = {
  en: [
    { id: 'fever', label: 'Fever' },
    { id: 'cough', label: 'Cough' },
    { id: 'headache', label: 'Headache' },
    { id: 'bodyPain', label: 'Body Pain' },
    { id: 'stomachPain', label: 'Stomach Pain' },
    { id: 'nausea', label: 'Nausea/Vomiting' },
    { id: 'fatigue', label: 'Fatigue/Weakness' },
    { id: 'breathingDifficulty', label: 'Breathing Difficulty' },
    { id: 'soreThroat', label: 'Sore Throat' },
    { id: 'runnyNose', label: 'Runny/Blocked Nose' },
    { id: 'diarrhea', label: 'Diarrhea' },
    { id: 'dizziness', label: 'Dizziness' },
  ],
  hi: [
    { id: 'fever', label: 'बुखार' },
    { id: 'cough', label: 'खांसी' },
    { id: 'headache', label: 'सिरदर्द' },
    { id: 'bodyPain', label: 'शरीर में दर्द' },
    { id: 'stomachPain', label: 'पेट दर्द' },
    { id: 'nausea', label: 'मतली/उल्टी' },
    { id: 'fatigue', label: 'थकान/कमजोरी' },
    { id: 'breathingDifficulty', label: 'सांस लेने में कठिनाई' },
    { id: 'soreThroat', label: 'गले में खराश' },
    { id: 'runnyNose', label: 'बहती/बंद नाक' },
    { id: 'diarrhea', label: 'दस्त' },
    { id: 'dizziness', label: 'चक्कर आना' },
  ],
};

const LABELS = {
  en: {
    title: 'Symptom Checker',
    subtitle: 'Select your symptoms for a personalized assessment',
    selectSymptoms: 'Select Your Symptoms',
    duration: 'How long have you had these symptoms?',
    severity: 'Severity Level',
    age: 'Your Age',
    gender: 'Gender',
    additionalInfo: 'Additional Information',
    additionalPlaceholder: 'Any other symptoms or relevant health information...',
    startChat: 'Start Health Chat',
    durationOptions: ['Less than 24 hours', '1-3 days', '4-7 days', 'More than a week'],
    severityOptions: ['Mild', 'Moderate', 'Severe'],
    genderOptions: ['Male', 'Female', 'Other', 'Prefer not to say'],
  },
  hi: {
    title: 'लक्षण जांचकर्ता',
    subtitle: 'व्यक्तिगत मूल्यांकन के लिए अपने लक्षण चुनें',
    selectSymptoms: 'अपने लक्षण चुनें',
    duration: 'ये लक्षण कितने समय से हैं?',
    severity: 'गंभीरता स्तर',
    age: 'आपकी आयु',
    gender: 'लिंग',
    additionalInfo: 'अतिरिक्त जानकारी',
    additionalPlaceholder: 'कोई अन्य लक्षण या संबंधित स्वास्थ्य जानकारी...',
    startChat: 'स्वास्थ्य चैट शुरू करें',
    durationOptions: ['24 घंटे से कम', '1-3 दिन', '4-7 दिन', 'एक सप्ताह से अधिक'],
    severityOptions: ['हल्का', 'मध्यम', 'गंभीर'],
    genderOptions: ['पुरुष', 'महिला', 'अन्य', 'बताना नहीं चाहते'],
  },
};

export function SymptomCheckerForm({ onSubmit, language }: SymptomCheckerFormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const labels = LABELS[language];
  const symptoms = SYMPTOMS[language];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      symptoms: selectedSymptoms.map(id => 
        symptoms.find(s => s.id === id)?.label || id
      ),
      duration,
      severity,
      age,
      gender,
      additionalInfo,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          {labels.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptoms Grid */}
          <div>
            <Label className="text-sm font-medium mb-3 block">{labels.selectSymptoms}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <Checkbox
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label className="text-sm cursor-pointer">{symptom.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Duration and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">{labels.duration}</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {labels.durationOptions.map((option, i) => (
                    <SelectItem key={i} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">{labels.severity}</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {labels.severityOptions.map((option, i) => (
                    <SelectItem key={i} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">{labels.age}</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                min="1"
                max="120"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">{labels.gender}</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {labels.genderOptions.map((option, i) => (
                    <SelectItem key={i} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <Label className="text-sm font-medium mb-2 block">{labels.additionalInfo}</Label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder={labels.additionalPlaceholder}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={selectedSymptoms.length === 0}
          >
            {labels.startChat}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
