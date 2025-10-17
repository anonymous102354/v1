
import React, { useState, useCallback } from 'react';
import { ProjectPlanner } from './components/ProjectPlanner';
import { PlanDisplay } from './components/PlanDisplay';
import { generateProjectPlan } from './services/geminiService';
import type { ProjectPlan } from './types';
import { SpinnerIcon } from './components/icons/SpinnerIcon';
import { AppLogoIcon } from './components/icons/AppLogoIcon';
import { PlusIcon } from './components/icons/PlusIcon';
import { HomeIcon } from './components/icons/HomeIcon';
import { DiscoverIcon } from './components/icons/DiscoverIcon';
import { SpacesIcon } from './components/icons/SpacesIcon';
import { UserIcon } from './components/icons/UserIcon';
import { UpgradeIcon } from './components/icons/UpgradeIcon';


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

  const NavItem: React.FC<{ children: React.ReactNode; label: string; active?: boolean }> = ({ children, label, active }) => (
    <a href="#" className={`flex flex-col items-center justify-center p-2 rounded-lg w-full transition-colors duration-200 ${active ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}>
      {children}
      <span className="text-xs mt-1 text-zinc-400">{label}</span>
    </a>
  );

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-200 font-sans">
      {/* Sidebar */}
      <nav className="w-20 bg-zinc-950 flex flex-col items-center py-4 space-y-4 border-r border-zinc-800">
        <a href="#"><AppLogoIcon className="w-8 h-8 text-white" /></a>
        <div className="w-full px-2">
            <a href="#" className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-lg p-3 transition-colors duration-200">
                <PlusIcon className="w-6 h-6"/>
            </a>
        </div>
        <div className="flex-grow w-full px-2 space-y-2">
            <NavItem label="Home" active>
                <HomeIcon className="w-6 h-6"/>
            </NavItem>
            <NavItem label="Discover">
                <DiscoverIcon className="w-6 h-6"/>
            </NavItem>
            <NavItem label="Spaces">
                <SpacesIcon className="w-6 h-6"/>
            </NavItem>
        </div>
        <div className="w-full px-2 space-y-2">
            <NavItem label="Account">
                <UserIcon className="w-6 h-6"/>
            </NavItem>
             <NavItem label="Upgrade">
                <UpgradeIcon className="w-6 h-6"/>
            </NavItem>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-100">AI Project Planner</h1>
                 <p className="mt-2 text-gray-400">
                    This is a feature card within the launcher. Describe a goal to generate a project plan.
                 </p>
            </header>
            
            <div className="flex-1 flex flex-col justify-center">
              {isLoading && (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <SpinnerIcon className="w-12 h-12 animate-spin text-indigo-500" />
                  <p className="mt-4 text-lg">Generating your project plan...</p>
                  <p className="text-sm">This may take a moment.</p>
                </div>
              )}

              {error && (
                <div className="text-center bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg max-w-3xl mx-auto" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline ml-2">{error}</span>
                </div>
              )}

              {projectPlan && !isLoading && (
                  <PlanDisplay plan={projectPlan} />
              )}
            </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
           <ProjectPlanner onGenerate={handlePlanGeneration} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;
