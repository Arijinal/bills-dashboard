// ═══════════════════════════════════════════════════════
// PFF-STYLE ANALYTICS — Team & Player Grades
// 2025-2026 Buffalo Bills Season Data (mock)
// ═══════════════════════════════════════════════════════

// ── Team-Level Grades ───────────────────────────────────

export const teamGrades = {
  overall: 82.4,
  offense: {
    overall: 79.8,
    passing: 88.1,
    rushing: 74.2,
    receiving: 81.5,
    passBlocking: 72.3,
    runBlocking: 68.9,
  },
  defense: {
    overall: 85.1,
    passRush: 82.7,
    coverage: 87.3,
    runDefense: 78.4,
    tackling: 84.2,
  },
  specialTeams: 71.6,
};

// ── Top 20 Player Grades ────────────────────────────────

export const playerGrades = [
  { name: 'Josh Allen', position: 'QB', overallGrade: 91.2, snapCount: 1105, war: 5.8, positionRank: 3, trend: 'stable' },
  { name: 'Christian Benford', position: 'CB', overallGrade: 89.4, snapCount: 1048, war: 3.2, positionRank: 6, trend: 'up' },
  { name: 'James Cook', position: 'RB', overallGrade: 88.7, snapCount: 682, war: 3.5, positionRank: 2, trend: 'up' },
  { name: 'Greg Rousseau', position: 'DE', overallGrade: 86.5, snapCount: 892, war: 2.8, positionRank: 12, trend: 'up' },
  { name: 'Terrel Bernard', position: 'LB', overallGrade: 84.8, snapCount: 1062, war: 2.4, positionRank: 9, trend: 'up' },
  { name: 'Rasul Douglas', position: 'CB', overallGrade: 83.6, snapCount: 978, war: 2.1, positionRank: 15, trend: 'stable' },
  { name: 'Khalil Shakir', position: 'WR', overallGrade: 82.9, snapCount: 945, war: 1.9, positionRank: 18, trend: 'stable' },
  { name: 'Ed Oliver', position: 'DT', overallGrade: 82.4, snapCount: 545, war: 1.6, positionRank: 14, trend: 'down' },
  { name: 'Connor McGovern', position: 'C', overallGrade: 81.8, snapCount: 1105, war: 1.4, positionRank: 8, trend: 'stable' },
  { name: 'Taron Johnson', position: 'CB', overallGrade: 80.5, snapCount: 968, war: 1.8, positionRank: 22, trend: 'down' },
  { name: 'Dion Dawkins', position: 'OT', overallGrade: 79.2, snapCount: 1060, war: 1.3, positionRank: 18, trend: 'down' },
  { name: 'Dorian Williams', position: 'LB', overallGrade: 78.6, snapCount: 894, war: 1.5, positionRank: 20, trend: 'up' },
  { name: "O'Cyrus Torrence", position: 'OG', overallGrade: 77.8, snapCount: 1078, war: 1.2, positionRank: 16, trend: 'up' },
  { name: 'Taylor Rapp', position: 'S', overallGrade: 76.4, snapCount: 1042, war: 1.0, positionRank: 24, trend: 'down' },
  { name: 'Dalton Kincaid', position: 'TE', overallGrade: 76.1, snapCount: 728, war: 1.1, positionRank: 12, trend: 'stable' },
  { name: 'Spencer Brown', position: 'OT', overallGrade: 74.5, snapCount: 1085, war: 0.8, positionRank: 32, trend: 'stable' },
  { name: 'Mike Edwards', position: 'S', overallGrade: 73.8, snapCount: 845, war: 0.9, positionRank: 28, trend: 'down' },
  { name: 'Joey Bosa', position: 'DE', overallGrade: 72.6, snapCount: 548, war: 0.7, positionRank: 28, trend: 'down' },
  { name: 'Keon Coleman', position: 'WR', overallGrade: 68.4, snapCount: 785, war: 0.3, positionRank: 52, trend: 'down' },
  { name: 'Dawson Knox', position: 'TE', overallGrade: 62.1, snapCount: 612, war: -0.1, positionRank: 34, trend: 'down' },
];

// ── Weekly Team Grades ──────────────────────────────────

export const weeklyGrades = [
  { week: 1, opponent: 'ARI', result: 'W 31-17', offenseGrade: 84.2, defenseGrade: 88.5, overallGrade: 86.3 },
  { week: 2, opponent: '@MIA', result: 'L 24-27', offenseGrade: 72.1, defenseGrade: 68.4, overallGrade: 70.2 },
  { week: 3, opponent: 'JAX', result: 'W 38-14', offenseGrade: 91.4, defenseGrade: 90.8, overallGrade: 91.1 },
  { week: 4, opponent: '@NE', result: 'L 20-28', offenseGrade: 58.6, defenseGrade: 62.3, overallGrade: 60.4 },
  { week: 5, opponent: 'HOU', result: 'W 34-21', offenseGrade: 85.8, defenseGrade: 82.1, overallGrade: 83.9 },
  { week: 6, opponent: '@NYJ', result: 'L 17-24', offenseGrade: 61.2, defenseGrade: 65.8, overallGrade: 63.5 },
  { week: 7, opponent: 'TEN', result: 'W 35-13', offenseGrade: 88.4, defenseGrade: 91.2, overallGrade: 89.8 },
  { week: 8, opponent: '@SEA', result: 'W 27-24', offenseGrade: 76.5, defenseGrade: 78.9, overallGrade: 77.7 },
  { week: 9, opponent: 'MIA', result: 'W 41-20', offenseGrade: 93.1, defenseGrade: 86.4, overallGrade: 89.7 },
  { week: 10, opponent: '@IND', result: 'L 21-30', offenseGrade: 55.8, defenseGrade: 59.2, overallGrade: 57.5 },
  { week: 11, opponent: 'KC', result: 'W 28-24', offenseGrade: 82.4, defenseGrade: 84.6, overallGrade: 83.5 },
  { week: 12, opponent: '@SF', result: 'W 23-20', offenseGrade: 74.8, defenseGrade: 80.2, overallGrade: 77.5 },
  { week: 13, opponent: 'NE', result: 'W 33-10', offenseGrade: 86.2, defenseGrade: 92.4, overallGrade: 89.3 },
  { week: 14, opponent: '@LAR', result: 'L 24-31', offenseGrade: 68.4, defenseGrade: 60.1, overallGrade: 64.2 },
  { week: 15, opponent: 'DET', result: 'W 30-17', offenseGrade: 82.6, defenseGrade: 86.8, overallGrade: 84.7 },
  { week: 16, opponent: '@NYJ', result: 'W 27-21', offenseGrade: 78.4, defenseGrade: 80.5, overallGrade: 79.4 },
  { week: 17, opponent: 'ATL', result: 'W 28-24', offenseGrade: 76.8, defenseGrade: 78.2, overallGrade: 77.5 },
];

