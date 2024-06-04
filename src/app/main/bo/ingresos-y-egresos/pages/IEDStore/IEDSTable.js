import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';

import CVDataTable from '@CVTemplate/core/CVDataTable';
import { IEDSData, IEDSHeader, IEDSRow } from './IEDSUtils';
import CVDownload from '@CVTemplate/core/CVDownload';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  COMPANIES_WEEK_CUT,
  COMPANIES_WEEK_EXCEL
} from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatpaginate } from '@/common/utils/methods';
import CVSelect from '@CVTemplate/core/CVSelect';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVCheck from '@CVTemplate/core/CVCheck';
import MChangePaymentStatus from './IEBSModalChangePaymentStatus';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';

const IEDSTable = ({ store_id, paymentStatus, setPaymentStatus }) => {
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const btnref = useRef();
  const [masive, setMasive] = useState('DEFAULT');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [partner, setPartner] = useState('ALL');

  const [stores, setStores] = useState([]);
  const [noStores, setNoStores] = useState([]);
  const addToast = useToast();

  const initdata = async (page = 1, status) => {
    setloading(true);
    AxiosGQL(
      COMPANIES_WEEK_CUT({
        store_id,
        paymentStatus: status || paymentStatus,
        partner,
        page
      })
    )
      .then(({ companiesWeeklyCut }) => {
        setpagination(formatpaginate(companiesWeeklyCut.info));
        if (companiesWeeklyCut?.info) {
          setlista(
            (companiesWeeklyCut?.companiesWeeklyCut || []).map(
              (companyCut, ndx) => {
                return {
                  ...companyCut,
                  number:
                    ndx +
                    1 +
                    (companiesWeeklyCut?.info?.page - 1) *
                      companiesWeeklyCut?.info?.itemsPage
                };
              }
            )
          );
        }

        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const onOpenProcess = async () => {
    try {
      btnref?.current?.click();

      let seleccionados = JSON.parse(localStorage.getItem('selecteds') || []);
      let unSeleccionados = JSON.parse(
        localStorage.getItem('unSelecteds') || []
      );

      if (checkAll && unSeleccionados.length == pagination?.totalDocs) {
        CVAlertError({
          addToast,
          message: 'Seleccione al menos 1 fila.'
        });
        setMasive('DEFAULT');
        return;
      }

      if (!checkAll && seleccionados.length < 1) {
        CVAlertError({
          addToast,
          message: 'Seleccione al menos 1 fila.'
        });
        setMasive('DEFAULT');
        return;
      }

      onOpen();
      seleccionados && localStorage.removeItem('selecteds');
      unSeleccionados && localStorage.removeItem('unSelecteds');
      setStores(seleccionados || []);
      setNoStores(unSeleccionados || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    initdata();
  }, [paymentStatus, partner]);

  useEffect(() => {
    if (['PAID', 'PENDING'].includes(masive)) onOpenProcess();
  }, [masive]);

  return (
    <Box>
      <Flex alignItems='center'>
        <CVCheck value={checkAll} onChange={(value) => setCheckAll(value)} />
        <SizeBox />
        <CVSelect
          width='auto'
          value={masive}
          onChange={(value) => setMasive(value)}
          options={[
            { value: 'DEFAULT', text: 'Acciones en lote' },
            { value: 'PAID', text: 'Pagar' },
            { value: 'PENDING', text: 'Pendiente de pago' }
          ]}
        />
        <SizeBox />
        <Flex justifyContent='right' w='100%' paddingRight='1rem'>
          <CVSelect
            width='auto'
            value={partner}
            onChange={(value) => setPartner(value)}
            options={[
              { value: 'ALL', text: 'Partners' },
              { value: 'covende', text: 'Covende' },
              { value: 'caja-hyo', text: 'Caja Huancayo' }
            ]}
          />
        </Flex>
      </Flex>

      <SizeBox />
      <CVDataTable
        headers={IEDSHeader}
        data={IEDSRow(lista)}
        pagination={pagination}
        loading={loading}
        fetchdata={initdata}
        selectedComponente={<Box ref={(ref) => (btnref.current = ref)}></Box>}
        selectedAction={(selecteds, unSelecteds) => {
          localStorage.setItem('selecteds', JSON.stringify(selecteds));
          localStorage.setItem('unSelecteds', JSON.stringify(unSelecteds));
        }}
        selectable={true}
        checkAll={checkAll}
        Download={() => (
          <CVDownload
            fetchData={async () => {
              try {
                const { companiesWeeklyCutCSV } = await AxiosGQL(
                  COMPANIES_WEEK_EXCEL(store_id, paymentStatus, partner)
                );
                return (
                  companiesWeeklyCutCSV && JSON.parse(companiesWeeklyCutCSV)
                );
              } catch (err) {
                return console.log(err);
              }
            }}
          />
        )}
      />

      <MChangePaymentStatus
        isOpen={isOpen}
        paymentStatus={paymentStatus}
        checkAll={checkAll}
        onClose={() => {
          setStores([]);
          setNoStores([]);
          setMasive('DEFAULT');
          onClose();
        }}
        process={async () => {
          if (paymentStatus != 'ALL') setPaymentStatus('ALL');
          else initdata(1, 'ALL');

          if (checkAll) setCheckAll(false);
          else checkAll == null ? setCheckAll(false) : setCheckAll(null);
        }}
        cut_code={store_id}
        masive={masive}
        setMasive={setMasive}
        stores={stores}
        noStores={noStores}
      />
    </Box>
  );
};

export default IEDSTable;
