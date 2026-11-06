import React, { useState } from 'react';
import { DungeonData } from '../types/dungeon';

interface DungeonGameProps {
  dungeonData: DungeonData;
  onComplete: (gainedMinutes: number) => void;
}

export default function DungeonGame({ dungeonData, onComplete }: DungeonGameProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentRoom = dungeonData.salles[currentRoomIndex];
  const currentQuestion = currentRoom.questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowHint(false);
      if (currentQuestionIndex < currentRoom.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentRoomIndex < dungeonData.salles.length - 1) {
        setCurrentRoomIndex(currentRoomIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        onComplete(15); // +15 minutes de jeu débloquées à la fin
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col justify-between max-w-md mx-auto">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex justify-between text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">
          <span>{currentRoom.nom_salle}</span>
          <span>Salle {currentRoomIndex + 1} / 3</span>
        </div>
        <h2 className="text-lg font-extrabold">{dungeonData.titre_donjon}</h2>
      </div>

      <div className="my-6 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md font-semibold">
          Question {currentQuestionIndex + 1}
        </span>
        <p className="text-lg font-medium mt-4 mb-6">{currentQuestion.enonce}</p>

        <div className="space-y-3">
          {currentQuestion.options?.map((option, idx) => {
            let btnStyle = "bg-slate-700 hover:bg-slate-600 border-slate-600";
            if (selectedAnswer === option) {
              btnStyle = option.startsWith(currentQuestion.reponse_correcte) 
                ? "bg-emerald-600 border-emerald-500" 
                : "bg-rose-600 border-rose-500";
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-xl border font-medium transition-all ${btnStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/50">
          {!showHint ? (
            <button 
              onClick={() => setShowHint(true)}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              💡 Demander de l'aide à l'Esprit Gardien
            </button>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-amber-200 text-xs">
              <strong>Indice :</strong> {currentQuestion.indice}
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pb-2">
        StudyQuest PWA • Mode Collège & Lycée
      </div>
    </div>
  );
}