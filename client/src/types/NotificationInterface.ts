export interface NotificationInterface {
  _id?: string;
  account?: string;
  content?: string;
  from?: string;
  state?: boolean;
  created_at?: Date;
}
export interface NotificationPayload extends NotificationInterface {
  account: string;
  content: string;
  from: string;
  state: boolean;
  
}
