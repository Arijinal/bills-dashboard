// ═══════════════════════════════════════════════════════
// BUFFALO BILLS 2025-2026 SEASON — Current Data
// Updated: February 25, 2026
// ═══════════════════════════════════════════════════════

export const teamInfo = {
  name: 'Buffalo Bills',
  record: '12-5',
  wins: 12,
  losses: 5,
  divisionRecord: '4-2',
  conferenceRecord: '8-4',
  pointsFor: 481,
  pointsAgainst: 365,
  playoff: 'Lost Divisional Round (OT)',
  headCoach: 'Joe Brady',
  formerCoach: 'Sean McDermott (fired Jan 19, 2026)',
  stadium: 'Highmark Stadium',
  newStadium: 'New Highmark Stadium opening Summer 2026',
  nextGame: {
    opponent: '2026 Season Opener — New Highmark Stadium',
    date: '2026-09-13',
    location: 'New Highmark Stadium (Inaugural Season)'
  }
};

export const lastGame = {
  opponent: 'Denver Broncos',
  result: 'L',
  score: { bills: 30, opponent: 33 },
  date: 'Jan 17, 2026',
  venue: 'Empower Field at Mile High',
  type: 'AFC Divisional Round (OT)',
  quarterScores: {
    bills: [10, 7, 3, 10, 0],
    opponent: [3, 10, 7, 10, 3]
  },
  stats: {
    totalYards: { bills: 385, opponent: 398 },
    passingYards: { bills: 287, opponent: 268 },
    rushingYards: { bills: 98, opponent: 130 },
    turnovers: { bills: 5, opponent: 1 },
    timeOfPossession: { bills: '28:15', opponent: '36:45' },
    thirdDown: { bills: '5/14', opponent: '8/16' },
    sacks: { bills: 2, opponent: 4 },
    penalties: { bills: 8, opponent: 5 },
    firstDowns: { bills: 21, opponent: 23 }
  }
};

export const joshAllen = {
  name: 'Josh Allen',
  number: 17,
  position: 'QB',
  age: 29,
  season: {
    gamesPlayed: 17,
    completions: 319,
    attempts: 460,
    compPct: 69.3,
    passingYards: 3668,
    passingTDs: 25,
    interceptions: 10,
    rating: 102.2,
    qbr: 70.1,
    epaPlay: 0.18,
    cpoe: 2.8,
    pressureRate: 32.1,
    deepBallAcc: 44.8,
    rushAttempts: 112,
    rushYards: 579,
    rushTDs: 14,
    sacksTaken: 40,
    yardsPerAttempt: 8.0,
    adjNetYPA: 7.1
  },
  weeklyRating: [
    { week: 1, rating: 112.4, opponent: 'ARI' },
    { week: 2, rating: 95.2, opponent: '@MIA' },
    { week: 3, rating: 121.8, opponent: 'JAX' },
    { week: 4, rating: 78.3, opponent: '@NE' },
    { week: 5, rating: 108.7, opponent: 'HOU' },
    { week: 6, rating: 86.1, opponent: '@NYJ' },
    { week: 7, rating: 115.3, opponent: 'TEN' },
    { week: 8, rating: 91.5, opponent: '@SEA' },
    { week: 9, rating: 124.6, opponent: 'MIA' },
    { week: 10, rating: 72.4, opponent: '@IND' },
    { week: 11, rating: 108.2, opponent: 'KC' },
    { week: 12, rating: 96.8, opponent: '@SF' },
    { week: 13, rating: 118.1, opponent: 'NE' },
    { week: 14, rating: 82.3, opponent: '@LAR' },
    { week: 15, rating: 105.7, opponent: 'DET' },
    { week: 16, rating: 110.4, opponent: '@NYJ' },
    { week: 17, rating: 98.6, opponent: 'ATL' }
  ],
  passChart: [
    { x: -15, y: 5, result: 'complete', yards: 12 },
    { x: -8, y: 18, result: 'complete', yards: 22 },
    { x: 3, y: 2, result: 'complete', yards: 5 },
    { x: 10, y: 25, result: 'incomplete', yards: 0 },
    { x: -5, y: 10, result: 'td', yards: 15 },
    { x: 0, y: 35, result: 'complete', yards: 38 },
    { x: 12, y: 8, result: 'complete', yards: 11 },
    { x: -20, y: 15, result: 'interception', yards: 0 },
    { x: 7, y: 22, result: 'td', yards: 28 },
    { x: -3, y: 5, result: 'complete', yards: 7 },
    { x: 15, y: 30, result: 'incomplete', yards: 0 },
    { x: -10, y: 12, result: 'complete', yards: 16 },
    { x: 0, y: 8, result: 'td', yards: 12 },
    { x: 8, y: 40, result: 'interception', yards: 0 },
    { x: -12, y: 20, result: 'complete', yards: 24 },
    { x: 5, y: 3, result: 'complete', yards: 4 },
    { x: -7, y: 28, result: 'td', yards: 33 },
    { x: 18, y: 12, result: 'incomplete', yards: 0 },
    { x: -2, y: 45, result: 'complete', yards: 52 },
    { x: 0, y: 15, result: 'complete', yards: 18 }
  ],
  radarComparison: {
    allen: { accuracy: 84, armStrength: 95, mobility: 93, decisionMaking: 78, clutch: 86, deepBall: 83 },
    mahomes: { accuracy: 85, armStrength: 92, mobility: 86, decisionMaking: 91, clutch: 93, deepBall: 87 },
    lamar: { accuracy: 74, armStrength: 83, mobility: 98, decisionMaking: 80, clutch: 82, deepBall: 72 },
    maye: { accuracy: 80, armStrength: 88, mobility: 85, decisionMaking: 82, clutch: 78, deepBall: 80 }
  }
};

export const teamStats = {
  offense: {
    rank: 4,
    ppg: 28.3,
    ypg: 376.3,
    passingYPG: 215.8,
    rushingYPG: 160.5,
    thirdDownPct: 42.8,
    redZonePct: 60.4,
    turnoversLost: 18
  },
  defense: {
    rank: 7,
    ppg: 21.5,
    ypg: 293.1,
    passingYPG: 156.9,
    rushingYPG: 136.2,
    thirdDownPct: 36.8,
    redZonePct: 51.2,
    takeaways: 30
  },
  weeklyPoints: [
    { week: 1, scored: 31, allowed: 17 },
    { week: 2, scored: 24, allowed: 27 },
    { week: 3, scored: 38, allowed: 14 },
    { week: 4, scored: 20, allowed: 28 },
    { week: 5, scored: 34, allowed: 21 },
    { week: 6, scored: 17, allowed: 24 },
    { week: 7, scored: 35, allowed: 13 },
    { week: 8, scored: 27, allowed: 24 },
    { week: 9, scored: 41, allowed: 20 },
    { week: 10, scored: 21, allowed: 30 },
    { week: 11, scored: 28, allowed: 24 },
    { week: 12, scored: 23, allowed: 20 },
    { week: 13, scored: 33, allowed: 10 },
    { week: 14, scored: 24, allowed: 31 },
    { week: 15, scored: 30, allowed: 17 },
    { week: 16, scored: 27, allowed: 21 },
    { week: 17, scored: 28, allowed: 24 }
  ]
};

export const afcEast = {
  standings: [
    { team: 'New England Patriots', w: 14, l: 3, t: 0, pct: '.824', pf: 512, pa: 278, diff: '+234', streak: 'W8', logo: 'NE' },
    { team: 'Buffalo Bills', w: 12, l: 5, t: 0, pct: '.706', pf: 481, pa: 365, diff: '+116', streak: 'W2', logo: 'BUF' },
    { team: 'Miami Dolphins', w: 7, l: 10, t: 0, pct: '.412', pf: 310, pa: 368, diff: '-58', streak: 'L3', logo: 'MIA' },
    { team: 'New York Jets', w: 3, l: 14, t: 0, pct: '.176', pf: 218, pa: 425, diff: '-207', streak: 'L8', logo: 'NYJ' }
  ],
  headToHead: [
    { opponent: 'Miami Dolphins', wins: 2, losses: 0, billsPF: 65, billsPA: 41, logo: 'MIA' },
    { opponent: 'New York Jets', wins: 2, losses: 0, billsPF: 55, billsPA: 30, logo: 'NYJ' },
    { opponent: 'New England Patriots', wins: 0, losses: 2, billsPF: 44, billsPA: 56, logo: 'NE' }
  ],
  sosRanking: [
    { team: 'Bills', sos: 0.502, rank: 12 },
    { team: 'Patriots', sos: 0.488, rank: 18 },
    { team: 'Dolphins', sos: 0.510, rank: 9 },
    { team: 'Jets', sos: 0.515, rank: 7 }
  ]
};

export const capSpace = {
  totalCap: 303400000,
  usedCap: 310100000,
  availableCap: -6700000,
  deadMoney: 29000000,
  topContracts: [
    { player: 'Josh Allen', position: 'QB', totalValue: 330000000, avgAnnual: 55000000, yearsLeft: 5, capHit: 56000000 },
    { player: 'Dion Dawkins', position: 'OT', totalValue: 60000000, avgAnnual: 15000000, yearsLeft: 1, capHit: 25000000 },
    { player: 'Ed Oliver', position: 'DT', totalValue: 68000000, avgAnnual: 17000000, yearsLeft: 2, capHit: 23900000 },
    { player: 'Greg Rousseau', position: 'DE', totalValue: 80000000, avgAnnual: 20000000, yearsLeft: 4, capHit: 18500000 },
    { player: 'Dawson Knox', position: 'TE', totalValue: 53400000, avgAnnual: 10680000, yearsLeft: 1, capHit: 17800000 },
    { player: 'Khalil Shakir', position: 'WR', totalValue: 53000000, avgAnnual: 13250000, yearsLeft: 4, capHit: 14200000 },
    { player: 'Terrel Bernard', position: 'LB', totalValue: 50000000, avgAnnual: 12500000, yearsLeft: 4, capHit: 12800000 },
    { player: 'Spencer Brown', position: 'OT', totalValue: 35000000, avgAnnual: 8750000, yearsLeft: 2, capHit: 11200000 },
    { player: 'Dalton Kincaid', position: 'TE', totalValue: 12800000, avgAnnual: 3200000, yearsLeft: 1, capHit: 5100000 },
    { player: 'Christian Benford', position: 'CB', totalValue: 48000000, avgAnnual: 12000000, yearsLeft: 4, capHit: 10500000 }
  ],
  freeAgents: [
    { player: 'Connor McGovern', position: 'C', type: 'UFA' },
    { player: 'David Edwards', position: 'LG', type: 'UFA' },
    { player: 'Matt Milano', position: 'LB', type: 'UFA' },
    { player: 'DaQuan Jones', position: 'DT', type: 'UFA' },
    { player: 'A.J. Epenesa', position: 'DE', type: 'UFA' },
    { player: 'Jordan Poyer', position: 'S', type: 'UFA' },
    { player: 'Cam Lewis', position: 'CB', type: 'UFA' },
    { player: 'Tre\'Davious White', position: 'CB', type: 'UFA' }
  ],
  cutCandidates: [
    { player: 'Dawson Knox', savings: 10400000, note: 'TE — $17.8M cap hit, release saves $10.4M' },
    { player: 'Taylor Rapp', savings: 3000000, note: 'S — aging, replaceable' },
    { player: 'Ed Oliver', savings: 14700000, note: 'DT — post-June 1 cut saves $14.7M, trade rumors' },
    { player: 'Tyler Bass', savings: 3900000, note: 'K — post-June 1 savings' }
  ]
};

