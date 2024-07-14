export interface MetricCoffeshopEntity {
    ventasDiarias: number;
    ventasMensual: number;
    deudas:        number;
}

export interface VentasProductosEntity {
    nombre:   string;
    cantidad: number;
    total:    number;
}
export interface  PagosMetrictEntity{
    resumen:  FormaPagoEntity;
    detalles: DetallesPagos[];
}

export interface DetallesPagos {
    cliente:    string;
    monto:      number;
    cotizacion: number;
    motivo:     string;
    referencia: string;
    fecha:      Date;
    hora:       string;
    banco:      string;
    metodo:     string;
}

export interface FormaPagoEntity {
    pagoMovil: number;
    Punto:     number;
    divisa:    number;
    wallet:    number;
    zelle:     number;
    efectivoBS: number;
    total:     number;
}
