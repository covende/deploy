//import esES from 'rsuite/locales/es_ES';

const Calendar = {
  sunday: 'Dom',
  monday: 'Lun',
  tuesday: 'Mar',
  wednesday: 'Mie',
  thursday: 'Jue',
  friday: 'Vie',
  saturday: 'Sab',
  ok: 'Aceptar',
  today: 'Hoy',
  yesterday: 'Ayer',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  formattedMonthPattern: 'MM/YYYY',
  formattedDayPattern: 'DD/MM/YYYY'
  //dateLocale: esES
};

export const RSUITELocale = {
  common: {
    loading: 'Cargando...',
    emptyMessage: 'No encontrado'
  },
  Plaintext: {
    unfilled: 'Unfilled',
    notSelected: 'No Seleccionado',
    notUploaded: 'No Cargado'
  },
  Pagination: {
    more: 'Mas',
    prev: 'Anterior',
    next: 'Siguiente',
    first: 'Primero',
    last: 'Último',
    limit: '{0} / página',
    total: 'Total Filas: {0}',
    skip: 'Ir a {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Últimos 7 dias'
  },
  Picker: {
    noResultsText: 'Resultados no encontrados',
    placeholder: 'Seleccionar',
    searchPlaceholder: 'Buscar',
    checkAll: 'Todos'
  },
  InputPicker: {
    newItem: 'Nuevo',
    createOption: 'Crear Opción "{0}"'
  },
  Uploader: {
    inited: 'Inicial',
    progress: 'Cargando',
    error: 'Error',
    complete: 'Terminado',
    emptyFile: 'Vacio',
    upload: 'Cargar'
  },
  CloseButton: {
    closeLabel: 'Cerrar'
  },
  Breadcrumb: {
    expandText: 'Mostrar enlace'
  },
  Toggle: {
    on: 'Abrir',
    off: 'Cerrar'
  }
};
