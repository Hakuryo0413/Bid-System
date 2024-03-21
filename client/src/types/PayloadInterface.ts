
export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  email: string;
  confirmPassword: string;
  consolidation: string;
  role: string;
  address: string;
  representerName: string;
  pos: string;
}


export interface StatisticsOrdersPayload {
code: string,
address: string,
senderAddress: string,
receiverAddress: string,
status: string,
created_at: Date,
sended_at: Date,
transaction: string,
consolidation: string
}
