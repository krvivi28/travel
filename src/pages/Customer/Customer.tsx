import { useNavigate } from "react-router-dom";
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

const Customer = () => {
  const navigate = useNavigate();
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
  const rowsPerPage = 5;

  // Sample hard-coded customer data, has to be filled from API later
  const customers: Customer[] = [
    { id: 1, ref: "001", customerName: "Hart Hagerty", username: "hart_h", name: "Hart Hagerty", accountManager: "Daniel", pax: 2, packageInr: "50000", travelDate: "2023-12-12", createdDate: "2023-11-01" },
    { id: 2, ref: "002", customerName: "Brice Swyre", username: "brice_s", name: "Brice Swyre", accountManager: "Carroll", pax: 3, packageInr: "75000", travelDate: "2023-12-15", createdDate: "2023-11-02" },
    { id: 3, ref: "003", customerName: "Marjy Ferencz", username: "marjy_f", name: "Marjy Ferencz", accountManager: "Rowe", pax: 1, packageInr: "35000", travelDate: "2023-12-20", createdDate: "2023-11-03" },
    // More customers...
  ];

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Sort function
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

  // Filter function
  const filteredCustomers = sortedCustomers.filter((customer) => {
    return (
      (!filters.ref || customer.ref.toLowerCase().includes(filters.ref.toLowerCase())) &&
      (!filters.customerName || customer.customerName.toLowerCase().includes(filters.customerName.toLowerCase())) &&
      (!filters.username || customer.username.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.name || customer.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.accountManager || customer.accountManager.toLowerCase().includes(filters.accountManager.toLowerCase())) &&
      (!filters.paxMin || customer.pax >= parseInt(filters.paxMin)) &&
      (!filters.paxMax || customer.pax <= parseInt(filters.paxMax)) &&
      (!filters.packageInrMin || parseInt(customer.packageInr) >= parseInt(filters.packageInrMin)) &&
      (!filters.travelDate || customer.travelDate.includes(filters.travelDate)) &&
      (!filters.createdDate || customer.createdDate.includes(filters.createdDate))
    );
  });

  // Pagination
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

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
            <th><input type="text" placeholder="Min" name="paxMin" value={filters.paxMin} onChange={handleFilterChange} className="input input-bordered input-xs w-16 mr-1" /><input type="text" placeholder="Max" name="paxMax" value={filters.paxMax} onChange={handleFilterChange} className="input input-bordered input-xs w-16" /></th>
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

export default Customer;
