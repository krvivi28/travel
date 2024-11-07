import React from "react";
import Helmet from "react-helmet";
interface IPropsMetadata {
  title: string;
}

const Metadata: React.FC<IPropsMetadata> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Metadata;
