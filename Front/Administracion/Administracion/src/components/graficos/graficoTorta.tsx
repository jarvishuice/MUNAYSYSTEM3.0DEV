import { DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

/*const data:dataPIE[] = [
  { label: 'Group A', value: 400, color: '#0088FE' },
  { label: 'Group B', value: 300, color: '#00C49F' },
  { label: 'Group C', value: 300, color: '#FFBB28' },
  { label: 'Group D', value: 200, color: '#FF8042' },
];*/
interface dataPIE{
    label:string,
    value:number,
    color:string
}
/**
 * Estos son lo0s colores que se mostraranen el grafico segun el indice 
 * @date 8/2/2024 - 10:48:52 a. m.
 *
 * @type {string[]}
 */
const Colores:string[] = [
  "#9807ff", // Indigo
  "#003ae7", // Royal Blue
  "#6c8fcf", // Cornflower Blue
  "#00aef3", // Sky Blue
  "#00BFFF", // Deep Sky Blue
  "#1E90FF", // Dodger Blue
  "#4682B4", // Steel Blue
  "#5F9EA0", // Cadet Blue
  "#87CEFA", // Light Sky Blue
  "#00bfff", // Light Blue
  "#B0C4DE", // Light Steel Blue
  "#AFEEEE", // Pale Turquoise
  "#00CED1", // Dark Turquoise
  "#48D1CC", // Medium Turquoise
  "#20B2AA", // Light Sea Green
  "#008080", // Teal
  "#008B8B", // Dark Cyan
  "#00FFFF", // Cyan / Aqua
  "#00CED1", // Dark Turquoise
  "#40E0D0", // Turquoise
  "#7FFFD4", // Aquamarine
  "#66CDAA", // Medium Aquamarine
  "#8FBC8F", // Dark Sea Green
  "#2E8B57", // Sea Green
  "#3CB371", // Medium Sea Green
  "#20B2AA", // Light Sea Green
  "#228B22", // Forest Green
  "#046404", // Green
  "#0cfa0c", // Dark Green
  "#1ce9df", // Dark Olive Green
];

let i = 0;

const sizing = {
  margin: { right: 5 },
  width: 290,
  height: 200,
  legend: { hidden: true, },
  
};
/*const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};*/

export  function GraficoTorta(props:any) {
  let metrica:dataPIE[] = []
  i = 0
  const  datos = props.datos ?? []
    datos.map((items:any)=>{
    i = i+1
    metrica.push({label:items.nombre,value:items.valor,color:Colores[i]})

    })


  const TOTAL = metrica.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(2)}%`;
};
  return (<div className="grafico-torta">
    <PieChart
      series={[
        {
          outerRadius: 99,
          data:metrica,
          arcLabel: getArcLabel,
        },
      ]}
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 12,
          fontStyle:'bold',
        },
      }}
      {...sizing}
    />
    <center> <h4>{props.Nombre??"GRAFICO TORTA"}</h4></center>
    <center> <h4>total: {TOTAL.toFixed(1)}$</h4></center>
    </div>
  );
}