export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Mythical = 'Mythical',
  Cosmic = 'Cosmic',
  Secret = 'Secret',
  Celestial = 'Celestial',
  Divine = 'Divine',
}

export const RARITY_ORDER: Rarity[] = [
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Epic,
  Rarity.Legendary,
  Rarity.Mythical,
  Rarity.Cosmic,
  Rarity.Secret,
  Rarity.Celestial,
  Rarity.Divine,
];

export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.Common]: '#b0b0b0',
  [Rarity.Uncommon]: '#4caf50',
  [Rarity.Rare]: '#2196f3',
  [Rarity.Epic]: '#9c27b0',
  [Rarity.Legendary]: '#ff9800',
  [Rarity.Mythical]: '#e91e63',
  [Rarity.Cosmic]: '#00bcd4',
  [Rarity.Secret]: '#f44336',
  [Rarity.Celestial]: '#ffd700',
  [Rarity.Divine]: '#ff6ff2',
};

export const RARITY_LABEL_IMAGES: Record<Rarity, string | null> = {
  [Rarity.Common]: 'T_Common.png',
  [Rarity.Uncommon]: 'T_Uncommon.png',
  [Rarity.Rare]: 'T_Rare.png',
  [Rarity.Epic]: 'T_Epic.png',
  [Rarity.Legendary]: 'T_Legendary.png',
  [Rarity.Mythical]: 'T_Mythical.png',
  [Rarity.Cosmic]: 'T_Cosmic.png',
  [Rarity.Secret]: 'T_Secret.png',
  [Rarity.Celestial]: 'T_Celestial.png',
  [Rarity.Divine]: null,
};

export const RARITY_SPAWN_WEIGHTS: Record<Rarity, number> = {
  [Rarity.Common]: 100,
  [Rarity.Uncommon]: 60,
  [Rarity.Rare]: 30,
  [Rarity.Epic]: 15,
  [Rarity.Legendary]: 8,
  [Rarity.Mythical]: 4,
  [Rarity.Cosmic]: 2,
  [Rarity.Secret]: 1,
  [Rarity.Celestial]: 0.5,
  [Rarity.Divine]: 0.25,
};

export enum ModifierType {
  None = 'None',
  Gold = 'Gold',
  Emerald = 'Emerald',
  Diamond = 'Diamond',
  Blood = 'Blood',
  Electric = 'Electric',
  Radioactive = 'Radioactive',
}

export const MODIFIER_EARNING_BONUS: Record<ModifierType, number> = {
  [ModifierType.None]: 1.0,
  [ModifierType.Gold]: 1.5,
  [ModifierType.Emerald]: 3.0,
  [ModifierType.Diamond]: 10.0,
  [ModifierType.Blood]: 25.0,
  [ModifierType.Electric]: 50.0,
  [ModifierType.Radioactive]: 100.0,
};

export const VISIBLE_MODIFIERS = [
  ModifierType.Gold,
  ModifierType.Emerald,
  ModifierType.Diamond,
  ModifierType.Blood,
  ModifierType.Electric,
  ModifierType.Radioactive,
];

export const MODIFIER_COLORS: Record<ModifierType, string> = {
  [ModifierType.None]: '#b0b0b0',
  [ModifierType.Gold]: '#ffd700',
  [ModifierType.Emerald]: '#50c878',
  [ModifierType.Diamond]: '#b9f2ff',
  [ModifierType.Blood]: '#8b0000',
  [ModifierType.Electric]: '#00bfff',
  [ModifierType.Radioactive]: '#7fff00',
};

export const EARNINGS_GROWTH_RATE = 1.25;
export const COST_GROWTH_RATE = 1.50;

export interface CharacterData {
  id: string;
  name: string;
  rarity: Rarity;
  baseEarningRate: number;
  renderFile: string | null;
  tradeable: boolean;
}

export function calculateEarnings(baseRate: number, level: number): number {
  return baseRate * Math.pow(EARNINGS_GROWTH_RATE, level - 1);
}

