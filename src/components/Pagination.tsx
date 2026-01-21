interface Props {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: () => void;
  nextPage: () => void;
}

function Pagination({ page, hasPrev, hasNext, prevPage, nextPage }: Props) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={prevPage}
        disabled={!hasPrev}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-white">Página {page}</span>

      <button
        onClick={nextPage}
        disabled={!hasNext}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
