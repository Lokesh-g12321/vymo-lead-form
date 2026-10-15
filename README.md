Lead capture form - dynamic form and design system

React + TypeScript. Ionic React is used only for the app shell (page, header, scroll area). The inputs and button are my own small components with CSS modules, no component library.

How to run

npm install
npm run dev

It opens on http://localhost:5173
npm run build does a type check and production build. Node 18 or newer.

Folder layout

src/design-system - reusable parts, nothing about leads in here
  tokens.css - colors, spacing, font sizes, breakpoints
  atoms/ - TextInput, Select, Checkbox, Button
  molecules/Field.tsx - label + control + hint + error
  form/ - DynamicForm, renderControl, visibility, types, Form.module.css
src/features/lead - things specific to the lead screen
  leadFormConfig.ts - the field config (mock data)
  validation.ts - validation rules
  LeadPage.tsx - the page
App.tsx, main.tsx - app setup

Where things are

Tokens: src/design-system/tokens.css
Atoms: src/design-system/atoms/
Form: src/design-system/form/DynamicForm.tsx
Config: src/features/lead/leadFormConfig.ts
Validation: src/features/lead/validation.ts
Layout: src/design-system/form/Form.module.css and src/features/lead/LeadPage.module.css

How it works

The form is built from the config array. Each field has name, type, label, validations and optional showWhen, hint, options and width.
DynamicForm goes through the visible fields and picks the atom based on type.
Company name has showWhen on lead type, so it shows only when lead type is Company.
validateLead(config, values) is a plain function that returns the errors. No React inside it. Hidden fields are skipped, so company name is required only when it is shown.
Errors show on blur. On submit all errors are shown and submit is blocked until they are fixed. A valid submit shows the values on the page and logs them.
To add a field you only add one entry in the config.
Atoms only get value, label and events. No lead rules inside them.

Layout

Desktop (above 1024px): two columns, full name and email on one row, notes and consent full width.
Mobile and tablet: one column, full width inputs, submit button stays at the bottom.
Which fields share a row is set in the config with width half or full.

Trade-offs

Validation is a small list of rules (required, email, digits, maxLength) instead of a schema library, since the rules are simple.
Textarea is a multiline mode of TextInput, not a separate atom.
Breakpoints are listed in tokens.css but media queries can't read CSS variables, so 768px and 1024px are also written in the layout files.
