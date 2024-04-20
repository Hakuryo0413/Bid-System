import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function ConfirmLog({ setOpen }: { setOpen: (value: boolean) => void }) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-dialog bg-opacity-60">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-background p-4 rounded-lg w-1/2">
                    <div className="text-center">
                        <h2 className="text-xl font-bold">Xác nhận</h2>
                        <p className="text-lg">Bạn có chắc chắn muốn hủy đăng ký sim này?</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" 
                        onClick={() => {
                            setOpen(false);
                            toast.success("Hủy đăng ký sim thành công");
                            }}>
                            Confirm
                            </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
function SimWaitingList() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <ToastContainer />
            <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap pt-10">

                <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white"> Sim chờ đấu giá </h2>
            </div>
            <div className="mb-5 text-white text-lg">Danh sách sim đã đăng ký và chờ đấu giá</div>
            <div className="border-2 rounded-2xl border-inherit p-3">
                <table className="min-w-full divide-y divide-gray-200  text-center">
                    <thead className="text-base ">
                        <tr>
                            <th scope="col" className="px-6 py-3   font-medium text-white uppercase tracking-wider">
                                Số sim
                            </th>
                            <th scope="col" className="px-6 py-3   font-medium text-white uppercase tracking-wider">
                                Giá khởi điểm
                            </th>
                            <th scope="col" className="px-6 py-3  font-medium text-white uppercase tracking-wider">
                                Thời gian đấu giá
                            </th>

                            <th scope="col" className="px-6 py-3   font-medium text-white uppercase tracking-wider">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">

                                <div className="text-sm text-gray-900 ">0123456789</div>

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">500.000.000</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">10 ngày</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => setOpen(true)}>Hủy đăng ký</button>

                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 ">0123456789</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">500.000.000</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">10 ngày</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Hủy đăng ký</a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            {open && <ConfirmLog setOpen={setOpen} />}
        </div>

    );
}
export default SimWaitingList;