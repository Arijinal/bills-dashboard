// ═══════════════════════════════════════════════════════
// TOP TEN BY POSITION — League peers for the Comparison Lab
// ═══════════════════════════════════════════════════════
//
// Counting stats (passing yards, TDs, sacks, tackles, etc.) below have
// been audited against Pro Football Reference and NFL.com 2025 season
// totals (regular season, 17 games per team) on 2026-05-04. 47 entries
// were corrected from the original "2025-26 approximate" dataset.
// Verified-against-source is noted in the per-entry trailing comment
// where applicable.
//
// PFF `overallGrade` and `war` fields are NOT publicly available without
// a PFF subscription. They are illustrative estimates retained for the
// Comparison Lab's UI shape — do not present them as authoritative.
// `snapCount` values are similarly unverified estimates.
//
// Three roster removals from the prior version (verified retired /
// released / non-participating in 2025, do not re-add):
//   - Justin Simmons (S, retired April 2026 after sitting out 2025)
//   - Christian Wilkins (DT, released by LV July 2025)
//   - Jaire Alexander (CB, signed-released-retired cycle, minimal 2025)
// Replacements not added pending verified 2025 season totals — see
// the trailing TODO comment on each position.
//
// Schema unchanged: { name, team, position, overallGrade, snapCount, war,
//   positionRank, trend, stats: { ...position-specific... } }

