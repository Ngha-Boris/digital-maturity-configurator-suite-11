
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StateItem, LocalizedText } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface StateModalProps {
    isOpen: boolean;
    onClose: () => void;
    dimensionId: string;
    stateType: 'currentStates' | 'desiredStates';
    existingState?: StateItem | null;
}

const emptyLocalizedText: LocalizedText = { en: '', es: '', fr: '' };

export const StateModal = ({ isOpen, onClose, dimensionId, stateType, existingState }: StateModalProps) => {
    const { dispatch, t } = useAppContext();
    const [name, setName] = useState<LocalizedText>(emptyLocalizedText);
    const [description, setDescription] = useState<LocalizedText>(emptyLocalizedText);
    const [score, setScore] = useState(1);

    useEffect(() => {
        if (isOpen && existingState) {
            setName(existingState.name);
            setDescription(existingState.description);
            setScore(existingState.score);
        } else {
            setName(emptyLocalizedText);
            setDescription(emptyLocalizedText);
            setScore(1);
        }
    }, [isOpen, existingState]);

    const handleSubmit = () => {
        if (name.en.trim() === '') return;

        const stateData: StateItem = {
            id: existingState?.id || uuidv4(),
            name,
            description,
            score: Number(score),
        };

        if (existingState) {
            dispatch({ type: 'UPDATE_STATE', payload: { dimensionId, stateType, state: stateData } });
        } else {
            dispatch({ type: 'ADD_STATE', payload: { dimensionId, stateType, state: stateData } });
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{existingState ? t('editState') : t('addState')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className='space-y-2'>
                        <Label>{t('stateName')}</Label>
                        <Input value={name.en} onChange={(e) => setName({...name, en: e.target.value})} placeholder="e.g., Legacy Systems (EN)" />
                        <Input value={name.es} onChange={(e) => setName({...name, es: e.target.value})} placeholder="e.g., Sistemas Heredados (ES)" />
                        <Input value={name.fr} onChange={(e) => setName({...name, fr: e.target.value})} placeholder="e.g., Systèmes Hérités (FR)" />
                    </div>
                     <div className='space-y-2'>
                        <Label>{t('stateDescription')}</Label>
                        <Textarea value={description.en} onChange={(e) => setDescription({...description, en: e.target.value})} placeholder="Description (EN)" />
                        <Textarea value={description.es} onChange={(e) => setDescription({...description, es: e.target.value})} placeholder="Descripción (ES)" />
                        <Textarea value={description.fr} onChange={(e) => setDescription({...description, fr: e.target.value})} placeholder="Description (FR)" />
                    </div>
                    <div className='space-y-2'>
                        <Label>{t('stateScore')}</Label>
                        <Input type="number" min="1" max="5" value={score} onChange={(e) => setScore(Math.max(1, Math.min(5, Number(e.target.value))))} />
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
