
import { LocalizedText } from '@/types';

type TranslationKey = 
  | 'appTitle' | 'dimensions' | 'recommendations' | 'settings' | 'exportConfig' | 'addDimension'
  | 'dimensionName' | 'dimensionDescription' | 'currentStates' | 'desiredStates' | 'addState'
  | 'edit' | 'delete' | 'save' | 'cancel' | 'stateName' | 'stateDescription' | 'stateScore'
  | 'confirmDelete' | 'deleteDimensionWarning' | 'editDimension' | 'editState' | 'comingSoon'
  | 'comingSoonDescription' | 'actions' | 'noDimensions' | 'noDimensionsDescription'
  | 'noStates' | 'noStatesDescription' | 'deleteStateWarning';


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
  noDimensions: { en: 'No Dimensions Yet', es: 'Aún no hay dimensiones', fr: 'Aucune Dimension pour le Moment' },
  noDimensionsDescription: { en: 'Get started by adding a new dimension.', es: 'Comienza añadiendo una nueva dimensión.', fr: 'Commencez par ajouter une nouvelle dimension.' },
  noStates: { en: 'No States', es: 'Sin Estados', fr: 'Aucun État' },
  noStatesDescription: { en: 'Add a state to this dimension.', es: 'Añade un estado a esta dimensión.', fr: 'Ajoutez un état à cette dimension.' },
};
