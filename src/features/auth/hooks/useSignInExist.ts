import { useState } from 'react';
import { z } from 'zod';
import { useProgressiveLoading } from '@/shared/hooks/useProgressiveLoading';

// Define Zod schema for sign-in validation
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const SIGN_IN_STEPS = [
  'Validating credentials...',
  'Authenticating via core engine...',
  'Establishing workspace session...',
  'Finalizing sign-in...',
];

export function useSignInExist(onCloseModal: () => void) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Integrate progressive word-loading hook
  const { currentMessage } = useProgressiveLoading({
    messages: SIGN_IN_STEPS,
    isLoading,
    intervalMs: 900,
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error dynamically as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const submitSignIn = async () => {
    setErrors({});

    // 1. Validate against Zod schema
    const validationResult = signInSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // 2. Trigger loading and input locking
    setIsLoading(true);

    try {
      // Simulate network request to Express / C++ core backend
      await new Promise((resolve) => setTimeout(resolve, 3200));

      console.log('Successfully signed in payload:', validationResult.data);

      // Reset and close modal on success
      setIsLoading(false);
      setFormData({});
      onCloseModal();
    } catch (err) {
      console.error('Sign-in failed:', err);
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    currentMessage,
    handleInputChange,
    submitSignIn,
    resetForm: () => {
      setFormData({});
      setErrors({});
      setIsLoading(false);
    },
  };
}