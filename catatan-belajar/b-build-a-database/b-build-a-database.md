# Build a Database of Video Game Characters

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-relational-databases-by-building-a-database-of-video-game-characters/build-a-database-of-video-game-characters) dari [freeCodeCamp](https://www.freecodecamp.org/)

Belajar bikin database tentang karakter-karakter dari Nintendo (Mario, Luigi, Bowser dll).

> Catatan:  
> Kalo *command* sebelumnya kelupaan titik koma, masukin titik koma terus enter.
> 
> Kalo di terminalnya keliatan kosong, ga nunjukin posisi kita lagi dimana, coba pencet enter aja.  
> Kalo masih kosong setiap selesai *command*, pencet `ctrl + z` buat keluar terus masuk ulang ke PostgreSQL sama konek ke databasenya.
> 
> Kalo ada yg salah pas masukin SQL query yg banyak baris, pencet `ctrl + c` buat batalin sebelum querynya dijalanin.
> 
> Di semua tutorial *Relational Database* ini pake:  
> `psql (PostgreSQL) 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)`


---

**Nyoba nginstall PostgreSQL di Laptop**

Biar bisa ngulang yg dari tutorial.

Portnya: `5433`  
Defaultnya `5432` tp diganti biar ga tabrakan sama yg di Docker tutorialnya.

---

## Daftar Isi

- [*Command* buat Konek ke *Database*nya](#command-buat-konek-ke-databasenya)
- [*Command* Umum](#command-umum)
- [*Command* `CREATE`](#command-create)
- [*Command* `ALTER TABLE`](#command-alter-table)
  - [`ADD COLUMN`](#add-column)
  - [`ALTER COLUMN`](#alter-column)
  - [`ADD PRIMARY KEY`](#add-primary-key)
  - [`ADD UNIQUE`](#add-unique)
  - [`ADD FOREIGN KEY`](#add-foreign-key)
  - [`DROP COLUMN`](#drop-column)
  - [`DROP CONSTRAINT`](#drop-constraint)
  - [`RENAME COLUMN`](#rename-column)
- [*Command* `ALTER DATABASE`](#command-alter-database)
- [*Command* `INSERT INTO`](#command-insert-into)
- [*Command* `SELECT`](#command-select)
  - [`FULL JOIN`](#full-join)
- [*Command* `DELETE FROM`](#command-delete-from)
- [*Command* `DROP`](#command-drop)
  - [DROP TABLE](#drop-table)
  - [DROP DATABASE](#drop-database)
- [*Command* `UPDATE`](#command-update)
- [Info Database](#info-database-yg-dibikin-pas-tutorial)
- [Referensi SQL](#referensi-sql-query)

---

## *Command* buat Konek ke *Database*nya

*Di dalem Virtual Machine*nya udh diinstal PostgreSQL. *Command* buat login:

```bash
psql --username=freecodecamp --dbname=postgres
```

Kalo ga bisa konek coba:

```bash
sudo service postgresql status
```

Kalo down:

```bash
sudo service postgresql start
```

---

## *Command* Umum

```bash
\l
```

Buat nampilin *list* *database* (kalo udh berhasil masuk ke PostgreSQLnya)

---

```bash
\c database_name
```

Singkatan dari *connect*. Buat konek/masuk ke *database*nya.

---

```bash
\d
```

Pake pas udh konek ke *database*.  
Singkatan dari *display*. Buat nampilin daftar *table*.

```bash
\d table_name
```

Buat liat rincian tablenya.

---

## *Command* `CREATE`

```sql
CREATE DATABASE database_name;
```

Buat bikin *database*.  
Semua *command* butuh titik koma di akhir. Kalo lupa titik koma terus ga muncul apa-apa, tinggal masukin titik koma doang abis itu enter.

---

```sql
CREATE TABLE table_name();
```

Pake pas udh konek ke *database*.  
Buat bikin *table*, harus ada tanda kurungnya gitu.

```sql
CREATE TABLE table_name(column_name DATATYPE CONSTRAINTS);
```

Buat bikin *table* sekalian sama kolomnya.  
Contoh: `CREATE TABLE sounds(sound_id SERIAL PRIMARY KEY);`

---

## *Command* `ALTER TABLE`

### `ADD COLUMN`

```sql
ALTER TABLE table_name ADD COLUMN column_name DATATYPE;
```

Buat nambahin kolom/*field* di *table* yg udh ada.

Buat tipe data `varchar` harus ada jumlah maksimalnya. Misal `VARCHAR(30)`.

---

```sql
ALTER TABLE table_name ADD COLUMN column_name NUMERIC(4, 1);
```

Tipe data `NUMERIC()` buat bilangan desimal.  
Parameter pertama buat maksimal jumlah digit.  
Parameter kedua buat maksimal jumlah digit pecahannya (angka belakang koma).  
Misal 123.4

---

```sql
ALTER TABLE table_name ADD COLUMN id SERIAL;
```

Tipe data `SERIAL` otomatis ngebikin tipe data `INT`, `NOT NULL` sama *auto increment*.

Pas pake tipe data `SERIAL`, bakal otomatis ada *sequence* baru.  
Mungkin buat fungsi di belakang layar *auto increment* kolomnya?.  
Bisa dicek di bagian *"default"* pas pake *command* `\d table_name;`.

---

```sql
ALTER TABLE table_name ADD COLUMN column_name VARCHAR(30) NOT NULL;
```

`NOT NULL` itu salah satu *constraint*. *Constraint* ditulis setelah tipe data.

---

#### `ALTER COLUMN`

```sql
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

Buat ngebikin *constraint* di kolom yg udh ada jadi `NOT NULL` (ga boleh kosong).

Kalo mau ganti tipe data, ubah `SET` jadi `TYPE` terus tipe data barunya.

---

### `ADD PRIMARY KEY`

```sql
ALTER TABLE table_name ADD PRIMARY KEY(column_name);
```

Buat ngebikin *primary key* dari kolom yg udh ada.

---

```sql
ALTER TABLE table_name ADD PRIMARY KEY(column1, column2);
```

Buat ngebikin *composite primary key* yg dipake di *junction/pivot table "many-to-many" relationship*.  
Jadi ngebikin satu baris datanya unik.  
Misal ada data:

| character_id | action_id |
|--------------|-----------|
|       1      |     1     |
|       1      |     2     |
|       1      |     3     |
|       2      |     1     |
|       2      |     2     |

Kalo mau nambahin data `character_id=2, action_id=3` bisa.  
Tapi kalo mau nambahin data `character_id=2, action_id=1` ga bisa, udh ada data itu.

---

### `ADD UNIQUE`

```sql
ALTER TABLE table_name ADD UNIQUE(column_name);
```

Buat nambahin *constraint* unik ke kolom yg udh ada.

---

### `ADD FOREIGN KEY`

```sql
ALTER TABLE table_name ADD FOREIGN KEY(column_name) REFERENCES referenced_table(referenced_column);
```

Buat bikin *foreign key* buat kolom yg udh ada.


```sql
ALTER TABLE table_name ADD COLUMN column_name DATATYPE REFERENCES referenced_table_name(referenced_column_name);
```

Buat bikin *foreign key*. Ini buat yg belum ada kolomnya, jadi sekalian bikin kolom baru.

Kayaknya otomatis jadi *"one-to-one" relationship*.  
Atau malah ga ditentuin blak-blakan di *database*nya, cuma kita tentuin sendiri dengan ngisi data ke *table*nya apa aja.

Kalo buat *"many-to-many" relationship*, ga ada *foreign key* di *table*nya.  
Pakenya *table* baru yg disebut *junction table* atau *pivot table*,  
yg isinya dua *foreign key* dari dua *table* yg mau disambungin.

---

### `DROP COLUMN`

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

Buat ngehapus kolom/*field* dari *table* yg udh ada.

---

### `DROP CONSTRAINT`

```sql
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

Buat ngehapus *constraint*. Di contohnya dipake buat ngehapus *primary key*.

Buat ngecek ada *constraint* apa aja, pake command `\d table_name`.  
Nanti bakal muncul di *"Indexes"* atau info *constraint* lainnya.

---

### `RENAME COLUMN`

```sql
ALTER TABLE table_name RENAME COLUMN column_name TO new_name
```

Buat ngeganti nama kolom/*field*.

---

## *Command* `ALTER DATABASE`

```sql
ALTER DATABASE database_name RENAME TO new_database_name
```

Buat ngubah nama *database*.

---

## *Command* `INSERT INTO`

```sql
INSERT INTO table_name(column_1, column_2) VALUES(value1, value2);
```

Buat masukin data ke *table*.  
Kalo *varchar* atau *string* pake tanda kutip satu.  
`DATE` juga pake tanda kutip, soalnya keitung string.

```sql
INSERT INTO table_name(column_1, column_2, column_3)
VALUES(value1A, value1B, value1C),
(value2A, value2B, value2C),
(value3A, value3B, value3C);
```

Buat masukin banyak data sekaligus ke *table*.  
Mungkin ga bakal ada notif apapun, cek lagi pake `SELECT`.

---

## *Command* `SELECT`

```sql
SELECT columns FROM table_name;
```

Buat nampilin data dari *table*.  
Kalo mau lebih dari 1 kolom, pisahin nama kolomnya pake koma.

```sql
SELECT * FROM table_name;
```

Buat nampilin data dari semua kolom yg ada di *table*nya.

```sql
SELECT columns FROM table_name ORDER BY column_name;
```

Buat nampilin data dengan urutan tertentu.

```sql
SELECT columns FROM table_name WHERE condition;
```

Buat nampilin data sesuai kondisinya, pencarian data tertentu.

### `FULL JOIN`

```sql
SELECT columns FROM table_1 FULL JOIN table_2 ON table_1.primary_key_column = table_2.foreign_key_column;
```

Buat liat data lengkap dari *tables* yg ada hubungannya.


```sql
SELECT columns FROM junction_table
FULL JOIN table_1 ON junction_table.foreign_key_column = table_1.primary_key_column
FULL JOIN table_2 ON junction_table.foreign_key_column = table_2.primary_key_column;
```

Buat liat data dari *junction/pivot table*;

---

## *Command* `DELETE FROM`

```sql
DELETE FROM table_name WHERE conditions;
```

Buat ngehapus data.

Contoh:

```sql
DELETE FROM second_table WHERE username='Luigi';
```

---

## *Command* `DROP`

### `DROP TABLE`

```sql
DROP TABLE table_name;
```

Buat ngehapus table.

### `DROP DATABASE`

```sql
DROP DATABASE database_name;
```

Buat ngehapus database.  
Kalo ada error katanya lagi ada yg ngakses databasenya, konek dulu ke database lain pake `\c`  
atau tutup dulu terminalnya terus masuk lagi ke PostgreSQL pake *command* yg di paling atas catatan ini.

---

## *Command* `UPDATE`

```sql
UPDATE table_name SET column_name=new_value WHERE conditions;
```

Buat ngubah data tertentu.
Contoh: `UPDATE characters SET favorite_color='Orange' WHERE character_id=6;`

---

## Info Database yg Dibikin Pas Tutorial

### Nama Database

`mario_database`

### Daftar *Table*

1. [`characters`](#table-characters)
2. [`more_info`](#table-more-info)
3. [`sounds`](#table-sounds)
4. [`actions`](#table-actions)
5. [`character_actions`](#table-character-actions) 

| Schema |            Name             |   Type   |    Owner     |
|--------|-----------------------------|----------|--------------|
| public | actions                     | table    | freecodecamp |
| public | actions_action_id_seq       | sequence | freecodecamp |
| public | character_actions           | table    | freecodecamp |
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
| public | more_info_more_info_id_seq  | sequence | freecodecamp |
| public | sounds                      | table    | freecodecamp |
| public | sounds_sound_id_seq         | sequence | freecodecamp |

---

#### *Table* `characters`

|     Column     | Type | Collation | Nullable | Default |
|----------------|------|-----------|----------|---------|
| character_id   | integer |   | not null | nextval('characters_character_id_seq'::regclass) |
| name           | character varying(30) |   |   |   |
| homeland       | character varying(60) |   |   |   |
| favorite_color | character varying(30) |   |   |   |

Indexes:
- "characters_pkey" PRIMARY KEY, btree (character_id)

Referenced by:
- TABLE "character_actions" CONSTRAINT "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
- TABLE "more_info" CONSTRAINT "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
- TABLE "sounds" CONSTRAINT "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

---

#### *Table* `more_info`

|     Column     | Type | Collation | Nullable | Default |
|----------------|------|-----------|----------|---------|
| more_info_id   | integer      |   | not null | nextval('more_info_more_info_id_seq'::regclass) |
| birthday       | date         |   |   |   |
| height_in_cm   | integer      |   |   |   |
| weight_in_cm   | numeric(4,1) |   |   |   |
| character_id   | integer      |   | not null |   |

Indexes:
- "more_info_pkey" PRIMARY KEY, btree (more_info_id)
- "more_info_character_id_key" UNIQUE CONSTRAINT, btree (character_id)

Foreign-key constraints:
- "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

---

#### *Table* `sounds`

|    Column    | Type | Collation | Nullable | Default |
|--------------|------|-----------|----------|---------|
| sound_id     | integer |   | not null | nextval('sounds_sound_id_seq'::regclass) |
| filename     | character varying(30) |   |   |   |
| character_id | integer |   | not null |   |

Indexes:
- "sounds_pkey" PRIMARY KEY, btree (sound_id)
- "sounds_filename_key" UNIQUE CONSTRAINT, btree (filename)

Foreign-key constraints:
- "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

---

#### *Table* `actions`

|    Column    | Type | Collation | Nullable | Default |
|--------------|------|-----------|----------|---------|
| action_id    | integer |   | not null | nextval('actions_action_id_seq'::regclass) |
| action       | character varying(20) |   |   |   |

Indexes:
- "actions_pkey" PRIMARY KEY, btree (action_id)
- "actions_action_key" UNIQUE CONSTRAINT, btree (action)

Referenced by:
- TABLE "character_actions" CONSTRAINT "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)

---

#### *Table* `character_actions`

|    Column    | Type | Collation | Nullable | Default |
|--------------|------|-----------|----------|---------|
| character_id | integer |   | not null |   |
| action_id    | integer |   | not null |   |

Indexes:
- "character_actions_pkey" PRIMARY KEY, btree (character_id, action_id)

Foreign-key constraints:
- "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)
- "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

---

### Referensi SQL Query

```sql
SELECT * FROM characters FULL JOIN more_info ON characters.character_id = more_info.character_id;
```

```sql
SELECT * FROM characters FULL JOIN sounds ON characters.character_id = sounds.character_id;
```

```sql
SELECT * FROM character_actions
FULL JOIN characters ON character_actions.character_id = characters.character_id
FULL JOIN actions ON character_actions.action_id = actions.action_id;
```
