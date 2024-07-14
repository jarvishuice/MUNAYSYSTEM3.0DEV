import { EncabezadoFacturaEntity, FacturaEntity } from "../../Entities/facturas/FacturasEntity";

export abstract class IFacturas{

    abstract getAllFacturas(sede:string):Promise<FacturaEntity[]|[]>;
    abstract updateFactura(sede:string,encabezado:EncabezadoFacturaEntity):Promise<boolean>;


}