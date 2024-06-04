import { Spinner } from '@chakra-ui/spinner';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { uploadFile } from '@/app/api/graphql/upload/uploadservice';
import { useToast } from '@chakra-ui/toast';
import { COLORS } from './CVThemes';
import { CVAlertError } from './CVAlert';

/**
 *
 * @param {Object} param0
 * @param {Function} param0.callback
 * @param {Function} param0.onChange
 * @param {String} param0.fontSize
 * @param {String} param0.accept
 * @returns
 */

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function CVInputFileLink({
  callback = (e) => {},
  onChange = (e) => {},
  value,
  children,
  fontSize = '1rem',
  height = '2.5rem',
  accept = 'application/pdf'
}) {
  const addToast = useToast();
  const Filecontainer = styled.label`
    & input {
      display: none;
    }
    & p {
      display: flex;
      width: 100%;
      padding: 5px;
    }
    & :hover {
      color: ${COLORS['primary']};
    }
  `;

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');

  const onChangedFile = async (e) => {
    setLoading(true);
    var file = e.target.files[0];
    let result = await uploadFile({
      file: await toBase64(file),
      type: 'documents',
      mimetype: ''
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
    <Filecontainer>
      <input
        disabled={loading}
        type='file'
        onChange={onChangedFile}
        accept={accept}
      />
      <div>{loading ? <Spinner /> : children}</div>
    </Filecontainer>
  );
}

export default CVInputFileLink;
