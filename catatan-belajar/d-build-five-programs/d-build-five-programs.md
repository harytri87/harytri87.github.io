# Learn Bash Scripting by Building Five Programs

Belajar lagi *terminal commands* dan cara pakenya di dalem *bash script*.

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-bash-scripting-by-building-five-programs/build-five-programs) dari [freeCodeCamp](https://www.freecodecamp.org/)

---

## Daftar Isi

1. [Commands Umum](#commands-umum)
2. [Commands Buat Bikin Program](#commands-buat-bikin-program)
    - [Variable](#variable)
    - [Komentar](#komentar)
    - [Arguments/Parameters](#arguments-parameters)
    - [Percabangan](#percabangan)
    - [Perulangan](#perulangan)
    - [Scripts dan Exit Status](#scripts-exit-status)
    - [Perhitungan](#perhitungan)
    - [Array](#array)
    - [Fungsi](#fungsi)
3. [Isi File Program-Programnya](#isi-file-program-programnya)
    - [`questionnaire.sh`](#questionnairesh)
    - [`countdown.sh`](#countdownsh)
    - [`bingo.sh`](#bingosh)
    - [`fortune.sh`](#fortunesh)
    - [`five.sh`](#fivesh)

---

## *Commands* Umum

```bash
sh <file_name>.sh
```

Buat jalanin *bash script* yg disimpen dalem bentuk file `.sh` pake `shell` *interpreter*.



```bash
bash <file_name>.sh
```

Buat jalanin *bash script* yg disimpen dalem bentuk file `.sh` pake `bash` *interpreter*.  
`bash` = `bourne-again shell`.

---

```bash
which bash
```

Buat nampilin lokasi `bash` *interpreter*.



```bash
#!<path_to_interpreter>
```

Dipake di file `.sh` buat ngasih tau biar selalu pake *interpreter* tertentu.  
Nambahin lokasi *interpreter* gitu disebutnya `shebang`.

Contoh:
1. `which bash` ngehasilin: "/usr/bin/bash"
2. `shebang`nya: `#!/bin/bash`
3. Tulis di baris awal / paling atas file `.sh`

Udah gitu file `.sh`nya bisa langsung dijalanin, tinggal ketik nama filenya (pake ekstensi `.sh`) terus pencet enter.  
Kalo ga bisa dijalanin gara-gara *"Permission denied"*, bisa cek dulu hak aksesnya:

```bash
ls -l
```

Buat nampilin daftar isi folder versi panjang (ada info lengkap).

Di samping filenya ada info soal hak aksesnya, misal: `-rw-r--r--`.  
`r` buat `read`, `w` buat `write`, `x` buat `execute`.  
Tiap `-` itu pemisah buat tingkatan pengguna, peran kayak admin, dll gitu.

```bash
chmod +x <file_name>.sh
```

Buat ngasih hak akses `execute`.  
Masukin nama filenya lengkap sama ekstensinya.

Coba jalanin lagi filenya, ngetik nama filenya terus enter. Misal: `./questionnaire.sh`

---

```bash
man <command>
```

Buat liat info soal *command*, singkatan dari *"manual"*.  
Kayak `--help`, cuma ada beberapa *command* yg ga bisa pake itu, misal `echo --help` malah bener nampilin "--help".

---

```bash
echo -e "Something is here \n and here"
```

Buat nampilin/nge*print* yg ada baris kosong (`\n`) harus pake `-e` sama dibungkus kutip dua.  
Cek lagi aja info tentang `echo`.

---

```bash
ctrl+c
```

Buat nutup program yg lagi jalan. *(pencet keyboard ya, bukan ngetik)*

---

```bash
help
```

Buat liat semua *list commands*nya.

```bash
help <command>
```

Buat liat info *command* tertentu kalo di `man <command>` ga ada.

```bash
ls /
```

Buat liat daftar yg ada di *root file system*nya.

```bash
ls /bin
```

Buat liat lengkapnya kalo di `help` ga nemu apa yg kita butuhin/cari. Singkatan dari *"binary"*.


```bash
help let
```

Buat liat info soal perhitungan aritmatika

---

```bash
printenv
```

Buat liat *environment variables* dari Shell.

---

```bash
declare -p
```

Buat nampilin semua *variables*. `-p` singkatan dari *"print"*.

```bash
declare -p VARIABLE
```

Buat nampilin nilai *variable* tersebut.

`declare` bisa buat bikin *variable* juga. Cek aja infonya.

---

```bash
type <command>
```

Buat liat *command* itu tipenya apa.

```bash
type echo
echo is a shell builtin
```

```bash
type if
if is a shell keyword
```

```bash
type bash
bash is /usr/bin/bash
```



---

## *Commands* Buat Bikin Program

Ini *commands* yg cara kerjanya kayak bahasa pemrograman lain, bisa langsung di terminal bisa juga ditulis di file `.sh` buat nanti dijalanin/*execute* pake *shell* (`sh`), *bash* (`bash`) atau *interpreter* lain.

### *Variable*

```bash
VARIABLE=VALUE
```

Buat bikin *variable*. Ga boleh ada spasi, kalo ada spasi harus pake tanda kutip dua.  
Pake `$` buat pake *variable*nya, misal: `echo $VARIABLE`.

Inget, *script*nya jalan dari atas ke bawah, jd cuma bisa pake/manggil *variable* di bawah deklarasi *variable*nya.

---

```bash
read VARIABLE
```

Buat nerima *user input* dan nyimpen di *variable* itu. Terus *variable* itu bisa dipake/dipanggil kayak *variable* biasa.

---

### Komentar

```bash
# <comment>
```

Buat bikin komen di dalem file `.sh`, pake tanda pager.  
`shebang` pake tanda pager di awalnya tp itu khusus, ga dianggap komen.


```bash
: '
  comment here
  more comment here
'
```

Buat komen beberapa baris sekaligus.

---

### *Arguments/Parameters*

```bash
echo $*
```

Buat nerima *arguments/parameter*.  
Salah satu cara ngirim *argument*nya tambahin di akhir *command* yg buat ngelajalin file `.sh`, pisahin pake spasi.  
Misal: `./countdown.sh arg1 arg2 arg3`


```bash
echo $<number>
```

Buat nerima *arguments/parameter* tertentu aja.  
Misal `echo $1` buat nerima *argumen* pertama doang.

---

### Percabangan

```bash
if [[ CONDITION ]]
then
  STATEMENTS
elif [[ CONDITION ]]
then
  STATEMENTS
else
  STATEMENTS
fi
```

Buat percabangan. Harus ada spasi di dalem kurung kotaknya.  
Buat nutup `if`nya pake `fi`, kebalikan dari "if".

Kondisi:
- `!`
- `&&`
- `||`
- `==`
- `!=`

Khusus buat angka:
- `-eq`: *equal*
- `-ne`: *not-equal*
- `-lt`: *less-than*
- `-le`: *less-than-or-equal*
- `-gt`: *greater-than*
- `-ge`: *greater-than-or-equal*

Ada yg buat file juga.

cek lengkapnya:
- `help [[ expression ]]`
- `help test`



`if` bisa juga pake dua tanda kurung `(( ... ))`. Tapi jadinya pake operator kayak di bahasa lain:
- `<=`, `>=`, `<`, `>`: perbandingan
- `==`, `!=`: samadengan, tidak samadengan

---

### Perulangan

```bash
for (( i = 10; i > 0; i-- ))
do
  echo $i
done
```

Buat perulangan, ya kayak `for` di bahasa lain.

---

```bash
while [[ CONDITION ]]
do
  STATEMENTS
done
```

Buat perulangan pake `while`.

---

### *Scripts* dan *Exit Status*

***Script commands* bisa dijalanin langsung di terminal juga, selain di file `.sh`.**

Misal: `[[4 -le 5 ]]`

Pas dipencet enter ga ngeluarin apa-apa.

Buat liat hasilnya, setiap *command* punya *exit status*, `$?` buat ngakses *exit status* dari *command* terakhir.  
Misal: `echo $?`

*Exit status* `0` itu *true*, kalo `1` itu *false*.  
Sebenernya tuh kalo `0` berarti ga ada *error*.  
Kalo ada *error* bakal muncul angka lain tergantung *error*nya apa.

**Buat jalanin lebih dari satu *command* di baris yang sama, pisahin pake titik koma `;`.**

Buat liat *exit status* lain, coba ketik terus pencet enter di terminal:
- `bad_command; echo $?`
- `ls; echo $?`
- `ls -y; echo $?`

---

```bash
until [[ CONDITION ]]
do
  STATEMENTS
done
```

Buat jalanin perulangan sampe kondisinya terpenuhi. *Mirip `while`*?

---

### Perhitungan

```bash
(( ... ))
```

Buat ngejalanin perhitungan. Misal `(( 1 + 1 ))`.  
Kalo ngetik gitu di terminal langsung enter ga bakal muncul apa-apa,
cuma ngejalanin perhitungannya doang.

```bash
echo $(( ... ))
```

Pake `echo $` di depan biar sekalian nampilin hasilnya.  
Tapi kalo perhitungannya ada yg pake *variable*, nilai *variable* aslinya ga bakal berubah.  
Cuma ngitung terus tampilin hasilnya, *variable* asli kayak ga disentuh.

Misal `A=2`, terus `echo (( $A + 2 ))` hasilnya `4`.  
*Variable* `A` tetep `2`.

Awalnya bingung, tp ya emang masuk akal sih.  
Mungkin gara-gara keinget di bahasa lain `A = A + 2` gitu ya jadi nilai *variable* `A`nya berubah.

Dan ya kalo mau ngitung sekalian ngubah *variable* `A`, sama aja kayak di bahasa lain:

```bash
VARIABLE=$(( VARIABLE ... ))
```

Oh iya, perhitungan pake `$(( ... ))` itu dijalaninnya di *subshell*,
terpisah dari *shell* utama.

---

### Array

```bash
VARIABLE=(val1 val2 val3)
```

Buat bikin *array*.
- Pemisahnya cuma spasi
- Kalo *string* pake kutip dua

```bash
echo ${VARIABLE[index]}
```

Buat nampilin nilai *index* tersebut dari *array*nya.  
Misal: `echo ${ARR[1]}` buat nampilin *index* kedua dari *variable* `ARR`.

```bash
echo ${VARIABLE[*]}` atau `echo ${VARIABLE[@]}
```

Buat nampilin semua nilai yg ada di *array* tersebut.

---

### Fungsi

```bash
FUNCTION_NAME() {
  STATEMENTS
}
```

Buat bikin fungsi.

```bash
FUNCTION_NAME
```

Buat manggil fungsinya.

```bash
FUNCTION_NAME arg1 arg2 arg
```

Buat manggil sekalian ngirim *arguments/parameter* ke fungsinya.

Bedanya sama bahasa lain, di sini kalo butuh argumen ga usah nyantumin nama argumen pas bikin fungsinya.  
Tetep tanda kurung kosong aja, `FUNCTION_NAME() { ... }`.

Nah, cara pake argumen di dalem fungsinya pake `$<angka>`.  
Angka itu posisi argumennya, dimulai dari 1

---






## Isi File Program-Programnya

### `questionnaire.sh`

```sh
#!/bin/bash
# ini shebang buat ngasih tau biar dijalanin pake bash interpreter

echo -e "\n~~ Questionnaire ~~\n"

QUESTION1="What's your name?"
echo $QUESTION1
read NAME

QUESTION2="Where are you from?"
echo $QUESTION2
read LOCATION

QUESTION3="What's your favorite coding website?"
echo $QUESTION3
read WEBSITE

echo -e "\nHello $NAME from $LOCATION. I learned that your favorite coding website is $WEBSITE!"
```

---

### `countdown.sh`

```sh
#!/bin/bash

# Program that counts down to zero from a given argument

echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then

  : '
  for (( i = $1; i > 0; i-- ))
  do
    echo $i
    sleep 1
  done

  if [[ $i -eq 0 ]]
  then
    echo 0
  fi
  '

  I=$1
  while [[ $I -ge 0 ]]
  do
    echo $I
    (( I-- ))
    sleep 1
  done

else
  echo Include a positive integer as the first argument.
fi
```

Cara jalanin programnya sekalian masukin argumen buat angka mulainya hitung mundur:  
`./countdown.sh 10`  
Bakal ngitung mundur dari 10 sampe 0.

---

### `bingo.sh`

Pake macem-macem `if` buat contoh & belajar.

Kalo pake dua tanda kurung biasa, *variable*nya ga usah pake `$`.

```sh
#!/bin/bash

# Bingo Number Generator

echo -e "\n~~ Bingo Number Generator ~~\n"

NUMBER=$(( RANDOM % 75 + 1 ))
TEXT="The next number is, "

if (( NUMBER <= 15 ))
then
  echo $TEXT B:$NUMBER
elif [[ $NUMBER -le 30 ]]
then
  echo $TEXT I:$NUMBER
elif (( NUMBER < 46 ))
then
  echo $TEXT N:$NUMBER
elif [[ $NUMBER -lt 61 ]]
then
  echo $TEXT G:$NUMBER
else
  echo $TEXT O:$NUMBER
fi
```

---

### `fortune.sh`

```sh
#!/bin/bash

# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

N=$(( RANDOM % 6 ))

GET_FORTUNE() {
  if [[ ! $1 ]]   # ngecek ada argumen yg dikirim ga
  then
    echo "Ask a yes or no question:"
  else
    echo "Try again. Make sure it ends with a question mark:"
  fi

  read QUESTION
}

GET_FORTUNE

until [[ $QUESTION =~ ^.+\?$ ]]   # regex buat minimal 1 karakter dan akhiran tanda tanya (?)
do
  GET_FORTUNE again
  # argumen yg dikirimnya bebas, soalnya di fungsinya cuma ngecek ada argumen atau ga
done

echo ""

echo ${RESPONSES[$N]}
```

---

### `five.sh`

```sh
#!/bin/bash

# Program to run my other four programs

./questionnaire.sh
./countdown.sh 3
./bingo.sh
./fortune.sh
```
