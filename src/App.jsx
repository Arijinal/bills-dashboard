import { Suspense, lazy } from 'react';
import { ScrollOrchestratorProvider } from './components/ScrollOrchestrator';
import QuestLog from './components/QuestLog';
import SectionContainer from './components/SectionContainer';
import ChapterDivider from './components/ChapterDivider';

// Lazy-load each section page (these will be turned into scroll sections)
const Dashboard = lazy(() => import('./pages/Dashboard'));         // → SECTION 1: legacy hero (replaced by ArrivalScene)
const SeasonRoom = lazy(() => import('./pages/SeasonRoom'));       // → SECTION 2 detail follow-up
const ArrivalScene = lazy(() => import('./components/scenes/ArrivalScene')); // → SECTION 1: The Arrival (sticky scroll scene)
const SundayReckoningScene = lazy(() => import('./components/scenes/SundayReckoningScene')); // → SECTION 2: The Sunday Reckoning (sticky scroll scene)
const FourKingdomsScene = lazy(() => import('./components/scenes/FourKingdomsScene')); // → SECTION 5: The Four Kingdoms (sticky scroll scene)
const FranchiseScene = lazy(() => import('./components/scenes/FranchiseScene')); // → SECTION 3: The Franchise (sticky scroll scene)
const ChampionsDuelScene = lazy(() => import('./components/scenes/ChampionsDuelScene')); // → SECTION 6: Champion's Duel (procedural sticky scene)
const ForgeScene = lazy(() => import('./components/scenes/ForgeScene'));         // → SECTION 7: The Forge (sticky scroll scene)
const ProvingGroundsScene = lazy(() => import('./components/scenes/ProvingGroundsScene')); // → SECTION 8: Proving Grounds (sticky scroll scene)
const AllenCenter = lazy(() => import('./pages/AllenCenter'));     // → SECTION 3 detail follow-up
const AnalyticsHub = lazy(() => import('./pages/AnalyticsHub'));   // → SECTION 4: The War Room (PFF + stats + efficiency)
const TeamStatsPage = lazy(() => import('./pages/TeamStatsPage')); // → SECTION 4: The War Room
const EfficiencyPage = lazy(() => import('./pages/EfficiencyPage'));
const AFCEastPage = lazy(() => import('./pages/AFCEastPage'));     // → SECTION 5: Four Kingdoms
const ComparisonLab = lazy(() => import('./pages/ComparisonLab')); // → SECTION 6: Champion's Duel
const DraftCenter = lazy(() => import('./pages/DraftCenter'));     // → SECTION 7: The Forge
const CombineCenter = lazy(() => import('./pages/CombineCenter')); // → SECTION 8: Proving Grounds
const RosterOps = lazy(() => import('./pages/RosterOps'));         // → SECTION 9: Cost of War (with Injuries)
const InjuryPage = lazy(() => import('./pages/InjuryPage'));
const WeatherPage = lazy(() => import('./pages/WeatherPage'));     // → SECTION 10: The Storm
const NewsPage = lazy(() => import('./pages/NewsPage'));           // → SECTION 11: The Chronicles
const SocialPage = lazy(() => import('./pages/SocialPage'));       // → SECTION 12: The Arena
const PredictionsPage = lazy(() => import('./pages/PredictionsPage')); // → SECTION 13: The Prophecy
const PollsPage = lazy(() => import('./pages/PollsPage'));
const MafiaCorner = lazy(() => import('./pages/MafiaCorner'));     // → SECTION 14: The Fellowship
const UniversePage = lazy(() => import('./pages/UniversePage'));   // → SECTION 15: Universe Beyond

