
import React, { useState } from 'react';
import { Edit, PlusCircle, Trash2, ChevronDown, ChevronUp, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dimension, StateItem } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { DimensionModal } from './DimensionModal';
import { StateModal } from './StateModal';

const StateList = ({ title, states, dimensionId, stateType }: { title: string, states: StateItem[], dimensionId: string, stateType: 'currentStates' | 'desiredStates' }) => {
    const { t, language } = useAppContext();
    const [isStateModalOpen, setIsStateModalOpen] = useState(false);
    const [editingState, setEditingState] = useState<StateItem | null>(null);

    const handleEditState = (state: StateItem) => {
        setEditingState(state);
        setIsStateModalOpen(true);
    };

    const handleAddState = () => {
        setEditingState(null);
        setIsStateModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">{title}</h4>
                <Button variant="outline" size="sm" onClick={handleAddState}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t('addState')}
                </Button>
            </div>
            <div className="space-y-2">
                {states.length > 0 ? (
                    states.sort((a, b) => a.score - b.score).map(state => (
                        <StateItemCard key={state.id} state={state} onEdit={() => handleEditState(state)} dimensionId={dimensionId} stateType={stateType} />
                    ))
                ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                        <FileQuestion className="mx-auto h-8 w-8 mb-2" />
                        <p className="font-semibold">{t('noStates')}</p>
                        <p>{t('noStatesDescription')}</p>
                    </div>
                )}
            </div>
            <StateModal
                isOpen={isStateModalOpen}
                onClose={() => setIsStateModalOpen(false)}
                dimensionId={dimensionId}
                stateType={stateType}
                existingState={editingState}
            />
        </div>
    );
};

const StateItemCard = ({ state, onEdit, dimensionId, stateType }: { state: StateItem, onEdit: () => void, dimensionId: string, stateType: 'currentStates' | 'desiredStates' }) => {
    const { language, t, dispatch } = useAppContext();

    return (
        <div className="bg-secondary p-3 rounded-lg flex justify-between items-center">
            <div>
                <p className="font-semibold">{state.name[language]} <span className="text-xs font-normal bg-primary/20 text-primary-foreground rounded-full px-2 py-0.5 ml-2">{t('stateScore')}: {state.score}</span></p>
                <p className="text-sm text-muted-foreground">{state.description[language]}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                            <AlertDialogDescription>{t('deleteStateWarning')}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => dispatch({ type: 'DELETE_STATE', payload: { dimensionId, stateType, stateId: state.id } })}>{t('delete')}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export const DimensionCard = ({ dimension }: { dimension: Dimension }) => {
    const { language, t, dispatch } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

    const handleDelete = () => {
        dispatch({ type: 'DELETE_DIMENSION', payload: dimension.id });
    };

    return (
        <>
            <Card>
                <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{dimension.name[language]}</CardTitle>
                            <CardDescription>{dimension.description[language]}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}><Edit className="h-4 w-4" /></Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => e.stopPropagation()}><Trash2 className="h-4 w-4" /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                                        <AlertDialogDescription>{t('deleteDimensionWarning')}</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>{t('delete')}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    {isCollapsibleOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <StateList title={t('currentStates')} states={dimension.currentStates} dimensionId={dimension.id} stateType="currentStates" />
                            <StateList title={t('desiredStates')} states={dimension.desiredStates} dimensionId={dimension.id} stateType="desiredStates" />
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>
            <DimensionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                existingDimension={dimension}
            />
        </>
    );
};
