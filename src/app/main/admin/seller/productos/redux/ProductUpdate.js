import { STORES_BY_OWNER } from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser, setSession } from '@/app/helpers/authUtils';
import {
  toBase64,
  whosale
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { useSelector } from 'react-redux';
import { A_PRODUCTVIEW } from './ProductViewAction';
import arrayToTree from 'array-to-tree';

const flattenTree = (list) => {
  let cats = arrayToTree(list || [], {
    parentProperty: 'parent_id',
    customID: '_id'
  });

  if (!cats || cats?.length < 1) return [];
  let tree = cats[0];

  const flatArray = [];

  const flatten = (node) => {
    flatArray.push({ ...node, children: [] });
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => flatten(child));
    }
  };

  flatten(tree);
  return flatArray;
};

export const ProductUpdate = ({ dispatch, step, result }) => {
  const formatattributes = (ls) => {
    let lista = ls.map((it) => {
      let detalles = it.attribute_details.map((idt) => {
        return {
          product_attribute_detail_id: idt.product_attribute_detail_id,
          name: idt.name,
          color: idt.color,
          description: idt.description,
          type_attribute: idt.type_attribute,
          product_attribute_id: idt.product_attribute_id,
          creator_id: idt.creator_id,
          selected: true
        };
      });
      return {
        product_attribute_id: it.id_attribute,
        name: it.name,
        type_attribute: it.type_attribute,
        creator_id: '',
        attributes_details: detalles
      };
    });
    return lista;
  };
  const substring2 = (formate = '0') =>
    formate
      .toString()
      .replaceAll(' ', '')
      .replaceAll('kg', '')
      .replaceAll('cm', '');

  dispatch(
    A_PRODUCTVIEW({
      // tabIndex: result.step <= 3 ? result.step : step,
      tabIndex: step,
      product: {
        product_id: result.product_id,
        store_id: result.store_id
      },
      categorias: flattenTree(result.categories),
      attributes: formatattributes(result.product_attributes),
      brand: result.product_brand,
      information: {
        name: result.product_name,
        typeMarca: result.product_brand.type_brand || 'GENERIC',
        modelo: result.model_product,
        sku: result.sku,
        procedencia: result.product_origin,
        condicion: result.product_condition,
        licencia: {
          data: result.product_licenses_or_permits,
          name: 'document'
        },
        slug: result.slug
      },
      description: {
        destacada: result.product_detail.featured_description,
        detallada: result.product_detail.detailed_description,
        keywords: result.product_detail.keywords.split(','),
        contenido: result.product_detail.product_content,
        fotografias: result.product_detail.photographs,
        material: result.product_detail.main_material,
        peso: substring2(result?.product_detail?.product_weight || ''),
        dimensiones: {
          largo: substring2(
            result?.product_detail?.product_dimensions?.long || ''
          ),
          ancho: substring2(
            result?.product_detail?.product_dimensions?.width || ''
          ),
          alto: substring2(
            result?.product_detail?.product_dimensions?.high || ''
          )
        }
      },

      precios: {
        type_of_sale: result?.type_of_sale || 'BOTH',
        stock: result?.stock || 0,
        offer: result?.offer_status ? true : false,
        offer_type: result?.offer_type || '',
        offer_value: result?.offer_value || 0,
        offer_percentage: result?.offer_percentage || 0,
        offer_start_date: result?.offer_start_date
          ? new Date(result?.offer_start_date)
          : new Date(),
        offer_end_date: result?.offer_end_date
          ? new Date(result?.offer_end_date)
          : new Date(),
        price_unit: CVMoneyFormat({
          amount: result?.price_unit || 0,
          currency: ''
        }),
        wholesales: result?.wholesale || [],
        sale_with_custom_attributes: result?.variations || [],
        check_custom: result?.variations?.length > 0 ? true : false,
        stock_alert: result?.stock_alert || true
      },

      despacha: {
        dias: result.preparation_time || '0',
        pormayor: !!whosale(result?.type_of_sale || 'BOTH'),
        tipo_paquete: result.package_information?.package_type || 'Caja',
        peso_paquete: substring2(
          result.package_information?.package_weight || ''
        ),
        dimensiones: {
          largo: substring2(
            result.package_information?.package_dimensions?.long || ''
          ),
          ancho: substring2(
            result.package_information?.package_dimensions?.width || ''
          ),
          alto: substring2(
            result.package_information?.package_dimensions?.high || ''
          )
        },
        status: result.package_information?.status,
        wholesales: result.wholesale ?? [],
        inf_adicional: result.additional_information || ''
      },
      extra: {
        comprobante: result.type_voucher || 'TICKET',
        igv: (result.igv || 18).toString(),
        periodo: (result.warranty_period || 0).toString(),
        garantia: result.warranty ? 'si' : 'no',
        detalle: result.warranty_detail || '',
        devolution_reasons_ids: result?.devolution_reasons_ids || []
      },
      product_state: result.product_state || 'IN_DRAFT',
      status: result.status || '',
      in_draft: (result.status || 'IN_DRAFT') == 'IN_DRAFT' ? true : false,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      custom_id: result.custom_id,
      rejection_reasons: result?.rejection_reasons || []
    })
  );
};

export const tienda = async (dispatch, product, redirect = true) => {
  let owner = getLoggedInUser();
  if (product.store_id == '') {
    let result = await AxiosGQL(STORES_BY_OWNER(owner.user_id));
    let stores = result?.companyByOwner || [];
    if (stores.length > 0) {
      dispatch(
        A_PRODUCTVIEW({
          product: {
            ...product,
            store_id: stores[stores.length - 1]._id
          },
          store_status: stores[stores.length - 1].status,
          type_of_sale: stores[stores.length - 1].type_of_sale,
          delivery_own: stores[stores.length - 1].delivery_own || false,
          deliveryOwnStatus: stores[stores.length - 1]?.delivery_own_status
        })
      );
      return stores[stores.length - 1]._id;
    } else {
      if (redirect) {
        window.location =
          '/crea-tu-tienda/create-tienda/' + toBase64(owner.user_id);
        setSession(null);
      }
    }
  } else {
    return product.store_id;
  }
};

export const tiendaBo = async (
  dispatch,
  { product, store },
  redirect = true
) => {
  if (product.store_id == '') {
    if (store?._id) {
      dispatch(
        A_PRODUCTVIEW({
          product: {
            ...product,
            store_id: store._id
          },
          store_status: store.status,
          type_of_sale: store.type_of_sale
        })
      );
      return store._id;
    } else {
      return tienda(dispatch, product, redirect);
    }
  }

  return product.store_id;
};

export const tiendaAdmin = async (
  dispatch,
  { product, store },
  redirect = true
) => {
  if (product.store_id == '') {
    if (store?._id) {
      dispatch(
        A_PRODUCTVIEW({
          product: {
            ...product,
            store_id: store._id
          },
          store_status: store.status,
          type_of_sale: store.type_of_sale
        })
      );
      return store._id;
    } else {
      if (redirect) {
        window.location = '/iniciar-sesion';
        setSession(null);
      }
    }
  } else {
    return product.store_id;
  }
};
