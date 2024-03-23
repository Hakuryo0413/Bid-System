export interface RoomInterface {
    _id?: string,
    code?: string,
    participants?: ParticipantInterface[],
    start_at?: Date,
    time_limit?: number,
    phone?: string,
    password?: string,
}

export interface ParticipantInterface {
    _id?: string,
    name: string,
    email: string,
    phone: string,
    highest_price: number,
    status: string,

}