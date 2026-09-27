import { useState } from 'react';
import Intro from './components/Intro.jsx';
import Cases from './components/Cases.jsx';
import Upload from './components/Upload.jsx';
import Processing from './components/Processing.jsx';
import Dashboard from './components/Dashboard.jsx';
import { nodes, edges } from './data/mockData.js';

// This component owns which "screen" is showing. Swap this for a router
// (react-router) later if the app grows past these five screens.
export default function App() {
  const [screen, setScreen] = useState('intro');
  const graph = { nodes, edges }; // pure frontend — all data comes from mockData.js

  return (
    <>
      {screen === 'intro' && <Intro onEnter={() => setScreen('cases')} />}
      {screen === 'cases' && (
        <Cases
          onBack={() => setScreen('intro')}
          onOpenAnalyzed={() => setScreen('dashboard')}
          onOpenPending={() => setScreen('upload')}
        />
      )}
      {screen === 'upload' && (
        <Upload
          onBack={() => setScreen('cases')}
          onRunAnalysis={() => setScreen('processing')}
        />
      )}
      {screen === 'processing' && (
        <Processing onDone={() => setScreen('dashboard')} />
      )}
      {screen === 'dashboard' && (
        <Dashboard graph={graph} onBackToCases={() => setScreen('cases')} />
      )}
    </>
  );
}
