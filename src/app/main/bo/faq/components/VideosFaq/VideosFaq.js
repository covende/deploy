import React, { useState } from 'react'
import { Grid, useDisclosure, Box, Center, Button } from '@chakra-ui/react';
import CustomTable from '../Table';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import Utils from '../../FaqBo.utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { A_FAQ } from '../../redux/Actions';
import { useToast } from '@chakra-ui/toast';
import { confirmAlert } from 'react-confirm-alert';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVRangePagination from '@/common/CovendeTemplate/CVRangePagination'
import ModalNewVideo from './components/ModalNewVideo';



  const VideosFaq = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
      <Box display='flex'>
        <Box display='flex' w='100%' justifyContent='end'>
        <Button
          size='sm'
          color='#fff'
          bg='#00adf6'
          w='139px'
          borderRadius='31px'
          fontWeight='700'
          fontSize='12px'
          textAlign='end'
          onClick={()=> onOpen()}
        >+ Crear Video</Button>
        </Box>
        {/* <CVRangePagination
          data = {Faqs} 
          setShowValues={setShowValues}
        /> */}
        <ModalNewVideo
         isOpen={isOpen}
         onClose={onClose}
        />
    </Box >
    )
};

export default VideosFaq;
