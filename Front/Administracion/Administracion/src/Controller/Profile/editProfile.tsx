import React from "react";
import { UsersEntity } from "../../core/Entities/users/userEntity";
import { Button, Sheet } from "@mui/joy";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Cargando } from "../../screens/Cargando";
import { UserDAO } from "../../core/Implements/user/userDAO";


export function EditProfile(){
    
    let profile = JSON.parse( localStorage.getItem("user")??
    JSON.stringify({"id":0,"nombre":"Inicie seccion","apellido":"InICIE SECCION","ci":"00000","nombreusuario":"jarvis","password":"🖕","token":"1710421055.9607954","status":"conectado","tipoUsuario":0,"urlImagen":"xxxxxxxx"}));
    let user =profile as UsersEntity;
    const [loading,setloading] = React.useState(false);
    const [passEdit,setPassEdit] = React.useState(true);
    const [edit,setEdit]= React.useState(true);
    const [nombre,setNombre] = React.useState<string>(user.nombre);
    const [apellido, setApellido] = React.useState<string>(user.apellido);
    const [ci, setCi] = React.useState<string>(user.ci);
    const [nombreUsuario, setNombreUsuario] = React.useState<string>(user.nombreusuario);
    const [password, setPassword] = React.useState<string>("123456789");
    //acualiza la imagen 
    interface UploadImageProps {
        idUser: number;
      }
      const UploadImage: React.FC<UploadImageProps> = ({ idUser }) => {
      const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setSelectedFile(event.target.files[0]);
        }
      };
    
      const handleUpload = async () => {
        if (!selectedFile) return;
        
        const formData = new FormData();
        formData.append('image', selectedFile);
    
      try {
        setloading(true);
          const response = await fetch(`http://191.97.17.26:8011/MUNAY/nest/User/upImageProfile/${idUser}`, {
            method: 'POST',
            headers: {
              'accept': 'application/json',
            },
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error('Error uploading image');
          }
    
          const data = await response.json();
          alert("imagen guardada con exito por favor inicie sesion nuevamente para ver los cambios");
          console.log('Response:', data);
        } catch (error) {
          console.error('Error uploading image:', error);
        }finally{
            setloading(false);
        }
        setloading(false);
      };
    
      return (<div>
        <div style={{display:"column"}}>
          <input type="file" onChange={handleFileChange} />
          
        </div>
        <Button onClick={handleUpload}>Guardar</Button></div>
      );
    };
    //actuliza los datos del usuario
    async function updateUser(user: UsersEntity) {
        setloading(true);
        if (user as  UsersEntity) {
            console.log(" si paso la entidad")
             console.warn("esta es la entiddad ->"+user)
    
        } else {
            console.log("false")
        }
    
    
    
    
        try {
            const ControladorUsers = new UserDAO();
            const data = await ControladorUsers.updateUser(user);
            
            return data as boolean;
    
        } catch (error) {
            console.error(error);
            return null
    
        }
        finally{
            setloading(false);
        }
    
    }
    //==========================================================
    //actualiza el password
    async function updatePassword() {
        setloading(true);
        if (user as  UsersEntity) {
            console.log(" si paso la entidad")
             console.warn("esta es la entiddad ->"+user)
    
        } else {
            console.log("false")
        }
    
    
    
    
        try {
            const ControladorUsers = new UserDAO();
            const data = await ControladorUsers.updatePassword(USUARIO.id,password);
            
            return data as boolean;
    
        } catch (error) {
            console.error(error);
            return null
    
        }
        finally{
            setloading(false);
        }
    
    }
    //===========================================================
    const handleNombreChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
      };
      const handleApellidoChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApellido(event.target.value);
      };
      const handleCiChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCi(event.target.value);
      };
      const handleNombreUsuarioChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreUsuario(event.target.value);
      };
      const handlePasswordChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
    //usuario a editar al igual que es el que se va a enviar a l servidor 
    const USUARIO:UsersEntity={
        id: user.id,
        nombre: nombre,
        apellido: apellido,
        ci: ci,
        nombreusuario: nombreUsuario,
        password: password,
        token: user.token,
        status: user.status,
        tipoUsuario: user.tipoUsuario,
        urlImagen: user.urlImagen,
        ultimaSesion: user.ultimaSesion,
        creado: user.creado
    }
    if(loading){
        return <Cargando></Cargando>
    }
    return(<Sheet
        variant="outlined"
        sx={{
            display:"grid",
            gridTemplateRows:"90vh 90vh" ,
            height:"90vh",
            marginTop:10,
            gridTemplateColumns: "70% 70%",
            gridGap: "5px",
   
          maxWidth:'100%',
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
  

    
        <div >
        <h2> Informacion de usuario </h2>
        <div className="form-group col-sm-3  p-2" >
          <label htmlFor="date-input">Nombre</label>
          <input
            type="text"
            id="nombre-input"
            value={nombre}
            onChange={handleNombreChangue}
            className="form-control mt-2"
            disabled = {edit}
          />
      
        </div>
        <div className="form-group col-sm-3  p-2">
          <label htmlFor="date-input">Apellido</label>
          <input
            type="text"
            id="nombre-input"
            value={apellido}
            onChange={handleApellidoChangue}
            className="form-control mt-2"
            disabled = {edit}
          />
      
        </div>
        <div className="form-group col-sm-3  p-2"  >
          <label htmlFor="date-input">Ci</label>
          <input
            type="text"
            id="nombre-input"
            value={ci}
            onChange={handleCiChangue}
            className="form-control mt-2"
            disabled = {edit}
          />
      
        </div>
        <div className="form-group col-sm-3  p-2"  >
          <label htmlFor="date-input">Nombre de usuario</label>
          <input
            type="text"
            id="nombre-input"
            value={nombreUsuario}
            onChange={handleNombreUsuarioChangue}
            className="form-control mt-2"
            disabled = {edit}
          />
      
        </div>
      

      <Button loading={loading} startDecorator={<SaveIcon/>} onClick={ async()=> await updateUser(USUARIO)} color="primary" > Guardar</Button>
     
      <Button  startDecorator={<EditIcon/>} color="warning" onClick={()=>setEdit(edit==true?false:true)}> Editar </Button>
      </div>
      {/* Divisoin de cmabio de password y foto de perfil*/}
      <div>
        <img src={USUARIO.urlImagen}  width="30%" height="30%" alt=" imagen de perfil" />
        <UploadImage idUser={USUARIO.id}></UploadImage>
        <div className="form-group col-sm-3  p-2"  >
          <label htmlFor="date-input">Password</label>
          <input
            type="password"
            id="nombre-input"
            value={password}
            onChange={handlePasswordChangue}
            className="form-control mt-2"
            disabled = {passEdit}
          />
         
        </div>
        <Button onClick={async ()=> await updatePassword()} startDecorator={<SaveIcon/>} color="primary" > Guardar</Button>
        <Button  startDecorator={<EditIcon/>} color="warning" onClick={()=>setPassEdit(passEdit==true?false:true)}> Editar </Button>
      </div>
      </Sheet>)


}