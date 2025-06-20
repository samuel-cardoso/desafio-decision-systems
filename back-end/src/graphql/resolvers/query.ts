import { transformUser } from "../../utils/transform-user";

export const Query = {
  users: async (_: any, __: any, ctx: any) => {
    const users = await ctx.prisma.users.findMany();
    return users.map(transformUser);
  },

  user: async (_: any, args: { id: string }, ctx: any) => {
    const user = await ctx.prisma.users.findUnique({
      where: { id: args.id },
    });

    return user ? transformUser(user) : null;
  },
};