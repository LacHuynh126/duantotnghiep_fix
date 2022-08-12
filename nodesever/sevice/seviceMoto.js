const async = require('hbs/lib/async');
const modelMoto = require('../model/modelMoto');

exports.addMoto = async (tenXe,giaXe,hinhXe,hinhXe1,hinhXe2,hinhXe3,hinhXe4,hinhXe5,hinhXe6
    ,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan) => {
    const addMoto = await modelMoto.create({
        tenXe: tenXe,
        giaXe: giaXe,
        hinhXe:hinhXe,
        hinhSilder:[
            hinhXe,
            hinhXe1,
            hinhXe2,
            hinhXe3,
            hinhXe4,
            hinhXe5,
            hinhXe6
        ],
        namSanxuat:namSanxuat,
        namSudung:namSudung,
        tinhTrang:tinhTrang,
        loaiHinhban:loaiHinhban,
        phanKhoi:phanKhoi,
        mauSac:mauSac,
        ngayKiemdinh:ngayKiemdinh,
        soKm:soKm,
        ngayBan:ngayBan,
        luotLike:0,
        hangXe:hangXe,
        loaiXe:loaiXe,
        nguoiBan:nguoiBan,
        nguoiMua:""
    });
    return addMoto;
}
exports.editMoto = async (id,tenXe,giaXe,hinhXe,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,nguoiBan) => {
    const editMoto = await modelMoto.updateOne(
        {_id:id},
        {
        tenXe: tenXe,
        giaXe: giaXe,
        hinhXe:hinhXe,
        namSanxuat:namSanxuat,
        namSudung:namSudung,
        tinhTrang:tinhTrang,
        loaiHinhban:loaiHinhban,
        phanKhoi:phanKhoi,
        mauSac:mauSac,
        ngayKiemdinh:ngayKiemdinh,
        soKm:soKm,
        ngayBan:ngayBan,
        luotLike:0,
        hangXe:hangXe,
        loaiXe:loaiXe,
        nguoiBan:nguoiBan,
        nguoiMua:""
    },{
        upsert:true
    }
    );
    return editMoto;
}
exports.getMoto = async () => {
    return await modelMoto.find();
} 
exports.findMoto = async (id) => {
    return await modelMoto.find({_id:id});
}
exports.deleteMoto = async(id)=>{
    return await modelMoto.findOneAndDelete(id);
}
exports.updapteNguoimua = async (id,nguoiMua) => {
    const updateMua = await modelMoto.updateOne(
        {_id:id},
        {
            nguoiMua:nguoiMua
        },{
            upsert:true
        }
    )
}
exports.listMoto = async () => {
    return await modelMoto.find({nguoiMua:""}).limit(20);
}
exports.historyMoto = async () => {
    return await modelMoto.find({nguoiMua:{$exists:true}}).limit(5).sort({});
}
exports.hangXehonda = async () => {
    const honda = await modelMoto.find({hangXe:"Honda",nguoiMua:""}).limit(5);
    return honda;
}
