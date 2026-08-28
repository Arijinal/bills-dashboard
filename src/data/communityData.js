// ═══════════════════════════════════════════════════════
// COMMUNITY & FAN FEATURES — Polls, Predictions, Mafia
// ═══════════════════════════════════════════════════════

// ── User Predictions ────────────────────────────────────
// Populated at runtime by user input + localStorage

export const predictions = {
  nextGame: null,
  season: {
    wins: null,
    losses: null,
    playoffRound: null,
    mvp: null,
  },
  history: [],
};

// ── Fan Polls ───────────────────────────────────────────

export const polls = [
  {
    id: 1,
    question: 'Greatest Buffalo Bill of all time?',
    options: [
      { label: 'Jim Kelly', votes: 3847 },
      { label: 'Bruce Smith', votes: 4102 },
      { label: 'Josh Allen', votes: 5231 },
      { label: 'Thurman Thomas', votes: 2156 },
    ],
    totalVotes: 15336,
    active: true,
    createdAt: '2026-02-01',
  },
  {
    id: 2,
    question: 'Was firing Sean McDermott the right call?',
    options: [
      { label: 'Yes - overdue', votes: 8412 },
      { label: 'Yes - but tough', votes: 4823 },
      { label: 'No - bad timing', votes: 2104 },
      { label: 'No - he deserved more time', votes: 1561 },
    ],
    totalVotes: 16900,
    active: true,
    createdAt: '2026-01-20',
  },
  {
    id: 3,
    question: 'What is the Bills\' biggest need in the 2026 draft?',
    options: [
      { label: 'WR1 (deep threat)', votes: 6218 },
      { label: 'EDGE (3-4 OLB)', votes: 4892 },
      { label: 'LB (Milano replacement)', votes: 2341 },
      { label: 'Safety', votes: 1654 },
      { label: 'Interior OL', votes: 1195 },
    ],
    totalVotes: 16300,
    active: true,
    createdAt: '2026-02-15',
  },
  {
    id: 4,
    question: 'Joe Brady will be a _____ head coach.',
    options: [
      { label: 'Great (10+ wins Year 1)', votes: 3845 },
      { label: 'Good (8-9 wins)', votes: 5612 },
      { label: 'Average (6-7 wins)', votes: 2478 },
      { label: 'Below average (5 or fewer)', votes: 1065 },
    ],
    totalVotes: 13000,
    active: true,
    createdAt: '2026-02-01',
  },
  {
    id: 5,
    question: 'Most memorable Bills moment of the 2025 season?',
    options: [
      { label: 'James Cook rushing title game (Week 17)', votes: 4215 },
      { label: 'Josh Allen 6-TD game vs. JAX (Week 3)', votes: 3892 },
      { label: 'Beating the Chiefs at home (Week 11)', votes: 5104 },
      { label: 'Snow game blowout vs. NE (Week 13)', votes: 2688 },
      { label: 'Divisional round heartbreak in Denver', votes: 1301 },
    ],
    totalVotes: 17200,
    active: false,
    createdAt: '2026-01-25',
  },
];

// ── Bills Mafia Content ─────────────────────────────────

export const mafiaContent = {
  charityTotal: '$8.2M+',
  charityDescription: 'Donated to various charities by Bills Mafia since 2017, including over $1M to P.J. Walker\'s charity and Damar Hamlin\'s Chasing M\'s Foundation.',

  traditions: [
    {
      name: 'Circle the Wagons',
      description: 'The iconic Bills rally cry, shouted before every game and after every victory. Originates from the frontier heritage of Western New York.',
      emoji: null,
    },
    {
      name: 'Table Smashing',
      description: 'Bills Mafia is famous (or infamous) for leaping through folding tables in the Highmark Stadium parking lots. The tradition has gone viral countless times and is now an indelible part of NFL tailgate culture.',
      emoji: null,
    },
    {
      name: 'Shout Song',
      description: 'After every Bills touchdown, the stadium erupts with the Isley Brothers\' "Shout" — complete with the iconic "a little bit louder now" crescendo. The tradition dates back to the 1980s.',
      emoji: null,
    },
    {
      name: 'Mafia Charity Donations',
      description: 'After Andy Dalton\'s Bengals helped the Bills clinch their first playoff berth in 17 years (2017), Bills fans donated over $450,000 to Dalton\'s charity. The tradition of donating to opposing players\' charities has continued.',
      emoji: null,
    },
    {
      name: 'Snow Games',
      description: 'Buffalo\'s legendary lake-effect snow storms have produced some of the most iconic NFL games in history. Bills Mafia embraces the cold — "Buffalo is not for the weak" is a point of pride.',
      emoji: null,
    },
    {
      name: 'Josh Allen Shorts',
      description: 'Josh Allen has been spotted wearing shorts in below-freezing temperatures on multiple occasions, earning him legendary status among Bills fans who share the same cold-weather toughness mentality.',
      emoji: null,
    },
    {
      name: 'Labatt Blue Zone',
      description: 'The official tailgate area featuring local Labatt Blue beer, live music, and the infamous Bills Mafia energy. Opens 4 hours before kickoff and is standing-room only by noon.',
      emoji: null,
    },
  ],

  charityHistory: [
    { year: 2017, amount: '$450,000+', recipient: 'Andy Dalton Foundation', trigger: 'Bengals helped Bills make playoffs' },
    { year: 2020, amount: '$1,100,000+', recipient: 'Oishei Children\'s Hospital', trigger: 'Josh Allen\'s grandmother passed away' },
    { year: 2023, amount: '$3,200,000+', recipient: 'Chasing M\'s Foundation (Damar Hamlin)', trigger: 'Hamlin cardiac arrest recovery' },
    { year: 2024, amount: '$280,000+', recipient: 'Blessings in a Backpack Buffalo', trigger: 'Bills Wild Card win' },
    { year: 2025, amount: '$180,000+', recipient: 'Denver Children\'s Hospital', trigger: 'After divisional round loss to Broncos' },
  ],

  fanStats: {
    averageAttendance: 71210,
    selloutStreak: 48,
    seasonTicketWaitlist: 42000,
    billsMafiaHashtagMentions: '52.1K',
    subredditMembers: 248000,
    facebookFollowers: '2.4M',
  },
};

// ── Gameday Experience ──────────────────────────────────

export const gamedayInfo = {
  newStadium: {
    name: 'New Highmark Stadium',
    capacity: 62000,
    openingDate: 'First regular-season game: Thu Sept 17, 2026 vs Detroit (TNF)',
    cost: '$1.4B',
    features: [
      'Fully enclosed with partial roof coverage',
      '16,000 club seats',
      '60 luxury suites',
      'State-of-the-art video board (120ft x 50ft)',
      'Heated seating in lower bowl',
      'Integrated tailgate plazas',
      'Year-round event capability',
      'Enhanced Wi-Fi and mobile connectivity',
    ],
    inauguralGame: '2026-09-13',
  },
  tailgating: {
    lotsOpen: '4 hours before kickoff',
    bestLots: ['Hammer Lot', 'Abbott Road', 'Orchard Park Municipal Lot'],
    signature: 'Table smashing, wing eating contests, Labatt Blue',
    rules: 'No kegs, grills must be propane, tables are technically discouraged (but good luck enforcing that)',
  },
};
