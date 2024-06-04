export const initialdevolucion = {
  idpedido: '',
  iddevolucion: '',
  custom_id: '',
  informacion: {
    registred_date: new Date(),
    guia_pdf: '',
    status: '',
    methods: '',
    reason: '',
    details: '',
    photos: []
  },
  estado: {
    status: '',
    request_status: '',
    statuses: [],
    idtracking: ''
  },
  producto: {
    name: '',
    store: '',
    price: '',
    invoce: '',
    send_to: '',
    note_pdf: ''
  },
  comprador: {
    name: '',
    phone: '',
    email: ''
  },
  confirm_shipment_product: false,
  satisfied_product: false
};
