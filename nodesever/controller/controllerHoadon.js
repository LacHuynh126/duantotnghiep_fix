const async = require('hbs/lib/async');
const seviceHoadon = require('../sevice/seviceHoadon');
exports.hoaDon = async (tinhTrang,ngayMuahang,ngayLaphoadon,tenXe,hinhXe,suDung,giaTien,soLuong,trangThai,idXe) => {
    const hoadon = seviceHoadon.addhoadon(tinhTrang,ngayMuahang,ngayLaphoadon,tenXe,hinhXe,suDung,giaTien,soLuong,trangThai,idXe);
    return hoadon;
}
exports.gethoaDon = async () => {
    return await seviceHoadon.gethoaDon();
}
exports.deleteHoadon = async (id) =>{
    return await seviceHoadon.deleteHoadon(id);
}
exports.updateHoadon = async (id,trangThai) => {
    return await seviceHoadon.updateHoadon(id,trangThai);
}
exports.getIdhoadon = async (username) => {
    return await seviceHoadon.getIdhoadon(username);
}
exports.historyHoadon = async () => {
    return await seviceHoadon.historyHoadon();
}