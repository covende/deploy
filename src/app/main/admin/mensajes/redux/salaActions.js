export const UPDATE_SALA = 'UPDATE_SALA';
export const UPDATE_READ = 'UPDATE_READ';
export const UPDATE_SATATUS_SALA = 'UPDATE_SATATUS_SALA';

export const updateSala = (sala) => ({
  type: UPDATE_SALA,
  payload: sala
});

export const updateRead = (read) => ({
  type: UPDATE_READ,
  payload: read
});

export const updateStatusSala = (status) => ({
  type: UPDATE_SATATUS_SALA,
  payload: status
});
