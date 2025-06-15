
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dimension, LocalizedText } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface DimensionModalProps {
    isOpen: boolean;
    onClose: () => void;
    existingDimension?: Dimension | null;
}

const emptyLocalizedText: LocalizedText = { en: '', es: '', fr: '' };

export const DimensionModal = ({ isOpen, onClose, existingDimension }: DimensionModalProps) => {
    const { dispatch, t } = useAppContext();
    const [name, setName] = useState<LocalizedText>(emptyLocalizedText);
    const [description, setDescription] = useState<LocalizedText>(emptyLocalizedText);

    useEffect(() => {
        if (isOpen && existingDimension) {
            setName(existingDimension.name);
            setDescription(existingDimension.description);
        } else {
            setName(emptyLocalizedText);
            setDescription(emptyLocalizedText);
        }
    }, [isOpen, existingDimension]);

    const handleSubmit = () => {
        if (name.en.trim() === '') return; // Basic validation
        
        const dimensionData = {
            id: existingDimension?.id || uuidv4(),
            name,
            description,
            currentStates: existingDimension?.currentStates || [],
            desiredStates: existingDimension?.desiredStates || [],
        };

        if (existingDimension) {
            dispatch({ type: 'UPDATE_DIMENSION', payload: dimensionData });
        } else {
            dispatch({ type: 'ADD_DIMENSION', payload: dimensionData });
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{existingDimension ? t('editDimension') : t('addDimension')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className='space-y-2'>
                        <Label>{t('dimensionName')}</Label>
                        <Input value={name.en} onChange={(e) => setName({...name, en: e.target.value})} placeholder="e.g., Technology (EN)" />
                        <Input value={name.es} onChange={(e) => setName({...name, es: e.target.value})} placeholder="e.g., Tecnología (ES)" />
                        <Input value={name.fr} onChange={(e) => setName({...name, fr: e.target.value})} placeholder="e.g., Technologie (FR)" />
                    </div>
                    <div className='space-y-2'>
                        <Label>{t('dimensionDescription')}</Label>
                        <Textarea value={description.en} onChange={(e) => setDescription({...description, en: e.target.value})} placeholder="Description (EN)" />
                        <Textarea value={description.es} onChange={(e) => setDescription({...description, es: e.target.value})} placeholder="Descripción (ES)" />
                        <Textarea value={description.fr} onChange={(e) => setDescription({...description, fr: e.target.value})} placeholder="Description (FR)" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit}>{t('save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
