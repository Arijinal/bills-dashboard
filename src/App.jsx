import { Suspense, lazy } from 'react';
import { ScrollOrchestratorProvider } from './components/ScrollOrchestrator';
import QuestLog from './components/QuestLog';
import SectionContainer from './components/SectionContainer';
import ChapterDivider from './components/ChapterDivider';

// Lazy-load each section page (these will be turned into scroll sections)
const Dashboard = lazy(() => import('./pages/Dashboard'));         // → SECTION 1: The Arrival
const SeasonRoom = lazy(() => import('./pages/SeasonRoom'));       // → SECTION 2: The Sunday Reckoning
const AllenCenter = lazy(() => import('./pages/AllenCenter'));     // → SECTION 3: The Franchise
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
          <Suspense fallback={<SectionFallback />}><Dashboard /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="sunday-reckoning" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><SeasonRoom /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="franchise" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><AllenCenter /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="war-room" accentTone="cool">
          <Suspense fallback={<SectionFallback />}>
            <AnalyticsHub />
            <TeamStatsPage />
            <EfficiencyPage />
          </Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="four-kingdoms" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><AFCEastPage /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="champions-duel" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><ComparisonLab /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="forge" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><DraftCenter /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="proving-grounds" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><CombineCenter /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="cost-of-war" accentTone="fire">
          <Suspense fallback={<SectionFallback />}>
            <InjuryPage />
            <RosterOps />
          </Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="storm" accentTone="cool">
          <Suspense fallback={<SectionFallback />}><WeatherPage /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="chronicles" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><NewsPage /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="arena" accentTone="warm">
          <Suspense fallback={<SectionFallback />}><SocialPage /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="prophecy" accentTone="mystical">
          <Suspense fallback={<SectionFallback />}>
            <PredictionsPage />
            <PollsPage />
          </Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="fellowship" accentTone="fire">
          <Suspense fallback={<SectionFallback />}><MafiaCorner /></Suspense>
        </SectionContainer>
        <ChapterDivider />

        <SectionContainer id="universe" accentTone="mystical">
          <Suspense fallback={<SectionFallback />}><UniversePage /></Suspense>
        </SectionContainer>
      </main>
    </ScrollOrchestratorProvider>
  );
}
