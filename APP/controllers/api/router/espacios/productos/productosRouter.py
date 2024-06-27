from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.ordenes.ordenesEspaciosDAO import OrdenesEspaciosDAO
from core.Implements.productos.productosEspaciosDAO import ProductosEspaciosDAO,ProductosEntity

core= ProductosEspaciosDAO()
urlBase = "/Productos"
PRODUCTOS=APIRouter(prefix=f"{urlBase}",tags=["PRODUCTOS ESPACIOS"])
security = HTTPBearer()
validator=AuthDAO()
def aut(credendentials:HTTPAuthorizationCredentials= Depends(security)):
   token= credendentials.credentials
   validacion=validator.validarToken(token)
   if validacion['response']  == True:
      return True
   else:
     raise HTTPException(401,detail="token inauorizado ")

@PRODUCTOS.post("/crear")
async def crearProductos(ProductoData:ProductosEntity)->ProductosEntity:
    trigger= core.registrarProducto(ProductoData)
    print("esta es la respuesta")
    print(trigger['response'])
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       print(trigger['mesagge'])
       raise HTTPException(400,trigger['mesagge'])

@PRODUCTOS.get("/search/{name}/{sede}")
async def buscarProducto(name:str,sede:str) -> list[ProductosEntity]|list|None:
    trigger=core.BuscarProducto(name,sede)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@PRODUCTOS.get("/filterCategoria/{categoria}/{sede}")
async def FiltroCategorias(categoria,sede) -> list[ProductosEntity]: 
    trigger = core.ProductosByCategoriaandSede(categoria,sede)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@PRODUCTOS.get("/sede/{sede}")
async def getProductosBySede(sede:str) -> list[ProductosEntity]|list|None:
    trigger=core.getProductosBySede(sede)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])


@PRODUCTOS.put("/update/{sede}")
async def updateProducto(producto:ProductosEntity,sede:str):
       print("actualizando productos en el almacen de espacios en la sede ->"+sede)
       trigger = core.updateProducto(producto)
       if trigger['status'] ==True:
         respuesta= trigger['response']
         return respuesta
       else:
         raise HTTPException(400,trigger['mesagge'])
      
