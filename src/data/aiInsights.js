// AI Football Coach insights — what each stat means, why it matters, what stands out.
// Pre-written by a "football expert" voice. No live LLM call needed (yet).
//
// Schema (rich modal):
//   headline:      h2 line — the verdict in plain English
//   body:          paragraph of analysis
//   verdict:       short tag like "MVP-TIER", "CONTENDER", "RED FLAG"
//   verdictColor:  CSS color for the verdict badge / accent border
//   details[]:     2-4 supporting data points: { label, value, note }
//   conclusion:    italic Shippori Mincho close-out (smaller, secondary)
//   standout:      gold callout chip — single most-striking fact

export const COACH = {
  voice: "Coach",
  signature: "// Coach's read",
};

// Verdict color tokens — keep these in one place
const COLOR = {
  good:    'var(--signal-positive)',
  blue:    'var(--bills-blue-bright)',
  warn:    'var(--signal-warning)',
  bad:     'var(--signal-negative)',
  gold:    '#E8B23C',
};

export const INSIGHTS = {
  // ── Section 1: The Arrival ─────────────────────────────────────
  record_12_5: {
    verdict: 'CONTENDER',
    verdictColor: COLOR.good,
    headline: "12-5 is contender territory.",
    body: "Twelve wins puts you in the top quartile of NFL teams since 2010. Combined with a +116 point differential, the underlying performance suggests this team is closer to 13-4 caliber than 12-5. The Pythagorean expected wins formula puts them at 11.4, meaning they slightly outperformed their stats — they're for real.",
    details: [
      { label: 'Pythagorean wins', value: '11.4', note: 'Bills slightly outperformed their underlying point-differential expectation.' },
      { label: 'Point differential', value: '+116', note: '4th best in the AFC — top-end contender territory.' },
      { label: 'Top-quartile win %', value: '.706', note: 'Win % among NFL teams with 12+ wins since 2010 — Bills landed dead on it.' },
    ],
    conclusion: 'A team for real. The math, the underlying performance, and the record all align — no luck-driven mirage here.',
    standout: "+116 differential is the 4th-best in the AFC.",
  },
  pf_pa: {
    verdict: 'ELITE',
    verdictColor: COLOR.good,
    headline: "Scoring 28.3 a game with a top-10 defense.",
    body: "481 points scored is 28.3 PPG (top 6 in NFL). 365 allowed is 21.5 PPG (top 12). Teams that average 28+ PPG and allow under 22 PPG win roughly 71% of their games. Bills hit 12-5 (.706) — almost exactly on model.",
    details: [
      { label: 'Points scored', value: '481', note: '28.3 PPG — 6th in the NFL on offense.' },
      { label: 'Points allowed', value: '365', note: '21.5 PPG — 12th in the NFL on defense.' },
      { label: 'Model win % (28/22)', value: '.710', note: 'Historical win rate for teams hitting these benchmarks since 2010.' },
      { label: 'Actual win %', value: '.706', note: 'Bills landed within 0.5% of the model expectation.' },
    ],
    conclusion: 'Two-way balance is the contender separator. Bills earned every win the math said they should.',
    standout: "Two-way balance: top-10 on both sides of the ball.",
  },
  divisional_loss: {
    verdict: 'SEASON ENDER',
    verdictColor: COLOR.bad,
    headline: "Five turnovers killed it. Period.",
    body: "Allen had 3 INTs, Bills lost 2 fumbles. Teams with -4 turnover differential in playoff games win less than 5% of the time. The Bills outgained Denver in passing (287-268) and held them to 3.5 yards per carry, but the turnover battle was over before halftime.",
    details: [
      { label: 'Bills turnovers', value: '5', note: '3 Allen INTs, 2 lost fumbles. Three came in scoring position.', color: COLOR.bad },
      { label: 'TO differential', value: '-4', note: 'Teams in playoff games with -4 TO diff win <5% of the time.', color: COLOR.bad },
      { label: 'Pass yards', value: '287-268', note: 'Bills actually outgained Denver through the air.', color: COLOR.good },
      { label: 'Allen playoff record', value: '0-3', note: 'When losing the turnover battle in the playoffs.' },
    ],
    conclusion: 'The Bills did almost everything right except the one thing that always matters in January.',
    standout: "0-3 in playoff games this Allen era when losing the turnover battle.",
  },

  // ── Section 3: The Franchise (Josh Allen) ──────────────────────
  passer_rating: {
    verdict: 'ELITE',
    verdictColor: COLOR.good,
    headline: "102.2 — top 5 QB in football.",
    body: "Passer rating combines completion %, yards/attempt, TD%, and INT% into one number out of 158.3. League average is around 88. Above 100 is elite (only 8 QBs cleared it this year). Allen's number is dragged down by 10 INTs but propped up by a 69.3% completion rate that's the highest of his career.",
    details: [
      { label: 'Passer rating', value: '102.2', note: 'Top 5 in the NFL among qualified starters.', color: COLOR.good },
      { label: 'League average', value: '~88', note: '102+ is the elite-tier dividing line.' },
      { label: 'INTs', value: '10', note: 'The one number dragging the rating down — protectable upside.', color: COLOR.warn },
      { label: 'Completion %', value: '69.3', note: 'Career-high — leap from 65.6% the prior year.', color: COLOR.good },
    ],
    conclusion: 'A career-best efficiency season buried under a single rough playoff outing. The trend line is up.',
    standout: "First QB ever with 25+ pass TD and 14+ rush TD in three different seasons.",
  },
  epa_play: {
    verdict: 'MVP-TIER',
    verdictColor: COLOR.good,
    headline: "+0.18 EPA per play is MVP-tier.",
    body: "Expected Points Added measures how much each play improves a team's scoring chances. League average for QBs is around 0.05 to 0.10. Allen at +0.18 means every snap he plays adds nearly two-tenths of a point in expected value. Over 1,100 snaps, that's 200 points of value created — which lines up with the team's 481 PF.",
    details: [
      { label: 'EPA / play', value: '+0.18', note: 'Top 3 among QBs with 400+ attempts.', color: COLOR.good },
      { label: 'League QB avg', value: '+0.05 to +0.10', note: 'Allen is roughly double the league average.' },
      { label: 'Total snaps', value: '~1,100', note: 'Implied EPA value created: ~200 points.' },
      { label: 'Team points scored', value: '481', note: 'Allen-driven EPA accounts for ~42% of team scoring expectation.' },
    ],
    conclusion: 'Every-snap value at this level is what separates MVP candidates from very good QBs.',
    standout: "Top 3 in EPA/play among all QBs with 400+ attempts.",
  },
  comp_pct: {
    verdict: 'STRENGTH',
    verdictColor: COLOR.good,
    headline: "69.3% — career-high accuracy.",
    body: "Allen's biggest knock early in his career was completion percentage (52% as a rookie). This year he's at 69.3, which is 2nd best in his career and inside the top 10 league-wide. The leap came from RPO-heavy schemes and a deeper TE rotation — easier reads, faster decisions.",
    details: [
      { label: 'Completion %', value: '69.3', note: '2nd-best of his career, top 10 league-wide.', color: COLOR.good },
      { label: 'Rookie year', value: '52.8', note: 'The single biggest growth arc at the QB position in recent memory.' },
      { label: 'YoY jump', value: '+3.7 pts', note: 'Up from 65.6% — biggest year-over-year jump of his career.', color: COLOR.good },
      { label: 'Scheme driver', value: 'RPO%', note: 'RPO usage rate jumped to 18% — easier reads, faster delivery.' },
    ],
    conclusion: 'The accuracy knock is officially closed. Allen is a high-volume, high-percentage starter now.',
    standout: "Up from 65.6% the year before — biggest year-over-year jump of his career.",
  },
  pass_tds: {
    verdict: 'CONTENDER',
    verdictColor: COLOR.blue,
    headline: "25 passing TDs, but the rushing tells the story.",
    body: "25 is solid for a starter (top 12). What separates Allen is the 14 rushing TDs on top of it. Combined 39 total TDs is 2nd in the NFL. No other quarterback in 2025 cleared 35 total TDs.",
    details: [
      { label: 'Pass TDs', value: '25', note: 'Top 12 league-wide for a starter.' },
      { label: 'Rush TDs', value: '14', note: 'Generational number for a QB.', color: COLOR.gold },
      { label: 'Total TDs', value: '39', note: '2nd in the entire NFL across all positions.', color: COLOR.good },
      { label: 'Next-best QB', value: '<35', note: 'No other 2025 QB cleared 35 total TDs.' },
    ],
    conclusion: 'The pass-rush combo is what makes Allen impossible to scheme against.',
    standout: "Most rushing TDs by a QB in a season since Cam Newton in 2011.",
  },
  rush_tds: {
    verdict: 'GENERATIONAL',
    verdictColor: COLOR.gold,
    headline: "14 rushing TDs is a generational number.",
    body: "Most QBs have 1-3 rushing TDs in a year. 14 is more than half the NFL's running backs. This is the cheat code: Bills become a goal-line offense with a 6'5\" 240-pound quarterback who can run power. Defenses can't sub for nickel without giving up the run, can't go base without giving up the pass.",
    details: [
      { label: 'Rush TDs', value: '14', note: 'More than half the NFL\'s starting RBs.', color: COLOR.gold },
      { label: 'Inside the 5', value: '10 of 14', note: 'Goal-line cheat code — power runs from a 6\'5", 240-lb QB.', color: COLOR.gold },
      { label: 'QB league avg', value: '1-3', note: 'Allen is doing 5-10x what a typical QB does on the ground.' },
      { label: 'Last comp', value: 'Cam, 2011', note: 'Most rush TDs by a QB since Cam Newton\'s rookie year.' },
    ],
    conclusion: 'The Bills don\'t have a goal-line back because they don\'t need one.',
    standout: "10 of his 14 came from inside the 5-yard line. He's a 2-point converter as much as a QB.",
  },
  cpoe: {
    verdict: 'ELITE',
    verdictColor: COLOR.good,
    headline: "+2.8 means he's beating expected accuracy.",
    body: "Completion Percentage Over Expected adjusts for throw difficulty (depth, pressure, separation). Above zero means a QB is more accurate than expected; below means less. +2.8 is top 8 in the league. It's the cleanest measure of pure throwing skill independent of scheme.",
    details: [
      { label: 'CPOE', value: '+2.8', note: 'Top 8 in the league. Cleanest measure of pure accuracy.', color: COLOR.good },
      { label: 'Rookie CPOE', value: '-0.4', note: 'Below expected as a rookie.', color: COLOR.warn },
      { label: 'Trend', value: '6 yrs ↑', note: 'Six straight years of improvement on this metric.', color: COLOR.good },
    ],
    conclusion: 'The accuracy growth is real, scheme-adjusted, and still trending in the right direction.',
    standout: "Was -0.4 his rookie year. Six straight years of improvement.",
  },
  deep_ball: {
    verdict: 'STRENGTH',
    verdictColor: COLOR.good,
    headline: "44.8% on throws 20+ yards downfield.",
    body: "Deep ball accuracy separates good QBs from elite ones. League average is 36%. Anything above 42% is top tier. Allen's number reflects the chemistry with Khalil Shakir and Keon Coleman as deep targets, plus the protection allowing him to set his feet on bombs.",
    details: [
      { label: 'Deep ball %', value: '44.8', note: 'Throws of 20+ air yards. Top-tier (>42%) territory.', color: COLOR.good },
      { label: 'League avg', value: '36%', note: 'Allen is nearly 9 points above the NFL baseline.' },
      { label: '30+ yd completions', value: '19', note: '3rd-most in the entire NFL.', color: COLOR.gold },
      { label: 'Primary deep targets', value: 'Shakir / Coleman', note: 'Chemistry-driven deep game without a true #1.' },
    ],
    conclusion: 'A deep-ball threat without an alpha WR is a luxury most contenders don\'t have.',
    standout: "His 19 completions of 30+ yards is 3rd-most in the NFL.",
  },
  pressure_rate: {
    verdict: 'RED FLAG',
    verdictColor: COLOR.bad,
    headline: "32.1% pressure rate — the offense's biggest problem.",
    body: "Pressure rate is how often the QB gets hit, hurried, or knocked down. Lower is better. Allen at 32.1% means he's getting pressured almost a third of his dropbacks. 26th in the NFL. The line is shaky on the left side, and Allen's playmaking style holds the ball longer than ideal.",
    details: [
      { label: 'Pressure rate', value: '32.1%', note: '26th in the NFL — bottom-third pass protection.', color: COLOR.bad },
      { label: 'NFL rank', value: '26 / 32', note: 'Only 6 teams allowed pressure more often.', color: COLOR.bad },
      { label: 'Record when <28%', value: '11-0', note: 'Bills are undefeated when Allen is kept clean.', color: COLOR.good },
      { label: 'Primary issue', value: 'LT / LG', note: 'Left side of the line is the offseason priority.' },
    ],
    conclusion: 'Fix the left side and the entire ceiling lifts. Same QB, fewer hits, more wins.',
    standout: "Bills are 11-0 when Allen's pressure rate is below 28% in a game.",
  },

  // ── Section 4: The War Room (Team metrics) ─────────────────────
  off_epa: {
    verdict: 'CONTENDER',
    verdictColor: COLOR.good,
    headline: "Top 6 offense by EPA — without elite WRs.",
    body: "+0.085 EPA per play on offense is top 6 in football. What's wild is the Bills don't have a true WR1 — Khalil Shakir (945 snaps) is a slot receiver, and the rookie Keon Coleman (785 snaps) is still developing. The offense runs through Allen plus James Cook plus the TE/RB room.",
    details: [
      { label: 'Off EPA / play', value: '+0.085', note: 'Top 6 in football.', color: COLOR.good },
      { label: 'WR1 snaps', value: 'None', note: 'Shakir is a slot, Coleman is still developing.' },
      { label: 'RZ TD rate', value: '55.6%', note: '5th in the NFL despite no dominant target.', color: COLOR.good },
      { label: 'Lead engine', value: 'Allen + Cook + TE', note: 'Concept-driven, not target-driven.' },
    ],
    conclusion: 'Imagine adding an actual #1 receiver. The ceiling here isn\'t close to capped.',
    standout: "5th in red zone TD rate (55.6%) without a dominant target.",
  },
  def_epa: {
    verdict: 'STRENGTH',
    verdictColor: COLOR.good,
    headline: "Top 7 defense, built on coverage.",
    body: "-0.068 EPA per play allowed (negative is good for defense — they're cutting opponent value). Anchored by 87.3 PFF coverage grade. Christian Benford (89.4 PFF) and Taron Johnson (80.5) form one of the league's best CB pairs. Run defense is just OK (78.4) but the Bills are happy to make teams one-dimensional.",
    details: [
      { label: 'Def EPA / play', value: '-0.068', note: 'Top 7 in the NFL (negative is good for defense).', color: COLOR.good },
      { label: 'Coverage grade', value: '87.3 PFF', note: 'Anchor of the entire unit.', color: COLOR.good },
      { label: 'Benford grade', value: '89.4 PFF', note: 'CB1 is playing at All-Pro level.', color: COLOR.gold },
      { label: 'Run D grade', value: '78.4 PFF', note: 'Solid-not-elite — the lone weakness.', color: COLOR.warn },
    ],
    conclusion: 'A coverage-first defense in a passing league is exactly the right build.',
    standout: "Allowed only 21.5 PPG — 12th best in NFL.",
  },
  pythagorean: {
    verdict: 'CONTENDER',
    verdictColor: COLOR.good,
    headline: "11.4 expected wins. Reality: 12-5.",
    body: "Pythagorean win expectancy uses points scored and allowed to predict wins. Bills' formula says they should have won 11.4 games. They won 12. That 0.6-game overperformance is normal noise and means the team's record matches their underlying performance — no luck-based regression coming.",
    details: [
      { label: 'Pythagorean wins', value: '11.4', note: 'Expected wins from points-for / points-against.' },
      { label: 'Actual wins', value: '12', note: 'Within normal noise (±1 game) of expectation.', color: COLOR.good },
      { label: 'Overperformance', value: '+0.6', note: 'Statistically meaningless — no luck regression coming.' },
      { label: 'Trend', value: '3 yrs aligned', note: 'Third straight year of Pyth ≈ actual. Sign of stable contender.', color: COLOR.good },
    ],
    conclusion: 'No luck, no fluke. The wins are earned and the floor next year is high.',
    standout: "Third straight year of Pythagorean ≈ actual wins. Sign of a stable contender.",
  },

  // ── Section 5: The Four Kingdoms ────────────────────────────────
  div_record: {
    verdict: 'CONCERN',
    verdictColor: COLOR.warn,
    headline: "4-2 in division. Lost the throne to NYJ.",
    body: "Bills went 4-2 in AFC East games but the Jets went 6-0, sweeping every divisional opponent including Buffalo. NE was 0-6 in division (worst in the league). MIA was 1-5. The division was top-heavy: NYJ dominant, Bills next, others irrelevant.",
    details: [
      { label: 'Bills div record', value: '4-2', note: 'Both losses came to the Jets.', color: COLOR.warn },
      { label: 'Jets div record', value: '6-0', note: 'Swept the entire division.', color: COLOR.bad },
      { label: 'NE / MIA', value: '0-6 / 1-5', note: 'Bottom of the division was historically bad.' },
      { label: 'Streak ended', value: '4 yrs', note: 'First time in 4 years Bills didn\'t win the AFC East.', color: COLOR.warn },
    ],
    conclusion: 'The road to the playoffs now runs through Florham Park, not Orchard Park.',
    standout: "First time in 4 years Bills didn't win the AFC East.",
  },

  // ── Section 7: The Forge (Draft) ────────────────────────────────
  bills_fit: {
    verdict: 'KEEP WATCHING',
    verdictColor: COLOR.blue,
    headline: "Bills Fit measures draft alignment with team needs.",
    body: "A Bills Fit score combines scheme fit, athletic profile match, and how badly the position needs upgrading. 80+ means a prospect addresses a critical need with the right physical profile. 60-79 means good prospect at a non-priority position. Below 60 means we'd be reaching.",
    details: [
      { label: '80+ Fit', value: 'Critical need', note: 'Right scheme + right athletic profile + premium position.', color: COLOR.good },
      { label: '60-79 Fit', value: 'Good, not urgent', note: 'Solid prospect but not at a top-need position.', color: COLOR.blue },
      { label: '<60 Fit', value: 'Reach', note: 'Don\'t draft these unless value falls.', color: COLOR.warn },
      { label: 'Top 4 needs', value: 'WR / EDGE / IOL / S', note: 'All on offense or premium defensive positions.' },
    ],
    conclusion: 'Beane historically drafts toward Fit scores. The board reflects the priority list.',
    standout: "Bills' top 4 needs are all on offense: WR, EDGE, IOL, S.",
  },

  // ── Section 8: The Proving Grounds (Combine) ───────────────────
  forty_yard: {
    verdict: 'KEEP WATCHING',
    verdictColor: COLOR.blue,
    headline: "Sub-4.4 separates elite from good.",
    body: "The 40-yard dash hasn't changed in importance since 1980. For WRs and DBs, sub-4.4 is the threshold for 'pure speed.' For RBs, sub-4.5. For OL, sub-5.1 is excellent. Times correlate strongest with downfield-threat WRs and man-coverage CBs.",
    details: [
      { label: 'WR / DB threshold', value: '<4.40', note: 'The dividing line for pure speed.', color: COLOR.good },
      { label: 'RB threshold', value: '<4.50', note: 'Speed-back tier.' },
      { label: 'OL benchmark', value: '<5.10', note: 'Excellent for offensive linemen.' },
      { label: 'Strongest correlation', value: 'Deep WR / Man CB', note: 'Where 40 time matters most on tape.' },
    ],
    conclusion: 'A 4.3 means nothing if the routes are bad. Use it as a filter, not a verdict.',
    standout: "Tyler Lockett ran 4.40 in 2015 — proof that 4.4 doesn't matter without the routes.",
  },
  vertical_jump: {
    verdict: 'KEEP WATCHING',
    verdictColor: COLOR.blue,
    headline: "Vertical jump = lower-body explosiveness.",
    body: "Measured by hands above standing reach. Above 38 inches is elite for skill positions (top 15%). Translates directly to jump-ball ability for receivers and contested catch wins for DBs. Less predictive for RBs and QBs, but a strong indicator for safety play.",
    details: [
      { label: 'Elite threshold', value: '38"+', note: 'Top 15% of skill-position prospects.', color: COLOR.good },
      { label: 'Best translation', value: 'WR / S / CB', note: 'Jump-ball + contested-catch wins.' },
      { label: 'Weakest signal', value: 'RB / QB', note: 'Less predictive at these positions.' },
    ],
    conclusion: 'Vertical is the cleanest single test for explosiveness above the waist.',
    standout: "Calvin Johnson hit 42.5\" — explains everything about him.",
  },

  // ── Section 9: The Cost of War ─────────────────────────────────
  cap_space: {
    verdict: 'CONCERN',
    verdictColor: COLOR.warn,
    headline: "$6.7M over the cap — must restructure.",
    body: "NFL teams have to be cap-compliant by the start of the league year (March 11). Bills are currently $6.7M over the limit. This is not a crisis — restructuring Allen's contract or extending Dawkins frees up $30M+ instantly. But it's a constraint on free agency moves until cleared.",
    details: [
      { label: 'Over the cap', value: '-$6.7M', note: 'Must be compliant by March 11 league year start.', color: COLOR.warn },
      { label: 'Allen restructure', value: '+$22M', note: 'Single biggest lever Beane can pull.', color: COLOR.good },
      { label: 'Dawkins extension', value: '+$8M', note: 'Second easy lever — extend the LT.', color: COLOR.good },
      { label: 'Historical pattern', value: '8 of 10 yrs', note: 'Bills have started March over the cap and always solved it.', color: COLOR.blue },
    ],
    conclusion: 'A constraint, not a crisis. Beane has run this play eight times — he\'ll run it again.',
    standout: "8th time in 10 years Bills have been over the cap pre-March. Brandon Beane always solves it.",
  },

  // ── Section 12: The Arena (Sentiment) ──────────────────────────
  sentiment_pos: {
    verdict: 'STRENGTH',
    verdictColor: COLOR.good,
    headline: "72% positive sentiment, even after a playoff loss.",
    body: "Fan sentiment usually plummets 15-25% after a playoff loss, especially one with 5 turnovers. Bills Mafia is sitting at 72% positive — almost 10% above their season average. Reason: the coaching change to Joe Brady. Fans believe the McDermott era's playoff ceiling is being addressed.",
    details: [
      { label: 'Current sentiment', value: '72% +', note: '~10 points above the season average.', color: COLOR.good },
      { label: 'Typical post-loss', value: '-15 to -25', note: 'Fan sentiment usually craters after a playoff exit.' },
      { label: 'Driver', value: 'Brady hire', note: 'Coaching change is being read as ceiling-raising.', color: COLOR.good },
      { label: 'Peak moment', value: 'Brady press', note: 'Sentiment peaked after the coaching change announcement.' },
    ],
    conclusion: 'A fanbase that believes the ceiling is rising — even after a January gut punch.',
    standout: "Sentiment is highest pre-season, lowest after Week 10 — peaked after the coaching change announcement.",
  },

  // ── Section 14: The Fellowship (Mafia) ─────────────────────────
  charity_total: {
    verdict: 'GENERATIONAL',
    verdictColor: COLOR.gold,
    headline: "$8.2M+ in fan-driven charity. Unmatched in the NFL.",
    body: "Bills Mafia's signature post-game tradition since 2017 has been donating to charities tied to opposing players or moments — Lamar Jackson's mother, Andy Dalton's foundation after Josh Allen's first playoff win, etc. No other fanbase has a sustained organic charity machine at this scale.",
    details: [
      { label: 'Total raised', value: '$8.2M+', note: 'Cumulative since the tradition started in 2017.', color: COLOR.gold },
      { label: 'Single-night peak', value: '$1.4M', note: 'Raised in one night after the Damar Hamlin incident in Jan 2023.', color: COLOR.gold },
      { label: 'Org structure', value: 'Organic', note: 'No central org — pure fan-coordinated giving.' },
      { label: 'NFL comp', value: 'None', note: 'No other fanbase operates a sustained machine at this scale.', color: COLOR.gold },
    ],
    conclusion: 'A fanbase that wins off the field even when the team loses on it.',
    standout: "$1.4M raised in a single night after the Damar Hamlin incident in January 2023.",
  },

  // ── Section 15: Drive & Efficiency Stats (NEW) ─────────────────
  success_rate: {
    headline: "Success rate is the most underrated stat in football.",
    body: "Success rate counts a play as 'successful' if it gains 50% of needed yards on 1st down, 70% on 2nd, or 100% on 3rd/4th. League average hovers around 45%. Over 50% is elite — it means an offense is staying ahead of the chains and avoiding 3rd-and-long. Bills run a top-8 offense by success rate (49.8%), which is why their EPA stays positive even on weeks the box score looks pedestrian.",
    standout: "Top-3 success rate teams since 2018 have made the playoffs 92% of the time.",
  },
  explosive_play_rate: {
    headline: "Chunk plays decide games. Bills generate one every 12 snaps.",
    body: "An explosive play is 15+ yards on a pass or 10+ on a run. League average rate is around 7.5%. Bills sit at 8.4% — top 8 in the NFL — driven by Allen's deep ball and James Cook's home-run gear. Teams in the top 10 in explosive rate score 2.3 more points per game than the league mean. Removing chunk plays from the box score takes Bills' offense from top-6 to roughly average.",
    standout: "Bills haven't lost a game in 2025 in which they hit 6+ explosive plays.",
  },
  red_zone_td_rate: {
    headline: "55.6% red zone TD rate — top 5 in football.",
    body: "Once a team crosses the opponent's 20-yard line, the math gets simple: touchdowns or field goals. League average TD rate is around 56%. Bills sit at 55.6% — basically dead on average — but their saving grace is field goal percentage (94%) and Allen's 14 rushing TDs that bail out stalled drives. The next jump for this offense is converting 60%+ inside the 20.",
    standout: "Allen accounts for 71% of Bills' red zone TDs (passing or rushing). Cheat code at the goal line.",
  },
  third_down_rate: {
    headline: "Third down conversions are the lifeblood of every drive.",
    body: "League average third down conversion rate is around 39%. Above 43% is elite. Bills convert at 44.1% — top 5 — which is the difference between a 6-play, 3-and-out series and a 12-play TD drive that flips field position and burns clock. Allen on 3rd-and-7+ is statistically the best QB in football since 2022 (54% conversion rate, 7 TDs vs 1 INT this year).",
    standout: "Bills are 11-0 when they convert 50%+ of 3rd downs in a game.",
  },
  srs_rating: {
    headline: "SRS adjusts wins for opponent strength.",
    body: "Simple Rating System measures a team's average margin of victory adjusted for strength of schedule. Zero is league average. Anything above +5 is contender territory; +10 is championship-caliber. Bills' +8.2 is top 4 in the NFL. The number means even after accounting for the AFC East's down year, they're still 8.2 points better than an average team on a neutral field.",
    standout: "Three of the last four Super Bowl winners had a regular-season SRS above +7.5.",
  },
  dvoa: {
    headline: "DVOA grades every play against league average.",
    body: "Defense-adjusted Value Over Average (Football Outsiders / FTN) compares each play to what an average team would do in the exact same situation — same down, distance, field position, opponent. League average is 0%. Bills are at +18.4% — top 5 — meaning they outperform the average team by 18.4% on a play-by-play basis. The metric removes garbage-time stats, which is why DVOA hates teams that pad numbers in blowouts.",
    standout: "Bills' DVOA has been positive in all 17 weeks of 2025. Most consistent team in the AFC.",
  },

  // ── Section 16: Position Grades & Snap Counts (NEW) ────────────
  pass_block_grade: {
    headline: "PFF pass block grade above 75 is starter-caliber.",
    body: "Pro Football Focus grades every offensive line snap on a 0-100 scale based on whether the blocker won, lost, or stalemated his rep. 75+ is a quality starter; 80+ is Pro Bowl level; 90+ is All-Pro. Bills' line averages 74.8 in pass pro — solid but not elite. The weak link is the left side: Dawkins is at 71.4, which is a 5-point drop from his 2023 peak.",
    standout: "Spencer Brown leads Bills OL at 81.2 pass block grade — 7th-best RT in the NFL.",
  },
  coverage_grade: {
    headline: "Coverage grades isolate DBs from the pass rush.",
    body: "PFF coverage grade evaluates a defender on every coverage snap — separation allowed, completion percentage, yards/coverage snap, INTs. League average is 65. Above 75 is starter; 80+ is borderline All-Pro. Christian Benford's 89.4 is top 3 among CBs in the NFL. Taron Johnson's 80.5 in the slot is top 5 at his position. That's the foundation of a top-7 defense.",
    standout: "Bills allow the lowest passer rating to opposing QBs in the AFC (78.4).",
  },
  pass_rush_grade: {
    headline: "Pressure beats coverage every time.",
    body: "PFF pass rush grade weighs sacks, hits, and hurries — but also win rate vs. the man across from you. League average is 65; 75+ is starter, 85+ is elite. Bills' EDGE room averages 73.1 — middle of the pack — which is why the team paid up to add a true 3-4 OLB in free agency and drafted Keldric Faulk in Round 2. A jump from 73 to 80 here turns a top-7 defense into a top-3 unit.",
    standout: "Greg Rousseau's 78.6 pass rush grade is Bills' best, but he's still 19th among NFL EDGE players.",
  },
  tackling_grade: {
    headline: "Missed tackles compound — every miss is a chain reaction.",
    body: "PFF tackling grade measures both completion rate and how much yardage was gained after a missed tackle. League average miss rate is 11%; elite is below 8%. Bills miss tackles at 9.2% — top 12 — but it's the worst on the EDGE (12.4%) where Rousseau and Epenesa have struggled to bring runners down in space. Linebackers Bernard and Williams are excellent (5.8% combined miss rate).",
    standout: "Christian Benford has missed 3 tackles in 920 snaps. That's a 1.4% miss rate — best in the NFL.",
  },
  snap_count: {
    headline: "Snap count is how you know who matters.",
    body: "Coaches lie. Snap counts don't. A player on the field for 80%+ of snaps is a true starter; 50-79% is a heavy rotational piece; below 30% is a specialist. Khalil Shakir at 945 snaps (87%) is the most-used WR in the offense — that's WR1 usage even if the team doesn't call it that. Keon Coleman at 785 (72%) is locked in as WR2 entering Year 2.",
    standout: "Josh Allen has played 1,142 snaps. He's missed exactly 4 offensive snaps all season.",
  },
  position_rank: {
    headline: "Position rank is the cleanest 'where do they stack up' answer.",
    body: "Position rank compares a player against every other starter at his exact position across the NFL. Top-5 means All-Pro consideration; top-10 means Pro Bowl caliber; top-32 means starter-quality. Allen ranks #2 by EPA, #4 by passer rating, #1 by total TDs. Benford ranks #3 among CBs by coverage grade. James Cook is #5 among RBs by yards from scrimmage.",
    standout: "Bills have 6 players ranked top-10 at their position. Only KC and BAL have more.",
  },

  // ── Section 17: Scheme & Tendencies (NEW) ──────────────────────
  formation_rate: {
    headline: "Shotgun vs. under-center tells you the offense's identity.",
    body: "League average shotgun rate is around 75%. Pure passing teams (KC, MIA) sit at 90%+. Run-heavy teams (PHI, BAL) drop to 60-65%. Bills run shotgun on 79% of snaps — typical pass-first split — but their under-center rate (21%) is climbing under Joe Brady because of Allen's effectiveness on play-action. That mix is what separates a balanced offense from a one-dimensional one.",
    standout: "Bills score a TD on 28% of their under-center red zone snaps. Defenses can't stop the QB sneak.",
  },
  play_action_rate: {
    headline: "Play action manipulates the second level.",
    body: "A play-action fake forces linebackers to step toward the line for a beat — opening up middle-of-field windows. League average usage is 24%. Top play-action offenses (LAR, DET, GB) hit 30%+ and gain 2.5 more yards per attempt with it. Bills run play action on 27% of dropbacks (top 8). Allen's PA passer rating is 119.4 — he's a top-3 QB on PA throws since 2022.",
    standout: "Bills average 11.2 yards per attempt on play action this year. League average is 7.8.",
  },
  blitz_rate: {
    headline: "Blitz rate is the schematic dial coaches turn first.",
    body: "A blitz is any 5+ man pressure. League average is 28%. Aggressive coaches (Bowles, Belichick disciples) push 35%+; conservative ones (Vic Fangio tree) sit at 22%. Bills under McDermott blitz at 24% — below average — because the secondary is good enough to cover for a four-man rush. That number jumps to 38% on 3rd-and-long though, which is why Allen sees so much pressure in those spots.",
    standout: "Bills are 11-0 when blitzing 30%+ in a game. They just don't trust it without a lead.",
  },
  coverage_breakdown: {
    headline: "Cover 1, 2, 3 are the alphabet of every defense.",
    body: "Cover 1 = single-high safety, man across the board (aggressive). Cover 2 = two safeties splitting the deep field, zone underneath (safe). Cover 3 = single-high, zones to the field and boundary (most common base call in the NFL). Bills run Cover 3 on 41% of snaps under McDermott — slightly above league average — with Cover 1 (24%) and Cover 2 (18%) as their secondary calls. The 17% in 'other' is mostly Cover 6 split-field calls.",
    standout: "Bills allow a 62.4 passer rating in Cover 1. Best Cover 1 defense in football this year.",
  },

  // ── Section 18: Health & Injury Status (NEW) ───────────────────
  injury_status: {
    headline: "Out / Doubtful / Questionable is the league's worst-kept secret.",
    body: "The official injury report has four tiers. OUT means a player won't play, period. DOUBTFUL is a 25% chance of playing. QUESTIONABLE is a 50/50 (in reality, 75% of QUESTIONABLE players play). PROBABLE was eliminated in 2016 because everyone was 'probable.' Coaches now use QUESTIONABLE as a strategic fog — listing healthy starters to mess with opponent prep.",
    standout: "76% of players listed QUESTIONABLE in 2024 played. Treat the tag as 'probably playing.'",
  },
  recovery_timeline: {
    headline: "Injury timeline drives roster math more than the depth chart.",
    body: "Recovery windows are roughly: hamstring strain (1-3 weeks), high ankle sprain (3-6), ACL (9-12 months), Achilles (10-14 months), Lisfranc (5-7 months), pectoral tear (3-4 months). Matt Milano's pectoral landed him on IR with a return-to-play target of October 2026 — meaning Bills are planning the early-season LB rotation without him. That's why Jacob Rodriguez was the R3 pick.",
    standout: "Players returning from ACL surgery underperform their pre-injury PFF grade by an average of 8.2 points in Year 1.",
  },

  // ── Section 19: Cap & Roster Mechanics (NEW) ───────────────────
  cap_dead_money: {
    headline: "Dead money is what you owe a player who's no longer on the team.",
    body: "When a player is cut or traded, any unamortized signing bonus and remaining guarantees accelerate onto the cap as 'dead money.' It counts against the team's cap with zero on-field benefit. League average dead money is around $15M; below $10M is healthy; above $30M means a team is paying for past mistakes. Bills' $11.4M dead money is top 8 in the NFL.",
    standout: "Bills' biggest 2026 dead money hit is $4.1M for the released Tre'Davious White. Cleanest cap in the AFC East.",
  },

  // ── Section 20: Draft Mechanics (NEW) ──────────────────────────
  prospect_grade: {
    headline: "Prospect grades are a 0-100 'NFL readiness' score.",
    body: "Most NFL scouts grade prospects on a 100-point scale. 90+ = elite Round 1 talent (top 10 picks). 85-89 = Round 1 / early Round 2. 80-84 = Round 2-3 starter projection. 75-79 = Round 3-4 contributor. 70-74 = Day 3 developmental. Below 70 = priority UDFA. The grade combines tape quality, athletic profile, scheme versatility, and character. Bills' top draft target Omar Cooper Jr. graded at 93 — top 5 prospect in this class.",
    standout: "First-round picks since 2010 with grades 90+ have a 78% Pro Bowl rate. Below 85: only 41%.",
  },
  prospect_round: {
    headline: "Round projection is where consensus thinks a player goes.",
    body: "Round projections aggregate mock drafts, scout boards, and team-source intel. Round 1 is the franchise tier. Round 2 is the 'should start by Year 2' tier. Round 3 is the 'high-ceiling rotational' tier. Rounds 4-7 are developmental and special teams. Where a prospect actually goes vs. his projection is the value gap — Bills landed Keldric Faulk in Round 2 when his projection was Round 1 (#15-25 range). That's a steal.",
    standout: "The biggest value gaps in NFL draft history (top-15 talent slipping past 50) hit Pro Bowl 64% of the time.",
  },

  // ── Section 21: Combine Drills (NEW) ───────────────────────────
  combine_bench: {
    headline: "225-pound bench reps measure functional upper-body strength.",
    body: "Combine bench is 225 lbs for max reps. League average for OL is 22; for DL it's 24. Above 30 is elite — usually a sign of a power player who can anchor against the NFL bull rush. Below 18 raises questions about play strength. Skill-position numbers don't matter much (WRs / DBs are tested but rarely judged on it). Tyleik Williams' 30 reps at the 2026 combine confirmed his elite anchor strength.",
    standout: "The all-time combine bench record is 49 reps (Stephen Paea, 2011). He had a journeyman 8-year career — bench doesn't predict careers.",
  },
  combine_broad_jump: {
    headline: "Broad jump is the cleanest test of lower-body explosive power.",
    body: "Broad jump measures horizontal lower-body power without technique masking the output. Above 120 inches (10 feet) is good for skill positions; above 130 is elite. For OL/DL, anything over 110 is excellent. The number correlates strongly with first-step quickness off the line and break-tackle ability for RBs. Benjamin Morrison hit 131 — that explains his transition burst out of breaks.",
    standout: "Top 10 broad jumps among CBs since 2010 have a 70% NFL starter rate. It tracks.",
  },
  combine_three_cone: {
    headline: "Three-cone is the agility king. Sub-6.9 seconds is rare air.",
    body: "Three-cone (also called the L-drill) measures change of direction and body control. Sub-6.9 is elite for skill positions; sub-7.0 for EDGE rushers; sub-7.4 for OL. The drill exposes hip stiffness and footwork sloppiness. Benjamin Morrison's 6.72 is top-3 among 2026 CBs — a sign he can flip his hips and stay in phase with NFL receivers on double moves.",
    standout: "Three-cone correlates with PFF coverage grade better than any other combine number for CBs.",
  },
  combine_shuttle: {
    headline: "Short shuttle measures short-area quickness — burst without straight-line speed.",
    body: "The 20-yard shuttle (5-10-5) is a lateral-movement drill. Sub-4.0 is elite for skill positions; sub-4.2 for EDGE; sub-4.5 for IOL. It tests how fast a player can plant, redirect, and accelerate — exactly the movement pattern of a slot CB or interior pass rusher. Xavier Watts' 4.00 confirmed the in-the-box safety projection that his Notre Dame tape suggested.",
    standout: "Among the 2026 class, only 4 prospects ran sub-4.0 in the shuttle. All four are projected as Day 1-2 picks.",
  },

  // ── Section 22: Home Field & Weather (NEW) ─────────────────────
  home_field_advantage: {
    headline: "Home field is worth roughly 2.5 points. In Buffalo, more.",
    body: "Across the NFL, home teams win about 56% of regular-season games — worth roughly 2.5 points to the Vegas spread. Highmark Stadium is one of the toughest road environments in the league: open-air, lake-effect weather, 71,000 of the loudest fans alive. Bills are 6-2 at home in 2025 with the average margin of victory at +9.3. Visiting teams average 1.4 false start penalties per game in Buffalo — the highest in the NFL.",
    standout: "Bills are 28-9 at home since 2022. Only the Chiefs have a better home record over that span.",
  },
  cold_record: {
    headline: "Bills are 14-3 since 2022 in games below 32 degrees.",
    body: "Cold-weather games (kickoff temp below 32°F) flip the strategic script: passing yards drop ~12% league-wide, fumble rates climb ~23%, and field goals over 45 yards convert at 67% (vs. 78% in warm conditions). Bills are built for it — Allen's hand size (10 1/8\"), James Cook's downhill running style, and a defense that thrives forcing turnovers in slick conditions. The 14-3 record in sub-freezing games since 2022 is the best in the NFL.",
    standout: "Bills are 6-0 since 2022 in games where kickoff temp was below 20°F. The 'Buffalo factor' is real.",
  },
  weather_impact: {
    headline: "Weather flips the math on every game model.",
    body: "Wind above 15 mph drops passing efficiency league-wide by ~18% (per Pro Football Focus). Snow / heavy rain cuts deep ball completion rate roughly in half. Cold below 32°F adds about 10% to fumble rates. Vegas adjusts spreads by 1-3 points for severe weather. Bills' four 'weather games' in 2025 (snow, sleet, or wind > 20 mph): they went 4-0, outscored opponents 112-44.",
    standout: "When forecast wind is above 20 mph at Highmark, the Bills are 11-1 since 2020.",
  },

  // ── Section 23: Fan Engagement & Sentiment (NEW) ───────────────
  fan_engagement: {
    headline: "Bills Mafia drives the most engaged fanbase in the NFL.",
    body: "Engagement combines social media reach, merchandise sales, ticket renewal rates, and watch-party attendance. Bills lead the NFL in season ticket renewals (98.3% — second-highest is GB at 96.8%). Bills Mafia generates more game-day social impressions than any fanbase except KC, despite Buffalo being the smallest media market in the NFL. The grassroots structure (no central org, all peer-led) is what makes it sticky — it can't be co-opted or branded.",
    standout: "Bills jersey sales are the #3 in the NFL despite being the #28 media market. That ratio is unmatched.",
  },
  trending_topic: {
    headline: "Trending topics measure where conversation is concentrated right now.",
    body: "A trending topic spike means at least 3x normal mention volume in a 6-hour window. The system tracks Twitter/X, Reddit r/buffalobills, Discord servers, Bills-specific podcasts, and Substack chatter. Topics ranked by total volume + sentiment polarity. The signal isn't whether something is positive or negative — it's whether the fanbase is locked in. A sudden spike in 'Brady offense' chatter (current trending #1) means a coordinator change has captured the room.",
    standout: "The top trending topic 72 hours before kickoff predicts game-day attendance variance with 78% accuracy.",
  },
  prediction_consensus: {
    headline: "Crowd predictions track wisdom-of-crowds against Vegas + ESPN models.",
    body: "Prediction consensus aggregates user picks against Vegas spreads, ESPN's FPI, PFF's WAR-based model, and 538's ELO. When the crowd disagrees with Vegas by more than 8% on win probability, the crowd has been right about 54% of the time historically (slightly better than Vegas). For Bills specifically, the home crowd consistently overrates Buffalo by 3-4% vs. neutral models — a known fan bias to fade.",
    standout: "The Bills Dashboard community went 11-6 against the spread in 2024 — beating Vegas by 4 games over the season.",
  },

  // ── Default for unspecified ────────────────────────────────────
  _default: {
    verdict: 'KEEP WATCHING',
    verdictColor: COLOR.blue,
    headline: "Analyzing...",
    body: "Coach is reviewing the tape on this one.",
    details: [],
    conclusion: '',
    standout: "",
  },
};

export function getInsight(key) {
  return INSIGHTS[key] || INSIGHTS._default;
}
