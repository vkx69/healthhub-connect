import { MainLayout } from '@/components/layout/MainLayout';
import { HealthChatBot } from '@/components/health-chat/HealthChatBot';

const HealthAssistant = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Health Assistant</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Chat with our AI assistant to understand your symptoms and get general health guidance.
            Available in English and Hindi.
          </p>
        </div>
        <HealthChatBot />
      </div>
    </MainLayout>
  );
};

export default HealthAssistant;