// New unified ChapterScene-based scenes for the remaining sections
const WarRoomScene = lazy(() => import('./components/scenes/WarRoomScene'));         // → SECTION 4: The War Room
const CostOfWarScene = lazy(() => import('./components/scenes/CostOfWarScene'));     // → SECTION 9: Cost of War
const StormScene = lazy(() => import('./components/scenes/StormScene'));             // → SECTION 10: The Storm
const ChroniclesScene = lazy(() => import('./components/scenes/ChroniclesScene'));   // → SECTION 11: The Chronicles
const ArenaScene = lazy(() => import('./components/scenes/ArenaScene'));             // → SECTION 12: The Arena
const ProphecyScene = lazy(() => import('./components/scenes/ProphecyScene'));       // → SECTION 13: The Prophecy
const FellowshipScene = lazy(() => import('./components/scenes/FellowshipScene'));   // → SECTION 14: The Fellowship
const UniverseScene = lazy(() => import('./components/scenes/UniverseScene'));       // → SECTION 15: The Universe

const SECTION_IDS = [
  'arrival', 'sunday-reckoning', 'franchise', 'war-room', 'four-kingdoms',
  'champions-duel', 'forge', 'proving-grounds', 'cost-of-war', 'storm',
  'chronicles', 'arena', 'prophecy', 'fellowship', 'universe'
];

const SectionFallback = () => (
  <div style={{
    minHeight: '50vh',
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
    <ScrollOrchestratorProvider sectionIds={SECTION_IDS}>
      <QuestLog />
      <main style={{ position: 'relative' }}>
        <SectionContainer id="arrival" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><ArrivalScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="sunday-reckoning" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><SundayReckoningScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Season Room as a normal section after the scene */}
        <section id="sunday-reckoning-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><SeasonRoom /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="franchise" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><FranchiseScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Allen intel center as a normal section after the scene */}
        <section id="franchise-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><AllenCenter /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="war-room" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><WarRoomScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full PFF + Team Stats + Efficiency intel */}
        <section id="war-room-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}>
            <AnalyticsHub />
            <TeamStatsPage />
            <EfficiencyPage />
          </Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="four-kingdoms" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><FourKingdomsScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full AFC East intel as a normal section after the scene */}
        <section id="four-kingdoms-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><AFCEastPage /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="champions-duel" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><ChampionsDuelScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Comparison Lab as a normal section after the scene */}
        <section id="champions-duel-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><ComparisonLab /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="forge" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><ForgeScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Draft Center as a normal section after the scene */}
        <section id="forge-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><DraftCenter /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="proving-grounds" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><ProvingGroundsScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Combine Center as a normal section after the scene */}
        <section id="proving-grounds-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><CombineCenter /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="cost-of-war" accentTone="fire">
          <Suspense fallback={<SectionFallback />}><CostOfWarScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — Injury Report + Roster Ops */}
        <section id="cost-of-war-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}>
            <InjuryPage />
            <RosterOps />
          </Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="storm" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><StormScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Weather Operations breakdown */}
        <section id="storm-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><WeatherPage /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="chronicles" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><ChroniclesScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full News & Intel feed */}
        <section id="chronicles-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><NewsPage /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="arena" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><ArenaScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Sentiment & Social intel */}
        <section id="arena-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><SocialPage /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="prophecy" accentTone="mystical">
          <Suspense fallback={<SectionFallback />}><ProphecyScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — Predictions + Polls deep dive */}
        <section id="prophecy-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}>
            <PredictionsPage />
            <PollsPage />
          </Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="fellowship" accentTone="fire">
          <Suspense fallback={<SectionFallback />}><FellowshipScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Mafia Corner content */}
        <section id="fellowship-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><MafiaCorner /></Suspense>
        </section>
        <ChapterDivider />

        <SectionContainer id="universe" accentTone="mystical">
          <Suspense fallback={<SectionFallback />}><UniverseScene /></Suspense>
        </SectionContainer>
        <ChapterDivider />
        {/* Detail follow-up — full Universe links page */}
        <section id="universe-detail" style={{ position: 'relative', padding: '4rem 2rem', background: 'var(--bg-base)' }}>
          <Suspense fallback={<SectionFallback />}><UniversePage /></Suspense>
        </section>
      </main>
    </ScrollOrchestratorProvider>
  );
}
