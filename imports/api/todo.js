import { Mongo } from 'meteor/mongo';

//Create a collection, by using Mongo.Collection
export const ToDos = new Mongo.Collection('todos', { idGeneration: 'MONGO' });
