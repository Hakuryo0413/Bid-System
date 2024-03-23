import { roomModel } from "../frameworks/database/mongoDb/models/roomModel";
import { roomInterface } from "../types/roomInterface";

export class roomEntity{
    private model: roomModel;

    constructor(model : roomModel){
        this.model = model;
    }

    public async getRoomByCode(code: string): Promise<roomInterface | null>{
        const room = this.model.findOne({code: code});
        return room;
    }

    public async createRoom(room: roomInterface): Promise<roomInterface | null>{
        const newRoom = this.model.create(room);
        return newRoom;
    }

    public async getAllRoom():Promise<roomInterface[] | null>{
        const allRooms = this.model.find();
        return allRooms;
    }

    public async updateRoom(
        id: string,
        updates: Partial<roomInterface>
      ): Promise<roomInterface | null> {
        const currentDetails = await this.model.findById(id);
        
        if (currentDetails) {
          Object.assign(currentDetails, updates);
          const updatedRoom = await currentDetails.save();
          return updatedRoom;
        }
    
        return null; 
      }


}