import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArtists } from '../../lib/api-helpers';
import Typography from '@mui/material/Typography';
import { CustomPagination } from '../CustomPagination';
import Highlighter from "react-highlight-words";
import Container from "react-bootstrap/Container";
import { Row } from 'react-bootstrap';

const columns = [
  {
    field: "image_url",
    headerName: "",
    width: 75,
    sortable: false,
    renderCell: ({ row: artist }) => (
      <img alt='artist'
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        src={artist.image_url} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: ({ row: artist }) => (
      <Link to={`/artist/${artist.id}`}>
        <Highlighter
          searchWords={[artist.search]}
          textToHighlight={artist.name}
        />
      </Link>
    ),
  },
  {
    field: "top_tracks_names",
    headerName: "Top Song",
    width: 250,
    valueGetter: ({ value }) => value[0],
    renderCell: ({ value, row: artist }) => (
      <>
        <Link to={`/song/${artist.top_tracks_ids[0]}`}>
          <Highlighter
            searchWords={[artist.search]}
            textToHighlight={artist.top_track}
          />
        </Link>
      </>
    ),
  },
  {
    field: "views",
    headerName: "Views",
    width: 200,
    valueGetter: ({ value }) => parseInt(value, 10),
  },
  {
    field: "followers",
    headerName: "Followers",
    width: 200,
    valueGetter: ({ value }) => parseInt(value, 10),
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 250,
    renderCell: ({ value, row: artist }) => (
      <Highlighter
        searchWords={[artist.search]}
        textToHighlight={value}
      />
    ),
    valueGetter: ({ value }) => value ?
      value[0].toUpperCase() + value.substring(1)
      : null,
  },
  {
    field: "profanity_average",
    headerName: "Profanity Average",
    width: 250,
    valueGetter: ({ value }) => value ?
      parseFloat(value).toFixed(3)
      : null,
  },
];



export default function ArtistTable({
  filters, sort = 'name'
}) {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(0);


  const [sortingMode, setSortingMode] = useState([
    { field: sort, sort: 'asc' }
  ]);

  const getSearchData = async (page, sortingMode, filters) => {
    setLoading(true);

    sortingMode = sortingMode[0] ||
      { field: 'name', sort: 'asc' };
    const sortModifier = sortingMode.sort === 'desc' ? '-' : '';
    const sortString = sortModifier + sortingMode.field;

    try {
      const { data, total } = await getArtists({ page, sort: sortString, ...filters });
      setArtists(data);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getSearchData(page, sortingMode, filters);
  }, [page, sortingMode, filters]);


  if (!loading && !artists) {
    return <>
      <h1>Error, artists not available.</h1>;
    </>;
  }

  const scuffedArtists = artists?.map(artist =>
    ({ ...artist, search: filters.search })
  );

  return <>
      <DataGrid
        autoHeight={true}
        rows={scuffedArtists}
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

      <Typography align="right" style={{ paddingRight: '10px'}}>Total: {total}</Typography>
      <Row></Row>
  </>
};