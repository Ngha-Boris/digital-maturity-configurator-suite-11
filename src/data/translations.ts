
import { LocalizedText } from '@/types';

type TranslationKey = 
  | 'appTitle' | 'dimensions' | 'recommendations' | 'settings' | 'exportConfig' | 'addDimension'
  | 'dimensionName' | 'dimensionDescription' | 'currentStates' | 'desiredStates' | 'addState'
  | 'edit' | 'delete' | 'save' | 'cancel' | 'stateName' | 'stateDescription' | 'stateScore'
  | 'confirmDelete' | 'deleteDimensionWarning' | 'editDimension' | 'editState' | 'comingSoon'
  | 'comingSoonDescription' | 'actions' | 'noDimensions' | 'noDimensionsDescription'
  | 'noStates' | 'noStatesDescription' | 'deleteStateWarning' | 'addRecommendation' | 'editRecommendation'
  | 'deleteRecommendationWarning' | 'noRecommendations' | 'noRecommendationsDescription'
  | 'dimension' | 'gap' | 'priority' | 'actionsOnePerLine' | 'selectDimension' | 'selectGap'
  | 'selectPriority' | 'gapSettingsTitle' | 'gapThresholds' | 'lowGapThreshold' | 'mediumGapThreshold'
  | 'gapDescriptions' | 'lowGapDescription' | 'mediumGapDescription' | 'highGapDescription'
  | 'updateSettings' | 'settingsUpdated';


