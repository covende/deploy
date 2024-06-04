import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Spinner } from '@chakra-ui/react';

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
function CVDownload({
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

  const onClick = async () => {
    setloading(true);

    if (typeof fetchData === 'object') {
      const result = fetchData;
      const ws = XLSX.utils.json_to_sheet(result);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      setloading(false);
    }
    if (typeof fetchData === 'function') {
      const result = await fetchData();
      const ws = XLSX.utils.json_to_sheet(result);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      setloading(false);
    }
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

export default CVDownload;
