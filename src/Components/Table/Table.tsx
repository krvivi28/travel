import { useState } from "react";
import { FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";

type Customer = {
  id: number;
  ref: string;
  customerName: string;
  username: string;
  name: string;
  accountManager: string;
  pax: number;
  packageInr: string;
  travelDate: string;
  createdDate: string;
};

type TableProps = {
  customers: Customer[];
  navigate: (path: string) => void;
};

const Table: React.FC<TableProps> = ({ customers, navigate }) => {
  const [filters, setFilters] = useState({
    ref: "",
    customerName: "",
    username: "",
    name: "",
    accountManager: "",
    paxMin: "",
    paxMax: "",
    packageInrMin: "",
    travelDate: "",
    createdDate: "",
  });
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

  const sortedCustomers = [...customers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCustomers = sortedCustomers.filter((customer) => {
    return (
      (!filters.ref || customer.ref.toLowerCase().includes(filters.ref.toLowerCase())) &&
      (!filters.customerName || customer.customerName.toLowerCase().includes(filters.customerName.toLowerCase())) &&
      (!filters.username || customer.username.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.name || customer.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.accountManager || customer.accountManager.toLowerCase().includes(filters.accountManager.toLowerCase())) &&
      (!filters.paxMin || customer.pax >= Number(filters.paxMin)) &&
      (!filters.paxMax || customer.pax <= Number(filters.paxMax)) &&
      (!filters.packageInrMin || parseInt(customer.packageInr) >= parseInt(filters.packageInrMin)) &&
      (!filters.travelDate || customer.travelDate.includes(filters.travelDate)) &&
      (!filters.createdDate || customer.createdDate.includes(filters.createdDate))
    );
  });

  // Calculate pagination data
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

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
            <th onClick={() => handleSort("ref")}>Ref {sortConfig.key === "ref" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort("customerName")}>Customer Name {sortConfig.key === "customerName" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort("username")}>Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort("name")}>Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort("accountManager")}>Account Manager {sortConfig.key === "accountManager" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th>PAX</th>
            <th>Package INR</th>
            <th onClick={() => handleSort("travelDate")}>Travel Date {sortConfig.key === "travelDate" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th onClick={() => handleSort("createdDate")}>Created Date {sortConfig.key === "createdDate" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}</th>
            <th>Action</th>
          </tr>
          <tr>
            <th></th>
            <th><input type="text" placeholder="Ref" name="ref" value={filters.ref} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Customer Name" name="customerName" value={filters.customerName} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Username" name="username" value={filters.username} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Name" name="name" value={filters.name} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Account Manager" name="accountManager" value={filters.accountManager} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th>
              <input type="text" placeholder="Min" name="paxMin" value={filters.paxMin} onChange={handleFilterChange} className="input input-bordered input-xs w-16 mr-1" />
              <input type="text" placeholder="Max" name="paxMax" value={filters.paxMax} onChange={handleFilterChange} className="input input-bordered input-xs w-16" />
            </th>
            <th><input type="text" placeholder="Min INR" name="packageInrMin" value={filters.packageInrMin} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Date" name="travelDate" value={filters.travelDate} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th><input type="text" placeholder="Date" name="createdDate" value={filters.createdDate} onChange={handleFilterChange} className="input input-bordered input-xs w-full" /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>{customer.ref}</td>
              <td>{customer.customerName}</td>
              <td>{customer.username}</td>
              <td>{customer.name}</td>
              <td>{customer.accountManager}</td>
              <td>{customer.pax}</td>
              <td>{customer.packageInr}</td>
              <td>{customer.travelDate}</td>
              <td>{customer.createdDate}</td>
              <td><button className="btn btn-ghost btn-xs" onClick={() => navigate(`${customer.id}`)}><FaEdit /></button></td>
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
