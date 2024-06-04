import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Spinner } from '@chakra-ui/react';
import { v4 } from 'uuid';

import ExcelJS from 'exceljs';

/**
 * @typedef {Object} Header
 * @property {string} header - texto de la columna
 * @property {string} key - El identificador de la columna
 * @property {string} comment - comentario de la columna
 * @property {number} width - Ancho de la celda
 * @property {[string]} options - El listado de opciones
 * @property {Boolean} multiOptions
 */

/**
 *
 * @param {Object} param0
 * @param {React.ReactHTMLElement} param0.icon
 * @param {String} param0.text
 * @param {Function} param0.fetchData
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.color
 * @param {String} param0.fontSize
 * @param {String} param0.fileName
 * @param {[Header]} param0.headers
 * @param {string} param0.sheetName
 * @param {string} param0.headersColor - en hexadecimal
 * @param {string} param0.fontWeight
 * @param {string} param0.justifyContent
 * @returns
 */
function CVDownloadXlxs({
  icon = <RiFileExcel2Line fontSize='1.5rem' />,
  text = 'Descarga en Excel',
  fetchData = () => [],
  color = 'green',
  fontSize = '1rem',
  fileName = new Date().toISOString(),
  headers = [],
  sheetName = 'data',
  headersColor = 'C6E0B4',
  fontWeight = 'Normal',
  justifyContent = 'normal'
}) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  // const fileType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
  // const fileExtension = '.xlsm';

  const [loading, setloading] = useState(false);

  const onClick = async () => {
    const letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'AA',
      'AB',
      'AC',
      'AD',
      'AE'
    ];

    setloading(true);

    if (typeof fetchData === 'object') {
      let workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(sheetName);
      let columns = [];
      headers.forEach((header, i) => {
        columns.push({
          header: header.header || '',
          key: header.key || i,
          width: header.width || 43
        });
      });
      worksheet.columns = columns;
      worksheet.spliceRows(1, 0, []);

      let attributes = { headers: [], data: [] };
      let options = { headers: [], data: [] };

      headers.forEach((header, index) => {
        let letter = letters[index];

        const cell = worksheet.getCell(letter + '1');
        cell.value = header.comment || '';

        let optionsSize = header?.options?.length || 0;

        if (optionsSize && header?.key) {
          if (header?.multiOptions) {
            let letterAttr = letters[attributes.headers.length];
            cell.value = {
              text: header.comment || '',
              hyperlink: `#Atributos!${letterAttr}2:${letterAttr}${
                optionsSize + 1
              }`,
              tooltip: 'Opciones de ' + header.header || ''
            };

            attributes.headers.push({
              header: header.header || '',
              key: header.key,
              width: header.width / 2 || 25,
              hyperlink: `#${sheetName}!${letter}2`
            });

            header.options.forEach((item, i) => {
              if (attributes.data[i]) {
                attributes.data[i] = {
                  ...attributes.data[i],
                  [header.key]: item
                };
              } else {
                attributes.data[i] = { [header.key]: item };
              }
            });
            return;
          }

          let letterOpt = letters[options.headers.length];
          worksheet.dataValidations.add(letter + '3:' + letter + '1002', {
            type: 'list',
            allowBlank: false,
            formulae: [
              `=Opciones!$${
                letterOpt + '$2:$' + letterOpt + '$' + (optionsSize + 1)
              }`
            ],
            showErrorMessage: true,
            errorStyle: 'error',
            error:
              'Este valor no coincide con las restricciones de validación de datos definidas para esta celda.'
          });

          options.headers.push({
            header: header.header || '',
            key: header.key,
            width: header.width || 50
          });

          header.options.forEach((item, i) => {
            if (options.data[i]) {
              options.data[i] = {
                ...options.data[i],
                [header.key]: item
              };
            } else {
              options.data[i] = { [header.key]: item };
            }
          });
        }
      });

      if (fetchData) worksheet.addRows(fetchData);

      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          if (rowNumber == 1) {
            cell.font = { size: 12, name: 'Times Roman' };
            cell.alignment = {
              vertical: 'top',
              horizontal: 'center',
              wrapText: true
            };
          } else if (rowNumber == 2) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: headersColor }
            };
            cell.font = {
              size: 12,
              bold: true
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            };

            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center'
            };
          } else {
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center',
              wrapText: true
            };
          }
        });
        row.commit();
      });

      if (attributes.headers.length > 0) {
        let attributesSheet = workbook.addWorksheet('Atributos');
        attributesSheet.columns = attributes.headers;

        attributes.headers.forEach((attribute, i) => {
          let letter = letters[i];
          let cell = attributesSheet.getCell(letter + '1');
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: headersColor }
          };

          cell.font = {
            size: 12,
            bold: true
          };

          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };

          cell.value = {
            text: attribute.header,
            hyperlink: attribute.hyperlink,
            tooltip: attribute.header
          };
        });

        attributesSheet.addRows(attributes.data);
      }

      if (options.headers.length > 0) {
        let optsSheet = workbook.addWorksheet('Opciones');

        options.headers.forEach((_, i) => {
          let letter = letters[i];

          optsSheet.getCell(letter + '1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: headersColor }
          };

          optsSheet.getCell(letter + '1').font = {
            size: 12,
            bold: true
          };
        });

        optsSheet.columns = options.headers;
        optsSheet.addRows(options.data);
        optsSheet.state = 'hidden';
        optsSheet.protect(v4());
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const data = new Blob([buffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);

      setloading(false);
    }

    // if (typeof fetchData === 'object') {
    //   let workbook = new ExcelJS.Workbook();
    //   const worksheet = workbook.addWorksheet(sheetName);
    //   let columns = [];
    //   headers.forEach((header, i) => {
    //     columns.push({
    //       header: header.header || '',
    //       key: header.key || i,
    //       width: header.width || 43
    //     });
    //   });
    //   worksheet.columns = columns;
    //   worksheet.spliceRows(1, 0, []);

    //   headers.forEach((header, i) => {
    //     let letter = letters[i];
    //     worksheet.getCell(letter + '1').value = header.comment || '';
    //     if (header.dataValidations) {
    //       console.log(header.dataValidations);
    //       worksheet.dataValidations.add(letter + '3:' + letter + '12', {
    //         type: 'list',
    //         allowBlank: false,
    //         formulae: [`"${header.dataValidations}"`],
    //         showErrorMessage: true,
    //         errorStyle: 'error',
    //         error:
    //           'Este valor no coincide con las restricciones de validación de datos definidas para esta celda.'
    //       });
    //     }
    //   });

    //   if (fetchData) worksheet.addRows(fetchData);

    //   worksheet.eachRow((row, rowNumber) => {
    //     row.eachCell((cell, colNumber) => {
    //       if (rowNumber == 1) {
    //         cell.font = { size: 12, name: 'Times Roman' };
    //         cell.alignment = {
    //           vertical: 'top',
    //           horizontal: 'center',
    //           wrapText: true
    //         };
    //       } else if (rowNumber == 2) {
    //         cell.fill = {
    //           type: 'pattern',
    //           pattern: 'solid',
    //           fgColor: { argb: headersColor }
    //         };
    //         cell.font = {
    //           size: 12,
    //           bold: true
    //         };
    //         cell.border = {
    //           top: { style: 'thin' },
    //           left: { style: 'thin' },
    //           right: { style: 'thin' }
    //         };

    //         cell.alignment = {
    //           vertical: 'middle',
    //           horizontal: 'center'
    //         };
    //       } else {
    //         cell.alignment = {
    //           vertical: 'middle',
    //           horizontal: 'center',
    //           wrapText: true
    //         };
    //       }
    //     });
    //     row.commit();
    //   });

    //   const buffer = await workbook.xlsx.writeBuffer();
    //   const data = new Blob([buffer], { type: fileType });
    //   FileSaver.saveAs(data, fileName + fileExtension);

    //   setloading(false);
    // }
    // if (typeof fetchData === 'function') {
    //   const result = await fetchData();
    //   const ws = XLSX.utils.json_to_sheet(result);
    //   const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //   const data = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(data, fileName + fileExtension);
    //   setloading(false);
    // }
  };
  return (
    <Box onClick={() => onClick()} cursor='pointer'>
      <CVText
        display='flex'
        textAlign='center'
        fontWeight={fontWeight}
        color={color}
        justifyContent={justifyContent}
        fontSize={fontSize}>
        {loading ? <Spinner /> : icon}
        <SizeBox width='0.5rem' /> {text}
      </CVText>
    </Box>
  );
}

export default CVDownloadXlxs;
