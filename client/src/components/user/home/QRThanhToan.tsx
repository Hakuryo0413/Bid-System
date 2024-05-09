// create QR code for payment

function QRThanhToan() {
    return (
        <div>
            <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap pt-10">

                <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white"> Mã QR </h2>
            </div>
            <img
            src={require("../../../assets/images/linkQR.jpg")}
            // 50% size of image
            width="50%"
            alt="QR code"
            // place it center
            style={{ display: "block", margin: "auto" }}
          />
        </div>
    );

}
export default QRThanhToan;