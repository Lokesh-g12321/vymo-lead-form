import type { FieldConfig } from '../../design-system';

// Mock config for the lead capture screen.
// To add a field, add an entry here. Nothing else needs to change.
export const leadFormConfig: FieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    placeholder: 'e.g. Priya Sharma',
    width: 'half',
    validations: [{ kind: 'required', message: 'Please enter the full name' }],
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'name@company.com',
    width: 'half',
    validations: [
      { kind: 'required', message: 'Please enter an email' },
      { kind: 'email', message: 'This email doesn’t look right' },
    ],
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    placeholder: 'Choose lead type',
    width: 'half',
    options: [
      { label: 'Individual', value: 'individual' },
      { label: 'Company', value: 'company' },
    ],
    validations: [{ kind: 'required', message: 'Please choose a lead type' }],
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    placeholder: 'e.g. Acme Pvt Ltd',
    width: 'half',
    showWhen: { field: 'leadType', equals: 'company' },
    validations: [{ kind: 'required', message: 'Please enter the company name' }],
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    placeholder: '10 digit mobile number',
    hint: 'Digits only, no country code',
    width: 'half',
    validations: [
      { kind: 'required', message: 'Please enter a phone number' },
      { kind: 'digits', length: 10, message: 'Phone must be exactly 10 digits' },
    ],
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    placeholder: 'Anything we should know?',
    hint: 'Optional, up to 200 characters',
    width: 'full',
    validations: [{ kind: 'maxLength', max: 200, message: 'Notes can be at most 200 characters' }],
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I agree to be contacted about this enquiry',
    width: 'full',
    validations: [{ kind: 'required', message: 'Please give consent to continue' }],
  },
];
