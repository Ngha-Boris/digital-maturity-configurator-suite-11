
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GapSettings } from '@/types';

export const SettingsManager = () => {
    const { state, dispatch, t, language } = useAppContext();

    const settingsSchema = z.object({
        thresholds: z.object({
            LOW: z.coerce.number().min(0, { message: "Must be a positive number." }),
            MEDIUM: z.coerce.number().min(0, { message: "Must be a positive number." }),
        }).refine(data => data.LOW < data.MEDIUM, {
            message: "Low threshold must be less than medium threshold.",
            path: ["MEDIUM"],
        }),
        descriptions: z.object({
            LOW: z.string().min(1, { message: "Description is required." }),
            MEDIUM: z.string().min(1, { message: "Description is required." }),
            HIGH: z.string().min(1, { message: "Description is required." }),
        })
    });

    type SettingsFormValues = z.infer<typeof settingsSchema>;

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            thresholds: {
                LOW: state.gapSettings.thresholds.LOW,
                MEDIUM: state.gapSettings.thresholds.MEDIUM,
            },
            descriptions: {
                LOW: state.gapSettings.descriptions.LOW[language],
                MEDIUM: state.gapSettings.descriptions.MEDIUM[language],
                HIGH: state.gapSettings.descriptions.HIGH[language],
            }
        },
        mode: 'onChange'
    });

    const onSubmit = (data: SettingsFormValues) => {
        const newGapSettings: GapSettings = {
            ...state.gapSettings,
            thresholds: data.thresholds,
            descriptions: {
                LOW: { ...state.gapSettings.descriptions.LOW, [language]: data.descriptions.LOW },
                MEDIUM: { ...state.gapSettings.descriptions.MEDIUM, [language]: data.descriptions.MEDIUM },
                HIGH: { ...state.gapSettings.descriptions.HIGH, [language]: data.descriptions.HIGH },
            }
        };

        dispatch({ type: 'UPDATE_GAP_SETTINGS', payload: newGapSettings });
        toast.success(t('settingsUpdated'));
    };

    return (
        <div className="p-8 animate-fade-in">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>{t('gapSettingsTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">{t('gapThresholds')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="thresholds.LOW"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('lowGapThreshold')}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="thresholds.MEDIUM"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('mediumGapThreshold')}</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">{t('gapDescriptions')}</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="descriptions.LOW"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('lowGapDescription')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="descriptions.MEDIUM"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('mediumGapDescription')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="descriptions.HIGH"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('highGapDescription')}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                                {t('updateSettings')}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

