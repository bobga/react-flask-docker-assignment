import React, { useState } from 'react'
import axios from 'axios'
import filterFactory, { textFilter, Comparator, dateFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator';
import RemoteAll from './RemoteAll'
// ...

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

function Files({ project_id }) {
  
    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [totalSize, setTotalSize] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    const handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder }) => {
      console.log('hanlde table change')
      
      if(isLoading) return;
      setLoading(true)
      console.log({page, sizePerPage, filters, sortField, sortOrder})
      const search = {}
      Object.entries(filters).forEach(([key, value]) => {
        var filterVal = value.filterVal
        if(typeof filterVal != 'string') {
          if(filterVal.date) search[key]=filterVal.date.toISOString().split('T')[0]
        } else
          search[key] = filterVal
      });
      axios.get('http://localhost:5000/files', {
        params: {
          page,
          sizePerPage,
          filters: JSON.stringify(search),
          sortField,
          sortOrder,
          project_id
        }
      }).then(res => {
        const data = res.data
        setData(data.files)
        setPage(page)
        setSizePerPage(sizePerPage)
        setTotalSize(data.totalCount)
        setLoading(false)
      })
    }
  
    const columns = [{
      dataField: 'id',
      text: 'File ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Name',
      filter: textFilter({
        defaultValue: ''
      }),
      sort: true
    }, {
      dataField: 'type',
      text: 'Type',
      sort: true,
      filter:  textFilter({
        defaultValue: ''
      }),
    }];
    
    return (
      <div>
        {isLoading && <div>Loading Files...</div>}
        <RemoteAll
          data={ data }
          page={ page }
          sizePerPage={ sizePerPage }
          columns={ columns }
          totalSize={ totalSize }
          defaultSorted={ defaultSorted }
          filter={ filterFactory() }
          pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
          onTableChange={ handleTableChange }
        />
      </div>
    );
  }

  export default Files