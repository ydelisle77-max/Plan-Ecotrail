export interface ProfileDataItem {
  km: number;
  alt: number;
}

export interface PacingPlanItem {
  segment: string;
  distance: string;
  dPlus: string;
  pace: string;
  duration: string;
  pause: string;
  time: string;
}

export interface NutritionPlanItem {
  station: string;
  km: number;
  time: string;
  drink: string;
  eat: string;
  caffeine: 'Oui' | 'Non';
  pause: string;
}

export interface GearItem {
  icon: string;
  item: string;
  requirement: string;
  penalty: string;
}