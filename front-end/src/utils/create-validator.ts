import type { AnyObjectSchema } from 'yup';

export const createValidator = (schema: AnyObjectSchema) => {
  return async (values: Record<string, any>) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: Record<string, string> = {};
      if (error.inner) {
        error.inner.forEach((e: any) => {
          if (e.path) errors[e.path] = e.message;
        });
      }
      return errors;
    }
  };
};
