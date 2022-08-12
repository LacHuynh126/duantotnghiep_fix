const modelHoaDon = require('../model/modelHoaDonChiTiet');
var bcrypt = require('bcrypt');
const async = require('hbs/lib/async');
exports.addhoadon = async (tinhTrang,ngayMuahang,ngayLaphoadon,tenXe,hinhXe,suDung,giaTien,soLuong,trangThai,idxe) => {
    const hoadon = modelHoaDon.create({
        tinhTrang:tinhTrang,
        ngayMuahang:ngayMuahang,
        ngayLaphoadon:ngayLaphoadon,
        tenXe:tenXe,
        hinhXe:hinhXe,
        suDung:suDung,
        giaTien: giaTien,
        soLuong:soLuong,
        trangThai:trangThai,
        id_Xe:idxe
    });
    return hoadon;
}
exports.gethoaDon = async () => {
    return await modelHoaDon.find();
}
exports.deleteHoadon = async (id) =>{
    return await modelHoaDon.findOneAndDelete(id);
}
exports.updateHoadon = async (id,trangThai) => {
    return await modelHoaDon.updateOne({
        _id:id
    },
    {
        trangThai:trangThai
    },
    {
        upsert:true
    }
    )
}
exports.getIdhoadon = async (username) => {
    const hoadon = await modelHoaDon.find(
        {suDung:username}
    );
    return hoadon;
}
exports.historyHoadon = async () => {
    const hoadon = await modelHoaDon.find(
        {trangThai:"Đã Thanh Toán"}
    ).sort({ngayMuahang:-1});
    return hoadon;
}