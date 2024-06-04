import {
  REJECTION_DELETE,
  REJECTION_ITEM_DELETE,
  REJECTION_ITEM_LIST
} from '@/app/api/graphql/webbo/BProductoService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Button, Flex, Text, Box } from '@chakra-ui/react';
import CVText from '@CVTemplate/core/CVText';
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import AddItemRejected from './mproducto/AddItemRejected';
import AddRejected from './mproducto/AddRejected';
import { svgDelete } from '@/app/assets/images/SVG';
import {
  CustomHead,
  CustomRow,
  CustomTable,
  CustomTbody,
  CustomTD,
  CustomTH
} from './vproducto/PStyles';
import { Tooltip } from '@chakra-ui/tooltip';
import { CVAlertConfirm } from '@CVTemplate/core/CVAlert';
import { BsPencilSquare } from 'react-icons/bs';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVLine from '@CVTemplate/core/CVLine';

function Rejected() {
  const [items, setitems] = useState([]);
  /******************************************* */
  const [isOpen, setisOpen] = useState(false);
  const onOpen = () => setisOpen(true);
  const onClose = () => setisOpen(false);

  const [isRejacted, setisRejacted] = useState(false);
  const onRejacted = () => setisRejacted(true);
  const noRejacted = () => setisRejacted(false);

  const [rejection, setRejection] = useState(undefined);
  const [rejectionItem, setRejectionItem] = useState(undefined);

  /***************************************************** */

  const initdata = async () => {
    const { RejectionItemList } = await AxiosGQL(REJECTION_ITEM_LIST);
    setitems(RejectionItemList);
  };

  const rejectionDelete = async (rejection_id) => {
    CVAlertConfirm({
      message: 'Eliminar este motivo de rechazo',
      title: 'Eliminar este motivo',
      okAction: async () => {
        const { RejectionDelete } = await AxiosGQL(
          REJECTION_DELETE({ rejection_id })
        );
        if (RejectionDelete?._id && RejectionDelete?.item?._id) {
          console.log(items);

          try {
            setitems(
              items.map((item) =>
                item._id == RejectionDelete?.item?._id
                  ? {
                      ...item,
                      rejections: [...(item?.rejections || [])].filter(
                        (rej) => rej._id != RejectionDelete._id
                      )
                    }
                  : item
              )
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  const rejectionItemDelete = async (rejection_item_id) => {
    CVAlertConfirm({
      message: 'Eliminar esta categoría de motivos de rechazo',
      title: 'Eliminar categoría de rechazo',
      okAction: async () => {
        const { RejectionItemDelete } = await AxiosGQL(
          REJECTION_ITEM_DELETE({ rejection_item_id })
        );

        if (RejectionItemDelete?._id)
          setitems(items.filter((item) => item._id != rejection_item_id));
      }
    });
  };

  useEffect(() => {
    initdata();
  }, []);

  const Filas = ({ rejs, index }) => {
    const rejections = rejs.rejections.length > 0 ? rejs.rejections : [{}];
    return (
      <>
        {(rejections || []).map((mot, idx) => (
          <CustomRow key={v4()}>
            {idx == 0 ? (
              <CustomTD
                backgroundColor='#FFFFFF'
                justifyContent='space-between'
                fontColor='#004574'
                rowSpan={(rejections || []).length > 0 ? rejections.length : 1}>
                <Flex
                  minWidth='max-content'
                  justifyContent='space-between'
                  alignItems='center'>
                  <CVText>{rejs.title}</CVText>
                  <Box>
                    <Tooltip label='Eliminar'>
                      <Button
                        colorScheme='teal'
                        variant='ghost'
                        onClick={() => rejectionItemDelete(rejs._id)}>
                        {svgDelete}
                      </Button>
                    </Tooltip>
                    <SizeBox />
                    <Tooltip label='Editar'>
                      <Button
                        variant='ghost'
                        onClick={() => {
                          setRejection(rejs);
                          onOpen();
                        }}>
                        <BsPencilSquare
                          style={{ color: '#17BF93', fontSize: '1.5rem' }}
                        />
                      </Button>
                    </Tooltip>
                  </Box>
                </Flex>
              </CustomTD>
            ) : (
              <></>
            )}
            <CustomTD
              backgroundColor='#EDF2F5'
              justifyContent='space-between'
              fontColor='#000000'>
              <Flex
                minWidth='max-content'
                justifyContent='space-between'
                alignItems='center'>
                <CVText>{mot.title}</CVText>
                {!!mot.title && (
                  <Box>
                    <Tooltip label='Eliminar'>
                      <Button
                        colorScheme='teal'
                        variant='ghost'
                        onClick={() => rejectionDelete(mot._id)}>
                        {svgDelete}
                      </Button>
                    </Tooltip>

                    <SizeBox />
                    <Tooltip label='Editar'>
                      <Button
                        variant='ghost'
                        onClick={() => {
                          setRejectionItem({ ...mot, item: rejs._id });
                          onRejacted();
                        }}>
                        <BsPencilSquare
                          style={{ color: '#17BF93', fontSize: '1.5rem' }}
                        />
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Flex>
            </CustomTD>
            <CustomTD
              backgroundColor='#EDF2F5'
              justifyContent='left'
              fontColor='#000000'>
              <CVText>{mot?.description || ''}</CVText>
            </CustomTD>
          </CustomRow>
        ))}
      </>
    );
  };

  return (
    <Container
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '1rem',
        padding: '1rem'
      }}>
      <Text fontWeight='bold' fontSize='1.5rem' color='#004772'>
        Motivos de Rechazo
      </Text>
      <CustomTable>
        <CustomHead>
          <CustomRow>
            <CustomTH>
              <div>Item</div>
            </CustomTH>
            <CustomTH>
              <div>Titulo de rechazo</div>
            </CustomTH>
            <CustomTH>
              <div>Descripción</div>
            </CustomTH>
          </CustomRow>
        </CustomHead>
        <CustomTbody>
          {items.map((rejs, index) => (
            <Filas key={v4()} rejs={rejs} index={index} />
          ))}
        </CustomTbody>
      </CustomTable>
      <br />
      <Flex justifyContent='space-between'>
        <Button variant='link' color='#00ADF6' onClick={() => onOpen()}>
          + Añadir Item
        </Button>
        <Button variant='link' color='#00ADF6' onClick={() => onRejacted()}>
          + Añadir Rechazo
        </Button>
      </Flex>
      <br />
      {isOpen && (
        <AddItemRejected
          isOpen={isOpen}
          onClose={() => {
            setRejection(undefined);
            onClose();
          }}
          setitems={setitems}
          items={items}
          rejection={rejection}
        />
      )}
      {isRejacted && (
        <AddRejected
          isOpen={isRejacted}
          onClose={() => {
            setRejectionItem(undefined);
            noRejacted();
          }}
          setitems={setitems}
          items={items}
          rejectionItem={rejectionItem}
        />
      )}
    </Container>
  );
}

export default Rejected;
