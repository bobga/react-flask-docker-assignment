import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types'

const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

function RemoteAll({ data, columns, page, sizePerPage, onTableChange, totalSize }) {
  return(
    <div>
      <BootstrapTable
        remote
        keyField="id"
        data={ data }
        columns={ columns }
        defaultSorted={ defaultSorted }
        filter={ filterFactory() }
        pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
        onTableChange={ onTableChange }
      />
    </div>
  )
}
  
RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};

export default RemoteAll