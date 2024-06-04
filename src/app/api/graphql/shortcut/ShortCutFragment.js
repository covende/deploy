export const shortcut = `{
    _id
    redirect
    uri
    params
  }`;

export const SHORT_CUT_ADD = ({
  redirect = '',
  uri = '',
  params = ''
}) => `mutation{
    ShortCutAdd(shortcut:{
      redirect:"${redirect}",
      uri:"${uri}"
      params:"${params}"
    })${shortcut}
  }`;

export const SHORT_CUT_FIND_BY_URI = (uri = '') => `{
    ShortCutFindByUri(uri:"${uri}")${shortcut}
  }`;

export const SHORT_CUT_DELETE = (uri = '') => `mutation{
    ShortCutDelete(uri:"${uri}")${shortcut}
  }`;
