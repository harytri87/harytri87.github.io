# Build a Salon Appointment Scheduler

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/build-a-salon-appointment-scheduler-project/build-a-salon-appointment-scheduler) dari [freeCodeCamp](https://www.freecodecamp.org/)

Ujian ketiga dari tutorial belajar *Relational Database* ini.

---

Buat *dump* file `.sql`:

```sh
pg_dump -cC --inserts -U freecodecamp salon > salon.sql
```
Buat *rebuild database*: 

```sh
psql -U postgres < salon.sql
```

---

## Daftar Isi

1. [Info Table](#info-table)
    - [Info Table `services`](#info-table-services)
    - [Info Table `customers`](#info-table-customers)
    - [Info Table `appointments`](#info-table-appointments)
2. [Alur Progres](#alur-progres)
    - [Bikin Database](#bikin-database)
    - [Bikin Table](#bikin-table)
      - [Bikin Table `services`](#bikin-table-services)
      - [Bikin Table `customers`](#bikin-table-customers)
      - [Bikin Table `appointments`](#bikin-table-appointments)
    - [Isi Table `services`](#isi-table-services)
    - [Program `salon.sh`](#program-salonsh)

---

## Info Table

Info masing-masing table sesuai *command* `\d table_name`.

---

### Info Table `services`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| service_id | integer |   | not null | nextval('services_service_id_seq'::regclass) |
| name | character varying(60) |   | not null |   |

Indexes:
- "services_pkey" PRIMARY KEY, btree (service_id)

Referenced by:
- TABLE "appointments" CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(service_id)

---

### Info Table `customers`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| customer_id | integer |   | not null | nextval('customers_customer_id_seq'::regclass) |
| name | character varying(60) |   | not null |   |
| phone | character varying(15) |   | not null |   |

Indexes:
- "customers_pkey" PRIMARY KEY, btree (customer_id)
- "customers_phone_key" UNIQUE CONSTRAINT, btree (phone)

Referenced by:
- TABLE "appointments" CONSTRAINT "appointments_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

---

### Info Table `appointments`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| appointment_id | integer |   | not null | nextval('appointments_appointment_id_seq'::regclass) |
| customer_id | integer |   | not null |   |
| service_id | integer |   | not null |   |
| time | character varying(15) |   | not null |   |

Indexes:
- "appointments_pkey" PRIMARY KEY, btree (appointment_id)

Foreign-key constraints:
- "appointments_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
- "appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(service_id)

---

## Alur Progres

Konek ke postgre:

```sh
psql --username=freecodecamp --dbname=postgres
```

### Bikin Database

```sql
CREATE DATABASE salon;
```

Terus konek ke database pake `\d salon`

---

### Bikin Table

#### Bikin Table `services`

```sql
CREATE TABLE services (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL
);
```

---

#### Bikin Table `customers`

```sql
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL
);
```

---

#### Bikin Table `appointments`

```sql
CREATE TABLE appointments (
  appointment_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers (customer_id) NOT NULL,
  service_id INT REFERENCES services (service_id) NOT NULL,
  time VARCHAR(15) NOT NULL
);
```

---

### Isi Table `services`

```sql
INSERT INTO services (name)
VALUES ('cut'),
  ('color'),
  ('perm'),
  ('style'),
  ('trim');
```

---

### Program `salon.sh`

Bikin filenya pake `touch` terus tambahin hak akses *executable* pake `chmod`.

Filenya: [salon.sh](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/i-test-salon-appointment-scheduler/salon.sh)
