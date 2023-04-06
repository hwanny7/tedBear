import Pagination from 'react-js-pagination';

interface PropsType {
  page: number;
  size: number;
  totalElements: number;
  handlePageChange: (page: number) => Promise<void>;
}

const PagiNation = (props: PropsType) => {
  const onChangePage = (page: any) => {
    props.handlePageChange(page);
  };

  return (
    <Pagination
      activePage={props.page}
      itemsCountPerPage={props.size}
      totalItemsCount={props.totalElements}
      pageRangeDisplayed={5} // 페이지네이터 안에서 보여줄 페이지 범위
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={onChangePage}
    />
  );
};

export default PagiNation;
