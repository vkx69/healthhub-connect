import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SymptomCheckerForm } from '@/components/health-chat/SymptomCheckerForm';
import { EnhancedHealthChatBot } from '@/components/health-chat/EnhancedHealthChatBot';
import { HealthTips } from '@/components/health-chat/HealthTips';
import { Button } from '@/components/ui/button';
import { Globe, ArrowLeft, Bot, ClipboardList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SymptomData {
  symptoms: string[];
  duration: string;
  severity: string;
  age: string;
  gender: string;
  additionalInfo: string;
}

type Language = 'en' | 'hi';

const HealthAssistant = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('form');

  const handleSymptomSubmit = (data: SymptomData) => {
    setSymptomData(data);
    setActiveTab('chat');
  };

  const handleReset = () => {
    setSymptomData(null);
    setActiveTab('form');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="absolute right-4 top-20 md:top-24"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'en' ? 'AI Health Assistant' : 'AI स्वास्थ्य सहायक'}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === 'en' 
              ? 'Chat with our AI assistant to understand your symptoms, get personalized health tips, and receive general guidance. Voice input supported!'
              : 'अपने लक्षणों को समझने, व्यक्तिगत स्वास्थ्य सुझाव प्राप्त करने और सामान्य मार्गदर्शन के लिए हमारे AI सहायक से बात करें। आवाज इनपुट समर्थित!'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="form" className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  {language === 'en' ? 'Symptom Form' : 'लक्षण फॉर्म'}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  {language === 'en' ? 'AI Chat' : 'AI चैट'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form">
                <SymptomCheckerForm 
                  onSubmit={handleSymptomSubmit} 
                  language={language} 
                />
              </TabsContent>

              <TabsContent value="chat">
                {symptomData && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Back to Form' : 'फॉर्म पर वापस'}
                  </Button>
                )}
                <EnhancedHealthChatBot
                  initialSymptomData={symptomData || undefined}
                  language={language}
                  onLanguageChange={setLanguage}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Health Tips */}
          <div className="lg:col-span-1">
            <HealthTips
              age={symptomData?.age}
              gender={symptomData?.gender}
              language={language}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthAssistant;
