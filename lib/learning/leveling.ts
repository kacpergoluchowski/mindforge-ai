export const XP_PER_LEVEL = 1000;

export type LevelingProgress = {
  currentLevelStartXp: number;
  level: number;
  nextLevelXp: number;
  progressPercent: number;
  totalXp: number;
  xpInCurrentLevel: number;
  xpToNextLevel: number;
};

export function getLevelingProgress(xp: number): LevelingProgress {
  const totalXp = Math.max(Math.floor(xp), 0);
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelStartXp = (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = level * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXp - currentLevelStartXp;
  const xpToNextLevel = nextLevelXp - totalXp;
  const progressPercent = Math.min(
    Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100),
    100
  );

  return {
    currentLevelStartXp,
    level,
    nextLevelXp,
    progressPercent,
    totalXp,
    xpInCurrentLevel,
    xpToNextLevel,
  };
}

export function getNextLevelingProgress(currentXp: number, xpReward: number) {
  return getLevelingProgress(currentXp + Math.max(Math.floor(xpReward), 0));
}
