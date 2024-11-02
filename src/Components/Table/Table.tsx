import { FaSortUp, FaSortDown, FaEdit } from "react-icons/fa";

interface TableProps<T> {
  data: T[];
  headers: { key: keyof T; label: string }[];
  sortConfig: { key: keyof T | null; direction: 'asc' | 'desc' | null | string };
  onSort: (key: keyof T) => void;
  onRowClick: (id: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Table = <T extends { id: number }>({
  data,
  headers,
  sortConfig,
  onSort,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            {headers.map((header) => (
              <th key={header.key as string} onClick={() => onSort(header.key)}>
                {header.label}{" "}
                {sortConfig.key === header.key &&
                  (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <th><input type="checkbox" className="checkbox" /></th>
              {headers.map((header) => (
                <td key={header.key as string}>{row[header.key]}</td>
              ))}
              <td>
                <button className="btn btn-ghost btn-xs" onClick={() => onRowClick(row.id)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-outline btn-xs mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-outline btn-xs ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
