export default function HappeningAuction() {
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
                Thời gian còn lại:
            </p>
            <p className="text-white mb-2">
                Số người tham gia:
            </p>
        </div>
        
        

        <div className="border-2 border-white mb-2"></div>

        <div className="grid lg:grid-cols-2">
            <p className="text-white mb-2 lg:mb-0">
                Giá cao nhất:
            </p>
            
            <div className="flex lg:justify-end">
                <button
                type="submit"
                className="text-white p-2 w-full lg:w-[50] items-center bg-background rounded-lg hover:bg-background hover:bg-opacity-50"
                >
                <a href="/auction/details">Tham gia đấu giá</a>
                </button>
            </div>
            

        </div>
      </div>
  );
}