import { createContext, useState, ReactNode } from 'react';

import challenges from '../../../challenges.json';

interface Challenge {
  type: string,
  description: string,
  amount: number,
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  experienceToNextLevel: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);


  // Math.pow calculo de potencia.
  // 4 e o fator de experiencia, mude esse valor se voce quiser deixar mais facil ou dificil
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(prevState => prevState + 1);
  }

  const resetChallenge = () => {
    setActiveChallenge(null);
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )

}
