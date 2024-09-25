type CompletedExamType = {
  allowNegativeMarking: boolean;
  color: string;
  duration: number;
  examDurationAuto: boolean;
  examDurationInfinite: boolean;
  id: number;
  name: string;
  numberOfAnswered: number;
  prompt: string;
  questionSize: number;
  score: number;
  taken: boolean;
  numberOfCorrect: number;
  creationDate: number;
  submissionDate: number;
};

export default CompletedExamType;