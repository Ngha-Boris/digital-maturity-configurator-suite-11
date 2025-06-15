
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DimensionManager } from "./components/DimensionManager";
import { RecommendationManager } from "./components/RecommendationManager";
import { SettingsManager } from "./components/SettingsManager";

const queryClient = new QueryClient();

const MainApp = () => {
  const { t } = useAppContext();
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="p-8">
        <Tabs defaultValue="dimensions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="dimensions">{t('dimensions')}</TabsTrigger>
            <TabsTrigger value="recommendations">{t('recommendations')}</TabsTrigger>
            <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
          </TabsList>
          <TabsContent value="dimensions">
            <DimensionManager />
          </TabsContent>
          <TabsContent value="recommendations">
            <RecommendationManager />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <MainApp />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
