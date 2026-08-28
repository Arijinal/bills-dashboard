import { Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import { ScrollOrchestratorProvider } from './components/ScrollOrchestrator';
import QuestLog from './components/QuestLog';
import MagLift from './components/MagLift';
import ChapterTabs from './components/ChapterTabs';
import ChapterDivider from './components/ChapterDivider';
import TriptychIntro from './components/TriptychIntro';

// Lazy-load each section page (these will be turned into scroll sections)
const SeasonRoom = lazy(() => import('./pages/SeasonRoom'));       // → SECTION 2 detail follow-up
const ArrivalScene = lazy(() => import('./components/scenes/ArrivalScene')); // → SECTION 1: The Arrival
const DispatchScene = lazy(() => import('./components/scenes/DispatchScene')); // → SECTION 1.5: Uncle Jr.'s Dispatch
const SundayReckoningScene = lazy(() => import('./components/scenes/SundayReckoningScene')); // → SECTION 2
const FourKingdomsScene = lazy(() => import('./components/scenes/FourKingdomsScene')); // → SECTION 5
const FranchiseScene = lazy(() => import('./components/scenes/FranchiseScene')); // → SECTION 3
const ChampionsDuelScene = lazy(() => import('./components/scenes/ChampionsDuelScene')); // → SECTION 6
const ForgeScene = lazy(() => import('./components/scenes/ForgeScene'));         // → SECTION 7
const ProvingGroundsScene = lazy(() => import('./components/scenes/ProvingGroundsScene')); // → SECTION 8
const AllenCenter = lazy(() => import('./pages/AllenCenter'));     // → SECTION 3 detail follow-up
const AnalyticsHub = lazy(() => import('./pages/AnalyticsHub'));   // → SECTION 4
const TeamStatsPage = lazy(() => import('./pages/TeamStatsPage'));
const EfficiencyPage = lazy(() => import('./pages/EfficiencyPage'));
const AFCEastPage = lazy(() => import('./pages/AFCEastPage'));     // → SECTION 5 detail
const ComparisonLab = lazy(() => import('./pages/ComparisonLab')); // → SECTION 6 detail
const DraftCenter = lazy(() => import('./pages/DraftCenter'));     // → SECTION 7 detail
const CombineCenter = lazy(() => import('./pages/CombineCenter')); // → SECTION 8 detail
const RosterOps = lazy(() => import('./pages/RosterOps'));         // → SECTION 9 detail
const InjuryPage = lazy(() => import('./pages/InjuryPage'));
const WeatherPage = lazy(() => import('./pages/WeatherPage'));     // → SECTION 10 detail
const NewsPage = lazy(() => import('./pages/NewsPage'));           // → SECTION 11 detail
const SocialPage = lazy(() => import('./pages/SocialPage'));       // → SECTION 12 detail
const PredictionsPage = lazy(() => import('./pages/PredictionsPage')); // → SECTION 13 detail
const PropheticWall = lazy(() => import('./pages/PropheticWall'));     // → SECTION 13 detail (fan wall, augments PredictionsPage)
const PollsPage = lazy(() => import('./pages/PollsPage'));
const MafiaCorner = lazy(() => import('./pages/MafiaCorner'));     // → SECTION 14 detail
const UniversePage = lazy(() => import('./pages/UniversePage'));   // → SECTION 15 detail

// Procedural / canvas scenes (no PNG)
const WarRoomScene = lazy(() => import('./components/scenes/WarRoomScene'));         // → SECTION 4
const CostOfWarScene = lazy(() => import('./components/scenes/CostOfWarScene'));     // → SECTION 9
const StormScene = lazy(() => import('./components/scenes/StormScene'));             // → SECTION 10
const ChroniclesScene = lazy(() => import('./components/scenes/ChroniclesScene'));   // → SECTION 11
const ArenaScene = lazy(() => import('./components/scenes/ArenaScene'));             // → SECTION 12
const ProphecyScene = lazy(() => import('./components/scenes/ProphecyScene'));       // → SECTION 13
const FellowshipScene = lazy(() => import('./components/scenes/FellowshipScene'));   // → SECTION 14
const UniverseScene = lazy(() => import('./components/scenes/UniverseScene'));       // → SECTION 15
const ArmoryScene = lazy(() => import('./components/scenes/ArmoryScene'));           // closer: merch coming soon

const SECTION_IDS = [
  'arrival', 'dispatch', 'sunday-reckoning', 'franchise', 'war-room', 'four-kingdoms',
  'champions-duel', 'forge', 'proving-grounds', 'cost-of-war', 'storm',
  'chronicles', 'arena', 'prophecy', 'fellowship', 'universe', 'armory'
];

// Full-viewport fallback: every primary chapter is >=100vh, so a
// matching placeholder halves the layout shift when chunks mount —
// the root cause of scroll drift during chapter jumps.
const SectionFallback = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
  }}>
    LOADING...
  </div>
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <ScrollOrchestratorProvider sectionIds={SECTION_IDS}>
      <ChapterTabs />
      <QuestLog />
      <MagLift />
      <main style={{ position: 'relative', paddingTop: '48px' }}>
        <Suspense fallback={<SectionFallback />}><ArrivalScene /></Suspense>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><DispatchScene /></Suspense>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><SundayReckoningScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — full Season Room */}
        <section id="sunday-reckoning-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><SeasonRoom /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><FranchiseScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Allen intel center */}
        <section id="franchise-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><AllenCenter /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><WarRoomScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — PFF + Team Stats + Efficiency */}
        <section id="war-room-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}>
            <AnalyticsHub />
            <TeamStatsPage />
            <EfficiencyPage />
          </Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><FourKingdomsScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — AFC East intel */}
        <section id="four-kingdoms-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><AFCEastPage /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ChampionsDuelScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Comparison Lab */}
        <section id="champions-duel-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><ComparisonLab /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ForgeScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Draft Center */}
        <section id="forge-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><DraftCenter /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ProvingGroundsScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Combine Center */}
        <section id="proving-grounds-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><CombineCenter /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><CostOfWarScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Injury Report + Roster Ops */}
        <section id="cost-of-war-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}>
            <InjuryPage />
            <RosterOps />
          </Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><StormScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Weather Operations */}
        <section id="storm-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><WeatherPage /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ChroniclesScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — News & Intel feed */}
        <section id="chronicles-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><NewsPage /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ArenaScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Sentiment & Social */}
        <section id="arena-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><SocialPage /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><ProphecyScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Triptych: Algorithm / Mafia / Crowd */}
        <section id="prophecy-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <TriptychIntro />
          <Suspense fallback={<SectionFallback />}>
            <PredictionsPage />
            <PropheticWall />
            <PollsPage />
          </Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><FellowshipScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Mafia Corner */}
        <section id="fellowship-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><MafiaCorner /></Suspense>
        </section>
        <ChapterDivider />

        <Suspense fallback={<SectionFallback />}><UniverseScene /></Suspense>
        <ChapterDivider />
        {/* Detail follow-up — Universe links */}
        <section id="universe-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><UniversePage /></Suspense>
        </section>
        <ChapterDivider />
        <Suspense fallback={<SectionFallback />}><ArmoryScene /></Suspense>
      </main>
    </ScrollOrchestratorProvider>
    </MotionConfig>
  );
}
