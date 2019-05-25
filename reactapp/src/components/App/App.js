import React from 'react';
import './App.css';
import config from '../../config';
import * as Customer from '../Customer';

class App extends React.Component {
  loadSections = ['customer'];

  constructor(props) {
    super(props);

    const { loadSections } = this;

    this.localStorageData =
      window.localStorage &&
      JSON.parse(window.localStorage.getItem('mage-cache-storage'));

    this.state = {
      sectionData: {},
      customer: {
        firstname: null,
        fullname: null,
        isLoggedIn: false
      },
      loading: loadSections
    };
  }

  handleCustomerData = customerData => {
    const customerIsLoggedIn =
      customerData.hasOwnProperty('firstname') &&
      customerData.firstname !== '' &&
      customerData.firstname;

    this.setState({
      customer: {
        ...customerData,
        isLoggedIn: customerIsLoggedIn
      }
    });
  };

  fetchSections = async () => {
    const {
      state: { loading: loadSections }
    } = this;

    await window
      .fetch(
        config.baseUrl +
          'customer/section/load/?sections=' +
          loadSections.join(','),
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include'
        }
      )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(sectionData => {
        if (sectionData && Object.keys(sectionData).length) {
          this.setState({
            sectionData: sectionData
          });
        }
      })
      .catch(error => {
        console.log(
          'requesting sectionData failed for sections',
          loadSections,
          'The error:',
          error
        );
      });
  };

  getCustomer = () => {
    const {
      localStorageData,
      handleCustomerData,
      fetchSections,
      removeLoading,
      addLoading
    } = this;

    if (localStorageData && localStorageData.hasOwnProperty('customer')) {
      handleCustomerData(localStorageData.customer);
      removeLoading('customer');
    } else {
      addLoading('customer');
    }

    fetchSections().then(() => {
      const { sectionData, loading } = this.state;

      if (
        loading.includes('customer') &&
        sectionData.hasOwnProperty('customer')
      ) {
        handleCustomerData(sectionData.customer);
        removeLoading('customer');
      }
    });
  };

  addLoading = loadingEntity => {
    this.setState(prevState => ({
      loading: [...prevState.loading, loadingEntity]
    }));
  };

  removeLoading = finishedEntity => {
    this.setState(prevState => ({
      loading: prevState.loading.filter(
        loadingEntity => loadingEntity !== finishedEntity
      )
    }));
  };

  componentDidMount() {
    const { getCustomer } = this;

    getCustomer();
  }

  render() {
    const {
      state: { customer, loading }
    } = this;

    return (
      /**
       * React.Fragments allow you to return multiple elements without a (rendered) wrapper element
       * https://reactjs.org/docs/fragments.html#short-syntax
       */
      <React.Fragment>
        <Customer.Welcome
          customer={customer}
          isLoading={loading.includes('customer')}
        />
      </React.Fragment>
    );
  }
}

export default App;
