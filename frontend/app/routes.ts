const serverUrl = 'http://localhost';
const port = ":8080";


const routes = {
  home: '/',
  examCreationForm: '/dashboard/formtest',
  socialLogin: `${serverUrl}${port}/api/auth/social-login`,
  healthCheck: `${serverUrl}${port}/api/health`,
  createExam: `${serverUrl}${port}/api/exam/create`,
  createDummyExam: `${serverUrl}${port}/api/submit-form`,
};


export default routes;