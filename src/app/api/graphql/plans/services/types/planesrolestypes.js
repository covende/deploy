import WMRoles from '../../../webmodel/WMRoles';

const { gql } = require('graphql-request');
export const PLAN_ROLES = gql`
    query roles($platformID: String!){
        roles(platformID:$platformID){
            ${WMRoles}
        }
    }`;
