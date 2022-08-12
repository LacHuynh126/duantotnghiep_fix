const async = require('hbs/lib/async');
const seviceHoadon = require('../sevice/seviceHoadontong');
exports.hoaDon = async (tinhTrang,ngayMuahang,giaTien,NguoiMua) => {
    const hoadon = seviceHoadon.addhoadon(tinhTrang,ngayMuahang,giaTien,NguoiMua);
    return hoadon;
}