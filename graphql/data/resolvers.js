const fetch = require('node-fetch');

const resolveFunctions = {
  RootQuery: {
    repos(root, args) {
      if (args.login) {
        return getRepos(args.login);
      }
      return Promise.resolve([]);
    },
    time() {
      return Date.now();
    },
  },
  RootSubscription: {
    freshTime(time) {
      return time;
    },
  },
  Repo: {
    fullName(repo) {
      return repo.full_name;
    },
    htmlUrl(repo) {
      return repo.html_url;
    },
    openIssuesCount(repo) {
      return repo.open_issues_count;
    },
    login(repo) {
      return repo.owner.login;
    },
  },
};

const getRepos = (login) => fetch(`https://api.github.com/users/${login}/repos?type=all&sort=updated`,
    { headers: { 'user-agent': 'github.com/Dattaya/react-boilerplate-apollo' } }
)
    .then((promisedResult) => promisedResult.json());

module.exports = resolveFunctions;
