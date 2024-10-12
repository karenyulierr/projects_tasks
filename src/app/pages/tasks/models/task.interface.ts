import { Project } from '../../projects/models/projects.interface';

export interface  Task {
  id: string;
  title: string;
  state: boolean;
  projects: string[];
  projectsWithDetails?: Project[];

}
