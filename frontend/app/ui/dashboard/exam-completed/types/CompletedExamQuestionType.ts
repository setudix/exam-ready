type CompletedExamQuestionType = {
  correctAnswer: string;
  id: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  question: string;
  selected: string | null;
};

export default CompletedExamQuestionType;