import { CardsMethodPayTodayEspacios } from "./cardsMethodPayTodayEspacios";
import { GraficoBarraPayEspacios } from "./graficoBarraPayEspacios";
import { OrdenesToday } from "./graficoOrdenesToday";
import { ProductosVendidosEspacios } from "./graficoVentasProductosEspacios";

import { TablaOrdenesEspacios } from "./tablasOrdenesEspacios";

export function DashboardEspacios() {
  return (
    <div>
      <CardsMethodPayTodayEspacios />
      <TablaOrdenesEspacios />
      <div className="dashboard">
        <GraficoBarraPayEspacios />
        <OrdenesToday />
        <ProductosVendidosEspacios />
        |
      </div>
    </div>
  );
}
