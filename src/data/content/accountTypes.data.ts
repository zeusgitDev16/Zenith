// src/data/accountTypes.data.ts

import React from 'react';
import { IndividualIllustration } from '@/svg/IndividualIllustration';
import { BusinessIllustration } from '@/svg/BusinessIllustration';

export interface AccountFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface AccountTypeOption {
  id: 'individual' | 'business';
  title: string;
  subtitle: string;
  description: string;
  illustration: React.ReactNode;
  fields: AccountFieldConfig[];
}

export const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    id: 'individual',
    title: 'Individual',
    subtitle: 'Personal Sandbox',
    description: 'For solo developers, hobbyists, and independent operators building private workflows.',
    illustration: React.createElement(IndividualIllustration),
    fields: [
      { name: 'name', label: '* Full Name', type: 'text', placeholder: 'ex. John Doe' },
      { name: 'email', label: '* Email Address', type: 'email', placeholder: 'ex. name@example.com' },
      { name: 'password', label: '* Password', type: 'password', placeholder: '••••••••' }
    ]
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: 'Shared Organization',
    description: 'Manage a shared workspace, invite operators, and coordinate team project pipelines.',
    illustration: React.createElement(BusinessIllustration),
    fields: [
      { name: 'workspaceName', label: '* Workspace / Company Name', type: 'text', placeholder: 'ex. Zenith Infra' },
      { name: 'name', label: '* Admin / Team Leader Name', type: 'text', placeholder: 'ex. John Doe' },
      { name: 'email', label: '* Work Email Address', type: 'email', placeholder: 'ex. name@company.com' },
      { name: 'password', label: '* Password', type: 'password', placeholder: '••••••••' }
    ]
  }
];