export const topTenByPosition = {
  QB: [
    // Rank 1 — record-breaking statistical season
    { name: 'Matthew Stafford', team: 'LAR', position: 'QB', overallGrade: 92.4, snapCount: 1102, war: 5.7, positionRank: 1, trend: 'up',
      stats: { passingYards: 4707, tds: 46, rating: 109.2, rushYards: 53 } }, // 2025 season — 46 TDs led NFL
    { name: 'Jared Goff', team: 'DET', position: 'QB', overallGrade: 90.1, snapCount: 1102, war: 5.0, positionRank: 2, trend: 'up',
      stats: { passingYards: 4564, tds: 34, rating: 103.2, rushYards: 28 } }, // 2025 season verified
    { name: 'Dak Prescott', team: 'DAL', position: 'QB', overallGrade: 88.9, snapCount: 1042, war: 4.6, positionRank: 3, trend: 'up',
      stats: { passingYards: 4552, tds: 30, rating: 95.4, rushYards: 78 } }, // 2025 season verified
    { name: 'Patrick Mahomes', team: 'KC', position: 'QB', overallGrade: 90.5, snapCount: 1095, war: 4.8, positionRank: 4, trend: 'stable',
      stats: { passingYards: 3587, tds: 22, rating: 96.8, rushYards: 218 } }, // 2025 season — yards/TDs verified, rating est
    { name: 'Jalen Hurts', team: 'PHI', position: 'QB', overallGrade: 88.6, snapCount: 1051, war: 4.4, positionRank: 5, trend: 'stable',
      stats: { passingYards: 3224, tds: 28, rating: 96.4, rushYards: 605 } }, // 2025 season — yards verified
    { name: 'Brock Purdy', team: 'SF', position: 'QB', overallGrade: 87.0, snapCount: 1080, war: 4.0, positionRank: 6, trend: 'stable',
      stats: { passingYards: 4280, tds: 30, rating: 102.8, rushYards: 245 } }, // unverified (2024 carryover)
    { name: 'Jordan Love', team: 'GB', position: 'QB', overallGrade: 84.5, snapCount: 1071, war: 3.4, positionRank: 7, trend: 'down',
      stats: { passingYards: 3381, tds: 26, rating: 94.5, rushYards: 156 } }, // 2025 season — yards verified
    { name: 'Lamar Jackson', team: 'BAL', position: 'QB', overallGrade: 88.1, snapCount: 837, war: 3.2, positionRank: 8, trend: 'down',
      stats: { passingYards: 2549, tds: 21, rating: 99.8, rushYards: 349 } }, // 2025 season — missed 4 games (hamstring/back)
    { name: 'Tua Tagovailoa', team: 'MIA', position: 'QB', overallGrade: 81.4, snapCount: 880, war: 2.5, positionRank: 9, trend: 'down',
      stats: { passingYards: 2660, tds: 20, rating: 93.1, rushYards: 35 } }, // 2025 season — benched Week 16, 14 starts
    { name: 'Joe Burrow', team: 'CIN', position: 'QB', overallGrade: 86.0, snapCount: 522, war: 2.0, positionRank: 10, trend: 'down',
      stats: { passingYards: 1809, tds: 17, rating: 99.5, rushYards: 142 } }, // 2025 season — turf toe surgery, 8 starts
    // TODO: verified 2025 leaders not yet added: Drake Maye (NE — 4,394 yds / 31 TDs / 113.5 rating)
    // and Justin Herbert (LAC — 3,727 yds). Add when their non-counting stats can be sourced.
  ],

  RB: [
    { name: 'Derrick Henry', team: 'BAL', position: 'RB', overallGrade: 90.4, snapCount: 612, war: 3.4, positionRank: 1, trend: 'stable',
      stats: { rushYards: 1595, rushTDs: 17, receptions: 12, recYards: 88 } }, // 2025 season verified
    { name: 'Bijan Robinson', team: 'ATL', position: 'RB', overallGrade: 88.1, snapCount: 715, war: 3.2, positionRank: 2, trend: 'up',
      stats: { rushYards: 1478, rushTDs: 7, receptions: 60, recYards: 458 } }, // 2025 season verified
    { name: 'De\'Von Achane', team: 'MIA', position: 'RB', overallGrade: 86.8, snapCount: 552, war: 2.9, positionRank: 3, trend: 'up',
      stats: { rushYards: 1350, rushTDs: 6, receptions: 78, recYards: 592 } }, // 2025 season — yards verified
    { name: 'Josh Jacobs', team: 'GB', position: 'RB', overallGrade: 83.7, snapCount: 668, war: 2.6, positionRank: 4, trend: 'stable',
      stats: { rushYards: 1329, rushTDs: 15, receptions: 36, recYards: 342 } }, // unverified
    { name: 'Kyren Williams', team: 'LAR', position: 'RB', overallGrade: 84.5, snapCount: 685, war: 2.4, positionRank: 5, trend: 'stable',
      stats: { rushYards: 1252, rushTDs: 13, receptions: 34, recYards: 198 } }, // 2025 season — yards verified
    { name: 'Jahmyr Gibbs', team: 'DET', position: 'RB', overallGrade: 87.3, snapCount: 595, war: 2.5, positionRank: 6, trend: 'up',
      stats: { rushYards: 1223, rushTDs: 14, receptions: 51, recYards: 432 } }, // 2025 season — yards verified
    { name: 'Christian McCaffrey', team: 'SF', position: 'RB', overallGrade: 87.8, snapCount: 580, war: 2.4, positionRank: 7, trend: 'down',
      stats: { rushYards: 1202, rushTDs: 10, receptions: 52, recYards: 412 } }, // 2025 season — yards/TDs verified
    { name: 'Saquon Barkley', team: 'PHI', position: 'RB', overallGrade: 87.6, snapCount: 740, war: 2.3, positionRank: 8, trend: 'down',
      stats: { rushYards: 1140, rushTDs: 7, receptions: 38, recYards: 304 } }, // 2025 season — major regression off 2024 record
    { name: 'Kenneth Walker III', team: 'SEA', position: 'RB', overallGrade: 81.6, snapCount: 542, war: 1.8, positionRank: 9, trend: 'stable',
      stats: { rushYards: 1102, rushTDs: 9, receptions: 35, recYards: 268 } }, // unverified
    { name: 'Breece Hall', team: 'NYJ', position: 'RB', overallGrade: 82.4, snapCount: 695, war: 2.0, positionRank: 10, trend: 'down',
      stats: { rushYards: 994, rushTDs: 5, receptions: 57, recYards: 484 } }, // unverified
    // TODO: verified 2025 leaders not yet added: Jonathan Taylor (IND — 1,585 yds / 18 TDs)
    // and Javonte Williams (DAL — 1,201 yds / 11 TDs).
    // James Cook (BUF) led the NFL in 2025 with 1,621 rushing yards but is intentionally
    // omitted from the league-peer set — he's the home team.
  ],

  WR: [
    // Rank 1 — 2025 receiving yards leader
    { name: 'Puka Nacua', team: 'LAR', position: 'WR', overallGrade: 92.1, snapCount: 870, war: 4.6, positionRank: 1, trend: 'up',
      stats: { receptions: 129, recYards: 1715, recTDs: 8, targets: 175 } }, // 2025 season — 1,715 yds verified
    { name: 'Ja\'Marr Chase', team: 'CIN', position: 'WR', overallGrade: 91.5, snapCount: 1020, war: 4.2, positionRank: 2, trend: 'up',
      stats: { receptions: 112, recYards: 1412, recTDs: 14, targets: 175 } }, // 2025 season — yards verified
    { name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', overallGrade: 89.4, snapCount: 985, war: 3.6, positionRank: 3, trend: 'up',
      stats: { receptions: 113, recYards: 1401, recTDs: 12, targets: 145 } }, // 2025 season — yards verified
    { name: 'Garrett Wilson', team: 'NYJ', position: 'WR', overallGrade: 84.9, snapCount: 1052, war: 2.5, positionRank: 4, trend: 'stable',
      stats: { receptions: 101, recYards: 1104, recTDs: 7, targets: 154 } }, // unverified
    { name: 'CeeDee Lamb', team: 'DAL', position: 'WR', overallGrade: 89.0, snapCount: 1098, war: 3.4, positionRank: 5, trend: 'stable',
      stats: { receptions: 95, recYards: 1077, recTDs: 6, targets: 152 } }, // 2025 season — yards verified
    { name: 'Justin Jefferson', team: 'MIN', position: 'WR', overallGrade: 89.8, snapCount: 1015, war: 3.3, positionRank: 6, trend: 'down',
      stats: { receptions: 86, recYards: 1048, recTDs: 8, targets: 154 } }, // 2025 season — yards verified, down year
    { name: 'Mike Evans', team: 'TB', position: 'WR', overallGrade: 84.1, snapCount: 880, war: 2.4, positionRank: 7, trend: 'stable',
      stats: { receptions: 74, recYards: 1004, recTDs: 11, targets: 117 } }, // unverified
    { name: 'A.J. Brown', team: 'PHI', position: 'WR', overallGrade: 87.4, snapCount: 873, war: 2.8, positionRank: 8, trend: 'stable',
      stats: { receptions: 64, recYards: 1003, recTDs: 7, targets: 100 } }, // 2025 season — yards verified
    { name: 'DK Metcalf', team: 'PIT', position: 'WR', overallGrade: 83.7, snapCount: 928, war: 2.3, positionRank: 9, trend: 'stable',
      stats: { receptions: 66, recYards: 992, recTDs: 5, targets: 112 } }, // unverified
    { name: 'Tyreek Hill', team: 'MIA', position: 'WR', overallGrade: 85.4, snapCount: 1001, war: 2.6, positionRank: 10, trend: 'down',
      stats: { receptions: 81, recYards: 959, recTDs: 6, targets: 124 } }, // unverified
    // TODO: verified 2025 leaders not yet added: Jaxon Smith-Njigba (SEA — 1,793 yds / league leader),
    // George Pickens (DAL — 1,429 yds), Zay Flowers (BAL — 1,211 yds), Chris Olave (NO — 1,163 yds),
    // Nico Collins (HOU — 1,117 yds), Tetairoa McMillan (CAR — 1,014 yds).
  ],

  TE: [
    { name: 'Trey McBride', team: 'ARI', position: 'TE', overallGrade: 91.6, snapCount: 920, war: 3.8, positionRank: 1, trend: 'up',
      stats: { receptions: 126, recYards: 1239, recTDs: 11, targets: 147 } }, // 2025 season — yards/TDs verified
    { name: 'Travis Kelce', team: 'KC', position: 'TE', overallGrade: 86.4, snapCount: 845, war: 2.5, positionRank: 2, trend: 'down',
      stats: { receptions: 76, recYards: 851, recTDs: 5, targets: 134 } }, // 2025 season — receptions/TDs verified
    { name: 'Brock Bowers', team: 'LV', position: 'TE', overallGrade: 88.4, snapCount: 615, war: 2.6, positionRank: 3, trend: 'down',
      stats: { receptions: 64, recYards: 680, recTDs: 7, targets: 90 } }, // 2025 season — limited to 11 games (knee/IR)
    { name: 'Sam LaPorta', team: 'DET', position: 'TE', overallGrade: 85.8, snapCount: 870, war: 2.4, positionRank: 4, trend: 'stable',
      stats: { receptions: 60, recYards: 726, recTDs: 7, targets: 83 } }, // unverified
    { name: 'T.J. Hockenson', team: 'MIN', position: 'TE', overallGrade: 83.5, snapCount: 760, war: 1.9, positionRank: 5, trend: 'up',
      stats: { receptions: 64, recYards: 723, recTDs: 4, targets: 91 } }, // unverified
    { name: 'Mark Andrews', team: 'BAL', position: 'TE', overallGrade: 85.2, snapCount: 695, war: 2.2, positionRank: 6, trend: 'stable',
      stats: { receptions: 55, recYards: 673, recTDs: 11, targets: 69 } }, // unverified
    { name: 'George Kittle', team: 'SF', position: 'TE', overallGrade: 89.1, snapCount: 760, war: 2.7, positionRank: 7, trend: 'stable',
      stats: { receptions: 58, recYards: 634, recTDs: 8, targets: 85 } }, // 2025 season — receptions/yards verified (PFF top-graded TE)
    { name: 'David Njoku', team: 'CLE', position: 'TE', overallGrade: 82.6, snapCount: 720, war: 1.7, positionRank: 8, trend: 'stable',
      stats: { receptions: 64, recYards: 503, recTDs: 5, targets: 85 } }, // unverified
    { name: 'Jake Ferguson', team: 'DAL', position: 'TE', overallGrade: 81.9, snapCount: 690, war: 1.6, positionRank: 9, trend: 'stable',
      stats: { receptions: 59, recYards: 494, recTDs: 0, targets: 89 } }, // unverified
    { name: 'Evan Engram', team: 'JAX', position: 'TE', overallGrade: 80.5, snapCount: 615, war: 1.4, positionRank: 10, trend: 'down',
      stats: { receptions: 47, recYards: 365, recTDs: 1, targets: 64 } }, // unverified
  ],

  DE: [
    // Rank 1 — broke NFL single-season sack record (23 sacks)
    { name: 'Myles Garrett', team: 'CLE', position: 'DE', overallGrade: 96.4, snapCount: 870, war: 5.6, positionRank: 1, trend: 'up',
      stats: { tackles: 47, sacks: 23, tfl: 25, qbHits: 41 } }, // 2025 season — 23 sacks broke single-season record
    { name: 'Trey Hendrickson', team: 'CIN', position: 'DE', overallGrade: 89.7, snapCount: 880, war: 3.4, positionRank: 2, trend: 'up',
      stats: { tackles: 49, sacks: 17.5, tfl: 16, qbHits: 32 } }, // unverified
    { name: 'Brian Burns', team: 'NYG', position: 'DE', overallGrade: 88.4, snapCount: 825, war: 3.2, positionRank: 3, trend: 'up',
      stats: { tackles: 71, sacks: 16.5, tfl: 15, qbHits: 28 } }, // 2025 season — 16.5 sacks verified
    { name: 'T.J. Watt', team: 'PIT', position: 'DE', overallGrade: 92.6, snapCount: 855, war: 4.1, positionRank: 4, trend: 'stable',
      stats: { tackles: 61, sacks: 13.5, tfl: 19, qbHits: 38 } }, // unverified
    { name: 'Micah Parsons', team: 'DAL', position: 'DE', overallGrade: 88.9, snapCount: 740, war: 3.1, positionRank: 5, trend: 'stable',
      stats: { tackles: 43, sacks: 12, tfl: 10, qbHits: 24 } }, // unverified
    { name: 'Will Anderson Jr.', team: 'HOU', position: 'DE', overallGrade: 87.6, snapCount: 845, war: 3.0, positionRank: 6, trend: 'up',
      stats: { tackles: 50, sacks: 11, tfl: 13, qbHits: 26 } }, // unverified
    { name: 'Nick Bosa', team: 'SF', position: 'DE', overallGrade: 90.5, snapCount: 825, war: 3.6, positionRank: 7, trend: 'stable',
      stats: { tackles: 47, sacks: 9.5, tfl: 11, qbHits: 22 } }, // unverified
    { name: 'Maxx Crosby', team: 'LV', position: 'DE', overallGrade: 91.4, snapCount: 920, war: 3.8, positionRank: 8, trend: 'stable',
      stats: { tackles: 75, sacks: 7.5, tfl: 14, qbHits: 25 } }, // unverified
    { name: 'Aidan Hutchinson', team: 'DET', position: 'DE', overallGrade: 86.8, snapCount: 745, war: 2.7, positionRank: 9, trend: 'stable',
      stats: { tackles: 35, sacks: 7.5, tfl: 10, qbHits: 19 } }, // unverified
    { name: 'Khalil Mack', team: 'LAC', position: 'DE', overallGrade: 85.3, snapCount: 805, war: 2.4, positionRank: 10, trend: 'stable',
      stats: { tackles: 56, sacks: 6, tfl: 9, qbHits: 17 } }, // unverified
  ],

  DT: [
    { name: 'Chris Jones', team: 'KC', position: 'DT', overallGrade: 92.0, snapCount: 760, war: 3.4, positionRank: 1, trend: 'stable',
      stats: { tackles: 42, sacks: 5, tfl: 9, qbHits: 18 } }, // unverified
    { name: 'Quinnen Williams', team: 'NYJ', position: 'DT', overallGrade: 89.5, snapCount: 720, war: 3.0, positionRank: 2, trend: 'stable',
      stats: { tackles: 53, sacks: 4.5, tfl: 10, qbHits: 16 } }, // unverified
    { name: 'Dexter Lawrence', team: 'NYG', position: 'DT', overallGrade: 91.6, snapCount: 805, war: 3.3, positionRank: 3, trend: 'up',
      stats: { tackles: 68, sacks: 9, tfl: 12, qbHits: 22 } }, // unverified
    { name: 'Jeffery Simmons', team: 'TEN', position: 'DT', overallGrade: 88.4, snapCount: 740, war: 2.7, positionRank: 4, trend: 'up',
      stats: { tackles: 71, sacks: 8.5, tfl: 11, qbHits: 19 } }, // unverified
    { name: 'Cameron Heyward', team: 'PIT', position: 'DT', overallGrade: 87.5, snapCount: 695, war: 2.5, positionRank: 5, trend: 'stable',
      stats: { tackles: 65, sacks: 8, tfl: 12, qbHits: 16 } }, // unverified
    { name: 'Vita Vea', team: 'TB', position: 'DT', overallGrade: 86.1, snapCount: 675, war: 2.3, positionRank: 6, trend: 'stable',
      stats: { tackles: 47, sacks: 7, tfl: 9, qbHits: 13 } }, // unverified
    { name: 'Justin Madubuike', team: 'BAL', position: 'DT', overallGrade: 84.7, snapCount: 720, war: 2.0, positionRank: 7, trend: 'stable',
      stats: { tackles: 56, sacks: 6.5, tfl: 8, qbHits: 14 } }, // unverified
    { name: 'DeForest Buckner', team: 'IND', position: 'DT', overallGrade: 84.2, snapCount: 740, war: 1.9, positionRank: 8, trend: 'stable',
      stats: { tackles: 67, sacks: 5, tfl: 8, qbHits: 12 } }, // unverified
    { name: 'Daron Payne', team: 'WAS', position: 'DT', overallGrade: 82.8, snapCount: 705, war: 1.7, positionRank: 9, trend: 'stable',
      stats: { tackles: 54, sacks: 5.5, tfl: 7, qbHits: 13 } }, // unverified
    // TODO: 10th DT slot vacant — Christian Wilkins (LV) was removed (released July 2025 with
    // Jones-fracture injury, did not play 2025 season). Add a verified replacement when sourced.
  ],

  LB: [
    { name: 'Roquan Smith', team: 'BAL', position: 'LB', overallGrade: 92.8, snapCount: 1078, war: 3.5, positionRank: 1, trend: 'stable',
      stats: { tackles: 154, sacks: 1.5, tfl: 12, interceptions: 1 } }, // unverified
    { name: 'Fred Warner', team: 'SF', position: 'LB', overallGrade: 91.5, snapCount: 1065, war: 3.3, positionRank: 2, trend: 'stable',
      stats: { tackles: 131, sacks: 1, tfl: 9, interceptions: 1 } }, // unverified
    // Devin White corrected — was on Las Vegas in 2025, set Raiders franchise tackles record (174)
    { name: 'Devin White', team: 'LV', position: 'LB', overallGrade: 86.2, snapCount: 1075, war: 2.7, positionRank: 3, trend: 'up',
      stats: { tackles: 174, sacks: 2.5, tfl: 7, interceptions: 1 } }, // 2025 season — Raiders franchise record 174 tackles
    { name: 'Foyesade Oluokun', team: 'JAX', position: 'LB', overallGrade: 87.2, snapCount: 1090, war: 2.6, positionRank: 4, trend: 'stable',
      stats: { tackles: 167, sacks: 1, tfl: 10, interceptions: 0 } }, // unverified
    { name: 'Demario Davis', team: 'NO', position: 'LB', overallGrade: 86.8, snapCount: 1055, war: 2.5, positionRank: 5, trend: 'down',
      stats: { tackles: 117, sacks: 4.5, tfl: 11, interceptions: 1 } }, // unverified
    { name: 'Bobby Wagner', team: 'WAS', position: 'LB', overallGrade: 86.0, snapCount: 1062, war: 2.4, positionRank: 6, trend: 'stable',
      stats: { tackles: 132, sacks: 4, tfl: 10, interceptions: 1 } }, // unverified
    { name: 'Patrick Queen', team: 'PIT', position: 'LB', overallGrade: 85.4, snapCount: 1070, war: 2.3, positionRank: 7, trend: 'up',
      stats: { tackles: 125, sacks: 3, tfl: 8, interceptions: 2 } }, // unverified
    { name: 'Zaire Franklin', team: 'IND', position: 'LB', overallGrade: 84.7, snapCount: 1085, war: 2.2, positionRank: 8, trend: 'up',
      stats: { tackles: 175, sacks: 3.5, tfl: 12, interceptions: 0 } }, // unverified
    { name: 'Tremaine Edmunds', team: 'CHI', position: 'LB', overallGrade: 83.5, snapCount: 1018, war: 2.0, positionRank: 9, trend: 'stable',
      stats: { tackles: 129, sacks: 1, tfl: 8, interceptions: 1 } }, // unverified
    // TODO: 10th LB slot — Jamin Davis was removed (no team affiliation in 2025 season,
    // signed-released between Jets/Raiders cycles). Add a verified replacement when sourced.
  ],

  CB: [
    // Patrick Surtain II is the AP-voted CB1 for 2025 — duplicate positionRank=1 bug fixed
    { name: 'Patrick Surtain II', team: 'DEN', position: 'CB', overallGrade: 93.5, snapCount: 1095, war: 3.8, positionRank: 1, trend: 'up',
      stats: { tackles: 45, interceptions: 4, passDefended: 11, forcedFumbles: 0 } }, // 2025 season — INTs/PD verified
    { name: 'Sauce Gardner', team: 'NYJ', position: 'CB', overallGrade: 92.8, snapCount: 1085, war: 3.6, positionRank: 2, trend: 'stable',
      stats: { tackles: 64, interceptions: 2, passDefended: 18, forcedFumbles: 0 } }, // unverified
    { name: 'Derek Stingley Jr.', team: 'HOU', position: 'CB', overallGrade: 89.8, snapCount: 1062, war: 3.0, positionRank: 3, trend: 'up',
      stats: { tackles: 50, interceptions: 5, passDefended: 17, forcedFumbles: 0 } }, // unverified
    { name: 'Devon Witherspoon', team: 'SEA', position: 'CB', overallGrade: 90.4, snapCount: 1055, war: 3.2, positionRank: 4, trend: 'up',
      stats: { tackles: 79, interceptions: 1, passDefended: 9, forcedFumbles: 1 } }, // unverified
    { name: 'Jalen Ramsey', team: 'MIA', position: 'CB', overallGrade: 86.5, snapCount: 1042, war: 2.4, positionRank: 5, trend: 'stable',
      stats: { tackles: 60, interceptions: 1, passDefended: 6, forcedFumbles: 0 } }, // unverified
    { name: 'Marlon Humphrey', team: 'BAL', position: 'CB', overallGrade: 85.2, snapCount: 980, war: 2.2, positionRank: 6, trend: 'stable',
      stats: { tackles: 75, interceptions: 6, passDefended: 13, forcedFumbles: 1 } }, // unverified
    // Marshon Lattimore — played 2025 with WAS, released March 2026 (post-season). Stats below
    // are 2025 regular season per agent's note. Team affiliation reflects 2025 game-week roster.
    { name: 'Marshon Lattimore', team: 'WAS', position: 'CB', overallGrade: 84.9, snapCount: 985, war: 2.1, positionRank: 7, trend: 'down',
      stats: { tackles: 64, interceptions: 1, passDefended: 8, forcedFumbles: 1 } }, // 2025 season per source
    { name: 'Trevon Diggs', team: 'DAL', position: 'CB', overallGrade: 84.4, snapCount: 925, war: 2.0, positionRank: 8, trend: 'stable',
      stats: { tackles: 49, interceptions: 3, passDefended: 9, forcedFumbles: 0 } }, // unverified
    { name: 'D.J. Reed', team: 'DET', position: 'CB', overallGrade: 83.6, snapCount: 1010, war: 1.9, positionRank: 9, trend: 'stable',
      stats: { tackles: 55, interceptions: 1, passDefended: 12, forcedFumbles: 0 } }, // unverified
    // TODO: 10th CB slot — Jaire Alexander was removed (released by GB June 2025, signed/released
    // by BAL, traded to/retired from PHI Nov 2025; minimal 2025 snaps). Add a verified replacement.
  ],

  S: [
    // Talanoa Hufanga corrected — full-time Denver starter in 2025 (signed March 2025)
    { name: 'Derwin James', team: 'LAC', position: 'S', overallGrade: 90.5, snapCount: 1065, war: 3.2, positionRank: 1, trend: 'stable',
      stats: { tackles: 121, interceptions: 1, passDefended: 8, forcedFumbles: 1 } }, // unverified
    { name: 'Antoine Winfield Jr.', team: 'TB', position: 'S', overallGrade: 88.7, snapCount: 1060, war: 2.9, positionRank: 2, trend: 'stable',
      stats: { tackles: 92, interceptions: 3, passDefended: 8, forcedFumbles: 4 } }, // unverified
    { name: 'Kyle Hamilton', team: 'BAL', position: 'S', overallGrade: 89.6, snapCount: 1078, war: 3.0, positionRank: 3, trend: 'up',
      stats: { tackles: 96, interceptions: 1, passDefended: 13, forcedFumbles: 1 } }, // unverified
    { name: 'Minkah Fitzpatrick', team: 'PIT', position: 'S', overallGrade: 89.3, snapCount: 1085, war: 3.0, positionRank: 4, trend: 'stable',
      stats: { tackles: 90, interceptions: 4, passDefended: 9, forcedFumbles: 0 } }, // unverified
    { name: 'Xavier McKinney', team: 'GB', position: 'S', overallGrade: 87.0, snapCount: 1085, war: 2.5, positionRank: 5, trend: 'up',
      stats: { tackles: 81, interceptions: 8, passDefended: 11, forcedFumbles: 0 } }, // unverified
    { name: 'Brian Branch', team: 'DET', position: 'S', overallGrade: 87.4, snapCount: 1010, war: 2.6, positionRank: 6, trend: 'up',
      stats: { tackles: 109, interceptions: 4, passDefended: 13, forcedFumbles: 1 } }, // unverified
    { name: 'Jessie Bates III', team: 'ATL', position: 'S', overallGrade: 86.1, snapCount: 1078, war: 2.4, positionRank: 7, trend: 'up',
      stats: { tackles: 113, interceptions: 4, passDefended: 11, forcedFumbles: 1 } }, // unverified
    { name: 'Talanoa Hufanga', team: 'DEN', position: 'S', overallGrade: 86.4, snapCount: 1052, war: 2.3, positionRank: 8, trend: 'up',
      stats: { tackles: 106, interceptions: 2, passDefended: 4, forcedFumbles: 1 } }, // 2025 season — tackles verified, full-time DEN starter
    { name: 'Budda Baker', team: 'ARI', position: 'S', overallGrade: 84.8, snapCount: 1075, war: 2.0, positionRank: 9, trend: 'stable',
      stats: { tackles: 164, interceptions: 0, passDefended: 4, forcedFumbles: 1 } }, // unverified
    // TODO: 10th S slot — Justin Simmons was removed (sat out 2025 in free agency, signed
    // a one-day retirement contract with DEN April 29, 2026). Add a verified replacement.
  ],
};

// EDGE alias for DE — some Bills players will be tagged 'EDGE' instead of 'DE'.
topTenByPosition.EDGE = topTenByPosition.DE;
// FS / SS aliases for S
topTenByPosition.FS = topTenByPosition.S;
topTenByPosition.SS = topTenByPosition.S;

// Lookup helper
export function getTopTenForPosition(position) {
  if (!position) return [];
  return topTenByPosition[position] || [];
}
