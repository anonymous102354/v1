
import React from 'react';
import type { ProjectPlan, Epic, UserStory, Task } from '../types';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => (
  <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700/80">
    <p className="font-semibold text-sm text-gray-200">{task.title}</p>
    <p className="text-xs text-gray-400 mt-1">{task.description}</p>
    <span className="mt-2 inline-block bg-zinc-600 text-zinc-200 text-xs font-medium px-2 py-0.5 rounded-full">
      {task.status}
    </span>
  </div>
);

const UserStoryCard: React.FC<{ story: UserStory }> = ({ story }) => (
  <div className="bg-zinc-800/60 p-4 rounded-lg border border-zinc-700">
    <h4 className="font-bold text-indigo-400">{story.title}</h4>
    <p className="text-sm text-gray-400 my-2">{story.description}</p>
    <div className="mt-4 space-y-2">
      <h5 className="text-sm font-semibold text-gray-300">Tasks:</h5>
      {story.tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  </div>
);

const EpicCard: React.FC<{ epic: Epic }> = ({ epic }) => (
  <div className="bg-zinc-900/70 p-6 rounded-xl border border-zinc-700 backdrop-blur-sm shadow-lg">
    <h3 className="text-2xl font-bold text-purple-400">{epic.title}</h3>
    <p className="text-gray-300 mt-2 mb-6">{epic.description}</p>
    <div className="space-y-4">
      {epic.userStories.map(story => <UserStoryCard key={story.id} story={story} />)}
    </div>
  </div>
);

export const PlanDisplay: React.FC<{ plan: ProjectPlan }> = ({ plan }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="text-center pb-6 border-b border-zinc-700">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">{plan.projectName}</h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">{plan.projectDescription}</p>
      </div>

      <div className="space-y-8">
        {plan.epics.map(epic => <EpicCard key={epic.id} epic={epic} />)}
      </div>
    </div>
  );
};
