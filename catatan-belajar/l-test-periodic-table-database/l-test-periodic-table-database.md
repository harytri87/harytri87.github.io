# Build a Periodic Table Database

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/build-a-periodic-table-database-project/build-a-periodic-table-database) dari [freeCodeCamp](https://www.freecodecamp.org/)

Ujian keempat dari tutorial belajar *Relational Database* ini.

---

Buat *dump* database:

```bash
pg_dump -cC --inserts -U freecodecamp periodic_table > periodic_table.sql
```

Buat *rebuild* database:

```sh
psql -U postgres < periodic_table.sql
```

---

## Daftar Isi

1. [Info Awal](#info-awal)
    - [Info Awal Table `elements`](#info-awal-table-elements)
    - [Info Awal Table `properties`](#info-awal-table-properties)
2. [Alur Progres](#alur-progres)
    - [Benerin yang Salah](#benerin-yang-salah)
      - [Benerin Table `elements`](#benerin-table-elements)
      - [Benerin Table `properties`](#benerin-table-properties)
      - [Benerin Isi Table](#benerin-isi-table)
      - [Hapus Isi Table](#hapus-isi-table)
    - [Bikin Table Baru](#bikin-table-baru)
      - [Bikin Table `types`](#bikin-table-types)
    - [Isi Data Baru](#isi-data-baru)
    - [Git *Repository*](#git-repository)
      - [`Initial commit`](#initial-commit)
      - [`fix: properties table type column`](#fix-properties-table-type-column)
      - [`feat: show element properties`](#feat-show-element-properties)
      - [`fix: different argument`](#fix-different-argument)
      - [`feat: add readme`](#feat-add-readme)
    - [*Bash Script*](#bash-script)
      - [`fix_tables.sh`](#fix_tablessh)
      - [`element.sh`](#elementsh)
3. [Hasil Akhir](#hasil-akhir)
    - [Info Akhir Table `elements`](#info-akhir-table-elements)
    - [Info Akhir Table `properties`](#info-akhir-table-properties)
    - [Info Akhir Table `types`](#info-akhir-table-types)

---

## Info Awal

Dari awal udh dikasih:
1. Database `periodic_table`
2. Dua table:
   - `elements`
   - `properties`

Diminta:
1. Benerin yang salah di database/tablenya
2. Bikin Git *repository*
3. Bikin *bash script*

---

### Info Awal Table `elements`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| atomic_number | integer |   | not null |   |
| symbol | character varying(2) |   |   |   |
| name | character varying(40) |   |   |   |

Indexes:
- "elements_pkey" PRIMARY KEY, btree (atomic_number)
- "elements_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)

**Isi Awal Table `elements`**

| atomic_number | symbol |   name    |
|--------------:|--------|-----------|
|             1 | H      | Hydrogen |
|             2 | he     | Helium |
|             3 | li     | Lithium |
|             4 | Be     | Beryllium |
|             5 | B      | Boron |
|             6 | C      | Carbon |
|             7 | N      | Nitrogen |
|             8 | O      | Oxygen |
|          1000 | mT     | moTanium |

---

### Info Awal Table `properties`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| atomic_number | integer |   | not null |   |
| type | character varying(30) |   |   |   |
| weight | numeric(9,6) |   | not null |   |
| melting_point | numeric |   |   |   |
| boiling_point | numeric |   |   |   |

Indexes:
- "properties_pkey" PRIMARY KEY, btree (atomic_number)
- "properties_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)

**Isi Awal Table `properties`**

| atomic_number |   type    | atomic_mass | melting_point_celsius | boiling_point_celsius |
|--------------:|-----------|------------:|----------------------:|----------------------:|
|             1 | nonmetal  |    1.008000 |                -259.1 |                -252.9 |
|             2 | nonmetal  |    4.002600 |                -272.2 |                  -269 |
|             3 | metal     |    6.940000 |                180.54 |                  1342 |
|             4 | metal     |    9.012200 |                  1287 |                  2470 |
|             5 | metalloid |   10.810000 |                  2075 |                  4000 |
|             6 | nonmetal  |   12.011000 |                  3550 |                  4027 |
|             7 | nonmetal  |   14.007000 |                -210.1 |                -195.8 |
|             8 | nonmetal  |   15.999000 |                  -218 |                  -183 |
|          1000 | metalloid |    1.000000 |                    10 |                   100 |

---

## Alur Progres

### Benerin yang Salah

#### Benerin Table `elements`

```sql
ALTER TABLE elements
  ALTER COLUMN symbol SET NOT NULL,
  ADD UNIQUE (symbol),
  ALTER COLUMN name SET NOT NULL,
  ADD UNIQUE (name);
```

---

#### Benerin Table `properties`

```sql
ALTER TABLE properties
  RENAME COLUMN weight TO atomic_mass;
```

```sql
ALTER TABLE properties
  RENAME COLUMN melting_point TO melting_point_celsius;
```

```sql
ALTER TABLE properties
  RENAME COLUMN boiling_point TO boiling_point_celsius;
```

```sql
ALTER TABLE properties
  ADD FOREIGN KEY (atomic_number)
  REFERENCES elements (atomic_number);
```

```sql
ALTER TABLE properties
  ALTER COLUMN atomic_mass TYPE DECIMAL;
```

```sql
ALTER TABLE properties
  ALTER COLUMN melting_point_celsius SET NOT NULL,
  ALTER COLUMN boiling_point_celsius SET NOT NULL;
```

---

#### Benerin Isi Table

```sql
UPDATE elements SET symbol = INITCAP (symbol);
```

Bikin huruf pertama kapital

```sql
UPDATE properties
  SET atomic_mass = TRIM (TRAILING '0' FROM atomic_mass::text)::numeric;
```

Ngilangin angka 0 di belakang koma.<br/>
(tipe datanya harus jadi DECIMAL/NUMERIC tanpa digit spesifik)

---

#### Hapus Isi Table

```sql
DELETE FROM properties WHERE atomic_number = 1000;
```

```sql
DELETE FROM elements WHERE atomic_number = 1000;
```

---

### Bikin Table Baru

#### Bikin Table `types`

```sql
CREATE TABLE types (
  type_id SERIAL PRIMARY KEY,
  type VARCHAR(40) NOT NULL
);
```

---

### Isi Data Baru

```sql
INSERT INTO elements (atomic_number, symbol, name)
VALUES (9, 'F', 'Fluorine'),
  (10, 'Ne', 'Neon');
```

```sql
INSERT INTO properties (atomic_number, type_id, atomic_mass, melting_point_celsius, boiling_point_celsius)
VALUES (9, 2, 18.998, -220, -188.1),
  (10, 2, 20.18, -248.6, -246.1);
```

---

### Git *Repository*

#### `Initial commit`

File `element.sh` sama `fix_tables.sh` polosan.

---

#### `fix: properties table type column`

*Branch* `fix/properties-table-type-column`.

Satu *commit*.

Selesai `fix_tables.sh` langsung gabungin dan hapus *branch*.

---

#### `feat: show element properties`

*Branch* `feat/show-element-properties`.

Dua *commit*:
1. `feat: show element properties`
2. `fix: format element properties`

```sql
git rebase --interactive HEAD~2
```

Di*rebase squash* jadiin satu *commit*.

Terakhir digabungin ke `main` dan hapus *branch*nya.

---

#### `fix: different argument`

*Branch* `fix/different-argument`

Satu *commit* langsung gabungin.

---

#### `feat: add readme`

*Branch* `feat/add-readme`

Satu *commit* langsung gabungin.

---

Salah baca, dikirain minimal 3 *commits*, ternyata minimal 5.

Tapi biarlah, sekalian nyoba lagi itu *squash*.

---

### *Bash Script*

#### `fix_tables.sh`

```sh
#!/bin/bash

: '
  One-time script to:
  1. Insert data into the `types` table based on the `properties` table
  2. Update data in the `properties` table from type name to type ID
  3. Rename a column in the `properties` table and change its data type
  4. Set that column as a foreign key
'

PSQL="psql -X --username=freecodecamp --dbname=periodic_table -t --no-align -c"

ALTER_COLUMN() {
  # rename column
  RENAME_COLUMN_RESULT=$($PSQL "ALTER TABLE properties RENAME COLUMN type TO type_id;")

  if [[ $RENAME_COLUMN_RESULT != 'ALTER TABLE' ]]
  then
    echo "Rename failed: $RENAME_COLUMN_RESULT"
    return
  fi

  echo Rename success

  # alter data type
  ALTER_TYPE_RESULT=$($PSQL "ALTER TABLE properties ALTER COLUMN type_id TYPE INT USING type_id::integer;")

  if [[ $ALTER_TYPE_RESULT != 'ALTER TABLE' ]]
  then
    echo "Alter data type failed: $ALTER_TYPE_RESULT"
    return
  fi

  echo Alter data type success

  # alter constraint
  ALTER_CONSTRAINT_RESULT=$($PSQL "ALTER TABLE properties ALTER COLUMN type_id SET NOT NULL;")

  if [[ $ALTER_CONSTRAINT_RESULT != 'ALTER TABLE' ]]
  then
    echo "Alter constraint failed: $ALTER_CONSTRAINT_RESULT"
    return
  fi

  echo Alter constraint success

  # set foreign key
  SET_FOREIGN_RESULT=$($PSQL "ALTER TABLE properties ADD FOREIGN KEY (type_id) REFERENCES types (type_id);")

  if [[ $SET_FOREIGN_RESULT != 'ALTER TABLE' ]]
  then
    echo "Alter foreign key failed: $SET_FOREIGN_RESULT"
    return
  fi

  echo Alter foreign key success
}

INSERT_UPDATE() {
  # get distinct types name from properties table
  PROPERTIES_TYPE_NAMES=$($PSQL "SELECT DISTINCT (type) FROM properties;")

  echo "$PROPERTIES_TYPE_NAMES" | while read PROPERTIES_TYPE_NAME
  do
    TYPES_TYPE_NAME=$($PSQL "SELECT * FROM types WHERE type = '$PROPERTIES_TYPE_NAME';")

    # if the type not in types table yet
    if [[ -z $TYPES_TYPE_NAME ]]
    then
      # insert into type table
      INSERT_TYPE_RESULT=$($PSQL "INSERT INTO types (type) VALUES ('$PROPERTIES_TYPE_NAME');")

      if [[ $INSERT_TYPE_RESULT != 'INSERT 0 1' ]]
      then
        echo "Insert failed: $INSERT_TYPE_RESULT"
        return
      fi

      echo "Inserted into types: $PROPERTIES_TYPE_NAME"

      TYPE_ID=$($PSQL "SELECT type_id FROM types WHERE type = '$PROPERTIES_TYPE_NAME';")

      # update value of type column in properties table
      UPDATE_TYPE_RESULT=$($PSQL "UPDATE properties SET type = '$TYPE_ID' WHERE type = '$PROPERTIES_TYPE_NAME';")
      UPDATED_NUMBER=$(echo $UPDATE_TYPE_RESULT | sed -E 's/^UPDATE ([0-9]+)$/\1/')

      if [[ $UPDATED_NUMBER == 0 ]]
      then
        echo "Update failed: $UPDATE_TYPE_RESULT"
        return
      fi

      echo "Type updated: $PROPERTIES_TYPE_NAME to $TYPE_ID"
    fi
  done

  ALTER_COLUMN
}

INSERT_UPDATE
```

---

#### `element.sh`

```sh
#!/bin/bash

# Program that shows element's properties

PSQL="psql -X --username=freecodecamp --dbname=periodic_table -t --no-align -c"

FORMAT_INFO() {
  IFS="|" read TYPE_ID ATOMIC_NUMBER SYMBOL NAME ATOMIC_MASS MELTING_POINT BOILING_POINT TYPE <<< $1
  
  echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
  
}

GET_ELEMENT() {
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ELEMENT_INFO=$($PSQL "SELECT * FROM elements
        INNER JOIN properties USING (atomic_number)
        INNER JOIN types USING (type_id)
        WHERE atomic_number = $1;")
  else
    ELEMENT_INFO=$($PSQL "SELECT * FROM elements
      INNER JOIN properties USING (atomic_number)
      INNER JOIN types USING (type_id)
      WHERE symbol = '$1' OR name = '$1';")
  fi

  if [[ -z $ELEMENT_INFO ]]
  then
    echo "I could not find that element in the database."
    return
  fi

  FORMAT_INFO $ELEMENT_INFO
}

if [[ -z $1 ]]
then
  echo Please provide an element as an argument.
else
  GET_ELEMENT $1
fi
```

---

## Hasil Akhir

### Info Akhir Table `elements`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| atomic_number | integer |   | not null |   |
| symbol | character varying(2) | not null |   |   |
| name | character varying(40) | not null |   |   |

Indexes:
- "elements_pkey" PRIMARY KEY, btree (atomic_number)
- "elements_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)
- "elements_name_key" UNIQUE CONSTRAINT, btree (name)
- "elements_symbol_key" UNIQUE CONSTRAINT, btree (symbol)

Referenced by:
- TABLE "properties" CONSTRAINT "properties_atomic_number_fkey" FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number)

**Isi Table `elements`**

| atomic_number | symbol |   name    |
|--------------:|--------|-----------|
|             1 | H      | Hydrogen  |
|             2 | He     | Helium    |
|             3 | Li     | Lithium   |
|             4 | Be     | Beryllium |
|             5 | B      | Boron     |
|             6 | C      | Carbon    |
|             7 | N      | Nitrogen  |
|             8 | O      | Oxygen    |
|             9 | F      | Fluorine  |
|            10 | Ne     | Neon      |

---

### Info Akhir Table `properties`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| atomic_number | integer |   | not null |   |
| type_id | integer |   | not null |   |
| atomic_mass | numeric |   | not null |   |
| melting_point_celsius | numeric |   |   |   |
| boiling_point_celsius | numeric |   |   |   |

Indexes:
- "properties_pkey" PRIMARY KEY, btree (atomic_number)
- "properties_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)

Foreign-key constraints:
- "properties_atomic_number_fkey" FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number)
- "properties_type_id_fkey" FOREIGN KEY (type_id) REFERENCES types(type_id)

**Isi Table `properties`**

| atomic_number | type | atomic_mass | melting_point_celsius | boiling_point_celsius |
|--------------:|-----:|------------:|----------------------:|----------------------:|
|             1 |    2 |    1.008000 |                -259.1 |                -252.9 |
|             2 |    2 |    4.002600 |                -272.2 |                  -269 |
|             3 |    1 |    6.940000 |                180.54 |                  1342 |
|             4 |    1 |    9.012200 |                  1287 |                  2470 |
|             5 |    3 |   10.810000 |                  2075 |                  4000 |
|             6 |    2 |   12.011000 |                  3550 |                  4027 |
|             7 |    2 |   14.007000 |                -210.1 |                -195.8 |
|             8 |    2 |   15.999000 |                  -218 |                  -183 |
|             9 |    2 |      18.998 |                  -220 |                -188.1 |
|            10 |    2 |       20.18 |                -248.6 |                -246.1 |

---

### Info Akhir Table `types`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| type_id | integer |   | not null | nextval('types_type_id_seq'::regclass) |
| name | character varying(40) | not null |   |   |

Indexes:
- "types_pkey" PRIMARY KEY, btree (type_id)

Referenced by:
- TABLE "properties" CONSTRAINT "properties_type_id_fkey" FOREIGN KEY (type_id) REFERENCES types(type_id)

**Isi Table `types`**

| type_id |   type    |
|--------:|-----------|
|       1 | metal     |
|       2 | nonmetal  |
|       3 | metalloid |

---

---

---

**Complete the tasks below**

1. You should rename the `weight` column to `atomic_mass`

2. You should rename the `melting_point` column to `melting_point_celsius` and the `boiling_point` column to `boiling_point_celsius`

3. Your `melting_point_celsius` and `boiling_point_celsius` columns should not accept null values

4. You should add the `UNIQUE` constraint to the `symbol` and `name` columns from the `elements` table

5. Your `symbol` and `name` columns should have the `NOT NULL` constraint

6. You should set the `atomic_number` column from the `properties` table as a foreign key that references the column of the same name in the `elements` table

7. You should create a `types` table that will store the three types of elements

8. Your `types` table should have a `type_id` column that is an integer and the primary key

9. Your `types` table should have a `type` column that's a `VARCHAR` and cannot be `null`. It will store the different types from the `type` column in the `properties` table

10. You should add three rows to your `types` table whose values are the three different types from the `properties` table

11. Your `properties` table should have a `type_id` foreign key column that references the `type_id` column from the `types` table. It should be an `INT` with the `NOT NULL` constraint

12. Each row in your `properties` table should have a `type_id` value that links to the correct `type` from the types table

13. You should capitalize the first letter of all the `symbol` values in the `elements` table. Be careful to only capitalize the letter and not change any others

14. You should remove all the trailing zeros after the decimals from each row of the `atomic_mass` column. You may need to adjust a data type to `DECIMAL` for this. The final values they should be are in the `atomic_mass.txt` file

15. You should add the element with atomic number `9` to your database. Its name is `Fluorine`, symbol is `F`, mass is `18.998`, melting point is `-220`, boiling point is `-188.1`, and it's a `nonmetal`

16. You should add the element with atomic number `10` to your database. Its name is `Neon`, symbol is `Ne`, mass is `20.18`, melting point is `-248.6`, boiling point is `-246.1`, and it's a `nonmetal`

17. You should create a `periodic_table` folder in the `project` folder and turn it into a git repository with `git init`

18. Your repository should have a `main` branch with all your commits

19. Your `periodic_table` repo should have at least five commits

20. You should create an `element.sh` file in your repo folder for the program I want you to make

21. Your script (`.sh`) file should have executable permissions

22. If you run `./element.sh`, it should output only `Please provide an element as an argument.` and finish running.

23. If you run `./element.sh 1`, `./element.sh H`, or `./element.sh Hydrogen`, it should output only  `The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.`

24. If you run `./element.sh` script with another element as input, you should get the same output but with information associated with the given element.

25. If the argument input to your `element.sh` script doesn't exist as an `atomic_number`, `symbol`, or `name` in the database, the only output should be `I could not find that element in the database.`

26. The message for the first commit in your repo should be `Initial commit`

27. The rest of the commit messages should start with `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`

28. You should delete the non existent element, whose `atomic_number` is `1000`, from the two tables

29. Your `properties` table should not have a `type` column

30. You should finish your project while on the `main` branch. Your working tree should be clean and you should not have any uncommitted changes