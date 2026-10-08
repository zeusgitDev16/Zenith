// src/features/auth/components/AccountTypeModal.tsx

import React, { useState } from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { ACCOUNT_TYPES, AccountTypeOption } from '@/data/content/accountTypes.data';
import { useAccountRegistration } from '@/features/auth/hooks/useAccountRegistration';

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountTypeModal({ isOpen, onClose }: AccountTypeModalProps) {
  const [selectedType, setSelectedType] = React.useState<AccountTypeOption | null>(null);

  const {
    formData,
    errors,
    isLoading,
    currentMessage,
    handleInputChange,
    submitRegistration,
    resetForm,
  } = useAccountRegistration(selectedType?.id || null, () => {
    setSelectedType(null);
    onClose();
  });

  const handleResetAndClose = () => {
    resetForm();
    setSelectedType(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRegistration();
  };

  // Dynamic header copy
  const modalTitle = !selectedType ? 'Create Account' : `Register as ${selectedType.title}`;
  const modalSubtitle = !selectedType ? 'Select your account type to proceed' : selectedType.subtitle;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleResetAndClose} 
      title={modalTitle} 
      subtitle={modalSubtitle}
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

        {!selectedType ? (
          /* STEP 1: RENDER SELECTION CARDS WITH SVG ILLUSTRATIONS */
          <div className="space-y-3">
          {ACCOUNT_TYPES.map((type) => (
            <div 
              key={type.id}
              onClick={() => setSelectedType(type)}
              className="group relative flex items-center gap-4 p-4 border border-border rounded-xl bg-card hover:border-landhighlight-accent hover:shadow-md cursor-pointer transition-all overflow-hidden"
            >
              {/* SVG Illustration Container */}
              <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                {type.illustration}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-foreground group-hover:text-landhighlight-accent transition-colors">
                    {type.title}
                  </h4>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-landhighlight-accent transition-colors">
                    Select →
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* STEP 2: RENDER DYNAMIC FORM FIELDS USING SHARED UI COMPONENTS */
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedType.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                {field.label}
              </label>
              <Input 
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                variant={errors[field.name] ? 'error' : 'default'}
                disabled={isLoading}
              />
              {errors[field.name] && (
                <p className="text-destructive text-xs mt-1 animate-in fade-in-50">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center pt-3 border-t border-border mt-4">
            <Button 
              type="button" 
              variant="ghost"
              size="sm"
              disabled={isLoading}
              onClick={() => { setSelectedType(null); resetForm(); }} 
            >
              ← Back to choices
            </Button>
            <Button 
              type="submit" 
              variant="default"
              size="default"
              disabled={isLoading}
            >
              Complete Registration
            </Button>
          </div>
        </form>
      )}
      </div>
    </Modal>
  );
}