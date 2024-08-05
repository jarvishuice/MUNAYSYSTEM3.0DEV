import { Button, IconButton, Modal, Sheet } from "@mui/joy";
import { VisitasEntity } from "../../core/Entities/visistas/visitasEntity";
import { VisitasDAO } from "../../core/Implements/visitas/visitasDAO";
import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

import { ClientesEntity } from "../../core/Entities/clients/clients";
import BusquedaVisitante from "../../components/busquedaVisitante";
import { VisitantesDAO } from "../../core/Implements/visitantes/visitantesDAO";
import { Cargando } from "../../screens/Cargando";
import BusquedaClientesVisitas from "../../components/BusquedaCleintesVisitas";

export function FormRegistroVisita() {
    const [modal, setModal] = React.useState(false);
    const [visitante, setVisitante] = React.useState<ClientesEntity>({
        id: 0, nombre: "vacio", apellido: " ", correo: " ", tlf: " ", fechaingreso: "  ",
        fechacambio: null,
        codigo: null,
        credito: null,
        ci: null,
        identificacion: null,
        direccion: "null",
        deuda: null
    })

    const [motivo, setMotivo] = React.useState<string>('visita')
    /** 
     * Updates the selected reason for the visit in the component's state.
     *
     * @param evento - The change event from the dropdown.
     */
    const seleccionMotivo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setMotivo(evento.target.value);

    }
    const [cliente, setCliente] = useState<ClientesEntity>({
        "id": 8,
        "nombre": "CLIENTE CONTADO",
        "apellido": "None",
        "correo": "clientecontado@gmail.com",
        "tlf": "None",
        "fechaingreso": "2022-10-25 14:39:01",
        "fechacambio": null,
        "codigo": null,
        "credito": null,
        "ci": "10000002",
        "identificacion": "None",
        "direccion": "Caracas null",
        "deuda": null
    })


    const insertCliente = (client: ClientesEntity) => {
        setCliente(client);

    }

    const [loading, setloading] = React.useState(false);
    async function RegisterVisitas(visita: VisitasEntity) {
        try {
            setloading(true);
            const contorladorVisitas = new VisitasDAO();
            const data = await contorladorVisitas.crearVisita(visita);
            if (data != null) {
                alert(`Visita generada  de manera correcta`);
                //window.location.reload();
            }

        } catch (error) {
            console.error(error);
        }
        finally {
            setloading(false);
        }



    }

    function ModalRegisterVisitante(props: any) {
        setloading(true);
        const [nombre, setNombre] = useState<string>('')
        const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNombre(e.target.value);
        };
        async function RegisterCliente(cliente: ClientesEntity) {
            try {
                setloading(true);
                const contorladorVisitantes = new VisitantesDAO();
                const data = await contorladorVisitantes.crearVisitante(cliente);
                if (data != null) {
                    alert(`Visitante registrado de manera correcta`);
                    console.warn("-> pase por el instanciado del visitante");
                    setVisitante(data as ClientesEntity);

                    console.warn("termione");

                    //window.location.reload();
                }

            } catch (error) {
                console.error(error);
            }

            finally {
                setloading(false);
                props.cerrar(false);
            }



        }


        const [telefono, setTelefono] = useState<string>('')
        const handleChangeTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTelefono(e.target.value);
        };
        const [ci, setCi] = useState<string>('')
        const handleChangeCi = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCi(e.target.value);
        };

        setloading(false);

        return (<React.Fragment>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={props.modal}

                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet sx={{ width: "30%" }}>
                    <IconButton variant="outlined" color="danger" onClick={() => setModal(false)}><ClearIcon /></IconButton>
                    <div >
                        <center> <h4 className="mb-2"> REGISTRO VISITANTE </h4></center>
                        <div className="form-group col-sm-12  p-2" >
                            <center>       <label htmlFor="date-input">Nombre</label>
                                <input
                                    type="text"
                                    id="Motivo Present"
                                    value={nombre}
                                    onChange={handleChangeNombre}
                                    className="form-control w-75 mt-2"

                                /></center>

                            <center>  <label htmlFor="date-input">ci o rif</label>
                                <input
                                    type="text"
                                    id="Motivo Present"
                                    value={ci}
                                    onChange={handleChangeCi}
                                    className="form-control w-75 mt-2 "

                                />


                                <label className="mt-2" htmlFor="date-input">Telefono</label>
                                <input
                                    type="text"
                                    id="Motivo Present"
                                    value={telefono}
                                    onChange={handleChangeTelefono}
                                    className="form-control w-75 mt-2"

                                /></center>

                        </div>


                        <center>    <Button disabled={(nombre === '' || ci === '' || telefono === '') ? true : false} className="mb-4" variant="solid" color="primary" onClick={async () => {
                            await RegisterCliente({
                                id: Number(1),
                                nombre: nombre,
                                apellido: " ",
                                correo: "noplaica@no.com",
                                tlf: telefono,
                                fechaingreso: " ",
                                fechacambio: " ",
                                codigo: Number(0),
                                credito: Number(0),
                                ci: ci,
                                identificacion: " ",
                                direccion: "NO APLICA",
                                deuda: Number(0)




                            });
                        }}>
                            Registrar Visitante
                        </Button></center>
                    </div>
                </Sheet>
            </Modal>
        </React.Fragment>);

    }
    if (loading) {
        return <Cargando></Cargando>
    }

    return (<Sheet
        variant="outlined"
        sx={{
            display: "grid",
            gridTemplateRows: "90vh 90vh",
            height: "90vh",
            marginTop: 0.1,
            gridTemplateColumns: "70% 70%",
            gridGap: "5px",

            maxWidth: '100%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
        }}
    >
        {/*
        ========================== 
        presentacion dinputs
        ==========================
        */}
        <div>
            <ModalRegisterVisitante modal={modal} cerrar={setModal}></ModalRegisterVisitante>
            <h2>Registro de visita </h2>
            <div className="form-group col-sm-3  p-2" >
                <BusquedaVisitante setVisitante={setVisitante} modal={setModal} />
            </div>
            <div className="form-group col-sm-3  p-2" >
                <BusquedaClientesVisitas insertarPersona={insertCliente}></BusquedaClientesVisitas>
            </div>
            <div className="form-group col-sm-3  p-2" >
                <label htmlFor="date-input">Motivo</label>
                <select className="form-select me-2" value={motivo} onChange={seleccionMotivo} aria-label="Motivo">

                    <option value="visita">Visita</option>
                    <option value="recorrido">Recorrido</option>
                </select>

            </div>

        </div>
        {/*
        ========================== 
        presentacion de visita  
        ==========================
        */}
        <div>
            <div className="form-group col-sm-3  p-2" >
                <label htmlFor="date-input">Visitante</label>
                <input
                    type="text"
                    id="nombre-input"
                    value={visitante?.nombre}

                    className="form-control mt-2"
                    disabled
                />

            </div>

            <div className="form-group col-sm-3  p-2" >
                <label htmlFor="tiem">Cliente</label>
                <input className="form-control mt-2" type="text" disabled value={cliente?.nombre}></input>
            </div>
            <div className="form-group col-sm-3  p-2" >
                <label htmlFor="date-input">Motivo</label>
                <input
                    type="text"
                    id="Motivo Present"
                    value={motivo}

                    className="form-control mt-2"
                    disabled
                />

            </div>
            <Button disabled={visitante.id === 0 ? true : false} onClick={async () => await RegisterVisitas({
                id: '0',
                idVisitante: visitante.id,
                idCliente: `${cliente.id}`,
                fIngreso: `kkk`,
                fSalida: `kkk`,
                status: 'activa',
                sede: localStorage.getItem('sede') ?? "sede",
                motivo: motivo,
            })}>Generar visita </Button>
        </div>

    </Sheet>);


}

