type ExamType = {
  id: number;
  name: string;
  duration: number;
  questionSize: number;
  color: string;
  taken: boolean;
  score: number;
  examDurationAuto: boolean;
};

export default ExamType;