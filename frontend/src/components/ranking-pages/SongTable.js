import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSongs } from '../../lib/api-helpers';
import Typography from '@mui/material/Typography';
import { CustomPagination } from '../CustomPagination';
import Highlighter from "react-highlight-words";
import defaultCover from "../images/default_cover.png";
import { Row } from 'react-bootstrap';

const columns = [
  {
    field: "image_url",
    headerName: "",
    width: 75,
    sortable: false,
    renderCell: ({ row: song }) => (
      <>
        <img alt='song' style={{ width: '50px', margin: 'auto', display: 'block' }} src={image_url_or_defaultCover(song.image_url)} />
      </>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: ({ row: song }) => (
      <>
        <Link to={`/song/${song.id}`}>
          <Highlighter
            searchWords={[song.search]}
            textToHighlight={song.name}
          />
        </Link>
      </>
    ),
  },
  {
    field: "artist_name",
    headerName: "Artist",
    width: 250,
    renderCell: ({ row: song }) => (
      <>
        <Link to={`/artist/${song.artist_id}`}>
          <Highlighter
            searchWords={[song.search]}
            textToHighlight={song.artist_name}
          />
        </Link>
      </>
    ),
  },
  {
    field: "album_name",
    headerName: "Album",
    width: 250,
    renderCell: ({ row: song }) => (
      <>
        <Highlighter
          searchWords={[song.search]}
          textToHighlight={song.album_name}
        />
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
    field: "genre",
    headerName: "Genre",
    width: 250,
    valueGetter: ({ value }) => value ?
      value[0].toUpperCase() + value.substring(1)
      : null,
    renderCell: ({ value, row: song }) => (
      <Highlighter
        searchWords={[song.search]}
        textToHighlight={value}
      />
    ),
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


function image_url_or_defaultCover(image_url) {
  if (image_url == null) {
    return defaultCover;
  }
  return image_url;
}


export default function SongTable({
  filters, sort = 'name'
}) {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState(null);
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
      const { data, total } = await getSongs({ page, sort: sortString, ...filters });
      setSongs(data);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSearchData(page, sortingMode, filters);
  }, [page, sortingMode, filters]);

  if (!loading && !songs) {
    return <h1>Error, songs not available.</h1>;
  }


  const scuffedSongs = songs?.map(artist =>
    ({ ...artist, search: filters.search })
  );

  return <>
    <DataGrid
      autoHeight={true}
      rows={scuffedSongs}
      getRowId={(row) => row.name}
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
  </>
}
