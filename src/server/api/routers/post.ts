import { clerkClient } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
//import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({ take: 100 });
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        profileImageUrl: user.imageUrl,
      };
    });
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author not found",
        });
      return { post, author };
    });
  }),
});