export const players = [
  { id: 1, name: 'Josh Allen', position: 'QB', number: 17, stats: { passingYards: 3668, tds: 39, rating: 102.2, rushYards: 579 } },
  { id: 2, name: 'James Cook', position: 'RB', number: 4, stats: { rushYards: 1621, rushTDs: 12, receptions: 33, recYards: 291 } },
  { id: 3, name: 'Dalton Kincaid', position: 'TE', number: 86, stats: { receptions: 50, recYards: 571, recTDs: 5, targets: 72 } },
  { id: 4, name: 'Keon Coleman', position: 'WR', number: 0, stats: { receptions: 38, recYards: 404, recTDs: 4, targets: 68 } },
  { id: 5, name: 'Khalil Shakir', position: 'WR', number: 10, stats: { receptions: 72, recYards: 719, recTDs: 4, targets: 100 } },
  { id: 6, name: 'Joshua Palmer', position: 'WR', number: 5, stats: { receptions: 18, recYards: 303, recTDs: 0, targets: 30 } },
  { id: 7, name: 'Ed Oliver', position: 'DT', number: 91, stats: { tackles: 12, sacks: 3, tfl: 5, qbHits: 8 } },
  { id: 8, name: 'Greg Rousseau', position: 'DE', number: 50, stats: { tackles: 53, sacks: 8, tfl: 11, qbHits: 20 } },
  { id: 9, name: 'Terrel Bernard', position: 'LB', number: 43, stats: { tackles: 104, sacks: 1, tfl: 8, interceptions: 2 } },
  { id: 10, name: 'Christian Benford', position: 'CB', number: 47, stats: { tackles: 48, interceptions: 3, passDefended: 12, forcedFumbles: 1 } },
  { id: 11, name: 'Taylor Rapp', position: 'S', number: 20, stats: { tackles: 82, interceptions: 2, passDefended: 6, forcedFumbles: 1 } },
  { id: 12, name: 'Joey Bosa', position: 'DE', number: 97, stats: { tackles: 26, sacks: 5, tfl: 7, qbHits: 14 } }
];

export const playerComparisons = {
  statCategories: ['Yards', 'TDs', 'Catches/Tackles', 'Efficiency', 'Big Plays', 'Consistency']
};

export const driveEfficiency = {
  startingPositions: [
    { position: 10, count: 7, scoringDrives: 1 },
    { position: 15, count: 5, scoringDrives: 1 },
    { position: 20, count: 14, scoringDrives: 4 },
    { position: 25, count: 24, scoringDrives: 9 },
    { position: 30, count: 16, scoringDrives: 7 },
    { position: 35, count: 11, scoringDrives: 6 },
    { position: 40, count: 7, scoringDrives: 4 },
    { position: 45, count: 5, scoringDrives: 4 },
    { position: 50, count: 3, scoringDrives: 2 }
  ],
  redZone: {
    attempts: 54,
    scores: 38,
    touchdowns: 30,
    fieldGoals: 8,
    efficiency: 60.4
  },
  scoringBreakdown: [
    { type: 'Passing TD', count: 25, color: '#00338D' },
    { type: 'Rushing TD', count: 18, color: '#C60C30' },
    { type: 'Field Goal', count: 24, color: '#FFB81C' },
    { type: 'Defensive TD', count: 3, color: '#22c55e' },
    { type: 'Special Teams TD', count: 1, color: '#8b5cf6' }
  ]
};

export const injuries = {
  timeline: [
    { player: 'Ed Oliver', position: 'DT', injury: 'Ankle', start: 'Week 4', end: 'Week 8', status: 'Returned', gamesMissed: 4 },
    { player: 'Joshua Palmer', position: 'WR', injury: 'Hamstring', start: 'Week 2', end: 'Week 10', status: 'Returned', gamesMissed: 8 },
    { player: 'Dalton Kincaid', position: 'TE', injury: 'Hamstring', start: 'Week 10', end: 'Week 14', status: 'Returned', gamesMissed: 4 },
    { player: 'Matt Milano', position: 'LB', injury: 'Pectoral', start: 'Week 6', end: 'Season', status: 'IR', gamesMissed: 12 },
    { player: 'Joey Bosa', position: 'DE', injury: 'Shoulder', start: 'Week 12', end: 'Week 16', status: 'Returned', gamesMissed: 5 }
  ],
  currentReport: [
    { player: 'Josh Allen', status: 'Healthy', designation: '', details: 'Offseason — full health' },
    { player: 'James Cook', status: 'Healthy', designation: '', details: 'Offseason — full health' },
    { player: 'Ed Oliver', status: 'Healthy', designation: '', details: 'Ankle healed, trade rumors' },
    { player: 'Matt Milano', status: 'Out', designation: 'UFA', details: 'Pectoral — season-ending, now a free agent' },
    { player: 'Joey Bosa', status: 'Healthy', designation: '', details: 'Shoulder healed, 1-year deal expires' },
    { player: 'Dalton Kincaid', status: 'Healthy', designation: '', details: '5th-year option exercised' }
  ]
};

export const weatherImpact = {
  games: [
    { week: 1, temp: 76, wind: 6, precip: 'Clear', venue: 'Home', scored: 31, passYards: 260, result: 'W' },
    { week: 2, temp: 83, wind: 9, precip: 'Clear', venue: 'Away', scored: 24, passYards: 215, result: 'L' },
    { week: 3, temp: 70, wind: 4, precip: 'Clear', venue: 'Home', scored: 38, passYards: 285, result: 'W' },
    { week: 4, temp: 62, wind: 14, precip: 'Rain', venue: 'Away', scored: 20, passYards: 178, result: 'L' },
    { week: 5, temp: 58, wind: 7, precip: 'Clear', venue: 'Home', scored: 34, passYards: 248, result: 'W' },
    { week: 6, temp: 52, wind: 16, precip: 'Rain', venue: 'Away', scored: 17, passYards: 165, result: 'L' },
    { week: 7, temp: 46, wind: 9, precip: 'Clear', venue: 'Home', scored: 35, passYards: 232, result: 'W' },
    { week: 8, temp: 50, wind: 11, precip: 'Rain', venue: 'Away', scored: 27, passYards: 210, result: 'W' },
    { week: 9, temp: 40, wind: 19, precip: 'Wind', venue: 'Home', scored: 41, passYards: 205, result: 'W' },
    { week: 10, temp: 72, wind: 3, precip: 'Clear', venue: 'Away (Dome)', scored: 21, passYards: 275, result: 'L' },
    { week: 11, temp: 35, wind: 13, precip: 'Clear', venue: 'Home', scored: 28, passYards: 220, result: 'W' },
    { week: 12, temp: 58, wind: 5, precip: 'Clear', venue: 'Away (Dome)', scored: 23, passYards: 260, result: 'W' },
    { week: 13, temp: 24, wind: 18, precip: 'Snow', venue: 'Home', scored: 33, passYards: 155, result: 'W' },
    { week: 14, temp: 65, wind: 4, precip: 'Clear', venue: 'Away (Dome)', scored: 24, passYards: 285, result: 'L' },
    { week: 15, temp: 20, wind: 22, precip: 'Snow', venue: 'Home', scored: 30, passYards: 148, result: 'W' },
    { week: 16, temp: 28, wind: 16, precip: 'Snow', venue: 'Away', scored: 27, passYards: 162, result: 'W' },
    { week: 17, temp: 30, wind: 12, precip: 'Clear', venue: 'Home', scored: 28, passYards: 195, result: 'W' }
  ],
  snowGames: { wins: 3, losses: 0, avgPoints: 30.0, avgPassYards: 155 },
  domeGames: { wins: 1, losses: 2, avgPoints: 22.7, avgPassYards: 273.3 },
  coldGames: { wins: 5, losses: 0, avgPoints: 32.0, avgPassYards: 184.0 },
  warmGames: { wins: 4, losses: 3, avgPoints: 26.7, avgPassYards: 241.6 }
};

