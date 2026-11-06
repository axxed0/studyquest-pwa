import React, { useState, useRef } from 'react';
import { DungeonData } from '../types/dungeon';

interface CourseScanProps {
  onDungeonGenerated: (dungeonData: DungeonData) => void;
  onCancel: () => void;
}

export default function CourseScan({ onDungeonGenerated, onCancel }: CourseScanProps) {
  const [subject, setSubject] = useState('Mathématiques');
  const [inputText, setInputText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartDungeon = () => {
    if (!inputText && !imagePreview) return;
    setIsLoading(true);

    // Simulation de génération IA
    setTimeout(() => {
      const mockDungeon: DungeonData = {
        titre_donjon: `${subject} : Entraînement Express`,
        niveau_estime: "Collège / Lycée",
        salles: [
          {
            numero_salle: 1,
            nom_salle: "Salle 1 : Échauffement",
            type: "QCM",
            questions: [
              {
                id: "1",
                enonce: "Quelle est la règle de base sur cette notion ?",
                options: ["A) Réponse A", "B) Réponse B", "C) Réponse C"],
                reponse_correcte: "B",
                explication: "C'est la règle standard du cours.",
                indice: "Pense au premier chapitre du manuel."
              }
            ]
          },
          {
            numero_salle: 2,
            nom_salle: "Salle 2 : Mini-Boss",
            type: "EXERCICE",
            questions: [
              {
                id: "2",
                enonce: "Comment applique-t-on la formule ?",
                options: ["A) Option 1", "B) Option 2"],
                reponse_correcte: "A",
                explication: "Application directe.",
                indice: "Vérifie les unités."
              }
            ]
          },
          {
            numero_salle: 3,
            nom_salle: "Salle 3 : Le Boss Final",
            type: "SYNTHESE",
            questions: [
              {
                id: "3",
                enonce: "Résous le problème principal du cours :",
                options: ["A) Résultat X", "B) Résultat Y"],
                reponse_correcte: "A",
                explication: "Démonstration complète.",
                indice: "Synthétise les étapes précédentes."
              }
            ]
          }
        ]
      };
      setIsLoading(false);
      onDungeonGenerated(mockDungeon);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm font-semibold">
            ← Annuler
          </button>
          <h1 className="text-lg font-bold text-indigo-400">Urgence DS / Contrôle</h1>
          <div className="w-12"></div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Matière du contrôle</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
          >
            <option>Mathématiques</option>
            <option>Physique-Chimie</option>
            <option>SVT</option>
            <option>Histoire-Géo</option>
            <option>Français / Philosophie</option>
            <option>Anglais / LV1</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Scanner le cours</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleImageCapture}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500 max-h-56">
              <img src={imagePreview} alt="Aperçu du cours" className="w-full object-cover" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-rose-600/90 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md"
              >
                Supprimer
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-800/50 transition-colors"
            >
              <span className="text-3xl mb-2">📸</span>
              <span className="text-sm font-bold text-slate-300">Prendre en photo ta leçon</span>
              <span className="text-xs text-slate-500 mt-1">Cahier, manuel ou feuille</span>
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Ou colle le texte du cours</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ex: Chapitre sur les dérivées..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm h-28 focus:outline-none focus:border-indigo-500 resize-none"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleStartDungeon}
        disabled={isLoading || (!inputText && !imagePreview)}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 rounded-2xl font-extrabold text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>L'IA invoque le Donjon...</span>
          </>
        ) : (
          <span>🏰 Entrer dans le Donjon Express</span>
        )}
      </button>
    </div>
  );
}