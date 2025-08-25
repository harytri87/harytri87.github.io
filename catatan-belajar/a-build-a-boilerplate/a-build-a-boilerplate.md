# Build a Boilerplate

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-bash-by-building-a-boilerplate/build-a-boilerplate) dari [freeCodeCamp](https://www.freecodecamp.org/)

Belajar *Bash* atau *command* di Terminal.

Bikin kerangka buat bikin website (folder-folder & file-filenya) full pake *command* di terminal.

> Progresnya ilang gara-gara ganti nama folder utama. Tapi biarinlah, cuma folder sama file kosong gitu.

---

## Command-Command Terminal dari Tutorialnya

---

> `echo hello terminal`

Buat ngeprnt tulisan langsung di terminal.

> `echo text >> <file_name>`

Buat ngeprint tulisan ke dalem file.  
Contoh: `echo I made this boilerplate >> README.md`

---

> `pwd`
>> *"print working folder"*

Buat liat alamat folder

---

> `ls`

Singkatan dari *list*. Nampilin isi folder.

> `ls <flag>`  
> `ls -l`

Banyak *flag* buat *commands*.  
`-l` itu buat *"long list format"*, nampilin listnya secara rinci.

> `ls -a` atau `ls --all`

Buat liat semua termasuk yg nama awalannya pake `.`

---

> `cd <folder_name>`

Singkatan dari *change directory*. Buat masuk ke folder tertentu.

> `cd ..`

Dua titik buat mundur 1 folder atau keluar dari folder yg skrg.

> `cd ../..`

Buat mundur lebih dari 1 folder sekaligus.

---

> `more <filename>`

Buat liat isi dari filenya.

---

> `clear`

Buat ngehapus histori terminalnya.

---

> `mkdir <folder_name>`

Singkatan dari *"make directory"*. Buat bikin folder baru.

> `mkdir <folder_name>/<new_folder_name>`

Buat bikin folder baru di dalem folder yg udh ada, atau bisa bikin langsung folder beranak gitu?  
Contoh: `mkdir images/profile_pics`

---

> `touch <file_name>`

Buat bikin file baru.  
Bisa juga buat bikin file di folder beranak, tinggal masukin alamat lengkapnya.

---

> `command <flag>`

Biasanya *command* ada *flag* tambahan yg fungsinya beda-beda.

> `command --help`

*Flag* `--help` buat liat info soal commandnya.

---

> `cp <file> <destination>`

Singkatan dari *"copy"*. Buat nge-*copy* file ke folder lain.

> `cp -r <folder_name> <destination>`

`-r` singkatan dari *"recursive"*. Buat nge-*copy* folder dan semua isinya.

---

> `rm <filename>`

Singkatan dari *"remove"*. Buat ngehapus file.  
Bisa juga ngehapus dari folder yg beranak, tinggal masukin alamat lengkapnya.  

> `rm -r <folder_name>`

`-r` singkatan dari *"recursive"*. Buat ngehapus folder dan semua isinya.

Semua yg dihapus pake `rm` atau `rmdir` bakal kehapus permanen, ga ada "kotak sampah".

---

> `mv <filename> <new_filname>`

Singkatan dari *"move"*. Bisa buat ngubah nama file bisa juga buat mindahin file.  
Kalo mau ganti nama, masukin nama file termasuk ekstensinya sama nama file baru termasuk ekstensinya.  
Kalo mau mindahin file, masukin nama file termasuk ekstensinya sama nama folder tujuannya.

Buat mindahin ke folder yg beranak jg bisa.  
Contoh: `mv avatar.jpg images/profile_pics`

Bisa juga posisi kita di folder induk mindahin file dari folder beranak ke folder beranak lain.  
Contoh: `mv private/images/avatar.jpg public/images/profile_pics`

---

> `find`

Buat nampilin daftar file & folder termasuk file di dalem folder2nya *(file tree)*.

> `find <folder_name>`

Buat nampilin daftar isi dari folder tertentu.

> `find -name <file_name>`

Nambahin *flag* `-name` buat nyari / nampilin lokasi suatu file.  
Bisa juga nyari folder, berarti kalo nama folder itu tanpa ekstensi.  
Kalo file/folder ada yg namanya sama, bakal nampilin semua lokasi file/folder itu.

---

> `rmdir <folder_name>`

Singkatan dari *"remove directory"*. Buat ngehapus folder.

Semua yg dihapus pake `rm` atau `rmdir` bakal kehapus permanen, ga ada "kotak sampah".

---

> `exit`

Buat keluar dari terminal
