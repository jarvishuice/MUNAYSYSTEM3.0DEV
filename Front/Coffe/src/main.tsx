import React from 'react';
import ReactDOM from 'react-dom/client';
import {PageError} from "./screens/Error.tsx";
import App from './App.tsx';
import {Dashboard} from './screens/dashboard.tsx';
import {Cargando} from './screens/Cargando.tsx';
import {POSCafetin} from "./screens/CoffeshopPOS.tsx";
import { DeudasCoffeScreen } from './screens/deudasCoffeScreen.tsx';
import {ClientesScreen} from "./screens/Clientes.tsx";
import {TablaOrdenesCoffeScreen} from "./screens/TablaOrdenesCoffeScreen.tsx";
import {TablaOrdenesEspaciosScreen} from "./screens/TablaOrdenesEspaciosScreen.tsx";
import {PagosTableCoffeScreen} from "./screens/PagosTableCoffeScreen.tsx";
import { PagosTableEspaciosScreen } from './screens/PagosTableEspaciosScreen.tsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ReportesCoffeShopScreen } from './screens/reportesCoffeshopScreen.tsx';
import { EspaciosPOSScreen } from './screens/EspaciosPOSScreen.tsx';
import { DeudasEspaciosScreen } from './screens/deudasEspaciosScreen.tsx';
import { ReportesEspaciosScreen } from './screens/reportesEspaciosScreen.tsx';
import { ReportesGerenciaScreen } from './screens/ReportesGerenciaScreen.tsx';
import { RecargaWalletCoffeScreen } from './screens/recargaWalletCoffeScreen.tsx';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
const router = createBrowserRouter([
  {
    path: "/v3.0/coffe/index.html",
    element: <App/>,
    errorElement:<PageError></PageError>,
   
    children:[
      {path: "profile",
        element:<ProfileScreen/>
       },
      {
        path:"dashboard",
        element:<Dashboard/>
      },{
        path:"cargando",
        element:<Cargando/>
      },
      {path:"coffePOS☕",
        element:<POSCafetin/>
      },
      {path:"deudas/coffe",
      element:<DeudasCoffeScreen/>},
      {path:"clientes",
       element:<ClientesScreen/> },
       {path:"ordenes/coffe",
       element:<TablaOrdenesCoffeScreen/>},
       {path:"pagos/coffe",
      element:<PagosTableCoffeScreen/>},
      {path:"reporte/coffe",
      element:<ReportesCoffeShopScreen/>},
      {path:"ordenes/espacios",
      element:<TablaOrdenesEspaciosScreen/>
      },
      {path:"pagos/espacios",
      element:<PagosTableEspaciosScreen/>},
      {
        path:"espaciosPOS",
        element:<EspaciosPOSScreen/>
      },
      {path:"deudas/espacios",
       element:<DeudasEspaciosScreen/>},
      {path:"reporte/espacios",
      element:<ReportesEspaciosScreen/>
      },
      {path:"gerencia/reportes",
    element:<ReportesGerenciaScreen/>},
    {path:"wallet/coffe",
    element:<RecargaWalletCoffeScreen/>}


    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
