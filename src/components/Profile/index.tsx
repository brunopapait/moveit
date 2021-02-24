import styles from '../../styles/components/Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/brunopapait.png" alt="Imagem do avatar" />
      <div>
        <strong>Bruno Papait</strong>
        <p>
          <img src="icons/level.svg" alt="Ícone de level" />
          Level 1
          </p>
      </div>
    </div>
  );
}