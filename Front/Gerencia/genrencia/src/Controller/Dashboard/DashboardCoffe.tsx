import { CardsMethodPayToday } from "./cardsMethodPayToday";
import { GraficoBarraPayCoffe } from "./graficoBarraPayCoffe";
import { OrdenesTodayCoffe } from "./graficoOrdenesTodayCoffe";
import { ProductosVendidosCoffeshop } from "./graficoVentasProductosCoffeshop";
import { TablaOrdenesCoffe } from "./tablasOrdenesCoffe";

export function DashboardCoffe() {
  return (
    <div>
      <CardsMethodPayToday />
      <TablaOrdenesCoffe />
      <div className="dashboard">
      <GraficoBarraPayCoffe />
        <OrdenesTodayCoffe />
        <ProductosVendidosCoffeshop />
        |
      </div>
    </div>
  );
}
