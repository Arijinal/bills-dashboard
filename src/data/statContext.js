/**
 * statContext — deep-dive payloads for clickable stats across the saga.
 *
 * Keyed by `{scene}:{statId}`. Each entry powers one StatDetailModal.
 *
 * Schema:
 *   verdict      short ALL CAPS chip ("ELITE", "BELOW THE LINE", "NEUTRAL")
 *   color        accent color (#hex or var(...))
 *   sublabel     1-line context under the headline value
 *   breakdown    array of { label, value, color?, note? }
 *   impact       1-2 sentence narrative on how this stat shaped the result
 *   uncleJrTake  italic 1-line voice quote (always ends or implies a question)
 */

export const statContext = {
  // Sunday Reckoning — the Denver divisional battle bars
  'sunday-reckoning:totalYards': {
    label: 'TOTAL YARDS',
    value: '385 — 398',
    sublabel: 'Bills 385 · Broncos 398',
    verdict: 'EVEN',
    color: 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'BUF YPP', value: '5.8' },
      { label: 'DEN YPP', value: '6.2' },
      { label: 'EXPLOSIVES (15+)', value: 'BUF 6 · DEN 7' },
      { label: 'GAP', value: '+13 DEN', color: '#FF4D4D' },
    ],
    impact: 'Closer than the score suggests. The yardage was a wash — five turnovers and zero pass-rush were what actually decided this.',
    uncleJrTake: "385 yards in a playoff game and you still go home? Tells you it ain't yards that win in January, son.",
  },
  'sunday-reckoning:passingYards': {
    label: 'PASSING YARDS',
    value: '287 — 268',
    sublabel: 'Allen 287 · Nix 268',
    verdict: 'BUF EDGE',
    color: '#5BE5A1',
    breakdown: [
      { label: 'ALLEN COMP%', value: '64.3%' },
      { label: 'NIX COMP%', value: '71.4%' },
      { label: 'ALLEN INTs', value: '2', color: '#FF4D4D' },
      { label: 'EXPLOSIVE PASSES (20+)', value: 'BUF 4 · DEN 3' },
    ],
    impact: 'Yardage doesn\'t lie about effort, but it lies about efficiency. Nix completed 71% with one INT; Allen completed 64% with two — and one of those INTs came in OT off a tip.',
    uncleJrTake: "Two picks in a divisional game. Coverage didn't matter — the kid was tryin' to be Superman 'cause the front seven couldn't get there.",
  },
  'sunday-reckoning:rushingYards': {
    label: 'RUSHING YARDS',
    value: '98 — 130',
    sublabel: 'Bills 98 · Broncos 130',
    verdict: 'DEN EDGE',
    color: '#FF4D4D',
    breakdown: [
      { label: 'BUF YPC', value: '3.6' },
      { label: 'DEN YPC', value: '4.8' },
      { label: 'COOK CARRIES', value: '17 for 64' },
      { label: '3RD-AND-SHORT (D)', value: '0/4 stops', color: '#FF4D4D' },
    ],
    impact: 'Cook averaged 3.6 a touch — the Broncos sat in two-high all night daring us to run it. We never did. On D, we couldn\'t fit a gap on third-and-short.',
    uncleJrTake: "Same story I been preachin' all year — A-gap blew open, LB lost contain. Football's still football.",
  },
  'sunday-reckoning:turnovers': {
    label: 'TURNOVERS',
    value: '5 — 1',
    sublabel: 'Bills 5 · Broncos 1',
    verdict: 'GAME-LOSING',
    color: '#FF4D4D',
    breakdown: [
      { label: 'ALLEN INTs', value: '2', color: '#FF4D4D' },
      { label: 'ALLEN FUMBLES', value: '2', color: '#FF4D4D' },
      { label: 'COOK FUMBLE', value: '1', color: '#FF4D4D' },
      { label: 'FORCED TAKEAWAYS', value: '1' },
    ],
    impact: '5 turnovers. The Broncos turned three of them into points. You cannot win a playoff game on the road giving the ball away five times. Period.',
    uncleJrTake: "FIVE turnovers in a divisional game. I'd pull every starter at South Park for that. Heads gotta roll somewhere, son.",
  },
  'sunday-reckoning:timeOfPossession': {
    label: 'TIME OF POSSESSION',
    value: '28:15 — 36:45',
    sublabel: 'Bills 28:15 · Broncos 36:45',
    verdict: 'DEN EDGE',
    color: '#FF4D4D',
    breakdown: [
      { label: 'GAP', value: '8:30 DEN', color: '#FF4D4D' },
      { label: 'BUF PLAYS', value: '58' },
      { label: 'DEN PLAYS', value: '78' },
      { label: 'BUF 3RD-DOWN%', value: '5/14 (35.7%)' },
    ],
    impact: 'Defense was on the field for 78 plays. By overtime they were running on fumes — that\'s why Bo Nix walked 85 yards untouched.',
    uncleJrTake: "Eight and a half minutes of rest in a playoff game. That defense was suckin' wind by OT. PAUSE — y'all rotate enough D-line?",
  },

  // War Room — analytics command center
  'war-room:offEpa': {
    label: 'OFFENSE EPA / PLAY',
    value: '+0.142',
    sublabel: '6th in NFL · Top-tier dropback efficiency',
    verdict: 'TOP-TIER',
    color: '#5BE5A1',
    breakdown: [
      { label: 'PASS EPA', value: '+0.198', note: 'Allen 4th in dropback EPA league-wide' },
      { label: 'RUSH EPA', value: '+0.04', note: 'Cook on schedule, Allen scrambles padding' },
      { label: 'EXPLOSIVE PLAY %', value: '14.2%', note: '5th in NFL' },
      { label: '3RD-DOWN EPA', value: '+0.31', note: 'Money down — third in NFL' },
    ],
    impact: 'EPA per play is the cleanest single-number measure of offensive efficiency. +0.142 says we generated expected-points-added on roughly every snap. Translation: when this offense was on the field in the regular season, it was getting work done.',
    uncleJrTake: "EPA's the closest thing to a stat that don't lie. Top six in the league in REGULAR season — same offense scored 30 in a divisional and STILL went home. Tells you it ain't the offense, son.",
  },
  'war-room:defEpa': {
    label: 'DEFENSE EPA / PLAY',
    value: '-0.062',
    sublabel: '7th in NFL — coverage-anchored',
    verdict: 'COVERAGE STRONG',
    color: '#FF4D4D',
    breakdown: [
      { label: 'PASS DEF EPA', value: '-0.118', note: '4th — Benford anchored the corner' },
      { label: 'RUSH DEF EPA', value: '+0.011', note: '22nd — front seven leaks on early downs' },
      { label: 'PASS RUSH WIN %', value: '37.4%', note: '27th in NFL — load-bearing weakness' },
      { label: 'TAKEAWAYS', value: '24', note: 'Tied 5th — opportunistic' },
    ],
    impact: 'Coverage on lockdown, pressure rate in the basement. The defense forced 24 takeaways but couldn\'t generate a four-man rush in the playoff game when it mattered most.',
    uncleJrTake: "27th in pass rush win rate. TWENTY. SEVENTH. That's how Bo Nix walked 85 yards in OT. I've been preaching on the front seven for the LONGEST.",
  },
  'war-room:dvoa': {
    label: 'DVOA',
    value: '+18.4%',
    sublabel: 'SRS 6.2 — top-tier composite',
    verdict: 'TOP 5',
    color: 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'OFF DVOA', value: '+15.2%', note: '5th in NFL' },
      { label: 'DEF DVOA', value: '-7.1%', note: '8th in NFL' },
      { label: 'ST DVOA', value: '+3.9%', note: '6th in NFL' },
      { label: 'WEIGHTED DVOA (LATE)', value: '+22.1%', note: 'Got better as season aged' },
    ],
    impact: 'DVOA is opponent-adjusted, situation-aware efficiency. +18.4% is consensus top-five-team math. The wins were earned, not stolen — but composite rankings don\'t play playoff games.',
    uncleJrTake: "Top 5 in DVOA, top 6 in EPA, top 7 in DVOA defense. We been a top-tier regular-season team for SIX YEARS straight. Riddle me this — what's the one thing missin'?",
  },
  'war-room:pythagorean': {
    label: 'PYTHAGOREAN WINS',
    value: '12.4',
    sublabel: 'Reality 12-5 — no regression coming',
    verdict: 'EARNED',
    color: '#E8A010',
    breakdown: [
      { label: 'POINTS FOR', value: '481', note: '6th in NFL' },
      { label: 'POINTS AGAINST', value: '365', note: '12th in NFL' },
      { label: 'PYTHAG PROJECTION', value: '12.4 W', note: 'Within 0.4 of actual' },
      { label: 'ONE-SCORE GAMES', value: '6-2', note: 'Nearly identical to expected (5.7-2.3)' },
    ],
    impact: 'Pythagorean wins translate scoring margin into expected wins. We posted 12.4 expected and won 12. There\'s no luck factor to regress — this team is exactly as good as the record says.',
    uncleJrTake: "Pythagorean nailed us at 12.4. Means we are EXACTLY who the score says — no smoke, no mirrors. Now if I could just get this team to play in JANUARY the way they play in NOVEMBER…",
  },
};

/** Helper to look up by a single id within a scene. */
export function getStat(scene, id) {
  return statContext[`${scene}:${id}`] || null;
}
