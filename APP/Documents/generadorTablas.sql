-- public.abonos_espacios definition

-- Drop table

-- DROP TABLE public.abonos_espacios;

CREATE TABLE public.abonos_espacios (
	id varchar NOT NULL,
	idcliente int4 NOT NULL,
	idpago varchar NOT NULL,
	status varchar NOT NULL,
	monto numeric NOT NULL,
	sede varchar NOT NULL,
	CONSTRAINT abonos_pk_1 PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.abonos_espacios OWNER TO munay;
GRANT ALL ON TABLE public.abonos_espacios TO munay;
GRANT ALL ON TABLE public.abonos_espacios TO operaciones;


-- public.clientes definition

-- Drop table

-- DROP TABLE public.clientes;

CREATE TABLE public.clientes (
	id smallserial NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NULL,
	correo varchar NULL,
	tlf varchar NULL,
	fechaingreso timestamp NOT NULL,
	fechacambio timestamp NULL,
	codigo int4 NULL,
	credito numeric NULL,
	ci varchar NOT NULL,
	identificacion varchar NULL,
	direccion varchar NULL,
	deuda numeric NULL,
	urlimg varchar NULL,
	CONSTRAINT clientes_pk PRIMARY KEY (id),
	CONSTRAINT clientes_un UNIQUE (ci)
);

-- Permissions

ALTER TABLE public.clientes OWNER TO munay;
GRANT ALL ON TABLE public.clientes TO munay;
GRANT ALL ON TABLE public.clientes TO operaciones;
GRANT ALL ON TABLE public.clientes TO monitoreo;


-- public.empleados definition

-- Drop table

-- DROP TABLE public.empleados;

CREATE TABLE public.empleados (
	id smallserial NOT NULL,
	ci varchar NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NOT NULL,
	cargo varchar NOT NULL
);

-- Permissions

ALTER TABLE public.empleados OWNER TO munay;
GRANT ALL ON TABLE public.empleados TO munay;
GRANT ALL ON TABLE public.empleados TO operaciones;


-- public.fromadepago definition

-- Drop table

-- DROP TABLE public.fromadepago;

CREATE TABLE public.fromadepago (
	id smallserial NOT NULL,
	banco varchar NOT NULL,
	nrocuenta varchar NOT NULL,
	metodo varchar NOT NULL,
	sede varchar NULL,
	CONSTRAINT fromadepago_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.fromadepago OWNER TO munay;
GRANT ALL ON TABLE public.fromadepago TO munay;
GRANT ALL ON TABLE public.fromadepago TO operaciones;
GRANT ALL ON TABLE public.fromadepago TO monitoreo;


-- public.inventariocfm definition

-- Drop table

-- DROP TABLE public.inventariocfm;

CREATE TABLE public.inventariocfm (
	id int2 NOT NULL,
	nombre varchar NOT NULL,
	urlimagen varchar NULL,
	precio numeric NULL,
	cantidad int4 NULL,
	tipo varchar NULL,
	almacen varchar NULL,
	CONSTRAINT productos_pk_cfm PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.inventariocfm OWNER TO munay;
GRANT ALL ON TABLE public.inventariocfm TO munay;
GRANT ALL ON TABLE public.inventariocfm TO operaciones;
GRANT ALL ON TABLE public.inventariocfm TO monitoreo;


-- public.inventariojalisco definition

-- Drop table

-- DROP TABLE public.inventariojalisco;

CREATE TABLE public.inventariojalisco (
	id int2 NOT NULL,
	nombre varchar NOT NULL,
	urlimagen varchar NULL,
	precio numeric NULL,
	cantidad int4 NULL,
	tipo varchar NULL,
	almacen varchar NULL,
	CONSTRAINT productos_pk_jalisco PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.inventariojalisco OWNER TO munay;
GRANT ALL ON TABLE public.inventariojalisco TO munay;
GRANT ALL ON TABLE public.inventariojalisco TO operaciones;
GRANT ALL ON TABLE public.inventariojalisco TO monitoreo;


-- public.lugares definition

-- Drop table

-- DROP TABLE public.lugares;

CREATE TABLE public.lugares (
	id smallserial NOT NULL,
	pais varchar NOT NULL,
	estado varchar NOT NULL,
	ciudad varchar NOT NULL,
	municipio varchar NOT NULL,
	parroquia varchar NOT NULL,
	calle varchar NULL
);

-- Permissions

ALTER TABLE public.lugares OWNER TO munay;
GRANT ALL ON TABLE public.lugares TO munay;
GRANT ALL ON TABLE public.lugares TO operaciones;


-- public.productos definition

-- Drop table

-- DROP TABLE public.productos;

CREATE TABLE public.productos (
	id int2 NOT NULL,
	nombre varchar NOT NULL,
	urlimagen varchar NULL,
	precio numeric NULL,
	cantidad int4 NULL,
	tipo varchar NULL,
	almacen varchar NULL,
	CONSTRAINT productos_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.productos OWNER TO munay;
GRANT ALL ON TABLE public.productos TO munay;
GRANT ALL ON TABLE public.productos TO operaciones;
GRANT ALL ON TABLE public.productos TO monitoreo;


-- public.productos_espacios definition

-- Drop table

-- DROP TABLE public.productos_espacios;

CREATE TABLE public.productos_espacios (
	id int2 NOT NULL,
	nombre varchar NOT NULL,
	urlimagen varchar NULL,
	precio numeric NULL,
	cantidad int4 NULL,
	tipo varchar NULL,
	almacen varchar NULL,
	CONSTRAINT productos_pk_1 PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.productos_espacios OWNER TO munay;
GRANT ALL ON TABLE public.productos_espacios TO munay;
GRANT ALL ON TABLE public.productos_espacios TO operaciones;


-- public.tazadollar definition

-- Drop table

-- DROP TABLE public.tazadollar;

CREATE TABLE public.tazadollar (
	id varchar NOT NULL,
	precio float8 NULL,
	CONSTRAINT tazadollar_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.tazadollar OWNER TO munay;
GRANT ALL ON TABLE public.tazadollar TO munay;
GRANT ALL ON TABLE public.tazadollar TO operaciones;
GRANT ALL ON TABLE public.tazadollar TO monitoreo;


-- public.tiposusuarios definition

-- Drop table

-- DROP TABLE public.tiposusuarios;

CREATE TABLE public.tiposusuarios (
	id smallserial NOT NULL,
	nombre varchar NOT NULL,
	permisos varchar NOT NULL,
	CONSTRAINT tiposusuarios_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.tiposusuarios OWNER TO munay;
GRANT ALL ON TABLE public.tiposusuarios TO munay;
GRANT ALL ON TABLE public.tiposusuarios TO operaciones;


-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id smallserial NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NOT NULL,
	ci varchar NOT NULL,
	nombreusuario varchar NOT NULL,
	"password" varchar NOT NULL,
	"token" varchar NULL,
	tipouser int4 NULL,
	urlimg varchar NULL,
	status varchar NOT NULL
);

-- Permissions

ALTER TABLE public.usuarios OWNER TO munay;
GRANT ALL ON TABLE public.usuarios TO munay;
GRANT ALL ON TABLE public.usuarios TO monitoreo;
GRANT ALL ON TABLE public.usuarios TO operaciones;


-- public.visitantes definition

-- Drop table

-- DROP TABLE public.visitantes;

CREATE TABLE public.visitantes (
	id smallserial NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NULL,
	correo varchar NULL,
	tlf varchar NULL,
	fechaingreso timestamp NOT NULL,
	fechacambio timestamp NULL,
	codigo int4 NULL,
	credito numeric NULL,
	ci varchar NOT NULL,
	identificacion varchar NULL,
	direccion varchar NULL,
	deuda numeric NULL,
	urlimg varchar NULL,
	CONSTRAINT clientes_pk_1 PRIMARY KEY (id),
	CONSTRAINT visitantes_un UNIQUE (ci)
);

-- Permissions

ALTER TABLE public.visitantes OWNER TO munay;
GRANT ALL ON TABLE public.visitantes TO munay;
GRANT ALL ON TABLE public.visitantes TO operaciones;
GRANT ALL ON TABLE public.visitantes TO monitoreo;


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id varchar NOT NULL,
	total numeric NULL,
	sede varchar NOT NULL,
	fechapedido timestamp NULL,
	fechapago timestamp NULL,
	status varchar NOT NULL,
	idcliente int4 NOT NULL,
	tipopago varchar NULL,
	idpago varchar NULL,
	CONSTRAINT ordenes_pk_2 PRIMARY KEY (id),
	CONSTRAINT ordenes_fk FOREIGN KEY (idcliente) REFERENCES public.clientes(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE public.ordenes OWNER TO munay;
GRANT ALL ON TABLE public.ordenes TO munay;
GRANT ALL ON TABLE public.ordenes TO operaciones;
GRANT ALL ON TABLE public.ordenes TO monitoreo;


-- public.ordenes_espacios definition

-- Drop table

-- DROP TABLE public.ordenes_espacios;

CREATE TABLE public.ordenes_espacios (
	id varchar NOT NULL,
	total numeric NULL,
	sede varchar NOT NULL,
	fechapedido timestamp NULL,
	fechapago timestamp NULL,
	status varchar NOT NULL,
	idcliente int4 NOT NULL,
	tipopago varchar NULL,
	idpago varchar NULL,
	CONSTRAINT ordenes_pk_2_1 PRIMARY KEY (id),
	CONSTRAINT ordenes_espacios_fk FOREIGN KEY (idcliente) REFERENCES public.clientes(id)
);

-- Permissions

ALTER TABLE public.ordenes_espacios OWNER TO munay;
GRANT ALL ON TABLE public.ordenes_espacios TO munay;
GRANT ALL ON TABLE public.ordenes_espacios TO operaciones;


-- public.pagos definition

-- Drop table

-- DROP TABLE public.pagos;

CREATE TABLE public.pagos (
	id varchar NOT NULL,
	idcliente int4 NOT NULL,
	fechapago timestamp NOT NULL,
	motivo varchar NOT NULL,
	idformadepago int4 NOT NULL,
	referencia varchar NOT NULL,
	monto numeric NOT NULL,
	idtaza varchar NOT NULL,
	sede varchar NULL,
	CONSTRAINT pagos_pk_id PRIMARY KEY (id),
	CONSTRAINT pagos_fk FOREIGN KEY (idformadepago) REFERENCES public.fromadepago(id),
	CONSTRAINT pagos_fk_fk FOREIGN KEY (idcliente) REFERENCES public.clientes(id),
	CONSTRAINT pagos_fk_tazacambio FOREIGN KEY (idtaza) REFERENCES public.tazadollar(id)
);

-- Permissions

ALTER TABLE public.pagos OWNER TO munay;
GRANT ALL ON TABLE public.pagos TO munay;
GRANT ALL ON TABLE public.pagos TO operaciones;
GRANT ALL ON TABLE public.pagos TO monitoreo;


-- public.pagos_espacios definition

-- Drop table

-- DROP TABLE public.pagos_espacios;

CREATE TABLE public.pagos_espacios (
	id varchar NOT NULL,
	idcliente int4 NOT NULL,
	fechapago timestamp NOT NULL,
	motivo varchar NOT NULL,
	idformadepago int4 NOT NULL,
	referencia varchar NOT NULL,
	monto numeric NOT NULL,
	idtaza varchar NOT NULL,
	sede varchar NULL,
	CONSTRAINT pagos_pk_id_1 PRIMARY KEY (id),
	CONSTRAINT pagos_espacios_fk FOREIGN KEY (idtaza) REFERENCES public.tazadollar(id)
);
CREATE INDEX pagos_espacios_idcliente_idx ON public.pagos_espacios USING btree (idcliente, fechapago, sede);

-- Permissions

ALTER TABLE public.pagos_espacios OWNER TO munay;
GRANT ALL ON TABLE public.pagos_espacios TO munay;
GRANT ALL ON TABLE public.pagos_espacios TO operaciones;


-- public.pedidos definition

-- Drop table

-- DROP TABLE public.pedidos;

CREATE TABLE public.pedidos (
	idorden varchar NOT NULL,
	idproducto int4 NOT NULL,
	cantidad int4 NOT NULL,
	total numeric NULL,
	CONSTRAINT pedidos_fk FOREIGN KEY (idorden) REFERENCES public.ordenes(id)
);
CREATE INDEX pedidos_idorden_idx ON public.pedidos USING btree (idorden);

-- Permissions

ALTER TABLE public.pedidos OWNER TO munay;
GRANT ALL ON TABLE public.pedidos TO munay;
GRANT ALL ON TABLE public.pedidos TO operaciones;
GRANT ALL ON TABLE public.pedidos TO monitoreo;


-- public.pedidos_espacios definition

-- Drop table

-- DROP TABLE public.pedidos_espacios;

CREATE TABLE public.pedidos_espacios (
	idorden varchar NOT NULL,
	idproducto int4 NOT NULL,
	cantidad int4 NOT NULL,
	total numeric NULL,
	CONSTRAINT pedidos_espacios_fk FOREIGN KEY (idorden) REFERENCES public.ordenes_espacios(id),
	CONSTRAINT pedidos_espacios_fk_productos FOREIGN KEY (idproducto) REFERENCES public.productos_espacios(id)
);

-- Permissions

ALTER TABLE public.pedidos_espacios OWNER TO munay;
GRANT ALL ON TABLE public.pedidos_espacios TO munay;
GRANT ALL ON TABLE public.pedidos_espacios TO operaciones;


-- public.visitas definition

-- Drop table

-- DROP TABLE public.visitas;

CREATE TABLE public.visitas (
	id varchar NOT NULL,
	id_visitante int4 NOT NULL,
	id_cliente int4 NOT NULL,
	f_ingreso timestamp NOT NULL,
	f_salida timestamp NULL,
	status varchar NOT NULL,
	sede varchar NOT NULL,
	motivo varchar NOT NULL,
	CONSTRAINT visitas_fk FOREIGN KEY (id_visitante) REFERENCES public.visitantes(id),
	CONSTRAINT visitas_fk_clientes FOREIGN KEY (id_cliente) REFERENCES public.clientes(id)
);

-- Permissions

ALTER TABLE public.visitas OWNER TO munay;
GRANT ALL ON TABLE public.visitas TO munay;
GRANT ALL ON TABLE public.visitas TO operaciones;


-- public.wallet definition

-- Drop table

-- DROP TABLE public.wallet;

CREATE TABLE public.wallet (
	idcliente int4 NOT NULL,
	id varchar NOT NULL,
	idpago varchar NOT NULL,
	status varchar NOT NULL,
	monto numeric NOT NULL,
	CONSTRAINT wallet_pk PRIMARY KEY (id),
	CONSTRAINT wallet_fk FOREIGN KEY (idcliente) REFERENCES public.clientes(id),
	CONSTRAINT "wallet_fk_idpagos'" FOREIGN KEY (idpago) REFERENCES public.pagos(id)
);
CREATE INDEX wallet_idcliente_idx ON public.wallet USING btree (idcliente);

-- Permissions

ALTER TABLE public.wallet OWNER TO munay;
GRANT ALL ON TABLE public.wallet TO munay;
GRANT DELETE, SELECT, INSERT, UPDATE ON TABLE public.wallet TO operaciones;
GRANT DELETE, SELECT, INSERT, UPDATE ON TABLE public.wallet TO monitoreo;


-- public.wallet_espacios definition

-- Drop table

-- DROP TABLE public.wallet_espacios;

CREATE TABLE public.wallet_espacios (
	idcliente int4 NOT NULL,
	id varchar NOT NULL,
	idpago varchar NOT NULL,
	status varchar NOT NULL,
	monto numeric NOT NULL,
	CONSTRAINT wallet_pk_1 PRIMARY KEY (id),
	CONSTRAINT wallet_espacios_fk FOREIGN KEY (idpago) REFERENCES public.pagos_espacios(id),
	CONSTRAINT wallet_espacios_fk_clientes FOREIGN KEY (idcliente) REFERENCES public.clientes(id)
);
CREATE INDEX wallet_espacios_idcliente_idx ON public.wallet_espacios USING btree (idcliente);

-- Permissions

ALTER TABLE public.wallet_espacios OWNER TO munay;
GRANT ALL ON TABLE public.wallet_espacios TO munay;
GRANT ALL ON TABLE public.wallet_espacios TO operaciones;
GRANT ALL ON TABLE public.wallet_espacios TO monitoreo;


-- public.abonos definition

-- Drop table

-- DROP TABLE public.abonos;

CREATE TABLE public.abonos (
	id varchar NOT NULL,
	idcliente int4 NOT NULL,
	idpago varchar NOT NULL,
	status varchar NOT NULL,
	monto numeric NOT NULL,
	sede varchar NOT NULL,
	CONSTRAINT abonos_pk PRIMARY KEY (id),
	CONSTRAINT abonos_fk FOREIGN KEY (idpago) REFERENCES public.pagos(id),
	CONSTRAINT abonos_fk_idclientes FOREIGN KEY (idcliente) REFERENCES public.clientes(id)
);

-- Permissions

ALTER TABLE public.abonos OWNER TO munay;
GRANT ALL ON TABLE public.abonos TO munay;
GRANT ALL ON TABLE public.abonos TO operaciones;
--prcedimiento para extraer los pagos realidos por un cliente 
CREATE OR REPLACE FUNCTION obtener_datos_pagos_by_cliente(id_cliente INT, sucursal TEXT)
RETURNS TABLE (
    id TEXT,
    monto NUMERIC,
    fecha DATE,
    hora TEXT,
    sucursal TEXT,
    metodo TEXT,
    referencia TEXT,
    motivo TEXT,
    taza NUMERIC
)
LANGUAGE SQL
AS $$
    SELECT
        p.id,
        p.monto,
        date(p.fechapago) AS fecha,
        to_char(p.fechapago, 'hh12:MI:SS AM') AS hora,
        p.sede,
        f.metodo,
        p.referencia,
        p.motivo,
        t.precio AS taza
    FROM pagos p
    INNER JOIN fromadepago f ON f.metodo = f.metodo
    INNER JOIN tazadollar t ON t.precio = t.precio
    WHERE p.idcliente = id_cliente
        AND p.sede = sucursal
        AND t.id = p.idtaza
        AND f.id = p.idformadepago
        AND p.monto <> 0
    ORDER BY p.fechapago DESC;
$$;

--procedimientos para extraer pagos filtrados por clientes y sede y rango de fecha 
CREATE OR REPLACE FUNCTION obtener_datos_pagos_by_cliente_rango_fecha(id_cliente INT, sucursal text,finicio DATE,ffin DATE)
RETURNS TABLE (
    id TEXT,
    monto NUMERIC,
    fecha DATE,
    hora TEXT,
    sucursal TEXT,
    metodo TEXT,
    referencia TEXT,
    motivo TEXT,
    taza NUMERIC
)
LANGUAGE SQL
AS $$
    SELECT
        p.id,
        p.monto,
        date(p.fechapago) AS fecha,
        to_char(p.fechapago, 'hh12:MI:SS AM') AS hora,
        p.sede,
        f.metodo,
        p.referencia,
        p.motivo,
        t.precio AS taza
    FROM pagos p
    INNER JOIN fromadepago f ON f.metodo = f.metodo
    INNER JOIN tazadollar t ON t.precio = t.precio
    WHERE p.idcliente = id_cliente
        AND p.sede = sucursal
        AND t.id = p.idtaza
        AND f.id = p.idformadepago
        AND p.fechapago >= finicio and  p.fechapago <= ffin + interval '1 day'
        AND p.monto <> 0
    ORDER BY p.fechapago DESC;
$$;