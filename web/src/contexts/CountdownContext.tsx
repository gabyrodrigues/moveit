import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ChallengesContext } from '../contexts/ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}


interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(0.1 * 60); //colocando minutos pra segundos
  const [isActive, setIsActive] = useState(false); //armazena se o countdown está ativo ou não (pause/play)
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60); //tempo em minutos arrendondando pra baixo
  const seconds = time % 60; //resto da divisão são os segundos

  function startCountdown () {
    setIsActive(true);
  }

  function resetCountdown () {
    clearTimeout(countdownTimeout); //cancelando a execução do setTimeout, evitando que no pause ele tire 1s depois de clicar no botão de pause
    setIsActive(false);
    setTime(0.1 * 60); //em vez de simplesmente pausar, ele volta para o tempo original
    setHasFinished(false);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) { //se o countdown ainda estiver ativo e o tempo chegou a 0, declara que finalizou o tempo
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
