
import React, { useState } from 'react';
import { PlusCircle, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from '@/context/AppContext';
import { DimensionCard } from './DimensionCard';
import { DimensionModal } from './DimensionModal';

export const DimensionManager = () => {
    const { state, t } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{t('dimensions')}</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t('addDimension')}
                </Button>
            </div>
            
            {state.dimensions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {state.dimensions.map(dim => (
                        <DimensionCard key={dim.id} dimension={dim} />
                    ))}
                </div>
            ) : (
                <Card className="mt-6">
                    <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                        <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">{t('noDimensions')}</h3>
                        <p className="text-muted-foreground mt-1">{t('noDimensionsDescription')}</p>
                    </CardContent>
                </Card>
            )}

            <DimensionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
