import { Grid } from '@/../node_modules/@material-ui/core/index';
import React from 'react';
import CardTotal from './CardTotal';
import SpeedResponse from './SpeedResponse';

const ReputationTotal = ({ cardReputation }) => {
  return (
    <Grid item xs={12} sm={12} md={6} container>
      <Grid item container space={2}>
        <CardTotal
          title='Devoluciones'
          description={`${cardReputation.devolutions?.value || 0} de ${
            cardReputation.devolutions?.total || 0
          } pedidos`}
          value={`${cardReputation.devolutions?.percent || 0}%`}
          backgroundColor='red'
          pendings={cardReputation.devolutions?.percent > 20}>
          Procura mantenerte debajo del 4% para no afectar tu reputación.
        </CardTotal>
        <CardTotal
          title='Cancelaciones'
          description={`${cardReputation.cancellations?.value || 0} de ${
            cardReputation.cancellations?.total || 0
          } pedidos`}
          value={`${cardReputation.cancellations?.percent || 0}%`}
          backgroundColor='yellow'
          pendings={cardReputation.devolutions?.percent > 20}>
          Procura mantenerte debajo del 4% para no afectar tu reputación.
        </CardTotal>
      </Grid>
      <Grid item container space={2}>
        <CardTotal
          title='Mensajes sin responder'
          description={`${cardReputation.unansweredMessages?.value || 0} de ${
            cardReputation.unansweredMessages?.total || 0
          } mensajes`}
          value={`${cardReputation.unansweredMessages?.percent || 0}%`}
          backgroundColor='green'>
          Procura mantenerte debajo del 40% para no afectar tu reputación.
        </CardTotal>
        <SpeedResponse>
          El 90% de las respuestas se hacen en menos de 24 horas
        </SpeedResponse>
      </Grid>
      <Grid item container space={2}>
        <CardTotal
          title='Información falsa'
          description={`${cardReputation.falseInformation?.value || 0} de ${
            cardReputation.falseInformation?.total || 0
          }`}
          value={`${cardReputation.falseInformation?.percent || 0}%`}
          backgroundColor='primary'>
          Procura mantenerte debajo del 10% para no afectar tu reputación.
        </CardTotal>
      </Grid>
    </Grid>
  );
};

export default ReputationTotal;
