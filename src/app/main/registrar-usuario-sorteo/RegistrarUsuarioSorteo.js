
import React, { useState } from 'react';
import {
  Button, Checkbox, CheckboxGroup, Box,
  FormControl, FormErrorMessage,
  FormLabel, Input, Stack, Text, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter
} from '@chakra-ui/react';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import REGISTER_USER_SORTEO from '@CVApi/core/webUserSorteo/WUserSorteoType';
import { svgCovende } from '@/app/assets/images/SVG';
import { Link } from 'react-router-dom';
import { FormHelperText } from '@/../node_modules/@material-ui/core/index';
import { color } from '@/app/assets/icons/index';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dni: '',
    phone: '',
    pedido_id: '',
    social_media: {
      facebook: '',
      instagram: '',
      tiktok: ''
    },
    validInformation: false,
    termsAndConditions: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("social_media")) {
      const socialMediaName = name.split(".")[1];
      setFormData(prevState => ({
        ...prevState,
        social_media: {
          ...prevState.social_media,
          [socialMediaName]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Envía la consulta GraphQL al backend 
    const response = await AxiosGqlClient.query(REGISTER_USER_SORTEO(formData));
    console.log(response, "RESPUESTA");

    // Verifica si la respuesta contiene los datos del usuario registrado
    if (response.data && response.data.registerUserForSorteo) {
      // Mostrar el mensaje de éxito 
      console.log(response.data, "data")
      setShowModal(true);
      // Restablecer el formulario después del registro exitoso
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        dni: '',
        phone: '',
        pedido_id: '',
        social_media: {
          facebook: '',
          instagram: '',
          tiktok: ''
        },
        validInformation: false,
        termsAndConditions: false
      });
    }

    setIsLoading(false);
  };




  return (
    <>
   <Box width="100%" height="30px" marginBottom="40px" marginTop="20px" display="flex" justifyContent="center" alignItems="center">
        {svgCovende}
      </Box>
      <Box background="linear-gradient(90deg, #FF1717 0%, #FF7575 100%, #FF5454 100%, #FF1717 100%)" width="100%" height="auto" display="flex" justifyContent="center" alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Box marginRight={{ base: '0', md: '50px' }} marginBottom={{ base: '10px', md: '0' }} textAlign={{ base: 'center', md: 'left' }}>
          <Text color="#fff" fontSize={{ base: '24px', md: '38px' }} fontWeight="bold" marginBottom="5px">
            <span style={{ fontWeight: "normal" }}> ¡A </span> MÁS COMPRAS, MÁS
          </Text>
          <Text color="#fff" fontSize={{ base: '24px', md: '38px' }} fontWeight="bold" marginTop="-15px">OPORTUNIDADES <span style={{ fontWeight: "normal" }}>DE GANAR!</span></Text>
          <Text color="#fff" fontSize={{ base: '14px', md: '17px' }}>Al registrarte estarás participando <br /> del sorteo para el Día de la Madre</Text>
        </Box>
        <Box marginLeft={{ base: '0', md: '50px' }}>
          <img src="https://i.postimg.cc/BZhxsDjV/IMAGEN-SORTEO-MADRE-1.png" alt="Logo" width="90%" maxWidth="500px" height="auto" />
        </Box>
      </Box>
      <Center>
        <Stack spacing={4} padding="20px" >
          <h2 style={{ display: 'flex', justifyContent: 'center', fontSize: '18px', color: '#FF5454', fontWeight: 'bold', marginTop: '17px' }}>Registra tu compra  y participa</h2>
          <p style={{ display: 'flex', justifyContent: 'center', color: 'gray', fontSize: '11px' }}>
            Completa todos los datos solicitados
          </p>

          <form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="first_name">Nombres:</FormLabel>
              <Input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
              <FormHelperText>*Válido solo para mayores de edad y personas naturales.</FormHelperText>
            </FormControl>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="last_name">Apellidos:</FormLabel>
              <Input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="dni">DNI:</FormLabel>
              <Input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="phone">Teléfono:</FormLabel>
              <Input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="pedido_id">ID Pedido:</FormLabel>
              <Input type="text" id="pedido_id" name="pedido_id" value={formData.pedido_id} onChange={handleChange} />
              <FormHelperText>*Codigo de pedido/valido para compras mayores  a S/ 50.00 (cincuenta soles)</FormHelperText>
            </FormControl><br />
            <p style={{ fontWeight: "bold" }}>¡Duplica tu participación!</p>
            <p style={{ fontSize: "10px", color: "gray" }}>
              Sigue a Covende en todas sus redes sociales y obtén doble posibilidad de ganar.<br />
              Mantente al tanto de todas nuestras novedades y no te pierdas la oportunidad<br /> de ganar
              fabulosos premios.
            </p>

            {/* Enlaces a redes sociales en línea */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
              <a href="https://www.facebook.com/CoVende/" target="_blank" style={{ textDecoration: 'none', marginRight: '10px' }}>
                <img src="https://i.postimg.cc/mrNgsMVm/facebook-3.png" alt="facebook" width="30" height="30" />
              </a>

              <a href="https://www.instagram.com/covendeperu/" target="_blank" style={{ textDecoration: 'none', marginRight: '10px' }}>
                <img src="https://i.postimg.cc/ncDpv5gy/instagram.png" alt="instagram" width="30" height="30" />
              </a>

              <a href="https://www.tiktok.com/@covende" target="_blank" style={{ textDecoration: 'none' }}>
                <img src="https://i.postimg.cc/Y21ZxHbB/tik-tok.png" alt="tik tok" width="30" height="30" />
              </a>
            </div>

            {/* <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel  >Marque las redes sociales que sigue en Covende:</FormLabel>
              <CheckboxGroup colorScheme="blue">
                <Stack direction="row">
                  <Checkbox name="social_media.facebook" isChecked={formData.social_media.facebook} onChange={handleChange}>Facebook</Checkbox>
                  <Checkbox name="social_media.instagram" isChecked={formData.social_media.instagram} onChange={handleChange}>Instagram</Checkbox>
                  <Checkbox name="social_media.tiktok" isChecked={formData.social_media.tiktok} onChange={handleChange}>TikTok</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl><br /> */}

            <p style={{ fontWeight: "bold" }}>Registra tus  redes sociales en las que nos sigues:</p>

            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="social_media.facebook">Facebook:</FormLabel>
              <Input type="text" id="social_media.facebook" name="social_media.facebook" value={formData.social_media.facebook} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="social_media.instagram">Instagram:</FormLabel>
              <Input type="text" id="social_media.instagram" name="social_media.instagram" value={formData.social_media.instagram} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired isInvalid={!!errorMessage}>
              <FormLabel htmlFor="social_media.tiktok">Tik Tok:</FormLabel>
              <Input type="text" id="social_media.tiktok" name="social_media.tiktok" value={formData.social_media.tiktok} onChange={handleChange} />
            </FormControl><br />

            <FormControl isRequired isInvalid={!!errorMessage}>
              <Checkbox name="validInformation" isChecked={formData.validInformation} onChange={handleChange}>Valido que toda la información registrada es verídica,<br />
                sujeto a descalificación en caso sea fraudulenta. </Checkbox>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errorMessage} style={{ marginTop: '10px' }} >
              <Checkbox name="termsAndConditions" isChecked={formData.termsAndConditions} onChange={handleChange}> He leído y
                acepto los  <Link
                  to='/terminos-y-condiciones-sorteos'
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>
                  Términos y condiciones
                </Link></Checkbox>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </FormControl>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Enviando"
                style={{ marginTop: "20px", marginBottom: "40px", width: "114px", backgroundColor: "#FF5353", color: "white" }}
              >
                Registrar
              </Button>
            </div>

          </form>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>¡Registrado correctamente!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color="green">Tu registro ha sido completado con éxito.</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={() => setShowModal(false)}>Cerrar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Center>
    </>
  );
}

export default UserRegistrationForm;
