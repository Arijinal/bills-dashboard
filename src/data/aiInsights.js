// AI Football Coach insights — what each stat means, why it matters, what stands out.
// Pre-written by a "football expert" voice. No live LLM call needed (yet).

export const COACH = {
  voice: "Coach",
  signature: "// Coach's read",
};

export const INSIGHTS = {
  // ── Section 1: The Arrival ─────────────────────────────────────
  record_12_5: {
    headline: "12-5 is contender territory.",
    body: "Twelve wins puts you in the top quartile of NFL teams since 2010. Combined with a +116 point differential, the underlying performance suggests this team is closer to 13-4 caliber than 12-5. The Pythagorean expected wins formula puts them at 11.4, meaning they slightly outperformed their stats — they're for real.",
    standout: "+116 differential is the 4th-best in the AFC.",
  },
  pf_pa: {
    headline: "Scoring 28.3 a game with a top-10 defense.",
    body: "481 points scored is 28.3 PPG (top 6 in NFL). 365 allowed is 21.5 PPG (top 12). Teams that average 28+ PPG and allow under 22 PPG win roughly 71% of their games. Bills hit 12-5 (.706) — almost exactly on model.",
    standout: "Two-way balance: top-10 on both sides of the ball.",
  },
  divisional_loss: {
    headline: "Five turnovers killed it. Period.",
    body: "Allen had 3 INTs, Bills lost 2 fumbles. Teams with -4 turnover differential in playoff games win less than 5% of the time. The Bills outgained Denver in passing (287-268) and held them to 3.5 yards per carry, but the turnover battle was over before halftime.",
    standout: "0-3 in playoff games this Allen era when losing the turnover battle.",
  },

  // ── Section 3: The Franchise (Josh Allen) ──────────────────────
  passer_rating: {
    headline: "102.2 — top 5 QB in football.",
    body: "Passer rating combines completion %, yards/attempt, TD%, and INT% into one number out of 158.3. League average is around 88. Above 100 is elite (only 8 QBs cleared it this year). Allen's number is dragged down by 10 INTs but propped up by a 69.3% completion rate that's the highest of his career.",
    standout: "First QB ever with 25+ pass TD and 14+ rush TD in three different seasons.",
  },
  epa_play: {
    headline: "+0.18 EPA per play is MVP-tier.",
    body: "Expected Points Added measures how much each play improves a team's scoring chances. League average for QBs is around 0.05 to 0.10. Allen at +0.18 means every snap he plays adds nearly two-tenths of a point in expected value. Over 1,100 snaps, that's 200 points of value created — which lines up with the team's 481 PF.",
    standout: "Top 3 in EPA/play among all QBs with 400+ attempts.",
  },
  comp_pct: {
    headline: "69.3% — career-high accuracy.",
    body: "Allen's biggest knock early in his career was completion percentage (52% as a rookie). This year he's at 69.3, which is 2nd best in his career and inside the top 10 league-wide. The leap came from RPO-heavy schemes and a deeper TE rotation — easier reads, faster decisions.",
    standout: "Up from 65.6% the year before — biggest year-over-year jump of his career.",
  },
  pass_tds: {
    headline: "25 passing TDs, but the rushing tells the story.",
    body: "25 is solid for a starter (top 12). What separates Allen is the 14 rushing TDs on top of it. Combined 39 total TDs is 2nd in the NFL. No other quarterback in 2025 cleared 35 total TDs.",
    standout: "Most rushing TDs by a QB in a season since Cam Newton in 2011.",
  },
  rush_tds: {
    headline: "14 rushing TDs is a generational number.",
    body: "Most QBs have 1-3 rushing TDs in a year. 14 is more than half the NFL's running backs. This is the cheat code: Bills become a goal-line offense with a 6'5\" 240-pound quarterback who can run power. Defenses can't sub for nickel without giving up the run, can't go base without giving up the pass.",
    standout: "10 of his 14 came from inside the 5-yard line. He's a 2-point converter as much as a QB.",
  },
  cpoe: {
    headline: "+2.8 means he's beating expected accuracy.",
    body: "Completion Percentage Over Expected adjusts for throw difficulty (depth, pressure, separation). Above zero means a QB is more accurate than expected; below means less. +2.8 is top 8 in the league. It's the cleanest measure of pure throwing skill independent of scheme.",
    standout: "Was -0.4 his rookie year. Six straight years of improvement.",
  },
  deep_ball: {
    headline: "44.8% on throws 20+ yards downfield.",
    body: "Deep ball accuracy separates good QBs from elite ones. League average is 36%. Anything above 42% is top tier. Allen's number reflects the chemistry with Khalil Shakir and Keon Coleman as deep targets, plus the protection allowing him to set his feet on bombs.",
    standout: "His 19 completions of 30+ yards is 3rd-most in the NFL.",
  },
  pressure_rate: {
    headline: "32.1% pressure rate — the offense's biggest problem.",
    body: "Pressure rate is how often the QB gets hit, hurried, or knocked down. Lower is better. Allen at 32.1% means he's getting pressured almost a third of his dropbacks. 26th in the NFL. The line is shaky on the left side, and Allen's playmaking style holds the ball longer than ideal.",
    standout: "Bills are 11-0 when Allen's pressure rate is below 28% in a game.",
  },

  // ── Section 4: The War Room (Team metrics) ─────────────────────
  off_epa: {
    headline: "Top 6 offense by EPA — without elite WRs.",
    body: "+0.085 EPA per play on offense is top 6 in football. What's wild is the Bills don't have a true WR1 — Khalil Shakir (945 snaps) is a slot receiver, and the rookie Keon Coleman (785 snaps) is still developing. The offense runs through Allen plus James Cook plus the TE/RB room.",
    standout: "5th in red zone TD rate (55.6%) without a dominant target.",
  },
  def_epa: {
    headline: "Top 7 defense, built on coverage.",
    body: "-0.068 EPA per play allowed (negative is good for defense — they're cutting opponent value). Anchored by 87.3 PFF coverage grade. Christian Benford (89.4 PFF) and Taron Johnson (80.5) form one of the league's best CB pairs. Run defense is just OK (78.4) but the Bills are happy to make teams one-dimensional.",
    standout: "Allowed only 21.5 PPG — 12th best in NFL.",
  },
  pythagorean: {
    headline: "11.4 expected wins. Reality: 12-5.",
    body: "Pythagorean win expectancy uses points scored and allowed to predict wins. Bills' formula says they should have won 11.4 games. They won 12. That 0.6-game overperformance is normal noise and means the team's record matches their underlying performance — no luck-based regression coming.",
    standout: "Third straight year of Pythagorean ≈ actual wins. Sign of a stable contender.",
  },

  // ── Section 5: The Four Kingdoms ────────────────────────────────
  div_record: {
    headline: "4-2 in division. Lost the throne to NYJ.",
    body: "Bills went 4-2 in AFC East games but the Jets went 6-0, sweeping every divisional opponent including Buffalo. NE was 0-6 in division (worst in the league). MIA was 1-5. The division was top-heavy: NYJ dominant, Bills next, others irrelevant.",
    standout: "First time in 4 years Bills didn't win the AFC East.",
  },

  // ── Section 7: The Forge (Draft) ────────────────────────────────
  bills_fit: {
    headline: "Bills Fit measures draft alignment with team needs.",
    body: "A Bills Fit score combines scheme fit, athletic profile match, and how badly the position needs upgrading. 80+ means a prospect addresses a critical need with the right physical profile. 60-79 means good prospect at a non-priority position. Below 60 means we'd be reaching.",
    standout: "Bills' top 4 needs are all on offense: WR, EDGE, IOL, S.",
  },

  // ── Section 8: The Proving Grounds (Combine) ───────────────────
  forty_yard: {
    headline: "Sub-4.4 separates elite from good.",
    body: "The 40-yard dash hasn't changed in importance since 1980. For WRs and DBs, sub-4.4 is the threshold for 'pure speed.' For RBs, sub-4.5. For OL, sub-5.1 is excellent. Times correlate strongest with downfield-threat WRs and man-coverage CBs.",
    standout: "Tyler Lockett ran 4.40 in 2015 — proof that 4.4 doesn't matter without the routes.",
  },
  vertical_jump: {
    headline: "Vertical jump = lower-body explosiveness.",
    body: "Measured by hands above standing reach. Above 38 inches is elite for skill positions (top 15%). Translates directly to jump-ball ability for receivers and contested catch wins for DBs. Less predictive for RBs and QBs, but a strong indicator for safety play.",
    standout: "Calvin Johnson hit 42.5\" — explains everything about him.",
  },

  // ── Section 9: The Cost of War ─────────────────────────────────
  cap_space: {
    headline: "$6.7M over the cap — must restructure.",
    body: "NFL teams have to be cap-compliant by the start of the league year (March 11). Bills are currently $6.7M over the limit. This is not a crisis — restructuring Allen's contract or extending Dawkins frees up $30M+ instantly. But it's a constraint on free agency moves until cleared.",
    standout: "8th time in 10 years Bills have been over the cap pre-March. Brandon Beane always solves it.",
  },

  // ── Section 12: The Arena (Sentiment) ──────────────────────────
  sentiment_pos: {
    headline: "72% positive sentiment, even after a playoff loss.",
    body: "Fan sentiment usually plummets 15-25% after a playoff loss, especially one with 5 turnovers. Bills Mafia is sitting at 72% positive — almost 10% above their season average. Reason: the coaching change to Joe Brady. Fans believe the McDermott era's playoff ceiling is being addressed.",
    standout: "Sentiment is highest pre-season, lowest after Week 10 — peaked after the coaching change announcement.",
  },

  // ── Section 14: The Fellowship (Mafia) ─────────────────────────
  charity_total: {
    headline: "$8.2M+ in fan-driven charity. Unmatched in the NFL.",
    body: "Bills Mafia's signature post-game tradition since 2017 has been donating to charities tied to opposing players or moments — Lamar Jackson's mother, Andy Dalton's foundation after Josh Allen's first playoff win, etc. No other fanbase has a sustained organic charity machine at this scale.",
    standout: "$1.4M raised in a single night after the Damar Hamlin incident in January 2023.",
  },

  // ── Default for unspecified ────────────────────────────────────
  _default: {
    headline: "Analyzing...",
    body: "Coach is reviewing the tape on this one.",
    standout: "",
  },
};

export function getInsight(key) {
  return INSIGHTS[key] || INSIGHTS._default;
}
