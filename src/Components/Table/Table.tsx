import { useState } from "react";
import { FaEdit, FaEye, FaSortUp, FaSortDown } from "react-icons/fa";

type Customer = {
  id: number;
  [key: string]: string | number;
};

type Column = {
  key: keyof Customer;
  label: string;
  isSortable?: boolean;
  isFilterable?: boolean;
};

type TableProps = {
  data: Customer[];
  columns: Column[];
  onEdit: (id: number) => void;
  onView: (id: number) => void;
};

const Table: React.FC<TableProps> = ({ data, columns, onEdit, onView }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer | null; direction: 'asc' | 'desc' | null | string }>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSort = (key: keyof Customer) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    columns.every((col) =>
      filters[col.key]
        ? item[col.key]?.toString().toLowerCase().includes(filters[col.key].toLowerCase())
        : true
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            {columns.map((col) => (
              <th key={col.key} onClick={() => col.isSortable && handleSort(col.key)}>
                {col.label}
                {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
            ))}
            <th>Action</th>
          </tr>
          <tr>
            <th></th>
            {columns.map((col) => (
              <th key={col.key}>
                {col.isFilterable && (
                  <input
                    type="text"
                    placeholder={col.label}
                    name={col.key.toString()}
                    value={filters[col.key] || ""}
                    onChange={handleFilterChange}
                    className="input input-bordered input-xs w-full"
                  />
                )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <th><input type="checkbox" className="checkbox" /></th>
              {columns.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}
              <td>
                <button className="btn btn-ghost btn-xs" onClick={() => onEdit(item.id)}>
                  <FaEdit />
                </button>
                <button className="btn btn-ghost btn-xs" onClick={() => onView(item.id)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-outline btn-xs mr-2" disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-outline btn-xs ml-2" disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Table;
