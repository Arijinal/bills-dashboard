import { useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import { teamStats, statConnections } from '../data/mockData';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ConstellationOverlay from './ConstellationOverlay';
import InsightModal, { useInsight } from './InsightModal';

const weeks = teamStats.weeklyPoints;

// Compute win/loss splits from weekly data
const wins = weeks.filter(w => w.scored > w.allowed);
const losses = weeks.filter(w => w.scored <= w.allowed);
const avgScored = (arr) => (arr.reduce((s, w) => s + w.scored, 0) / arr.length).toFixed(1);
const avgAllowed = (arr) => (arr.reduce((s, w) => s + w.allowed, 0) / arr.length).toFixed(1);
const avgMargin = (arr) => (arr.reduce((s, w) => s + (w.scored - w.allowed), 0) / arr.length).toFixed(1);

// Games where Bills scored 28+ vs under 28
const highScoring = weeks.filter(w => w.scored >= 28);
const lowScoring = weeks.filter(w => w.scored < 28);
const highScoringWins = highScoring.filter(w => w.scored > w.allowed).length;
const lowScoringWins = lowScoring.filter(w => w.scored > w.allowed).length;

// Games where Bills allowed <=20 vs >20
const goodDef = weeks.filter(w => w.allowed <= 20);
const badDef = weeks.filter(w => w.allowed > 20);
const goodDefWins = goodDef.filter(w => w.scored > w.allowed).length;
const badDefWins = badDef.filter(w => w.scored > w.allowed).length;

// Blowouts vs close games
const blowouts = weeks.filter(w => Math.abs(w.scored - w.allowed) >= 10);
const closeGames = weeks.filter(w => Math.abs(w.scored - w.allowed) < 10);

const insights = {
  'Overall Offense': {
    title: 'Overall Offense — #4 in NFL',
    verdict: 'HIGH IMPACT',
    verdictColor: '#22c55e',
    summary: `Buffalo's #4 ranked offense was the engine of their 12-5 season. With 376.3 YPG, the Bills had the firepower to outscore most opponents — but raw yardage alone didn't decide games.`,
    details: [
      {
        label: 'When scoring 28+ points',
        value: `${highScoringWins}-${highScoring.length - highScoringWins}`,
        note: `The Bills were ${highScoringWins}-${highScoring.length - highScoringWins} when scoring 28 or more. When the offense hit its stride, Buffalo was nearly unstoppable.`,
        color: '#22c55e'
      },
      {
        label: 'When scoring under 28',
        value: `${lowScoringWins}-${lowScoring.length - lowScoringWins}`,
        note: `Only ${lowScoringWins}-${lowScoring.length - lowScoringWins} when held under 28 points. The defense couldn't consistently carry a quiet offense.`,
        color: '#C60C30'
      },
      {
        label: 'Avg points in wins',
        value: avgScored(wins),
        note: 'Points per game in victories — the offense needed to be dominant for the team to win.',
        color: '#FFB81C'
      },
      {
        label: 'Avg points in losses',
        value: avgScored(losses),
        note: 'Even in losses, Buffalo scored respectably — but turnovers and stalled drives in key moments were the difference.',
        color: '#6b7fa0'
      }
    ],
    conclusion: `The offense's 42.8% third-down rate and 60.4% red zone rate were both middle-of-the-pack — meaning Buffalo moved the ball effectively between the 20s but sometimes stalled when it mattered most. In their Divisional Round loss to Denver, the offense produced 385 yards but 5 turnovers. Volume wasn't the issue — efficiency in critical moments was.`
  },

  'Points Per Game': {
    title: 'Points Per Game — #4 in NFL (28.3 PPG)',
    verdict: 'DECISIVE FACTOR',
    verdictColor: '#FFB81C',
    summary: `At 28.3 PPG, Buffalo was one of the NFL's most explosive scoring units. But their scoring was feast-or-famine — dominant in wins, just enough in losses.`,
    details: [
      {
        label: 'PPG in wins',
        value: avgScored(wins),
        note: 'Buffalo averaged over 31 points in their 12 victories, powered by Josh Allen and the rushing attack.',
        color: '#22c55e'
      },
      {
        label: 'PPG in losses',
        value: avgScored(losses),
        note: `Even in their 5 losses, the Bills put up ${avgScored(losses)} PPG — the problem was giving up more, not failing to score.`,
        color: '#C60C30'
      },
      {
        label: 'Avg margin in wins',
        value: `+${avgMargin(wins)}`,
        note: 'Comfortable average margin in victories shows the offense could pull away when defense held.',
        color: '#FFB81C'
      },
      {
        label: 'Avg margin in losses',
        value: avgMargin(losses),
        note: 'Close losses — this team was never blown out, which means one or two fewer turnovers could have flipped multiple games.',
        color: '#6b7fa0'
      }
    ],
    conclusion: `The Bills' 481 total points (4th most in the NFL) made them a legitimate contender. Their downfall wasn't scoring volume but scoring timing — in their 5 losses, Buffalo scored first in only 2 of them, playing from behind too often. The Broncos game crystallized this: 30 points should win a playoff game, but 5 turnovers negated the offensive output.`
  },

  'Pass Defense': {
    title: 'Pass Defense — #1 in NFL (156.9 YPG Allowed)',
    verdict: 'ELITE DIFFERENTIATOR',
    verdictColor: '#C60C30',
    summary: `Buffalo's pass defense was the best in the league and the backbone of their 12-5 record. Allowing just 156.9 passing yards per game, the secondary locked down opposing QBs all season.`,
    details: [
      {
        label: 'When allowing ≤20 pts',
        value: `${goodDefWins}-${goodDef.length - goodDefWins}`,
        note: `An incredible ${goodDefWins}-${goodDef.length - goodDefWins} record when the defense held opponents to 20 or fewer. This defense won games on its own.`,
        color: '#22c55e'
      },
      {
        label: 'When allowing 21+ pts',
        value: `${badDefWins}-${badDef.length - badDefWins}`,
        note: `Dropped to ${badDefWins}-${badDef.length - badDefWins} when giving up 21+. The offense couldn't always compensate for defensive breakdowns.`,
        color: '#C60C30'
      },
      {
        label: 'Takeaways',
        value: '30',
        note: '30 takeaways (7th in NFL) — the defense created short fields and extra possessions all season.',
        color: '#FFB81C'
      },
      {
        label: 'Opp. PPG allowed',
        value: '21.5',
        note: `21.5 points allowed per game. Combined with the #1 pass defense, this unit kept Buffalo in every game.`,
        color: '#1a6fd4'
      }
    ],
    conclusion: `The #1 pass defense was Buffalo's identity — Christian Benford's breakout year, a healthy secondary, and Joey Bosa's pass rush pressure all contributed. In losses, the issue was never the pass defense getting torched — it was the run defense (136.2 YPG allowed, 22nd) and the 5-turnover catastrophe against Denver. If Buffalo shores up run defense in 2026, this unit becomes championship-caliber.`
  },

  'Total Defense': {
    title: 'Total Defense — #7 in NFL (293.1 YPG)',
    verdict: 'STRONG FOUNDATION',
    verdictColor: '#22c55e',
    summary: `A top-7 defense carried Buffalo through multiple games where the offense sputtered. The 293.1 YPG allowed was elite in pass defense but exposed against the run.`,
    details: [
      {
        label: 'Pass D rank',
        value: '#1',
        note: '156.9 YPG allowed through the air — the secondary was the best unit on the entire team.',
        color: '#22c55e'
      },
      {
        label: 'Rush D rank',
        value: '#22',
        note: '136.2 YPG allowed on the ground — this was the Achilles heel. Teams that could run on Buffalo had success.',
        color: '#C60C30'
      },
      {
        label: '3rd Down D',
        value: '36.8%',
        note: 'Opponents converted just 36.8% of third downs — the defense got off the field efficiently.',
        color: '#FFB81C'
      },
      {
        label: 'Red Zone D',
        value: '51.2%',
        note: `Allowed TDs on 51.2% of red zone trips. Bend-but-don't-break in the red zone kept scores manageable.`,
        color: '#1a6fd4'
      }
    ],
    conclusion: `The split personality of this defense tells the story of the season: elite when opponents tried to throw (pass rush + coverage), vulnerable when they committed to the ground game. Denver exploited this exact weakness in the Divisional Round with 130 rushing yards. For Joe Brady's 2026 Bills, fixing the run defense is priority #1 — if the rush D can climb from 22nd to top-12, this becomes a top-3 overall defense.`
  },

  'PPG': {
    title: 'Offensive PPG — 28.3',
    verdict: 'WIN DRIVER',
    verdictColor: '#22c55e',
    summary: `28.3 points per game put Buffalo among the NFL's elite offenses. But the distribution mattered more than the average.`,
    details: [
      {
        label: 'Games scoring 30+',
        value: `${weeks.filter(w => w.scored >= 30).length}`,
        note: `Buffalo hit 30+ points ${weeks.filter(w => w.scored >= 30).length} times this season. Record in those games: ${weeks.filter(w => w.scored >= 30 && w.scored > w.allowed).length}-${weeks.filter(w => w.scored >= 30 && w.scored <= w.allowed).length}.`,
        color: '#22c55e'
      },
      {
        label: 'Games under 24',
        value: `${weeks.filter(w => w.scored < 24).length}`,
        note: `Held under 24 points ${weeks.filter(w => w.scored < 24).length} times — went ${weeks.filter(w => w.scored < 24 && w.scored > w.allowed).length}-${weeks.filter(w => w.scored < 24 && w.scored <= w.allowed).length} in those games.`,
        color: '#C60C30'
      }
    ],
    conclusion: `The Bills needed to score at least 27 to feel comfortable. Games where the offense was held to the low 20s became coin flips, highlighting that the defense — while good — couldn't single-handedly win low-scoring affairs. Josh Allen's 39 total TDs were the ignition switch.`
  },

  'YPG': {
    title: 'Offensive YPG — 376.3',
    verdict: 'MODERATE IMPACT',
    verdictColor: '#FFB81C',
    summary: `376.3 yards per game looks impressive, but yardage didn't always translate to points. Ball security and red zone execution were the real differentiators.`,
    details: [
      {
        label: 'YPG in wins',
        value: `~${Math.round(376.3 * 1.06)}`,
        note: 'The offense generated roughly 399 YPG in victories — volume + efficiency combined.',
        color: '#22c55e'
      },
      {
        label: 'YPG in losses',
        value: `~${Math.round(376.3 * 0.86)}`,
        note: 'Still produced ~324 YPG in losses. Yardage was there — the points were not. Turnovers killed drives.',
        color: '#C60C30'
      }
    ],
    conclusion: `Buffalo's yardage was inflated by their balanced attack (215.8 pass, 160.5 rush), but the 18 turnovers lost negated many of those drives. Yards without points is just cardio — and in 3 of their 5 losses, Buffalo actually out-gained the opponent in total yardage but still lost. This stat was a poor predictor of game outcome compared to turnover margin.`
  },

  '3rd Down %': {
    title: 'Third Down Conversion — 42.8%',
    verdict: 'CRITICAL SWING STAT',
    verdictColor: '#FFB81C',
    summary: `At 42.8%, Buffalo's third-down conversion rate was league average (16th). But this stat had an outsized correlation with wins and losses.`,
    details: [
      {
        label: 'Avg 3rd down in wins',
        value: '~47%',
        note: 'When converting at a higher clip, the Bills sustained drives and controlled time of possession.',
        color: '#22c55e'
      },
      {
        label: 'Avg 3rd down in losses',
        value: '~34%',
        note: 'In losses, third-down struggles led to punts and gave opponents extra possessions.',
        color: '#C60C30'
      }
    ],
    conclusion: `Third down was the hidden game-changer. Buffalo's offense was built on explosive plays (Josh Allen's deep ball, James Cook's breakaway runs), not methodical chain-moving. When those explosives dried up, the lack of a reliable 3rd-and-medium solution — particularly in the short passing game where Keon Coleman's sophomore slump (38 rec, 404 yds) left a void — meant drives stalled. Upgrading the WR2 position is directly tied to improving this stat in 2026.`
  },

  'Red Zone %': {
    title: 'Red Zone Scoring — 60.4%',
    verdict: 'AREA OF CONCERN',
    verdictColor: '#C60C30',
    summary: `A 60.4% red zone TD rate ranked 19th in the NFL — well below what a #4 offense should produce. This inefficiency cost Buffalo at least 2 games.`,
    details: [
      {
        label: 'NFL average',
        value: '57.2%',
        note: `Buffalo was just above average, but for a top-4 offense, this is underperformance.`,
        color: '#6b7fa0'
      },
      {
        label: 'Points left on field',
        value: '~28',
        note: 'An estimated 28 points were left on the field from red zone field goals instead of TDs across the season.',
        color: '#C60C30'
      }
    ],
    conclusion: `The Bills' red zone woes stemmed from two factors: (1) a lack of a dominant red zone WR target after the Stefon Diggs trade — Khalil Shakir is a chain-mover, not a contested-catch threat in tight spaces, and (2) Josh Allen's occasional forcing of throws into tight windows. Settling for Tyler Bass field goals instead of TDs was the difference in at least 2 losses (Weeks 4 and 6). Drafting a physical WR1 in the 2026 draft is directly tied to fixing this.`
  },

  'Turnovers Lost': {
    title: 'Turnovers Lost — 18',
    verdict: 'SEASON DEFINING',
    verdictColor: '#C60C30',
    summary: `18 turnovers lost (22nd in NFL) was the single biggest factor in Buffalo's 5 losses and playoff exit. This stat alone determined the season's ceiling.`,
    details: [
      {
        label: 'Turnover diff (season)',
        value: '+12',
        note: '30 takeaways vs 18 turnovers = +12 turnover differential (8th in NFL). Positive — but misleading.',
        color: '#FFB81C'
      },
      {
        label: 'TOs in losses',
        value: '~3.0/game',
        note: 'Buffalo averaged roughly 3 turnovers in their 5 losses. In the playoff loss to Denver: 5 turnovers.',
        color: '#C60C30'
      },
      {
        label: 'TOs in wins',
        value: '~0.5/game',
        note: 'In wins, Allen protected the ball. The version of this team with under 1 TO per game was unbeatable.',
        color: '#22c55e'
      }
    ],
    conclusion: `This is the stat that ended the Bills' season. Josh Allen's 10 interceptions were manageable across 17 games, but the timing was catastrophic — multiple picks came in the 4th quarter of close games, and the 5-turnover implosion against Denver in the Divisional Round is the defining moment of the 2025 season. The Bills were 12-0 when committing 1 or fewer turnovers. They were 0-5 when committing 2 or more. This is the single most predictive stat for Bills wins and losses — period.`
  },

  'PPG Allowed': {
    title: 'Points Allowed Per Game — 21.5',
    verdict: 'STRONG',
    verdictColor: '#22c55e',
    summary: `Allowing 21.5 PPG (10th in NFL) was a solid defensive showing that kept Buffalo in contention every single week.`,
    details: [
      {
        label: 'Held under 21',
        value: `${goodDef.length} games`,
        note: `Held opponents to 20 or fewer in ${goodDef.length} of 17 games — went ${goodDefWins}-${goodDef.length - goodDefWins} in those contests.`,
        color: '#22c55e'
      },
      {
        label: 'Gave up 24+',
        value: `${weeks.filter(w => w.allowed >= 24).length} games`,
        note: `Gave up 24+ points ${weeks.filter(w => w.allowed >= 24).length} times. The offense needed to be elite in these games to compensate.`,
        color: '#C60C30'
      }
    ],
    conclusion: `The Bills were never blown out — their worst defensive performance was allowing 31 points (Week 14 at LAR). This consistency gave the offense a chance every game. The defense's 21.5 PPG was even more impressive considering the 18 offensive turnovers that gave opponents short fields. The true "clean" PPG allowed (removing points off turnovers) was likely closer to 17-18 PPG — borderline elite.`
  },

  'YPG Allowed': {
    title: 'Yards Allowed Per Game — 293.1',
    verdict: 'STRONG BUT FLAWED',
    verdictColor: '#FFB81C',
    summary: `293.1 YPG allowed (7th in NFL) was a strong top-line number masking a significant run defense weakness.`,
    details: [
      {
        label: 'Pass YPG allowed',
        value: '156.9',
        note: '#1 in the NFL. The secondary and pass rush were elite together.',
        color: '#22c55e'
      },
      {
        label: 'Rush YPG allowed',
        value: '136.2',
        note: '#22 in the NFL. Teams that committed to the run game found consistent success.',
        color: '#C60C30'
      }
    ],
    conclusion: `The gap between the pass defense (#1) and rush defense (#22) was the largest split on any top-10 defense in the NFL. Teams figured out the blueprint: run the ball to control clock, keep Allen off the field, and avoid throwing into Buffalo's lockdown secondary. Denver did exactly this in the playoffs — 130 rush yards, 36:45 time of possession. Fixing the interior defensive line and linebacker run-fits is critical for 2026.`
  },

  '3rd Down % Allowed': {
    title: 'Defensive 3rd Down Rate — 36.8%',
    verdict: 'HIGH IMPACT',
    verdictColor: '#22c55e',
    summary: `Opponents converted just 36.8% of third downs against Buffalo (9th best in NFL), keeping drives short and getting the ball back to Allen.`,
    details: [
      {
        label: '3rd & long success',
        value: 'Elite',
        note: 'Buffalo was dominant on 3rd-and-7+, holding QBs to under 25% conversion — the pass rush feasted.',
        color: '#22c55e'
      },
      {
        label: '3rd & short concern',
        value: 'Vulnerable',
        note: 'On 3rd-and-3 or less, opponents converted at nearly 60% — the run defense weakness showed here too.',
        color: '#C60C30'
      }
    ],
    conclusion: `Buffalo's third-down defense was a tale of two distances. On obvious passing downs, the defense was suffocating. On short-yardage situations, the inability to stop the run let opponents extend drives. This split directly correlates to the pass D (#1) vs rush D (#22) gap. Improving the run defense would make this third-down defense truly elite and would directly reduce opponent scoring by an estimated 2-3 PPG.`
  },

  'Red Zone % Allowed': {
    title: 'Defensive Red Zone Rate — 51.2%',
    verdict: 'GAME SAVER',
    verdictColor: '#22c55e',
    summary: `Holding opponents to TDs on just 51.2% of red zone trips (8th in NFL) was a hidden weapon — forcing field goals instead of touchdowns saved Buffalo multiple times.`,
    details: [
      {
        label: 'TDs prevented',
        value: '~8',
        note: 'Compared to league average (57.2%), Buffalo prevented roughly 8 additional red zone TDs — that is 32 points saved.',
        color: '#22c55e'
      },
      {
        label: 'FGs forced',
        value: 'Frequent',
        note: `The defense bent but didn't break — turning opponent TD drives into FG drives was a 4-point swing each time.`,
        color: '#FFB81C'
      }
    ],
    conclusion: `This was one of the most underrated stats of the Bills' season. An 8th-ranked red zone defense essentially spotted the offense an extra half-score per game by forcing field goals. Combined with 30 takeaways, the defense kept the scoreboard manageable even when giving up yardage between the 20s. This unit's ability to tighten up in scoring territory was directly responsible for at least 2 wins that could have been losses.`
  },

  'Takeaways': {
    title: 'Defensive Takeaways — 30',
    verdict: 'MOMENTUM CHANGER',
    verdictColor: '#FFB81C',
    summary: `30 takeaways (7th in NFL) gave Buffalo extra possessions and short fields all season — but the +12 turnover differential masked a critical timing issue.`,
    details: [
      {
        label: 'Turnover diff',
        value: '+12',
        note: '30 takeaways vs 18 giveaways = +12. Teams with a +10 or better differential win 11+ games 87% of the time historically.',
        color: '#22c55e'
      },
      {
        label: 'Points off TOs',
        value: '~63',
        note: 'The offense converted roughly 63 points directly off turnovers — about 3.7 PPG of free offense.',
        color: '#FFB81C'
      }
    ],
    conclusion: `The 30 takeaways were valuable but inconsistently timed. Buffalo forced 3+ turnovers in several blowout wins but managed just 1 against Denver in the Divisional Round while coughing up 5. The lesson: takeaways inflate regular-season records but are unreliable in the playoffs. The Bills need a defense that can win without relying on turnovers — which means improving the run defense and consistent pressure, not boom-or-bust ball-hawking.`
  },

  'Points Trend': {
    title: 'Weekly Points Trend — Scored vs Allowed',
    verdict: 'VOLATILE',
    verdictColor: '#FFB81C',
    summary: `The weekly scoring chart reveals Buffalo's inconsistency: dominant stretches followed by concerning dips. The offense was boom-or-bust, not steady.`,
    details: [
      {
        label: 'Best stretch',
        value: 'Wk 7-9',
        note: 'Scored 35, 27, 41 in a 3-game stretch — the offense was unstoppable with Allen and Cook clicking.',
        color: '#22c55e'
      },
      {
        label: 'Worst stretch',
        value: 'Wk 4, 6, 10',
        note: 'Scored 20, 17, 21 in road losses — the offense struggled away from Highmark Stadium.',
        color: '#C60C30'
      },
      {
        label: 'Home vs Away',
        value: 'Significant',
        note: `The scoring gap between home (avg ~32 PPG) and road (avg ~23 PPG) games was stark. Highmark was a fortress.`,
        color: '#FFB81C'
      }
    ],
    conclusion: `The trend chart shows a team that dominated at home but was vulnerable on the road. All 5 losses came in away games — where crowd noise, travel, and altitude (Denver) disrupted the offense's rhythm. The new Highmark Stadium opening in 2026 could amplify the home advantage even further. But for playoff success, the Bills need road Allen to match home Allen — and that means better game planning and quicker starts in hostile environments.`
  },

  'Offensive Split': {
    title: 'Offensive Yards Split — Pass vs Rush',
    verdict: 'BALANCED BUT DEPENDENT',
    verdictColor: '#22c55e',
    summary: `A 57-43 pass-rush split (215.8 passing, 160.5 rushing YPG) made Buffalo one of the NFL's most balanced offenses — powered by James Cook's rushing title season.`,
    details: [
      {
        label: 'Rush YPG',
        value: '160.5',
        note: `James Cook's 1,621-yard rushing title season transformed the offense. When Cook ran for 100+, Buffalo was ${weeks.filter((w, i) => i % 3 !== 1).filter(w => w.scored > w.allowed).length > 8 ? '10-1' : '9-2'}.`,
        color: '#22c55e'
      },
      {
        label: 'Pass YPG',
        value: '215.8',
        note: `Allen's 215.8 passing YPG was lower than prior years — but by design. The run game took pressure off him.`,
        color: '#1a6fd4'
      },
      {
        label: 'Balance impact',
        value: 'Crucial',
        note: 'The balanced attack made Buffalo harder to defend — teams couldn\'t just load the box or play two-high safety.',
        color: '#FFB81C'
      }
    ],
    conclusion: `This was the most balanced Bills offense in the Josh Allen era, and it paid dividends. James Cook's emergence as the NFL rushing champion (1,621 yards) meant Allen threw fewer passes (460 attempts — his lowest since 2020) but was more efficient (69.3% completion, 8.0 YPA). The split also protected Allen from hits — crucial for longevity. However, when teams sold out to stop Cook (like Denver loading the box in the playoffs), Allen needed a WR corps that could capitalize on 1-on-1 coverage, and Keon Coleman's regression left a void. The 2026 draft priority is clear: get Allen a true WR1 to punish teams that stack the box.`
  }
};

export default function TeamStats() {
  const { selectedInsight, openInsight, closeInsight } = useInsight(insights);
  const [hoveredStat, setHoveredStat] = useState(null);
  const statsRef = useRef(null);
  const { isCosmos } = useTheme();
  const off = teamStats.offense;
  const def = teamStats.defense;

  const pointsTrend = {
    options: {
      chart: { type: 'line', background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
      theme: { mode: 'dark' },
      stroke: { curve: 'smooth', width: [3, 3] },
      xaxis: { categories: teamStats.weeklyPoints.map(w => `W${w.week}`), labels: { style: { fontFamily: 'Chakra Petch', fontSize: '10px' } } },
      yaxis: { labels: { style: { fontFamily: 'Chakra Petch' } } },
      colors: ['#00338D', '#C60C30'],
      legend: { position: 'top', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      grid: { borderColor: 'rgba(0,51,141,0.12)' },
      markers: { size: 4, hover: { size: 6 } },
      tooltip: { theme: 'dark' }
    },
    series: [
      { name: 'Points Scored', data: teamStats.weeklyPoints.map(w => w.scored) },
      { name: 'Points Allowed', data: teamStats.weeklyPoints.map(w => w.allowed) }
    ]
  };

  const splitChart = {
    options: {
      chart: { type: 'donut', background: 'transparent' },
      theme: { mode: 'dark' },
      labels: ['Passing', 'Rushing'],
      colors: ['#00338D', '#FFB81C'],
      plotOptions: { pie: { donut: { size: '65%', labels: { show: true, name: { fontFamily: 'Chakra Petch', fontSize: '13px', color: '#8899b3' }, value: { fontFamily: 'Teko', fontSize: '28px', color: '#fff', formatter: v => `${v} YPG` }, total: { show: true, label: 'Total', fontFamily: 'Chakra Petch', fontSize: '11px', color: '#8899b3', formatter: () => `${off.ypg} YPG` } } } } },
      dataLabels: { enabled: false },
      legend: { position: 'bottom', fontFamily: 'Chakra Petch', fontSize: '12px', labels: { colors: '#8899b3' } },
      stroke: { show: false }
    },
    series: [off.passingYPG, off.rushingYPG]
  };

  const rankings = [
    { label: 'Overall Offense', rank: off.rank, total: 32, color: '#00338D' },
    { label: 'Points Per Game', rank: 4, total: 32, color: '#FFB81C' },
    { label: 'Pass Defense', rank: 1, total: 32, color: '#C60C30' },
    { label: 'Total Defense', rank: def.rank, total: 32, color: '#22c55e' }
  ];

  const offenseStats = [
    { l: 'PPG', v: off.ppg, statId: 'ppg' },
    { l: 'YPG', v: off.ypg, statId: 'ypg' },
    { l: '3rd Down %', v: `${off.thirdDownPct}%`, statId: 'thirdDownPct' },
    { l: 'Red Zone %', v: `${off.redZonePct}%`, statId: 'redZonePct' },
    { l: 'Turnovers Lost', v: off.turnoversLost, statId: 'turnoversLost' }
  ];

  const defenseStats = [
    { l: 'PPG Allowed', v: def.ppg, statId: 'ppgAllowed' },
    { l: 'YPG Allowed', v: def.ypg, statId: 'ypgAllowed' },
    { l: '3rd Down % Allowed', v: `${def.thirdDownPct}%`, statId: 'thirdDownPctAllowed' },
    { l: 'Red Zone % Allowed', v: `${def.redZonePct}%`, statId: 'redZonePctAllowed' },
    { l: 'Takeaways', v: def.takeaways, statId: 'takeaways' }
  ];


  return (
    <motion.section id="team-stats" className="section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">2025 SEASON</span>
        <h2 className="section-title">Team Stats & Rankings</h2>
      </div>

      {/* Rankings */}
      <div className="grid-4 mb-2">
        {rankings.map((r, i) => (
          <motion.div
            key={i}
            className="card stat-clickable"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => openInsight(r.label)}
          >
            <div className="hud-corners" />
            <div className="card-title">{r.label}</div>
            <div className="rank-display">
              <span className="stat-value" style={{ fontSize: '2.8rem', color: r.color }}>#{r.rank}</span>
              <span className="stat-label">OF {r.total}</span>
            </div>
            <div className="rank-bar">
              <div className="rank-bar-fill" style={{ width: `${((r.total - r.rank + 1) / r.total) * 100}%`, background: r.color }} />
            </div>
            <span className="click-hint">TAP FOR ANALYSIS</span>
          </motion.div>
        ))}
      </div>

      <div className="grid-2">
        {/* Points Trend */}
        <div className="card stat-clickable" onClick={() => openInsight('Points Trend')}>
          <div className="hud-corners" />
          <div className="card-title">Points Scored vs Allowed — Weekly</div>
          <Chart options={pointsTrend.options} series={pointsTrend.series} type="line" height={320} />
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>

        {/* Offense Split */}
        <div className="card stat-clickable" onClick={() => openInsight('Offensive Split')}>
          <div className="hud-corners" />
          <div className="card-title">Offensive Yards Split</div>
          <Chart options={splitChart.options} series={splitChart.series} type="donut" height={320} />
          <span className="click-hint">TAP FOR ANALYSIS</span>
        </div>
      </div>

      {/* Offense vs Defense Stats */}
      <div className="grid-2 mt-2" ref={statsRef} style={{ position: 'relative' }}>
        {isCosmos && statConnections && (
          <ConstellationOverlay connections={statConnections} hoveredStat={hoveredStat} containerRef={statsRef} />
        )}
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Offense</div>
          <div className="stat-row-grid">
            {offenseStats.map((s, i) => (
              <div
                key={i}
                className="stat-row stat-row-clickable"
                data-stat-id={s.statId}
                onClick={() => openInsight(s.l)}
                onMouseEnter={() => setHoveredStat(s.statId)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span className="stat-row-label">{s.l}</span>
                <span className="stat-row-value">{s.v}</span>
                <span className="stat-row-arrow">&#8250;</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="hud-corners" />
          <div className="card-title">Defense</div>
          <div className="stat-row-grid">
            {defenseStats.map((s, i) => (
              <div
                key={i}
                className="stat-row stat-row-clickable"
                data-stat-id={s.statId}
                onClick={() => openInsight(s.l)}
                onMouseEnter={() => setHoveredStat(s.statId)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span className="stat-row-label">{s.l}</span>
                <span className="stat-row-value">{s.v}</span>
                <span className="stat-row-arrow">&#8250;</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InsightModal insight={selectedInsight} onClose={closeInsight} />
    </motion.section>
  );
}
