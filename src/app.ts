require('dotenv').config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {createRateLimitRule} from 'graphql-rate-limit';
import {shield} from 'graphql-shield';
import {applyMiddleware} from 'graphql-middleware';
import {makeExecutableSchema} from '@graphql-tools/schema';
import typeDefs from "./api/schema";
import resolvers from "./api/resolvers";
import {ApolloServer} from "@apollo/server";
import {MyContext} from "./interfaces/MyContext";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from "@apollo/server/plugin/landingPage/default";
import {expressMiddleware} from "@apollo/server/express4";
import authenticate from "./functions/authenticate";
import {errorHandler, notFound} from "./middlewares";

const app = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(cors<cors.CorsRequest>());
app.use(express.json());

(async () => {
  try {
    // Create a rate limit rule instance
    const rateLimitRule = createRateLimitRule({
      identifyContext: (ctx) => ctx.id,
    });
    // Create a permissions object
    const permissions = shield({
      Mutation: {
        login: rateLimitRule({window: '1m', max: 5}),
      },
    });
    // Apply the permissions object to the schema
    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    );
    // remember to change the typeDefs and resolvers to a schema object

    const server = new ApolloServer<MyContext>({
      schema,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
            embed: true as false,
          })
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      includeStacktraceInErrorResponses: false,
    });
    await server.start();

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({req}) => authenticate(req),
      })
    );

    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
