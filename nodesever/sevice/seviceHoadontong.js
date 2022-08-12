const modelHoaDon = require('../model/modelHoaDon');
var bcrypt = require('bcrypt');
const async = require('hbs/lib/async');
exports.addhoadon = async (tinhTrang,ngayMuahang,giaTien,NguoiMua) => {
    const hoadon = modelHoaDon.create({
        tinhTrang:tinhTrang,
        ngayMuahang:ngayMuahang,
        giaTien: giaTien,
        NguoiMua:NguoiMua
    });
    return hoadon;
}