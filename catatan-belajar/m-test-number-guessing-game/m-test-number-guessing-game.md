# Build a Number Guessing Game

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/build-a-number-guessing-game-project/build-a-number-guessing-game) dari [freeCodeCamp](https://www.freecodecamp.org/)

Ujian kelima dan terakhir dari tutorial belajar *Relational Database* ini.

Baru sadar kalo ngerjain ujian gini tuh kayak *test-driven development*.
Cuma yg bikin *test*nya bukan saya sendiri.

Kadang ga ketauan kalo ada yg kelewat atau bug pas ngerasa fitur-fiturnya
udh selesai semua. Kalo metodenya *test-driven development* jadi lebih jelas.

---

Buat mindahin folder dari Docker ke folder biasa di windows:

Cek dulu nama *container*nya pake `docker ps` abis itu *copy*:

```bash
docker cp <container_name>:<docker_directory_path> <windows_goal_path>
```

```bash
docker cp infallible_leavitt:/workspace/project/number_guessing_game "D:\number_guessing_game"
```

---

## Alur Progres

### Bikin Database

```sql
CREATE DATABASE number_guess;
```

---

### Bikin Table

#### Bikin Table `users`

```sql
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(22) UNIQUE NOT NULL
);
```

---

#### Bikin Table `games`

```sql
CREATE TABLE games(
  game_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (user_id) NOT NULL,
  secret_number INT NOT NULL,
  number_of_guesses INT
);
```

Itu `number_of_guesses` cuma kepake di game versi sederhana tanpa history.<br/>
(Cek [`git reset`](#git-reset-05fc487---hard).)

---

#### Bikin Table `game_details`

```sql
CREATE TYPE guess_status AS ENUM ('too low', 'too high', 'correct');
```

```sql
CREATE TABLE game_details(
  game_detail_id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games (game_id) NOT NULL,
  guess_number INT NOT NULL,
  guess_result guess_status NOT NULL
);
```

Asalnya `guest_result` itu `VARCHAR`, terus nanya AI kalo `ENUM` gimana.

Buat ngecek `TYPE` pake `\dT`, `\dT+` atau `\dT <type_name>` atau *query*:

```sql
SELECT enumlabel
FROM pg_enum
WHERE enumtypid = 'guess_status'::regtype;
```

*Cuma nanya AI pas udh nyoba sendiri atau pas error yg kelamaan buat benerinnya.*
*Biar beneran belajar.*

---

Dari table-table di atas banyak yg ga kepake kalo cuma buat lulus ujiannya.
Data-data lain yg ga kepake buat lulus ujiannya itu ngebayangin kalo
ke depannya mau nambahin fitur lain selain yg diminta dari soal ujiannya.

Kalo cuma buat lulus ujian, cukup table `users` sama `games`.
Terus di table `games`nya tambahin kolom `number_of_guess`.

---

### Bikin Program `number_guess.sh`

Proses dibarengin pake Git. Bingung sih disuruh minimal 5 *commit*,
itu baca dari soal ujiannya aja paling 3 *commit*.

Nama-nama *commit*nya:

---

#### `Initial commit`

Branch `main`

1 *commit*

---

#### `feat: check user`

Branch `feat/check-user`

1 *commit*, langsung digabungin ke `main` dan hapus *branch*

---

#### `feat: the game`

Branch `feat/the-game`

1 *commit*, langsung digabungin ke `main` dan hapus *branch*

---

#### `feat: show history on greetings`

Branch `feat/show-history-on-greetings`

1 *commit*, langsung digabungin ke `main` dan hapus *branch*

---

#### `fix: remove quote from echo`

Branch `main`

1 *commit*

---

#### `fix: fix echo`

Branch `fix/fix-echo`

1 *commit*, langsung digabungin ke `main` dan hapus *branch*

---

#### `git reset 05fc487 --hard`

Pas ngeliat isi table, jadi tau kalo *test*nya ga selesai gara-gara kelamaan
*query* ngisi data history gamenya. *Test*nya masukin angka 1-1000 terus 1000-1,
makanya lama kalo ngejalanin *query* segitu banyak satu-persatu.
Ga dikasih tau juga metode *test*nya gimana, jadi baru tau pas udh selesai.

Ternyata mikir *scalability* malah bikin ga lulus *test* xD

Jadinya di*reset* ke *commit* yg gamenya udh jadi dan mau bikin ulang dari awal.
File `.sh` yg ini di*copy* & ganti nama, yg bakal di*test* tetep `number_guess.sh`.

---

#### `refactor: the game`

Branch `refactor/the-game`

1 *commit*, langsung digabungin ke `main` dan hapus *branch*

---

---

---

**Instructions**
To complete this project, you need to write a script that generates a random number between 1 and 1000 for users to guess. Create a `number_guess` database to hold the information suggested in the user stories. Connect to the interactive psql shell with `psql --username=freecodecamp --dbname=postgres` to create the database. In your script, you can create a `PSQL` variable for querying the database like this: `PSQL="psql --username=freecodecamp --dbname=<database_name> -t --no-align -c"`. Your script should only ask for input from the user to get the username and to take guesses. Your script should output exactly what is described in the user storied below, and nothing extra. The tests will add users to your database when the script has that ability, feel free to delete those. Some script related user stories may not pass until the script is completely working. Don't forget to commit your work frequently.

Notes:
If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp number_guess > number_guess.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `number_guess.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < number_guess.sql` in a terminal where the `.sql` file is.

If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the number_guess.sql file, as well as the final version of your `number_guess.sh` file, in a public repository and submit the URL to it on freeCodeCamp.org.

**Complete the tasks below**

1. Create a `number_guessing_game` folder in the `project` folder for your program

2. Create `number_guess.sh` in your `number_guessing_game` folder and give it executable permissions

3. Your script should have a shebang at the top of the file that uses `#!/bin/bash`

4. Turn the `number_guessing_game` folder into a git repository

5. Your git repository should have **at least five commits**

6. Your script should randomly generate a number that users have to guess

7. When you run your script, you should prompt the user for a username with `Enter your username:`, and take a username as input. Your database should allow usernames that are 22 characters

8. If that username has been used before, it should print `Welcome back, <username>! You have played <games_played> games, and your best game took <best_game> guesses.`, with `<username>` being a users name from the database, `<games_played> `being the total number of games that user has played, and `<best_game>` being the fewest number of guesses it took that user to win the game

9. If the username has not been used before, you should print `Welcome, <username>! It looks like this is your first time here.`

10. The next line printed should be `Guess the secret number between 1 and 1000:` and input from the user should be read

11. Until they guess the secret number, it should print `It's lower than that, guess again:` if the previous input was higher than the secret number, and `It's higher than that, guess again:` if the previous input was lower than the secret number. Asking for input each time until they input the secret number.

12. If anything other than an integer is input as a guess, it should print `That is not an integer, guess again:`

13. When the secret number is guessed, your script should print `You guessed it in <number_of_guesses> tries. The secret number was <secret_number>. Nice job!` and finish running

14. The message for the first commit should be `Initial commit`

15. The rest of the commit messages should start with `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`

16. You should finish your project while on the `main` branch, your working tree should be clean, and you should not have any uncommitted changes