export const news = {
  current: [
    { id: 1, title: 'Joe Brady Named Head Coach After McDermott Firing', category: 'Coaching', date: 'Jan 27, 2026', excerpt: 'The Bills promoted OC Joe Brady to head coach on a 5-year deal, making him the youngest HC in the NFL at 36. Brady was chosen for continuity with Josh Allen and the offensive system.', hot: true },
    { id: 2, title: 'Sean McDermott Fired After 9 Seasons', category: 'Coaching', date: 'Jan 19, 2026', excerpt: 'After a divisional round OT loss to Denver and 4 early playoff exits in 5 years, the Bills parted ways with McDermott. Brandon Beane promoted to President of Football Operations.', hot: true },
    { id: 3, title: 'Jim Leonhard Hired as DC — Bills Switching to 3-4 Defense', category: 'Coaching', date: 'Feb 10, 2026', excerpt: 'New DC Jim Leonhard will install a 3-4 base defense, a major scheme change that will reshape the Bills\' roster needs heading into free agency and the draft.', hot: true },
    { id: 4, title: 'James Cook Wins 2025 NFL Rushing Title', category: 'Player', date: 'Jan 6, 2026', excerpt: 'James Cook led the NFL with 1,621 rushing yards on 309 carries — the first Bill to lead the league in rushing since O.J. Simpson in 1976. Cook also added 12 rushing TDs.', hot: false },
    { id: 5, title: 'Bills $6.7M Over Salary Cap — Cuts Coming', category: 'Cap', date: 'Feb 20, 2026', excerpt: 'Buffalo enters 2026 free agency $6.7M over the $303.4M cap. Dawson Knox ($17.8M hit), Ed Oliver ($23.9M), and Taylor Rapp are prime cut/trade candidates. Free agency opens March 11.', hot: false },
    { id: 6, title: 'New Highmark Stadium 75% Complete — Opening Summer 2026', category: 'Stadium', date: 'Feb 18, 2026', excerpt: 'The $1.4B new stadium is on track for its summer 2026 opening. The 62,000-seat venue will host its inaugural Bills game in September. Special inaugural season logo and jersey patch unveiled.', hot: true }
  ],
  combine: {
    prospects: [
      { name: 'Omar Cooper Jr.', pos: 'WR', school: 'Indiana', fortyYard: 4.39, vertical: 39, bench: 14, shuttle: 4.05, rating: 95 },
      { name: 'Malachi Fields', pos: 'WR', school: 'Notre Dame', fortyYard: 4.44, vertical: 37, bench: 16, shuttle: 4.12, rating: 93 },
      { name: 'Keldric Faulk', pos: 'EDGE', school: 'Auburn', fortyYard: 4.58, vertical: 36, bench: 26, shuttle: 4.20, rating: 92 },
      { name: 'Mason Thomas', pos: 'EDGE', school: 'Oklahoma', fortyYard: 4.52, vertical: 38, bench: 24, shuttle: 4.15, rating: 91 },
      { name: 'Jacob Rodriguez', pos: 'LB', school: 'Texas Tech', fortyYard: 4.48, vertical: 37, bench: 22, shuttle: 4.08, rating: 90 },
      { name: 'Benjamin Morrison', pos: 'CB', school: 'Notre Dame', fortyYard: 4.36, vertical: 40, bench: 15, shuttle: 3.99, rating: 94 },
      { name: 'Princely Umanmielen', pos: 'EDGE', school: 'Ole Miss', fortyYard: 4.62, vertical: 35, bench: 28, shuttle: 4.25, rating: 89 },
      { name: 'Emeka Egbuka', pos: 'WR', school: 'Ohio State', fortyYard: 4.41, vertical: 38, bench: 15, shuttle: 4.10, rating: 91 }
    ],
    billsNeeds: ['WR', 'EDGE', 'LB', 'S', 'OL']
  },
  draft: {
    billsPicks: [
      { round: 1, pick: 26, note: 'Bills selection' },
      { round: 2, pick: 58, note: 'Bills selection' },
      { round: 3, pick: 90, note: 'Bills selection' },
      { round: 4, pick: 122, note: 'Bills selection' },
      { round: 5, pick: 165, note: 'Comp pick' },
      { round: 6, pick: 194, note: 'Bills selection' },
      { round: 7, pick: 226, note: 'Bills selection' }
    ],
    mockDraft: [
      { round: 1, pick: 26, player: 'Omar Cooper Jr.', pos: 'WR', school: 'Indiana', fit: 'True WR1 the Bills desperately need — 87.4 PFF grade, 2.55 YPRR' },
      { round: 2, pick: 58, player: 'Mason Thomas', pos: 'EDGE', school: 'Oklahoma', fit: 'Athletic pass rusher for Leonhard\'s 3-4 scheme' },
      { round: 3, pick: 90, player: 'Jacob Rodriguez', pos: 'LB', school: 'Texas Tech', fit: 'Inside linebacker to replace Matt Milano in the 3-4' }
    ]
  }
};

export const sentiment = {
  current: { positive: 48, neutral: 22, negative: 30 },
  trending: [
    { topic: '#BillsMafia', volume: 52100, trend: 'up' },
    { topic: 'Joe Brady', volume: 41200, trend: 'up' },
    { topic: 'McDermott Fired', volume: 38400, trend: 'down' },
    { topic: '#GoBills', volume: 28800, trend: 'up' },
    { topic: 'New Stadium 2026', volume: 24600, trend: 'up' },
    { topic: 'James Cook MVP', volume: 18300, trend: 'up' },
    { topic: 'Bills Draft Needs', volume: 15800, trend: 'up' },
    { topic: '#CircleTheWagons', volume: 12400, trend: 'up' }
  ],
  weekly: [
    { week: 'W1', positive: 82, neutral: 12, negative: 6 },
    { week: 'W2', positive: 38, neutral: 24, negative: 38 },
    { week: 'W3', positive: 90, neutral: 6, negative: 4 },
    { week: 'W4', positive: 28, neutral: 22, negative: 50 },
    { week: 'W5', positive: 85, neutral: 8, negative: 7 },
    { week: 'W6', positive: 30, neutral: 28, negative: 42 },
    { week: 'W7', positive: 88, neutral: 7, negative: 5 },
    { week: 'W8', positive: 72, neutral: 18, negative: 10 },
    { week: 'W9', positive: 92, neutral: 5, negative: 3 },
    { week: 'W10', positive: 25, neutral: 20, negative: 55 },
    { week: 'W11', positive: 78, neutral: 12, negative: 10 },
    { week: 'W12', positive: 68, neutral: 20, negative: 12 },
    { week: 'W13', positive: 88, neutral: 8, negative: 4 },
    { week: 'W14', positive: 32, neutral: 18, negative: 50 },
    { week: 'W15', positive: 80, neutral: 10, negative: 10 },
    { week: 'W16', positive: 75, neutral: 15, negative: 10 },
    { week: 'W17', positive: 70, neutral: 18, negative: 12 }
  ]
};

export const socialFeed = [
  {
    id: 1,
    player: 'Josh Allen',
    handle: '@JoshAllenQB',
    avatar: 'JA',
    number: 17,
    platform: 'twitter',
    text: 'Tough way to end it. 5 turnovers in Denver — that\'s on me. This team deserves better and I\'m going to make sure we get there. New coaching staff, new energy. #BillsMafia',
    likes: 312000,
    retweets: 48000,
    comments: 18400,
    time: '3w ago',
    verified: true
  },
  {
    id: 2,
    player: 'James Cook',
    handle: '@JamesCook',
    avatar: 'JC',
    number: 4,
    platform: 'instagram',
    text: 'NFL rushing champion. First Bill since O.J. Simpson in 1976. God is great. 1,621 yards, 309 carries, and we\'re just getting started. Buffalo, this is for you.',
    likes: 145000,
    retweets: 0,
    comments: 8200,
    time: '2w ago',
    verified: true
  },
  {
    id: 3,
    player: 'Khalil Shakir',
    handle: '@KhalilShakir',
    avatar: 'KS',
    number: 10,
    platform: 'twitter',
    text: 'Coach Brady been calling it since day one. Now he\'s the man. Let\'s go get that ring. My career took off under Joe and it\'s only going up from here. #NewEra',
    likes: 68000,
    retweets: 9800,
    comments: 3400,
    time: '2w ago',
    verified: true
  },
  {
    id: 4,
    player: 'Greg Rousseau',
    handle: '@GregRousseau',
    avatar: 'GR',
    number: 50,
    platform: 'twitter',
    text: '8 sacks and a new contract. Grateful to Buffalo for believing in me. New defensive scheme under Coach Leonhard is going to be special. 3-4 defense, let\'s eat.',
    likes: 42000,
    retweets: 6100,
    comments: 2200,
    time: '1w ago',
    verified: true
  },
  {
    id: 5,
    player: 'Keon Coleman',
    handle: '@KeonColeman',
    avatar: 'KC',
    number: 0,
    platform: 'twitter',
    text: 'Year 2 wasn\'t what I wanted. 38 catches isn\'t who I am. Working with Coach Carmichael this offseason to be the player Buffalo needs. Year 3 is going to be different.',
    likes: 54000,
    retweets: 7200,
    comments: 4800,
    time: '1w ago',
    verified: true
  },
  {
    id: 6,
    player: 'Dalton Kincaid',
    handle: '@DaltonKincaid',
    avatar: 'DK',
    number: 86,
    platform: 'instagram',
    text: '5th year option locked in. Buffalo is home. Hamstring fully healed and I\'m ready to show what I can really do in a full healthy season. New stadium, new beginning.',
    likes: 38000,
    retweets: 0,
    comments: 2800,
    time: '5d ago',
    verified: true
  },
  {
    id: 7,
    player: 'Terrel Bernard',
    handle: '@TBernard43',
    avatar: 'TB',
    number: 43,
    platform: 'twitter',
    text: '104 tackles and a new deal. This defense is about to look different under Coach Leonhard. 3-4, fast and physical. AFC better be ready.',
    likes: 31000,
    retweets: 4500,
    comments: 1600,
    time: '4d ago',
    verified: true
  },
  {
    id: 8,
    player: 'Josh Allen',
    handle: '@JoshAllenQB',
    avatar: 'JA',
    number: 17,
    platform: 'instagram',
    text: 'Excited for Coach Brady. We\'ve built something special together on offense and now he\'s leading the whole thing. New stadium in 2026. This is our year. #CircleTheWagons',
    likes: 425000,
    retweets: 0,
    comments: 32000,
    time: '2d ago',
    verified: true
  }
];

// ═══════════════════════════════════════════════════════
// FULL 53-MAN ROSTER
// ESPN headshot CDN: https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/{ID}.png&w=350&h=254
// ═══════════════════════════════════════════════════════

