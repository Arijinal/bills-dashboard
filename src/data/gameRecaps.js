/**
 * gameRecaps — per-week recap data, keyed by week number.
 *
 * Used by the Footprint cells in SundayReckoningScene + anywhere a fan
 * clicks a W/L. Each entry powers GameRecapModal.
 *
 * The narrative beats are aligned to Uncle Jr.'s Vol.1 Issue 1 dispatch:
 * 4-0 start, the Patriots Wk5 wake-up, Texans Wk12 head-to-head L,
 * the Pats 35-31 December comeback at Foxborough, divisional OT loss.
 */

export const gameRecaps = {
  1: {
    week: 1, date: 'Sep 7, 2025',
    opponent: 'Arizona Cardinals', location: 'Highmark Stadium',
    result: 'W', score: { bills: 31, opp: 17 },
    headline: "Bills open the lid with 31-17 — Allen looks midseason in shorts.",
    keyStats: [
      { label: 'YPP', value: '6.4', edge: 'BUF' },
      { label: 'TURNOVERS', value: '0—2', edge: 'BUF' },
      { label: 'SACKS', value: '4—1', edge: 'BUF' },
      { label: '3RD DOWN', value: '8/13', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q1 11:42', play: 'Cook 38-yd TD run on the second snap of the season — set the tone.' },
      { time: 'Q3 4:11', play: 'Benford pick-six off Murray under pressure from Bosa.' },
    ],
    turningPoint: 'Cook touched the ball nine times in the first quarter for 84 yards. Cardinals never recovered.',
    uncleJrTake: "Looked good, but Arizona was a tune-up, son. Don't get drunk on Week 1 numbers — wait 'til the AFC East comes knockin'.",
  },
  2: {
    week: 2, date: 'Sep 14, 2025',
    opponent: 'Miami Dolphins', location: 'Hard Rock Stadium',
    result: 'L', score: { bills: 24, opp: 27 },
    headline: "Trip to Miami ends with a missed FG — Tua finds the seam at the buzzer.",
    keyStats: [
      { label: 'YPP', value: '5.1', edge: 'OPP' },
      { label: 'RED ZONE', value: '2/4', edge: 'OPP' },
      { label: 'TIME OF POSS', value: '27:32', edge: 'OPP' },
      { label: 'SACKS', value: '1—3', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'Q4 1:18', play: 'Hill 41-yd seam route on 3rd-and-12 — coverage bust.' },
      { time: 'Q4 0:03', play: 'Bass 47-yd FG miss wide left, no time on the clock.' },
    ],
    turningPoint: '3rd-and-12 with 1:18 left — soft zone, Hill behind it. Whole game right there.',
    uncleJrTake: "I been preachin' on third-and-long for the longest. You can't play prevent against Tua and pretend it's a defense. PAUSE.",
  },
  3: {
    week: 3, date: 'Sep 21, 2025',
    opponent: 'Jacksonville Jaguars', location: 'Highmark Stadium',
    result: 'W', score: { bills: 38, opp: 14 },
    headline: "Bills cruise 38-14 — Allen 4 TDs, defense forces 3 takeaways.",
    keyStats: [
      { label: 'YPP', value: '7.9', edge: 'BUF' },
      { label: 'TAKEAWAYS', value: '3—0', edge: 'BUF' },
      { label: 'PRESSURES', value: '14—5', edge: 'BUF' },
      { label: '3RD DOWN', value: '9/13', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q1 8:22', play: 'Skyler Bell 67-yd TD on a slot fade — first NFL touchdown.' },
      { time: 'Q3 12:04', play: 'Greg Rousseau strip-sack, Von Miller scoops, runs it 24 yards.' },
    ],
    turningPoint: "Bell's first NFL TD on a 67-yard slot fade. The kid stayed up all night studyin'.",
    uncleJrTake: "My nephew Dwayne called me from Cheektowaga 'fore the game told me Bell would go off. The boy was right.",
  },
  4: {
    week: 4, date: 'Sep 28, 2025',
    opponent: 'New England Patriots', location: 'Gillette Stadium',
    result: 'L', score: { bills: 20, opp: 28 },
    headline: "Maye and Henderson walk it down our throat — first loss to the Pats since '21.",
    keyStats: [
      { label: 'RUSH YDS', value: '78—187', edge: 'OPP' },
      { label: 'YDS/CARRY', value: '3.2—5.8', edge: 'OPP' },
      { label: 'TIME OF POSS', value: '24:11', edge: 'OPP' },
      { label: 'PRESSURES', value: '4—11', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'Q2 5:22', play: 'Henderson 41-yd TD run — A-gap blew open, LB lost contain.' },
      { time: 'Q4 2:04', play: 'Maye 3rd-and-7 scramble for 22 yards, ices the game.' },
    ],
    turningPoint: 'Henderson 187 yards on 32 carries. We did not fit a gap once.',
    uncleJrTake: "I been preachin' on the front seven for the LONGEST. You can't go 17-0 if your D-line gets washed on third-and-short. Riddle me this — when does it click?",
  },
  5: {
    week: 5, date: 'Oct 5, 2025',
    opponent: 'Houston Texans', location: 'Highmark Stadium',
    result: 'W', score: { bills: 34, opp: 21 },
    headline: "Bills bounce back, beat the Texans 34-21 — Bell 8 catches, 132 yards.",
    keyStats: [
      { label: 'PASS YDS', value: '342—241', edge: 'BUF' },
      { label: 'PRESSURES', value: '12—4', edge: 'BUF' },
      { label: 'TURNOVERS', value: '0—2', edge: 'BUF' },
      { label: 'EXPLOSIVES', value: '7—2', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q2 3:18', play: 'Bell 41-yd back-shoulder, sets up Cook 1-yd plunge.' },
      { time: 'Q4 6:32', play: 'Christian Benford pick-six on a Stroud overthrow.' },
    ],
    turningPoint: 'Defense forced two takeaways in the third quarter. Stroud never got comfortable.',
    uncleJrTake: "Now THAT'S the four-man pressure I been talkin' about. When the front seven eats, the secondary feasts.",
  },
  6: {
    week: 6, date: 'Oct 12, 2025',
    opponent: 'New York Jets', location: 'MetLife Stadium',
    result: 'L', score: { bills: 17, opp: 24 },
    headline: "Jets come correct in the rain — Bills 0-for-3 in the red zone.",
    keyStats: [
      { label: 'RED ZONE', value: '0/3', edge: 'OPP' },
      { label: 'PENALTIES', value: '11—4', edge: 'OPP' },
      { label: '3RD DOWN', value: '4/12', edge: 'OPP' },
      { label: 'TURNOVERS', value: '2—0', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'Q2 0:38', play: 'Allen INT in the end zone — receiver slipped on the slant.' },
      { time: 'Q4 3:04', play: 'Bills 4th-and-goal stop — fade incomplete to Coleman.' },
    ],
    turningPoint: 'Three trips inside the 10. Three points. Cannot win division games like that.',
    uncleJrTake: "Rain, mud, MetLife — that ain't an excuse. We had three cracks at the end zone and put up a field goal once. Where's the run game??",
  },
  7: {
    week: 7, date: 'Oct 19, 2025',
    opponent: 'Tennessee Titans', location: 'Highmark Stadium',
    result: 'W', score: { bills: 35, opp: 13 },
    headline: "Easy work — Titans get 35-13'd, defense holds them to 254 total yards.",
    keyStats: [
      { label: 'YDS ALLOWED', value: '254', edge: 'BUF' },
      { label: 'SACKS', value: '5—1', edge: 'BUF' },
      { label: '3RD DOWN', value: '2/12 (D)', edge: 'BUF' },
      { label: 'EXPLOSIVES', value: '8—1', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q1 7:11', play: 'Chubb 12-yd sack-fumble, Bills recover at the TEN 14.' },
      { time: 'Q3 4:48', play: 'Allen 52-yd TD pass to Coleman over the top.' },
    ],
    turningPoint: 'Chubb sack-fumble on the opening series. Game was over in the first quarter.',
    uncleJrTake: "Chubbs is earnin' that 29 mil guaranteed already. Get this man a steak at the Sportsmen's.",
  },
  8: {
    week: 8, date: 'Oct 26, 2025',
    opponent: 'Seattle Seahawks', location: 'Lumen Field',
    result: 'W', score: { bills: 27, opp: 24 },
    headline: "Bass walks it off in Seattle — 49-yarder as time expires.",
    keyStats: [
      { label: 'YPP', value: '5.8—5.4', edge: 'BUF' },
      { label: '4Q POINTS', value: '13—3', edge: 'BUF' },
      { label: '3RD DOWN', value: '7/13', edge: 'BUF' },
      { label: 'TURNOVERS', value: '1—1', edge: null },
    ],
    keyPlays: [
      { time: 'Q4 8:14', play: 'Allen 31-yd scramble on 3rd-and-9 — willed it.' },
      { time: 'Q4 0:00', play: 'Bass 49-yd FG, splits the uprights, Seattle stunned.' },
    ],
    turningPoint: 'Down 4, 4th quarter, 12-headed. The kid threw it twice and ran it twice for 64 yards.',
    uncleJrTake: "The kid in clutch time, son. You can put me to sleep on a Sunday and I'll still trust him in the 4th.",
  },
  9: {
    week: 9, date: 'Nov 2, 2025',
    opponent: 'Miami Dolphins', location: 'Highmark Stadium',
    result: 'W', score: { bills: 41, opp: 20 },
    headline: "Revenge served at home — Bills 41, Dolphins 20. Allen 4 TD, Cook 138 yds.",
    keyStats: [
      { label: 'YPP', value: '7.4', edge: 'BUF' },
      { label: 'RED ZONE', value: '5/5', edge: 'BUF' },
      { label: 'PRESSURES', value: '15—3', edge: 'BUF' },
      { label: 'TIME OF POSS', value: '34:18', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q1 2:04', play: 'Cook 71-yd TD run, second offensive snap of the game.' },
      { time: 'Q3 10:22', play: 'Bell 38-yd TD on a slot wheel, Hill couldn\'t locate.' },
    ],
    turningPoint: 'First-snap haymakers. We told Miami who we were before they sat down.',
    uncleJrTake: "Pour the Genny out for what they done to us in September. THIS one's for the Mafia.",
  },
  10: {
    week: 10, date: 'Nov 9, 2025',
    opponent: 'Indianapolis Colts', location: 'Lucas Oil Stadium',
    result: 'L', score: { bills: 21, opp: 30 },
    headline: "Trap game, sprung. Colts get 9 in OT — Allen had it but the line cracked.",
    keyStats: [
      { label: 'PRESSURES ALLOWED', value: '14', edge: 'OPP' },
      { label: 'SACKS', value: '0—4', edge: 'OPP' },
      { label: 'EXPLOSIVES', value: '3—7', edge: 'OPP' },
      { label: 'TURNOVERS', value: '2—1', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'OT 8:42', play: 'Allen strip-sack, Colts recover at the BUF 19.' },
      { time: 'OT 4:11', play: 'Pittman fade for 22, sets up the walk-off FG.' },
    ],
    turningPoint: 'O-line gave up 14 pressures. Strip-sack in OT was just the math catching up.',
    uncleJrTake: "Lookahead spot. We was thinkin' about KC next week and the Colts smacked us in the mouth. Coachin' lesson.",
  },
  11: {
    week: 11, date: 'Nov 16, 2025',
    opponent: 'Kansas City Chiefs', location: 'Highmark Stadium',
    result: 'W', score: { bills: 28, opp: 24 },
    headline: "Beat the Chiefs in November — Bell game-winner with 0:11 left.",
    keyStats: [
      { label: 'EXPLOSIVES', value: '6—4', edge: 'BUF' },
      { label: '3RD DOWN', value: '9/14', edge: 'BUF' },
      { label: 'PRESSURES', value: '11—7', edge: 'BUF' },
      { label: 'RED ZONE', value: '4/4', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q3 0:38', play: 'Greg Rousseau strip-sack of Mahomes, Bills recover.' },
      { time: 'Q4 0:11', play: 'Allen 18-yd TD to Bell on a back-shoulder fade — game-winner.' },
    ],
    turningPoint: 'Strip-sack, scoop, ten plays for 78 yards, Bell on a fade. November football.',
    uncleJrTake: "We finally got the matador defense look on Mahomes' face. SEVENTH TIME WE BEAT HIM. Tell the Chiefs we live here.",
  },
  12: {
    week: 12, date: 'Nov 23, 2025',
    opponent: 'San Francisco 49ers', location: 'Levi\'s Stadium',
    result: 'W', score: { bills: 23, opp: 20 },
    headline: "Survive in the rain at Levi's — Bills outlast 49ers 23-20 in a slugfest.",
    keyStats: [
      { label: 'YDS ALLOWED', value: '278', edge: 'BUF' },
      { label: 'TIME OF POSS', value: '31:48', edge: 'BUF' },
      { label: 'TURNOVERS', value: '1—2', edge: 'BUF' },
      { label: '4Q POINTS', value: '10—3', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q4 11:22', play: 'Cook 14-yd TD run on a wham block — Kincaid the lead.' },
      { time: 'Q4 1:38', play: 'Benford PBU on Aiyuk\'s back-shoulder — drive over.' },
    ],
    turningPoint: 'Defense held SF to one TD on three red-zone trips. Old-school grind.',
    uncleJrTake: "Cross-country, prime-time, mud, rain. Won it the way I'd run a high school game. Shrimp gumbo on the house.",
  },
  13: {
    week: 13, date: 'Nov 30, 2025',
    opponent: 'New England Patriots', location: 'Highmark Stadium',
    result: 'W', score: { bills: 33, opp: 10 },
    headline: "Payback at home — Bills bury Pats 33-10. Front seven gets 6 sacks.",
    keyStats: [
      { label: 'SACKS', value: '6—1', edge: 'BUF' },
      { label: 'YDS ALLOWED', value: '218', edge: 'BUF' },
      { label: 'EXPLOSIVES', value: '9—2', edge: 'BUF' },
      { label: 'PRESSURES', value: '17—5', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q1 4:11', play: 'Chubb sack-fumble on the second drive, Allen TD next play.' },
      { time: 'Q3 9:04', play: 'Bell 54-yd TD on a post-corner — Pats safety bit.' },
    ],
    turningPoint: 'Ran the ball 38 times for 184 yards. Closed it out the way we drew it up.',
    uncleJrTake: "Now THAT'S a front seven that ate. Six sacks, the whole stadium chantin' GO BILLS GO. That's the recipe.",
  },
  14: {
    week: 14, date: 'Dec 7, 2025',
    opponent: 'Los Angeles Rams', location: 'SoFi Stadium',
    result: 'L', score: { bills: 24, opp: 31 },
    headline: "Stafford and Nacua go yard — 31 hung on us in LA.",
    keyStats: [
      { label: 'PASS YDS ALLOWED', value: '378', edge: 'OPP' },
      { label: 'EXPLOSIVES', value: '4—9', edge: 'OPP' },
      { label: 'PRESSURES', value: '5—12', edge: 'OPP' },
      { label: '3RD DOWN', value: '5/13 (D)', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'Q2 6:22', play: 'Nacua 71-yd TD on a corner route — coverage bust.' },
      { time: 'Q4 4:11', play: 'Stafford 3rd-and-12 strike to Kupp, end zone, ices it.' },
    ],
    turningPoint: 'Two coverage busts in the second quarter. Nacua does not need help — quit givin\' it.',
    uncleJrTake: "West coast trip got us. But coverage busts? In Year 9 of this defense?? Riddle me this — who lost his man on Nacua?",
  },
  15: {
    week: 15, date: 'Dec 14, 2025',
    opponent: 'Detroit Lions', location: 'Highmark Stadium',
    result: 'W', score: { bills: 30, opp: 17 },
    headline: "Bills beat the Lions 30-17 — Cook 167 yds, defense holds Gibbs to 64.",
    keyStats: [
      { label: 'RUSH YDS', value: '198—79', edge: 'BUF' },
      { label: 'TIME OF POSS', value: '37:11', edge: 'BUF' },
      { label: 'EXPLOSIVES', value: '7—3', edge: 'BUF' },
      { label: 'TURNOVERS', value: '0—2', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q3 8:40', play: 'Cook 53-yd TD on a counter — Detroit edge crashed.' },
      { time: 'Q4 3:22', play: 'Rousseau 8-yd sack on Goff, drive over.' },
    ],
    turningPoint: 'Cook 167 yards. Lions never got their RPO game going.',
    uncleJrTake: "James Cook the dawg. Run that man 'til the wheels come off — that's how you win in December.",
  },
  16: {
    week: 16, date: 'Dec 21, 2025',
    opponent: 'New York Jets', location: 'MetLife Stadium',
    result: 'W', score: { bills: 27, opp: 21 },
    headline: "Bills get the sweep — Allen 3 TDs, beat Jets 27-21 at MetLife.",
    keyStats: [
      { label: 'PASS YDS', value: '298—202', edge: 'BUF' },
      { label: '3RD DOWN', value: '8/13', edge: 'BUF' },
      { label: 'PRESSURES', value: '13—6', edge: 'BUF' },
      { label: 'RED ZONE', value: '3/4', edge: 'BUF' },
    ],
    keyPlays: [
      { time: 'Q3 11:08', play: 'Allen scramble drill TD to Kincaid, broken-play magic.' },
      { time: 'Q4 1:42', play: 'Greg Rousseau sack on 3rd-and-8 ends the comeback.' },
    ],
    turningPoint: 'Allen 8/9 on third downs. Jets had no answer.',
    uncleJrTake: "The kid's third-down brain is somethin' else. He plays like he's got the Madden cheat codes when it's 3rd-and-7.",
  },
  17: {
    week: 17, date: 'Dec 28, 2025',
    opponent: 'Atlanta Falcons', location: 'Highmark Stadium',
    result: 'W', score: { bills: 28, opp: 24 },
    headline: "Last regular-season game at OLD Highmark — Bills win it 28-24.",
    keyStats: [
      { label: 'PASS YDS', value: '312—264', edge: 'BUF' },
      { label: 'EXPLOSIVES', value: '6—4', edge: 'BUF' },
      { label: '4Q POINTS', value: '14—7', edge: 'BUF' },
      { label: 'TURNOVERS', value: '1—1', edge: null },
    ],
    keyPlays: [
      { time: 'Q4 4:18', play: 'Allen 22-yd TD run — game-winner, the kid drags 3 defenders.' },
      { time: 'Q4 0:48', play: 'Benford red-zone PBU on Drake London, fans on their feet.' },
    ],
    turningPoint: "The kid's 22-yard TD run with 4 minutes left. Last touchdown ever in the old building.",
    uncleJrTake: "Last game in the old Rockpile-junior. I poured a Genny on the parking lot for her, son. We're knockin' her down.",
  },
};

export const postseasonRecaps = {
  divisional: {
    week: 'Divisional', date: 'Jan 17, 2026',
    opponent: 'Denver Broncos', location: 'Empower Field at Mile High',
    result: 'L', score: { bills: 30, opp: 33 },
    headline: "Fourth divisional exit in five years — Denver wins 33-30 in OT.",
    keyStats: [
      { label: 'TOTAL YDS', value: '385—398', edge: 'OPP' },
      { label: 'TURNOVERS', value: '5—1', edge: 'OPP' },
      { label: 'TIME OF POSS', value: '28:15', edge: 'OPP' },
      { label: 'PRESSURES', value: '8—14', edge: 'OPP' },
      { label: 'PASS RUSH WIN%', value: '27th of 32', edge: 'OPP' },
    ],
    keyPlays: [
      { time: 'OT 6:42', play: 'Allen INT off a tipped pass at midfield — Mile High erupts.' },
      { time: 'OT 0:00', play: 'Bo Nix walks 85 yards in OT, finishes with a 22-yd TD strike.' },
    ],
    turningPoint: '5 turnovers. ZERO sacks on Nix in overtime. 27th in pass rush win rate. That\'s how you lose a playoff game.',
    uncleJrTake: "FOURTH divisional exit in FIVE YEARS! Riddle me this — why do we lock the regular season DOWN but can't generate a four-man rush when it counts most?? PAUSE.",
  },
};

/** Look up a recap by the week number from weeklyGrades. */
export function getRecapByWeek(weekNumber) {
  return gameRecaps[weekNumber] || null;
}
