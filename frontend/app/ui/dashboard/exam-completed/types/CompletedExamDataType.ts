import CompletedExamQuestionType from "./CompletedExamQuestionType";
import CompletedExamType from "./CompletedExamType"

type CompletedExamDataType = {
  examWithoutUserDTO? : CompletedExamType;
  questionWithoutExams? : Array<CompletedExamQuestionType>;
};


export default CompletedExamDataType;