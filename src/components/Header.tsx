
import React from 'react';
import { Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppContext } from '@/context/AppContext';

export const Header = () => {
  const { state, t } = useAppContext();

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(state, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'gap-analysis-config.json';
    link.click();
  };

  return (
    <header className="bg-card shadow-sm p-4 flex justify-between items-center sticky top-0 z-40 animate-fade-in">
      <div className="flex items-center gap-4">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">{t('appTitle')}</h1>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          {t('exportConfig')}
        </Button>
      </div>
    </header>
  );
};
