import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  getCharacter,
  RARITY_COLORS,
  RARITY_LABEL_IMAGES,
  RARITY_SPAWN_WEIGHTS,
  VISIBLE_MODIFIERS,
  MODIFIER_EARNING_BONUS,
  MODIFIER_COLORS,
  calculateEarnings,
  calculateUpgradeCost,
  formatCurrency,
  formatRate,
  getSpawnChance,
} from '../data/characters';
import styles from '../styles/CharacterDetail.module.css';

const UPGRADE_LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const character = id ? getCharacter(id) : undefined;
  const [imgError, setImgError] = useState(false);

  if (!character) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundTitle}>Character Not Found</div>
        <p className={styles.notFoundText}>The character you're looking for doesn't exist.</p>
        <Link to="/" className={styles.homeButton}>Back to Index</Link>
      </div>
    );
  }

  const color = RARITY_COLORS[character.rarity];
  const labelImg = RARITY_LABEL_IMAGES[character.rarity];
  const renderSrc = character.renderFile
    ? `${import.meta.env.BASE_URL}renders/${encodeURIComponent(character.renderFile)}`
    : null;

  const totalWeight = Object.values(RARITY_SPAWN_WEIGHTS).reduce((a, b) => a + b, 0);
  const spawnWeight = RARITY_SPAWN_WEIGHTS[character.rarity];
  const relativeRarity = ((totalWeight / spawnWeight)).toFixed(0);

  return (
    <>
      <Link to="/" className={styles.backLink}>
        &larr; Back to Index
      </Link>

      <div className={styles.hero}>
        <div className={styles.renderWrap} style={{ borderColor: `${color}55` }}>
          {renderSrc && !imgError ? (
            <img
              className={styles.renderImage}
              src={renderSrc}
              alt={character.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.placeholderLarge}>?</div>
          )}
        </div>

        <div className={styles.heroInfo}>
          <h1 className={styles.charName}>{character.name}</h1>

          <div
            className={styles.rarityBadge}
            style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
          >
            {labelImg && (
              <img
                className={styles.rarityLabelImg}
                src={`${import.meta.env.BASE_URL}labels/${labelImg}`}
                alt={character.rarity}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            {character.rarity}
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>Base Earning Rate</div>
              <div className={styles.statValue} style={{ color }}>
                {formatRate(character.baseEarningRate)}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>Spawn Chance</div>
              <div className={styles.statValue}>
                {getSpawnChance(character.rarity)}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>Relative Rarity</div>
              <div className={styles.statValue}>
                1 in {relativeRarity}
              </div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>Tradeable</div>
              <div className={styles.statValue}>
                {character.tradeable ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Upgrade Curve</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Level</th>
              <th>Earnings /s</th>
              <th>Upgrade Cost</th>
            </tr>
          </thead>
          <tbody>
            {UPGRADE_LEVELS.map((lvl) => (
              <tr key={lvl}>
                <td>{lvl}</td>
                <td>{formatCurrency(calculateEarnings(character.baseEarningRate, lvl))}/s</td>
                <td>{formatCurrency(calculateUpgradeCost(character.baseEarningRate, lvl))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Modifier Effects</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Modifier</th>
              <th>Multiplier</th>
              <th>Earnings /s</th>
            </tr>
          </thead>
          <tbody>
            {VISIBLE_MODIFIERS.map((mod) => (
              <tr key={mod}>
                <td>
                  <span className={styles.modifierDot} style={{ background: MODIFIER_COLORS[mod] }} />
                  {mod}
                </td>
                <td>{MODIFIER_EARNING_BONUS[mod]}x</td>
                <td>{formatRate(character.baseEarningRate * MODIFIER_EARNING_BONUS[mod])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
