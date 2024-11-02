import { Link } from "react-router-dom";

const Customer = () => {
  return (
    <div>
      Customers
      <p>
        1. <Link to={"/customer/1"}>Edit Customer</Link>
      </p>
    </div>
  );
};

export default Customer;
