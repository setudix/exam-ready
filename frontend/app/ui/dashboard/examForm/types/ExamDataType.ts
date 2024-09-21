import ExamType from "./ExamType"
import QuestionType from "./QuestionType";

type ExamDataType = {
  exam?: ExamType;
  questions?: Array<QuestionType>;
}
export default ExamDataType;