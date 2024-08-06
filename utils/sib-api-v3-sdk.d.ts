declare module 'sib-api-v3-sdk' {
    export class TransactionalEmailsApi {
      sendTransacEmail(sendSmtpEmail: any): Promise<any>;
    }
    export class ApiClient {
      static instance: {
        authentications: {
          'api-key': {
            apiKey: string;
          };
        };
      };
    }
  }
  