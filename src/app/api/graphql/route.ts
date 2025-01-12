import { ApolloServer } from "@apollo/server";
import typeDefs from "@/app/graphql/schema.graphql";
import resolvers from "@/app/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaClient } from "@/lib/db";
const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});

const handler =  startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma: prismaClient }),
});


export {handler as GET, handler as POST}