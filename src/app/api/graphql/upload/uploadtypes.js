import { gql } from 'graphql-request';

const modelo = `status
                message
                data
                `;

export const UPLOAD_FILE = gql`
    mutation uploadFile(
        $file: String!
        $type: String!
        $mimetype: String!
        $name: String
    ){
        uploadFile(
            file: $file
            type: $type
            mimetype: $mimetype
            name: $name
        ){
            ${modelo}
        }
    }
`;

export const UPLOAD_FILE_PRODUCT = gql`
    mutation uploadFile(
        $file: String!
        $type: String!
        $mimetype: String!
        $origin: String
    ){
        uploadFile(
            file: $file
            type: $type
            mimetype: $mimetype
            origin: $origin
        ){
            ${modelo}
        }
    }
`;
