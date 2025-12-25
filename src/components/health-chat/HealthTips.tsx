import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HealthTipsProps {
  age?: string;
  gender?: string;
  language: 'en' | 'hi';
}

const TIPS = {
  en: {
    general: [
      "💧 Stay hydrated - drink at least 8 glasses of water daily",
      "🏃 Get 30 minutes of moderate exercise most days",
      "😴 Aim for 7-9 hours of quality sleep each night",
      "🥗 Eat a balanced diet rich in fruits and vegetables",
      "🧘 Practice stress management through meditation or deep breathing",
    ],
    young: [
      "📱 Limit screen time and take regular eye breaks",
      "🎒 Maintain good posture while studying or working",
      "🏋️ Build healthy exercise habits early",
      "🥤 Avoid sugary drinks and processed foods",
    ],
    adult: [
      "🩺 Schedule regular health check-ups",
      "❤️ Monitor your blood pressure and cholesterol",
      "🚭 Avoid smoking and limit alcohol consumption",
      "🧠 Keep your mind active with learning and hobbies",
    ],
    senior: [
      "💊 Keep track of medications and take them on time",
      "🦴 Ensure adequate calcium and vitamin D intake",
      "🚶 Stay active with gentle exercises like walking",
      "👥 Stay socially connected with family and friends",
    ],
    male: [
      "🫀 Get regular cardiovascular health screenings",
      "🔵 Consider prostate health check-ups after 40",
    ],
    female: [
      "🎀 Schedule regular breast and cervical screenings",
      "💪 Ensure adequate iron intake",
    ],
  },
  hi: {
    general: [
      "💧 हाइड्रेटेड रहें - रोजाना कम से कम 8 गिलास पानी पिएं",
      "🏃 अधिकांश दिनों में 30 मिनट का मध्यम व्यायाम करें",
      "😴 हर रात 7-9 घंटे की गुणवत्तापूर्ण नींद लें",
      "🥗 फल और सब्जियों से भरपूर संतुलित आहार लें",
      "🧘 ध्यान या गहरी सांस से तनाव प्रबंधन करें",
    ],
    young: [
      "📱 स्क्रीन टाइम सीमित करें और नियमित आंखों का ब्रेक लें",
      "🎒 पढ़ाई या काम करते समय अच्छी मुद्रा बनाए रखें",
      "🏋️ जल्दी स्वस्थ व्यायाम की आदतें बनाएं",
      "🥤 मीठे पेय और प्रोसेस्ड फूड से बचें",
    ],
    adult: [
      "🩺 नियमित स्वास्थ्य जांच करवाएं",
      "❤️ अपने रक्तचाप और कोलेस्ट्रॉल की निगरानी करें",
      "🚭 धूम्रपान से बचें और शराब सीमित करें",
      "🧠 सीखने और शौक से अपने दिमाग को सक्रिय रखें",
    ],
    senior: [
      "💊 दवाओं का ट्रैक रखें और समय पर लें",
      "🦴 पर्याप्त कैल्शियम और विटामिन डी सुनिश्चित करें",
      "🚶 चलने जैसे हल्के व्यायाम से सक्रिय रहें",
      "👥 परिवार और दोस्तों से सामाजिक रूप से जुड़े रहें",
    ],
    male: [
      "🫀 नियमित हृदय स्वास्थ्य जांच करवाएं",
      "🔵 40 के बाद प्रोस्टेट स्वास्थ्य जांच पर विचार करें",
    ],
    female: [
      "🎀 नियमित स्तन और गर्भाशय ग्रीवा जांच करवाएं",
      "💪 पर्याप्त आयरन सुनिश्चित करें",
    ],
  },
};

export function HealthTips({ age, gender, language }: HealthTipsProps) {
  const [tips, setTips] = useState<string[]>([]);

  const generateTips = () => {
    const tipsData = TIPS[language];
    let personalizedTips = [...tipsData.general];

    // Age-based tips
    const ageNum = parseInt(age || '30');
    if (ageNum < 25) {
      personalizedTips = [...personalizedTips, ...tipsData.young];
    } else if (ageNum >= 25 && ageNum < 50) {
      personalizedTips = [...personalizedTips, ...tipsData.adult];
    } else {
      personalizedTips = [...personalizedTips, ...tipsData.senior];
    }

    // Gender-based tips
    if (gender?.toLowerCase().includes('male') || gender?.includes('पुरुष')) {
      personalizedTips = [...personalizedTips, ...tipsData.male];
    } else if (gender?.toLowerCase().includes('female') || gender?.includes('महिला')) {
      personalizedTips = [...personalizedTips, ...tipsData.female];
    }

    // Shuffle and pick 5 tips
    const shuffled = personalizedTips.sort(() => Math.random() - 0.5);
    setTips(shuffled.slice(0, 5));
  };

  useEffect(() => {
    generateTips();
  }, [age, gender, language]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            {language === 'en' ? 'Personalized Health Tips' : 'व्यक्तिगत स्वास्थ्य सुझाव'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={generateTips}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        {(age || gender) && (
          <div className="flex gap-2 mt-2">
            {age && <Badge variant="secondary">{language === 'en' ? `Age: ${age}` : `आयु: ${age}`}</Badge>}
            {gender && <Badge variant="secondary">{gender}</Badge>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
