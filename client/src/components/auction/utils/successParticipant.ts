import { ParticipantInterface } from "../../../types/RoomInterface";

export async function successBidder(
    participants: ParticipantInterface[]
  ): Promise<{ successbidder: ParticipantInterface }> {

    if (participants.length == 0) {

    }
    let successBidder = participants[0]
    let highest_price = participants[0].highest_price

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].highest_price > highest_price) {
            successBidder = participants[i]
            highest_price = participants[i].highest_price
        }
      } 

    return {successbidder: successBidder};
};