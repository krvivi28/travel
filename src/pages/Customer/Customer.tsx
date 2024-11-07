import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table";

const Customer = () => {
  const navigate = useNavigate();

  // Sample hard-coded customer data, has to be filled from API later
  const customers = [
    {
      id: 1,
      ref: "001",
      customerName: "Hart Hagerty",
      username: "hart_h",
      name: "Hart Hagerty",
      accountManager: "Daniel",
      pax: 2,
      packageInr: "50000",
      travelDate: "2023-12-12",
      createdDate: "2023-11-01",
    },
    {
      id: 2,
      ref: "002",
      customerName: "Brice Swyre",
      username: "brice_s",
      name: "Brice Swyre",
      accountManager: "Carroll",
      pax: 3,
      packageInr: "75000",
      travelDate: "2023-12-15",
      createdDate: "2023-11-02",
    },
    {
      id: 3,
      ref: "003",
      customerName: "Marjy Ferencz",
      username: "marjy_f",
      name: "Marjy Ferencz",
      accountManager: "Rowe",
      pax: 1,
      packageInr: "35000",
      travelDate: "2023-12-20",
      createdDate: "2023-11-03",
    },
    // More customers...
  ];

  return (
    <Table
      customers={customers}
      navigate={(id) => navigate(`/customer/${id}`)}
    />
  );
};

export default Customer;