export const fullRoster = [
  // ── QUARTERBACKS ──────────────────────────────────────
  {
    id: 1, name: 'Josh Allen', number: 17, position: 'QB', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'5"', weight: 237, age: 29, college: 'Wyoming',
    draftInfo: '2018 R1 P7', yearsPro: 8,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png&w=350&h=254',
    interestingFact: 'Was the first Bills QB to throw for 4,000+ yards in consecutive seasons. Also the only QB in NFL history with 200+ passing TDs and 75+ rushing TDs.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '3668 pass yds, 25 pass TD, 14 rush TD', rating: 0.88 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '4306 pass yds, 29 TD, 18 rush TD', rating: 0.92 },
      { season: '2022', team: 'BUF', gamesPlayed: 16, keyStats: '4283 pass yds, 35 TD, 7 rush TD', rating: 0.90 },
      { season: '2021', team: 'BUF', gamesPlayed: 17, keyStats: '4407 pass yds, 36 TD, 6 rush TD', rating: 0.91 },
      { season: '2020', team: 'BUF', gamesPlayed: 16, keyStats: '4544 pass yds, 37 TD, 8 rush TD', rating: 0.94 }
    ],
    arcGauges: { speed: 82, power: 93, footballIQ: 85, accuracy: 84, clutch: 86, durability: 90 },
    stats: { passingYards: 3668, tds: 39, rating: 102.2, rushYards: 579 }
  },
  {
    id: 13, name: 'Mitchell Trubisky', number: 10, position: 'QB', positionGroup: 'Offense',
    depthOrder: 2, height: '6\'2"', weight: 220, age: 31, college: 'North Carolina',
    draftInfo: '2017 R1 P2', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3039707.png&w=350&h=254',
    interestingFact: 'Was selected 2nd overall in the 2017 draft ahead of Patrick Mahomes and Deshaun Watson. Named NFC Offensive Player of the Month in November 2018.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 3, keyStats: '285 pass yds, 2 TD, 1 INT', rating: 0.52 },
      { season: '2023', team: 'BUF', gamesPlayed: 2, keyStats: '148 pass yds, 1 TD', rating: 0.50 },
      { season: '2022', team: 'PIT', gamesPlayed: 6, keyStats: '1073 pass yds, 4 TD, 5 INT', rating: 0.40 }
    ],
    arcGauges: { speed: 72, power: 68, footballIQ: 62, accuracy: 64, clutch: 50, durability: 72 },
    stats: { passingYards: 285, tds: 2, rating: 82.1, rushYards: 38 }
  },

  // ── RUNNING BACKS ─────────────────────────────────────
  {
    id: 2, name: 'James Cook', number: 4, position: 'RB', positionGroup: 'Offense',
    depthOrder: 1, height: '5\'11"', weight: 199, age: 25, college: 'Georgia',
    draftInfo: '2022 R2 P63', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4362887.png&w=350&h=254',
    interestingFact: 'Brother of Dalvin Cook. Won the 2025 NFL rushing title with 1,621 yards — the first Bill to lead the league in rushing since O.J. Simpson in 1976.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '1621 rush yds, 12 TD, 33 rec, 291 rec yds', rating: 0.94 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '1122 rush yds, 2 TD, 44 rec', rating: 0.78 },
      { season: '2022', team: 'BUF', gamesPlayed: 17, keyStats: '507 rush yds, 3 TD', rating: 0.55 }
    ],
    arcGauges: { speed: 90, power: 72, footballIQ: 78, accuracy: 70, clutch: 82, durability: 85 },
    stats: { rushYards: 1621, rushTDs: 12, receptions: 33, recYards: 291 }
  },
  {
    id: 14, name: 'Ray Davis', number: 22, position: 'RB', positionGroup: 'Offense',
    depthOrder: 2, height: '5\'9"', weight: 211, age: 25, college: 'Kentucky',
    draftInfo: '2024 R4 P120', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4430027.png&w=350&h=254',
    interestingFact: 'Transferred from Vanderbilt to Kentucky and rushed for over 1,100 yards in his final college season. Known as a powerful short-yardage back.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '374 rush yds, 4 TD, 18 rec', rating: 0.60 }
    ],
    arcGauges: { speed: 78, power: 82, footballIQ: 68, accuracy: 55, clutch: 65, durability: 80 },
    stats: { rushYards: 374, rushTDs: 4, receptions: 18, recYards: 134 }
  },
  {
    id: 15, name: 'Ty Johnson', number: 25, position: 'RB', positionGroup: 'Offense',
    depthOrder: 3, height: '5\'10"', weight: 210, age: 28, college: 'Maryland',
    draftInfo: '2019 R6 P186', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3915411.png&w=350&h=254',
    interestingFact: 'One of the fastest players on the roster with a 4.26 forty-yard dash. Has experience with five different NFL teams.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: '126 rush yds, 1 TD, 12 rec', rating: 0.42 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: '168 rush yds, 1 TD, 15 rec', rating: 0.44 }
    ],
    arcGauges: { speed: 92, power: 58, footballIQ: 65, accuracy: 50, clutch: 55, durability: 70 },
    stats: { rushYards: 126, rushTDs: 1, receptions: 12, recYards: 88 }
  },

  // ── WIDE RECEIVERS ────────────────────────────────────
  {
    id: 5, name: 'Khalil Shakir', number: 10, position: 'WR', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'0"', weight: 190, age: 25, college: 'Boise State',
    draftInfo: '2022 R5 P148', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4259545.png&w=350&h=254',
    interestingFact: 'A 5th-round pick who became the Bills WR1, leading the team in receptions and receiving yards. Had an incredible 72% catch rate in 2024.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '72 rec, 719 yds, 4 TD', rating: 0.80 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '39 rec, 611 yds, 2 TD', rating: 0.65 },
      { season: '2022', team: 'BUF', gamesPlayed: 16, keyStats: '36 rec, 373 yds, 2 TD', rating: 0.52 }
    ],
    arcGauges: { speed: 82, power: 65, footballIQ: 84, accuracy: 88, clutch: 78, durability: 82 },
    stats: { receptions: 72, recYards: 719, recTDs: 4, targets: 100 }
  },
  {
    id: 4, name: 'Keon Coleman', number: 0, position: 'WR', positionGroup: 'Offense',
    depthOrder: 2, height: '6\'4"', weight: 213, age: 23, college: 'Florida State',
    draftInfo: '2024 R2 P33', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4635008.png&w=350&h=254',
    interestingFact: 'Also played college basketball at Michigan State before transferring to FSU for football. Known for his personality and confidence in interviews.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '38 rec, 404 yds, 4 TD', rating: 0.55 }
    ],
    arcGauges: { speed: 80, power: 82, footballIQ: 68, accuracy: 62, clutch: 70, durability: 78 },
    stats: { receptions: 38, recYards: 404, recTDs: 4, targets: 68 }
  },
  {
    id: 6, name: 'Joshua Palmer', number: 5, position: 'WR', positionGroup: 'Offense',
    depthOrder: 3, height: '6\'1"', weight: 210, age: 26, college: 'Tennessee',
    draftInfo: '2021 R3 P77', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4362081.png&w=350&h=254',
    interestingFact: 'Born in Brampton, Ontario — one of the few Canadian-born NFL players. Spent his first three seasons with the Los Angeles Chargers before joining Buffalo.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 10, keyStats: '18 rec, 303 yds, 0 TD', rating: 0.48 },
      { season: '2023', team: 'LAC', gamesPlayed: 17, keyStats: '52 rec, 604 yds, 2 TD', rating: 0.62 }
    ],
    arcGauges: { speed: 80, power: 72, footballIQ: 70, accuracy: 72, clutch: 60, durability: 62 },
    stats: { receptions: 18, recYards: 303, recTDs: 0, targets: 30 }
  },
  {
    id: 16, name: 'Curtis Samuel', number: 15, position: 'WR', positionGroup: 'Offense',
    depthOrder: 4, height: '5\'11"', weight: 195, age: 29, college: 'Ohio State',
    draftInfo: '2017 R2 P40', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3052177.png&w=350&h=254',
    interestingFact: 'A former track star who played both running back and wide receiver at Ohio State. Has played for four different NFL teams and is valued for his versatility.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '41 rec, 380 yds, 2 TD, 28 rush yds', rating: 0.58 },
      { season: '2023', team: 'WAS', gamesPlayed: 15, keyStats: '64 rec, 613 yds, 3 TD', rating: 0.65 }
    ],
    arcGauges: { speed: 88, power: 62, footballIQ: 74, accuracy: 70, clutch: 65, durability: 68 },
    stats: { receptions: 41, recYards: 380, recTDs: 2, targets: 58 }
  },
  {
    id: 17, name: 'Mack Hollins', number: 12, position: 'WR', positionGroup: 'Offense',
    depthOrder: 5, height: '6\'4"', weight: 221, age: 30, college: 'North Carolina',
    draftInfo: '2017 R4 P118', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3051876.png&w=350&h=254',
    interestingFact: 'Known for his social media presence and sense of humor. Made the Pro Bowl as a special teamer with the Raiders in 2022.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '14 rec, 198 yds, 1 TD', rating: 0.42 },
      { season: '2023', team: 'ATL', gamesPlayed: 17, keyStats: '22 rec, 289 yds, 1 TD', rating: 0.45 }
    ],
    arcGauges: { speed: 82, power: 78, footballIQ: 68, accuracy: 58, clutch: 55, durability: 80 },
    stats: { receptions: 14, recYards: 198, recTDs: 1, targets: 24 }
  },
  {
    id: 18, name: 'Jalen Virgil', number: 82, position: 'WR', positionGroup: 'Offense',
    depthOrder: 6, height: '6\'1"', weight: 185, age: 26, college: 'Appalachian State',
    draftInfo: '2022 R6 P206', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4036448.png&w=350&h=254',
    interestingFact: 'Has blazing 4.28 speed and is also used as a kick returner. Originally drafted by the Denver Broncos before joining Buffalo.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 15, keyStats: '8 rec, 112 yds, 1 TD, KR specialist', rating: 0.38 }
    ],
    arcGauges: { speed: 96, power: 55, footballIQ: 58, accuracy: 52, clutch: 50, durability: 72 },
    stats: { receptions: 8, recYards: 112, recTDs: 1, targets: 14 }
  },

  // ── TIGHT ENDS ────────────────────────────────────────
  {
    id: 3, name: 'Dalton Kincaid', number: 86, position: 'TE', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'4"', weight: 246, age: 25, college: 'Utah',
    draftInfo: '2023 R1 P25', yearsPro: 3,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4432708.png&w=350&h=254',
    interestingFact: 'Started his college career at San Diego before transferring to Utah, where he became the top TE prospect in the 2023 draft. Bills exercised his 5th-year option.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 13, keyStats: '50 rec, 571 yds, 5 TD', rating: 0.75 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '73 rec, 673 yds, 2 TD', rating: 0.78 }
    ],
    arcGauges: { speed: 76, power: 74, footballIQ: 82, accuracy: 80, clutch: 75, durability: 68 },
    stats: { receptions: 50, recYards: 571, recTDs: 5, targets: 72 }
  },
  {
    id: 19, name: 'Dawson Knox', number: 88, position: 'TE', positionGroup: 'Offense',
    depthOrder: 2, height: '6\'4"', weight: 254, age: 28, college: 'Ole Miss',
    draftInfo: '2019 R3 P96', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3929924.png&w=350&h=254',
    interestingFact: 'Scored a touchdown in the famous 13-second playoff comeback against the Chiefs in January 2022. A potential cut candidate due to his $17.8M cap hit.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '24 rec, 258 yds, 3 TD', rating: 0.52 },
      { season: '2023', team: 'BUF', gamesPlayed: 15, keyStats: '22 rec, 186 yds, 1 TD', rating: 0.42 },
      { season: '2021', team: 'BUF', gamesPlayed: 15, keyStats: '49 rec, 587 yds, 9 TD', rating: 0.82 }
    ],
    arcGauges: { speed: 74, power: 78, footballIQ: 72, accuracy: 68, clutch: 74, durability: 70 },
    stats: { receptions: 24, recYards: 258, recTDs: 3, targets: 38 }
  },
  {
    id: 20, name: 'Quintin Morris', number: 85, position: 'TE', positionGroup: 'Offense',
    depthOrder: 3, height: '6\'2"', weight: 243, age: 26, college: 'Bowling Green',
    draftInfo: 'UDFA 2022', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240589.png&w=350&h=254',
    interestingFact: 'An undrafted free agent who made the roster as a blocking tight end and special teams contributor. Has steadily improved each season.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '11 rec, 98 yds, 1 TD', rating: 0.38 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: '8 rec, 64 yds, 0 TD', rating: 0.32 }
    ],
    arcGauges: { speed: 68, power: 76, footballIQ: 65, accuracy: 58, clutch: 52, durability: 78 },
    stats: { receptions: 11, recYards: 98, recTDs: 1, targets: 16 }
  },

  // ── OFFENSIVE LINE ────────────────────────────────────
  {
    id: 21, name: 'Dion Dawkins', number: 73, position: 'OT', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'5"', weight: 320, age: 30, college: 'Temple',
    draftInfo: '2017 R2 P63', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3042519.png&w=350&h=254',
    interestingFact: 'Known as "Bam Bam" for his pancake blocks. He is the longest-tenured Bill and the anchor of the offensive line. Released a rap album in the offseason.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: 'LT, 96.2% snap rate, 4 penalties', rating: 0.78 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'LT, 98% snap rate, 2 sacks allowed', rating: 0.80 }
    ],
    arcGauges: { speed: 58, power: 88, footballIQ: 82, accuracy: 72, clutch: 78, durability: 76 },
    stats: { gamesStarted: 16, sacksAllowed: 3, penalties: 4, runBlockGrade: 78.5 }
  },
  {
    id: 22, name: 'Spencer Brown', number: 79, position: 'OT', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'8"', weight: 311, age: 27, college: 'Northern Iowa',
    draftInfo: '2021 R3 P93', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4030899.png&w=350&h=254',
    interestingFact: 'At 6\'8", he is one of the tallest offensive linemen in the NFL. Grew up on a family farm in Minnesota and played at an FCS school.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: 'RT, 97% snap rate, 5 sacks allowed', rating: 0.72 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: 'RT, 94% snap rate, 4 sacks allowed', rating: 0.70 }
    ],
    arcGauges: { speed: 55, power: 90, footballIQ: 72, accuracy: 68, clutch: 65, durability: 82 },
    stats: { gamesStarted: 17, sacksAllowed: 5, penalties: 6, runBlockGrade: 74.2 }
  },
  {
    id: 23, name: 'Connor McGovern', number: 66, position: 'C', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'4"', weight: 306, age: 28, college: 'Penn State',
    draftInfo: '2019 R5 P145', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3916925.png&w=350&h=254',
    interestingFact: 'Cousin of former NFL center Connor McGovern who played for the Jets and Cowboys. One of the most durable centers in the league over the past 3 seasons.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: 'C, 100% snap rate, 0 sacks allowed', rating: 0.82 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'C, 100% snap rate, 1 sack allowed', rating: 0.80 }
    ],
    arcGauges: { speed: 52, power: 84, footballIQ: 88, accuracy: 78, clutch: 75, durability: 92 },
    stats: { gamesStarted: 17, sacksAllowed: 0, penalties: 2, runBlockGrade: 80.1 }
  },
  {
    id: 24, name: 'David Edwards', number: 60, position: 'OG', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'6"', weight: 315, age: 29, college: 'Wisconsin',
    draftInfo: '2019 R5 P169', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918003.png&w=350&h=254',
    interestingFact: 'Won a Super Bowl with the LA Rams in the 2021 season. Known as one of the most consistent guards in the AFC.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: 'LG, 95% snap rate, 2 sacks allowed', rating: 0.74 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'LG, 97% snap rate, 1 sack allowed', rating: 0.76 }
    ],
    arcGauges: { speed: 50, power: 86, footballIQ: 80, accuracy: 74, clutch: 70, durability: 78 },
    stats: { gamesStarted: 16, sacksAllowed: 2, penalties: 3, runBlockGrade: 76.8 }
  },
  {
    id: 25, name: "O'Cyrus Torrence", number: 64, position: 'OG', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'5"', weight: 347, age: 25, college: 'Florida',
    draftInfo: '2023 R2 P59', yearsPro: 3,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4432577.png&w=350&h=254',
    interestingFact: 'One of the heaviest players in the NFL at 347 pounds. Won the Joe Moore Award as part of the best O-line in college football at Florida.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: 'RG, 98% snap rate, 1 sack allowed', rating: 0.78 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'RG, 95% snap rate, 3 sacks allowed', rating: 0.72 }
    ],
    arcGauges: { speed: 42, power: 95, footballIQ: 74, accuracy: 70, clutch: 68, durability: 84 },
    stats: { gamesStarted: 17, sacksAllowed: 1, penalties: 4, runBlockGrade: 82.3 }
  },
  {
    id: 26, name: 'Ryan Bates', number: 71, position: 'OG', positionGroup: 'Offense',
    depthOrder: 2, height: '6\'4"', weight: 302, age: 28, college: 'Penn State',
    draftInfo: '2019 UDFA', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3929631.png&w=350&h=254',
    interestingFact: 'An undrafted free agent who worked his way to a starting role and then a solid backup. Has played every position on the offensive line in his career.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 15, keyStats: 'Swing G, 40% snap rate, versatile backup', rating: 0.62 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'LG starter, 90% snap rate', rating: 0.70 }
    ],
    arcGauges: { speed: 54, power: 80, footballIQ: 78, accuracy: 72, clutch: 65, durability: 74 },
    stats: { gamesStarted: 6, sacksAllowed: 1, penalties: 2, runBlockGrade: 72.0 }
  },

  // ── DEFENSIVE LINE ────────────────────────────────────
  {
    id: 7, name: 'Ed Oliver', number: 91, position: 'DT', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'1"', weight: 287, age: 27, college: 'Houston',
    draftInfo: '2019 R1 P9', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4035538.png&w=350&h=254',
    interestingFact: 'Started college at Houston at just 16 years old as a true freshman. One of the most disruptive interior pass rushers in the NFL when healthy.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 12, keyStats: '12 tkl, 3 sacks, 5 TFL, 8 QB hits', rating: 0.72 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '45 tkl, 8 sacks, 11 TFL', rating: 0.85 },
      { season: '2022', team: 'BUF', gamesPlayed: 17, keyStats: '44 tkl, 5 sacks, 7 TFL', rating: 0.78 }
    ],
    arcGauges: { speed: 82, power: 88, footballIQ: 78, accuracy: 65, clutch: 72, durability: 62 },
    stats: { tackles: 12, sacks: 3, tfl: 5, qbHits: 8 }
  },
  {
    id: 8, name: 'Greg Rousseau', number: 50, position: 'DE', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'6"', weight: 266, age: 25, college: 'Miami (FL)',
    draftInfo: '2021 R1 P30', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4361429.png&w=350&h=254',
    interestingFact: 'Opted out of the 2020 college season due to COVID and was still drafted in the first round. Born in Coconut Creek, Florida to Haitian parents.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '53 tkl, 8 sacks, 11 TFL, 20 QB hits', rating: 0.84 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '47 tkl, 8 sacks, 10 TFL', rating: 0.82 },
      { season: '2022', team: 'BUF', gamesPlayed: 17, keyStats: '46 tkl, 5.5 sacks, 13 TFL', rating: 0.76 }
    ],
    arcGauges: { speed: 80, power: 84, footballIQ: 80, accuracy: 68, clutch: 76, durability: 85 },
    stats: { tackles: 53, sacks: 8, tfl: 11, qbHits: 20 }
  },
  {
    id: 12, name: 'Joey Bosa', number: 97, position: 'DE', positionGroup: 'Defense',
    depthOrder: 2, height: '6\'5"', weight: 280, age: 30, college: 'Ohio State',
    draftInfo: '2016 R1 P3', yearsPro: 10,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3916387.png&w=350&h=254',
    interestingFact: 'Part of the legendary Bosa family — his brother Nick won DPOY and their father John played 5 NFL seasons. Signed a 1-year prove-it deal with Buffalo.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 12, keyStats: '26 tkl, 5 sacks, 7 TFL, 14 QB hits', rating: 0.70 },
      { season: '2023', team: 'LAC', gamesPlayed: 13, keyStats: '31 tkl, 6.5 sacks, 9 TFL', rating: 0.72 },
      { season: '2021', team: 'LAC', gamesPlayed: 11, keyStats: '36 tkl, 10.5 sacks, 12 TFL', rating: 0.88 }
    ],
    arcGauges: { speed: 76, power: 86, footballIQ: 88, accuracy: 72, clutch: 80, durability: 55 },
    stats: { tackles: 26, sacks: 5, tfl: 7, qbHits: 14 }
  },
  {
    id: 27, name: 'A.J. Epenesa', number: 57, position: 'DE', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'5"', weight: 275, age: 27, college: 'Iowa',
    draftInfo: '2020 R2 P54', yearsPro: 6,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4241985.png&w=350&h=254',
    interestingFact: 'His father Eppy Epenesa was an All-American defensive lineman at Iowa. A.J. set Iowa\'s single-season sack record as a sophomore with 10.5.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '34 tkl, 4 sacks, 6 TFL', rating: 0.62 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '29 tkl, 3.5 sacks, 5 TFL', rating: 0.58 }
    ],
    arcGauges: { speed: 72, power: 82, footballIQ: 74, accuracy: 60, clutch: 62, durability: 78 },
    stats: { tackles: 34, sacks: 4, tfl: 6, qbHits: 10 }
  },
  {
    id: 28, name: 'DaQuan Jones', number: 92, position: 'DT', positionGroup: 'Defense',
    depthOrder: 2, height: '6\'4"', weight: 322, age: 33, college: 'Penn State',
    draftInfo: '2014 R4 P112', yearsPro: 12,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16813.png&w=350&h=254',
    interestingFact: 'A veteran run-stuffer who has been one of the most consistent nose tackles in the league for over a decade. A key locker room leader.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '28 tkl, 1 sack, 3 TFL', rating: 0.58 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '35 tkl, 2 sacks, 4 TFL', rating: 0.62 }
    ],
    arcGauges: { speed: 48, power: 88, footballIQ: 82, accuracy: 55, clutch: 60, durability: 80 },
    stats: { tackles: 28, sacks: 1, tfl: 3, qbHits: 4 }
  },
  {
    id: 29, name: 'Kingsley Jonathan', number: 95, position: 'DT', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'4"', weight: 280, age: 27, college: 'Syracuse',
    draftInfo: 'UDFA 2021', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240405.png&w=350&h=254',
    interestingFact: 'Born in Lagos, Nigeria and moved to Canada as a teenager. Did not start playing football until high school in Ontario.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '22 tkl, 2 sacks, 3 TFL', rating: 0.52 },
      { season: '2023', team: 'CHI', gamesPlayed: 15, keyStats: '18 tkl, 1.5 sacks, 2 TFL', rating: 0.48 }
    ],
    arcGauges: { speed: 68, power: 80, footballIQ: 65, accuracy: 55, clutch: 55, durability: 76 },
    stats: { tackles: 22, sacks: 2, tfl: 3, qbHits: 6 }
  },
  {
    id: 30, name: 'Javon Solomon', number: 55, position: 'DE', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'2"', weight: 248, age: 24, college: 'Troy',
    draftInfo: '2024 R5 P158', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4428548.png&w=350&h=254',
    interestingFact: 'Led the Sun Belt Conference in sacks as a senior at Troy. A high-motor edge rusher who projects well in the new 3-4 defense.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: '16 tkl, 2.5 sacks, 4 TFL', rating: 0.50 }
    ],
    arcGauges: { speed: 82, power: 72, footballIQ: 62, accuracy: 55, clutch: 58, durability: 74 },
    stats: { tackles: 16, sacks: 2.5, tfl: 4, qbHits: 7 }
  },

  // ── LINEBACKERS ───────────────────────────────────────
  {
    id: 9, name: 'Terrel Bernard', number: 43, position: 'LB', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'1"', weight: 224, age: 26, college: 'Baylor',
    draftInfo: '2022 R3 P89', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4361418.png&w=350&h=254',
    interestingFact: 'Stepped up as the starting MLB after Matt Milano went down and finished top 10 in the NFL in tackles. Named team captain in just his third season.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '104 tkl, 1 sack, 8 TFL, 2 INT', rating: 0.82 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '95 tkl, 2 sacks, 6 TFL, 1 INT', rating: 0.78 }
    ],
    arcGauges: { speed: 82, power: 76, footballIQ: 86, accuracy: 72, clutch: 80, durability: 88 },
    stats: { tackles: 104, sacks: 1, tfl: 8, interceptions: 2 }
  },
  {
    id: 31, name: 'Dorian Williams', number: 42, position: 'LB', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'1"', weight: 228, age: 24, college: 'Tulane',
    draftInfo: '2023 R3 P91', yearsPro: 3,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4568624.png&w=350&h=254',
    interestingFact: 'Named AAC Defensive Player of the Year at Tulane in 2022. A sideline-to-sideline linebacker with elite closing speed.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '78 tkl, 2 sacks, 5 TFL, 1 INT', rating: 0.72 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: '52 tkl, 1 sack, 3 TFL', rating: 0.58 }
    ],
    arcGauges: { speed: 84, power: 74, footballIQ: 76, accuracy: 68, clutch: 70, durability: 82 },
    stats: { tackles: 78, sacks: 2, tfl: 5, interceptions: 1 }
  },
  {
    id: 32, name: 'Baylon Spector', number: 54, position: 'LB', positionGroup: 'Defense',
    depthOrder: 2, height: '6\'1"', weight: 232, age: 26, college: 'Clemson',
    draftInfo: '2022 R7 P231', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4239997.png&w=350&h=254',
    interestingFact: 'A 7th-round pick who has become a key special teams contributor. His brother Cade Spector also played college football at Clemson.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '38 tkl, 0.5 sack, 2 TFL, ST ace', rating: 0.52 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '32 tkl, 0 sacks, 1 TFL', rating: 0.48 }
    ],
    arcGauges: { speed: 78, power: 72, footballIQ: 70, accuracy: 62, clutch: 60, durability: 80 },
    stats: { tackles: 38, sacks: 0.5, tfl: 2, interceptions: 0 }
  },
  {
    id: 33, name: 'Nicholas Morrow', number: 46, position: 'LB', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'0"', weight: 225, age: 30, college: 'Greenville',
    draftInfo: 'UDFA 2017', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4232830.png&w=350&h=254',
    interestingFact: 'Played college football at Division II Greenville University. One of the few D-II players to have a successful multi-year NFL career.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '42 tkl, 1 sack, 3 TFL', rating: 0.55 },
      { season: '2023', team: 'BUF', gamesPlayed: 14, keyStats: '35 tkl, 0.5 sack, 2 TFL', rating: 0.50 }
    ],
    arcGauges: { speed: 76, power: 70, footballIQ: 78, accuracy: 64, clutch: 58, durability: 72 },
    stats: { tackles: 42, sacks: 1, tfl: 3, interceptions: 0 }
  },

  // ── CORNERBACKS ───────────────────────────────────────
  {
    id: 10, name: 'Christian Benford', number: 47, position: 'CB', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'1"', weight: 205, age: 25, college: 'Villanova',
    draftInfo: '2022 R6 P185', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4379778.png&w=350&h=254',
    interestingFact: 'A 6th-round pick from Villanova who became a shutdown corner and earned a massive contract extension. One of the biggest steals in the 2022 draft class.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '48 tkl, 3 INT, 12 PD, 1 FF', rating: 0.85 },
      { season: '2023', team: 'BUF', gamesPlayed: 15, keyStats: '42 tkl, 2 INT, 10 PD', rating: 0.80 }
    ],
    arcGauges: { speed: 86, power: 72, footballIQ: 84, accuracy: 78, clutch: 82, durability: 80 },
    stats: { tackles: 48, interceptions: 3, passDefended: 12, forcedFumbles: 1 }
  },
  {
    id: 34, name: 'Taron Johnson', number: 24, position: 'CB', positionGroup: 'Defense',
    depthOrder: 1, height: '5\'11"', weight: 192, age: 28, college: 'Weber State',
    draftInfo: '2018 R4 P121', yearsPro: 8,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3128429.png&w=350&h=254',
    interestingFact: 'Holds the Bills playoff record for longest interception return — a 101-yard pick-six against the Ravens in the 2020 divisional round.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '52 tkl, 1 INT, 8 PD', rating: 0.74 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '58 tkl, 2 INT, 11 PD', rating: 0.78 }
    ],
    arcGauges: { speed: 84, power: 68, footballIQ: 82, accuracy: 74, clutch: 78, durability: 76 },
    stats: { tackles: 52, interceptions: 1, passDefended: 8, forcedFumbles: 0 }
  },
  {
    id: 35, name: 'Rasul Douglas', number: 31, position: 'CB', positionGroup: 'Defense',
    depthOrder: 2, height: '6\'2"', weight: 209, age: 29, college: 'West Virginia',
    draftInfo: '2017 R3 P99', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3051397.png&w=350&h=254',
    interestingFact: 'Had a breakout season with the Packers in 2021 after being claimed off waivers from the Cardinals. Known as a ball hawk with excellent hands.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '44 tkl, 4 INT, 10 PD', rating: 0.78 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: '38 tkl, 3 INT, 9 PD', rating: 0.74 }
    ],
    arcGauges: { speed: 78, power: 76, footballIQ: 80, accuracy: 72, clutch: 76, durability: 74 },
    stats: { tackles: 44, interceptions: 4, passDefended: 10, forcedFumbles: 1 }
  },
  {
    id: 36, name: "Ja'Marcus Ingram", number: 37, position: 'CB', positionGroup: 'Defense',
    depthOrder: 3, height: '5\'10"', weight: 190, age: 24, college: 'UAB',
    draftInfo: '2024 R6 P198', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4240059.png&w=350&h=254',
    interestingFact: 'Named Conference USA Defensive Player of the Year at UAB. A physical corner who excels in press coverage.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: '22 tkl, 0 INT, 4 PD, ST contributor', rating: 0.42 }
    ],
    arcGauges: { speed: 86, power: 70, footballIQ: 62, accuracy: 60, clutch: 55, durability: 76 },
    stats: { tackles: 22, interceptions: 0, passDefended: 4, forcedFumbles: 0 }
  },

  // ── SAFETIES ──────────────────────────────────────────
  {
    id: 11, name: 'Taylor Rapp', number: 20, position: 'S', positionGroup: 'Defense',
    depthOrder: 1, height: '6\'0"', weight: 208, age: 27, college: 'Washington',
    draftInfo: '2019 R2 P61', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4040605.png&w=350&h=254',
    interestingFact: 'Won the Super Bowl with the Rams in the 2021 season. Known for his physicality in run support and ability to play near the line of scrimmage.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '82 tkl, 2 INT, 6 PD, 1 FF', rating: 0.72 },
      { season: '2023', team: 'BUF', gamesPlayed: 16, keyStats: '76 tkl, 1 INT, 5 PD', rating: 0.68 }
    ],
    arcGauges: { speed: 78, power: 80, footballIQ: 76, accuracy: 68, clutch: 72, durability: 74 },
    stats: { tackles: 82, interceptions: 2, passDefended: 6, forcedFumbles: 1 }
  },
  {
    id: 37, name: 'Damar Hamlin', number: 3, position: 'S', positionGroup: 'Defense',
    depthOrder: 2, height: '6\'1"', weight: 200, age: 27, college: 'Pittsburgh',
    draftInfo: '2021 R6 P212', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4241478.png&w=350&h=254',
    interestingFact: 'Suffered cardiac arrest on the field in January 2023 vs. the Bengals and miraculously returned to playing football. His charity toy drive raised over $9 million.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '58 tkl, 1 INT, 4 PD', rating: 0.62 },
      { season: '2023', team: 'BUF', gamesPlayed: 13, keyStats: '42 tkl, 0 INT, 3 PD', rating: 0.55 }
    ],
    arcGauges: { speed: 80, power: 74, footballIQ: 74, accuracy: 66, clutch: 85, durability: 68 },
    stats: { tackles: 58, interceptions: 1, passDefended: 4, forcedFumbles: 0 }
  },
  {
    id: 38, name: 'Mike Edwards', number: 27, position: 'S', positionGroup: 'Defense',
    depthOrder: 2, height: '5\'10"', weight: 200, age: 28, college: 'Kentucky',
    draftInfo: '2019 R3 P99', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3155647.png&w=350&h=254',
    interestingFact: 'Won a Super Bowl with the Tampa Bay Buccaneers. Had two pick-sixes in a single game against the Falcons in 2021.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 15, keyStats: '46 tkl, 2 INT, 5 PD', rating: 0.66 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '55 tkl, 3 INT, 7 PD', rating: 0.72 }
    ],
    arcGauges: { speed: 82, power: 70, footballIQ: 78, accuracy: 70, clutch: 74, durability: 76 },
    stats: { tackles: 46, interceptions: 2, passDefended: 5, forcedFumbles: 1 }
  },
  {
    id: 39, name: 'Cole Bishop', number: 29, position: 'S', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'0"', weight: 205, age: 23, college: 'Utah',
    draftInfo: '2024 R3 P94', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4676004.png&w=350&h=254',
    interestingFact: 'A former teammate of Dalton Kincaid at Utah. Led the Utes in interceptions in back-to-back seasons before being drafted by Buffalo.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 15, keyStats: '34 tkl, 1 INT, 3 PD', rating: 0.50 }
    ],
    arcGauges: { speed: 84, power: 72, footballIQ: 70, accuracy: 66, clutch: 60, durability: 78 },
    stats: { tackles: 34, interceptions: 1, passDefended: 3, forcedFumbles: 0 }
  },

  // ── SPECIAL TEAMS ─────────────────────────────────────
  {
    id: 40, name: 'Tyler Bass', number: 2, position: 'K', positionGroup: 'Special Teams',
    depthOrder: 1, height: '5\'10"', weight: 183, age: 27, college: 'Georgia Southern',
    draftInfo: '2020 R6 P188', yearsPro: 6,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3917232.png&w=350&h=254',
    interestingFact: 'Made the game-winning field goal in the famous Snow Game in 2022. A potential cap casualty despite being reliable for most of his career.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '24/30 FG, 47/48 XP, long 54', rating: 0.74 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '29/35 FG, 42/43 XP, long 57', rating: 0.78 }
    ],
    arcGauges: { speed: 45, power: 82, footballIQ: 72, accuracy: 80, clutch: 68, durability: 88 },
    stats: { fgMade: 24, fgAttempted: 30, fgPct: 80.0, xpMade: 47, longFG: 54 }
  },
  {
    id: 41, name: 'Sam Martin', number: 6, position: 'P', positionGroup: 'Special Teams',
    depthOrder: 1, height: '6\'1"', weight: 211, age: 33, college: 'Appalachian State',
    draftInfo: '2013 R5 P162', yearsPro: 13,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15868.png&w=350&h=254',
    interestingFact: 'One of the longest-tenured punters in the NFL. Previously spent 8 seasons with the Detroit Lions and holds their franchise record for punting average.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '62 punts, 46.8 avg, 41.2 net, 22 inside 20', rating: 0.72 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: '58 punts, 47.1 avg, 42.0 net, 24 inside 20', rating: 0.74 }
    ],
    arcGauges: { speed: 42, power: 78, footballIQ: 80, accuracy: 84, clutch: 72, durability: 90 },
    stats: { punts: 62, puntAvg: 46.8, netAvg: 41.2, insideTwenty: 22, longPunt: 64 }
  },
  {
    id: 42, name: 'Reid Ferguson', number: 69, position: 'LS', positionGroup: 'Special Teams',
    depthOrder: 1, height: '6\'2"', weight: 240, age: 31, college: 'LSU',
    draftInfo: 'UDFA 2016', yearsPro: 10,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2577667.png&w=350&h=254',
    interestingFact: 'The longest-tenured special teamer on the Bills. Has not had a single bad snap in over 4 consecutive seasons — the longest active streak in the NFL.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: 'Perfect snaps, 0 fumbled snaps', rating: 0.82 },
      { season: '2023', team: 'BUF', gamesPlayed: 17, keyStats: 'Perfect snaps, 0 fumbled snaps', rating: 0.82 }
    ],
    arcGauges: { speed: 40, power: 72, footballIQ: 85, accuracy: 96, clutch: 80, durability: 92 },
    stats: { gamesPlayed: 17, perfectSnaps: true, specialTeamsTackles: 2 }
  },

  // ── ADDITIONAL ROSTER DEPTH ───────────────────────────
  // OL depth
  {
    id: 43, name: 'Alec Anderson', number: 74, position: 'OT', positionGroup: 'Offense',
    depthOrder: 3, height: '6\'5"', weight: 312, age: 27, college: 'UCLA',
    draftInfo: 'UDFA 2022', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4367203.png&w=350&h=254',
    interestingFact: 'A versatile swing tackle who can play both left and right side. Has been a reliable emergency starter whenever called upon.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: 'Swing OT, 25% snap rate, 0 sacks allowed', rating: 0.48 }
    ],
    arcGauges: { speed: 52, power: 78, footballIQ: 68, accuracy: 64, clutch: 55, durability: 76 },
    stats: { gamesStarted: 3, sacksAllowed: 0, penalties: 1, runBlockGrade: 68.0 }
  },
  {
    id: 44, name: 'Sedrick Van Pran-Granger', number: 61, position: 'C', positionGroup: 'Offense',
    depthOrder: 2, height: '6\'4"', weight: 312, age: 23, college: 'Georgia',
    draftInfo: '2024 R3 P93', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4431611.png&w=350&h=254',
    interestingFact: 'Won two national championships at Georgia. Considered one of the smartest young linemen in the league.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: 'Backup C, 15% snap rate, strong in sub packages', rating: 0.48 }
    ],
    arcGauges: { speed: 54, power: 80, footballIQ: 82, accuracy: 74, clutch: 60, durability: 78 },
    stats: { gamesStarted: 2, sacksAllowed: 0, penalties: 1, runBlockGrade: 72.5 }
  },

  // DL depth
  {
    id: 45, name: 'Eli Ankou', number: 94, position: 'DT', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'3"', weight: 325, age: 30, college: 'UCLA',
    draftInfo: 'UDFA 2017', yearsPro: 9,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3045286.png&w=350&h=254',
    interestingFact: 'Born in Ottawa, Canada, and is one of the few Canadian-born defensive tackles in the NFL. A D-line rotational piece who excels on late downs.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 16, keyStats: '18 tkl, 1 sack, 2 TFL', rating: 0.45 }
    ],
    arcGauges: { speed: 55, power: 82, footballIQ: 70, accuracy: 52, clutch: 50, durability: 76 },
    stats: { tackles: 18, sacks: 1, tfl: 2, qbHits: 3 }
  },

  // LB depth
  {
    id: 46, name: 'Tyrel Dodson', number: 53, position: 'LB', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'1"', weight: 237, age: 27, college: 'Texas A&M',
    draftInfo: 'UDFA 2019', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4035232.png&w=350&h=254',
    interestingFact: 'An undrafted player who has carved out a solid career as a dependable backup and special teams regular. Averaged 30+ special teams snaps per game.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '28 tkl, 0.5 sack, 2 TFL, ST contributor', rating: 0.48 }
    ],
    arcGauges: { speed: 78, power: 72, footballIQ: 72, accuracy: 60, clutch: 58, durability: 80 },
    stats: { tackles: 28, sacks: 0.5, tfl: 2, interceptions: 0 }
  },

  // CB depth
  {
    id: 47, name: 'Kaiir Elam', number: 39, position: 'CB', positionGroup: 'Defense',
    depthOrder: 3, height: '6\'2"', weight: 196, age: 24, college: 'Florida',
    draftInfo: '2022 R1 P23', yearsPro: 4,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4372016.png&w=350&h=254',
    interestingFact: 'A former 1st-round pick who has struggled to find consistent playing time. His uncle Matt Elam was also an NFL safety. Working to recapture his draft pedigree.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: '18 tkl, 1 INT, 3 PD', rating: 0.42 },
      { season: '2023', team: 'BUF', gamesPlayed: 12, keyStats: '14 tkl, 0 INT, 2 PD', rating: 0.38 }
    ],
    arcGauges: { speed: 86, power: 68, footballIQ: 60, accuracy: 58, clutch: 52, durability: 72 },
    stats: { tackles: 18, interceptions: 1, passDefended: 3, forcedFumbles: 0 }
  },

  // S depth
  {
    id: 48, name: 'Kareem Jackson', number: 22, position: 'S', positionGroup: 'Defense',
    depthOrder: 3, height: '5\'10"', weight: 183, age: 37, college: 'Alabama',
    draftInfo: '2010 R1 P20', yearsPro: 16,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/13234.png&w=350&h=254',
    interestingFact: 'One of the oldest active players in the NFL. A veteran leader who has played 16 seasons and converted from cornerback to safety later in his career.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 12, keyStats: '24 tkl, 0 INT, 2 PD', rating: 0.40 }
    ],
    arcGauges: { speed: 68, power: 72, footballIQ: 90, accuracy: 65, clutch: 70, durability: 60 },
    stats: { tackles: 24, interceptions: 0, passDefended: 2, forcedFumbles: 0 }
  },

  // Additional depth players to reach 53
  {
    id: 49, name: 'Shane Buechele', number: 8, position: 'QB', positionGroup: 'Offense',
    depthOrder: 3, height: '6\'1"', weight: 210, age: 27, college: 'SMU',
    draftInfo: 'UDFA 2021', yearsPro: 5,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4039034.png&w=350&h=254',
    interestingFact: 'Spent time on the practice squads of Kansas City and Dallas before joining Buffalo. A film-room warrior who helps prepare the scout team each week.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 0, keyStats: 'Emergency QB, practice squad elevation', rating: 0.25 }
    ],
    arcGauges: { speed: 65, power: 58, footballIQ: 72, accuracy: 68, clutch: 45, durability: 70 },
    stats: { passingYards: 0, tds: 0, rating: 0, rushYards: 0 }
  },
  {
    id: 50, name: 'Frank Gore Jr.', number: 33, position: 'RB', positionGroup: 'Offense',
    depthOrder: 3, height: '5\'8"', weight: 205, age: 24, college: 'Southern Miss',
    draftInfo: 'UDFA 2024', yearsPro: 2,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4431607.png&w=350&h=254',
    interestingFact: 'Son of NFL legend Frank Gore, the 3rd all-time leading rusher in NFL history. Primarily used as a kick returner and short-yardage back.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 14, keyStats: '48 rush yds, 1 TD, KR specialist', rating: 0.35 }
    ],
    arcGauges: { speed: 85, power: 70, footballIQ: 62, accuracy: 50, clutch: 55, durability: 72 },
    stats: { rushYards: 48, rushTDs: 1, receptions: 4, recYards: 28 }
  },
  {
    id: 51, name: 'Reggie Gilliam', number: 41, position: 'FB', positionGroup: 'Offense',
    depthOrder: 1, height: '6\'0"', weight: 247, age: 28, college: 'Toledo',
    draftInfo: 'UDFA 2020', yearsPro: 6,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4039505.png&w=350&h=254',
    interestingFact: 'One of the few true fullbacks remaining in the NFL. Played tight end in college and converted to fullback at the pro level. A fan favorite for his blue-collar style.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '8 rec, 62 yds, 2 TD, lead blocker', rating: 0.55 }
    ],
    arcGauges: { speed: 62, power: 84, footballIQ: 75, accuracy: 58, clutch: 68, durability: 82 },
    stats: { receptions: 8, recYards: 62, recTDs: 2, rushYards: 12 }
  },
  {
    id: 52, name: 'Cam Lewis', number: 48, position: 'CB', positionGroup: 'Defense',
    depthOrder: 3, height: '5\'10"', weight: 185, age: 28, college: 'Buffalo',
    draftInfo: 'UDFA 2019', yearsPro: 7,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3916577.png&w=350&h=254',
    interestingFact: 'Played his college ball at the University of Buffalo — a true local product. Primarily a nickel corner and one of the best special teams players in the NFL.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '26 tkl, 0 INT, 3 PD, ST captain', rating: 0.48 }
    ],
    arcGauges: { speed: 82, power: 64, footballIQ: 74, accuracy: 62, clutch: 60, durability: 78 },
    stats: { tackles: 26, interceptions: 0, passDefended: 3, forcedFumbles: 0 }
  },
  {
    id: 53, name: 'Siran Neal', number: 33, position: 'S', positionGroup: 'Special Teams',
    depthOrder: 2, height: '6\'0"', weight: 200, age: 29, college: 'Jacksonville State',
    draftInfo: '2018 R5 P154', yearsPro: 8,
    photoUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3128451.png&w=350&h=254',
    interestingFact: 'Has played safety, cornerback, and linebacker in his career. One of the most versatile special teams players in Bills history.',
    careerHistory: [
      { season: '2024', team: 'BUF', gamesPlayed: 17, keyStats: '14 tkl, ST ace, gunner specialist', rating: 0.45 }
    ],
    arcGauges: { speed: 80, power: 74, footballIQ: 72, accuracy: 58, clutch: 62, durability: 76 },
    stats: { tackles: 14, interceptions: 0, passDefended: 1, forcedFumbles: 0 }
  }
];

