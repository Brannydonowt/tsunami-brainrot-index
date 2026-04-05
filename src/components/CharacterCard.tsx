import { Link } from 'react-router-dom';
import { type CharacterData, RARITY_COLORS, formatRate } from '../data/characters';
import styles from '../styles/CharacterCard.module.css';
import { useState } from 'react';

interface Props {
  character: CharacterData;
}

export default function CharacterCard({ character }: Props) {
  const [imgError, setImgError] = useState(false);
  const color = RARITY_COLORS[character.rarity];
  const renderSrc = character.renderFile
    ? `${import.meta.env.BASE_URL}renders/${encodeURIComponent(character.renderFile)}`
    : null;

  return (
    <Link
      to={`/character/${character.id}`}
      className={styles.card}
      style={{ borderColor: `${color}33` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}88`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}33`;
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className={styles.imageWrap}>
        {renderSrc && !imgError ? (
          <img
            className={styles.characterImage}
            src={renderSrc}
            alt={character.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.placeholder}>?</div>
        )}
        <span
          className={styles.rarityTag}
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
          {character.rarity}
        </span>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{character.name}</div>
        <div className={styles.rate} style={{ color }}>{formatRate(character.baseEarningRate)}</div>
      </div>
    </Link>
  );
}
