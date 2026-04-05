import { useState, useMemo } from 'react';
import {
  ALL_CHARACTERS,
  RARITY_ORDER,
  RARITY_COLORS,
  VISIBLE_MODIFIERS,
  MODIFIER_EARNING_BONUS,
  MODIFIER_COLORS,
  type Rarity,
} from '../data/characters';
import CharacterCard from './CharacterCard';
import styles from '../styles/Gallery.module.css';

type SortKey = 'rarity' | 'name' | 'earning';

export default function Gallery() {
  const [activeFilters, setActiveFilters] = useState<Set<Rarity>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('rarity');

  const toggleFilter = (rarity: Rarity) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(rarity)) next.delete(rarity);
      else next.add(rarity);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let chars = ALL_CHARACTERS;
    if (activeFilters.size > 0) {
      chars = chars.filter((c) => activeFilters.has(c.rarity));
    }
    switch (sortKey) {
      case 'name':
        return [...chars].sort((a, b) => a.name.localeCompare(b.name));
      case 'earning':
        return [...chars].sort((a, b) => b.baseEarningRate - a.baseEarningRate);
      case 'rarity':
      default:
        return chars;
    }
  }, [activeFilters, sortKey]);

  return (
    <>
      <h1 className={styles.pageTitle}>Character Index</h1>
      <p className={styles.pageSubtitle}>
        Browse all {ALL_CHARACTERS.length} characters across {RARITY_ORDER.length} rarity tiers
      </p>

      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          {RARITY_ORDER.map((r) => {
            const active = activeFilters.has(r);
            return (
              <button
                key={r}
                className={active ? styles.filterPillActive : styles.filterPill}
                style={
                  active
                    ? { borderColor: RARITY_COLORS[r], color: RARITY_COLORS[r], background: `${RARITY_COLORS[r]}18` }
                    : undefined
                }
                onClick={() => toggleFilter(r)}
              >
                {r}
              </button>
            );
          })}
        </div>

        <select
          className={styles.sortSelect}
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
        >
          <option value="rarity">Sort: Rarity Tier</option>
          <option value="name">Sort: Name A-Z</option>
          <option value="earning">Sort: Earning Rate</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>No characters match the selected filters.</div>
        ) : (
          filtered.map((c) => <CharacterCard key={c.id} character={c} />)
        )}
      </div>

      <section className={styles.modifierSection}>
        <h2 className={styles.modifierTitle}>Modifiers</h2>
        <p className={styles.modifierDesc}>
          When a character spawns, it has a chance to roll a modifier. Modifiers multiply
          the character's base earning rate without affecting upgrade costs. Rarer modifiers
          are exponentially harder to find.
        </p>
        <div className={styles.modifierGrid}>
          {VISIBLE_MODIFIERS.map((mod) => (
            <div key={mod} className={styles.modifierCard}>
              <span
                className={styles.modifierDot}
                style={{ background: MODIFIER_COLORS[mod] }}
              />
              <div className={styles.modifierInfo}>
                <span className={styles.modifierName} style={{ color: MODIFIER_COLORS[mod] }}>
                  {mod}
                </span>
                <span className={styles.modifierMult}>
                  {MODIFIER_EARNING_BONUS[mod]}x earnings
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
