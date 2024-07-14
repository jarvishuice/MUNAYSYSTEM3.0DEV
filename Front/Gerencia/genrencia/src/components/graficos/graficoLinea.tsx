
import { LineChart } from '@mui/x-charts/LineChart';

export  function GraficoLinea(props:any) {
    let x:any= []
    let y:any = []
    props.ejex.map((ejex:any)=> x.push(ejex));
    props.ejey.map((ejey:any)=> y.push(ejey));
  
  return (

    
    <div className="grafico">
    <LineChart

        sx={{
            
            backgroundColor:"#ffffff",
            color:"green",
     


        }}
        
      xAxis={[{ id:"1",scaleType: 'point',data: props.ejex, }]}
      series={[
    
        { label:props.etiqueta,
          data: props.ejey,
          
          area: props.area,
          color:props.color??"blue"
        },
      ]}
      width={500}
      height={300}
    /></div>
  );
}