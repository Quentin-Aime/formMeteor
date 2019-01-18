import { Mongo } from "meteor/mongo";

const exercise = new Mongo.Collection("exerciseDB");
export default exercise;