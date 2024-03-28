PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE actividad_usuario(id text primary key,
id_user integer,
nombre text,
id_operacion text,
accion text,
fecha datetime, sede text);
INSERT INTO actividad_usuario VALUES('1710514986.5326846',1,'jarvis','1710514129.202219','edicion de orden coffeshop','2024-03-15 11:03:06.600699','jalisco');
INSERT INTO actividad_usuario VALUES('1710516506.7984748',1,'jarvis','1710516461.1037898','edicion de orden espacios','2024-03-15 11:28:26.836839','jalisco');
INSERT INTO actividad_usuario VALUES('1710518062.99775',1,'jarvis','1710516461.1037898','elimino de orden espacios','2024-03-15 11:54:23.045411','jalisco');
INSERT INTO actividad_usuario VALUES('1710531529.755947',1,'jarvis','1710514129.202219','elimino  orden de coffeshop','2024-03-15 15:38:49.763909','jalisco');
INSERT INTO actividad_usuario VALUES('1710532582.0221894',1,'jarvis','1710532155.062185','edicion de pago espacios','2024-03-15 15:56:22.035973','cfm');
INSERT INTO actividad_usuario VALUES('1710775624.958142',1,'jarvis','1710775543.356161','edicion de pago coffeshop','2024-03-18 11:27:05.008826','cfm');
INSERT INTO actividad_usuario VALUES('1710776128.1705308',1,'jarvis','1710538720.0045688','edicion de pago coffeshop','2024-03-18 11:35:28.174295','cfm');
INSERT INTO actividad_usuario VALUES('1710776451.9113252',1,'jarvis','1710774708.1988046','edicion de pago coffeshop','2024-03-18 11:40:51.914277','cfm');
INSERT INTO actividad_usuario VALUES('1710778465.808903',1,'jarvis','1710777175.917091','edicion de orden coffeshop','2024-03-18 12:14:25.813397','jalisco');
INSERT INTO actividad_usuario VALUES('1710778789.7840414',1,'jarvis','1710778764.5108783','edicion de orden coffeshop','2024-03-18 12:19:49.788076','jalisco');
INSERT INTO actividad_usuario VALUES('1711053282.8436582',22,'Aixa','1711039570.421558','edicion de pago coffeshop','2024-03-21 16:34:42.886324','cfm');
INSERT INTO actividad_usuario VALUES('1711053331.64855',22,'Aixa','1711039570.421558','edicion de pago coffeshop','2024-03-21 16:35:31.655417','cfm');
INSERT INTO actividad_usuario VALUES('1711053353.9635878',22,'Aixa','1711048857.9288313','edicion de pago coffeshop','2024-03-21 16:35:53.971348','cfm');
INSERT INTO actividad_usuario VALUES('1711053782.2584713',22,'Aixa','1711052892.5431483','edicion de orden espacios','2024-03-21 16:43:02.264336','cfm');
INSERT INTO actividad_usuario VALUES('1711053921.6122622',22,'Aixa','1711053824.120102','edicion de pago espacios','2024-03-21 16:45:21.619361','cfm');
INSERT INTO actividad_usuario VALUES('1711057903.5999615',22,'Aixa','1711048857.9288313','edicion de pago coffeshop','2024-03-21 17:51:43.607345','cfm');
COMMIT;
