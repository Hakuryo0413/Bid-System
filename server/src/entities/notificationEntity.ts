import { notificationModel } from "../frameworks/database/mongoDb/models/notificationModel";
import { notificationInterface } from "../types/notificationInterface";

export class notificationEntity{
    private model: notificationModel;
    constructor(model: notificationModel){
        this.model = model;
    }

    public async getNotificationByAccount(email: string):Promise<notificationInterface[] | null>{
        const notifications:any = this.model.find({account: email});
        return notifications;
    }

    public async createNotification(notification: notificationInterface): Promise<notificationInterface | null>{
        const newNotification: any = this.model.create(notification);
        return newNotification;
    }

    public async updateNotification(
        id: string,
        updates: Partial<notificationInterface>
      ): Promise<notificationInterface | null> {
        const currentDetails = await this.model.findById(id);
        
        if (currentDetails) {
          Object.assign(currentDetails, updates);
          const updatedNotification: any = await currentDetails.save();
          return updatedNotification;
        }
    
        return null; 
    }

    public async deleteNotification(id: string):Promise<void>{
        const notification = await this.model.findById(id);
        if (!notification) throw new Error("notification not found");
        await this.model.findByIdAndDelete(id);
    }
}