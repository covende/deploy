import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { TextField } from '@material-ui/core';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { REJECTION_LIST } from '@/app/api/graphql/webbo/BProductoService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CVButton } from '@/common/CovendeTemplate';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { FaTimes, FaCheck } from 'react-icons/fa';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

const CustomBox = ({ children }) => (
  <Box
    border='1px solid #ECECEC'
    rounded='3px'
    padding='2px'
    width='25px'
    height='25px'
    display='flex'
    justifyContent='center'
    alignItems='center'
    marginRight='10px'>
    {children}
  </Box>
);

const CustomIconNO = ({ aprove }) => (
  <CustomBox>
    <FaTimes style={{ color: aprove ? COLORS['red'] : 'transparent' }} />
  </CustomBox>
);
const CustomIconSI = ({ aprove }) => (
  <CustomBox>
    <FaCheck style={{ color: aprove ? COLORS['green'] : 'transparent' }} />
  </CustomBox>
);

function ApproveProducto({ isOpen, onClose, verficaproducto, blockproducto }) {
  const [aprove, setaprove] = useState('SI');
  const [motivos, setmotivos] = useState([]);
  const [rejections, setrejections] = useState([]);
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const initdata = async () => {
    const { RejectionList } = await AxiosGQL(REJECTION_LIST);
    let mots = RejectionList.map((it) => {
      return { ...it, item: it.item.title };
    });
    setrejections(mots);
  };

  const autorize = async () => {
    setloading(true);
    // if (aprove == 'SI') {
    //   await verficaproducto(motivos);
    // } else {
    if (motivos.length == 0) {
      CVAlertError({
        addToast,
        message: 'Por favor seleccióne por lo menos un motivo de rechazo'
      });
      setloading(false);
      return;
    }
    await blockproducto(motivos);
    // }
    setloading(false);
    onClose();
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
      justifyContentFooter='center'
      footer={
        <>
          <CVButton
            disabled={loading}
            onClick={() => autorize()}
            isLoading={loading}>
            Enviar
          </CVButton>
          <SizeBox />
          <CVButton backgroundColor='red' onClick={onClose}>
            Cancelar
          </CVButton>
        </>
      }>
      <SizeBox />
      <CVText textAlign='center' fontWeight='bold'>
        ¿Apruebas la publicación del producto?
      </CVText>
      <SizeBox />

      <Flex justifyContent='center'>
        <Box onClick={() => setaprove('SI')} display='flex'>
          <CustomIconSI aprove={aprove == 'SI'} />
          SI
        </Box>
        <Box w='20px'></Box>
        <Box onClick={() => setaprove('NO')} display='flex'>
          <CustomIconNO aprove={aprove == 'NO'} />
          NO
        </Box>
      </Flex>
      {aprove == 'NO' && (
        <Box>
          <Text fontWeight='bold'>Indica los motivos:</Text>
          {motivos.map((item) => (
            <CVText key={v4()} display='flex'>
              <FaTimes style={{ color: COLORS['red'] }} />
              {item.title}
            </CVText>
          ))}
          <SizeBox />

          <Autocomplete
            limitTags={1}
            multiple
            options={rejections}
            groupBy={(option) => option.item}
            value={motivos}
            onChange={(c, v) => setmotivos(v)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label='Selecciona el motivo de rechazo' />
            )}
          />

          <SizeBox />

          <Link
            to='/bo/productos/rejected'
            style={{ color: '#00ADF6', fontSize: '0.75rem' }}>
            Ver Motivos de rechazo
          </Link>
        </Box>
      )}
      <SizeBox />
    </CVModal>
  );
}

export default ApproveProducto;
