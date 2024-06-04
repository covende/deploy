import { Container } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
// import CardTotales from './components/CardTotales';
// import TableData from './components/TableData';
// import PendingActiveStore from '../PendingActiveStore';
import { useSelector } from 'react-redux';
// import AddSuccess from './components/modales/AddSuccess';
// import { rolemenu } from '@/app/helpers/role';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import AddSuccess from '@CVPages/core/admin/seller/productos/components/modales/AddSuccess';
import Options from './Options';
import CardTotales from '@CVPages/core/admin/seller/productos/components/CardTotales';
import PendingActiveStore from '@CVPages/core/admin/seller/PendingActiveStore';
import TableData from '@CVPages/core/admin/seller/productos/components/TableData';
import OptionBulkLoad from '@CVPages/core/admin/seller/productos/components/modales/OptionsBulkLoad';
import OfferBulkLoad from '@CVPages/core/admin/seller/productos/components/modales/OfferBulkLoad';
import StockBulkLoad from '@CVPages/core/admin/seller/productos/components/modales/StockBulkLoad';
import PreparationTimeBulkLoad from '@CVPages/core/admin/seller/productos/components/modales/PreparationTimeBulkLoad';
import { TOTAL_COMPANY_DIRECTIONS } from '@CVApi/core/webpublic/userData/UserDirectionService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import AlertCompanyDirection from '@CVPages/core/admin/seller/productos/components/modales/AlertCompanyDirection';
import UpdateProductsBulkLoad from '@CVPages/core/admin/seller/productos/components/modales/UpdateProductsBulkLoad';

function SellerProductos({ store_id }) {
  const { store_status } = useSelector((state) => state.ProductView);
  const [search, setSearch] = useState('');
  const [checkAll, setCheckAll] = useState(false);
  const [cat, setCat] = useState({ name: 'Todas las categorias', _id: '' });
  const [product_state, setproduct_state] = useState('');
  const buttonref = useRef();
  const [openBulkLoad, setOpenBulkLoad] = useState(false);

  const [offerLoad, setOfferkLoad] = useState(false);
  const [stockLoad, setStockLoad] = useState(false);
  const [openUpdateProducts, setOpenUpdateProducts] = useState(false);
  const [preparationTimeLoad, setPreparationTimeLoad] = useState(false);

  const { crear, editar, eliminar, ver } = useGetPermisions(
    'Vender',
    'Productos'
  );

  const [init, setInit] = useState(true);
  const [alertDirection, setAlertDirection] = useState(false);

  const permisions = { crear, editar, eliminar, ver };

  const validateDirection = async () => {
    if (!store_id) return setInit(false);

    let { totalCompanyDirections } = await AxiosGQL(
      TOTAL_COMPANY_DIRECTIONS(store_id)
    );

    if (totalCompanyDirections == 0) setAlertDirection(true);

    setInit(false);
  };

  useEffect(() => {
    validateDirection();
  }, []);

  return !init ? (
    store_id ? (
      <Container maxWidth='xl'>
        <CardTotales setproduct_state={setproduct_state} store_id={store_id} />
        <br />
        <Options
          search={search}
          setSearch={setSearch}
          setCheckAll={setCheckAll}
          cat={cat}
          setCat={setCat}
          buttonref={buttonref}
          permisions={permisions}
          store_id={store_id}
          checkAll={checkAll}
          setOpenBulkLoad={setOpenBulkLoad}
        />
        <br />
        <TableData
          search={search}
          cat={cat}
          store_id={store_id}
          checkAll={checkAll}
          product_state={product_state}
          setreference={(ref) => (buttonref.current = ref)}
          permisions={permisions}
        />
        <AddSuccess />

        {alertDirection && (
          <AlertCompanyDirection isOpen={alertDirection} onClose={() => {}} />
        )}

        {openBulkLoad && (
          <OptionBulkLoad
            isOpen={openBulkLoad}
            onClose={() => setOpenBulkLoad(false)}
            process={(value) => {
              console.log({ value });
              if (value == 'stock') setStockLoad(true);
              else if (value == 'offer') setOfferkLoad(true);
              else if (value == 'preparationTime') setPreparationTimeLoad(true);
              else if (value == 'updateProductos') setOpenUpdateProducts(true);
              setOpenBulkLoad(false);
            }}
          />
        )}

        {openUpdateProducts && (
          <UpdateProductsBulkLoad
            isOpen={openUpdateProducts}
            onClose={() => setOpenUpdateProducts(false)}
            store_id={store_id}
          />
        )}

        {preparationTimeLoad && (
          <PreparationTimeBulkLoad
            isOpen={preparationTimeLoad}
            onClose={() => setPreparationTimeLoad(false)}
            store_id={store_id}
          />
        )}

        {offerLoad && (
          <OfferBulkLoad
            isOpen={offerLoad}
            onClose={() => setOfferkLoad(false)}
            store_id={store_id}
          />
        )}

        {stockLoad && (
          <StockBulkLoad
            isOpen={stockLoad}
            onClose={() => setStockLoad(false)}
            store_id={store_id}
          />
        )}
      </Container>
    ) : (
      <PendingActiveStore />
    )
  ) : (
    <></>
  );
}

export default SellerProductos;
