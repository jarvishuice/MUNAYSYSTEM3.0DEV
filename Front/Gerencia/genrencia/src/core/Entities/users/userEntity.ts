export interface UsersEntity {
    id:            number;
    nombre:        string;
    apellido:      string;
    ci:            string;
    nombreusuario: string;
    password:      string;
    token:         string;
    status:        string;
    tipoUsuario:   number;
    urlImagen:     string;
    ultimaSesion: string|null;
    creado:string|null;
}