// ── Position Group Grades ───────────────────────────────

export const positionGroupGrades = [
  { group: 'Quarterback', grade: 91.2, rank: 3, topPlayer: 'Josh Allen (91.2)', bottomPlayer: 'Mitchell Trubisky (52.4)' },
  { group: 'Running Back', grade: 85.4, rank: 4, topPlayer: 'James Cook (88.7)', bottomPlayer: 'Ty Johnson (58.2)' },
  { group: 'Wide Receiver', grade: 72.8, rank: 22, topPlayer: 'Khalil Shakir (82.9)', bottomPlayer: 'Jalen Virgil (48.6)' },
  { group: 'Tight End', grade: 71.4, rank: 16, topPlayer: 'Dalton Kincaid (76.1)', bottomPlayer: 'Quintin Morris (55.2)' },
  { group: 'Offensive Line', grade: 74.6, rank: 15, topPlayer: 'Connor McGovern (81.8)', bottomPlayer: 'Alec Anderson (60.4)' },
  { group: 'Edge Defender', grade: 80.2, rank: 10, topPlayer: 'Greg Rousseau (86.5)', bottomPlayer: 'Javon Solomon (62.8)' },
  { group: 'Interior DL', grade: 76.8, rank: 12, topPlayer: 'Ed Oliver (82.4)', bottomPlayer: 'Eli Ankou (58.4)' },
  { group: 'Linebacker', grade: 78.4, rank: 11, topPlayer: 'Terrel Bernard (84.8)', bottomPlayer: 'Nicholas Morrow (60.2)' },
  { group: 'Cornerback', grade: 82.6, rank: 7, topPlayer: 'Christian Benford (89.4)', bottomPlayer: 'Kaiir Elam (54.8)' },
  { group: 'Safety', grade: 74.2, rank: 18, topPlayer: 'Taylor Rapp (76.4)', bottomPlayer: 'Kareem Jackson (52.6)' },
  { group: 'Special Teams', grade: 71.6, rank: 19, topPlayer: 'Reid Ferguson (82.0)', bottomPlayer: 'Tyler Bass (68.4)' },
];

// ── Advanced Metrics ────────────────────────────────────

export const advancedMetrics = {
  offense: {
    epaPerPlay: 0.085,       // 6th in NFL
    successRate: 0.464,       // 9th
    explosivePlayRate: 0.128, // 4th
    stuffedRunRate: 0.152,    // 18th
    pressureRate: 0.321,      // 26th — area of concern
    blitzPickupRate: 0.584,   // 22nd
    redZoneTdRate: 0.556,     // 14th
    thirdDownRate: 0.428,     // 8th
  },
  defense: {
    epaPerPlay: -0.068,       // 7th in NFL
    successRate: 0.382,       // 5th
    explosivePlayRate: 0.088, // 4th
    stuffedRunRate: 0.208,    // 12th
    pressureRate: 0.286,      // 11th
    blitzRate: 0.312,         // 14th
    redZoneTdRate: 0.465,     // 9th
    thirdDownRate: 0.368,     // 10th
  },
  overall: {
    srsRating: 5.8,           // Simple Rating System
    dvoa: 18.4,               // DVOA percentage
    winProbabilityAdded: 3.2, // wins over expected
    pythagoreanWins: 11.4,    // expected wins from point differential
  },
};

// ── Snap Count Summary ──────────────────────────────────

export const snapCountSummary = {
  offense: {
    totalPlays: 1105,
    passPlays: 586,
    runPlays: 519,
    passPct: 53.0,
    runPct: 47.0,
    playActionRate: 28.4,
    rpoRate: 12.1,
    shotgunRate: 72.8,
    underCenterRate: 27.2,
    noHuddleRate: 18.5,
    tempoPlays: 142,
  },
  defense: {
    totalSnaps: 1068,
    basePlays: 284,  // 3-4 / 4-3 base
    nickelPlays: 548,
    dimePlays: 182,
    otherPlays: 54,
    blitzSnaps: 334,
    stunts: 186,
    coverageBreakdown: {
      cover1: 22.4,
      cover2: 18.8,
      cover3: 34.2,
      cover4: 14.6,
      cover6: 10.0,
    },
  },
};
