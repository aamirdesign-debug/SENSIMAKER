export interface HudButtonSpec {
  id: string;
  name: string;
  sizePercent: number; // diameter %
  opacityPercent: number;
  xPercent: number; // from left 0–100%
  yPercent: number; // from top 0–100%
  fingerRole: string;
  tacticalNotes: string;
  iconType: 'fire-left' | 'fire-right' | 'gloo' | 'jump' | 'crouch' | 'prone' | 'scope' | 'sprint' | 'switch' | 'bag' | 'medkit';
}

export interface MobileHudPreset {
  id: string;
  title: string;
  layoutType: '2-Finger Thumb' | '3-Finger Hybrid Claw' | '4-Finger Tournament Pro';
  difficulty: 'Beginner' | 'Intermediate' | 'Esports Pro';
  learningCurveDays: string;
  description: string;
  buttons: HudButtonSpec[];
  proTips: string[];
}

export interface PcKeymappingPreset {
  id: string;
  title: string;
  emulatorTarget: string;
  description: string;
  suspendUnlockKey: string;
  tweaksCode: string;
  fireButtonKey: string;
  bindings: { action: string; key: string; fingerOrHand: string }[];
  recommendedMouseSettings: {
    dpi: number;
    pollingHz: number;
    windowsPointerSpeed: string;
    enhancePointerPrecision: string;
  };
}

