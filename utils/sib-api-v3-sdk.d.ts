declare module 'sib-api-v3-sdk' {
  export class TransactionalEmailsApi {
    static apiKey(apiKey: any, apiKey1: string) {
        throw new Error('Method not implemented.');
    }
    setApiKey(apiKey: any, apiKey1: string) {
        throw new Error('Method not implemented.');
    }
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
