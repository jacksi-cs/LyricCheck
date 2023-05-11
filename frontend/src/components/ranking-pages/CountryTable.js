import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCountries } from '../../lib/api-helpers';
import Typography from '@mui/material/Typography';
import { CustomPagination } from '../CustomPagination';
import Highlighter from "react-highlight-words";
import { Row } from 'react-bootstrap';

const columns = [
  {
    field: "flags_svg",
    headerName: "",
    width: 75,
    sortable: false,
    renderCell: ({ row: country }) => (
      <img
        alt='country flag'
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        src={country.flags_svg} />
    ),
  },
  {
    field: 'name_common',
    headerName: 'Name',
    width: 250,
    renderCell: ({ row: country }) => (
      <>
        <Link to={`/country/${country.country_code}`}>
          <Highlighter
            searchWords={[country.search]}
            textToHighlight={country.name_common}
          />
        </Link>
      </>
    ),
  },
  {
    field: 'country_code',
    headerName: 'Code',
    width: 225,
    renderCell: ({ row: country }) => (
      <>{country.country_code}</>
    ),
  },
  {
    field: 'region',
    headerName: 'Region',
    width: 225,
    renderCell: ({ row: country }) => (
      <Highlighter
        searchWords={[country.search]}
        textToHighlight={country.region}
      />
    ),
  },
  {
    field: 'top_track',
    headerName: 'Top Song',
    width: 250,
    renderCell: ({ row: country }) => (
      <Highlighter
        searchWords={[country.search]}
        textToHighlight={country.top_track}
      />
    ),
  },
  {
    field: 'top_artist',
    headerName: 'Top Artist',
    width: 250,
    renderCell: ({ row: country }) => (
      <Highlighter
        searchWords={[country.search]}
        textToHighlight={country.top_artist}
      />
    )
  },
  {
    field: 'profanity_average',
    headerName: 'Profanity Average',
    width: 250,
    valueGetter: ({ value }) => value ?
      parseFloat(value).toFixed(3)
      : null,
  },
];

export default function CountryTable({ filters, sort = 'name_common' }) {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState(null);
  const [total, setTotal] = useState(null);

  const [sortingMode, setSortingMode] = useState([
    { field: sort, sort: 'asc' }
  ]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getSearchData(page, sortingMode, filters);
  }, [page, sortingMode, filters]);

  if (!loading && !countries) {
    return <>
      <h1>Error, countries not available.</h1>;
    </>;
  }

  const getSearchData = async (page, sortingMode, filters) => {
    setLoading(true);

    sortingMode = sortingMode[0] ||
      { field: 'name_common', sort: 'asc' };
    const sortModifier = sortingMode.sort === 'desc' ? '-' : '';
    const sortString = sortModifier + sortingMode.field;

    try {
      const { data, total } = await getCountries({ page, sort: sortString, ...filters });
      setCountries(data);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }


  const scuffedCountries = countries?.map(country =>
    ({ ...country, search: filters.search })
  );

  return <>
    <DataGrid
      autoHeight={true}
      rows={scuffedCountries}
      getRowId={(row) => row.name_common}
      columns={columns}
      pageSize={10}
      loading={loading}
      rowCount={total}

      sortingMode="server"
      sortModel={sortingMode}
      onSortModelChange={setSortingMode}

      paginationMode="server"
      onPageChange={setPage}
      components={{ Pagination: CustomPagination }}
    />
    <Typography align="right" style={{ paddingRight: '10px' }}>Total: {total}</Typography>
    <Row></Row>
  </>;
}