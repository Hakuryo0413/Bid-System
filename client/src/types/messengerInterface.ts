
export interface ConversationInterface {
    members: Array<string>,
    _id?: string;
}

export interface MessagesInterface {
    conversationId?: string,
    sender?: string,
    text?: string
}