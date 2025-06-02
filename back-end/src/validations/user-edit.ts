import * as yup from "yup";

export const editSchema = yup.object({
  name: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O Nome não pode conter números")
    .required("Nome é obrigatório")
    .min(10, "O Nome deve ter pelo menos 10 caracteres.")
    .max(100, "O Nome deve ter no máximo 100 caracteres."),

  birthData: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Data de nascimento é obrigatória")
    .max(new Date(), "A data não pode ser no futuro."),

  motherName: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O Nome da mãe não pode conter números")
    .required("Nome da mãe é obrigatório")
    .min(10, "O Nome da mãe deve ter pelo menos 10 caracteres.")
    .max(100, "O Nome da mãe deve ter no máximo 100 caracteres."),
});
