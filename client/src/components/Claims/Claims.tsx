import Claim from "./Claim";
import style from "./Claims.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

export interface ClaimType {
  id: number;
  nombre: string;
  reclamo: string;
}

function Claims(props) {
  const [claims, setClaims] =
    useState<{ count: number; rows: Array<ClaimType> }>();
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(5);

  useEffect(() => {
    getClaims();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit]);

  async function getClaims() {
    const response = await axios.get(
      "http://localhost:3001/api/reclamos?offset=" + offset + "&limit=" + limit
    );
    setClaims(response.data);
  }

  return (
    <div className={style.container}>
      <h2>RECLAMOS</h2>
      {claims && (
        <>
          {claims.rows.map((claim, i) => (
            <Claim
              id={claim.id}
              nombre={claim.nombre}
              reclamo={claim.reclamo}
              key={i}
            />
          ))}
          <Pagination
            count={claims.count}
            offset={offset}
            setOffset={setOffset}
            limit={limit}
          />
        </>
      )}
    </div>
  );
}

export default Claims;