export function calculateUpgradeCost(baseRate: number, level: number): number {
  return baseRate * Math.pow(COST_GROWTH_RATE, level - 1);
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatRate(value: number): string {
  return `${formatCurrency(value)}/s`;
}

function spawnChance(rarity: Rarity): number {
  const total = Object.values(RARITY_SPAWN_WEIGHTS).reduce((a, b) => a + b, 0);
  return (RARITY_SPAWN_WEIGHTS[rarity] / total) * 100;
}

export function getSpawnChance(rarity: Rarity): string {
  const pct = spawnChance(rarity);
  return pct < 0.1 ? `${pct.toFixed(2)}%` : `${pct.toFixed(1)}%`;
}

export const ALL_CHARACTERS: CharacterData[] = [
  // ── Common (5) ──
  { id: 'Alessio', name: 'Alessio', rarity: Rarity.Common, baseEarningRate: 2, renderFile: 'T_Char_Alessio.png', tradeable: true },
  { id: 'NoobiniPizzanini', name: 'Noobini Pizzanini', rarity: Rarity.Common, baseEarningRate: 5, renderFile: 'T_Char_Noobini Pizzanini.png', tradeable: true },
  { id: 'PipiAvocado', name: 'Pipi Avocado', rarity: Rarity.Common, baseEarningRate: 8, renderFile: 'T_Char_Pipi Avocado.png', tradeable: true },
  { id: 'PipiCorni', name: 'Pipi Corni', rarity: Rarity.Common, baseEarningRate: 11, renderFile: 'T_Char_Pipi Corni.png', tradeable: true },
  { id: 'PipiKiwi', name: 'Pipi Kiwi', rarity: Rarity.Common, baseEarningRate: 15, renderFile: 'T_Char_Pipi Kiwi.png', tradeable: true },

  // ── Uncommon (3) ──
  { id: 'BonecaAmbalabu', name: 'Boneca Ambalabu', rarity: Rarity.Uncommon, baseEarningRate: 20, renderFile: 'T_Char_Boneca Ambalabu.png', tradeable: true },
  { id: 'DulDulDul', name: 'Dul Dul Dul', rarity: Rarity.Uncommon, baseEarningRate: 60, renderFile: 'T_Char_Dul Dul Dul.png', tradeable: true },
  { id: 'ChefCrabracadabra', name: 'Chef Crabracadabra', rarity: Rarity.Uncommon, baseEarningRate: 100, renderFile: 'T_Char_Chef Crabracadabra.png', tradeable: true },

  // ── Rare (4) ──
  { id: 'TimCheese', name: 'Tim Cheese', rarity: Rarity.Rare, baseEarningRate: 100, renderFile: 'T_Char_Tim Cheese.png', tradeable: true },
  { id: 'GattatinoNyanino', name: 'Gattatino Nyanino', rarity: Rarity.Rare, baseEarningRate: 160, renderFile: 'T_Char_Gattatino Nyanino.png', tradeable: true },
  { id: 'CappuccinoAssassino', name: 'Cappuccino Assassino', rarity: Rarity.Rare, baseEarningRate: 215, renderFile: 'T_Char_Cappuccino Assassino.png', tradeable: true },
  { id: 'BurbaloniLoliloli', name: 'Burbaloni Loliloli', rarity: Rarity.Rare, baseEarningRate: 275, renderFile: 'T_Char_Burbaloni Loliloli.png', tradeable: true },

  // ── Epic (4) ──
  { id: 'BananitaDolphinita', name: 'Bananita Dolphinita', rarity: Rarity.Epic, baseEarningRate: 290, renderFile: 'T_Char_Bananita Dolphinita.png', tradeable: true },
  { id: 'FrigoCamelo', name: 'Frigo Camelo', rarity: Rarity.Epic, baseEarningRate: 660, renderFile: 'T_Char_Frigo Camelo.png', tradeable: true },
  { id: 'BanditoBobritto', name: 'Bandito Bobritto', rarity: Rarity.Epic, baseEarningRate: 1030, renderFile: 'T_Char_Bandito Bobritto.png', tradeable: true },
  { id: 'ChimpanziniBananini', name: 'Chimpanzini Bananini', rarity: Rarity.Epic, baseEarningRate: 1400, renderFile: 'T_Char_Chimpanzini Bananini.png', tradeable: true },

  // ── Legendary (3) ──
  { id: 'GangsterFootera', name: 'Gangster Footera', rarity: Rarity.Legendary, baseEarningRate: 1500, renderFile: 'T_Char_Gangster Footera.png', tradeable: true },
  { id: 'Antonio', name: 'Antonio', rarity: Rarity.Legendary, baseEarningRate: 3000, renderFile: 'T_Char_Antonio.png', tradeable: true },
  { id: 'LiriliLarila', name: 'Lirili Larila', rarity: Rarity.Legendary, baseEarningRate: 4500, renderFile: 'T_Char_Lirili Larila.png', tradeable: true },

  // ── Mythical (3) ──
  { id: 'GorilloWatermelondrillo', name: 'Gorillo Watermelondrillo', rarity: Rarity.Mythical, baseEarningRate: 8000, renderFile: 'T_Char_Gorillo Watermelondrillo.png', tradeable: true },
  { id: 'SigmaBoy', name: 'Sigma Boy', rarity: Rarity.Mythical, baseEarningRate: 13000, renderFile: 'T_Char_Sigma Boy.png', tradeable: true },
  { id: 'SalaminoPenguino', name: 'Salamino Penguino', rarity: Rarity.Mythical, baseEarningRate: 18000, renderFile: 'T_Char_Salamino Penguino.png', tradeable: true },

  // ── Cosmic (2) ──
  { id: 'Matteo', name: 'Matteo', rarity: Rarity.Cosmic, baseEarningRate: 22000, renderFile: 'T_Char_Matteo.png', tradeable: true },
  { id: 'GanganzelliTrulala', name: 'Ganganzelli Trulala', rarity: Rarity.Cosmic, baseEarningRate: 170000, renderFile: 'T_Char_Ganganzelli Trulala.png', tradeable: true },

  // ── Secret (5) ──
  { id: 'OrcaleroOrcala', name: 'Orcalero Orcala', rarity: Rarity.Secret, baseEarningRate: 200000, renderFile: 'T_Char_Orcalero Orcala.png', tradeable: true },
  { id: 'CarrotiniBrainini', name: 'Carrotini Brainini', rarity: Rarity.Secret, baseEarningRate: 400000, renderFile: 'T_Char_Carrotini Brainini.png', tradeable: true },
  { id: 'Pakrahmatmamat', name: 'Pakrahmatmamat', rarity: Rarity.Secret, baseEarningRate: 600000, renderFile: 'T_Char_Pakrahmatmamat.png', tradeable: true },
  { id: 'BrrBrrPataPim', name: 'Brr Brr Pata Pim', rarity: Rarity.Secret, baseEarningRate: 800000, renderFile: 'T_Char_Brr Brr Patapim.png', tradeable: true },
  { id: 'TrippiTroppi', name: 'Trippi Troppi', rarity: Rarity.Secret, baseEarningRate: 1000000, renderFile: 'T_Char_Trippi Troppi.png', tradeable: true },

  // ── Celestial (8) ──
  { id: 'SixSevenCelestial', name: '67', rarity: Rarity.Celestial, baseEarningRate: 7500000, renderFile: 'T_Char_67.png', tradeable: true },
  { id: 'JobJobJobSahur', name: 'Job Job Job Sahur', rarity: Rarity.Celestial, baseEarningRate: 8600000, renderFile: null, tradeable: true },
  { id: 'DragonCannelloni', name: 'Dragon Cannelloni', rarity: Rarity.Celestial, baseEarningRate: 9700000, renderFile: 'T_Char_Dragon Cannelloni.png', tradeable: true },
  { id: 'SpioniroGolubiro', name: 'Spioniro Golubiro', rarity: Rarity.Celestial, baseEarningRate: 10800000, renderFile: 'T_Char_Spioniro Golubiro.png', tradeable: true },
  { id: 'BanditoAxolito', name: 'Bandito Axolito', rarity: Rarity.Celestial, baseEarningRate: 11900000, renderFile: 'T_Char_Bandito Axolito.png', tradeable: true },
  { id: 'EspressoSignora', name: 'Espresso Signora', rarity: Rarity.Celestial, baseEarningRate: 13000000, renderFile: 'T_Char_Espresso Signora.png', tradeable: true },
  { id: 'PiccioneMacchina', name: 'Piccione Macchina', rarity: Rarity.Celestial, baseEarningRate: 14500000, renderFile: null, tradeable: true },
  { id: 'AgarriniLaPalini', name: 'Agarrini la Palini', rarity: Rarity.Celestial, baseEarningRate: 16000000, renderFile: null, tradeable: true },

  // ── Divine (7) ──
  { id: 'GraipussMedussi', name: 'Graipuss Medussi', rarity: Rarity.Divine, baseEarningRate: 30000000, renderFile: null, tradeable: false },
  { id: 'PenguinoCocosino', name: 'Penguino Cocosino', rarity: Rarity.Divine, baseEarningRate: 37500000, renderFile: null, tradeable: false },
  { id: 'BrriBrriBicusDicusBombicus', name: 'Brri Brri Bicus Dicus Bombicus', rarity: Rarity.Divine, baseEarningRate: 45000000, renderFile: 'T_Char_Brr es Teh Patipum.png', tradeable: false },
  { id: 'CocofantoElefanto', name: 'Cocofanto Elefanto', rarity: Rarity.Divine, baseEarningRate: 52500000, renderFile: null, tradeable: false },
  { id: 'ExtinctTralalero', name: 'Extinct Tralalero', rarity: Rarity.Divine, baseEarningRate: 60000000, renderFile: null, tradeable: false },
  { id: 'RhinoToasterino', name: 'Rhino Toasterino', rarity: Rarity.Divine, baseEarningRate: 67500000, renderFile: null, tradeable: false },
  { id: 'PerochelloLemonchello', name: 'Perochello Lemonchello', rarity: Rarity.Divine, baseEarningRate: 75000000, renderFile: null, tradeable: false },
];

export function getCharacter(id: string): CharacterData | undefined {
  return ALL_CHARACTERS.find((c) => c.id === id);
}

export function getCharactersByRarity(rarity: Rarity): CharacterData[] {
  return ALL_CHARACTERS.filter((c) => c.rarity === rarity);
}
