-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.4
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- -- object: pg_database_owner | type: ROLE --
-- -- DROP ROLE IF EXISTS pg_database_owner;
-- CREATE ROLE pg_database_owner WITH 
-- 	INHERIT
-- 	 PASSWORD '********';
-- -- ddl-end --
-- 

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: pensum | type: DATABASE --
-- DROP DATABASE IF EXISTS pensum;
CREATE DATABASE pensum
	ENCODING = 'UTF8'
	LC_COLLATE = 'Spanish_Spain.1252'
	LC_CTYPE = 'Spanish_Spain.1252'
	TABLESPACE = pg_default
	OWNER = postgres;
-- ddl-end --


-- object: public.color_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.color_id_seq CASCADE;
CREATE SEQUENCE public.color_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.color_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.color | type: TABLE --
-- DROP TABLE IF EXISTS public.color CASCADE;
CREATE TABLE public.color (
	id integer NOT NULL DEFAULT nextval('public.color_id_seq'::regclass),
	nombre character(6) DEFAULT NULL::bpchar,
	CONSTRAINT color_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.color OWNER TO postgres;
-- ddl-end --

-- object: public.usuario_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.usuario_id_seq CASCADE;
CREATE SEQUENCE public.usuario_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.usuario | type: TABLE --
-- DROP TABLE IF EXISTS public.usuario CASCADE;
CREATE TABLE public.usuario (
	id integer NOT NULL DEFAULT nextval('public.usuario_id_seq'::regclass),
	nombre character varying(30) NOT NULL,
	password character(60) NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.usuario OWNER TO postgres;
-- ddl-end --

-- object: public.tipo_materia_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.tipo_materia_id_seq CASCADE;
CREATE SEQUENCE public.tipo_materia_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.tipo_materia_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.tipo_materia | type: TABLE --
-- DROP TABLE IF EXISTS public.tipo_materia CASCADE;
CREATE TABLE public.tipo_materia (
	id integer NOT NULL DEFAULT nextval('public.tipo_materia_id_seq'::regclass),
	nombre character varying(40) NOT NULL,
	CONSTRAINT tipo_materia_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.tipo_materia OWNER TO postgres;
-- ddl-end --

-- object: public.estado_materia_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.estado_materia_id_seq CASCADE;
CREATE SEQUENCE public.estado_materia_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.estado_materia_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.estado_materia | type: TABLE --
-- DROP TABLE IF EXISTS public.estado_materia CASCADE;
CREATE TABLE public.estado_materia (
	id integer NOT NULL DEFAULT nextval('public.estado_materia_id_seq'::regclass),
	estado character varying(11) NOT NULL,
	CONSTRAINT estado_materia_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.estado_materia OWNER TO postgres;
-- ddl-end --

-- object: public.materia_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.materia_id_seq CASCADE;
CREATE SEQUENCE public.materia_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.materia_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.materia | type: TABLE --
-- DROP TABLE IF EXISTS public.materia CASCADE;
CREATE TABLE public.materia (
	id integer NOT NULL DEFAULT nextval('public.materia_id_seq'::regclass),
	nombre character varying(50) NOT NULL,
	semestre integer NOT NULL,
	tipo integer NOT NULL,
	creditos integer NOT NULL,
	htd integer NOT NULL,
	hta integer NOT NULL,
	htc integer NOT NULL,
	color integer NOT NULL,
	estado integer NOT NULL,
	CONSTRAINT materia_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.materia OWNER TO postgres;
-- ddl-end --

-- object: public.horario_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.horario_id_seq CASCADE;
CREATE SEQUENCE public.horario_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.horario_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.horario | type: TABLE --
-- DROP TABLE IF EXISTS public.horario CASCADE;
CREATE TABLE public.horario (
	id integer NOT NULL DEFAULT nextval('public.horario_id_seq'::regclass),
	id_materia integer NOT NULL,
	dia_semana integer NOT NULL,
	hora_inicio time NOT NULL,
	hora_fin time NOT NULL,
	bloque character varying(25) NOT NULL,
	aula character varying(150) NOT NULL,
	CONSTRAINT horario_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.horario OWNER TO postgres;
-- ddl-end --

-- object: public.usuario_materia | type: TABLE --
-- DROP TABLE IF EXISTS public.usuario_materia CASCADE;
CREATE TABLE public.usuario_materia (
	id_usuario integer NOT NULL,
	id_materia integer NOT NULL,
	CONSTRAINT usuario_materia_pk PRIMARY KEY (id_usuario,id_materia)
);
-- ddl-end --
ALTER TABLE public.usuario_materia OWNER TO postgres;
-- ddl-end --

-- object: public.materia_relacion | type: TABLE --
-- DROP TABLE IF EXISTS public.materia_relacion CASCADE;
CREATE TABLE public.materia_relacion (
	id_materia integer NOT NULL,
	id_relacion integer NOT NULL,
	CONSTRAINT materia_relacion_pk PRIMARY KEY (id_materia,id_relacion)
);
-- ddl-end --
ALTER TABLE public.materia_relacion OWNER TO postgres;
-- ddl-end --

-- object: materia_tipo_fk | type: CONSTRAINT --
-- ALTER TABLE public.materia DROP CONSTRAINT IF EXISTS materia_tipo_fk CASCADE;
ALTER TABLE public.materia ADD CONSTRAINT materia_tipo_fk FOREIGN KEY (tipo)
REFERENCES public.tipo_materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: materia_color_fk | type: CONSTRAINT --
-- ALTER TABLE public.materia DROP CONSTRAINT IF EXISTS materia_color_fk CASCADE;
ALTER TABLE public.materia ADD CONSTRAINT materia_color_fk FOREIGN KEY (color)
REFERENCES public.color (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: materia_estado_fk | type: CONSTRAINT --
-- ALTER TABLE public.materia DROP CONSTRAINT IF EXISTS materia_estado_fk CASCADE;
ALTER TABLE public.materia ADD CONSTRAINT materia_estado_fk FOREIGN KEY (estado)
REFERENCES public.estado_materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: horario_fk | type: CONSTRAINT --
-- ALTER TABLE public.horario DROP CONSTRAINT IF EXISTS horario_fk CASCADE;
ALTER TABLE public.horario ADD CONSTRAINT horario_fk FOREIGN KEY (id_materia)
REFERENCES public.materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_materia_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE public.usuario_materia DROP CONSTRAINT IF EXISTS usuario_materia_usuario_fk CASCADE;
ALTER TABLE public.usuario_materia ADD CONSTRAINT usuario_materia_usuario_fk FOREIGN KEY (id_usuario)
REFERENCES public.usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_materia_materia_fk | type: CONSTRAINT --
-- ALTER TABLE public.usuario_materia DROP CONSTRAINT IF EXISTS usuario_materia_materia_fk CASCADE;
ALTER TABLE public.usuario_materia ADD CONSTRAINT usuario_materia_materia_fk FOREIGN KEY (id_materia)
REFERENCES public.materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: materia_relacion_materia_fk | type: CONSTRAINT --
-- ALTER TABLE public.materia_relacion DROP CONSTRAINT IF EXISTS materia_relacion_materia_fk CASCADE;
ALTER TABLE public.materia_relacion ADD CONSTRAINT materia_relacion_materia_fk FOREIGN KEY (id_materia)
REFERENCES public.materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: materia_relacion_relacion_fk | type: CONSTRAINT --
-- ALTER TABLE public.materia_relacion DROP CONSTRAINT IF EXISTS materia_relacion_relacion_fk CASCADE;
ALTER TABLE public.materia_relacion ADD CONSTRAINT materia_relacion_relacion_fk FOREIGN KEY (id_relacion)
REFERENCES public.materia (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "grant_CU_26541e8cda" | type: PERMISSION --
GRANT CREATE,USAGE
   ON SCHEMA public
   TO pg_database_owner;
-- ddl-end --

-- object: "grant_U_cd8e46e7b6" | type: PERMISSION --
GRANT USAGE
   ON SCHEMA public
   TO PUBLIC;
-- ddl-end --


