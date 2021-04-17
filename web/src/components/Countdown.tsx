import { useState, useEffect } from 'react';

import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
  const [time, setTime] = useState(25 * 60); //colocando minutos pra segundos
  const [active, setActive] = useState(false); //armazena se o countdown está ativo ou não (pause/play)

  const minutes = Math.floor(time / 60); //tempo em minutos arrendondando pra baixo
  const seconds = time % 60; //resto da divisão são os segundos

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //destrincha primeira e segunda parte do tempo (ex.: '2''5: '0':'0'), se não tiver um caractere a esquerda ele preenche com 0 a partir do padStart
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown () {
    setActive(true);
  }

  useEffect(() => {
    if(active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </>
  );
}
