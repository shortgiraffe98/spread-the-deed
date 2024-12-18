import db from "../models/index.js";
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";

export const resolvers = {
    Query: {
        users() {
            return db.Users.findAll().then((records) => {
                return records;
            }).catch((err) => {
                console.log(err);
                return err;
            })
        },
        donate_history() {
            return db.DonateHistory.findAll().then((records) => {
                return records;
            }).catch((err) => {
                console.log(err);
                return err;
            })
        },
        user(parent, args, context_auth) {
            return db.Users.findOne({ where: { username: args.username } }).then((records) => {
                return records;
            }).catch((err) => {
                console.log(err);
                return err;
            })
        }
    },
    User: {
        donate_history(parent, args, context) {
            console.log("user donate_history context: ", context);
            return db.DonateHistory.findAll({ where: { "donate_userid": parent.username }}).then((records) => {
                return records;
            }).catch((err) => {
                console.log(err);
                return err;
            })
        }
    },
    Mutation: {
        async register(parent, args) {
            const hashedPw =  await bcrypt.hash(args.password, 10);
            return await db.Users.create({ username: args.username, password: hashedPw, email: args.email })
        },
        async login(parent, args, context) {
            console.log("login context: ", context);
            const user = await db.Users.findOne({ where: { "username": args.username }}).then((records) => records).catch((err) => err);
            console.log("user: ", user.dataValues);
            const isValidate = await bcrypt.compare(args.password, user.password);
            const accessToken = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 604_800_000});
            console.log("accessToken: ", accessToken);
            return accessToken;
        }
    }
}
