const serverUrl = process.env.NEXT_PUBLIC_SERVER;
const port = process.env.NEXT_PUBLIC_SERVER_PORT;
// const port = "";

const apiprefix = "api";
const routes = {
  home: '/',
  examCreationForm: '/dashboard/examform',
  fe_getExamAnswerWithId: '/dashboard/exams/',
  socialLogin: `${serverUrl}${port}/${apiprefix}/auth/social-login`,
  healthCheck: `${serverUrl}${port}/${apiprefix}/health`,
  createExam: `${serverUrl}${port}/${apiprefix}/exam/create`,
  createDummyExam: `${serverUrl}${port}/${apiprefix}/submit-form`,
  submitMCQExam: `${serverUrl}${port}/${apiprefix}/exam/submit-exam`,
  getExamById: `${serverUrl}${port}/${apiprefix}/exam`,
};


export default routes;