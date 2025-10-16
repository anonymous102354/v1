
import React, { useState, useCallback } from 'react';
import { ProjectPlanner } from './components/ProjectPlanner';
import { PlanDisplay } from './components/PlanDisplay';
import { generateProjectPlan } from './services/geminiService';
import type { ProjectPlan } from './types';
import { SpinnerIcon } from './components/icons/SpinnerIcon';

const App: React.FC = () => {
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanGeneration = useCallback(async (goal: string) => {
    setIsLoading(true);
    setError(null);
    setProjectPlan(null);

    try {
      const plan = await generateProjectPlan(goal);
      setProjectPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Project Launcher
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Describe your high-level goal, and our AI will generate a comprehensive project plan, breaking it down into actionable epics, user stories, and tasks.
          </p>
        </header>

        <main>
          <ProjectPlanner onGenerate={handlePlanGeneration} isLoading={isLoading} />

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-12 text-gray-400">
              <SpinnerIcon className="w-12 h-12 animate-spin text-indigo-500" />
              <p className="mt-4 text-lg">Generating your project plan...</p>
              <p className="text-sm">This may take a moment.</p>
            </div>
          )}

          {error && (
            <div className="mt-12 text-center bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg max-w-3xl mx-auto" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {projectPlan && !isLoading && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-center mb-8">Generated Project Plan</h2>
              <PlanDisplay plan={projectPlan} />
            </div>
          )}
        </main>
      </div>
       <footer className="text-center py-6 mt-12 border-t border-gray-800">
          <p className="text-gray-500">Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
