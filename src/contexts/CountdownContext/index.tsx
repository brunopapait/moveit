import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../ChallengeContext";

interface CountdownTextData {
  hasFinished: boolean,
  minutes: number,
  seconds: number,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownTextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(prevState => prevState - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  const startCountdown = () => {
    setIsActive(true);
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  return (
    <CountdownContext.Provider value={{ hasFinished, minutes, seconds, isActive, startCountdown, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  )
}