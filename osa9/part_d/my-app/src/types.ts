export interface CourseBase {
  name: string,
  exerciseCount: number,
  type: string
}

interface CourseDescription extends CourseBase {
  description: string;
}

interface CourseNormal extends CourseDescription {
  type: "normal";
}

interface CourseProject extends CourseBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmission extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CourseDescription {
  type: "special";
  requirements: string[];
}

export type Course = 
  CourseNormal 
  | CourseProject 
  | CourseSubmission
  | CourseSpecial; 