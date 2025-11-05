import { ProfileDataItem, PacingPlanItem, NutritionPlanItem, GearItem } from './types';

export const profilData: ProfileDataItem[] = [
  { km: 0, alt: 160 },
  { km: 10, alt: 180 },
  { km: 20, alt: 140 },
  { km: 40, alt: 160 },
  { km: 60, alt: 200 },
  { km: 84.1, alt: 30 }
];

export const pacingPlanData: PacingPlanItem[] = [
  { segment: 'St-Quentin → Buc', distance: '22 km', dPlus: '250 m', pace: '6’20/km', duration: '2h07', pause: '4 min', time: '12h50' },
  { segment: 'Buc → Versailles', distance: '19 km', dPlus: '300 m', pace: '6’50/km', duration: '2h16', pause: '5 min', time: '15h10' },
  { segment: 'Versailles → Meudon', distance: '17 km', dPlus: '450 m', pace: '7’45/km', duration: '2h35', pause: '6 min', time: '17h50' },
  { segment: 'Meudon → St-Cloud', distance: '17 km', dPlus: '250 m', pace: '8’20/km', duration: '2h05', pause: '7 min', time: '20h00' },
  { segment: 'St-Cloud → Tour Eiffel', distance: '9 km', dPlus: '50 m', pace: '8’45/km', duration: '0h56', pause: '—', time: '21h00' }
];

export const nutritionPlanData: NutritionPlanItem[] = [
  { station: 'Buc', km: 22, time: '12h50', drink: '500 ml', eat: '1 barre', caffeine: 'Non', pause: '4 min' },
  { station: 'Versailles', km: 41, time: '15h10', drink: '500 ml', eat: '1 gel + 1 barre', caffeine: 'Non', pause: '5 min' },
  { station: 'Meudon', km: 58, time: '17h50', drink: '700 ml', eat: 'soupe + caféine', caffeine: 'Oui', pause: '6 min' },
  { station: 'St-Cloud', km: 75, time: '20h00', drink: '500 ml', eat: '1 gel', caffeine: 'Oui', pause: '7 min' }
];

export const gearData: GearItem[] = [
  { icon: '💧', item: 'Réserve d’eau', requirement: 'minimum 1,5 L', penalty: '2 min' },
  { icon: '🍞', item: 'Réserve alimentaire', requirement: '—', penalty: '—' },
  { icon: '🥤', item: 'Gobelet 15cl', requirement: 'minimum', penalty: '30 sec' },
  { icon: '🔦', item: 'Lampe frontale', requirement: 'obligatoire', penalty: '2 min' },
  { icon: '🦺', item: 'Brassard réfléchissant', requirement: 'obligatoire', penalty: '2 min' },
  { icon: '🧣', item: 'Couverture de survie', requirement: 'obligatoire', penalty: '2 min' },
  { icon: '📱', item: 'Téléphone portable', requirement: 'obligatoire', penalty: '2 min' },
  { icon: '🪪', item: 'Pièce d’identité', requirement: 'obligatoire', penalty: 'disqualification' },
  { icon: '💳', item: 'Moyen de paiement', requirement: 'recommandé', penalty: '—' }
];