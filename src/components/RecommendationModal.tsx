
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/AppContext';
import { Recommendation, GapLabel, Priority, LocalizedText } from '@/types';

const recommendationSchema = z.object({
  dimensionId: z.string().min(1, "Dimension is required."),
  gapLabel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  priority: z.enum(['URGENT', 'IMPORTANT', 'FOLLOW UP']),
  actions: z.string().min(1, "Actions are required. One per line."),
});

interface RecommendationModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    recommendation: Recommendation | null;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, setIsOpen, recommendation }) => {
    const { state, dispatch, t, language } = useAppContext();
    const form = useForm<z.infer<typeof recommendationSchema>>({
        resolver: zodResolver(recommendationSchema),
        defaultValues: {
            dimensionId: '',
            gapLabel: 'LOW',
            priority: 'IMPORTANT',
            actions: '',
        }
    });

    useEffect(() => {
        if (recommendation) {
            form.reset({
                dimensionId: recommendation.dimensionId,
                gapLabel: recommendation.gapLabel,
                priority: recommendation.priority,
                actions: recommendation.actions.map(a => a[language]).join('\n'),
            });
        } else {
            form.reset({
                dimensionId: '',
                gapLabel: 'LOW',
                priority: 'IMPORTANT',
                actions: '',
            });
        }
    }, [recommendation, form, isOpen, language]);
    
    const onSubmit = (values: z.infer<typeof recommendationSchema>) => {
        const createLocalizedText = (text: string): LocalizedText => ({ en: text, es: text, fr: text });
        const actionsArray: LocalizedText[] = values.actions.split('\n').filter(line => line.trim() !== '').map(createLocalizedText);

        const newRecommendation: Recommendation = {
            id: recommendation?.id || uuidv4(),
            dimensionId: values.dimensionId,
            gapLabel: values.gapLabel,
            priority: values.priority,
            actions: actionsArray,
        };

        if (recommendation) {
            dispatch({ type: 'UPDATE_RECOMMENDATION', payload: newRecommendation });
        } else {
            dispatch({ type: 'ADD_RECOMMENDATION', payload: newRecommendation });
        }
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{recommendation ? t('editRecommendation') : t('addRecommendation')}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="dimensionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('dimension')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('selectDimension')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {state.dimensions.map(dim => (
                                                <SelectItem key={dim.id} value={dim.id}>{dim.name[language]}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gapLabel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('gap')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('selectGap')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(['LOW', 'MEDIUM', 'HIGH'] as GapLabel[]).map(label => (
                                                <SelectItem key={label} value={label}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('priority')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('selectPriority')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(['URGENT', 'IMPORTANT', 'FOLLOW UP'] as Priority[]).map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="actions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('actionsOnePerLine')}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={`${t('actions')}...`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">{t('cancel')}</Button>
                            </DialogClose>
                            <Button type="submit">{t('save')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
