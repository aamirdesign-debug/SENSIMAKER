export interface GuideMasterclass {
  id: string;
  title: string;
  category: 'Sens & Aim' | 'Android' | 'PC Emulator' | 'Competitive';
  readTimeMinutes: number;
  badge: string;
  summary: string;
  content: {
    sectionHeading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    tacticalHighlight?: string;
  }[];
}

export const MASTERCLASSES: GuideMasterclass[] = [
  {
    id: 'guide-drag-mechanics',
    title: 'How to Master Drag Headshots (Straight, J-Curve & Rotation)',
    category: 'Sens & Aim',
    readTimeMinutes: 6,
    badge: 'CORE MECHANICS',
    summary: 'Master the three fundamental thumb flick geometries that guarantee red numbers at close, mid, and long ranges.',
    content: [
      {
        sectionHeading: '1. The Straight Vertical Drag (Mid-to-Long Range)',
        paragraphs: [
          'The Straight Vertical Drag is the foundation of all headshots in Free Fire, particularly effective with weapons like the Desert Eagle, M500, Woodpecker, and SCAR.',
          'When an enemy is stationary or running directly toward or away from you, your thumb must execute an upward swipe in a strictly vertical line without any lateral wavering.',
        ],
        bulletPoints: [
          'Initial Position: Position your crosshair near the enemy clavicle or chest before touching the fire button.',
          'Release Velocity: Pull straight up toward the top bezel. Long range requires a gentle drag; close range requires high acceleration.',
          'The Deadstop Rule: Always release your movement joystick for 0.1s prior to flicking to eliminate bullet bloom.',
        ],
        tacticalHighlight: 'PRO TIP: Do not flick while running diagonally. Stop movement, fire one clean tap, and return to sprint.',
      },
      {
        sectionHeading: '2. The J-Curve Drag (Close-Range Shotgun Snap)',
        paragraphs: [
          'When facing an enemy in the 0m–7m zone with an M1887 or M1014, dragging straight up frequently results in missed shots that sail harmlessly over the helmet due to close-range auto-aim stickiness.',
          'The J-Curve drag starts slightly downward toward the enemy waistline to break the body aim-lock, then swoops in a fast backward-J curve up into the head hitbox.',
        ],
        bulletPoints: [
          'Step 1: Swipe thumb downward ~15px toward the right hip.',
          'Step 2: Without lifting thumb, hook sharply upward to the top-right corner.',
          'Step 3: Complete the entire arc within 70 milliseconds.',
        ],
        tacticalHighlight: 'CRITICAL: Set your fire button size between 40% and 44% to give your thumb ample runway for the downward-then-upward hook.',
      },
      {
        sectionHeading: '3. The Rotation Drag (Tracking Strafing Opponents)',
        paragraphs: [
          'When opponents jump or strafe horizontally across your screen, a vertical drag will fail because their head is constantly moving off your vertical axis.',
          'Rotation drag matches the circular vector of your opponent. If the enemy is jumping to the right, your fire button drag sweeps along the bottom curve and arcs upward to the right, locking onto their future helmet position.',
        ],
      },
    ],
  },
  {
    id: 'guide-refresh-rates',
    title: 'How Sensitivity (0–200 Scale) Interacts with Device Refresh Rates',
    category: 'Sens & Aim',
    readTimeMinutes: 5,
    badge: 'HARDWARE PHYSICS',
    summary: 'Why 120Hz displays need different sensitivity numbers than 60Hz screens, and how the Free Fire 0–200 scale translates.',
    content: [
      {
        sectionHeading: 'The Frame-Time Differential',
        paragraphs: [
          'At 60Hz, your screen refreshes every 16.6 milliseconds. At 120Hz, it refreshes every 8.3 milliseconds. This means a 120Hz or 144Hz screen receives touch input updates twice as frequently.',
          'Because 120Hz touch sampling registers your drag distance with double the fidelity, using a 60Hz sensitivity (such as 195) on a 120Hz phone causes the crosshair to violently overshoot the target.',
        ],
        bulletPoints: [
          '60Hz Phones: Require higher General Sensitivity (185–198) to overcome input lag and sluggish touch sampling.',
          '90Hz Phones: Best calibrated at 170–185 General Sensitivity.',
          '120Hz / 144Hz Flagships: Optimum performance sits at 150–165 General Sensitivity for tight recoil and zero over-drag.',
        ],
        tacticalHighlight: 'GOLDEN RULE: If your bullets are consistently passing above enemy heads without hitting, drop your General Sensitivity by 10 points.',
      },
    ],
  },
  {
    id: 'guide-android-dpi',
    title: 'Android Smallest Width (DPI) Explained & Safe Thresholds',
    category: 'Android',
    readTimeMinutes: 5,
    badge: 'SYSTEM TUNING',
    summary: 'The science of Android display scaling, how it enhances touch responsiveness, and how to avoid fatal black-screen boot loops.',
    content: [
      {
        sectionHeading: 'What Does Smallest Width (DPI) Actually Do?',
        paragraphs: [
          'In Android Developer Options, Smallest Width determines the density of pixels rendered per inch. Raising this value shrinks UI elements and increases the virtual pixel resolution.',
          'For Free Fire, increasing DPI makes small thumb motions cover greater in-game rotational angles, making drag headshots feel significantly lighter and faster.',
        ],
        bulletPoints: [
          'Stock DPI Range: Most modern Android phones come with stock DPI between 360 and 440.',
          'Safe Overclock Limit: Never exceed stock DPI by more than +150 to +180.',
          'Danger Zone (>720 DPI): Pushing DPI past 750 on MIUI, One UI, or Realme UI can crash the SystemUI launcher into an unrecoverable recovery-mode loop.',
        ],
        tacticalHighlight: 'SAFETY FIRST: Always record your stock DPI value on paper before modifying it in Developer Options.',
      },
    ],
  },
  {
    id: 'guide-android-os',
    title: 'Zero-Lag Android OS Optimization & Developer Options',
    category: 'Android',
    readTimeMinutes: 7,
    badge: 'OS OPTIMIZATION',
    summary: 'Step-by-step developer settings to eliminate background throttling, CPU thermal drops, and touch latency.',
    content: [
      {
        sectionHeading: 'Core Developer Settings for Esports',
        paragraphs: [
          'Out-of-the-box Android configurations prioritize battery saving over raw gaming performance. In competitive scrims, aggressive power management results in sudden frame drops during intense combat.',
        ],
        bulletPoints: [
          'Window Animation Scale: Set to 0.5x or OFF (reduces window transition lag).',
          'Transition Animation Scale: Set to 0.5x.',
          'Animator Duration Scale: Set to 0.5x.',
          'Force 4x MSAA: Keep DISABLED (it consumes heavy GPU fill-rate for minimal visual gain).',
          'Disable HW Overlays: Enable this to force GPU composition for screen rendering.',
          'Background Process Limit: Standard or At most 3 processes during matches.',
        ],
        tacticalHighlight: 'BATTERY ADVICE: Exclude Free Fire from Android Battery Optimization to prevent background CPU frequency scaling.',
      },
    ],
  },
  {
    id: 'guide-emulator-fps',
    title: 'MSI App Player & BlueStacks 5 240 FPS Optimization',
    category: 'PC Emulator',
    readTimeMinutes: 6,
    badge: 'PC DRIFT FIX',
    summary: 'Fixing the infamous emulator mouse acceleration bug, configuring 240 FPS unlock, and achieving raw 1:1 input.',
    content: [
      {
        sectionHeading: 'Eliminating Emulator Mouse Drift (The Bug)',
        paragraphs: [
          'In BlueStacks and MSI App Player, the virtual joystick can get stuck when mouse movements compound over time. This causes the mouse sensitivity to randomly spike or freeze mid-spray.',
          'To fix this, competitive players assign a dedicated "Suspend/Unsuspend" keybind (such as F1 or Mouse Side Button) and tap it every 4–5 seconds to reset the mouse cursor coordinates.',
        ],
        bulletPoints: [
          'Graphics Renderer: OpenGL (most stable) or Vulkan.',
          'Interface Renderer: Software or Auto.',
          'ASTC Textures: Hardware Decoding.',
          'High Frame Rate Toggle: Enabled (drag slider to 240 FPS).',
          'Tweaks Code: 16450 (Standard) or 21058 (One-Tap aggressive vertical response).',
        ],
        tacticalHighlight: 'MOUSE POLLING: Set your gaming mouse software (Logitech G Hub, Razer Synapse) to 1000Hz USB polling rate for zero jitter.',
      },
    ],
  },
  {
    id: 'guide-frame-drops',
    title: 'Fixing Frame Drops & Stutters in Tournament Lobbies',
    category: 'Competitive',
    readTimeMinutes: 5,
    badge: 'SCRIMS PREP',
    summary: 'How to maintain a locked 90/120 FPS when 48 players are alive in the 4th circle with smoke and gloo walls.',
    content: [
      {
        sectionHeading: 'Managing Thermal Throttling in Endgames',
        paragraphs: [
          'The final zones in competitive Free Fire esports place immense strain on your phone CPU because dozens of gloo walls, grenades, and character skills are active simultaneously.',
        ],
        bulletPoints: [
          'Graphics Preset: Use Smooth Graphics with High FPS enabled in in-game settings. Smooth graphics remove shadow textures that overload the GPU.',
          'Phone Case Removal: Remove thick protective silicone cases during tournaments to allow natural heat dissipation.',
          'Cooling Fans: Using an external Peltier clip-on cooler prevents your CPU from dropping clock speeds from 2.8GHz down to 1.4GHz.',
          'Clear Game Cache: Wipe Free Fire cache partition before entering tournament rooms.',
        ],
      },
    ],
  },
  {
    id: 'guide-crosshair-placement',
    title: 'Crosshair Placement & Peeking Angles',
    category: 'Sens & Aim',
    readTimeMinutes: 5,
    badge: 'AIM MASTERY',
    summary: 'Stop looking at the floor. Why horizontal and vertical crosshair alignment determines 80% of your headshot consistency.',
    content: [
      {
        sectionHeading: 'The 45-Degree Clavicle Rule',
        paragraphs: [
          'The biggest mistake amateur players make is running with their crosshair pointed at the dirt. When an enemy appears, they must move their crosshair twice: first up to the chest, then up to the head.',
          'Pro players maintain their crosshair at clavicle height at all times. When an opponent enters sight, their crosshair is already 90% aligned with the head hitbox, requiring only a tiny micro-flick.',
        ],
        bulletPoints: [
          'Right Shoulder Alignment: Free Fire characters hold weapons on their right shoulder. Peeking from the right side exposes 40% less of your body than peeking from the left.',
          'Slice The Pie: When clearing a house, clear corners incrementally rather than rushing straight through doorways.',
        ],
      },
    ],
  },
  {
    id: 'guide-practice-routine',
    title: 'Daily Practice Routines of Tier-1 Esports Athletes',
    category: 'Competitive',
    readTimeMinutes: 6,
    badge: 'PRO HABITS',
    summary: 'The exact 45-minute daily training regimen used by professional players before scrims and championships.',
    content: [
      {
        sectionHeading: 'The 45-Minute Warm-Up Regimen',
        paragraphs: [
          'Jumping directly into tournament matches without warming up your neurological reaction pathways results in stiff fingers and inconsistent drag timing.',
        ],
        bulletPoints: [
          'Phase 1 (10 Min): Aim Benchmark & Reflex Training — Play SENSI MAKER Target Clicker and Reflex Benchmark to wake up hand-eye coordination.',
          'Phase 2 (15 Min): Training Ground Target Range — Practice 100 Desert Eagle headshots and 50 Woodpecker cadence shots with movement cancels.',
          'Phase 3 (10 Min): Gloo Wall Zone — Practice fast 0.2s sit-down gloo wall drops and 360-degree shields.',
          'Phase 4 (10 Min): Combat Zone Free-For-All — Intense close-range skirmishes focusing on 1-tap shotgun jumps.',
        ],
        tacticalHighlight: 'CONSISTENCY: 30 minutes of intentional daily drill practice beats 6 hours of mindless casual ranked matches.',
      },
    ],
  },
];
