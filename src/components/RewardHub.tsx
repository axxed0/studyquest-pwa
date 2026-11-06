import React from 'react';

interface RewardHubProps {
  unlockedTimeMinutes: number;
  onStartStudy: () => void;
}

export default function RewardHub({ unlockedTimeMinutes, onStartStudy }: RewardHubProps) {
  const gamesList = [
    { id: 'cyber-runner', name: 'Cyber Runner', category: 'Arcade 2D', costMin: 5, icon: '🏃‍♂️', color: 'from-blue-600 to-cyan-500' },
    { id: 'dungeon-arena', name: 'Arena Duel', category: 'Combat RPG', costMin: 10, icon: '⚔️', color: 'from-amber-600 to-red-600' },
    { id: 'space-defender', name: 'Space Defender', category: 'Shoot em up', costMin: 5, icon: '🚀', color: 'from-purple-600 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Crédit de Temps Disponible</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-emerald-400">{unlockedTimeMinutes}</span>
            <span className="text-lg font-bold text-slate-300">minutes de jeu</span>
          </div>
        </div>

        <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">Salle d'Arcade (Mini-Jeux)</h2>
        <div className="space-y-3">
          {gamesList.map((game) => {
            const canPlay = unlockedTimeMinutes >= game.costMin;
            return (
              <div
                key={game.id}
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  canPlay ? 'bg-slate-800 border-slate-700 cursor-pointer' : 'bg-slate-800/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl`}>
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{game.name}</h3>
                    <span className="text-xs text-slate-400">{game.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg font-bold">
                    {canPlay ? 'Jouer' : `🔒 ${game.costMin} min`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onStartStudy}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
      >
        ⚡ Gagner du Temps de Jeu (Réviser)
      </button>
    </div>
  );
}