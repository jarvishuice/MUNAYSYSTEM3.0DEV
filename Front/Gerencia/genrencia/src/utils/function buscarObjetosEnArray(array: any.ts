 export function buscarObjetosEnArray(array: any[], propiedad: string, valorBuscado: string): any[] {
    const valorBuscadoLower = valorBuscado.toLowerCase(); // Convertimos el valor buscado a minúsculas

    return array.filter((objeto) => {
        const valorPropiedad = objeto[propiedad]?.toString().toLowerCase(); // Obtenemos el valor de la propiedad y lo convertimos a minúsculas
        return valorPropiedad.includes(valorBuscadoLower); // Utilizamos includes para buscar todas las coincidencias
    });
}