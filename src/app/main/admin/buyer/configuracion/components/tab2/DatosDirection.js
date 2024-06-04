import { Box, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MisDirecciones from './MisDirecciones';
import ModalDireccion from './ModalDireccion';
import * as User from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { USER_DIRECTION_BY_USER } from '@/app/api/graphql/webpublic/userData/UserDirectionService';
function DatosDirection() {
  let us = User.getLoggedInUser();
  const [userDataDirections, setUserDataDirections] = useState([]);
  const [userDirection, setUserDirection] = useState({
    _id: null,
    dni: null,
    predeterminado: false,
    user_id: null,
    customer_id: null,
    nombre: null,
    apellidos: null,
    direccion: null,
    referencia: null,
    departamento_id: null,
    provincia_id: null,
    distrito_id: null,
    zip: null,
    telefono: null,
    ubigeo_district: null
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNewDirection, setIsNewDirection] = useState(true);
  const [onUpdate, setOnUpdate] = useState(false);

  const initdata = async () => {
    const { userDirectionByUser } = await AxiosGQL(
      USER_DIRECTION_BY_USER(us.user_id)
    );

    if (userDirectionByUser) {
      let direccionesTMP = userDirectionByUser
        ? userDirectionByUser.sort(
            (start, secondary) => start.position - secondary.position
          )
        : [];

      setUserDataDirections(direccionesTMP);
    }
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      <MisDirecciones
        onOpen={onOpen}
        userData={userDataDirections}
        initdata={initdata}
        setUserDirection={setUserDirection}
        userDirection={userDirection}
        setIsNewDirection={setIsNewDirection}
        onUpdate={onUpdate}
      />
      <ModalDireccion
        isOpen={isOpen}
        onClose={onClose}
        userDirection={userDirection}
        setUserDirection={setUserDirection}
        isNewDirection={isNewDirection}
        initData={initdata}
        setOnUpdate={setOnUpdate}
      />
    </Box>
  );
}

export default DatosDirection;
