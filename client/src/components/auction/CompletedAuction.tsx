export default function CompletedAuction() {
    return (
    <div className="border-white border-2 py-4 px-8  rounded-lg bg-white bg-opacity-10 mb-4 mx-[5%]">
        <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2">
                Số điện thoại:
            </p>
            <p className="text-white mb-2">
                Tên nhà mạng:
            </p>
        </div>

        <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2">
                Thời gian đấu giá:
            </p>
            <p className="text-white mb-2">
                Số người tham gia:
            </p>
        </div>
        
        

        <div className="border-2 border-white mb-2"></div>

        <div className="grid lg:grid-cols-2">
        <p className="text-white my-2 lg:my-0">
            Người đấu giá thành công: 
        </p>
        <p className="text-white">
            Giá cao nhất:
        </p>
            

        </div>
      </div>
  );
}