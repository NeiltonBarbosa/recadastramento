import React, { useState, useEffect } from 'react';

import * as GraduationService from '~/services/graduation';

export default function GraduationSelect({ ...rest }) {
  const [graduations, setGraduations] = useState([]);

  const { value, onChange } = rest;

  useEffect(() => {
    async function loadGraduations() {
      const { data } = await GraduationService.list();
      setGraduations(data);
    }

    loadGraduations();
  }, []);

  function handleChange(codigo) {
    const graduation = graduations.find(g => g.codigo === Number(codigo));
    onChange(graduation);
  }

  return (
    <select
      className="select-css"
      {...rest}
      onChange={e => handleChange(e.target.value)}
      value={value.codigo}
    >
      <option value="">Selecione</option>
      {graduations.map(formacao => (
        <option key={formacao.codigo} value={formacao.codigo}>
          {formacao.nome}
        </option>
      ))}
    </select>
  );
}
