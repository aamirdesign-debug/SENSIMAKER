export interface PhoneModel {
  id: string;
  brand: string;
  name: string;
  factoryDpi: number;
  nativeHz: number;
  touchSamplingHz: number;
  defaultRam: number;
  defaultRom: number;
  screenSizeInches: number;
  processor: string;
}

export const PHONE_BRANDS = [
  'All Brands',
  'Apple',
  'Samsung',
  'Xiaomi / Poco',
  'Realme',
  'OnePlus',
  'Vivo / iQOO',
  'Oppo',
  'Infinix / Tecno',
  'ASUS ROG',
  'RedMagic',
] as const;

export const PHONE_MODELS: PhoneModel[] = [
  // Apple
  { id: 'ip-16pm', brand: 'Apple', name: 'iPhone 16 Pro Max', factoryDpi: 460, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.9, processor: 'A18 Pro' },
  { id: 'ip-16p', brand: 'Apple', name: 'iPhone 16 Pro', factoryDpi: 460, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.3, processor: 'A18 Pro' },
  { id: 'ip-15pm', brand: 'Apple', name: 'iPhone 15 Pro Max', factoryDpi: 460, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.7, processor: 'A17 Pro' },
  { id: 'ip-15p', brand: 'Apple', name: 'iPhone 15 Pro', factoryDpi: 460, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.1, processor: 'A17 Pro' },
  { id: 'ip-14pm', brand: 'Apple', name: 'iPhone 14 Pro Max', factoryDpi: 460, nativeHz: 120, touchSamplingHz: 240, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.7, processor: 'A16 Bionic' },
  { id: 'ip-13pm', brand: 'Apple', name: 'iPhone 13 Pro Max', factoryDpi: 458, nativeHz: 120, touchSamplingHz: 240, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.7, processor: 'A15 Bionic' },
  { id: 'ip-13', brand: 'Apple', name: 'iPhone 13', factoryDpi: 460, nativeHz: 60, touchSamplingHz: 120, defaultRam: 4, defaultRom: 128, screenSizeInches: 6.1, processor: 'A15 Bionic' },
  { id: 'ip-11', brand: 'Apple', name: 'iPhone 11', factoryDpi: 326, nativeHz: 60, touchSamplingHz: 120, defaultRam: 4, defaultRom: 64, screenSizeInches: 6.1, processor: 'A13 Bionic' },
  { id: 'ip-xr', brand: 'Apple', name: 'iPhone XR', factoryDpi: 326, nativeHz: 60, touchSamplingHz: 120, defaultRam: 3, defaultRom: 64, screenSizeInches: 6.1, processor: 'A12 Bionic' },

  // Samsung
  { id: 'sam-s24u', brand: 'Samsung', name: 'Galaxy S24 Ultra', factoryDpi: 505, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.8, processor: 'Snapdragon 8 Gen 3' },
  { id: 'sam-s23u', brand: 'Samsung', name: 'Galaxy S23 Ultra', factoryDpi: 500, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.8, processor: 'Snapdragon 8 Gen 2' },
  { id: 'sam-s22u', brand: 'Samsung', name: 'Galaxy S22 Ultra', factoryDpi: 500, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 128, screenSizeInches: 6.8, processor: 'Snapdragon 8 Gen 1' },
  { id: 'sam-s21fe', brand: 'Samsung', name: 'Galaxy S21 FE 5G', factoryDpi: 401, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.4, processor: 'Exynos 2100' },
  { id: 'sam-a54', brand: 'Samsung', name: 'Galaxy A54 5G', factoryDpi: 403, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.4, processor: 'Exynos 1380' },
  { id: 'sam-a52s', brand: 'Samsung', name: 'Galaxy A52s 5G', factoryDpi: 407, nativeHz: 120, touchSamplingHz: 240, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.5, processor: 'Snapdragon 778G' },
  { id: 'sam-a34', brand: 'Samsung', name: 'Galaxy A34 5G', factoryDpi: 390, nativeHz: 120, touchSamplingHz: 240, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.6, processor: 'Dimensity 1080' },
  { id: 'sam-a15', brand: 'Samsung', name: 'Galaxy A15 5G', factoryDpi: 396, nativeHz: 90, touchSamplingHz: 180, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.5, processor: 'Helio G99' },

  // Xiaomi / Poco
  { id: 'x-14u', brand: 'Xiaomi / Poco', name: 'Xiaomi 14 Ultra', factoryDpi: 522, nativeHz: 120, touchSamplingHz: 240, defaultRam: 16, defaultRom: 512, screenSizeInches: 6.73, processor: 'Snapdragon 8 Gen 3' },
  { id: 'poco-f6p', brand: 'Xiaomi / Poco', name: 'Poco F6 Pro', factoryDpi: 526, nativeHz: 120, touchSamplingHz: 480, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.67, processor: 'Snapdragon 8 Gen 2' },
  { id: 'poco-f6', brand: 'Xiaomi / Poco', name: 'Poco F6', factoryDpi: 446, nativeHz: 120, touchSamplingHz: 480, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.67, processor: 'Snapdragon 8s Gen 3' },
  { id: 'poco-f5', brand: 'Xiaomi / Poco', name: 'Poco F5 5G', factoryDpi: 395, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.67, processor: 'Snapdragon 7+ Gen 2' },
  { id: 'poco-x6p', brand: 'Xiaomi / Poco', name: 'Poco X6 Pro', factoryDpi: 446, nativeHz: 120, touchSamplingHz: 480, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.67, processor: 'Dimensity 8300 Ultra' },
  { id: 'poco-x5p', brand: 'Xiaomi / Poco', name: 'Poco X5 Pro 5G', factoryDpi: 395, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.67, processor: 'Snapdragon 778G' },
  { id: 'rn-13p', brand: 'Xiaomi / Poco', name: 'Redmi Note 13 Pro+ 5G', factoryDpi: 446, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.67, processor: 'Dimensity 7200 Ultra' },
  { id: 'rn-12p', brand: 'Xiaomi / Poco', name: 'Redmi Note 12 Pro 5G', factoryDpi: 395, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.67, processor: 'Dimensity 1080' },
  { id: 'rn-10p', brand: 'Xiaomi / Poco', name: 'Redmi Note 10 Pro', factoryDpi: 395, nativeHz: 120, touchSamplingHz: 240, defaultRam: 6, defaultRom: 128, screenSizeInches: 6.67, processor: 'Snapdragon 732G' },

  // Realme
  { id: 'rlm-gt6', brand: 'Realme', name: 'Realme GT 6', factoryDpi: 450, nativeHz: 120, touchSamplingHz: 360, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Snapdragon 8s Gen 3' },
  { id: 'rlm-gt5p', brand: 'Realme', name: 'Realme GT 5 Pro', factoryDpi: 450, nativeHz: 144, touchSamplingHz: 480, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 3' },
  { id: 'rlm-12pp', brand: 'Realme', name: 'Realme 12 Pro+ 5G', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.7, processor: 'Snapdragon 7s Gen 2' },
  { id: 'rlm-11p', brand: 'Realme', name: 'Realme 11 Pro 5G', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 360, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.7, processor: 'Dimensity 7050' },
  { id: 'rlm-narzo60', brand: 'Realme', name: 'Realme Narzo 60 Pro', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 360, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.7, processor: 'Dimensity 7050' },

  // OnePlus
  { id: 'op-12', brand: 'OnePlus', name: 'OnePlus 12', factoryDpi: 510, nativeHz: 120, touchSamplingHz: 240, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.82, processor: 'Snapdragon 8 Gen 3' },
  { id: 'op-12r', brand: 'OnePlus', name: 'OnePlus 12R', factoryDpi: 450, nativeHz: 120, touchSamplingHz: 360, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 2' },
  { id: 'op-11', brand: 'OnePlus', name: 'OnePlus 11 5G', factoryDpi: 525, nativeHz: 120, touchSamplingHz: 240, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.7, processor: 'Snapdragon 8 Gen 2' },
  { id: 'op-nord3', brand: 'OnePlus', name: 'OnePlus Nord 3 5G', factoryDpi: 450, nativeHz: 120, touchSamplingHz: 450, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.74, processor: 'Dimensity 9000' },
  { id: 'op-nordce4', brand: 'OnePlus', name: 'OnePlus Nord CE 4', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 240, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.7, processor: 'Snapdragon 7 Gen 3' },

  // Vivo / iQOO
  { id: 'iqoo-12', brand: 'Vivo / iQOO', name: 'iQOO 12 5G', factoryDpi: 452, nativeHz: 144, touchSamplingHz: 300, defaultRam: 16, defaultRom: 512, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 3' },
  { id: 'iqoo-neo9p', brand: 'Vivo / iQOO', name: 'iQOO Neo 9 Pro', factoryDpi: 452, nativeHz: 144, touchSamplingHz: 300, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 2' },
  { id: 'iqoo-z9t', brand: 'Vivo / iQOO', name: 'iQOO Z9 Turbo', factoryDpi: 453, nativeHz: 144, touchSamplingHz: 300, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Snapdragon 8s Gen 3' },
  { id: 'iqoo-z7p', brand: 'Vivo / iQOO', name: 'iQOO Z7 Pro 5G', factoryDpi: 388, nativeHz: 120, touchSamplingHz: 300, defaultRam: 8, defaultRom: 128, screenSizeInches: 6.78, processor: 'Dimensity 7200' },
  { id: 'vivo-v30p', brand: 'Vivo / iQOO', name: 'Vivo V30 Pro', factoryDpi: 453, nativeHz: 120, touchSamplingHz: 300, defaultRam: 12, defaultRom: 512, screenSizeInches: 6.78, processor: 'Dimensity 8200' },

  // Oppo
  { id: 'oppo-fx7u', brand: 'Oppo', name: 'Oppo Find X7 Ultra', factoryDpi: 510, nativeHz: 120, touchSamplingHz: 240, defaultRam: 16, defaultRom: 256, screenSizeInches: 6.82, processor: 'Snapdragon 8 Gen 3' },
  { id: 'oppo-reno11p', brand: 'Oppo', name: 'Oppo Reno 11 Pro 5G', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.7, processor: 'Dimensity 8200' },
  { id: 'oppo-reno10p', brand: 'Oppo', name: 'Oppo Reno 10 Pro 5G', factoryDpi: 394, nativeHz: 120, touchSamplingHz: 240, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.7, processor: 'Snapdragon 778G' },

  // Infinix / Tecno
  { id: 'inf-gt20p', brand: 'Infinix / Tecno', name: 'Infinix GT 20 Pro', factoryDpi: 393, nativeHz: 144, touchSamplingHz: 360, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Dimensity 8200 Ultimate' },
  { id: 'inf-gt10p', brand: 'Infinix / Tecno', name: 'Infinix GT 10 Pro', factoryDpi: 395, nativeHz: 120, touchSamplingHz: 360, defaultRam: 8, defaultRom: 256, screenSizeInches: 6.67, processor: 'Dimensity 8050' },
  { id: 'tec-camon30p', brand: 'Infinix / Tecno', name: 'Tecno Camon 30 Premier', factoryDpi: 451, nativeHz: 120, touchSamplingHz: 360, defaultRam: 12, defaultRom: 512, screenSizeInches: 6.77, processor: 'Dimensity 8200 Ultimate' },
  { id: 'tec-pova6p', brand: 'Infinix / Tecno', name: 'Tecno Pova 6 Pro 5G', factoryDpi: 393, nativeHz: 120, touchSamplingHz: 360, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Dimensity 6080' },

  // ASUS ROG
  { id: 'rog-8p', brand: 'ASUS ROG', name: 'ASUS ROG Phone 8 Pro', factoryDpi: 388, nativeHz: 165, touchSamplingHz: 720, defaultRam: 16, defaultRom: 512, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 3' },
  { id: 'rog-7u', brand: 'ASUS ROG', name: 'ASUS ROG Phone 7 Ultimate', factoryDpi: 395, nativeHz: 165, touchSamplingHz: 720, defaultRam: 16, defaultRom: 512, screenSizeInches: 6.78, processor: 'Snapdragon 8 Gen 2' },
  { id: 'rog-6d', brand: 'ASUS ROG', name: 'ASUS ROG Phone 6D', factoryDpi: 395, nativeHz: 165, touchSamplingHz: 720, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.78, processor: 'Dimensity 9000+' },

  // RedMagic
  { id: 'rm-9p', brand: 'RedMagic', name: 'RedMagic 9 Pro', factoryDpi: 400, nativeHz: 120, touchSamplingHz: 960, defaultRam: 16, defaultRom: 512, screenSizeInches: 6.8, processor: 'Snapdragon 8 Gen 3' },
  { id: 'rm-8sp', brand: 'RedMagic', name: 'RedMagic 8S Pro', factoryDpi: 400, nativeHz: 120, touchSamplingHz: 960, defaultRam: 12, defaultRom: 256, screenSizeInches: 6.8, processor: 'Snapdragon 8+ Gen 2' },
];

export type GameplayStyle = 'One Tap' | 'Esports' | 'Mixed';
export type WeaponPreset = 'Balanced' | 'Deagle' | 'Shotgun' | 'Marksman' | 'SMG';

export interface MobileCalculationResult {
  // Free Fire Sensitivities (Strict 0–200 scale)
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;

  // Safe Android DPI
  stockDpi: number;
  recommendedDpi: number;
  maxSafeDpi: number;
  dpiRiskLevel: 'SAFE' | 'MODERATE' | 'DANGEROUS';

  // Fire Button Specs
  fireButtonSize: number; // 40% to 55%
  buttonPositionX: number; // screen coordinate %
  buttonPositionY: number; // screen coordinate %

  // Graphics & FPS
  graphicPreset: 'Smooth' | 'Standard' | 'Ultra' | 'Max';
  highFpsEnabled: boolean;
  resolutionMultiplier: string;
}

export function computeMobileSensitivity(
  model: PhoneModel,
  selectedRam: number,
  selectedRom: number,
  currentDpi: number,
  gameplayStyle: GameplayStyle,
  selectedHz: number,
  weaponPreset: WeaponPreset
): MobileCalculationResult {
  // Base values calibrated for the new Free Fire 0-200 sensitivity scale
  // Higher refresh rates (120Hz/144Hz) require slightly tighter general sensitivity (~140-165)
  // Low refresh rates (60Hz) need higher sensitivity (~185-198) for fast flick responsiveness.
  let baseGeneral = 175;
  if (selectedHz >= 144) {
    baseGeneral = 152;
  } else if (selectedHz >= 120) {
    baseGeneral = 164;
  } else if (selectedHz >= 90) {
    baseGeneral = 178;
  } else {
    // 60Hz
    baseGeneral = 192;
  }

  // RAM bonus/adjustment (Higher RAM allows faster response without dropped frames)
  if (selectedRam <= 4) {
    baseGeneral += 6; // slightly higher drag multiplier to compensate for frame latencies
  } else if (selectedRam >= 12) {
    baseGeneral -= 4; // silky smooth 120fps allows crisp tight flicks
  }

  // Gameplay style adjustments
  let styleOffsetGeneral = 0;
  let styleOffsetRedDot = 0;
  let styleOffsetSniper = 0;
  let styleOffsetScopes = 0;

  if (gameplayStyle === 'One Tap') {
    // One Tap demands snappier initial drag velocity
    styleOffsetGeneral = +8;
    styleOffsetRedDot = +12;
    styleOffsetSniper = -10; // Sniper stays pinpoint
    styleOffsetScopes = +4;
  } else if (gameplayStyle === 'Esports') {
    // Esports tournament players require recoil stability and tight spray control
    styleOffsetGeneral = -6;
    styleOffsetRedDot = -4;
    styleOffsetSniper = -8;
    styleOffsetScopes = -2;
  } else {
    // Mixed
    styleOffsetGeneral = 0;
    styleOffsetRedDot = 0;
    styleOffsetSniper = 0;
    styleOffsetScopes = 0;
  }

  // Weapon fine-tuning adjustments
  let weaponGenOffset = 0;
  let weaponRedDotOffset = 0;
  let weaponScopeOffset = 0;
  let buttonSize = 48; // default 48%

  switch (weaponPreset) {
    case 'Deagle': // Desert Eagle high 1st shot drag
      weaponGenOffset = +7;
      weaponRedDotOffset = +10;
      weaponScopeOffset = 0;
      buttonSize = 43; // smaller button = longer flick runway
      break;
    case 'Shotgun': // M1887 / M1014 explosive vertical drag
      weaponGenOffset = +10;
      weaponRedDotOffset = +12;
      weaponScopeOffset = -4;
      buttonSize = 42; // optimal for explosive thumb flick
      break;
    case 'Marksman': // Woodpecker / SVD rhythm headshots
      weaponGenOffset = +3;
      weaponRedDotOffset = +6;
      weaponScopeOffset = +8;
      buttonSize = 46;
      break;
    case 'SMG': // UMP / MP40 recoil stabilization
      weaponGenOffset = -4;
      weaponRedDotOffset = -6;
      weaponScopeOffset = -4;
      buttonSize = 52; // slightly larger for continuous spray stability
      break;
    default: // Balanced
      weaponGenOffset = 0;
      weaponRedDotOffset = 0;
      weaponScopeOffset = 0;
      buttonSize = 47;
      break;
  }

  // Clamp helper for 0-200 scale
  const clamp200 = (val: number) => Math.min(200, Math.max(0, Math.round(val)));

  const general = clamp200(baseGeneral + styleOffsetGeneral + weaponGenOffset);
  const redDot = clamp200(general - 8 + styleOffsetRedDot + weaponRedDotOffset);
  const scope2x = clamp200(general - 18 + styleOffsetScopes + weaponScopeOffset);
  const scope4x = clamp200(general - 26 + styleOffsetScopes + weaponScopeOffset);
  const sniperScope = clamp200(95 + styleOffsetSniper);
  const freeLook = clamp200(135 + (selectedHz >= 120 ? -10 : 15));

  // DPI calculation: Android smallest width safe limit
  // Safe limit is max +150-200 over stock to avoid black-screen soft bricking
  const stockDpi = model.factoryDpi;
  const isApple = model.brand === 'Apple';
  
  // Safe DPI formula: stock + 100 to 140
  const recommendedDpi = isApple ? stockDpi : Math.min(stockDpi + 120, 600);
  const maxSafeDpi = isApple ? stockDpi : Math.min(stockDpi + 180, 720);

  let dpiRiskLevel: 'SAFE' | 'MODERATE' | 'DANGEROUS' = 'SAFE';
  if (currentDpi > maxSafeDpi + 40) {
    dpiRiskLevel = 'DANGEROUS';
  } else if (currentDpi > maxSafeDpi) {
    dpiRiskLevel = 'MODERATE';
  } else {
    dpiRiskLevel = 'SAFE';
  }

  // Fire button position
  const buttonPositionX = 78; // 78% from left
  const buttonPositionY = 22; // 22% from bottom

  // Graphics preset
  let graphicPreset: 'Smooth' | 'Standard' | 'Ultra' | 'Max' = 'Smooth';
  if (selectedRam >= 12 && model.nativeHz >= 120) {
    graphicPreset = 'Ultra';
  } else if (selectedRam >= 8) {
    graphicPreset = 'Standard';
  } else {
    graphicPreset = 'Smooth';
  }

  return {
    general,
    redDot,
    scope2x,
    scope4x,
    sniperScope,
    freeLook,
    stockDpi,
    recommendedDpi,
    maxSafeDpi,
    dpiRiskLevel,
    fireButtonSize: buttonSize,
    buttonPositionX,
    buttonPositionY,
    graphicPreset,
    highFpsEnabled: true,
    resolutionMultiplier: 'High / Vivid',
  };
}

// PC / Emulator Settings
export interface PcCalculationResult {
  emulator: string;
  safeRamAllocation: string;
  safeCpuCores: number;
  recommendedFps: number;
  emulatorXSensitivity: number; // Horizontal 360 turn
  emulatorYSensitivity: number; // Vertical Headshot Drag
  keymappingTweaksCode: string;
  graphicsEngineMode: 'OpenGL' | 'DirectX' | 'Vulkan';
  mouseDpiNotes: string;
}

export function computePcEmulatorSettings(
  emulator: string,
  totalRamGb: number,
  cpuCores: number,
  mouseDpi: number,
  resolution: string,
  style: GameplayStyle
): PcCalculationResult {
  // Safe RAM allocation: max half or up to 6GB-8GB
  const allocRam = totalRamGb >= 16 ? '6 GB - 8 GB' : totalRamGb >= 8 ? '4 GB' : '2 GB';
  // Safe CPU cores: never exceed total cores, recommend half or max 4 cores
  const allocCores = Math.max(2, Math.min(cpuCores - 2, 4));

  // FPS unlock
  const recommendedFps = totalRamGb >= 16 ? 240 : 120;

  // Base X and Y sensitivity calculated for mouse DPI
  // Standard mouse DPI is 800 to 1600.
  // Lower DPI (800) needs higher X/Y (~1.6 / 0.85); High DPI (1600) needs lower X/Y (~0.85 / 0.45).
  let baseX = 1.25 * (1000 / mouseDpi);
  let baseY = 0.65 * (1000 / mouseDpi);

  if (style === 'One Tap') {
    baseY *= 1.22; // snappy vertical snap
    baseX *= 0.95;
  } else if (style === 'Esports') {
    baseY *= 0.92; // smooth spray recoil control
    baseX *= 1.05;
  }

  // Emulator tweaks code
  let tweaksCode = '16450';
  if (emulator.includes('MSI') || emulator.includes('BlueStacks')) {
    tweaksCode = style === 'One Tap' ? '21058' : '16450';
  } else if (emulator.includes('LDPlayer')) {
    tweaksCode = '30002';
  } else {
    tweaksCode = '16458';
  }

  return {
    emulator,
    safeRamAllocation: allocRam,
    safeCpuCores: allocCores,
    recommendedFps,
    emulatorXSensitivity: Number(baseX.toFixed(2)),
    emulatorYSensitivity: Number(baseY.toFixed(2)),
    keymappingTweaksCode: tweaksCode,
    graphicsEngineMode: 'OpenGL',
    mouseDpiNotes: `${mouseDpi} DPI with 1000Hz USB Polling Rate`,
  };
}
