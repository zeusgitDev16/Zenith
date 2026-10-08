// src/features/auth/hooks/useAccountRegistration.ts
import { useState } from 'react';
import { z } from 'zod';
import { useProgressiveLoading } from '@/shared/hooks/useProgressiveLoading';

// Define Zod schemas for validation
const individualSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const businessSchema = z.object({
  workspaceName: z.string().min(2, 'Workspace name is required'),
  adminName: z.string().min(2, 'Admin name is required'),
  email: z.string().email('Please enter a valid work email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const REGISTRATION_STEPS = [
  'Validating account schema...',
  'Encrypting credentials via core engine...',
  'Provisioning Zenith database node...',
  'Finalizing registration...'
];

export function useAccountRegistration(accountTypeId: string | null, onCloseModal: () => void) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Integrate your progressive word-loading hook
  const { currentMessage } = useProgressiveLoading({
    messages: REGISTRATION_STEPS,
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

  const submitRegistration = async () => {
    if (!accountTypeId) return;
    setErrors({});

    // 1. Validate against correct Zod schema
    const schema = accountTypeId === 'business' ? businessSchema : individualSchema;
    const validationResult = schema.safeParse(formData);

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
      await new Promise((resolve) => setTimeout(resolve, 3600));

      console.log('Successfully registered payload:', {
        type: accountTypeId,
        ...validationResult.data,
      });

      // Reset and close modal on success
      setIsLoading(false);
      setFormData({});
      onCloseModal();
    } catch (err) {
      console.error('Registration failed:', err);
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    currentMessage,
    handleInputChange,
    submitRegistration,
    resetForm: () => {
      setFormData({});
      setErrors({});
      setIsLoading(false);
    }
  };
}