import { userSchema } from "../../validations/user-schema";
import { editSchema } from "../../validations/user-edit";
import { transformUser } from "../../utils/transform-user";
import { Prisma } from "@prisma/client";
import { hashPassword, encrypt } from "../../utils/crypto";

export const Mutation = {
  createUser: async (_: any, args: { data: any }, ctx: any) => {
    await userSchema.validate(args.data);

    const { name, password, birthData, motherName } = args.data;

    const hashedPassword = await hashPassword(password);
    const encryptedMotherName = encrypt(motherName);

    const newUser = await ctx.prisma.users.create({
      data: {
        name,
        password: hashedPassword,
        birth_data: new Date(birthData),
        mother_name: encryptedMotherName,
      },
    });

    return transformUser(newUser);
  },

  updateUser: async (_: any, args: { id: string; data: any }, ctx: any) => {
  const { name, birthData, motherName } = args.data;

  if (!args.id) {
    throw new Error("ID do usuário é obrigatório para atualização.");
  }

  await editSchema.validate(args.data);

  try {
    const updated = await ctx.prisma.users.update({
      where: { id: args.id },
      data: {
        name,
        birth_data: new Date(birthData),
        mother_name: encrypt(motherName),
      },
    });

    return transformUser(updated);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Usuário não encontrado para atualização.");
    }
    throw error;
  }
},

  deleteUser: async (_: any, args: { id: string }, ctx: any) => {
    try {
      const deleted = await ctx.prisma.users.delete({
        where: { id: args.id },
      });

      return transformUser(deleted);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Usuário não encontrado.");
      }
      throw error; 
    }
  },
};
