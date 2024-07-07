import { ITarjetaMetrict, TarjetaMetric } from "../../components/TarjetaMetrica";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import React from "react";

import { PagosMetrictEntity } from "../../core/Entities/metric/coffeshop/MetricCoffeshopEntity";
import { MetricEspaciosDAO } from "../../core/Implements/metric/espacios/MetricEspaciosDAO";

export function CardsMethodPayTodayEspacios() {
    const valor = 0
    const [total, setTotal] = React.useState(0);
    const [data, setData] = React.useState<PagosMetrictEntity | []>([]);

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
            setTotal(res.resumen.total)
           
            console.log(data)




        }
        catch (error) {
            console.log(error);

        }
        
    }
    React.useEffect(() => {
        GEtPAY();
    }, [valor])


    const [punto, setPunto] = React.useState(0);
    const [divisa, setDivisa] = React.useState(0);
    const [bse, setBse] = React.useState(0);
    const [ptp, setPtp] = React.useState(0);
    const [wallet, setWallet] = React.useState(0);
    const [zelle, setZelle] = React.useState(0);

    const PUNTO: ITarjetaMetrict = { icon: <CreditCardIcon />, metricName: "PUNTO", maxValue: total, value: punto, valueText: `$${punto}`, bgColor: "#0056c7" }
    const DIVISA: ITarjetaMetrict = { icon: <PaidIcon />, metricName: "EFECTIVO $", maxValue: total, value: divisa, valueText: `$${divisa}`, bgColor: "#11c700" }
    const BSE: ITarjetaMetrict = { icon: <CardMembershipIcon />, metricName: "EFECTIVO BS", maxValue: total, value: bse, valueText: `$${bse}`, bgColor: "#e019c5" }
    const PTP: ITarjetaMetrict = { icon: <PhoneIphoneIcon />, metricName: "PAGO MOVIL", maxValue: total, value: ptp, valueText: `$${ptp}`, bgColor: "#0056c7" }
    const WALLET: ITarjetaMetrict = { icon: <AccountBalanceWalletIcon />, metricName: "WALLET", maxValue: total, value: wallet, valueText: `$${wallet}`, bgColor: "#11c700" }
    const ZELLE: ITarjetaMetrict = { icon: <AccountBalanceWalletIcon />, metricName: "ZELLE", maxValue: total, value: zelle, valueText: `$${zelle}`, bgColor: "#e019c5" }
    return (
        <center><div className="containerCardMethodPayToday">
            <div key="punto">
                <TarjetaMetric metric={PUNTO}></TarjetaMetric>
            </div>
            <div key="efectivos$">
                <TarjetaMetric metric={DIVISA}></TarjetaMetric>
            </div>
            <div>
                <TarjetaMetric metric={BSE}></TarjetaMetric>
            </div>
            <div>
                <TarjetaMetric metric={PTP}></TarjetaMetric>
            </div>

            <div>
                <TarjetaMetric metric={WALLET}></TarjetaMetric>
            </div>
            <div>
                <TarjetaMetric metric={ZELLE}></TarjetaMetric>
            </div>
        </div></center>
    )




}