const async = require('hbs/lib/async');
const seviceMoto = require('../sevice/seviceMoto');

exports.addMoto = async (tenXe,giaXe,hinhXe,hinhXe1,hinhXe2,hinhXe3,hinhXe4,hinhXe5,hinhXe6,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan) => {
    const moto = seviceMoto.addMoto(tenXe,giaXe,hinhXe,hinhXe1,hinhXe2,hinhXe3,hinhXe4,hinhXe5,hinhXe6,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
        mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan)
    return moto;
}
exports.editMoto = async (id,tenXe,giaXe,hinhXe,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan) => {
    const moto = seviceMoto.editMoto(id,tenXe,giaXe,hinhXe,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
        mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan)
    return moto;
}


exports.getMoto = async () => {
    return await seviceMoto.getMoto();
} 
exports.findMoto = async (id) => {
    return await seviceMoto.findMoto(id);
}
exports.deleteMoto = async(id)=>{
    return await seviceMoto.deleteMoto(id);
}
exports.updatMoto = async(id,nguoiMua)=> {
    return await seviceMoto.updapteNguoimua(id,nguoiMua);
}
exports.listMoto = async () => {
    return await seviceMoto.listMoto();
}
exports.historyMoto = async () => {
    return await seviceMoto.historyMoto();
}
exports.hangXehonda = async () => {
    const honda = await seviceMoto.hangXehonda();
    return honda;
}