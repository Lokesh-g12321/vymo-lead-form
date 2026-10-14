# Lead Capture – Dynamic Form & Design System

A small lead capture screen built with **React + TypeScript** and **Ionic React** (used only for the app shell: page, header and scroll area).
The form is not hand-written field by field. It renders itself from a config array, and every input comes from a small design system I built with plain CSS modules (no component library for the controls).

## Install and run

```bash
npm install
npm run dev      # opens on http://localhost:5173
```

Other scripts:

```bash
npm run build    # type check + production build
npm run preview  # serve the production build
```

Node 18 or newer is enough.

## Folder layout

```
src/
  design-system/           reusable, knows nothing about leads
    tokens.css             colors, spacing, type, breakpoints
    atoms/                 TextInput, Select, Checkbox, Button (+ atoms.module.css)
    molecules/Field.tsx    label + control + hint + error
    form/
      types.ts             FieldConfig, Rule, FormValues types
      DynamicForm.tsx      takes a config and renders one Field per entry
      renderControl.tsx    maps a field type to the atom that draws it
      visibility.ts        decides if a field is shown (showWhen)
      Form.module.css      the form grid (desktop + mobile layout)
  features/lead/           everything specific to the lead screen
    leadFormConfig.ts      the field config (mock data)
    validation.ts          validation rules, a pure function
    LeadPage.tsx           the page (Ionic shell + form + submitted values)
    LeadPage.module.css    page spacing and card
  App.tsx, main.tsx        app setup
```

## Where things live

- **Tokens:** `src/design-system/tokens.css`
- **Atoms:** `src/design-system/atoms/`
- **Field molecule:** `src/design-system/molecules/Field.tsx`
- **Form:** `src/design-system/form/DynamicForm.tsx`
- **Config:** `src/features/lead/leadFormConfig.ts`
- **Validation rules:** `src/features/lead/validation.ts`, `validateLead(config, values)` returns an object of errors. It has no React in it and does not change anything, so the same input always gives the same output.

## Layout files

- `src/design-system/form/Form.module.css` owns the form layout.
  - Mobile and tablet (up to 1024px): one column, full width inputs, and the submit button is sticky at the bottom of the screen.
  - Desktop (above 1024px): two columns. Fields with `width: 'full'` (notes, consent) span both columns, and the button lines up at the end of the form.
- `src/features/lead/LeadPage.module.css` owns the page padding and the card around the form.
- Which fields share a row is set in the config with `width: 'half' | 'full'`, so the layout stays data-driven too.

## How it works

1. `leadFormConfig` is a typed list. Each entry has a `name`, `type`, `label`, `validations` and optional `showWhen` / `hint` / `options`.
2. `DynamicForm` loops over the visible fields and asks `renderControl` for the right atom based on `type`.
3. Company name has `showWhen: { field: 'leadType', equals: 'company' }`, so it appears or disappears as soon as lead type changes.
4. Errors show on blur. On submit, every field is checked, all current errors are shown and the submit is blocked until they are fixed.
5. Hidden fields are skipped by validation and left out of the submitted values, so company name is only required when you can see it.
6. A valid submit logs the values to the console and shows them on the page.

**Adding a field** = adding one entry to `leadFormConfig.ts`. Nothing else changes.

Atoms only get a value, a label and events. They have no idea what a lead is, and none of the lead rules live inside them.

## Decisions and trade-offs

- I kept validation as a small rule list (`required`, `email`, `digits`, `maxLength`) instead of a schema library, because the brief asks for no third-party form library and the rules are simple.
- The textarea is a `multiline` mode of `TextInput` rather than a separate atom, since it shares the same styling and props.
- Ionic is only used for the page shell. The controls are my own atoms so the design system stays independent.
- Breakpoint values are listed in `tokens.css` for reference, but CSS media queries can’t read variables, so the same numbers (768px / 1024px) are written in the layout files.
