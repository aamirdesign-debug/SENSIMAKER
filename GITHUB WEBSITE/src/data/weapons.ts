export interface WeaponMetaSpec {
  id: string;
  name: string;
  category: string;
  dragStyle: 'Straight Vertical Drag' | 'Rotation Drag' | 'J-Curve Drag' | 'Micro Flick Drag';
  recommendedVelocity: string;
  fireButtonSize: string;
  headshotMultiplier: string;
  bestRange: string;
  proTip: string;
}

export const WEAPON_META_SPECS: WeaponMetaSpec[] = [
  {
    id: 'deagle',
    name: 'Desert Eagle',
    category: 'Pistol / One-Tap King',
    dragStyle: 'Straight Vertical Drag',
    recommendedVelocity: 'Fast & High (75–90 px/ms)',
    fireButtonSize: '40% – 44%',
    headshotMultiplier: '495 HP Lethal',
    bestRange: 'Mid-to-Long (15m – 40m)',
    proTip: 'Wait until the enemy pauses to fire before pulling straight up in a sudden, razor-sharp flick toward the head.',
  },
  {
    id: 'm1887',
    name: 'M1887 (Shotgun)',
    category: 'Shotgun / Close Quarter',
    dragStyle: 'J-Curve Drag',
    recommendedVelocity: 'Explosive Sudden Snap (>110 px/ms)',
    fireButtonSize: '42% – 46%',
    headshotMultiplier: '150–220 HP Per Pellet',
    bestRange: 'Close Range (0m – 10m)',
    proTip: 'Start your thumb flick down slightly toward the enemy hips, then swoop violently upward in a J-curve motion.',
  },
  {
    id: 'woodpecker',
    name: 'Woodpecker',
    category: 'Marksman Rifle',
    dragStyle: 'Micro Flick Drag',
    recommendedVelocity: 'Controlled Rhythm (50–65 px/ms)',
    fireButtonSize: '45% – 48%',
    headshotMultiplier: '330 HP Armor Piercing',
    bestRange: 'Long Range (30m – 70m)',
    proTip: 'High armor penetration weapon. Keep crosshair at shoulder level; a gentle upward release locks instantly onto the helmet.',
  },
  {
    id: 'ump',
    name: 'UMP',
    category: 'Submachine Gun (SMG)',
    dragStyle: 'Rotation Drag',
    recommendedVelocity: 'Gradual Drag & Lock (40–55 px/ms)',
    fireButtonSize: '48% – 54%',
    headshotMultiplier: '135 HP Rapid Stream',
    bestRange: 'Close to Mid (5m – 25m)',
    proTip: 'Rotate your fire button slightly along the enemy movement vector before lifting upward to maintain bullet spread stabilization.',
  },
];
