import React, { useState, useEffect } from 'react';

import * as OfficeService from '~/services/office';

export default function CargoSelect({ ...rest }) {
  const [offices, setOffices] = useState([]);

  const { value, onChange } = rest;

  useEffect(() => {
    async function loadOffices() {
      const { data } = await OfficeService.list();
      setOffices(data);
    }

    loadOffices();
  }, []);

  function handleChange(codigo) {
    const office = offices.find(o => o.codigo === Number(codigo));
    onChange(office);
  }

  return (
    <select
      className="select-css"
      {...rest}
      onChange={e => handleChange(e.target.value)}
      value={value.codigo}
    >
      <option value="">Selecione</option>
      {offices.map(cargo => (
        <option key={cargo.codigo} value={cargo.codigo}>
          {cargo.nome}
        </option>
      ))}
    </select>
  );
}
