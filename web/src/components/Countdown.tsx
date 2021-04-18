import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown() {
  const [time, setTime] = useState(0.1 * 60); //colocando minutos pra segundos
  const [isActive, setIsActive] = useState(false); //armazena se o countdown está ativo ou não (pause/play)
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60); //tempo em minutos arrendondando pra baixo
  const seconds = time % 60; //resto da divisão são os segundos

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //destrincha primeira e segunda parte do tempo (ex.: '2''5: '0':'0'), se não tiver um caractere a esquerda ele preenche com 0 a partir do padStart
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown () {
    setIsActive(true);
  }

  function resetCountdown () {
    clearTimeout(countdownTimeout); //cancelando a execução do setTimeout, evitando que no pause ele tire 1s depois de clicar no botão de pause
    setIsActive(false);
    setTime(0.1 * 60); //em vez de simplesmente pausar, ele volta para o tempo original
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
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
            disabled
            className={styles.countdownButton}
          >
            Ciclo encerrado
          </button>
        ) : (
          <>
            { isActive ? (
                <button
                  type="button"
                  className={`${styles.countdownButton} ${styles.countdownButtonActive} `}
                  onClick={resetCountdown}
                >
                  Abandonar ciclo
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
              )
            }
          </>
        )
      }
    </>
  );
}
