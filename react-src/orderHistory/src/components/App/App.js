import React from 'react';
import './App.css';
import config, { orderHistoryQuery } from '../../config';
import * as Customer from '../Customer';
import GraphqlComponent from '../../util/GraphqlComponent';
import { notifyOnSectionUpdate } from '../../util/magento/customerData';

const CustomerOrderHistory = GraphqlComponent(
  Customer.OrderHistory,
  orderHistoryQuery
);

class App extends React.Component {
  loadSections = ['customer'];
  notifyEvent = 'customer-data-reloaded';

  constructor(props) {
    super(props);

    const { loadSections } = this;

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

  componentDidMount() {
    const { getCustomerDataSections, notifyEvent, loadSections } = this;

    // sets listeners to the customerData sections we pass as a parameter, and fires the `notifyEvent` event
    notifyOnSectionUpdate(loadSections);

    // listen to the `notifyEvent` and trigger the getCustomerDataSections() function
    document.addEventListener(
      notifyEvent,
      function(e) {
        getCustomerDataSections();
      },
      false
    );

    getCustomerDataSections();
  }

  componentWillUnmount() {
    const { getCustomerDataSections, notifyEvent } = this;
    document.removeEventListener(notifyEvent, getCustomerDataSections());
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
        <Customer.Authorisation
          customer={customer}
          isLoading={loading.includes('customer')}
        />
        {customer.isLoggedIn && <CustomerOrderHistory />}
      </React.Fragment>
    );
  }

  processCustomerData = customerData => {
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

  /**
   * fetches customerSectionData from Magento
   * @returns {Promise<void>}
   */
  fetchCustomerDataSections = async () => {
    const {
      state: { loading: loadSections }
    } = this;

    if (!loadSections.length) {
      return;
    }

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

  /**
   * Checks if customerData is available from LocalStorage or otherwise fetches it from server
   * Then sends sends customerData to `processCustomerData`
   */
  getCustomerDataSections = () => {
    const {
      processCustomerData,
      fetchCustomerDataSections,
      removeLoadingEntityFromState,
      addLoadingEntityToState
    } = this;

    let localStorageData = {};

    try {
      localStorageData =
        window.localStorage &&
        JSON.parse(window.localStorage.getItem('mage-cache-storage'));
    } catch (e) {
      console.warn('LocalStorage is unavailable');
      console.error('Reason:', e);
    }

    if (localStorageData && localStorageData.hasOwnProperty('customer')) {
      processCustomerData(localStorageData.customer);
      removeLoadingEntityFromState('customer');
    } else {
      addLoadingEntityToState('customer');
    }

    const { loading } = this.state;

    loading.length &&
      fetchCustomerDataSections().then(() => {
        const { sectionData, loading } = this.state;

        if (
          loading.includes('customer') &&
          sectionData.hasOwnProperty('customer')
        ) {
          processCustomerData(sectionData.customer);
          removeLoadingEntityFromState('customer');
        }
      });
  };

  addLoadingEntityToState = loadingEntity => {
    this.setState(prevState => ({
      loading: [...prevState.loading, loadingEntity]
    }));
  };

  removeLoadingEntityFromState = finishedEntity => {
    this.setState(prevState => ({
      loading: prevState.loading.filter(
        loadingEntity => loadingEntity !== finishedEntity
      )
    }));
  };
}

export default App;
