import * as yup from "yup";

export const userSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O Nome não pode conter números")
    .required("Nome é obrigatório")
    .min(10, "O Nome deve ter pelo menos 10 caracteres.")
    .max(100, "O Nome deve ter no máximo 100 caracteres."),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(10, "A Senha deve ter pelo menos 10 caracteres.")
    .max(30, "A Senha deve ter entre 10 e 30 caracteres."),

  birthData: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .max(new Date(), "A data não pode ser no futuro."),

  motherName: yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "O Nome da mãe não pode conter números")
    .required("Nome da mãe é obrigatório")
    .min(10, "O Nome da mãe deve ter pelo menos 10 caracteres.")
    .max(100, "O Nome da mãe deve ter no máximo 100 caracteres."),
});
