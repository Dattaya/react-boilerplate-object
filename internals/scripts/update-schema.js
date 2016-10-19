const fs = require('fs');
const path = require('path');
const graphql = require('graphql').graphql;
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const mark = require('./helpers/mark');
const typeDefs = require('../../graphql/data/schema');
const resolvers = require('../../graphql/data/resolvers');

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const prettyStringify = (data) => JSON.stringify(data, null, 2);

graphql(executableSchema, introspectionQuery)
  .then((result) => {
    if (result.errors) {
      mark.addFailMark(() => console.error(prettyStringify(result.errors)));
    } else {
      try {
        fs.writeFileSync(path.join(process.cwd(), 'graphql/data/schema.json'), prettyStringify(result));
      } catch (err) {
        return mark.addFailMark(() => console.error(` ${err.stack}`));
      }
      mark.addCheckMark(() => console.log(' schema.json has been generated successfully.'));
    }
  });
