
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  userStories: UserStory[];
}

export interface ProjectPlan {
  projectName: string;
  projectDescription: string;
  epics: Epic[];
}
