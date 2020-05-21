import React, { useState, useEffect } from 'react';

import * as UgService from '~/services/ug';

export default function UgSelect({ ...rest }) {
  const [ugs, setUgs] = useState([]);

  const { value, onChange } = rest;

  useEffect(() => {
    async function loadUgs() {
      const { data } = await UgService.list();
      setUgs(data);
    }

    loadUgs();
  }, []);

  function handleChange(codigo) {
    const ug = ugs.find(u => u.codigo === Number(codigo));
    onChange(ug);
  }

  return (
    <select
      className="select-css"
      {...rest}
      onChange={e => handleChange(e.target.value)}
      value={value.codigo}
    >
      <option value="">Selecione</option>
      {ugs.map(ug => (
        <option key={ug.codigo} value={ug.codigo}>
          {ug.codigoUg} - {ug.nome}
        </option>
      ))}
    </select>
  );
}
