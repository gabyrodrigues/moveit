import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const contextData = useContext(ChallengesContext);
  const hasActiveChallenge = true;

	return (
    <div className={styles.challengeBoxContainer}>
      {
        hasActiveChallenge ? (
          <div className={styles.challengeActive}>
              <header>Ganhe 400xp</header>
              <main>
                <img src="icons/body.svg" />
                <strong>Exercite-se</strong>
                <p>
                  É agora, bora lá parça!
                  Caminhe por 3 minutos e estique suas pernas
                  pra você ficar saudável.
                </p>
              </main>

              <footer>
                <button
                  type="button"
                  className={styles.challengeFailedButton}
                >
                  Falhei
                </button>

                <button
                  type="button"
                  className={styles.challengeCompletedButton}
                >
                  Completei
                </button>
              </footer>
          </div>
        ) : (
          <div className={styles.challengeNotActive}>
            <strong>
              Finalize um ciclo para receber desafios a serem completados
            </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Complete-os e ganhe experiência e avance de level.
            </p>
          </div>
        )
      }
    </div>
	);
}