export const MOBILE_HUD_PRESETS: MobileHudPreset[] = [
  {
    id: 'hud-2finger',
    title: '2-Finger Classic Thumb Pro',
    layoutType: '2-Finger Thumb',
    difficulty: 'Beginner',
    learningCurveDays: '1–3 Days',
    description: 'Designed for casual and rising players using dual thumbs. Maximizes button size and keeps critical actions close to natural thumb arc sweeps.',
    proTips: [
      'Keep Right Fire button low (20% from bottom) so you have the longest upward swipe distance for drag headshots.',
      'Place Gloo Wall button immediately adjacent to Left Thumb for instant reaction without lifting right hand.',
      'Set Scope button directly above Right Fire for lightning-fast scope-and-drag combos.',
    ],
    buttons: [
      { id: 'btn-rf', name: 'Right Fire (Drag)', sizePercent: 48, opacityPercent: 85, xPercent: 82, yPercent: 78, fingerRole: 'Right Thumb', tacticalNotes: 'Main headshot drag trigger with ample runway above.', iconType: 'fire-right' },
      { id: 'btn-lf', name: 'Left Fire', sizePercent: 55, opacityPercent: 40, xPercent: 12, yPercent: 42, fingerRole: 'Left Thumb', tacticalNotes: 'Used for stationary spray and gloo wall deployment.', iconType: 'fire-left' },
      { id: 'btn-gloo', name: 'Gloo Wall & Grenade', sizePercent: 70, opacityPercent: 95, xPercent: 22, yPercent: 78, fingerRole: 'Left Thumb', tacticalNotes: 'Enlarged hit area ensures zero missed defensive shields.', iconType: 'gloo' },
      { id: 'btn-jump', name: 'Jump', sizePercent: 55, opacityPercent: 80, xPercent: 92, yPercent: 52, fingerRole: 'Right Thumb', tacticalNotes: 'Comfortable corner positioning for jump-shots.', iconType: 'jump' },
      { id: 'btn-crouch', name: 'Crouch', sizePercent: 52, opacityPercent: 80, xPercent: 76, yPercent: 62, fingerRole: 'Right Thumb', tacticalNotes: 'Essential for sit-up headshot tricks and recoil reset.', iconType: 'crouch' },
      { id: 'btn-prone', name: 'Prone', sizePercent: 40, opacityPercent: 40, xPercent: 88, yPercent: 38, fingerRole: 'Right Thumb', tacticalNotes: 'Tucked away to prevent accidental clicks during close fights.', iconType: 'prone' },
      { id: 'btn-scope', name: 'Aim Scope', sizePercent: 58, opacityPercent: 85, xPercent: 84, yPercent: 40, fingerRole: 'Right Thumb', tacticalNotes: 'Positioned above fire button for seamless quick scopes.', iconType: 'scope' },
      { id: 'btn-sprint', name: 'Auto Sprint', sizePercent: 60, opacityPercent: 75, xPercent: 15, yPercent: 25, fingerRole: 'Left Thumb', tacticalNotes: 'Quick toggle for continuous tournament rotation velocity.', iconType: 'sprint' },
      { id: 'btn-switch', name: 'Quick Weapon Switch', sizePercent: 56, opacityPercent: 85, xPercent: 68, yPercent: 80, fingerRole: 'Right Thumb', tacticalNotes: 'Immediate weapon swap after shotgun or sniper shot.', iconType: 'switch' },
    ],
  },
  {
    id: 'hud-3finger',
    title: '3-Finger Claw Hybrid',
    layoutType: '3-Finger Hybrid Claw',
    difficulty: 'Intermediate',
    learningCurveDays: '5–7 Days',
    description: 'The preferred layout for aggressive one-tappers. Left index finger handles Left Fire or Jump, decoupling movement from firing.',
    proTips: [
      'Assign Left Index Finger exclusively to Left Fire or Gloo Wall for 0.15s reaction times.',
      'Right Thumb is completely dedicated to aiming and vertical drag without having to handle jump commands.',
      'Slightly lower HUD opacity to 50% once muscle memory takes over to increase peripheral battlefield vision.',
    ],
    buttons: [
      { id: 'btn-lf', name: 'Left Fire (Index)', sizePercent: 80, opacityPercent: 90, xPercent: 14, yPercent: 18, fingerRole: 'Left Index Finger', tacticalNotes: 'Top-left placement for instant tap while running.', iconType: 'fire-left' },
      { id: 'btn-rf', name: 'Right Fire (Drag)', sizePercent: 45, opacityPercent: 85, xPercent: 84, yPercent: 76, fingerRole: 'Right Thumb', tacticalNotes: 'Calibrated lower for 100% focused drag flicks.', iconType: 'fire-right' },
      { id: 'btn-gloo', name: 'Gloo Wall & Shield', sizePercent: 75, opacityPercent: 95, xPercent: 24, yPercent: 76, fingerRole: 'Left Thumb', tacticalNotes: 'Massive button for infallible defensive wall spam.', iconType: 'gloo' },
      { id: 'btn-jump', name: 'Jump', sizePercent: 60, opacityPercent: 85, xPercent: 92, yPercent: 48, fingerRole: 'Right Thumb', tacticalNotes: 'Instant access for jump-flick headshots.', iconType: 'jump' },
      { id: 'btn-crouch', name: 'Crouch', sizePercent: 55, opacityPercent: 80, xPercent: 78, yPercent: 60, fingerRole: 'Right Thumb', tacticalNotes: 'Recoil reset and slide movement.', iconType: 'crouch' },
      { id: 'btn-scope', name: 'Aim Scope', sizePercent: 60, opacityPercent: 85, xPercent: 84, yPercent: 36, fingerRole: 'Right Thumb', tacticalNotes: 'Scoped combat trigger.', iconType: 'scope' },
      { id: 'btn-sprint', name: 'Auto Sprint', sizePercent: 60, opacityPercent: 75, xPercent: 16, yPercent: 38, fingerRole: 'Left Thumb', tacticalNotes: 'Sprint toggle without joystick friction.', iconType: 'sprint' },
      { id: 'btn-switch', name: 'Quick Weapon Switch', sizePercent: 60, opacityPercent: 90, xPercent: 70, yPercent: 82, fingerRole: 'Right Thumb', tacticalNotes: 'Sub-0.1s swap between shotgun and katana.', iconType: 'switch' },
    ],
  },
  {
    id: 'hud-4finger',
    title: '4-Finger Tournament Pro Claw',
    layoutType: '4-Finger Tournament Pro',
    difficulty: 'Esports Pro',
    learningCurveDays: '10–14 Days',
    description: 'Tier-1 competitive championship setup. Left Index fires, Right Index jumps and scopes, leaving both thumbs purely for 360° locomotion and micro-aim.',
    proTips: [
      'Left Index handles firing; Right Index handles jump & crouch; Left Thumb controls joystick & sprint; Right Thumb controls camera & drag.',
      'Allows executing Jump + Turn 180° + Fire Headshot + Place Gloo Wall in under 0.4 seconds simultaneously.',
      'Keep button transparency at 30%–45% during scrims to spot enemy snipers at extreme draw distances.',
    ],
    buttons: [
      { id: 'btn-lf', name: 'Left Fire', sizePercent: 85, opacityPercent: 80, xPercent: 12, yPercent: 15, fingerRole: 'Left Index Finger', tacticalNotes: 'Primary high-speed combat trigger.', iconType: 'fire-left' },
      { id: 'btn-jump', name: 'Jump', sizePercent: 75, opacityPercent: 80, xPercent: 88, yPercent: 15, fingerRole: 'Right Index Finger', tacticalNotes: 'Top-right jump trigger for airborne dominance.', iconType: 'jump' },
      { id: 'btn-crouch', name: 'Crouch', sizePercent: 65, opacityPercent: 80, xPercent: 80, yPercent: 24, fingerRole: 'Right Index Finger', tacticalNotes: 'Rapid crouch spam behind obstacles.', iconType: 'crouch' },
      { id: 'btn-rf', name: 'Right Fire (Drag Assist)', sizePercent: 44, opacityPercent: 75, xPercent: 84, yPercent: 74, fingerRole: 'Right Thumb', tacticalNotes: 'Pure dedicated drag velocity stick.', iconType: 'fire-right' },
      { id: 'btn-gloo', name: 'Gloo Wall Trigger', sizePercent: 80, opacityPercent: 90, xPercent: 20, yPercent: 75, fingerRole: 'Left Thumb', tacticalNotes: 'Immediate barrier placement on ground tap.', iconType: 'gloo' },
      { id: 'btn-scope', name: 'Aim Scope', sizePercent: 65, opacityPercent: 80, xPercent: 90, yPercent: 36, fingerRole: 'Right Index Finger', tacticalNotes: 'Scope in without taking thumb off screen.', iconType: 'scope' },
      { id: 'btn-sprint', name: 'Sprint', sizePercent: 65, opacityPercent: 70, xPercent: 18, yPercent: 36, fingerRole: 'Left Thumb', tacticalNotes: 'Continuous movement transition.', iconType: 'sprint' },
      { id: 'btn-switch', name: 'Quick Switch', sizePercent: 65, opacityPercent: 85, xPercent: 68, yPercent: 78, fingerRole: 'Right Thumb', tacticalNotes: 'Speed weapon swapping.', iconType: 'switch' },
    ],
  },
];

