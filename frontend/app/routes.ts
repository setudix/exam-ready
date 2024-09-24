const serverUrl = process.env.NEXT_PUBLIC_SERVER;
const port = process.env.NEXT_PUBLIC_SERVER_PORT;


console.log(serverUrl, port);

const routes = {
  home: '/',
  examCreationForm: '/dashboard/formtest',
  socialLogin: `${serverUrl}${port}/api/auth/social-login`,
  healthCheck: `${serverUrl}${port}/api/health`,
  createExam: `${serverUrl}${port}/api/exam/create`,
  createDummyExam: `${serverUrl}${port}/api/submit-form`,
  submitMCQExam: `${serverUrl}${port}/api/exam/submit-exam`,
};


export default routes;