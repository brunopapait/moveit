import { useState, useEffect, useContext } from 'react'
import styles from '../../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

import { ChallengesContext } from '../../contexts/ChallengeContext/index';

export default function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span> {minuteLeft} </span>
          <span> {minuteRight} </span>
        </div>
        <span>:</span>
        <div>
          <span> {secondsLeft} </span>
          <span> {secondRight} </span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ?
              (
                <button
                  type='button'
                  onClick={resetCountdown}
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                  Abandonar ciclo
                </button>
              ) : (
                <button
                  type='button'
                  onClick={startCountdown}
                  className={styles.countdownButton}>
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  )
}