import React, { useState, useEffect } from 'react';

// UI components
import {
  Button,
  Dropzone,
  FormGroup,
  Label,
  Select
} from '@/common/components';
import { Input } from '@chakra-ui/react';

// Styles
import { GridRow } from '../styles/Modal.styles';

function ModalForm(props) {
  const {
    state,
    setState,
    handleSubmit,
    register,
    errors,
    onSubmit,
    dataDependency
  } = props;
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (files.length) {
      setState({ ...state, image: files[0] });
    }
  }, [files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: 'auto' }}>
      <FormGroup>
        <Label>Foto de perfil</Label>
        <Dropzone
          name='image'
          id='image'
          multiple={false}
          ref={register}
          files={files}
          setFiles={setFiles}
          buttonText='Subir/Añadir imagen'
        />
      </FormGroup>
      <GridRow numCols={2}>
        <FormGroup>
          <Label>Nombres</Label>
          <Input
            key='first_name'
            type='text'
            name='first_name'
            ref={register({ required: true })}
            defaultValue={state.first_name}
            placeholder='Ingrese sus nombres'
            width='230px'
          />
        </FormGroup>
        <FormGroup>
          <Label>Apellidos</Label>
          <Input
            key='last_name'
            type='text'
            name='last_name'
            ref={register({ required: true })}
            defaultValue={state.last_name}
            placeholder='Ingrese sus apellidos'
            width='230px'
          />
        </FormGroup>
      </GridRow>
      <FormGroup>
        <Label>Correo Electrónico:</Label>
        <Input
          type='text'
          name='email'
          ref={register({ required: true })}
          defaultValue={state.email}
          placeholder='Ingrese su correo electrónico'
          width='467px'
        />
      </FormGroup>
      <GridRow numCols={2}>
        <FormGroup>
          <Label>Contraseña:</Label>
          <Input
            type='password'
            name='password'
            ref={register({ required: true })}
            placeholder='Ingrese su contraseña'
            width='230px'
          />
        </FormGroup>
        <FormGroup>
          <Label>Repetir Contraseña:</Label>
          <Input
            type='password'
            name='password_again'
            ref={register({ required: true })}
            placeholder='Ingrese su contraseña de nuevo'
            width='230px'
          />
        </FormGroup>
      </GridRow>
      <FormGroup>
        <Label>Roles:</Label>
        <Select
          name='role'
          id='role'
          ref={register({ required: true })}
          defaultValue={state.role || ''}
          boxShadow='none'
          width='100%'>
          <option value=''>-- Ninguna --</option>
          {dataDependency.loading ? null : dataDependency.error ? (
            <option>-- Error --</option>
          ) : (
            dataDependency.data.map((rol, index) => (
              <option key={index} value={rol.role_id}>
                {rol.name}
              </option>
            ))
          )}
        </Select>
      </FormGroup>
      <Button
        type='submit'
        margin='20px auto 0px auto'
        width='176px'
        height='27px'>
        Guardar
      </Button>
    </form>
  );
}

export default ModalForm;
