import React from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import { Table } from '../UI-Elements/Table';

const OrderHistory = ({ loading, data: { customerOrders: orders } }) => {
  const columns = [
    {
      index: 'id',
      title: 'Order #',
      data_key: 'increment_id',
      format: key => key
    },
    {
      index: 'date',
      title: 'Date',
      data_key: 'created_at',
      format: key => key
    },
    //   index: 'shipping',
    //   title :'Ship To',
    //   data_key: '' //not available
    // },
    {
      index: 'total',
      title: 'Order Total',
      data_key: 'grand_total',
      format: key => key
    },
    {
      index: 'status',
      title: 'Status',
      data_key: 'status',
      format: key => key
    },
    {
      index: 'actions',
      title: 'Actions',
      data_key: 'id',
      format: key => {
        return (
          <a href={`${config.orderViewLink}${key}`} className="action view">
            <span>View Order</span>
          </a>
        );
      }
    }
  ];

  /**
   * For each column we can provide a function to show calculated data in the table footer
   * Showing usage of Array.reduce
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
   */
  const footerData = {
    id: orderItems => `${orderItems.length} order(s)`,
    total: orderItems =>
      orderItems.reduce((subtotal, order) => subtotal + order.grand_total, 0)
  };

  return (
    <div className="table-wrapper orders-history">
      <h2>Your Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : !orders || !orders.items || !orders.items.length ? (
        <div>You haven't placed any orders yet.</div>
      ) : (
        <Table
          tableId={'my-orders-table'}
          tableClass={'table-order-items history'}
          tableCaption={'Orders'}
          columnData={columns}
          tableData={orders.items}
          footerData={footerData}
        />
      )}
    </div>
  );
};

OrderHistory.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

OrderHistory.defaultProps = {
  data: { customerOrders: null },
  loading: true
};

export default OrderHistory;
