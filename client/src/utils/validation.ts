import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Yêu cầu nhập họ và tên.")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "Vui lòng nhập tên hợp lệ!"
    ),
  email: yup
    .string()
    .required("Yêu cầu nhập email.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Địa chỉ email không hợp lệ!"),
  address: yup
    .string()
    .required("Yêu cầu nhập địa chỉ.")
    .matches(
      /^[a-zA-Z0-9._ ]+$/,
      "Địa chỉ chứa các ký tự a-z, A-Z, 0-9, '.' và '_', không có _ or . ở đầu!"
    ),
  phone: yup
    .string()
    .required("Yêu cầu nhập số điện thoại.")
    .matches(/^\d{10}$/, "Hãy nhập số điện thoại hợp lệ!"),
  password: yup
    .string()
    .required("Yêu cầu nhập mật khẩu.")
    .min(6, "Mật khẩu có ít nhất 6 ký tự!"),
  confirmPassword: yup
    .string()
    .required("Yêu cầu nhập lại mật khẩu.")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp!"),
  representerName: yup.string().nullable(),

  pos: yup.string().nullable(),
});

export const userLoginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Yêu cầu nhập tên đăng nhập.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Địa chỉ email không hợp lệ!"),

  password: yup
    .string()
    .required("Yêu cầu nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
});

export const orderValidationSchema = yup.object().shape({
  senderName: yup.string().required("Vui lòng nhập tên người gửi."),

  senderCountry: yup.string().required("Vui lòng chọn đất nước."),

  senderCity: yup.string().required("Vui lòng chọn tỉnh/thành phố."),

  senderDistrict: yup.string().required("Vui lòng chọn quận/huyện."),

  senderVillage: yup.string().required("Vui lòng chọn xã/phường/thị trấn."),

  senderHouseNumber: yup.string().required("Vui lòng nhập số nhà/xóm/thôn."),

  senderPhone: yup.string().required("Vui lòng nhập số điện thoại."),

  receiverName: yup.string().required("Vui lòng nhập tên người nhận."),

  receiverCountry: yup.string().required("Vui lòng chọn đất nước."),

  receiverCity: yup.string().required("Vui lòng chọn tỉnh/thành phố."),

  receiverDistrict: yup.string().required("Vui lòng chọn quận/huyện."),

  receiverVillage: yup.string().required("Vui lòng chọn xã/phường/thị trấn."),

  receiverHouseNumber: yup.string().required("Vui lòng nhập số nhà/xóm/thôn."),

  receiverPhone: yup.string().required("Vui lòng nhập số điện thoại."),

  type: yup.boolean().required("Vui lòng chọn loại hàng gửi"),

  cannotDelivered: yup
    .string()
    .required("Vui lòng chọn hướng dẫn khi người gửi không nhận hàng."),

  items: yup.array().required("Có ít nhất một tên mặt hàng gửi!"),

  weight: yup.number().required("Vui lòng nhập tổng khối lượng"),
});
