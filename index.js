import { ApolloServer } from '@apollo/server';
import express from "express";
import 'dotenv/config';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import jwt from "jsonwebtoken";
import cors from "cors";
import db from "./models/index.js";
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { ApolloError } from 'apollo-server-express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';


const app = express();
const port = 8800;
app.use(cors({origin: ["http://127.0.0.1:5500", "https://donation-campaigns-nab.vercel.app", "https://studio.apollographql.com"], credentials: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const httpServer = createServer(app);

const context = ({ req }) => {
    const token = req.headers.authorization || '';
    console.log("req.headers", req.headers);
    if (!token) throw new ApolloError('Authentication token missing', 'NOT_AUTHENTICATED');
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new ApolloError('Authentication token missing', 'NOT_AUTHENTICATED');
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

await apolloServer.start();

app.use("/graphql", expressMiddleware(apolloServer, { context }));

db.sequelize.sync().then((req) => {
    httpServer.listen(port, () => {
        console.log("server running - port " + port);
    })
})
