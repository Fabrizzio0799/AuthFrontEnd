export const titleDictionayr = {
    OC : 'Ordenes de compra',
    FRC : 'Facturas de reserva de compra',
    OV: 'Ordenes de venta',
    FRV: 'Factura de reserva venta',
    STO: 'Solicitud de traslado Entrega',
    STP: '',
    STD: 'Solicitud de traslado Recepcion',
    STPP: 'Solicitud intermedia Pendiente',
    RVENTA: 'Reporte diario módulo venta',
    RCOMPRA: 'Reporte diario módulo compra'
};

export const endPointsRepor = {
    RVENTA: '/report/salesmodule',
    RCOMPRA: '/report/purchasemodule'
}

//const port = 2076//test publico
const port = 8002//test local

//export const url = `http://72.55.134.112:${port}/api/v1`//test publica
export const url = `http://localhost:${port}/api/v1`//test interna
//export const url = `http://172.1.1.150:${port}/api/v1`//test local

const portAuth = 3001
export const urlAuthApi = `http://localhost:${portAuth}/api/v1`

export const  PathDocs = ['OC','FRC','OV','FRV','STO','STD'];