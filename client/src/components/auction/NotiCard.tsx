import { NotificationInterface } from "../../types/NotificationInterface"

const NotiCard = ({
    noti
}: {
    noti: NotificationInterface;
}) => {

    const { from, content, created_at } = noti;
    const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

    return (

        <div className="card">
            <div className="badge">
                <div>From: {from}</div>
                <div>Time: {formattedCreatedAt}</div>
                
            </div>

            <div className="p-4">
                {content}
            </div>
        </div>

    )
}

export default NotiCard;