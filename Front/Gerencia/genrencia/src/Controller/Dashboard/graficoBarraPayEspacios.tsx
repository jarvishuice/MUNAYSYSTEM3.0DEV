import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PagosMetrictEntity } from '../../core/Entities/metric/coffeshop/MetricCoffeshopEntity';
import { MetricEspaciosDAO } from '../../core/Implements/metric/espacios/MetricEspaciosDAO';

export function GraficoBarraPayEspacios() {

  const [punto, setPunto] = React.useState(0);
  const [divisa, setDivisa] = React.useState(0);
  const [bse, setBse] = React.useState(0);
  const [ptp, setPtp] = React.useState(0);
  const [wallet, setWallet] = React.useState(0);
  const [zelle, setZelle] = React.useState(0);

  const [data, setData] = React.useState<PagosMetrictEntity | []>([]);
  const valor = 0
  async function GEtPAY() {
    const controlador = new MetricEspaciosDAO();
    try {

      const datos = await controlador.payEspaciosToday(localStorage.getItem("sede") ?? "sede")
      const res = datos as PagosMetrictEntity
      setData(res);


      setDivisa(res.resumen.divisa)
      setPtp(res.resumen.pagoMovil)
      setWallet(res.resumen.wallet)
      setBse(res.resumen.efectivoBS)
      setPunto(res.resumen.Punto)
      setZelle(res.resumen.zelle)

      console.log(data)




    }
    catch (error) {
    //  alert(error);
      alert("No hemos encontrados pagos resgistrados ");
    }
    
  }
  React.useEffect(() => {
    GEtPAY();
  }, [valor])

  return (<div className="grafico-Barra">
    <center><h2 style={{ marginTop: "10px" }}> ingresos</h2></center>
    <BarChart
      title='Ingresos'

      xAxis={[{ scaleType: 'band', data: ["Ingresos por metodo de pago"] }]}
      series={[{ data: [divisa], label: "$" }, { data: [ptp], label: "pago Movil" }, { data: [punto], label: "Punto " }, { data: [zelle], label: "zelle" }, { data: [wallet], label: "wallet" }, { data: [bse], label: "BS" }]}
      width={500}
      height={270}
     
      


    /></div>
  );
}