export const translations: Record<TranslationKey, LocalizedText> = {
  appTitle: { en: 'Gap Analysis Configurator', es: 'Configurador de Análisis de Brechas', fr: 'Configurateur d\'Analyse d\'Écart' },
  dimensions: { en: 'Dimensions', es: 'Dimensiones', fr: 'Dimensions' },
  recommendations: { en: 'Recommendations', es: 'Recomendaciones', fr: 'Recommandations' },
  settings: { en: 'Settings', es: 'Ajustes', fr: 'Paramètres' },
  exportConfig: { en: 'Export Config', es: 'Exportar Configuración', fr: 'Exporter la Configuration' },
  addDimension: { en: 'Add Dimension', es: 'Añadir Dimensión', fr: 'Ajouter une Dimension' },
  dimensionName: { en: 'Dimension Name', es: 'Nombre de la Dimensión', fr: 'Nom de la Dimension' },
  dimensionDescription: { en: 'Description', es: 'Descripción', fr: 'Description' },
  currentStates: { en: 'Current States', es: 'Estados Actuales', fr: 'États Actuels' },
  desiredStates: { en: 'Desired States', es: 'Estados Deseados', fr: 'États Souhaités' },
  addState: { en: 'Add State', es: 'Añadir Estado', fr: 'Ajouter un État' },
  edit: { en: 'Edit', es: 'Editar', fr: 'Modifier' },
  delete: { en: 'Delete', es: 'Eliminar', fr: 'Supprimer' },
  save: { en: 'Save', es: 'Guardar', fr: 'Enregistrer' },
  cancel: { en: 'Cancel', es: 'Cancelar', fr: 'Annuler' },
  stateName: { en: 'State Name', es: 'Nombre del Estado', fr: 'Nom de l\'État' },
  stateDescription: { en: 'Description', es: 'Descripción', fr: 'Description' },
  stateScore: { en: 'Score (1-5)', es: 'Puntuación (1-5)', fr: 'Score (1-5)' },
  confirmDelete: { en: 'Are you sure?', es: '¿Estás seguro?', fr: 'Êtes-vous sûr?' },
  deleteDimensionWarning: { en: 'This will permanently delete the dimension and all its states.', es: 'Esto eliminará permanentemente la dimensión y todos sus estados.', fr: 'Cela supprimera définitivement la dimension et tous ses états.' },
  deleteStateWarning: { en: 'This will permanently delete the state.', es: 'Esto eliminará permanentemente el estado.', fr: 'Cela supprimera définitivement l\'état.' },
  editDimension: { en: 'Edit Dimension', es: 'Editar Dimensión', fr: 'Modifier la Dimension' },
  editState: { en: 'Edit State', es: 'Editar Estado', fr: 'Modifier l\'État' },
  comingSoon: { en: 'Coming Soon!', es: '¡Próximamente!', fr: 'Bientôt disponible!' },
  comingSoonDescription: { en: 'This feature is under construction.', es: 'Esta función está en construcción.', fr: 'Cette fonctionnalité est en construction.' },
  actions: { en: 'Actions', es: 'Acciones', fr: 'Actions' },
  noDimensions: { en: 'No Dimensions Yet', es: 'Aún no hay dimensiones', fr: 'Aucune Dimension para el Momento' },
  noDimensionsDescription: { en: 'Get started by adding a new dimension.', es: 'Comienza añadiendo una nueva dimensión.', fr: 'Commencez par añadir una nueva dimension.' },
  noStates: { en: 'No States', es: 'Sin Estados', fr: 'Aucun État' },
  noStatesDescription: { en: 'Add a state to this dimension.', es: 'Añade un estado a esta dimensión.', fr: 'Ajoutez un état à cette dimension.' },
  addRecommendation: { en: 'Add Recommendation', es: 'Añadir Recomendación', fr: 'Ajouter une Recommandation' },
  editRecommendation: { en: 'Edit Recommendation', es: 'Editar Recomendación', fr: 'Modifier la Recommandation' },
  deleteRecommendationWarning: { en: 'This will permanently delete the recommendation.', es: 'Esto eliminará permanentemente la recomendación.', fr: 'Cela supprimera définitivement la recommandation.' },
  noRecommendations: { en: 'No Recommendations Yet', es: 'Aún no hay recomendaciones', fr: 'Aucune Recommandation para el Momento' },
  noRecommendationsDescription: { en: 'Get started by adding a new recommendation.', es: 'Comienza añadiendo una nueva recomendación.', fr: 'Commencez par añadir una nueva recomendación.' },
  dimension: { en: 'Dimension', es: 'Dimensión', fr: 'Dimension' },
  gap: { en: 'Gap', es: 'Brecha', fr: 'Écart' },
  priority: { en: 'Priority', es: 'Prioridad', fr: 'Priorité' },
  actionsOnePerLine: { en: 'Actions (one per line)', es: 'Acciones (una por línea)', fr: 'Actions (une par ligne)' },
  selectDimension: { en: 'Select a dimension', es: 'Selecciona una dimensión', fr: 'Sélectionnez une dimension' },
  selectGap: { en: 'Select a gap label', es: 'Selecciona una etiqueta de brecha', fr: 'Sélectionnez une étiquette d\'écart' },
  selectPriority: { en: 'Select a priority', es: 'Selecciona una prioridad', fr: 'Sélectionnez une priorité' },
  gapSettingsTitle: { en: 'Gap Analysis Settings', es: 'Ajustes de Análisis de Brechas', fr: 'Paramètres d\'Analyse d\'Écart' },
  gapThresholds: { en: 'Gap Thresholds', es: 'Umbrales de Brecha', fr: 'Seuils d\'Écart' },
  lowGapThreshold: { en: 'Low Gap Threshold', es: 'Umbral de Brecha Baja', fr: 'Seuil d\'Écart Faible' },
  mediumGapThreshold: { en: 'Medium Gap Threshold', es: 'Umbral de Brecha Media', fr: 'Seuil d\'Écart Moyen' },
  gapDescriptions: { en: 'Gap Descriptions', es: 'Descripciones de Brecha', fr: 'Descriptions d\'Écart' },
  lowGapDescription: { en: 'Low Gap Description', es: 'Descripción de Brecha Baja', fr: 'Description de Faible Écart' },
  mediumGapDescription: { en: 'Medium Gap Description', es: 'Descripción de Brecha Media', fr: 'Description d\'Écart Moyen' },
  highGapDescription: { en: 'High Gap Description', es: 'Descripción de Brecha Alta', fr: 'Description d\'Écart Élevé' },
  updateSettings: { en: 'Update Settings', es: 'Actualizar Ajustes', fr: 'Mettre à jour les Paramètres' },
  settingsUpdated: { en: 'Settings updated successfully!', es: '¡Ajustes actualizados correctamente!', fr: 'Paramètres mis à jour avec succès!' },
};

