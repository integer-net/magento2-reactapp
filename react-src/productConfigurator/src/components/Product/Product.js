import React from 'react';
import { connect } from 'react-redux';

class Product extends React.Component {

  render() {
    return(
      <div>Product</div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    catalog: state.catalog,
    user: state.user,
  };
}

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);