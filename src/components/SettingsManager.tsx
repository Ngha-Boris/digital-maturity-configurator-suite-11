
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export const SettingsManager = () => {
    const { t } = useAppContext();
    return (
        <div className="p-8 animate-fade-in">
            <Card>
                <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                    <SlidersHorizontal className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">{t('comingSoon')}</h3>
                    <p className="text-muted-foreground mt-1">{t('comingSoonDescription')}</p>
                </CardContent>
            </Card>
        </div>
    );
};
