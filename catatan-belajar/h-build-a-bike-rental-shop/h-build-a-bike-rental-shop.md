# Build a Bike Rental Shop

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-bash-and-sql-by-building-a-bike-rental-shop/build-a-bike-rental-shop) dari [freeCodeCamp](https://www.freecodecamp.org/)


Lanjut belajar soal PostgreSQL.

---

## Daftar Isi

1. [Command Umum](#command-umum)
    - [`case`](#case)
2. [Info Table](#info-table)
    - [Info Table `bikes`](#info-table-bikes)
    - [Info Table `customers`](#info-table-customers)
    - [Info Table `rentals`](#info-table-rentals)
3. [Alur Progres](#alur-progres)
    - [Bikin Database](#bikin-database)
    - [Bikin Table `bikes`](#bikin-table-bikes)
    - [Bikin Table `customers`](#bikin-table-customers)
    - [Bikin Table `rentals`](#bikin-table-rentals)
    - [Isi Data Table `bikes`](#isi-data-table-bikes)
    - [File `bike-shop.sh`](#file-bike-shopsh)

---

## Command Umum

*Shell commands, shell script* dan *shell statements/syntaxt*
yg diajarin di tutorial ini.

---

### `case`

```sh
case EXPRESSION in
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  *) STATEMENTS ;;
esac
```

Percabangan yg ngecek banyak kemungkinan/pilihan terus ngejalanin yang cocok.

---

## Info Table

Info masing-masing table sesuai *command* `\d table_name`.

---

### Info Table `bikes`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| bike_id | integer |   | not null | nextval('bikes_bike_id_seq'::regclass) |
| type | character varying(50) |   | not null |   |
| size | integer |   | not null |   |
| available | boolean |   | not null | true |

Indexes:
- "bikes_pkey" PRIMARY KEY, btree (bike_id)

Referenced by:
- TABLE "rentals" CONSTRAINT "rentals_bike_id_fkey" FOREIGN KEY (bike_id) REFERENCES bikes(bike_id)

---

### Info Table `customers`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| customer_id | integer |   | not null | nextval('customers_customer_id_seq'::regclass) |
| phone | character varying(15) |   | not null |   |
| name | character varying(40) |   | not null |   |

Indexes:
- "customers_pkey" PRIMARY KEY, btree (customer_id)
- "customers_phone_key" UNIQUE CONSTRAINT, btree (phone)

Referenced by:
- TABLE "rentals" CONSTRAINT "rentals_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

---

### Info Table `rentals`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| rental_id | integer |   | not null | nextval('rentals_rental_id_seq'::regclass) |
| customer_id | integer |   | not null |   |
| bike_id | integer |   | not null |   |
| date_rented | date |   | not null | now() |
| date_returned | date |   |   |   |

Indexes:
- "rentals_pkey" PRIMARY KEY, btree (rental_id)

Foreign-key constraints:
- "rentals_bike_id_fkey" FOREIGN KEY (bike_id) REFERENCES bikes(bike_id)
- "rentals_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

---

## Alur Progres

Pas ngikutin tutorial mah pake *command* SQLnya satu-persatu,
dari bikin table dulu terus tambahin kolomnya satu-satu pake `ALTER TABLE`.<br/>
Tapi di catatan ini digabungin per*table* buat *command/query*nya.

Mungkin tujuan tutorialnya biar ngebiasain sama *command/query* PostgreSQL,
biar pas ke depannya kalo butuh ngubah-ngubah database yang udah
di tahap produksi bisa lancar, minimalin *error*.

---

### Bikin Database

```sql
CREATE DATABASE bikes;
```

Terus konek ke *database*nya pake `\c bikes`.

---

### Bikin Table `bikes`

```sql
CREATE TABLE bikes (
  bike_id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  size INT  NOT NULL,
  available BOOLEAN DEFAULT TRUE NOT NULL
);
```

---

### Bikin Table `customers`

```sql
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  phone VARCHAR(15) NOT NULL,
  name VARCHAR(40) UNIQUE
);
```

---

### Bikin Table `rentals`

```sql
CREATE TABLE rentals (
  rental_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers (customer_id) NOT NULL,
  bike_id INT REFERENCES bikes (bike_id) NOT NULL,
  date_rented DATE DEFAULT NOW() NOT NULL,
  date_returned DATE
);
```

---

### Isi Data Table `bikes`

Masukin manual pake *query*.

```sql
INSERT INTO bikes (type, size)
VALUES ('Mountain', 27),
  ('Mountain', 28),
  ('Mountain', 29),
  ('Road', 27),
  ('Road', 28),
  ('Road', 29),
  ('BMX', 19),
  ('BMX', 20),
  ('BMX', 21);
```
---

### File `bike-shop.sh`

Bikin filenya pake `touch` terus tambahin hak akses *executable* pake `chmod`.

Filenya: [bike-shop.sh](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/h-build-a-bike-rental-shop/bike-shop.sh)

---
