const tstate = {
  bannerOffers: []
};

function BannerReducer(state = tstate, { type, data }) {
  switch (type) {
    case 'BANNER':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default BannerReducer;
