const typeDefinitions = `
type Repo {
  id: Int!
  name: String
  fullName: String
  htmlUrl: String
  login: String
  openIssuesCount: Int
}

# the schema allows the following two queries:
type RootQuery {
  repos(login: String): [Repo]
  time: Float!
}

type RootSubscription {
  freshTime: Float!
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  subscription: RootSubscription
}
`;

module.exports = [typeDefinitions];
