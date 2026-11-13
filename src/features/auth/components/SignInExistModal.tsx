import React from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { SIGN_IN_EXIST_CONTENT } from '@/data/content/signinexist.data';
import { useSignInExist } from '@/features/auth/hooks/useSignInExist';

interface SignInExistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInExistModal({ isOpen, onClose }: SignInExistModalProps) {
  const {
    formData,
    errors,
    isLoading,
    currentMessage,
    handleInputChange,
    submitSignIn,
    resetForm,
  } = useSignInExist(onClose);

  const handleResetAndClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSignIn();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={SIGN_IN_EXIST_CONTENT.title}
      subtitle={SIGN_IN_EXIST_CONTENT.subtitle}
      size="md"
    >
      <div className="relative overflow-hidden">
        {/* PROGRESSIVE WORD-LOADING & INPUT LOCKING OVERLAY */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm rounded-xl transition-all animate-in fade-in duration-200">
            <div className="relative flex items-center justify-center mb-3">
              <div className="absolute size-12 rounded-full bg-landhighlight-accent/20 animate-ping" />
              <div className="size-10 rounded-full border-2 border-landhighlight-accent border-t-transparent animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground animate-pulse tracking-wide">
              {currentMessage}
            </p>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
              Zenith Core Engine
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {SIGN_IN_EXIST_CONTENT.emailLabel}
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={SIGN_IN_EXIST_CONTENT.emailPlaceholder}
              variant={errors.email ? 'error' : 'default'}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1 animate-in fade-in-50">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {SIGN_IN_EXIST_CONTENT.passwordLabel}
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={SIGN_IN_EXIST_CONTENT.passwordPlaceholder}
              variant={errors.password ? 'error' : 'default'}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1 animate-in fade-in-50">{errors.password}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="default"
              size="default"
              className="w-full"
              disabled={isLoading}
            >
              {SIGN_IN_EXIST_CONTENT.submitButtonText}
            </Button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="default"
            className="w-full"
            disabled={isLoading}
            onClick={() => {
              console.log('Google OAuth sign-in triggered');
            }}
          >
            {SIGN_IN_EXIST_CONTENT.googleButtonText}
          </Button>
        </form>
      </div>
    </Modal>
  );
}