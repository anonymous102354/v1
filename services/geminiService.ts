
import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const projectPlanSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "A creative and relevant name for the project." },
    projectDescription: { type: Type.STRING, description: "A 1-2 sentence high-level summary of the project." },
    epics: {
      type: Type.ARRAY,
      description: "A list of high-level features or modules of the project.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier for the epic, e.g., 'epic-01'." },
          title: { type: Type.STRING, description: "The title of the epic." },
          description: { type: Type.STRING, description: "A detailed description of the epic's purpose and scope." },
          userStories: {
            type: Type.ARRAY,
            description: "A list of user stories within this epic.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "A unique identifier for the user story, e.g., 'story-01a'." },
                title: { type: Type.STRING, description: "A user-centric title, e.g., 'As a user, I can...'." },
                description: { type: Type.STRING, description: "Detailed acceptance criteria for the story." },
                tasks: {
                  type: Type.ARRAY,
                  description: "A list of technical tasks to implement the user story.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING, description: "A unique identifier for the task, e.g., 'task-01a-1'." },
                      title: { type: Type.STRING, description: "A concise title for the technical task." },
                      description: { type: Type.STRING, description: "A brief description of what needs to be done." },
                      status: { type: Type.STRING, description: "The initial status of the task, which must be 'To Do'." }
                    },
                    required: ["id", "title", "description", "status"]
                  }
                }
              },
              required: ["id", "title", "description", "tasks"]
            }
          }
        },
        required: ["id", "title", "description", "userStories"]
      }
    }
  },
  required: ["projectName", "projectDescription", "epics"]
};


export const generateProjectPlan = async (goal: string): Promise<ProjectPlan> => {
  const prompt = `
    Act as an expert Agile Project Manager. Your task is to take a high-level project goal and break it down into a structured, hierarchical project plan.
    The plan must follow this structure: Project -> Epics -> User Stories -> Tasks.

    Project Goal: "${goal}"

    Generate a complete project plan based on this goal. Ensure the breakdown is logical, comprehensive, and actionable for a development team.
    - Create 2-4 high-level epics.
    - For each epic, create 2-3 detailed user stories.
    - For each user story, create 3-5 specific, technical tasks.
    - All task statuses must be initialized to "To Do".
    - IDs should be unique and follow a clear pattern (e.g., epic-01, story-01a, task-01a-1).
    - Provide creative and descriptive titles and descriptions for all items.

    Your final output must be a single JSON object that strictly adheres to the provided schema. Do not include any text or markdown formatting outside of the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: projectPlanSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text;
    const parsedPlan = JSON.parse(jsonString);
    return parsedPlan as ProjectPlan;

  } catch (error) {
    console.error("Error generating project plan:", error);
    throw new Error("Failed to generate project plan. The AI model may be temporarily unavailable.");
  }
};
