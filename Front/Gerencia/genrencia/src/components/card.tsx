



  

/**
 * tarjeta que continene los productos 
 * @date 8/2/2024 - 1:09:50 p. m.
 *
 * @export
 * @param {*} props
 * @returns {*}
 */
export function CardProduct(props:any): any{
    return (
      <div className="card" onClick={()=>props.accion(props.producto)}>
      <img src={props.imagen} alt="Imagen"/>
      <div className="container">
        <h5>{props.titulo.slice(0,44)}</h5>
        <p className="price">${props.precio}</p>
      </div>
    </div>
    );
    


}