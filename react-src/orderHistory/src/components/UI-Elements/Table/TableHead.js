import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';

const TableHead = ({ columnData }) => {
  return (
    <thead>
      <tr>
        {columnData.map(column => (
          <TableHeadColumn key={column.index} {...column} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

TableHead.propTypes = {
  columnData: PropTypes.array.isRequired
};

TableHead.defaultProps = {
  columnData: []
};

const TableHeadColumn = ({ index, title }) => {
  return (
    <th scope={'col'} className={`col ${index}`}>
      {title}
    </th>
  );
};

TableHeadColumn.propTypes = {
  index: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

TableHeadColumn.defaultProps = {
  index: '',
  title: ''
};
