
export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
  transaction: string;
  consolidation: string;
  role: string;
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
