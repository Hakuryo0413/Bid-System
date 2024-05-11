import { NotificationInterface } from "../../types/NotificationInterface";
import { Link } from "react-router-dom"; // Đảm bảo bạn import Link từ react-router-dom
import { updateNotification } from "../../features/axios/api/notification/UpdateNotification";

const NotiCard = ({ noti, onDelete, reLoad, currentState }: { noti: NotificationInterface; onDelete: (id: string) => void; reLoad: () => void; currentState: Boolean }) => {
  const { _id, from, content, created_at, type } = noti;

  const formatCreatedAt = (dateString: string) => {
    //const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
    // return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // const formattedCreatedAt = created_at ? created_at.toLocaleString() : "";
  const formattedCreatedAt = created_at ? formatCreatedAt(created_at.toLocaleString()) : "";
  

  const handleDelete = () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông báo này?");
    if (confirmDelete) {
      onDelete(_id || "");
    }
  };

  const handleChangeState = async () => {
    if (noti) {
      noti.state = !noti.state;
      updateNotification(noti);
      reLoad();
    }
  }
  const goToLink = () => {
    switch (type) {
      case "duyetProvider":
        return "/admin/providerList";
      case "yeuCauXoa":
        return "/admin/auctionlist";
      case "yeuCauDuyet":
        return "/admin/auctionlist";
      case "traTien":
        return "auction/history";
      default:
        return "/";
    }
  };

  return (
    <div className="card relative">
      <span className="ml-2 mr-2 mt-4 p-2 bg-gradient-to-r from-[#00d289] to-[#00cdb4] rounded-md ">From: {from}</span>
      <button onClick={handleDelete} className="bg-gradient-to-r from-[#e45757] to-[#f01212] rounded-md mt-4 p-1 text-gray-50
              hover:shadow-md hover:shadow-[#d5b7b7]">Delete</button>

      {type && (
        <Link to={goToLink()}>
          <button className="bg-gradient-to-r from-[#5d77be] to-[#7c50c9] rounded-md mt-4 p-1 ml-2  hover:shadow-md hover:shadow-[#d5b7b7]">Go to</button>
        </Link>
      )}
      {currentState == false ? (
        <button onClick={() => handleChangeState()} className="bg-gradient-to-r from-[#5d77be] to-[#7c50c9] rounded-md mt-4 p-1 ml-2  hover:shadow-md hover:shadow-[#d5b7b7]">Đánh dấu là đã đọc</button>
      ) : (
        <button onClick={() => handleChangeState()} className="bg-gradient-to-r from-[#5d77be] to-[#7c50c9] rounded-md mt-4 p-1 ml-2  hover:shadow-md hover:shadow-[#d5b7b7]">Đánh dấu là chưa đọc</button>
      )
      }

      {/* <div className="flex justify-start items-start">
        <span className="mr-4 bg-gradient-to-r from-[#00d289] to-[#00cdb4] rounded-md absolute top-2 left-2 p-2">{from}</span>
        {type && (
          <Link to={goToLink()}>
            <button className="bg-gradient-to-r from-[#5d77be] to-[#7c50c9] rounded-md absolute top-2 left-2 p-2">Go to</button>
          </Link>
        )}
        <button onClick={handleDelete} className="bg-gradient-to-r from-[#5d77be] to-[#7c50c9] rounded-md absolute top-2 left-2 p-2">Delete</button>
      </div> */}
      {/* <div className="badge">
        <div>
          <span>From: {from}</span>
        </div>

        <button onClick={handleDelete} className="ml-2 text-red-600">Delete</button>
        {type && (
          <Link to={goToLink()}>
            <button className="goto">Go to</button>
          </Link>
        )}

      </div> */}

      <div className="absolute top-0 right-0 mt-4 mr-4 text-[#506b94]">
        <span>Time: {formattedCreatedAt}</span>
        {/* <button onClick={handleDelete} className="ml-2 text-red-600">Delete</button>
        {type && (
          <Link to={goToLink()}>
            <button className="ml-2 mt-2 text-blue-600">Go to</button>
          </Link>
        )} */}
      </div>

      <div className="p-2 mt-1">
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