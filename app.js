const express= require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp.graphqlHTTP({
     schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            date: String!
            price: Float!
        }

        type RootQuery {
            events: [Event!]!
        }

        input EventInput{
            title: String!
            description: String!
            date: String!
            price: Float!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
     `),
     rootValue: {
        events: () => {

        return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                date: args.eventInput.date,
                price: args.eventInput.price,
            }
            console.log(event);
            events.push(event);
            return event
        } 
     },
     graphiql: true
}));


app.listen(3000);
