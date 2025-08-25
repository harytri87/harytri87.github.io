# Learn SQL by Building a Student Database

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-bash-scripting-by-building-five-programs/build-five-programs) dari [freeCodeCamp](https://www.freecodecamp.org/)

> SQL, or Structured Query Language, is the language for communicating with a relational database.
> 
> In this 140-lesson course, you will create a Bash script that uses SQL to enter information about your computer science students into PostgreSQL.

Dari sananya ada dua file `.csv`:
- [students.csv](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/e-build-student-database/students.csv)
- [courses.csv](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/e-build-student-database/courses.csv)

---

## Daftar Isi

1. [Command Umum](#command-umum)
2. [Query PostgreSQL](#query-postgresql)
    - [LIKE dan NOT LIKE](#like-dan-not-like)
    - [NULL](#null)
    - [ORDER BY](#order-by)
    - [LIMIT](#limit)
    - [MIN](#min)
    - [MAX](#max)
    - [SUM](#sum)
    - [AVG](#avg)
    - [CEIL](#ceil)
    - [FLOOR](#floor)
    - [ROUND](#round)
    - [COUNT](#count)
    - [DISTINCT](#distinct)
    - [GROUP BY](#group-by)
    - [AS](#as)
    - [JOIN](#join)
3. [Database dan Table](#database-dan-table)
    - [Database](#database)
    - [Table](#table)
        - [students](#1-students)
        - [majors](#2-majors)
        - [courses](#3-courses)
        - [majors_courses](#4-majors_courses)
4. [Program Bash](#program-bash)
    - [insert_data.sh](#1-insert_datash)
    - [student_info.sh](#student_infosh)

---

## *Command* Umum

```bash
cat <file_name>
```

Buat nampilin/ngeprint isi dari file tersebut.  
*(pake ekstensi filenya juga)*

Bisa di terminal, bisa juga di file `.sh`.

---

```sh
cat <file_name> | while read VARIABLE1 VARIABLE2
do
  <STATEMENTS>
done
```

Bikin perulangan buat tiap baris di isi filenya.  
Terus `read` itu biasanya buat nerima *input user* yg bakal disimpen di *variable*.  
<small>*(cek file catatan sebelumnya)*</small>.

> *There's a default IFS variable in bash. IFS stands for "Internal Field Separator"*.

Defaultnya buat pemisah perulangan itu *spaces, tab* sama *new lines*.  
Jadinya kode `while` di atas defaultnya bakal ngasih nilai:
- VARIABLE1: cuma satu kata pertama di baris itu
- VARIABLE2: semua sisa kata dari baris itu

```sh
cat courses.csv | while IFS="," read MAJOR COURSE
do
  echo $MAJOR
done
```

Itu contoh buat masukin tiap baris dari file `courses.csv` ke *variable* `MAJOR` sama `COURSE`, yang pemisah di tiap barisnya itu tanda koma `,`.

Kodenya ditulis di file `.sh`.

---

```sh
PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"
```

*(nama variablenya bebas)*

*Command* buat login ke PostgreSQL yg dipake di file `.sh`.  
`username`, `dbname` sama `-c` buat ngejalanin *single command* terus *exit*, sisanya cuma buat *formatting*.

Info tambahan dari *AI*:
- `-X` : Nonaktifkan file konfigurasi .psqlrc
- `--no-align` : Hilangkan format tabel
- `--tuples-only` : Hanya tampilkan nilai, tanpa header
- `-c` : Jalankan satu perintah lalu keluar

```sh
$($PSQL "<query_here>")
```

Buat ngejalanin *query database*nya.  
Kode di dalem kurung bakal dijalanin di *subshell*, proses *bash* terpisah.

---

```sql
TRUNCATE <table_name>
```

Buat ngehapus semua data di dalem *table*.  
Bisa masukin banyak *table* sekaligus, pisahin pake koma `,`.

```sql
TRUNCATE <table_name> CASCADE
```

Buat sekalian ngehapus data yang ada relasinya.

---

```bash
pg_dump --clean --create --inserts --username=username database_name > output_name.sql
```

Buat nge*dump* *database* jadi file `.sql`.  
Cek `pg_dump --help` buat info lainnya.

Contoh buat tutorial ini:

```bash
pg_dump --clean --create --inserts --username=freecodecamp students > students.sql
```

Tambahan info dari *AI*:
* `--clean` : Tambahkan perintah DROP sebelum CREATE
* `--create` : Tambahkan perintah CREATE DATABASE
* `--inserts` : Gunakan INSERT alih-alih COPY

---

```bash
psql -U connection_name < file_name.sql
```

Buat bikin ulang database.

Contoh buat tutorial ini:

```bash
psql -U postgres < students.sql
```
---

## Query PostgreSQL

### `LIKE` dan `NOT LIKE`

```sql
SELECT <columns> FROM <table_name> WHERE <columns> LIKE '<patterns>';
```

`LIKE` buat nampilin data pake *filter* pola tertentu.

- *Underscore* (`_`)

> `'_lgorithms'`

Bakal nyari yg ada kata "lgorithms" yg di depannya bebas satu karakter apa aja.  
Contoh hasil pencarian: "Algorithms", "Blgorithms", "Clgorithms"

Posisi `_` bebas disimpen di mana aja, tergantung mau bikin filter kayak gimana.

---

- Persen `%`

> `'%lgorithms'`

Bakal nyari yg ada kata "lgorithms" yg di depannya bebas apa aja.  
Contoh hasil pencarian: "Algorithms", "Data Structures and Algorithms"

Posisi `%` bebas disimpen di mana aja, tergantung mau bikin filter kayak gimana.

---

`NOT LIKE` buat nyari yg ga sesuai sama pola yg ditentuin.

`ILIKE` atau `NOT ILIKE` buat bikin polanya ga *case sensitive*.

---

### `NULL`

```sql
SELECT <columns> FROM <table_name> WHERE <column> IS NULL
```

`IS NULL` Buat nyari yg kolomnya kosong.

`IS NOT NULL` Buat nyari yg kolomnya ga kosong.

---

### `ORDER BY`

```sql
SELECT <columns> FROM <table_name> ORDER BY <column> <ASC/DESC>
```

Buat nampilin data sesuai urutan kolom tertentu, defaultnya *ascending*.  
Ditulis di paling akhir *query*nya. Kalo ada `LIMIT`, ditulis sebelum `LIMIT`.

Bisa juga ngurutin sesuai beberapa kolom.

```sql
SELECT * FROM students ORDER BY gpa DESC, first_name;
```

Itu buat ngurutin dari yg GPAnya terbesar terus namanya juga diurutin sesuai alfabet.  
Kolom yg pertama yg bakal jadi prioritas urutannya.

---

### `LIMIT`

```sql
SELECT <columns> FROM <table_name> LIMIT <number>
```

Buat ngebatasin jumlah data yang ditampilin.  
Ditulis di paling akhir *query*nya. Kalo ada `ORDER BY`, ditulis setelah `ORDER BY`.

---

### `MIN`

```sql
SELECT MIN (<column>) FROM <table>
```

Buat nampilin 1 data dengan nilai paling kecil di kolom tertentu.

---

### `MAX`

```sql
SELECT MAX (<column>) FROM <table>
```

Buat nampilin 1 data dengan nilai paling besar di kolom tertentu.

### `SUM`

```sql
SELECT SUM (<column>) FROM <table>
```

Buat nampilin 1 data hasil penjumlahan kolom tertentu

### `AVG`

```sql
SELECT AVG (<column>) FROM <table>
```

Buat nampilin 1 data hasil rata-rata kolom tertentu.

### `CEIL`

```sql
CEIL (<number_to_round>)
```

Buat ngebuletin angka ke atas.

### `FLOOR`

```sql
FLOOR (<number_to_round>)
```

Buat ngebuletin angka ke bawah.

### `ROUND`

```sql
ROUND (<number_to_round>)
```

Buat ngebuletin angka ke yang terdekat.

Tambahin angka di paramater kedua `ROUND`, (pisahin pake `,`) buat nentuin mau berapa angka di belakang koma (angka desimal).

Misal: `ROUND (38.1739130434782609, 5)` hasilnya `38.17391`. Kalo ga pake parameter kedua, hasilnya `38`.


### `COUNT`

```sql
COUNT(<column>)
```

Buat nampilih jumlah data di kolom tertentu, yg `NULL` ga bakal diitung.

Kalo buat jumlah data di table tertentu, pake `*`: `COUNT(*)`.

---

### `DISTINCT`

```sql
DISTINCT(<column>)
```

Buat nampilin semua data yg kolom tertentunya tanpa duplikat, masing-masing datanya ditampilin sekali aja.


### `GROUP BY`

```sql
SELECT <column> FROM <table> GROUP BY <column>;
```

Buat nampilin semua data yg kolom tertentunya tanpa duplikat.  
Sama kayak `DISTINCT`, bedanya `GROUP BY` bisa dipake bareng fungsi matematika (`MIN`, `MAX`, `COUNT`, dll).

```sql
SELECT major_id, COUNT (*) FROM students GROUP BY major_id;
```

Itu contoh buat nampilin semua `major_id` tanpa duplikat sama jumlah murid di masing-masing jurusannya.

```sql
SELECT <column> FROM <table> GROUP BY <column> HAVING <condition>;
```

`HAVING` di akhir itu mirip `if`, buat nampilin data yg sesuai kondisi tertentu.

---

### `AS`

```sql
SELECT <column> AS <new_column_name>
```

Buat nampilin kolom tertentu pake nama yg lain.  
Biasanya dipake buat ngenamain kolom hasil fungsi matematika (`MIN`, `MAX`, dll).

Buat *table* juga bisa.  
Biasanya buat dipake di `JOIN` biar nulis *query* referensi nama tablenya ga kepanjangan.

---

### `JOIN`

Buat ngegabungin data dari dua *table* yg punya relasi. 

```sql
SELECT * FROM <table_1> FULL JOIN <table_2> ON <table_1>.<foreign_key_column> = <table_2>.<foreign_key_column>;
```
 
`FULL JOIN` ngegabungin semua datanya, termasuk data yang ga ada penghubungnya.

Kalo *foreign key*nya `NULL` bakal ditampilin semua.

```sql
SELECT * FROM <table_1> LEFT JOIN <table_2> ON <table_1>.<foreign_key_column> = <table_2>.<foreign_key_column>;
```

`LEFT JOIN` ngegabungin semua data *table* kiri sama *table* kanan yg ada penghubungnya aja.

Kalo *foreign key* yg di *table* kanan `NULL`, ga bakal ditampilin.

```sql
SELECT * FROM <table_1> RIGHT JOIN <table_2> ON <table_1>.<foreign_key_column> = <table_2>.<foreign_key_column>;
```

`RIGHT JOIN` kebalikannya `LEFT JOIN`.

Kalo *foreign key* yg di *table* kiri `NULL`, ga bakal ditampilin.

```sql
SELECT * FROM <table_1> INNER JOIN <table_2> ON <table_1>.<foreign_key_column> = <table_2>.<foreign_key_column>;
```

`INNER JOIN` ngegabungin semua data dari dua *table* yang masing-masing punya penghubungnya.

Kalo *foreign key* yg di *table* kanan `NULL`, ga bakal ditampilin.  
Kalo *foreign key* yg di *table* kiri `NULL`, ga bakal ditampilin juga.  
Data dari kedua *table*nya harus ada penghubungnya.


```sql
SELECT DISTINCT (major) FROM majors LEFT JOIN students ON majors.major_id = students.major_id WHER
E student_id IS NULL;
```

Itu contoh buat nampilin semua nama jurusan yang ga ada muridnya.


```sql
SELECT * FROM <table_1> FULL JOIN <table_2> USING (<column>);
```

Kalo nama kolom *foreign key* di kedua *table*nya sama, bisa pake `USING`.  
Bisa buat semua `JOIN`.

```sql
SELECT * FROM <table_1> FULL JOIN <table_2> USING (<column>) FULL JOIN <table_3> USING (<column>);
```

Buat ngegabungin lebih dari dua *table*.  
Pake `ON` jg bisa kalo misal nama *foreign_key*nya beda.  
Bisa buat semua `JOIN` juga.

Proses ngegabunginnya berurutan. Semua *tables* yg udh digabung jadi *table* kiri.  
Contoh proses ngegabunginnya di balik layar:
1. A + B + C + D  
2. AB + C + D
3. ABC + D
4. ABCD

---

## Database dan Table

### Database

`students`

---

### Table

#### 1. `students`

| Column | Type | Collation | Nullable | Default|
|--------|------|-----------|----------|--------|
| student_id | integer |   | not null | nextval('students_student_id_seq'::regclass) |
| first_name | character varying(50) |   | not null |   |
| last_name | character varying(50) |   | not null |   |
| major_id | integer |   |   |   |
| gpa | numeric(2,1) |   |   |   |

Indexes:
- "students_pkey" PRIMARY KEY, btree (student_id)

Foreign-key constraints:
- "students_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)

---

#### 2. `majors`

| Column | Type | Collation | Nullable | Default|
|--------|------|-----------|----------|--------|
| major_id | integer |   | not null | nextval('majors_major_id_seq'::regclass) |
| major | character varying(50) |   | not null |   |

Indexes:
- "majors_pkey" PRIMARY KEY, btree (major_id)

Referenced by:
- TABLE "majors_courses" CONSTRAINT "majors_courses_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)
- TABLE "students" CONSTRAINT "students_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)

---

#### 3. `courses`

| Column | Type | Collation | Nullable | Default|
|--------|------|-----------|----------|--------|
| course_id | integer |   | not null | nextval('courses_course_id_seq'::regclass) |
| course | character varying(100) |   | not null |   |

Indexes:
- "courses_pkey" PRIMARY KEY, btree (course_id)

Referenced by:
- TABLE "majors_courses" CONSTRAINT "majors_courses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(course_id)

---

#### 4. `majors_courses`

(junction/pivot table)

| Column | Type | Collation | Nullable | Default|
|--------|------|-----------|----------|--------|
| major_id | integer |   |   |   |
| course_id | integer |   |   |   |

Indexes:
- "majors_courses_pkey" PRIMARY KEY, btree (major_id, course_id)

Foreign-key constraints:
- "majors_courses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(course_id)
- "majors_courses_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)

---

## Program Bash

### 1. `insert_data.sh`

Program buat otomatis masukin data dari file `.csv` ke table.

Awalnya pake file test dulu biar cepet, ga ngebaca semua isi filenya, beberapa baris aja.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")

cat courses.csv | while IFS="," read MAJOR COURSE
do
  # ngebuang baris pertama (judul kolom)
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors (major) VALUES ('$MAJOR')")

      if [[ $INSERT_MAJOR_RESULT == 'INSERT 0 1' ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses (course) VALUES ('$COURSE')")

      if [[ $INSERT_COURSE_RESULT == 'INSERT 0 1' ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
    INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses (major_id, course_id) VALUES ($MAJOR_ID, $COURSE_ID)")

    if [[ $INSERT_MAJORS_COURSES_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into majors_courses, $MAJOR : $COURSE
    fi
  fi
done


cat students.csv | while IFS="," read FIRST LAST MAJOR GPA
do
  # ngebuang baris pertama (judul kolom)
  if [[ $FIRST != first_name ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # set to null
      MAJOR_ID=null
    fi

    # insert student
    INSERT_STUDENT_RESULT=$($PSQL "INSERT INTO students (first_name, last_name, major_id, gpa) VALUES ('$FIRST', '$LAST', $MAJOR_ID, $GPA)")

    if [[ $INSERT_STUDENT_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into students, $FIRST $LAST
    fi
  fi
done

# Kalo ada yg ga ngerti, cek lagi pake help. Misal help test.
```

---

### `student_info.sh`

Program buat nampilin data dari database.

Latihan macem-macem *query*

```sh
#!/bin/bash

# Info about my computer science students from students database

echo -e "\n~~ My Computer Science Students ~~\n"

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"


echo -e "\nFirst name, last name, and GPA of students with a 4.0 GPA:"

echo "$($PSQL "
  SELECT first_name, last_name, gpa
  FROM students
  WHERE gpa = 4.0
")"


echo -e "\nAll course names whose first letter is before 'D' in the alphabet:"

echo "$($PSQL "
  SELECT course
  FROM courses
  WHERE course < 'D'
")"


echo -e "\nFirst name, last name, and GPA of students whose last name begins with an 'R' or after and have a GPA greater than 3.8 or less than 2.0:"

echo "$($PSQL "
  SELECT first_name, last_name, gpa
  FROM students
  WHERE last_name >= 'R' AND (gpa > 3.8 OR gpa < 2.0)
")"
# ORnya di dalem grup sendiri


echo -e "\nLast name of students whose last name contains a case insensitive 'sa' or have an 'r' as the second to last letter:"

echo "$($PSQL "
  SELECT last_name
  FROM students
  WHERE last_name ILIKE '%sa%' OR last_name LIKE '%r_'
")"

# hasilnya:
: '
Gilbert
Savage
Saunders
Hilpert
Hassanah
'


echo -e "\nFirst name, last name, and GPA of students who have not selected a major and either their first name begins with 'D' or they have a GPA greater than 3.0:"

echo "$($PSQL "
  SELECT first_name, last_name, gpa
  FROM students
  WHERE major_id IS NULL AND (first_name LIKE 'D%' OR gpa > 3.0)
")"

# hasilnya:
: '
Noe|Savage|3.6
Danh|Nhung|2.4
Hugo|Duran|3.8
'


echo -e "\nCourse name of the first five courses, in reverse alphabetical order, that have an 'e' as the second letter or end with an 's':"

echo "$($PSQL "
  SELECT course
  FROM courses
  WHERE course LIKE '_e%' OR course LIKE '%s'
  ORDER BY course DESC LIMIT 5
")"


echo -e "\nAverage GPA of all students rounded to two decimal places:"

echo "$($PSQL "
  SELECT ROUND (AVG (gpa), 2)
  FROM students
")"


echo -e "\nMajor ID, total number of students in a column named 'number_of_students', and average GPA rounded to two decimal places in a column name 'average_gpa', for each major ID in the students table having a student count greater than 1:"

echo "$($PSQL "
  SELECT
    major_id, COUNT (*) AS number_of_students,
    ROUND (AVG (gpa), 2) AS average_gpa
  FROM students
  GROUP BY major_id
  HAVING COUNT (*) > 1
")"


echo -e "\nList of majors, in alphabetical order, that either no student is taking or has a student whose first name contains a case insensitive 'ma':"

echo "$($PSQL "
  SELECT major
  FROM majors
  LEFT JOIN students ON majors.major_id = students.major_id
  WHERE student_id IS NULL OR first_name ILIKE '%ma%'
  ORDER BY major
")"


echo -e "\nList of unique courses, in reverse alphabetical order, that no student or 'Obie Hilpert' is taking:"

echo "$($PSQL "
  SELECT DISTINCT (course)
  FROM students
  FULL JOIN majors USING (major_id)
  FULL JOIN majors_courses USING (major_id)
  FULL JOIN courses USING (course_id)
  WHERE student_id IS NULL
    OR (first_name = 'Obie' AND last_name = 'Hilpert')
  ORDER BY course DESC
")"


echo -e "\nList of courses, in alphabetical order, with only one student enrolled:"

echo "$($PSQL "
  SELECT course
  FROM students
  FULL JOIN majors USING (major_id)
  FULL JOIN majors_courses USING (major_id)
  FULL JOIN courses USING (course_id)
  GROUP BY course
  HAVING COUNT (student_id) = 1
  ORDER BY course
")"
```

---

## Daftar Fungsi *Aggregate* di PostgreSQL

| Fungsi                  | Kategori   | Keterangan                                              | Contoh                                                              |
| ----------------------- | ---------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| `SUM(expr)`             | Matematika | Menjumlahkan semua nilai numerik                        | `SELECT SUM(gpa) FROM students;`                                    |
| `AVG(expr)`             | Matematika | Menghitung rata-rata                                    | `SELECT AVG(gpa) FROM students;`                                    |
| `MIN(expr)`             | Matematika | Nilai terkecil dalam grup                               | `SELECT MIN(gpa) FROM students;`                                    |
| `MAX(expr)`             | Matematika | Nilai terbesar dalam grup                               | `SELECT MAX(gpa) FROM students;`                                    |
| `COUNT(expr)`           | Statistik  | Menghitung jumlah baris (non-NULL untuk kolom tertentu) | `SELECT COUNT(major_id) FROM students;`                             |
| `COUNT(*)`              | Statistik  | Menghitung semua baris termasuk yang NULL               | `SELECT COUNT(*) FROM students;`                                    |
| `STDDEV(expr)`          | Statistik  | Standar deviasi                                         | `SELECT STDDEV(gpa) FROM students;`                                 |
| `VARIANCE(expr)`        | Statistik  | Variansi data                                           | `SELECT VARIANCE(gpa) FROM students;`                               |
| `STRING_AGG(expr, sep)` | String     | Menggabungkan string dalam satu grup                    | `SELECT STRING_AGG(course, ', ') FROM courses;`                     |
| `ARRAY_AGG(expr)`       | Array      | Menghasilkan array dari kumpulan nilai                  | `SELECT ARRAY_AGG(course) FROM courses;`                            |
| `BOOL_AND(expr)`        | Boolean    | TRUE jika semua nilai benar                             | `SELECT BOOL_AND(passed) FROM results;`                             |
| `BOOL_OR(expr)`         | Boolean    | TRUE jika salah satu nilai benar                        | `SELECT BOOL_OR(passed) FROM results;`                              |
| `JSON_AGG(expr)`        | JSON       | Menggabungkan nilai menjadi array JSON                  | `SELECT JSON_AGG(row_to_json(students)) FROM students;`             |
| `XMLAGG(expr)`          | XML        | Menggabungkan nilai menjadi XML                         | `SELECT XMLAGG(XMLELEMENT(name course, course_name)) FROM courses;` |


💡 Tips Penting:
- Hampir semua fungsi agregat mengabaikan `NULL` (kecuali `COUNT(*)`).
- Sering digunakan bersama `GROUP BY` untuk menghitung per kategori.
- PostgreSQL punya agregat khusus *string*, *array*, dan *JSON* yang nggak ada di semua *RDBMS*.
