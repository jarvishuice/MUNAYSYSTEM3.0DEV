export interface FacturaEntity {
    encabezado: EncabezadoFacturaEntity;
    detalle:    DetalleFacturaEntity[];
}

export interface DetalleFacturaEntity {
    idFactura:        number;
    cantidad:         number;
    producto:         string;
    precioUnitariobs: number;
    precioUnitarioD:  number;
    totalBs:          number;
    totalD:           number;
}

export interface EncabezadoFacturaEntity {
    id:          number;
    nFactura:    string;
    ci:          string;
    nombre:      string;
    totalDivisa: number;
    iva:         number;
    ivaBS:       number;
    baseBs:      number;
    baseDivisa:  number;
    fecha:       Date;
    tasa:        number;
    status:      number;
    direcion:    string;
    totalBs:     number;
}
