# Learn Nano by Building a Castle

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-nano-by-building-a-castle/build-a-castle) dari [freeCodeCamp](https://www.freecodecamp.org/)

---

## Nano

Nano adalah program yg dipake buat ngedit isi file lewat terminal langsung.
Nano udh ada secara default di hampir semua distro Linux.

```bash
nano <file_name>
```

Buat ngebuka suatu file pake Nano. 

Pas filenya udh dibuka pake Nano, di bagian bawahnya ada daftar *keyboard shortcuts*
buat navigasi menu. Misal `^G`: *Get Help* sama `^X`: *Exit*.

`^` itu maksudnya tombol `Ctrl` kalo di Windows, jadi `Ctrl+G` sama `Ctrl+X`.

`M` itu singkatan "*meta*", katanya tombol yg ga ada di hampir semua keyboard.<br/>
Di Windows itu `ALT`. Kalo di OSX itu `escape`.

Buat mindahin *cursor*nya pake keyboard panah (atas, bawah, kanan, kiri),
ga bisa pake mouse.

---

Kalo di akhir baris ada karakter `\`, tambahin 1 spasi, jadi `\ `.<br/>
Kalo ga ada spasi, malah ngegabungin baris selanjutnya jadi di baris yang sama.

---

## File `castle.sh`

Bikin filenya pake `touch` terus buat ngisi/ngubah isi filenya pake Nano.

Cuma ngetik sama *copy paste* biasa tapi pake Nano.

```bash
echo "
Welcome to my castle
"
echo "
 /\                /\ 
/  \              /  \ 
|  |______________|  |
|                    |
|   []    []    []   |
|                    |
|         __         |
|________|  |________|
"
```

Di filenya ga ada *shebang*, jadi buat ngejalanin filenya pake
`bash castle.sh` atau `sh castle.sh`.

Kalo dijalanin pake `bash` atau `sh`, filenya ga perlu hak akses buat *execute*.
