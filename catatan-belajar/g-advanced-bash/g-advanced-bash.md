# Learn Advanced Bash by Building a Kitty Ipsum Translator

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-advanced-bash-by-building-a-kitty-ipsum-translator/build-a-kitty-ipsum-translator) dari [freeCodeCamp](https://www.freecodecamp.org/)


Belajar soal Bash *commands* lebih rinci/dalam.

Dari sananya ada dua file:
- [kitty_ipsum_1.txt](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/g-advanced-bash/kitty_ipsum_1.txt)
- [kitty_ipsum_2.txt](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/g-advanced-bash/kitty_ipsum_2.txt)

---

## Daftar Isi

1. [Commands](#commands)
    - [`echo`](#echo)
    - [Terminal Output & Input](#terminal-output--input)
      - [Output](#output)
      - [Input](#input)
      - [Contoh Pemakaian Input & Output](#contoh-pemakaian-input--output)
    - [`wc`](#wc)
    - [`grep`](#grep)
    - [`sed`](#sed)
    - [`diff`](#diff)
2. [Latihan Commands di Atas](#latihan-commands-di-atas)
    - [Bikin `kitty_info.txt`](#bikin-kitty-infotxt)
    - [Bikin `translate.sh`](#bikin-translatesh)

---

## Commands

### `echo`

```bash
`echo text >> <file_name>`
```

Buat ngeprint tulisan ke dalem file. Jgn lupa ekstensi filenya juga.  
Contoh: `echo hello bash >> stdout.md`

Satu `>` bakal nimpa isi filenya.  
Dua `>>` bakal nambahin tulisan ke filenya (tanpa nimpa isi sebelumnya).

Dua-duanya bisa dipake buat sekalian bikin file baru kalo filenya belum ada.

```bash
> <file_name>
```

Bakal ngosongin isi filenya.

---

### Terminal Output & Input

#### Output

Kalo kita ngejalanin *command*, hasilnya bakal kebagi dua jenis:
- `stdout` (*standard out*)  
  pas *command* sukses, hasil normal tanpa error.

- `stderr` (*standard error*)  
  pas *command* error, hasil notifikasi error.

Misal:

*command* `echo hello world` bakal ngehasilin `stdout`: `hello world`.

*command* `bad_command` bakal ngehasilin `stderr`: `bash: bad_command: command not found`.

```bash
<command> 2> <file_name>
```

`2>` buat *redirect* hasil `stderr` ke dalem file.

`1>` buat *redirect* hasil `stdout` ke dalem file.

Sama kayak yg nulis ke dalem file,  
satu `>` berarti nimpa isinya,  
dua `>>` berarti *append*

---

#### Input

Ada juga `stdin` (*standard in*) buat *input*.

Misal *command* `read` itu normalnya nerima *input* dari keyboard (hasil ketik user).  
Pake `<` buat nge*redirect* nyari inputnya dari file, bukan keyboard.

Pake tiga `<<<` buat input dari string.

```bash
<command> < <filename_for_stdin>
```

Asalnya `read` bakal nunggu sampe *user* ngetik & pencet enter.  
Kalo pake itu jadinya bakal ngambil input dari isi filenya.

```bash
<command_1> | <command_2>
```

`stdin` juga bisa ngambil input dari `stdout` *command* lain pake `|` (*pipe*).  
Di contoh atas itu `stdout` dari `command_1` bakal jadi *input*/`stdin` buat `command_2`.

Contoh:

```bash
echo Dadang | read NAME
```

Tapi di contoh itu pas dicoba nge*print* *variable* `NAME`,
hasilnya bukan `Dadang`, ga keubah nilai *variable*nya.

Soalnya pas ngejalanin *command* pake `|` (*pipe*) itu,
*command*nya bakal jalan di *subshell* atau *subprocess*.
Jadi *variable* `NAMA=Dadang` itu kesimpennya di sana.

---

`cat` juga salah satu *command* buat *input*.

Singkatan dari *concatenate* tapi lebih sering dipake buat nampilin isi file.

```bash
cat <file_name>
```

atau

```bash
cat < <file_name>
```

Dua *command* di atas bakal nge*print* isi filenya.

```bash
echo Dadang | cat
```

Bakal langsung nge*print* `Dadang`.

---

#### Contoh Pemakaian Input & Output

Ada file:

1. `stdout.txt`  
  File kosong

2. `stderr.txt`  
  File kosong

3. `name.txt`  
  Isinya 1 baris tulisan: "freeCodeCamp"

4. `script.sh`

```bash
#!/bin/bash

read NAME
echo Hello $NAME
bad_command
```

---

Ketik & jalanin di terminal:

```bash
./script.sh
```

Hasilnya:
1. Bakal nunggu *input* keyboard buat `NAME`
2. Selesai *user* *input* (misal Dadang), (di terminal) bakal ngehasilin:
  ```
  Hello Dadang
  ./script.sh: line 5: bad_command: command not found
  ```

- `stdin`: *input* keyboard
- `stdout`: `Hello Dadang`
- `stderr`: `./script.sh: line 5: bad_command: command not found`

---

```bash
echo Dadang | ./script.sh
```

Bakal langsung ngeluarin hasil kayak di contoh sebelumnya,
ga bakal nunggu *input* keyboard.

Jadi `stdin` / ngambil *input* dari `stdout`nya *command* `echo Dadang`

---

```bash
echo Dadang | ./script.sh 2> stderr.txt
```
Hasilnya:
1. Nge*print* `Hello Dadang` di terminal
2. *Redirect error*nya ke file `stderr.txt`  
  `./script.sh: line 5: bad_command: command not found`

---

```bash
echo Dadang | ./script.sh 2> stderr.txt > stdout.txt
```

Hasilnya:
1. *Redirect output*nya ke file `stdout.txt`
  `Hello Dadang`
2. *Redirect error*nya ke file `stderr.txt`  
  `./script.sh: line 5: bad_command: command not found`

Ga muncul apa-apa di terminalnya.

---

```bash
./script.sh < name.txt
```

Hasilnya:
1. *Redirect* sumber *input* dari `name.txt`
2. Di terminal muncul:
  ```
  Hello freeCodeCamp
  ./script.sh: line 5: bad_command: command not found
  ```

---

```bash
./script.sh < name.txt 2> stderr.txt
```

Hasilnya:
1. *Redirect* sumber *input* dari `name.txt`
2. Nge*print* `Hello freeCodeCamp` di terminal
3. *Redirect error*nya ke file `stderr.txt`  
  `./script.sh: line 5: bad_command: command not found`

---

```bash
./script.sh < name.txt 2> stderr.txt > stdout.txt
```

Hasilnya:
1. *Redirect* sumber *input* dari `name.txt`
2. *Redirect output*nya ke file `stdout.txt`
  `Hello Dadang`
3. *Redirect error*nya ke file `stderr.txt`  
  `./script.sh: line 5: bad_command: command not found`

Ga muncul apa-apa di terminalnya.

---

> Oh iya, semua contoh di atas buat *redirect `stdout`*nya pake `>` doang,
> bisa juga pake `1>` kok.
> 
> Terus kalo pake `>>`/`2>>`/`1>>` jadinya *append*, bukan nimpa isi filenya.

---

### `wc`

Singkatan dari "*word count*".

Nampilin info soal isi file:
- jumlah baris
- jumlah kata
- jumlah bytes

Info lengkapnya cek `man wc` atau `wc --help`

---

### `grep`

```bash
grep '<pattern>' <filename>
```

Buat nyari sesuai *pattern*.

*Default*nya *pattern* itu regex.

Info lengkapnya cek `man grep` atau `grep --help`

Contoh:

```bash
grep -n --color meow[a-z]* kitty_ipsum_1.txt
```

Hasilnya:
1. Nge*print* semua baris yg ada kata "meow" atau kata apapun yg depannya "meow"
2. `-n` nge*print*/nunjukin barisnya itu baris ke berapa.
3. `--color` ngewarnain yg sesuai polanya  
  Kalo sesuai file `kitty_ipsum_1.txt`, yg bakal diwarnain itu "meow" sama "meowzer"

---

### `sed`

```bash
sed 's/<pattern_to_replace>/<text_to_replace_it_with>/' <filename>
```

Buat ngubah teks.

*Default*nya:
- Ga bakal ngubah langsung isi filenya, cuma `stdout` nampilin hasilnya ke terminal.
- *Case sensitive*
- Kalo ga nemu *pattern*nya, `stdout`nya nampilin isi filenya ke terminal.

```bash
sed 's/free/f233/' name.txt
```

Ngubah "free" jadi "f233". Hasil `stdout` ke terminalnya: "f233CodeCamp".

> *Konteks: `name.txt` isinya 1 baris tulisan: "freeCodeCamp"*

Bisa tambahin flag setelah `/` terakhir:
- `g`: *global*, buat ngubah semua yg sesuai *pattern*
- `i`: biar jadi *non-case sensitive*

---

```bash
sed 's/<pattern_1>/<replacement_1>/; s/<pattern_2>/<replacement_2>/'
```

`sed` bisa ngubah banyak *pattern* sekaligus.<br/>
Pake `;` buat pemisahnya.

---

**Tentang REGEX**

Regex di semua bahasa hampir sama. Jadi ga bakal nulis rinciannya buat catatan ini.<br/>
Di catatan belajar JavaScript juga ada yg khusus ngejelasin soal regex.

Paling yg baru tuh:

- `grep` sama `sed` pake flag `-E` buat *Extended Regular Expressions*.<br/>
  Normalnya di bash/shell kalo mau pake simbol/karakter buat regex tertentu, harus di-*escape*.<br/>
  `?`, `+`, `|`, `()` dll<br/>
  `a|b` **tanpa** *extended* regex bakal nyari "a|b"<br/>
  `a\|b` **tanpa** *extended* regex bakal nyari "a" atau "b"<br/>
  `a|b` **pake** *extended* regex bakal nyari "a" atau "b"

- *Backreference* dari hasil *grouping* `( ... )`

---

**Contoh *Backreference***

```bash
grep -n meow[a-z]* kitty_ipsum_1.txt | sed -E 's/([0-9]+).*/\1/'
```

Output dari `grep`:

> 1:hide from vacuum cleaner meow for catnip and act crazy steal  
> 4:shirt howl or gimme attention meow bye and eat grass, meow, and  
> 10:i stare at it i meow at it i do a wiggle come here birdy ears  
> 22:eat sniff catnip meow meowzer. good morning sunshine. lick human chase  
> 23:the pig around the house meow run in circles. always ensure to

Terus sama `sed`:

1. `([0-9]+)`: Cari semua angka pake *group*
2. `.*`: Cari apapun setelah *group* angka itu.<br/>
  Hasil regex yg dipake `sed` di atas ya jadi sama aja kayak hasil `grep` di atas
3. Semua hasilnya itu diganti jadi angka yg di dalem *group* pake *backreference* `\1`.<br/>
  > 1  
  > 4  
  > 10  
  > 22  
  > 23

Kalo di regexnya ada lebih dari satu *group*, tinggal pake urutannya aja.<br/>
`\1`, `\2`, `\3` dan seterusnya.

---

### `diff`

```bash
diff <file_1> <file_2>
```

Buat ngeliat perbedaan antara dua file.<br/>
Nampilin tiap baris yang beda.

---

## Latihan Commands di Atas

### Bikin `kitty_info.txt`

Jalanin *commands* di bawah ini satu-satu (berurutan) di terminal:  
(*buat belajar, di sini pake beberapa cara yg beda buat ngehasilin hasil yg sama*)

```bash
echo "~~ kitty_ipsum_1.txt info ~~" > kitty_info.txt

echo -e "\nNumber of lines:" >> kitty_info.txt

# referensi pertama
cat kitty_ipsum_1.txt | wc -l >> kitty_info.txt
# stdout (hasil) command cat disalurin (pipe) jadi stdin (input) buat command wc
# terus stdout command wc itu diprint ke file 

echo -e "\nNumber of words:" >> kitty_info.txt

cat kitty_ipsum_1.txt | wc -w >> kitty_info.txt

echo -e "\nNumber of characters:" >> kitty_info.txt

# referensi kedua
wc -m < kitty_ipsum_1.txt >> kitty_info.txt
# file kitty_ipsum_1.txt jadi stdin buat command wc
# terus stdout command wc itu diprint ke file kitty_info.txt

echo -e "\nNumber of times meow or meowzer appears:" >> kitty_info.txt

grep -o meow[a-z]* kitty_ipsum_1.txt | wc -l >> kitty_info.txt
# grep ga ada buat ngitung jumlah yg cocok sama patternnya
# jadi pake flag -o buat misahin ke masing2 baris
# terus pake wc -l buat ngitung jumlah barisnya

echo -e "\nLines that they appear on:"

grep -n meow[a-z]* kitty_ipsum_1.txt | sed -E 's/([0-9]+).*/\1/' >> kitty_info.txt

echo -e "\nNumber of times cat, cats, or catnip appears:"

grep -o cat[a-z]* kitty_ipsum_1.txt | wc -l >> kitty_info.txt

echo -e "\nLines that they appear on:" >> kitty_info.txt 

grep -n cat[a-z]* kitty_ipsum_1.txt | sed -E 's/([0-9]+).*/\1/' >> kitty_info.txt

echo -e "\n\n~~ kitty_ipsum_2.txt info ~~" >> kitty_info.txt

echo -e "\nNumber of lines:" >> kitty_info.txt

cat kitty_ipsum_2.txt | wc -l >> kitty_info.txt

echo -e "\nNumber of words:" >> kitty_info.txt

wc -w < kitty_ipsum_2.txt >> kitty_info.txt

echo -e "\nNumber of characters:" >> kitty_info.txt

cat kitty_ipsum_2.txt | wc -m >> kitty_info.txt

echo -e "\nNumber of times meow or meowzer appears:" >> kitty_info.txt

grep -o meow[a-z]* kitty_ipsum_2.txt | wc -l >> kitty_info.txt

echo -e "\nLines that they appear on:" >> kitty_info.txt

grep -n meow[a-z]* kitty_ipsum_2.txt | sed -E 's/([0-9]+).*/\1/'

echo -e "\nNumber of times cat, cats, or catnip appears:" >> kitty_info.txt

grep -o cat[a-z]* kitty_ipsum_2.txt | wc -l >> kitty_info.txt

echo -e "\nLines that they appear on:" >> kitty_info.txt

grep -n cat[a-z]* kitty_ipsum_2.txt | sed -E 's/([0-9]+).*/\1/' >> kitty_info.txt
```

Liat yg ada komentar "referensi pertama" sama "referensi kedua".<br/>
Kurang lebih semua kode di bawahnya antara pake alur "referensi pertama" atau "referensi kedua".<br/>
Tinggal perhatiin aja kalo ke depannya buka lagi catatan ini buat referensi atau *refresh* ingatan.

Kayaknya *redirect input* pake `<` cuma bisa dari file ya?<br/>
Nyoba `<`nya dari *command* lain ga bisa<br/>
`wc -l < grep -o cat[a-z]* kitty_ipsum_2.txt`<br/>
Malah *error* katanya ga ada folder atau file yg namanya "grep".<br/>
Jadinya kalo mau *redirect input* dari `stdout` / hasil *command*
lain cuma bisa pake `|` (*pipe*).

Buat liat hasil dari ngejalanin semua kode di atas, cek file [kitty_info.txt](https://github.com/harytri87/harytri87.github.io/blob/main/catatan-belajar/g-advanced-bash/kitty_info.txt)

---

### Bikin `translate.sh`

Bikin filenya pake `touch` terus tambahin hak buat *execute* pake `chmod`

Isi file pas masih coba-coba:

```sh
#!/bin/bash

cat $1
```

Buat jalanin programnya kalo cuma ada kode yg di atas, ketik di terminal:

- `./translate.sh kitty_ipsum_1.txt`<br/>
  Ini ngasih *argument/parameter* secara langsung

- `./translate.sh < kitty_ipsum_1.txt`<br/>
  Ini *redirect input* (`stdin`) pake `<`

- `cat kitty_ipsum_1.txt | ./translate.sh`<br/>
  Ini *redirect input* (`stdin`) pake `|`

Tiga cara itu hasilnya sama semua.

---

Isi file lengkapnya:

```sh
#!/bin/bash

cat $1 | sed -E 's/catnip/dogchow/g; s/cat/dog/g; s/meow|meowzer/woof/g'
```

Jalanin filenya di terminal:

- `./translate.sh kitty_ipsum_1.txt > doggy_ipsum_1.txt`

- `./translate.sh kitty_ipsum_2.txt > doggy_ipsum_2.txt`

Bakal bikin file doggy_ipsum yg isinya udh diubah sesuai
pattern `sed` di file `translate.sh`

Terus cek perbedaannya pake:

```bash
diff --color kitty_ipsum_1.txt doggy_ipsum_1.txt
```
