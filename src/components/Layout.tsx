import { Outlet, Link } from 'react-router-dom';
import { ALL_CHARACTERS, RARITY_ORDER } from '../data/characters';
import styles from '../styles/Layout.module.css';

const tierCount = RARITY_ORDER.length;
const charCount = ALL_CHARACTERS.length;

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            Brainrot <span className={styles.logoAccent}>Index</span>
          </Link>
          <div className={styles.headerStats}>
            <span className={styles.headerStat}>
              Characters: <span className={styles.headerStatValue}>{charCount}</span>
            </span>
            <span className={styles.headerStat}>
              Tiers: <span className={styles.headerStatValue}>{tierCount}</span>
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        Brainrot Tsunami Character Index
      </footer>
    </div>
  );
}