// ═══════════════════════════════════════════════════════
// DEPTH CHART — Position groups mapped to player IDs
// ═══════════════════════════════════════════════════════

export const depthChart = {
  QB: [
    { playerId: 1, depth: 1 },
    { playerId: 13, depth: 2 },
    { playerId: 49, depth: 3 }
  ],
  RB: [
    { playerId: 2, depth: 1 },
    { playerId: 14, depth: 2 },
    { playerId: 15, depth: 3 },
    { playerId: 50, depth: 3 },
    { playerId: 51, depth: 1 }  // FB
  ],
  WR: [
    { playerId: 5, depth: 1 },   // WR1 — Shakir
    { playerId: 4, depth: 1 },   // WR2 — Coleman
    { playerId: 6, depth: 2 },   // WR3 — Palmer
    { playerId: 16, depth: 2 },  // WR4 — Samuel
    { playerId: 17, depth: 3 },  // WR5 — Hollins
    { playerId: 18, depth: 3 }   // WR6 — Virgil
  ],
  TE: [
    { playerId: 3, depth: 1 },
    { playerId: 19, depth: 2 },
    { playerId: 20, depth: 3 }
  ],
  OL: [
    { playerId: 21, depth: 1 },  // LT — Dawkins
    { playerId: 24, depth: 1 },  // LG — Edwards
    { playerId: 23, depth: 1 },  // C — McGovern
    { playerId: 25, depth: 1 },  // RG — Torrence
    { playerId: 22, depth: 1 },  // RT — Brown
    { playerId: 26, depth: 2 },  // Swing G — Bates
    { playerId: 43, depth: 3 },  // Swing T — Anderson
    { playerId: 44, depth: 2 }   // Backup C — Van Pran-Granger
  ],
  DL: [
    { playerId: 8, depth: 1 },   // DE — Rousseau
    { playerId: 7, depth: 1 },   // DT — Oliver
    { playerId: 28, depth: 2 },  // DT — Jones
    { playerId: 12, depth: 2 },  // DE — Bosa
    { playerId: 27, depth: 2 },  // DE — Epenesa
    { playerId: 29, depth: 3 },  // DT — Jonathan
    { playerId: 30, depth: 3 },  // DE — Solomon
    { playerId: 45, depth: 3 }   // DT — Ankou
  ],
  LB: [
    { playerId: 9, depth: 1 },   // MLB — Bernard
    { playerId: 31, depth: 1 },  // WLB — D. Williams
    { playerId: 32, depth: 2 },  // Spector
    { playerId: 33, depth: 3 },  // Morrow
    { playerId: 46, depth: 3 }   // Dodson
  ],
  CB: [
    { playerId: 10, depth: 1 },  // CB1 — Benford
    { playerId: 34, depth: 1 },  // Slot — T. Johnson
    { playerId: 35, depth: 2 },  // CB2 — Douglas
    { playerId: 36, depth: 3 },  // Ingram
    { playerId: 47, depth: 3 },  // Elam
    { playerId: 52, depth: 3 }   // Lewis (nickel)
  ],
  S: [
    { playerId: 11, depth: 1 },  // SS — Rapp
    { playerId: 38, depth: 1 },  // FS — M. Edwards
    { playerId: 37, depth: 2 },  // Hamlin
    { playerId: 39, depth: 2 },  // Bishop
    { playerId: 48, depth: 3 },  // K. Jackson
    { playerId: 53, depth: 3 }   // Neal
  ],
  ST: [
    { playerId: 40, depth: 1 },  // K — Bass
    { playerId: 41, depth: 1 },  // P — Martin
    { playerId: 42, depth: 1 }   // LS — Ferguson
  ]
};

