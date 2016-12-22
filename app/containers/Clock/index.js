import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export class Clock extends React.Component {
  componentDidMount() {
    // Alternatively subscribe in 'componentWillReceiveProps' if you need to resubscribe depending on new props
    // No need to unsubscribe on componentWillUnmount, because the query `CurrentTime` will be stopped automatically
    // More advanced example: https://github.com/apollostack/GitHunt-React/blob/master/ui/routes/CommentsPage.js#L47
    this.subscription = this.props.data.subscribeToMore({
      document: subscription,
      updateQuery: (prevResult, { subscriptionData }) => ({ time: subscriptionData.data.freshTime }),
      onError: (err) => console.log(err), // eslint-disable-line no-console
    });
  }

  render() {
    const { loading, error, time } = this.props.data;

    if (loading || error) {
      return null;
    }

    return (
      <div>{`Server time (to showcase 'graphql-subscriptions'): ${(new Date(time)).toLocaleTimeString()}`}</div>
    );
  }
}

Clock.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    time: PropTypes.num,
    subscribeToMore: PropTypes.func,
  }),
};

const subscription = gql`
  subscription FreshTime {
    freshTime
  }
`;

const query = gql`
  query CurrentTime {
    time
  }
`;
const withData = graphql(query);

export default withData(Clock);
