import { ParticipantInterface } from "../../../types/RoomInterface";

export async function successBidder(
    participants: ParticipantInterface[]
  ): Promise<{ successbidder: ParticipantInterface [] }> {

    if (participants.length == 0) {

    }
    participants.sort((a, b) => b.highest_price - a.highest_price);

    return {successbidder: participants};
};