import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { uploadFile } from '@/app/api/graphql/upload/uploadservice';
import { useToast } from '@chakra-ui/toast';
import { COLORS } from './CVThemes';
import { CVAlertError } from './CVAlert';
import { Spinner } from '@chakra-ui/react';

const Filecontainer = styled.label`
  width: 100%;
  padding: 0px 0px 0px 10px;
  border-radius: 12px;
  border: 1px solid
    ${({ color }) => (color == '' ? COLORS['primary'] : COLORS['gray'])};
  display: flex;
  & input {
    display: none;
  }
  & > div {
    background: ${({ color }) =>
      color == '' ? COLORS['primary'] : COLORS['gray']};
    border: 1px solid
      ${({ color }) => (color == '' ? COLORS['primary'] : COLORS['gray'])};
    box-sizing: border-box;
    display: flex;
    padding: 5px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    width: 150px;
    color: #ffffff;
    justify-content: center;
  }
  & p {
    display: flex;
    width: 100%;
    padding: 5px;
  }
`;

/**
 *
 * @param {Object} param0
 * @param {Function} param0.callback
 * @param {Function} param0.onChange
 * @param {String} param0.fontSize
 * @param {String} param0.accept
 * @param {String} param0.value
 * @param {String} param0.height
 * @param {Boolean} param0.validateName
 * @param {String} param0.name
 * @returns
 */
function CVInputFile({
  accept = 'application/pdf',
  callback = (e) => {},
  onChange = (e) => {},
  value,
  children,
  fontSize = '1rem',
  height = '2.5rem',
  validateName = false,
  name = ''
}) {
  const [src, setsrc] = useState(null);
  useEffect(() => {
    if (value != src) setsrc(value);
  }, [value]);

  const addToast = useToast();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');

  const onChangedFile = async (e) => {
    setLoading(true);
    var file = e.target.files[0];

    if (validateName && name == '') {
      CVAlertError({
        addToast,
        message: 'El código es obligatorio.'
      });
      setLoading(false);
      return;
    }

    let result = await uploadFile({
      file: await toBase64(file),
      type: 'documents',
      mimetype: '',
      name
    });
    setLoading(false);
    if (result?.status == 'ok') {
      callback({ ...result, name: file.name });
      onChange({ ...result, name: file.name });

      setFile(file);
    } else {
      CVAlertError({
        addToast,
        message: 'Error al subir archivo, elija otro archivo'
      });
    }
  };

  return (
    <Filecontainer color={file.name || src?.name || ''}>
      <input
        disabled={loading}
        type='file'
        onChange={onChangedFile}
        accept={accept}
      />
      <p style={{ height, fontSize }}>{file.name || src?.name}</p>
      <div>{loading ? <Spinner size={fontSize} /> : children}</div>
    </Filecontainer>
  );
}

export default CVInputFile;
