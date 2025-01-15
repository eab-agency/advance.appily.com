import type { Field, SelectField } from 'payload';
import deepMerge from '../utilities/deepMerge';

interface Args {
  overrides?: Partial<SelectField>;
}

export const colorSchema = ({ overrides = {} }: Args): Field => {
  const baseField: SelectField = {
    name: 'colorSchema',
    type: 'select',
    defaultValue: 'blackwhite',
    options: [
      {
        label: 'Black & White',
        value: 'blackwhite',
      },
    ],
  };

  return deepMerge(baseField, overrides) as Field; // Explicit cast ensures TypeScript compatibility
};
