export const FIND_USER_CHYO = (ruc) => `
{
  findUserCHYO(ruc: "${ruc}", finduserchyo: "2") {
    status
    status_text
    errors
    code
    StatusUser
  }
}
`;
