import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError } from './CVAlert';
import { getAuthToken } from '@/app/helpers/authUtils';

/**
 *
 * @param {Object} param0
 * @param {React.ReactHTMLElement} param0.icon
 * @param {String} param0.text
 * @param {Function} param0.fetchData
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.color
 * @param {String} param0.fontSize
 * @param {String} param0.fileName
 * @returns
 */
function CVDownloadRest({
  icon = <RiFileExcel2Line fontSize='1.5rem' />,
  text = 'Descarga en Excel',
  fetchData = () => [],
  simpleData = () => [],
  color = 'green',
  fontSize = '1rem',
  fileName = new Date().toISOString()
}) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const onClick = async () => {
    setloading(true);

    if (typeof fetchData === 'function') {
      const result = await fetchData();

      if (result?.url) {
        let blob = await fetch(process.env.API_URL + result.url, {
          method: result?.method || 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getAuthToken()
          },
          body: JSON.stringify(result?.body || {})
        })
          .then((response) => {
            if (response.status != 200) {
              throw new Error('Algo salió mal, inténtelo mas tarde.');
            }
            return response.blob();
          })
          .then((file) => file)
          .catch((error) => {
            CVAlertError({
              addToast,
              message: error?.message || 'Error del servidor'
            });
          });

        if (blob) FileSaver.saveAs(blob, fileName + fileExtension);
      }
    }

    setloading(false);
  };
  return (
    <Box onClick={() => onClick()} cursor='pointer'>
      <CVText display='flex' color={color} fontSize={fontSize}>
        {loading ? <Spinner /> : icon}
        <SizeBox width='0.5rem' /> {text}
      </CVText>
    </Box>
  );
}

export default CVDownloadRest;
