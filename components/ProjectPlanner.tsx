
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
    <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="project-goal" className="block text-lg font-medium text-gray-300 mb-2">
          Enter Your Project Goal
        </label>
        <textarea
          id="project-goal"
          rows={4}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-500 resize-none"
          placeholder="e.g., 'Build a social media app for pet owners' or 'Create an e-commerce platform for handmade crafts'"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !goal.trim()}
          className="mt-6 w-full flex items-center justify-center gap-x-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          <SparklesIcon className="w-5 h-5" />
          {isLoading ? 'Generating Plan...' : 'Generate Project Plan'}
        </button>
      </form>
    </div>
  );
};
