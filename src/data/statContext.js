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

  // Analytics Hub — PFF unit grades (also used by War Room MiniBars)
  'analytics:passing': {
    label: 'PASSING (OFFENSE PFF)',
    value: '88.1',
    sublabel: 'Allen-driven · 4th in NFL',
    verdict: 'TOP 5',
    color: '#5BE5A1',
    breakdown: [
      { label: 'CLEAN POCKET GRADE', value: '92.4', note: 'Allen elite when protected' },
      { label: 'UNDER PRESSURE GRADE', value: '74.8', note: 'Still 8th — magic-time arm' },
      { label: 'ADJUSTED COMP%', value: '76.2%', note: '5th — drops adjusted out' },
      { label: 'BIG-TIME THROW %', value: '6.1%', note: '3rd — money throws' },
      { label: 'TURNOVER-WORTHY %', value: '2.4%', note: '11th — playoff INTs are the outlier' },
    ],
    impact: 'A passing-grade in the high 80s puts us in the championship-contender tier. The story isn\'t the regular-season number — it\'s the 5 turnovers in Denver that don\'t show up here.',
    uncleJrTake: "88.1 don't lie about the regular season. The kid was top 4. But ratings don't play in OT, son — execution does.",
  },
  'analytics:rushing': {
    label: 'RUSHING (OFFENSE PFF)',
    value: '74.2',
    sublabel: 'Cook-led · 14th in NFL',
    verdict: 'AVERAGE',
    color: '#E8A010',
    breakdown: [
      { label: 'YDS BEFORE CONTACT/A', value: '2.4', note: '18th — line not opening lanes' },
      { label: 'YDS AFTER CONTACT/A', value: '3.1', note: '7th — Cook earns it himself' },
      { label: 'BREAKAWAY %', value: '14.8%', note: '8th — Cook\'s long speed' },
      { label: 'STUFFED RATE', value: '21.4%', note: '24th — bad. Front five issue' },
    ],
    impact: 'Cook carrying a marginal run game. Stuffed-rate of 21.4% is a structural issue with the interior O-line, not the back. When Cook gets to the second level he eats — when he doesn\'t, we\'re running into a wall.',
    uncleJrTake: "Cook's earnin' 3.1 after contact and the line's giving him 2.4 before. That ain't a back problem — that's an interior-line problem.",
  },
  'analytics:receiving': {
    label: 'RECEIVING (OFFENSE PFF)',
    value: '81.5',
    sublabel: 'Bell + Kincaid + Coleman group · 9th',
    verdict: 'STARTER-PLUS',
    color: 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'YARDS PER ROUTE RUN', value: '1.94', note: '11th — Bell\'s 3.13 carries the room' },
      { label: 'CATCH %', value: '69.4%', note: '8th' },
      { label: 'DROP %', value: '5.8%', note: '14th — better than 2024' },
      { label: 'TGT SEPARATION', value: '+0.6 yd', note: '12th — D.J. Moore should fix this' },
    ],
    impact: 'Skyler Bell\'s rookie year saved this room. The 1.94 YPRR average masks Bell at 3.13 (Puka territory) and Coleman at 1.6 still developing. With D.J. Moore now in the room, this grade should jump 4-6 points in 2026.',
    uncleJrTake: "Bell put up Puka-Nacua-territory numbers as a ROOKIE. Once D.J. Moore reunites with Brady? This room's gonna eat.",
  },
  'analytics:passBlocking': {
    label: 'PASS BLOCKING (OFFENSE PFF)',
    value: '72.3',
    sublabel: 'O-line group · 22nd in NFL',
    verdict: 'BELOW THE LINE',
    color: '#FF4D4D',
    breakdown: [
      { label: 'PRESSURES ALLOWED', value: '186', note: '24th — way too many' },
      { label: 'SACKS ALLOWED', value: '34', note: '21st — Allen scrambles save us' },
      { label: 'PRESSURE %', value: '36.2%', note: '23rd' },
      { label: 'TIME TO PRESSURE', value: '2.42s', note: '25th — leaks fast' },
    ],
    impact: 'The single biggest reason we lost in OT to Denver. 14 pressures allowed in that game directly created the strip-sack and the tipped-INT. Allen took 34 sacks the regular season AND was league MVP-caliber — imagine if the line gave him 2 more seconds.',
    uncleJrTake: "72.3 in pass pro is a top-22 number. The kid's gettin' hit a lot. Big Baller Beane spent a fourth on Iggy and a sixth on a center — riddle me this, where's the FIRST-ROUND tackle??",
  },
  'analytics:runBlocking': {
    label: 'RUN BLOCKING (OFFENSE PFF)',
    value: '68.9',
    sublabel: 'O-line group · 27th in NFL',
    verdict: 'BELOW AVERAGE',
    color: '#FF4D4D',
    breakdown: [
      { label: 'YDS BEFORE CONTACT/A', value: '2.4', note: '18th' },
      { label: 'STUFFED RATE', value: '21.4%', note: '24th' },
      { label: 'POWER RUN SUCCESS', value: '54.1%', note: '26th — short-yardage problem' },
      { label: 'PFF RUN BLOCK GRADE', value: '68.9', note: '27th in NFL' },
    ],
    impact: 'Worst grade on the offense. Power-run success rate of 54% on short-yardage is a finishing-quarter problem. This is why Cook\'s YBC is 2.4 and why we couldn\'t close in Denver.',
    uncleJrTake: "27th in run blocking. TWENTY. SEVENTH. We can't close out a playoff game in the 4th quarter if we can't run it on third-and-1, son.",
  },
  'analytics:passRush': {
    label: 'PASS RUSH (DEFENSE PFF)',
    value: '82.7',
    sublabel: 'Group grade · misleading vs reality',
    verdict: 'GRADE LIES',
    color: '#E8A010',
    breakdown: [
      { label: 'PASS RUSH WIN %', value: '37.4%', note: '27TH — load-bearing concern' },
      { label: 'SACK %', value: '6.8%', note: '14th — Rousseau carries it' },
      { label: 'PRESSURE %', value: '21.6%', note: '20th — generates pressure on coverage' },
      { label: 'POSTSEASON SACKS', value: '0', note: 'Zero on Bo Nix in OT' },
    ],
    impact: 'Highest grade on the defense, lowest pass-rush-win-rate in the AFC. Coverage forces incompletions which boost the unit grade — but in January when coverage breaks down, you need a four-man rush, and we don\'t have one. This is THE Bradley Chubb signing reason.',
    uncleJrTake: "82.7 looks pretty till you see the 27th in pass rush win rate. That's why I been preachin' on the front seven for the LONGEST. Riddle me this — why we paying Chubbs $29M guaranteed?? THIS is why.",
  },
  'analytics:coverage': {
    label: 'COVERAGE (DEFENSE PFF)',
    value: '87.3',
    sublabel: 'Benford-anchored · 4th in NFL',
    verdict: 'ELITE',
    color: '#5BE5A1',
    breakdown: [
      { label: 'PASSER RATING ALLOWED', value: '78.4', note: '3rd in NFL' },
      { label: 'BENFORD COVERAGE GRADE', value: '89.4', note: 'Pro Bowl snub' },
      { label: 'YPA ALLOWED', value: '5.8', note: '4th — best since the playoff defenses' },
      { label: 'OPP CATCH %', value: '60.1%', note: '5th' },
    ],
    impact: 'The defensive crown jewel. Top-5 in every coverage metric. The reason we were the #1 pass defense by yards/game. Christian Benford got snubbed from the Pro Bowl despite leading the league in passer rating allowed in coverage.',
    uncleJrTake: "Benford's a Pro Bowl snub and that's a CRIME against humanity. SEVENTEEN POINT NINE passer rating allowed. The kid's a problem.",
  },
  'analytics:runDefense': {
    label: 'RUN DEFENSE (DEFENSE PFF)',
    value: '78.4',
    sublabel: 'Front-seven gap-fit issues · 17th',
    verdict: 'AVERAGE',
    color: 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'YDS BEFORE CONTACT/A ALLOWED', value: '1.5', note: 'Tied 18th' },
      { label: 'OPP YPC', value: '4.4', note: '20th — too high' },
      { label: 'STUFFED %', value: '17.8%', note: '18th — middle of pack' },
      { label: 'EXPLOSIVE RUNS ALLOWED (15+)', value: '24', note: '22nd — bleed' },
    ],
    impact: 'Below average. The Patriots ran for 187 in Foxborough Week 5 because of this. Bo Nix scrambled for 41 in OT because of this. Run-fits and gap discipline are the unit\'s biggest pre-2026 fix.',
    uncleJrTake: "20th in opponent yards-per-carry. We giving up 4.4 a tote — that's how the Pats walked us in Week 5. Gap discipline, son.",
  },
  'analytics:tackling': {
    label: 'TACKLING (DEFENSE PFF)',
    value: '84.2',
    sublabel: 'Bernard-led · 9th in NFL',
    verdict: 'STARTER-PLUS',
    color: 'var(--bills-blue-bright)',
    breakdown: [
      { label: 'MISSED TACKLE %', value: '7.4%', note: '9th — tied with Eagles' },
      { label: 'TACKLES FOR LOSS', value: '76', note: '11th' },
      { label: 'BERNARD MT%', value: '4.8%', note: 'Tied 4th among LBs' },
      { label: 'OPEN-FIELD TACKLE GRADE', value: '81.0', note: '11th' },
    ],
    impact: 'Solid. Tackling has been a quiet strength under McDermott\'s legacy and now Leonhard. Bernard\'s open-field work is what kept the defense from bleeding in space all season.',
    uncleJrTake: "84.2 in tackling is what wins you November football. Bernard's quiet but he's the heartbeat. Don't sleep on him.",
  },
  'analytics:thirdDown': {
    label: '3RD DOWN CONVERSION %',
    value: '42.8%',
    sublabel: 'Money-down efficiency · 6th in NFL',
    verdict: 'TOP 10',
    color: '#5BE5A1',
    breakdown: [
      { label: '3RD-AND-SHORT (1-3)', value: '68.4%', note: '14th — should be higher' },
      { label: '3RD-AND-MEDIUM (4-7)', value: '49.1%', note: '4th' },
      { label: '3RD-AND-LONG (8+)', value: '32.6%', note: '3rd — Allen wizardry' },
      { label: '3RD-DOWN EPA', value: '+0.31', note: '3rd in NFL' },
    ],
    impact: 'Money-down dominance. Allen on third-and-long is the league\'s best closer. 32.6% conversion on 3rd-and-8+ is elite — that\'s why we ranked top 5 on offensive EPA. The miss is short-yardage at 68%, which traces back to the 27th-ranked run blocking.',
    uncleJrTake: "Top 5 on third-and-long, middle of the pack on third-and-short. Tells you we got a kid who plays Madden cheat-code on the hard ones — and a line that can't get a yard on the easy ones.",
  },
};

/** Helper to look up by a single id within a scene. */
export function getStat(scene, id) {
  return statContext[`${scene}:${id}`] || null;
}
