import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { ReactElement } from 'react';

/**
 * Interface for the metric card component.
 *
 * @export
 * @interface ITarjetaMetrict
 * @typedef {ItarjetaMetrict}
 * 
 */

export interface ITarjetaMetrict{
    /**
     * The icon to be displayed in the card.
     */
    icon:ReactElement;
    /**
     * The text to be displayed as the value of the metric.
     */
    valueText:string;
    /**
     * The maximum value for the metric.
     */
    maxValue:number;
    /**
     * The current value of the metric.
     */
    value:number;
    /**
     * The name of the metric.
     */
    metricName:string;
    bgColor:string;//option PRIMARY ,SENCONDARY , SUCCESS,WARNING, ERROR
}
/**
 * Component for displaying a metric card.
 *
 * @param {ITarjetaMetrict} props - The properties for the metric card.
 * @returns {ReactElement} - The rendered metric card.
 */
export function TarjetaMetric(props:any ): ReactElement{
    const  metric  = props.metric;
   
    const porcentaje= (metric.value /metric.maxValue )*100
    return (   <Card sx={{ml:"3px",bgcolor:metric.bgColor}} variant="solid"   invertedColors>
    <CardContent orientation="horizontal">
      <CircularProgress  variant="soft" size="lg" determinate value={Number(porcentaje)}>
      <center>{metric.icon}</center>
      </CircularProgress>
      <CardContent>
        <Typography  level="h4">{(metric.metricName).toUpperCase()}</Typography>
        <Typography level="h4">{metric.valueText}</Typography>
      </CardContent>
    </CardContent>
    
  </Card>)
}