import React, {useState, useEffect} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useToast
} from '@chakra-ui/react'
import * as User from '@/app/helpers/authUtils';
import { CVButton, CVInput, CVSelect } from '@CVTemplate/core/index'
import { Typography } from '@material-ui/core'
import { COLORS } from '@CVTemplate/core/CVThemes'
import { SAVE_CREDIT_CARD, TYPES_CARDS, UPDATE_CREDIT_CARD } from '@CVApi/core/webpublic/userData/UserService'
import AxiosGQL from '@/app/api/rest/AxiosGQL'
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';


function ModalEditCard({isOpen, onClose, isNewCard, card, setCard, setUpdate, update}) {
  let us = User.getLoggedInUser()
  const [cardsAvailable, setCardsAvailable] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(false)
  const addToast = useToast()

  const getCards = async() => {
   const cards = await AxiosGQL(TYPES_CARDS())
   setCardsAvailable(cards.typesCards)
  }
  useEffect(() => {
    getCards()
  }, [])

  const saveCard = (createCard) => {
    setLoading(true);
    AxiosGQL(SAVE_CREDIT_CARD(createCard))
      .then((res) => {
        setLoading(false);
        onClose();
        setCard({
          user_id: us.user_id,
          type_card_id: '',
          number_card: '',
          number_card: '',
          expiration_date: ''
        });
        setUpdate(!update);
        if (res.saveCreditCard?._id) {
          CVAlertSuccess({
            addToast,
            message: 'Tarjeta añadida Correctamente'
          });
        } else {
          CVAlertError({ addToast, message: 'Error al crear la tarjeta' });
        }
      })
      .catch(
        (err) =>
          err &&
          CVAlertError({
            addToast,
            message: 'Estamos teniendo problemas con el servidor'
          })
      );
  };

  const updateCard = (dataToUpdate) => {
    setLoading(true)
   AxiosGQL(UPDATE_CREDIT_CARD(dataToUpdate))
    .then(res => {
      setLoading(false)
      onClose();
      setUpdate(!update)
      setCard({user_id: us.user_id, type_card_id: '',number_card: '',number_card: '',expiration_date: ''})
      if (res.updateCreditCard?._id) {
        CVAlertSuccess({ addToast, message: 'Tarjeta actualizada Correctamente' });
      } else {
        CVAlertError({ addToast, message: 'Error al actualizar la tarjeta' });
      }
    })
    .catch(err => err && CVAlertError({ addToast, message: 'Estamos teniendo problemas con el servidor' }))
  }

  useEffect(() => {
    if (
      card.type_card_id === '' ||
      card.name_owner === '' ||
      card.number_card === '' ||
      card.expiration_date === ''
    ) setErrors(true) 
    else setErrors(false)
  }, [card.type_card_id, card.name_owner, card.number_card, card.expiration_date])
  
  // console.log({card})
  // console.log({errors})
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {onClose() ; setCard({user_id: us.user_id, type_card_id: '',number_card: '',number_card: '',expiration_date: ''})}} size='xl' >
        <ModalOverlay />
        <ModalContent maxWidth='652px' borderRadius='14px'>
          <ModalHeader color='#FF5454'>{isNewCard ? 'Añadir una Tarjeta' : 'Actualizar su Tarjeta'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop='34px'>
            <Box display='flex' w='100%' justifyContent='space-around'>
              <Box >
                <Typography style={{ color: COLORS.blue }}>Tipo de Tarjeta:</Typography>
                <CVSelect
                  value={card.type_card_id || ''}
                  width='279px'
                  error={errors && card.type_card_id  === ''}
                  onChange={(e) => setCard({...card, type_card_id: e})}
                  options={(cardsAvailable || []).map((item) => ({
                    text: item.title,
                    value: item._id
                  }))}
                />
              </Box>
              <Box>
                <Typography style={{ color: COLORS.blue }}>Nombre del titular:</Typography>
                <CVInput
                  value={card.name_owner || ''}
                  onChange={(e) => setCard({...card, name_owner: e})}
                  error={errors && card.name_owner == ''}
                  width='279px'
                  placeholder='Rosa María Palacios Rojas'
                />
              </Box>
            </Box>
            <Box display='flex' w='100%' justifyContent='space-around' marginTop='15px'>
              <Box>
                <Typography style={{ color: COLORS.blue }}>Número de tarjeta:</Typography>
                <CVInput
                  name='number_card'
                  maxLength={16}
                  value={card.number_card || ''}
                  onChange={(e) => setCard({...card, number_card: e})}
                  error={errors && card.number_card == ''}
                  width='279px'
                  placeholder='0-023-8478922001.'
                  />
              </Box>
              <Box>
                <Typography style={{ color: COLORS.blue }}>Fecha de vencimiento</Typography>
                <CVInput
                  name='expiration_date'
                  maxLength={5}
                  value={card.expiration_date || ''}
                  onChange={(e) => setCard({...card, expiration_date: e})}
                  error={errors && card.expiration_date == ''}
                  width='279px'
                  placeholder='00 - 00'
                />
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
          <CVButton
            backgroundColor='red'
            isLoading={loading}
            disabled={errors}
            onClick={() => (isNewCard ? saveCard(card) : updateCard(card))}
            >
            {isNewCard ? 'GUARDAR' : 'ACTUALIZAR'}
          </CVButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalEditCard