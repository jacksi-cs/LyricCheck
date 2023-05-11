import {
  gridPageCountSelector,
  gridPageSelector,
  gridVisibleRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const rowsInPage = useGridSelector(apiRef, gridVisibleRowCountSelector);

  return (
    <>
      <div style={{ paddingLeft: 'auto' }}>{rowsInPage} in page</div>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        rowsPerPage={[10]}

      />
    </>
  );
}