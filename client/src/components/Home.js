import React, { useState } from 'react'
import axios from 'axios'
import filterFactory, { numberFilter, textFilter, Comparator, dateFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useNavigate } from "react-router-dom"
import RemoteAll from './RemoteAll'
// ...

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}]

function Home() {
  
    const [page, setPage] = useState(1)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [totalSize, setTotalSize] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    const navigateTo = useNavigate()

    const routeChange = (pid) => {
      let path = `projects/${pid}`
      navigateTo(path)
    }

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
      axios.get('http://localhost:5000/projects', {
        params: {
          page,
          sizePerPage,
          filters: JSON.stringify(search),
          sortField,
          sortOrder
        }
      }).then(res => {
        const data = res.data
        setData(data.projects)
        setPage(page)
        setSizePerPage(sizePerPage)
        setTotalSize(data.totalCount)
        setLoading(false)
      })
    }
  
    const columns = [{
      dataField: 'id',
      text: 'Project ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Name',
      filter: textFilter({
        defaultValue: ''
      }),
      sort: true
    }, {
      dataField: 'startdate',
      text: 'StartDate',
      sort: true,
      filter:  dateFilter({
        delay: 400,
        placeholder: 'custom placeholder',
        withoutEmptyComparatorOption: true,
        comparators: [Comparator.EQ],
        style: { display: 'inline-grid' },
        className: 'custom-datefilter-class',
        comparatorStyle: { backgroundColor: 'antiquewhite' },
        comparatorClassName: 'custom-comparator-class',
        dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },
        dateClassName: 'custom-date-class'
      }),
    }, {
      dataField: 'details',
      text: 'Details',
      formatter: (cell, row, rowIndex, extraData) => (
        <button type="button" class="btn btn-info" onClick={(e) => routeChange(row.id)}>show</button>
      ),
    }];
    
    return (
      <div>
        {isLoading && <div>Loading Projects...</div>}
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

  export default Home