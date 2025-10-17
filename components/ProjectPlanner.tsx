
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ProjectPlannerProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

export const ProjectPlanner: React.FC<ProjectPlannerProps> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && !isLoading) {
      onGenerate(goal.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            id="project-goal"
            rows={1}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit(e);
                }
            }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 pr-36 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-500 resize-none leading-tight"
            placeholder="Ask a follow-up or enter a new project goal..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !goal.trim()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center gap-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            <SparklesIcon className="w-5 h-5" />
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
    </div>
  );
};
