
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, BookMarked } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Recommendation } from '@/types';
import { RecommendationModal } from './RecommendationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const RecommendationManager = () => {
    const { state, dispatch, t, language } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);

    const handleAddNew = () => {
        setEditingRecommendation(null);
        setIsModalOpen(true);
    };

    const handleEdit = (recommendation: Recommendation) => {
        setEditingRecommendation(recommendation);
        setIsModalOpen(true);
    };

    const handleDelete = (recommendationId: string) => {
        dispatch({ type: 'DELETE_RECOMMENDATION', payload: recommendationId });
    };

    const getDimensionName = (dimensionId: string) => {
        const dimension = state.dimensions.find(d => d.id === dimensionId);
        return dimension ? dimension.name[language] : 'N/A';
    }

    return (
        <div className="p-8 animate-fade-in">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{t('recommendations')}</CardTitle>
                    <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" /> {t('addRecommendation')}
                    </Button>
                </CardHeader>
                <CardContent>
                    {state.recommendations.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('dimension')}</TableHead>
                                    <TableHead>{t('gap')}</TableHead>
                                    <TableHead>{t('priority')}</TableHead>
                                    <TableHead>{t('actions')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {state.recommendations.map((rec) => (
                                    <TableRow key={rec.id}>
                                        <TableCell>{getDimensionName(rec.dimensionId)}</TableCell>
                                        <TableCell>{rec.gapLabel}</TableCell>
                                        <TableCell>{rec.priority}</TableCell>
                                        <TableCell>
                                            <ul className="list-disc list-inside">
                                                {rec.actions.map((action, index) => (
                                                    <li key={index}>{action[language]}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(rec)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t('deleteRecommendationWarning')}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(rec.id)} className="bg-destructive hover:bg-destructive/90">
                                                            {t('delete')}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="p-10 flex flex-col items-center justify-center text-center">
                            <BookMarked className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold">{t('noRecommendations')}</h3>
                            <p className="text-muted-foreground mt-1">{t('noRecommendationsDescription')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <RecommendationModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                recommendation={editingRecommendation}
            />
        </div>
    );
};
