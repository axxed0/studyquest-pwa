import { useState } from 'react';
import RewardHub from './components/RewardHub';
import CourseScan from './components/CourseScan';
import DungeonGame from './components/DungeonGame';
import { DungeonData } from './types/dungeon';

export default function App() {
  const [view, setView] = useState<'hub' | 'scan' | 'dungeon'>('hub');
  const [unlockedTime, setUnlockedTime] = useState(0);
  const [currentDungeon, setCurrentDungeon] = useState<DungeonData | null>(null);

  const handleDungeonGenerated = (dungeonData: DungeonData) => {
    setCurrentDungeon(dungeonData);
    setView('dungeon');
  };

  const handleDungeonComplete = (gainedMinutes: number) => {
    setUnlockedTime((prev) => prev + gainedMinutes);
    setView('hub');
  };

  return (
    <div>
      {view === 'hub' && (
        <RewardHub
          unlockedTimeMinutes={unlockedTime}
          onStartStudy={() => setView('scan')}
        />
      )}
      {view === 'scan' && (
        <CourseScan
          onDungeonGenerated={handleDungeonGenerated}
          onCancel={() => setView('hub')}
        />
      )}
      {view === 'dungeon' && currentDungeon && (
        <DungeonGame
          dungeonData={currentDungeon}
          onComplete={handleDungeonComplete}
        />
      )}
    </div>
  );
}