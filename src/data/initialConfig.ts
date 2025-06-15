
import { Config } from "@/types";
import { v4 as uuidv4 } from 'uuid';

export const initialConfig: Config = {
  dimensions: [
    {
      id: uuidv4(),
      name: { en: 'Technology', es: 'Tecnología', fr: 'Technologie' },
      description: { en: "Evaluates the organization's technology infrastructure and automation capabilities.", es: 'Evalúa la infraestructura tecnológica y las capacidades de automatización de la organización.', fr: "Évalue l'infrastructure technologique et les capacités d'automatisation de l'organisation." },
      currentStates: [
        { id: uuidv4(), name: { en: 'Legacy Systems', es: 'Sistemas Heredados', fr: 'Systèmes Hérités' }, description: { en: 'Manual processes, outdated technology.', es: 'Procesos manuales, tecnología obsoleta.', fr: 'Processus manuels, technologie obsolète.' }, score: 1 },
        { id: uuidv4(), name: { en: 'Basic Digital Tools', es: 'Herramientas Digitales Básicas', fr: 'Outils Numériques de Base' }, description: { en: 'Some digital tools are used in silos.', es: 'Algunas herramientas digitales se utilizan en silos.', fr: 'Certains outils numériques sont utilisés en silos.' }, score: 2 },
        { id: uuidv4(), name: { en: 'Partial Automation', es: 'Automatización Parcial', fr: 'Automatisation Partielle' }, description: { en: 'Key processes are automated, but integration is limited.', es: 'Los procesos clave están automatizados, pero la integración es limitada.', fr: "Les processus clés sont automatisés, mais l'intégration est limitée." }, score: 3 },
        { id: uuidv4(), name: { en: 'Cloud-Enabled', es: 'Habilitado para la Nube', fr: 'Compatible avec le Cloud' }, description: { en: 'Most systems are on the cloud, enabling scalability.', es: 'La mayoría de los sistemas están en la nube, lo que permite la escalabilidad.', fr: 'La plupart des systèmes sont sur le cloud, permettant l\'évolutivité.' }, score: 4 },
        { id: uuidv4(), name: { en: 'Highly Scalable & Integrated', es: 'Altamente Escalable e Integrado', fr: 'Hautement Évolutif et Intégré' }, description: { en: 'Fully integrated, scalable, and data-driven ecosystem.', es: 'Ecosistema totalmente integrado, escalable y basado en datos.', fr: 'Écosystème entièrement intégré, évolutif et axé sur les données.' }, score: 5 },
      ],
      desiredStates: [
        { id: uuidv4(), name: { en: 'Legacy Systems', es: 'Sistemas Heredados', fr: 'Systèmes Hérités' }, description: { en: 'Manual processes, outdated technology.', es: 'Procesos manuales, tecnología obsoleta.', fr: 'Processus manuels, technologie obsolète.' }, score: 1 },
        { id: uuidv4(), name: { en: 'Basic Digital Tools', es: 'Herramientas Digitales Básicas', fr: 'Outils Numériques de Base' }, description: { en: 'Some digital tools are used in silos.', es: 'Algunas herramientas digitales se utilizan en silos.', fr: 'Certains outils numériques sont utilisés en silos.' }, score: 2 },
        { id: uuidv4(), name: { en: 'Partial Automation', es: 'Automatización Parcial', fr: 'Automatisation Partielle' }, description: { en: 'Key processes are automated, but integration is limited.', es: 'Los procesos clave están automatizados, pero la integración es limitada.', fr: "Les processus clés sont automatisés, mais l'intégration est limitée." }, score: 3 },
        { id: uuidv4(), name: { en: 'Cloud-Enabled', es: 'Habilitado para la Nube', fr: 'Compatible avec le Cloud' }, description: { en: 'Most systems are on the cloud, enabling scalability.', es: 'La mayoría de los sistemas están en la nube, lo que permite la escalabilidad.', fr: 'La plupart des systèmes sont sur le cloud, permettant l\'évolutivité.' }, score: 4 },
        { id: uuidv4(), name: { en: 'Highly Scalable & Integrated', es: 'Altamente Escalable e Integrado', fr: 'Hautement Évolutif et Intégré' }, description: { en: 'Fully integrated, scalable, and data-driven ecosystem.', es: 'Ecosistema totalmente integrado, escalable y basado en datos.', fr: 'Écosystème entièrement intégré, évolutif et axé sur les données.' }, score: 5 },
      ],
    },
  ],
  recommendations: [],
  gapSettings: {
    thresholds: { LOW: 10, MEDIUM: 20 },
    descriptions: {
      LOW: { en: 'Low gap description', es: 'Descripción de brecha baja', fr: 'Description de faible écart' },
      MEDIUM: { en: 'Medium gap description', es: 'Descripción de brecha media', fr: 'Description d\'écart moyen' },
      HIGH: { en: 'High gap description', es: 'Descripción de brecha alta', fr: 'Description d\'écart élevé' },
    },
  },
};
