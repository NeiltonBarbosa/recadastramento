import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import Card from '~/components/Card';

import * as CampaignService from '~/services/campaign';
import * as ExceptionService from '~/services/exception';

import { Container, New } from './styles';

import InputGroup from '~/styles/components/InputGroup';
import InputContainer from '~/styles/components/InputContainer';
import InputLabel from '~/styles/components/InputLabel';
import InputText from '~/styles/components/InputText';
import Button from '~/styles/components/Button';

export default function Campaigns() {
  const [codigo, setCodigo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    document.title = 'Campanhas';

    async function loadCampaign() {
      const { data } = await CampaignService.get().catch(error =>
        ExceptionService.handle(error)
      );

      setCodigo(data.codigo);
      setStartDate(parseISO(data.dataInicio));
      setEndDate(parseISO(data.dataFim));
    }

    loadCampaign();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await CampaignService.update({
      codigo,
      dataInicio: startDate,
      dataFim: endDate,
    })
      .then(() => {
        toast.success('Campanha atualizada com sucesso!');
      })
      .catch(error => ExceptionService.handle(error));
  }

  return (
    <Container>
      <New>
        <Card title="Cadastro">
          <form onSubmit={handleSubmit}>
            <InputGroup columns="2">
              <InputContainer>
                <InputLabel>INICIO *</InputLabel>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  locale={pt}
                  customInput={<InputText style={{ width: '100%' }} />}
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>TERMINO *</InputLabel>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  locale={pt}
                  customInput={<InputText style={{ width: '100%' }} />}
                />
              </InputContainer>
            </InputGroup>

            <Button type="submit">SALVAR</Button>
          </form>
        </Card>
      </New>
    </Container>
  );
}
