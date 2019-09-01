import React from 'react';
import config from '../config';

const GraphqlComponent = (ComposedComponent, query) =>
  class GraphqlComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false,
        loaded: false,
        errors: []
      };
    }

    componentWillMount() {
      const { loadData } = this;
      loadData();
    }

    render() {
      const {
        state,
        props,
        state: { errors },
        loadData
      } = this;

      const onClick = e => {
        e.preventDefault();
        loadData();
      };

      return errors && errors.length ? (
        <div>
          Error loading data.{' '}
          <a href={''} onClick={onClick}>
            Please retry
          </a>
          .
        </div>
      ) : (
        <ComposedComponent {...state} {...props} />
      );
    }

    loadData = () => {
      this.setState({ loading: true, error: null });
      window
        .fetch(config.graphqlLink, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query
          })
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            loaded: true,
            loading: false,
            data: response.data,
            errors: response.errors
          });
        })
        .catch(e => {
          this.setState({
            loaded: false,
            loading: false,
            errors: [{ message: e.message }]
          });
        });
    };
  };

export default GraphqlComponent;
