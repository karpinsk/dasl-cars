CREATE TABLE IF NOT EXISTS public.cars
(
    car_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 2 MINVALUE 1 MAXVALUE 1000 CACHE 1 ),
    vin text COLLATE pg_catalog."default" NOT NULL,
    reg_num text COLLATE pg_catalog."default" NOT NULL,
    year integer,
    color text COLLATE pg_catalog."default",
    producer_id integer NOT NULL,
    model text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT cars_pkey PRIMARY KEY (car_id),
    CONSTRAINT cars_reg_num_key UNIQUE (reg_num),
    CONSTRAINT cars_vin_key UNIQUE (vin),
    CONSTRAINT cars_producer_id_fkey FOREIGN KEY (producer_id)
        REFERENCES public.producers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cars
    OWNER to postgres;