# Build a World Cup Database

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/learn-bash-scripting-by-building-five-programs/build-five-programs) dari [freeCodeCamp](https://www.freecodecamp.org/)

Ujian kedua dari tutorial belajar *Relational Database* ini.

> *Notes:*  
> *If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp worldcup > worldcup.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `worldcup.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < worldcup.sql` in a terminal where the `.sql` file is.*

---

## Daftar Isi

1. [Daftar Table](#daftar-table)
    - [Table `teams`](#table-teams)
    - [Table `games`](#table-games)
2. [Alur Progres](#alur-progres)
    - [Bikin Database](#bikin-database)
    - [Bikin Table](#bikin-table)
      - [Bikin Table `teams`](#bikin-table-teams)
      - [Bikin Table `games`](#bikin-table-games)
    - [Bikin `insert_data.sh`](#bikin-insert_datash)
    - [Bikin `queries.sh`](#bikin-queriessh)
3. [Referensi Query lain](#referensi-query-lain)

---

## Daftar Table

### Table `teams`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| team_id | integer               |   | not null | nextval('teams_team_id_seq'::regclass) |
| name    | character varying(60) |   | not null |   |

Indexes:
- "teams_pkey" PRIMARY KEY, btree (team_id)
- "teams_name_key" UNIQUE CONSTRAINT, btree (name)

Referenced by:
- TABLE "games" CONSTRAINT "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
- TABLE "games" CONSTRAINT "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)

---

### Table `games`

| Column | Type | Collation | Nullable | Default |
|--------|------|-----------|----------|---------|
| game_id        | integer               |   | not null | nextval('games_game_id_seq'::regclass) |
| year           | integer               |   | not null |   |
| winner_id      | integer               |   | not null |   |
| opponent_id    | integer               |   | not null |   |
| winner_goals   | integer               |   | not null |   |
| opponent_goals | integer               |   | not null |   |
| round          | character varying(60) |   | not null |   |

Indexes:
- "games_pkey" PRIMARY KEY, btree (game_id)

Foreign-key constraints:
- "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
- "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)

---

## Alur Progres

### Bikin Database

```sql
CREATE DATABASE worldcup;
```
---

### Bikin Table

#### Bikin Table `teams`

```sql
CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL
);
```

```sql
SELECT t.name FROM games AS g FULL JOIN teams AS t ON g.winner_id = t.team_id WHERE g.year = 2018 AND g.round = 'final';
```

---

#### Bikin Table `games`

```sql
CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  winner_id INT REFERENCES teams (team_id) NOT NULL,
  opponent_id INT REFERENCES teams (team_id) NOT NULL,
  winner_goals INT NOT NULL,
  opponent_goals INT NOT NULL,
  round VARCHAR(60) NOT NULL
);
```
---

### Bikin `insert_data.sh`

Sampe tutorial sekarang belum ada tutorial buat *bulk insert* sama *transaction*.  
Jadi ini masih pake cara perulangan di Shell *script* yg jadinya
pake banyak *query* & hasilnya lambat.

Mungkin di tutorial ke depannya bakal diajarin yg lebih efisien?

Terus pas udh selesai ngerjain ini, nanya ke AI sih ada perintah SQL di PostgreSQL
yg namanya `COPY` buat masukin data langsung dari file `.csv`.  
Mungkin bakal diajarin di tutorial ke depannya?
Jadi skrg cuma pake cara-cara yg udh diajarin di tutorial sebelum-sebelumnya aja.

```sh
#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

INSERT_TEAM() {
  INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams (name) VALUES ('$1')")

  if [[ $INSERT_TEAM_RESULT == 'INSERT 0 1' ]]
  then
    echo Inserted into teams: $1
  fi
}

echo $($PSQL "TRUNCATE games, teams")

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $YEAR != year ]]
  then
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT'")

    if [[ -z $WINNER_ID ]]
    then
      INSERT_TEAM "$WINNER"
    fi

    if [[ -z $OPPONENT_ID ]]
    then
      INSERT_TEAM "$OPPONENT"
    fi

    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT'")

    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games (year, winner_id, opponent_id, winner_goals, opponent_goals, round) VALUES ($YEAR, $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS, '$ROUND')")

    if [[ $INSERT_GAME_RESULT == 'INSERT 0 1' ]]
    then
      echo "Inserted into games: $WINNER ($WINNER_GOALS) : $OPPONENT ($OPPONENT_GOALS)"
    fi
  fi
done
```
---

### Bikin `queries.sh`

```sh
#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=worldcup --no-align --tuples-only -c"

# Do not change code above this line. Use the PSQL variable above to query your database.

echo -e "\nTotal number of goals in all games from winning teams:"
echo "$($PSQL "SELECT SUM(winner_goals) FROM games")"

echo -e "\nTotal number of goals in all games from both teams combined:"
echo "$($PSQL "SELECT SUM (winner_goals + opponent_goals) FROM games")"

echo -e "\nAverage number of goals in all games from the winning teams:"
echo "$($PSQL "SELECT AVG (winner_goals) FROM games")"

echo -e "\nAverage number of goals in all games from the winning teams rounded to two decimal places:"
echo "$($PSQL "SELECT ROUND (AVG (winner_goals), 2) FROM games")"

echo -e "\nAverage number of goals in all games from both teams:"
echo "$($PSQL "SELECT AVG (winner_goals + opponent_goals) FROM games")"

echo -e "\nMost goals scored in a single game by one team:"
echo "$($PSQL "SELECT MAX (winner_goals) FROM games")"

echo -e "\nNumber of games where the winning team scored more than two goals:"
echo "$($PSQL "SELECT COUNT (*) FROM games WHERE winner_goals > 2")"

echo -e "\nWinner of the 2018 tournament team name:"
echo "$($PSQL "SELECT t.name FROM games AS g INNER JOIN teams AS t ON g.winner_id = t.team_id WHERE g.year = 2018 AND g.round = 'Final'")"

echo -e "\nList of teams who played in the 2014 'Eighth-Final' round:"
echo "$($PSQL "SELECT DISTINCT (name) FROM games AS g INNER JOIN teams AS t ON g.winner_id = t.team_id OR g.opponent_id = t.team_id WHERE g
.year = 2014 AND g.round = 'Eighth-Final'")"

echo -e "\nList of unique winning team names in the whole data set:"
echo "$($PSQL "SELECT DISTINCT (name) FROM games AS g INNER JOIN teams AS t ON g.winner_id = t.team_id ORDER BY name")"

echo -e "\nYear and team name of all the champions:"
echo "$($PSQL "SELECT g.year, t.name FROM games AS g INNER JOIN teams AS t ON g.winner_id = t.team_id WHERE g.round = 'Final' GROUP BY g.year, t.name")"

echo -e "\nList of teams that start with 'Co':"
echo -e "$($PSQL "SELECT name FROM teams WHERE name LIKE 'Co%'")"

```
---

## Referensi Query lain

```sql
SELECT * FROM games AS g
INNER JOIN teams AS w ON g.winner_id = w.team_id
INNER JOIN teams AS o ON g.opponent_id = o.team_id
```

Buat nampilin semua data + nama dari kedua tim di tiap pertandingan.

Tapi di "ujian" ini buat soal "*List of teams who played in the 2014 'Eighth-Final' round*",
udah coba banyak cara `JOIN` sama ubah-ubah posisi *table*nya tetep ga bisa nyelesain soal itu.

Akhirnya nanya ke AI dan ini jawabannya:  
(*tapi itu `OR` di `JOIN` jg belum diajarin di tutorialnya*)

```sql
SELECT * FROM games AS g
INNER JOIN teams AS t ON g.winner_id = t.team_id OR g.opponent_id = t.team_id;
```

Hasilnya mirip kayak yg di atas, bedanya jumlah data jadi 2x lipat gara2 ngulang
data pertandingan yg sama buat nampilin nama dari dua tim di pertandingan itu.


```sql
SELECT DISTINCT (name) FROM games AS g
INNER JOIN teams AS t ON g.winner_id = t.team_id OR g.opponent_id = t.team_id;
```

Buat nampilin namanya doang, tanpa duplikat juga.

Bisa juga pake `IN` sama `UNION`, tapi belum diajarin juga di tutorialnya.

Apa di tutorial ke depannya bakal diajarin soal `IN`, `UNION`
sama `OR` yg ternyata bisa dipake buat `JOIN`?
