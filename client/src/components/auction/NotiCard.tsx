import { NotificationInterface } from "../../types/NotificationInterface";
import { Link } from "react-router-dom"; // Đảm bảo bạn import Link từ react-router-dom

const NotiCard = ({ noti, onDelete }: { noti: NotificationInterface; onDelete: (id: string) => void; }) => {
  const { _id, from, content, created_at, type } = noti;
  const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

  const handleDelete = () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông báo này?");
    if (confirmDelete) {
      onDelete(_id || "");
    }
  };

  const goToLink = () => {
    switch (type) {
      case "duyetProvider":
        return "/admin/providerList";
      case "yeuCauXoa":
        return "/admin/auctionlist";
      case "yeuCauDuyet":
        return "/admin/auctionlist";
      default:
        return "/";
    }
  };

  return (
    <div className="card">
      <div className="badge">
        <div>
          <span>From: {from}</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 mt-4 mr-4 text-[#506b94]">
        <span>Time: {formattedCreatedAt}</span>
        <button onClick={handleDelete} className="ml-2 text-red-600">Delete</button>
        {type && (
          <Link to={goToLink()}>
            <button className="ml-2 mt-2 text-blue-600">Go to</button>
          </Link>
        )}
      </div>

      <div className="p-4 pt-10 mt-5">
        {content}
      </div>
    </div>
  );
};

export default NotiCard;

// import { NotificationInterface } from "../../types/NotificationInterface"
// import deleteNotification from "../../features/axios/api/notification/DeleteNotification";

// const NotiCard = ({
//     noti
// }: {
//     noti: NotificationInterface;
// }) => {

//     const { _id, from, content, created_at } = noti;
//     const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";

//     const handleDelete = async () => {
//         if (!_id) {
//             console.error("Error deleting notification: _id is undefined");
//             return; // Nếu _id là undefined, không thực hiện hành động xóa và kết thúc hàm
//         }

//         try {
//             // Gọi API hoặc hàm xóa thông báo từ đây
//             await deleteNotification(_id); // Gọi hàm xóa thông báo với _id của thông báo
//             console.log("Notification deleted successfully");
//             // Thực hiện bất kỳ xử lý nào sau khi xóa thông báo thành công
//         } catch (error) {
//             console.error("Error deleting notification:", error);
//         }
//     };

//     return (

//         <div className="card">
//             <div className="badge">
//                 <div>
//                     <span>From: {from}</span>
//                 </div>
//             </div>

//             <div className = "absolute top-0 right-0 mt-4 mr-4 text-[#506b94]">
//                     <span>Time: {formattedCreatedAt}</span>
//                     <button onClick={handleDelete} className="ml-2 text-red-600">Delete</button>
//             </div>

//             <div className="p-4 pt-10 mt-5">
//                 {content}
//             </div>
//         </div>

//     )
// }

// export default NotiCard;