// ═══════════════════════════════════════════════════════
// MISSION CONTROL FEED — 18 transmission items
// ═══════════════════════════════════════════════════════

export const missionControlFeed = [
  {
    id: 1, timestamp: '14:32 UTC', priority: 'URGENT',
    category: 'Cap Alert',
    message: 'Bills currently $6.7M OVER the salary cap. Must reach compliance before March 11 free agency window opens. Dawson Knox ($10.4M savings) and Taylor Rapp ($3M savings) are top cut candidates.'
  },
  {
    id: 2, timestamp: '14:18 UTC', priority: 'URGENT',
    category: 'Coaching',
    message: 'DC Jim Leonhard installing 3-4 base defense — major scheme change. OLB and interior DL acquisitions now CRITICAL need for 2026 roster construction.'
  },
  {
    id: 3, timestamp: '13:55 UTC', priority: 'ALERT',
    category: 'Trade Intel',
    message: 'Multiple teams have inquired about Ed Oliver. Post-June 1 trade saves $14.7M in cap space. Bears, Texans, and Cowboys showing interest.'
  },
  {
    id: 4, timestamp: '13:42 UTC', priority: 'INFO',
    category: 'Draft Intel',
    message: 'Bills scouts attended Indiana pro day — heavy interest in WR Omar Cooper Jr. (4.39 forty, 87.4 PFF grade). Fits the deep threat profile Buffalo desperately needs.'
  },
  {
    id: 5, timestamp: '13:28 UTC', priority: 'ALERT',
    category: 'Free Agency',
    message: 'Connor McGovern (C) and David Edwards (LG) both hitting UFA market. Losing both starters would gut interior OL. Re-signing McGovern is top priority.'
  },
  {
    id: 6, timestamp: '12:45 UTC', priority: 'INFO',
    category: 'Player Development',
    message: "Keon Coleman working with new passing game coordinator Harold Carmichael Jr. on route precision. Year 3 breakout potential — physical tools are elite (6'4\", 4.48 speed)."
  },
  {
    id: 7, timestamp: '12:15 UTC', priority: 'URGENT',
    category: 'Injury Update',
    message: 'Matt Milano (LB, pectoral) now a UFA after season-ending IR. Bills unlikely to re-sign at age 30 coming off major injury. LB depth is razor thin.'
  },
  {
    id: 8, timestamp: '11:48 UTC', priority: 'INFO',
    category: 'Stadium',
    message: 'New Highmark Stadium construction at 75% complete. Inaugural game scheduled for September 13, 2026. Naming rights deal extended through 2041.'
  },
  {
    id: 9, timestamp: '11:22 UTC', priority: 'ALERT',
    category: 'Game Analysis',
    message: '5 turnovers in the divisional loss to Denver were the difference. Josh Allen accounted for 4. Ball security in playoff pressure situations remains the #1 offseason priority.'
  },
  {
    id: 10, timestamp: '10:55 UTC', priority: 'INFO',
    category: 'Analytics',
    message: 'James Cook finished with 1,621 rushing yards — best Bills season since Thurman Thomas in 1992. Cook generated 0.14 EPA/rush, 3rd best among qualifying backs.'
  },
  {
    id: 11, timestamp: '10:30 UTC', priority: 'ALERT',
    category: 'Contract',
    message: 'Khalil Shakir extension ($53M/4yr, $13.25M AAV) looks like a bargain after WR1 season. 72 catches on 100 targets = 72% catch rate, highest on the team.'
  },
  {
    id: 12, timestamp: '09:48 UTC', priority: 'INFO',
    category: 'Draft Intel',
    message: 'Bills hold 7 picks in 2026 draft. R1 P26, R2 P58, R3 P90. Top needs: WR, EDGE, LB, S, OL. Deep edge class this year — could trade back from 26 for extra capital.'
  },
  {
    id: 13, timestamp: '09:15 UTC', priority: 'ALERT',
    category: 'Division Rival',
    message: 'Patriots (14-3) won the AFC East and have Super Bowl aspirations. Drake Maye emerging as franchise QB. Bills went 0-2 vs NE in 2025 — must close that gap.'
  },
  {
    id: 14, timestamp: '08:52 UTC', priority: 'INFO',
    category: 'Coaching Staff',
    message: 'Joe Brady retained entire offensive staff. Continuity with Josh Allen is the priority. OC role absorbed by Brady — play-calling remains with the head coach.'
  },
  {
    id: 15, timestamp: '08:30 UTC', priority: 'URGENT',
    category: 'Contract',
    message: 'Joey Bosa 1-year deal ($6.5M) expiring. If he tests free agency, Bills lose their #2 pass rusher. Transition tag ($21.8M) may be necessary if extension talks stall.'
  },
  {
    id: 16, timestamp: '08:15 UTC', priority: 'INFO',
    category: 'Analytics',
    message: 'Bills defense ranked 7th in points allowed (21.5 PPG) but 15th in EPA/play. Bend-but-don\'t-break approach. 3-4 scheme switch aims to generate more negative plays.'
  },
  {
    id: 17, timestamp: '07:45 UTC', priority: 'ALERT',
    category: 'Combine',
    message: 'EDGE Keldric Faulk (Auburn) ran 4.58 at 265 lbs — freak athlete. Fits OLB role in Leonhard\'s 3-4. Bills have private workout scheduled for next week.'
  },
  {
    id: 18, timestamp: '07:20 UTC', priority: 'INFO',
    category: 'Fan Engagement',
    message: '#BillsMafia trending at 52.1K mentions post-coaching change. Sentiment: 48% positive, 22% neutral, 30% negative. New stadium hype driving majority of positive sentiment.'
  }
];

// ═══════════════════════════════════════════════════════
// STAT CONNECTIONS — Pairs for constellation overlay
// ═══════════════════════════════════════════════════════

export const statConnections = [
  ['ppg', 'redZonePct'],
  ['rushingYPG', 'timeOfPossession'],
  ['passingYPG', 'thirdDownPct'],
  ['takeaways', 'turnoversLost'],
  ['ppgAllowed', 'thirdDownPctAllowed']
];
