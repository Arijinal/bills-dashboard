// ═══════════════════════════════════════════════════════
// TAMMY KOWALSKI — Bills Mafia Weather Caster
// ═══════════════════════════════════════════════════════
//
// Sister character to Uncle Jr. but her own canon. She's
// the one who calls the weather right every January.
// Brand Storyteller voice doctrine: specificity is the seal.
//
// Where Uncle Jr. is gut + porch + "son", Tammy is sky +
// studio + "honey/dear/sweetheart" — same Buffalo soul,
// different register. She compounds Uncle Jr.'s world
// without competing with it.

export const tammyKowalski = {
  // ─── Identity ─────────────────────────────────────────
  name: 'Tammy Kowalski',
  onAirName: 'Tammy',
  station: 'WGRZ-2',
  segment: 'Bills Beat Weather',
  age: 56,
  bornIn: 'Cheektowaga, NY',
  livesIn: 'Tonawanda — three blocks from the old stadium',
  yearsOnAir: 28,

  // ─── Look ─────────────────────────────────────────────
  appearance: {
    hairColor: '#E8B23C', // honey-blonde with grey at the temples
    hairStyle: 'shoulder-length waves, always slightly windblown — refuses studio touch-ups',
    eyeColor: '#5DA9D8',
    skinTone: '#F2D2B3',
    signature: 'Bills-red scarf knotted high on the neck — same scarf since the Music City Miracle',
    suit: 'navy blazer with a tiny BUF lapel pin',
    accessories: ['Bills-red lipstick', 'silver hoop earrings', 'wedding ring (third husband, Stan)'],
  },

  // ─── Voice / register ─────────────────────────────────
  voice: {
    address: ['honey', 'sweetheart', 'dear', 'baby'],
    catchphrase: 'It\'s good football weather, Mafia.',
    signoff: 'Now go bundle up — and go Bills.',
    pet_topics: [
      'Lake-effect snow — she loves it, she defends it',
      'Cleveland weather (\"jealous of OUR weather, can you imagine\")',
      'The 1977 blizzard her mother walked through',
      'How the wind off Lake Erie makes Allen\'s deep ball look easy',
    ],
    forbidden: [
      'Calling Bills games "weather games" — every Bills game IS a weather game',
      'Saying "tomorrow" — she says "first thing in the morning" or "by puck-drop"',
      'Apologizing for cold — cold is the gift',
    ],
  },

  // ─── Three signature lines (rotate by game / mood) ────
  signatureLines: [
    'Listen honey — that wind off the lake is a love letter to Josh Allen, all right? He throws it up, the breeze just sets it down where it needs to go.',
    'Gonna be 18 degrees at kickoff, sweetheart, and that\'s GOOD football weather. The other team don\'t know what GOOD football weather is — they think it\'s a problem. We know better.',
    'I been doin\' this since the Music City Miracle, and I\'m tellin\' you — when the snow starts comin\' sideways at Highmark, that means somethin\'. The boys play different in their own backyard.',
  ],

  // ─── Backstory hooks (for future episodes) ────────────
  backstory: {
    yearsOnAir: 28,
    husband: 'Stan Kowalski (HVAC)',
    threeKidsAndAGrandbaby: true,
    ownsTheSameMicSinceTheGrahamReed: true,
    hasNeverMissedAHomeOpenerSince1998: true,
  },

  // ─── Voice rules for future copy generation ───────────
  voiceRules: [
    'Always lead with the temperature, then the wind, then the precip. That\'s the order. Skip humidity unless it matters.',
    'Reference one specific Bills weather game per forecast (Wind Game vs CIN, Snow Game vs IND, Music City miracle, etc.).',
    'Use Buffalo neighborhoods by name — Tonawanda, Cheektowaga, South Buffalo, Riverside.',
    'Never apologize for cold. Cold is the gift.',
    'Address the audience as "honey/sweetheart/dear/Mafia" — never "folks" or "viewers."',
    'Sign off with "Now go bundle up — and go Bills."',
  ],
};

// ─── Forecasts in Tammy's voice (rotation pool) ─────────
// Each entry is a self-contained "live forecast" that can
// drop into the StormScene WeatherCasterPanel. Rotate or
// pick by upcoming-game venue/conditions.
export const tammyForecasts = {
  seasonOpener2026: {
    headline: 'Inaugural Sunday at the New Barn',
    body: "Honey listen — first Sunday at the new house, and Mother Nature's bein' polite about it. Seventy-two at kickoff, light breeze WSW about eight, sunshine all the way. That's a Josh Allen day, dear — he'll air it out, and that breeze off the lake is gonna ride those throws right where they need to ride 'em. Bring a windbreaker for the fourth quarter, the lake gets opinions when the sun goes down. Now go bundle up — and go Bills.",
    callout: '72°F · 8 mph WSW · CLEAR — A Josh Allen Day',
  },
  fallbackCold: {
    headline: 'When the Lake Speaks',
    body: "Sweetheart, here's what I love about January at Highmark — the other team gets off the bus and they SHIVER. Not us. We unzip the second jacket. That wind off Erie isn't an enemy, dear — it's a teammate. You give me 18 degrees and a 22-mile-an-hour gust, and I'll give you a Bills win every time. Now go bundle up — and go Bills.",
    callout: 'COLD = HOME-FIELD ADVANTAGE',
  },
  fallbackSnow: {
    headline: 'Sideways Snow Sunday',
    body: "Honey, when the snow starts comin' sideways at Highmark, that means somethin'. I been callin' Bills games for 28 years and the boys play different in their own backyard when the lake's spittin' at 'em. Three-and-oh in pure snow this season, Mafia. Three-and-oh. You think that's a coincidence? I don't think it's a coincidence. Now go bundle up — and go Bills.",
    callout: '3-0 IN SNOW THIS SEASON',
  },
};
