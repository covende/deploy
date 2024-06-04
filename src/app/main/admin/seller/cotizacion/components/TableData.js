import React, { useEffect, useState } from 'react';
import { CVDataTable, CVText } from '@/common/CovendeTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { DCRows, DCHeaders } from './CotUtils';
import { quotations_by_store_id } from '@/app/api/graphql/webquotation/QService';
import { formatpaginate } from '@/common/utils/methods';
import { tienda } from '../../productos/redux/ProductUpdate';
import { Box } from '@chakra-ui/react';
import CotReply from './CotReply';
import { useHistory } from 'react-router';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVInputImageGallery from '@CVTemplate/core/CVInputImageGallery';

function TableData({ store_id }) {
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [idcot, setidcot] = useState('');
  const [reply, setreply] = useState(false);
  const [lista, setlista] = useState([]);
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);
  const history = useHistory();

  const ExpandData = ({ params, item }) => (
    <Box padding='2rem'>
      <CVText>
        <span style={{ fontWeight: 'bold' }}>Cantidad:&nbsp;</span>
        {item?.quantity} {item?.measure_unit}
      </CVText>
      <CVText>
        <span style={{ fontWeight: 'bold' }}>
          Tiempo de entrega requerido:&nbsp;
        </span>
        {item?.delivery_time?.value} {item?.delivery_time?.type}
      </CVText>
      <SizeBox />
      <CVRenderHTML>{item?.message}</CVRenderHTML>
      <SizeBox />

      {item?.file && (
        <CVInputImageGallery
          readOnly={true}
          mainText={false}
          gallery={item.file.split(',')}
          imageHeight='100px'
          imageWidth='100px'
          limit={item.file.split(',').length}
          justifyContent='start'
        />
      )}
    </Box>
  );

  const initdata = async (page = 1, itemsPage = 10) => {
    setloading(true);
    const company_id = store_id || (await tienda(dispatch, product));
    const { info, quotations } = await quotations_by_store_id({
      itemsPage,
      page,
      store_id: company_id
    });
    setlista(quotations || []);
    setpagination(formatpaginate(info));
    setloading(false);
  };
  useEffect(() => {
    initdata();
  }, []);
  return (
    <>
      <CVDataTable
        data={DCRows(lista, { setidcot, setreply })}
        pagination={pagination}
        loading={loading}
        headers={DCHeaders}
        ExpandData={ExpandData}
        fetchdata={initdata}
      />
      {reply && (
        <CotReply
          cotizacion={lista.find((item) => item._id == idcot)}
          idcot={idcot}
          isOpen={reply}
          onClose={() => setreply(!reply)}
          process={() => history.push('/seller/mensajes/' + idcot)}
        />
      )}
    </>
  );
}
export default TableData;
