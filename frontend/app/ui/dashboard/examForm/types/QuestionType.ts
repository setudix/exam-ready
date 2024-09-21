

type QuestionType = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  selected: string;
  options: Array<string>;

}

export default QuestionType;