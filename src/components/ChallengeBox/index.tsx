import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from '../../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
  const { resetCountdown, } = useContext(CountdownContext);

  const handleChallengeSucceded = () => {
    completedChallenge();
    resetCountdown();
  }

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Ícone do desafio" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type='button'
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
              </button>
            <button
              type='button'
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceded}
            >
              Completei
              </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong> Inicie um ciclo para receber desafios a serem completados </strong>
            <p>
              <img src="icons/level-up.svg" alt="Ícone level up" />
        Avance de level completando desafios.
      </p>
          </div>
        )}
    </div>
  )
}