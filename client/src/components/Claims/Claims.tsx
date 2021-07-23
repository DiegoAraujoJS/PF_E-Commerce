import Claim from "./Claim";
import style from "./Claims.module.css";
import { useState, useEffect } from "react";
import axios from 'axios';

export interface ClaimProps {

}

function Claims(props) {
  //let { claims } = props;
  const [claims, setClaims] = useState<Array<ClaimProps>>();

  useEffect(() => {
    if (!claims) {
      getClaims();
    }
  }, []);

  async function getClaims() {
    const response = await axios.get("http://localhost:3001/api/reclamos");
  }

  return (
    <div className={style.container}>
      <h2>RECLAMOS</h2>
      {claims &&
        claims.map((c, i) => (
          <Claim
            name={c.name}
            description={c.description}
            code={c.codeClaim}
            key={i}
          />
        ))}
    </div>
  );
}

export default Claims;
