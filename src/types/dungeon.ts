export interface Question {
  id: string;
  enonce: string;
  options?: string[];
  reponse_correcte: string;
  explication: string;
  indice: string;
}

export interface Room {
  numero_salle: number;
  nom_salle: string;
  type: 'QCM' | 'EXERCICE' | 'SYNTHESE';
  questions: Question[];
}

export interface DungeonData {
  titre_donjon: string;
  niveau_estime: string;
  salles: Room[];
}