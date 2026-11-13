export interface SignInExistContent {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitButtonText: string;
  googleButtonText: string;
}

export const SIGN_IN_EXIST_CONTENT: SignInExistContent = {
  title: 'Sign In to Existing Account',
  subtitle: 'Access your Zenith workspace and team projects',
  emailLabel: 'Email Address',
  emailPlaceholder: 'name@company.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  submitButtonText: 'Sign In to Workspace',
  googleButtonText: 'Continue with Google',
};