import { Container } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import CardTotales from './components/CardTotales';
import TableData from './components/TableData';
import Options from './components/Options';
import PendingActiveStore from '../PendingActiveStore';
import { useSelector, useDispatch } from 'react-redux';
import AddSuccess from './components/modales/AddSuccess';
import { rolemenu } from '@/app/helpers/role';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import OptionBulkLoad from './components/modales/OptionsBulkLoad';
import OfferBulkLoad from './components/modales/OfferBulkLoad';
import StockBulkLoad from './components/modales/StockBulkLoad';
import PreparationTimeBulkLoad from './components/modales/PreparationTimeBulkLoad';
import { tienda } from './redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { TOTAL_COMPANY_DIRECTIONS } from '@CVApi/core/webpublic/userData/UserDirectionService';
import AlertCompanyDirection from './components/modales/AlertCompanyDirection';
import UpdateProductsBulkLoad from './components/modales/UpdateProductsBulkLoad';

function SellerProductos({ store_id }) {
  const { store_status, product } = useSelector((state) => state.ProductView);
  const [search, setSearch] = useState('');
  const [checkAll, setCheckAll] = useState(false);
  const [cat, setCat] = useState({ name: 'Todas las categorias', _id: '' });
  const [product_state, setproduct_state] = useState('');
  const buttonref = useRef();
  const [openBulkLoad, setOpenBulkLoad] = useState(false);
  const [offerLoad, setOfferkLoad] = useState(false);
  const [stockLoad, setStockLoad] = useState(false);
  const [preparationTimeLoad, setPreparationTimeLoad] = useState(false);
  const [init, setInit] = useState(true);
  const [storeID, setStoreID] = useState(undefined);
  const [alertDirection, setAlertDirection] = useState(false);
  const [openUpdateProducts, setOpenUpdateProducts] = useState(false);

  const dispatch = useDispatch();

  const { crear, editar, eliminar, ver } = useGetPermisions(
    'Vender',
    'Productos'
  );

  const validateDirection = async () => {
    let id = store_id || product?.store_id || (await tienda(dispatch, product));

    if (id) setStoreID(id);
    else return setInit(false);

    let { totalCompanyDirections } = await AxiosGQL(
      TOTAL_COMPANY_DIRECTIONS(id)
    );

    if (totalCompanyDirections == 0) setAlertDirection(true);

    setInit(false);
  };

  useEffect(() => {
    validateDirection();
  }, []);

  const permisions = { crear, editar, eliminar, ver };

  return !init ? (
    store_status == 'APPROVED' && storeID ? (
      <Container maxWidth='xl'>
        <CardTotales setproduct_state={setproduct_state} store_id={storeID} />
        <br />
        {rolemenu() != '/bo/' && (
          <Options
            search={search}
            setSearch={setSearch}
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            cat={cat}
            setCat={setCat}
            buttonref={buttonref}
            permisions={permisions}
            product_state={product_state}
            setOpenBulkLoad={setOpenBulkLoad}
          />
        )}
        <br />
        <TableData
          search={search}
          cat={cat}
          checkAll={checkAll}
          store_id={storeID}
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
            store_id={storeID}
          />
        )}

        {offerLoad && (
          <OfferBulkLoad
            isOpen={offerLoad}
            onClose={() => setOfferkLoad(false)}
            store_id={storeID}
          />
        )}

        {stockLoad && (
          <StockBulkLoad
            isOpen={stockLoad}
            onClose={() => setStockLoad(false)}
            store_id={storeID}
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