export const PC_KEYMAPPING_PRESETS: PcKeymappingPreset[] = [
  {
    id: 'pc-bs5-comp',
    title: 'Competitive Tournament Setup',
    emulatorTarget: 'BlueStacks 5 / MSI App Player 5',
    description: 'Optimized for high-FPS competitive lobbies with instant mouse un-suspend to prevent emulator mouse acceleration bugs.',
    suspendUnlockKey: 'F1 or Mouse 4 (Side Button)',
    tweaksCode: '16450 (or 21058 for One-Tap)',
    fireButtonKey: 'Left Mouse Button',
    recommendedMouseSettings: {
      dpi: 1000,
      pollingHz: 1000,
      windowsPointerSpeed: '6/11 (Default, zero interpolation)',
      enhancePointerPrecision: 'DISABLED (Critical to prevent acceleration)',
    },
    bindings: [
      { action: 'Movement (WASD)', key: 'W, A, S, D', fingerOrHand: 'Left Hand' },
      { action: 'Fire / Shoot', key: 'Left Click', fingerOrHand: 'Right Hand (Mouse)' },
      { action: 'Aim / Scope', key: 'Right Click', fingerOrHand: 'Right Hand (Mouse)' },
      { action: 'Gloo Wall Deploy', key: 'E or Q', fingerOrHand: 'Left Hand' },
      { action: 'Jump', key: 'Spacebar', fingerOrHand: 'Left Thumb' },
      { action: 'Crouch', key: 'C', fingerOrHand: 'Left Hand' },
      { action: 'Prone', key: 'Z', fingerOrHand: 'Left Hand' },
      { action: 'Sprint / Run', key: 'Left Shift', fingerOrHand: 'Left Pinky' },
      { action: 'Quick Weapon Switch', key: 'F or 3', fingerOrHand: 'Left Hand' },
      { action: 'Reload', key: 'R', fingerOrHand: 'Left Hand' },
      { action: 'Heal / Medkit', key: '4 or X', fingerOrHand: 'Left Hand' },
      { action: 'Interact / Loot', key: 'F & G', fingerOrHand: 'Left Hand' },
    ],
  },
  {
    id: 'pc-onetap-sniper',
    title: 'One-Tap Sniper & Precision Setup',
    emulatorTarget: 'BlueStacks 5 / MSI App Player (Pie 64-bit)',
    description: 'Configured specifically for double-sniper quick swapping and instantaneous Desert Eagle one-taps without mouse drag delay.',
    suspendUnlockKey: 'Caps Lock or Mouse 5',
    tweaksCode: '21058',
    fireButtonKey: 'Left Mouse Button',
    recommendedMouseSettings: {
      dpi: 800,
      pollingHz: 1000,
      windowsPointerSpeed: '6/11',
      enhancePointerPrecision: 'DISABLED',
    },
    bindings: [
      { action: 'Primary Sniper Slot', key: '1', fingerOrHand: 'Left Hand' },
      { action: 'Secondary Sniper Slot', key: '2', fingerOrHand: 'Left Hand' },
      { action: 'Instant Quick Switch', key: 'Q', fingerOrHand: 'Left Ring Finger' },
      { action: 'Scope & Fire Chain', key: 'Right Click -> Left Click', fingerOrHand: 'Right Hand' },
      { action: 'Gloo Wall Quick Barrier', key: 'Mouse 4', fingerOrHand: 'Right Thumb' },
      { action: 'Jump Shot', key: 'Spacebar', fingerOrHand: 'Left Thumb' },
    ],
  },
  {
    id: 'pc-ld9-ultra',
    title: 'LDPlayer 9 Low-Latency Setup',
    emulatorTarget: 'LDPlayer 9 (Android 9 Kernel)',
    description: 'Lightweight emulator configuration prioritizing maximum frame stability on mid-range laptops and desktops.',
    suspendUnlockKey: '~ (Tilde) or Ctrl',
    tweaksCode: '30002',
    fireButtonKey: 'Left Mouse Button',
    recommendedMouseSettings: {
      dpi: 1200,
      pollingHz: 500,
      windowsPointerSpeed: '6/11',
      enhancePointerPrecision: 'DISABLED',
    },
    bindings: [
      { action: 'WASD Movement', key: 'W, A, S, D', fingerOrHand: 'Left Hand' },
      { action: 'Fire Drag', key: 'Left Click', fingerOrHand: 'Right Hand' },
      { action: 'Gloo Wall Drop', key: 'Q', fingerOrHand: 'Left Hand' },
      { action: 'Sprint Boost', key: 'Shift', fingerOrHand: 'Left Pinky' },
      { action: 'Bag & Inventory', key: 'Tab', fingerOrHand: 'Left Hand' },
    ],
  },
];
