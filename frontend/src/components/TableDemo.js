import React from "react";
import "./tableDemo.css";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const TableDemo = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const a = searchParams.get("a");
  const b = searchParams.get("b");
  const c = searchParams.get("c");

  return (
    <div className="table">
      <div>{a}</div>
      <div>{token}</div>
      <div>{b}</div>
      <div>{c}</div>
    </div>
  );
};

export default TableDemo;
