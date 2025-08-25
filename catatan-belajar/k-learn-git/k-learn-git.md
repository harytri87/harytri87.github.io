# Learn Git by Building an SQL Reference Object

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-git-by-building-an-sql-reference-object/build-an-sql-reference-object) dari [freeCodeCamp](https://www.freecodecamp.org/)

Latihan pake *version control* Git sekalian belajar bikin *object* yang isinya
*query* SQL yang bisa kita pake berulang-ulang.

Ternyata full belajar Git, ga diajarin cara pake file `.json` yg isinya *query* SQL itu.

> Catatan:  
> Kalo hasil *command*nya kepanjangan, ngelebihin ukuran window terminalnya,
misal pas `git log`, itu jadi bisa pencet keyboard panah atas/bawah
buat ngebaca hasil *log*nya sama pencet keyboard `q` buat *quit*

---

## Daftar Isi

1. [Command Git](#command-git)
    - [`git init`](#git-init)
    - [`git status`](#git-status)
    - [Branch](#branch)
      - [`git branch`](#git-branch)
      - [`git checkout`](#git-checkout)
      - [Hapus Branch](#hapus-branch)
    - [Nyatet Perubahan](#nyatet-perubahan)
      - [`git add`](#git-add)
      - [`git commit`](#git-commit)
      - [`git stash`](#git-stash)
    - [`git log`](#git-log)
    - [`git diff`](#git-diff)
    - [Ngegabungin Branch](#ngegabungin-branch)
      - [`git merge`](#git-merge)
      - [`git rebase`](#git-rebase)
        - [Benerin Konflik](#benerin-konflik)
        - [Selesain Rebase Setelah Konflik](#selesain-rebase-setelah-konflik)
        - [Flag Buat Command `git rebase`](#flag-buat-command-git-rebase)
    - [Ngebatalin Commit](#ngebatalin-commit)
      - [`git reset`](#git-reset)
      - [`git revert`](#git-revert)
    - [`git show`](#git-show)
2. [File `.gitignore`](#file-gitignore)
3. [File `.env`](#file-env)
4. [File `sample.env`](#file-sampleenv)


---

## Command Git

### `git init`

```sh
git init
```

`init` singkatan dari *initiate*. Buat konfigurasi awal Git.<br/>
Bakal bikin file tersembunyi yang namanya `.git` yang isinya buat nyatet
perubahan apapun di folder projek yang ada `.git`nya (*git repository*).

---

### `git status`

```sh
git status
```

Buat liat macem-macem status
- Lokasi kita lagi di mana
- Ada perubahan apa
- Apa aja yang siap di*commit*
- dll

---

### Branch

Di *git repository* biasanya ada *branch*. Biasanya ada *branch* `main` buat yang utama atau
mungkin buat yang tahap produksi, sama banyak *branch* lain buat nambahin fitur atau benerin sesuatu.

---

#### `git branch`

```sh
git branch
```

Buat liat daftar *branches*, yang ada tanda `*` berarti itu posisi kita.

---

```sh
git branch branch_name
```

Buat bikin *branch* baru. *Branch* baru bakal sama kayak *branch*
tempat kita jalanin *command*nya (nge*clone* isi *repository*nya).<br/>
Misal lagi kita lagi di *branch* `main`, terus bikin *branch* baru, berarti *branch* baru itu bakal sama kayak `main` isi repository sama *git history*nya.

Contoh nama *branch* yang umum (ga boleh pake spasi):
- `fix/...`
- `feat/...`

Misal `feat/add-create-table-reference`

---

#### `git checkout`

```sh
git checkout -b new_branch
```

`-b` singkatan dari *branch*.<br/>
Buat bikin *branch* baru sekalian pindah ke *branch* baru itu.

Kalo mau pindah ke *branch* yang udh ada, masukin *command* tanpa `-b` terus nama *branch*nya.

---

#### Hapus Branch

```sh
git branch -d branch_name
```

`-d` singkatan dari "*delete*".<br/>
Buat ngehapus suatu *branch*. Tapi pastiin emang udh ga butuh *branch* itu
atau pas *branch*nya selesai digabungin.

---

### Nyatet Perubahan

Ada dua langkah/tahap biar Git nyatet perubahan yang ada di *repository*nya.
Pertama `add`, kedua `commit`.

#### `git add`

```sh
git add file_name
```

`add` buat masukin perubahan ke tahap *stagging*.

Pake `.` buat gantiin nama file kalo mau langsung masukin semua perubahannya.

---

#### `git commit`

```sh
git commit -m "message here"
```

`commit` masukin semua yang ada di tahap *stagging* ke tahap *commit*.
Semua yang udh di*commit* itu kasarnya mah udh bener-bener masuk catatan Gitnya.

`-m` singkatan dari "*message*". Biasanya beberapa kata buat judul *commit*nya,
dan biasanya buat *commit* pertama kali itu pesannya "*Initial Commit*".
Sebisa mungkin harus singkat dan padat.

Contoh pesan yang umum biar orang-orang gampang ngerti isi *commit*nya:
- "fix: ..."
- "feat: ..."

> Catatan:  
> Kalo *commit* pertama kali setelah `git init` belum bikin *branch* apapun,
defaultnya bakal otomatis bikin *branch* `master`.
> 
> Bisa juga setelah `git init` dan sebelum *commit* apapun, pake *command*
`git checkout -b main`, biar nanti pas *commit* pertama langsung ke *branch* `main`.

---

#### `git stash`

```sh
git stash
```

Buat nyimpen perubahan tanpa *stagging & commit*.

Perubahan yang dimasukin ke *stash* bakal ilang dari tempat/*branch* kita bikin perubahan itu
dan jadinya disimpen di *stash*.

Perubahan yang ada di *stash* itu bisa dibawa dan diterapin ke *branch* manapun.

```sh
git stash list
```

Buat liat daftar semua *stash*

Contoh daftarnya:<br/>
> stash@{0}: WIP on add-insert-row-reference: 802a595 feat: add insert row reference  
> stash@{1}: WIP on add-insert-row-reference: 802a595 feat: add insert row reference

```sh
git stash pop
```

Buat nerapin perubahan di *stash* terbaru ke lokasi *working tree* kita, sekalian ngehapus dari *stash*.

```sh
git stash show
```

Buat liat rincian *stash* terbaru. Tambahin *flag* `-p` buat liat lebih rinci perubahannya.<br/>
`-p` singkatan dari "*patch*".

```sh
git stash apply
```

Buat nerapin perubahan di *stash* terbaru tanpa ngehapus *stash*nya.

```sh
git stash drop
```

Buat ngehapus *stash* terbaru.

---

`pop`, `show`, `apply` sama `drop` juga bisa buat *stash* tertentu,
tinggal tambahin nama *stash*nya di akhir *command*nya.

Contoh: `git drop stash@{1}`

---

### `git log`

```sh
git log
```

Buat liat *commit history*
- Judul/pesan
- Username
- Email
- Tanggal
- *Commit hash* (*string* panjang, fungsinya mirip id)

Urutan *history*nya dari yang terbaru di paling atas, terus ke yang terlama di paling bawah.

Pake *flag* `--oneline` buat liat versi singkatnya.

---

```sh
git log -1
```

Pake *flag* angka buat nampilin log *commit* tertentu aja.

`-1` buat satu *commit* terbaru.<br/>
`-2` buat dua *commit* terbaru.<br/>
dan seterusnya.

Bisa digabungin sama *flag* `--oneline`.

---

### `git diff`

```sh
git diff
```

Buat liat perbandingan dari yang udh di*commit* sama yang baru diubah (belum *stagging*).
Kalo udh masuk ke tahap *stagging*, ga bisa liat perbandingannya.

Tanda `+` itu artinya perubahan yang ditambahin.<br/>
Tanda `-` itu artinya perubahan yang dikurangin/dihapus.

---

### Ngegabungin Branch

#### `git merge`

Perubahan yang di*commit* cuma ada di masing-masing *branch*, ga ngaruh ke yg lainnya.

```sh
git merge other_branch_name
```

Buat gabungin *branch*:
1. Pastiin semua perubahan di *branch* lain/baru itu udh di*commit*
2. Balik ke *branch* main/awal/sebelumnya
3. Terus gabungin pake *command* `merge`
4. Pas selesai ada info tentang penggabungannya

---

**Kesimpulan Alurnya**

1. Posisi di *branch* `main` atau *branch* "besar" lainnya
2. Bikin *branch* baru
3. Pindah ke *branch* baru itu
4. Bikin perubahan
5. *Stage & commit*
6. Pindah ke *branch* sebelumnya (yang jadi sumber *clone*nya)
7. Gabungin *branch*nya
8. Hapus *branch* baru itu kalo udh yakin ga bakal kepake lagi

---

#### `git rebase`

```sh
git rebase main_branch_name
```

Buat *update branch* biar ngambil perubahan yang ada di *branch* sumbernya.
*Command*nya dipake di *branch* baru/anaknya.

Biasa dipake kalo lagi ngerjain sesuatu di *branch* lain terus ada perubahan di *branch* utamanya.
Jadi sebelum perubahan di *branch* ini digabungin sama *branch* utamanya,
*branch* ini harus sinkron dulu sama *branch* utamanya.

Sebelum jalanin `git rebase`, harus *commit* dulu perubahan di *branch*nya.

> *To be more specific, a rebase will "rewind" this branch to where it last matched `main`, then, add the commits from `main` that aren't here. After that, it adds the commits you made to this branch on top.*

---

Pas jalanin `git rebase`, bisa lancar bisa juga ada konflik.

Misal di `main` ada satu file html:

```html
<html>
<head>
  <title>Judul</title>
</head>
<body>

  <h1>Judul</h1>

</body>
</html>
```

Terus di *clone* ke *branch* `feat/add-paragraph` yang diubah jadi:

```html
<html>
<head>
  <title>Judul</title>
</head>
<body>

  <h1>Judul</h1>

  <p>Ini paragraf</p>

</body>
</html>
```

Baru *commit* aja, belum kita gabungin ke `main`.

Pas kita lagi di *branch* `feat/add-paragraph`, ada orang lain yang:
1. Nge*clone* `main`
2. Bikin perubahan di *branch* barunya
3. *Commit* dan gabungin ke `main`

*Branch* dia itu `fix/heading`:

```html
<html>
<head>
  <title>Judul</title>
</head>
<body>

  <h1>Judul Halaman</h1>

</body>
</html>
```

Dia cuma benerin judul, **posisi kodenya di atas baris kode yang ditambahin/diubah** di `feat/add-paragraph`.

Pas *branch* `feat/add-paragraph` jalanin `git rebase main`, ga bakal konflik.<br/>
Ini hasil *rebase*nya

```html
<html>
<head>
  <title>Judul</title>
</head>
<body>

  <h1>Judul Halaman</h1>

  <p>Ini paragraf</p>

</body>
</html>
```

Tapi kalo misal perubahan yang dikerjain orang lain itu **posisinya di baris kode yang sama**
kayak paragraf di `feat/add-paragraph`, bakal konflik pas *rebase*.

Sedangkan *commit* punya orang lain yang duluan `merge` ke `main` itu aman.

---

##### Benerin Konflik

Kalo ada konflik, di *text editor*nya ada beberapa bagian yang dipisahin sama karakter
`<`, `>` dan `=` yang nunjukin *commit* dari dua *branch* itu.

Biasanya tinggal hapus semua baris yang ada karakter-karakter itu biar
ngambil perubahan dari `main` terus baris kode yang kita ubah itu ditambahin di bawahnya.

*yang dihapus itu cuma baris yang karakter-karakternya ya, contoh yang dihapus:*<br/>
`<<<<<<< HEAD` *(current change)* <br/>
`=======` <br/>
`>>>>>>> feat: add column reference` *(incoming change)*

Pastiin juga penggabungan itu ga bakal ada error di kodenya. Periksa *syntax* yang kurang
kayak titik koma atau kurang tutup kurung, dll.

Atau kalo di VSCode biasanya ada tombol "*Accept Current Change*", "*Accept Incoming Change*",
"*Accept Both Changes*" sama "*Compare Changes*".

"*Accept Both Changes*" itu sama kayak yang ngehapus semua baris yang ada karakter-karakter itu.

---

##### Selesain Rebase Setelah Konflik

Abis ngebenerin konflik, pas `git status` ada info kalo kita masih di proses *rebase*.

Kalo udh yakin kode yang dibenerin/ditambahinnya udh bener, jalanin:
1. `git add .`
2. coba cek `git status`
3. kalo udh aman, jalanin: `git rebase --continue`

---

##### Flag Buat Command `git rebase`

*Flag* `--interactive` buat kita periksa dan ubah-ubah langsung.

Pas ngejalanin *command* `git rebase --interactive` itu bakal ngebuka Nano.<br/>

Di paling atas ada info (*hash & message*) *commit* yg bakal digabungin.<br/>
Contoh:  
> pick 2ec2ce0 feat: add unique reference  
> pick 2d2367f Revert: "feat: add unique reference"

Di bawahnya ada banyak komen info-info *command* yg bisa dipake.
*Commands* itu dipake di posisi "pick" *(cek contoh di atas)*.<br/>
*(sisanya baca aja di sana)*

Kalo ngubah sesuatu di dalem Nano itu, *save* dulu pake `Ctrl+O` terus *exit* `Ctrl+X`.<br/>
Kalo ga ngubah apapun, langsung aja *exit*.

Oh iya, pas jalanin *command save*, bakal ada *prompt* buat masukin nama filenya,
itu langsung pencet *keyboard enter* aja.

---

**Contoh *command* `r`, buat ubah *commit message***.

```sh
git rebase --interactive --root
```

*Flag* `--root` itu artinya *commit* paling awal.

*Command* di atas bakal ngebuka Nano kayak contoh *interactive* yg di atas.
*Commit* paling awal/paling tua posisinya di paling atas, *commit* paling baru posisinya di paling bawah.

Langkah-langkahnya:
1. Ganti *command* `pick` jadi `r` di samping info *commit* yg mau diubah pesannya  
  Jangan ubah apapun selain *command*nya (`pick`, `r`, dll)
2. `Ctrl+O` & `Ctrl+X` (*save & exit*)
3. Kebuka Nano baru
4. Ubah pesannya. Jangan lupa *save* & *exit*.

---

**Contoh *command* `s`, *squash***.

*Squash* itu buat ngegabungin beberapa *commit* jadi satu.
Biasanya dipake buat ngebersihin *commit history* dari suatu *branch*
sebelum di`merge` ke *branch* utamanya.

```sh
git rebase --interactive HEAD~5
```

Di Nano bakal muncul **lima** info *commit* terbaru, urutannya dari yg terlama di atas
sampe yg terbaru di bawah.

Langkah-langkahnya:
1. Ganti semua *command* `pick` jadi `s` **kecuali** satu *commit* yg paling atas
2. `Ctrl+O` & `Ctrl+X` (*save & exit*)
3. Kebuka Nano baru yg isinya semua pesan dari **lima** *commit* itu
4. Langsung aja *exit*, ga usah ganti apapun

Nanti hasilnya jadi satu *commit* yg isi pesannya itu semua pesan
dari semua *commit* yg digabungin.

---

Kalo nge*rebase* pake *flag* `--interactive`, *hash* tiap *commit* yg di*rebase*
itu bakal berubah.

> The message was reworded, but there's a problem. Look at the commit hash for your `Initial commit` from the last two times you viewed the log, it's that string left of the log. They aren't the same anymore since you rebased back to the root. Same goes for the rest of the commits. When you rebase interactively it changes all those hashes, so git sees them as different commits. If you were to try and merge this into `main`, it wouldn't work because they don't share the same history anymore. For this reason, you don't want to do an interactive rebase where you go back passed commits unique to the branch you are on. Fortunately, you can fix this. Enter `git rebase main` to realign the history of the two branches.

---

### Ngebatalin Commit

Ada beberapa cara buat ngebatalin atau *undo* perubahan yg udh di*commit*.

#### `git reset`

```sh
git reset
```

Buat pindah ke *commit history* manapun. Mirip perjalanan waktu.

Kalo pake `git log --oneline` bakal ada daftar *commit*, terus yg ada tulisan `HEAD`
itu *commit* terbaru kita.

Contoh hasil `git log --oneline`:

> ec40140 (HEAD -> feat/add-column-references) feat: add unique reference  
> 14ac5c9 feat: add foreign key reference  
> c92e561 feat: add primary key reference  
> 09c52b7 feat: add rename column reference  
> f56d498 feat: add drop column reference  
> 52856c0 feat: add column reference  
> 0aec206 (main) feat: add delete row reference  
> b0b6274 feat: add update row reference  
> 802a595 feat: add insert row reference  
> ce439e2 fix: create table syntax  
> f71ce2b feat: add drop table reference  
> 10900e4 feat: add create table reference  
> 3404c48 feat: add drop database reference  
> 0ab99b9 feat: add create database reference  
> c6a9698 Initial commit

```sh
git reset HEAD~1
```

Buat mundur **satu** langkah dari `HEAD`.

Defaultnya bakal ***mixed** reset*.<br/>
Penggambaran `git reset HEAD~1` pake hasil `log` di atas:
1. Mundur ke *commit* `14ac5c9 feat: add foreign key reference`
2. Ngehapus *commit* `ec40140 feat: add unique reference`
3. Kondisi *repository* sekarang:
  - Sesuai isi *commit* `ec40140 feat: add unique reference` (*commit* sebelum reset)
  - **Belum** *stagging*

*Flag* `--hard` bakal bener-bener nge*reset* ke *commit* tertentu.
Penggambaran `git reset --hard HEAD~1` pake hasil `log` di atas:
1. Mundur ke *commit* `14ac5c9 feat: add foreign key reference`
2. Ngehapus *commit* `ec40140 feat: add unique reference`
3. Kondisi *repository* sekarang:
  - Sesuai isi *commit* **`14ac5c9 feat: add foreign key reference`** (*commit* tujuan)

*Flag* `--soft`
Penggambaran `git reset --soft HEAD~1` pake hasil `log` di atas:
1. Mundur ke *commit* `14ac5c9 feat: add foreign key reference`
2. Ngehapus *commit* `ec40140 feat: add unique reference`
3. Kondisi *repository* sekarang:
  - Sesuai isi *commit* `ec40140 feat: add unique reference` (*commit* sebelum reset)
  - **Udah** *stagging*

---

#### `git revert`

```sh
git revert HEAD
```

Buat ngebatalin *commit* terbaru.

Pas ngejalanin *command* itu, Git bakal ngebuka Nano, dia minta *commit message* buat *revert*nya.
Udah ada *default message*nya, ga usah diganti, langsung `Ctrl+X` aja buat keluar dari Nano.

Biasanya kalo udh nginstall Git sama VSCode sih bukan ngebuka Nano, tapi ngebuka VSCode.

Hasil `git log --oneline` (masih pake contoh *log* di atas):

> 2d2367f (HEAD -> feat/add-column-references) Revert "feat: add unique reference"  
> ec40140 feat: add unique reference  
> 14ac5c9 feat: add foreign key reference  
> c92e561 feat: add primary key reference  
> 09c52b7 feat: add rename column reference  
> f56d498 feat: add drop column reference  
> 52856c0 feat: add column reference  
> 0aec206 (main) feat: add delete row reference  
> b0b6274 feat: add update row reference  
> 802a595 feat: add insert row reference  
> ce439e2 fix: create table syntax  
> f71ce2b feat: add drop table reference  
> 10900e4 feat: add create table reference  
> 3404c48 feat: add drop database reference  
> 0ab99b9 feat: add create database reference  
> c6a9698 Initial commit

Jadinya `revert` itu:
1. Nge*clone* isi *repository* dari *commit* sebelumnya
2. Nambahin satu *commit* yg isinya hasil *clone* itu
3. Ga ngehapus *commit* manapun

---

### `git show`

```sh
git show
```

Buat ngeliat rincian dari *commit* terbaru.

```sh
git show HEAD~1
```

Buat ngeliat rincian dari *commit* sebelumnya.<br/>
Kayak `git reset`, angka setelah `HEAD~` itu bisa diganti-ganti
sesuai tujuannya.

---

Buat *command* yg bisa masukin tujuan/alamat *commit* kayak `reset`, `revert`, `show` dll
itu bisa juga langsung masukin *hash* dari *commit*nya.

Kalo pake `HEAD~` tapi tujuannya kejauhan kan harus ngitung dulu.

---

## File `.gitignore`

File yang isinya buat nulis folder atau file yg ga boleh dimasukin ke Git.

---

## File `.env`

File yang isinya *environment variables* buat ngelengkapin kode di projek kita.
Biasanya banyak info yang sensitif, orang lain ga boleh tau.

---

## File `sample.env`

Nilai dari *environment variables*nya yang rahasia, kalo nama *variable*nya ngga.
Jadi sediain file ini biar orang lain yg mau coba projek kita juga bisa dijalanin
di komputer mereka.
