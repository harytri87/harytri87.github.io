# Build a Celestial Bodies Database

[Link tutorialnya](https://www.freecodecamp.org/learn/relational-database/build-a-celestial-bodies-database-project/build-a-celestial-bodies-database) dari [freeCodeCamp](https://www.freecodecamp.org/)

Ujian pertama dari tutorial belajar *Relational Database* ini.

---

## Daftar Isi

1. [Daftar Table](#daftar-table)
    - [Table `galaxy`](#table-galaxy)
    - [Table `star`](#table-star)
    - [Table `planet`](#table-planet)
    - [Table `moon`](#table-moon)
    - [Table `observatory`](#table-observatory)
    - [Table `observatory_planet_observation`](#table-observatory_planet_observation)
2. [Alur Progres](#alur-progres)
    - [Bikin Database](#bikin-database)
    - [Bikin Table](#bikin-table)
      - [Bikin Table `galaxy`](#bikin-table-galaxy)
      - [Bikin Table `star`](#bikin-table-star)
      - [Bikin Table `planet`](#bikin-table-planet)
      - [Bikin Table `moon`](#bikin-table-moon)
      - [Bikin Table `observatory`](#bikin-table-observatory)
      - [Bikin Table `observatory_planet_observation`](#bikin-table-observatory_planet_observation)
    - [Pengeditan](#pengeditan)
      - [Nambahin kolom baru](#nambahin-kolom-baru)
      - [Nambahin Constraint NOT NULL](#nambahin-constraint-not-null)
      - [Nambahin Constraint UNIQUE](#nambahin-constraint-unique)
      - [Ngubah Nama Kolom](#ngubah-nama-kolom)
      - [Ngubah Tipe Data](#ngubah-tipe-data)
    - [Pengisian Data](#pengisian-data)
      - [Isi Table `galaxy`](#isi-table-galaxy)
      - [Isi Table `star`](#isi-table-star)
      - [Isi Table `planet`](#isi-table-planet)
      - [Isi Table `moon`](#isi-table-moon)
      - [Isi Table `observatory`](#isi-table-observatory)
      - [Isi Table `observatory_planet_observation`](#isi-table-observatory_planet_observation)

---

## Daftar Table

### Table `galaxy`

|                Column              | Type | Collation | Nullable | Default |
|------------------------------------|------|-----------|----------|---------|
| galaxy_id                          | integer                |   | not null | nextval('galaxy_galaxy_id_seq'::regclass) |
| name                               | character varying(100) |   | not null |   |
| galaxy_type                        | character varying(60)  |   | not null |   |
| age_in_million_years               | numeric(10,4) |   |   |   |
| distance_from_earth_in_light_years | numeric(15,5) |   |   |   |
| description                        | text          |   |   |   |

Indexes:
- "galaxy_pkey" PRIMARY KEY, btree (galaxy_id)
- "galaxy_name_key" UNIQUE CONSTRAINT, btree (name)

Referenced by:
- TABLE "star" CONSTRAINT "star_galaxy_id_fkey" FOREIGN KEY (galaxy_id) REFERENCES galaxy(galaxy_id)

---

### Table `star`

|                Column              | Type | Collation | Nullable | Default |
|------------------------------------|------|-----------|----------|---------|
| star_id                            | integer                |   | not null | nextval('star_star_id_seq'::regclass) |
| name                               | character varying(100) |   | not null |   |
| galaxy_id                          | integer                |   | not null |   |
| star_type                          | character varying(60)  |   | not null |   |
| is_spherical                       | boolean                |   | not null |   |
| age_in_million_years               | numeric(10,4) |   |   |   |
| distance_from_earth_in_light_years | numeric(12,5) |   |   |   |
| description                        | text          |   |   |   |

Indexes:
- "star_pkey" PRIMARY KEY, btree (star_id)
- "star_name_key" UNIQUE CONSTRAINT, btree (name)

Foreign-key constraints:
- "star_galaxy_id_fkey" FOREIGN KEY (galaxy_id) REFERENCES galaxy(galaxy_id)

Referenced by:
- TABLE "planet" CONSTRAINT "planet_star_id_fkey" FOREIGN KEY (star_id) REFERENCES star(star_id)

---

### Table `planet`

|                Column              | Type | Collation | Nullable | Default |
|------------------------------------|------|-----------|----------|---------|
| planet_id                          | integer                |   | not null | nextval('planet_planet_id_seq'::regclass) |
| name                               | character varying(100) |   | not null |   |
| star_id                            | integer                |   | not null |   |
| planet_type                        | character varying(60)  |   | not null |   |
| is_spherical                       | boolean                |   | not null |   |
| has_life                           | boolean                |   | not null |   |
| age_in_million_years               | numeric(10,4)          |   |   |   |
| distance_from_earth_in_million_kms | numeric(24,4)          |   |   |   |
| description                        | text                   |   |   |   |

Indexes:
- "planet_pkey" PRIMARY KEY, btree (planet_id)
- "planet_name_key" UNIQUE CONSTRAINT, btree (name)

Foreign-key constraints:
- "planet_star_id_fkey" FOREIGN KEY (star_id) REFERENCES star(star_id)

Referenced by:
- TABLE "moon" CONSTRAINT "moon_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)
- TABLE "observatory_planet_observation" CONSTRAINT "observatory_planet_observation_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)

---

### Table `moon`

|    Column    |   Type  | Collation | Nullable | Default |
|--------------|---------|-----------|----------|---------|
| moon_id      | integer                |   | not null | nextval('moon_moon_id_seq'::regclass) |
| name         | character varying(100) |   | not null |   |
| planet_id    | integer                |   | not null |   |
| is_spherical | boolean                |   | not null |   |
| description  | text    |   |   |   |

Indexes:
- "moon_pkey" PRIMARY KEY, btree (moon_id)
- "moon_name_key" UNIQUE CONSTRAINT, btree (name)

Foreign-key constraints:
- "moon_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)

---

### Table `observatory`

|         Column         | Type    | Collation | Nullable | Default |
|------------------------|---------|-----------|----------|---------|
| observatory_id         | integer                |   | not null | nextval('observatory_observatory_id_seq'::regclass) |
| name                   | character varying(100) |   | not null |   |
| location               | character varying(100) |   | not null |   |
| operated_by            | character varying(100) |   | not null |   |
| is_space_based         | boolean                |   | not null |   |
| first_operational_year | integer                |   | not null |   |
| description            | text    |   |   |   |

Indexes:
- "observatory_pkey" PRIMARY KEY, btree (observatory_id)
- "observatory_name_key" UNIQUE CONSTRAINT, btree (name)

Referenced by:
- TABLE "observatory_planet_observation" CONSTRAINT "observatory_planet_observation_observatory_id_fkey" FOREIGN KEY (observatory_id) REFERENCES observatory(observatory_id)

---

### Table `observatory_planet_observation`

|      Column      | Type    | Collation | Nullable | Default |
|------------------|---------|-----------|----------|---------|
| observatory_planet_observation_id  | integer |   | not null | nextval('observatory_planet_observation_observatory_planet_observation_id_seq'::regclass) |
| name             | character varying(100) |   | not null |   |
| observatory_id   | integer                |   | not null |   |
| planet_id        | integer                |   | not null |   |
| observation_year | integer                |   | not null |   |
| notes            | text                   |   |   |   |

Indexes:
- "observatory_planet_observation_pkey" PRIMARY KEY, btree (observatory_planet_observation_id)
- "observatory_planet_observation_name_key" UNIQUE CONSTRAINT, btree (name)

Foreign-key constraints:
- "observatory_planet_observation_observatory_id_fkey" FOREIGN KEY (observatory_id) REFERENCES observatory(observatory_id)
- "observatory_planet_observation_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)

---

![database diagram](https://harytri87.github.io/catatan-belajar/c-test-celestial-bodies-database/c-celestial-bodies-database.png)

---

## Alur Progres

Maunya semua nama *table* pake bentuk jamak, tapi di tutorialnya udh ditentuin harus gitu. Kalo beda dikit aja ga lulus *test*nya.

### Bikin Database

```sql
CREATE DATABASE universe;
```

### Bikin Table

#### Bikin Table `galaxy`

```sql
CREATE TABLE galaxy (
  galaxy_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  galaxy_type VARCHAR(60) NOT NULL,
  age_in_million_years NUMERIC(10,4),
  distance_from_earth_in_light_years NUMERIC(15,5),
  description TEXT
);
```

#### Bikin Table `star`

```sql
CREATE TABLE star (
  star_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  galaxy_id INT REFERENCES galaxy (galaxy_id)  NOT NULL,
  star_type VARCHAR(60) NOT NULL,
  is_spherical BOOLEAN NOT NULL,
  age_in_million_years NUMERIC(10,4),
  distance_from_earth_in_light_years NUMERIC(12,5),
  description TEXT
);
```

#### Bikin Table `planet`

```sql
CREATE TABLE planet (
  planet_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  star_id INT REFERENCES star (star_id) NOT NULL,
  planet_type VARCHAR(60) NOT NULL,
  is_spherical BOOLEAN NOT NULL,
  has_life BOOLEAN NOT NULL,
  age_in_million_years NUMERIC(10,4),
  distance_from_earth_in_million_kms NUMERIC(24,4),
  description TEXT
);
```

#### Bikin Table `moon`

```sql
CREATE TABLE moon (
  moon_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  planet_id INT REFERENCES planet (planet_id) NOT NULL,
  is_spherical BOOLEAN NOT NULL,
  description TEXT
);
```

#### Bikin Table `observatory`

```sql
CREATE TABLE observatory (
  observatory_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  location VARCHAR(100) NOT NULL,
  operated_by VARCHAR(100) NOT NULL,
  is_space_based BOOLEAN NOT NULL,
  first_operational_year INT NOT NULL,
  description TEXT
);
```

#### Bikin Table `observatory_planet_observation`

```sql
CREATE TABLE observatory_planet_observation (
  observatory_planet_observation_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  observatory_id INT REFERENCES observatory (observatory_id) NOT NULL,
  planet_id INT REFERENCES planet (planet_id) NOT NULL,
  observation_year INT NOT NULL,
  notes TEXT
);
```

---

### Pengeditan

itu yg di atas udh bener semua. Pas proses ngerjain ujiannya mah banyak yg salah atau kelewat, terus dibenerin.  
Jadi kalo bikin baru pake yg di atas, ga usah jalanin *query* di bagian pengeditan ini.  
Langsung aja [isi data](#pengisian-data).

Bagian ini cuma buat referensi.

#### Nambahin kolom baru

1. `observatory_planet_observation`

```sql
ALTER TABLE observatory_planet_observation ADD COLUMN name VARCHAR(100);
```

---

#### Nambahin Constraint NOT NULL

1. `galaxy`

```sql
ALTER TABLE galaxy
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN galaxy_type SET NOT NULL;
```

---

2. `star`

```sql
ALTER TABLE star
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN galaxy_id SET NOT NULL,
  ALTER COLUMN star_type SET NOT NULL,
  ALTER COLUMN is_spherical SET NOT NULL;
```

---

3. `planet`

```sql
ALTER TABLE planet
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN star_id SET NOT NULL,
  ALTER COLUMN planet_type SET NOT NULL,
  ALTER COLUMN is_spherical SET NOT NULL,
  ALTER COLUMN has_life SET NOT NULL;
```

---

4. `moon`

```sql
ALTER TABLE moon
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN planet_id SET NOT NULL,
  ALTER COLUMN is_spherical SET NOT NULL;
```

---

5. `observatory`

```sql
ALTER TABLE observatory
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN location SET NOT NULL,
  ALTER COLUMN operated_by SET NOT NULL,
  ALTER COLUMN is_space_based SET NOT NULL,
  ALTER COLUMN first_operational_year SET NOT NULL;
```

---

6. `observatory_planet_observation`

```sql
ALTER TABLE observatory_planet_observation
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN observatory_id SET NOT NULL,
  ALTER COLUMN planet_id SET NOT NULL,
  ALTER COLUMN observation_date SET NOT NULL;
```

---

#### Nambahin Constraint UNIQUE

1. `galaxy`

```sql
ALTER TABLE galaxy ADD UNIQUE (name);
```

---

2. `star`

```sql
ALTER TABLE star ADD UNIQUE (name);
```

---

3. `planet`

```sql
ALTER TABLE planet ADD UNIQUE (name);
```

---

4. `moon`

```sql
ALTER TABLE moon ADD UNIQUE (name);
```

---

5. `observatory`

```sql
ALTER TABLE observatory ADD UNIQUE (name);
```

---

6. `observatory_planet_observation`

```sql
ALTER TABLE observatory_planet_observation ADD UNIQUE (name);
```

---

#### Ngubah Nama Kolom

1. `observatory_planet_observation`

```sql
ALTER TABLE observatory_planet_observation RENAME COLUMN observation_date TO observation_year;
```

```sql
ALTER TABLE observatory_planet_observation RENAME COLUMN observation_id TO observatory_planet_observation_id;
```

Ganti nama gara-gara *test* buat lulus ujiannya harus gitu.

---

#### Ngubah Tipe Data

1. `galaxy`

```sql
ALTER TABLE galaxy
  ALTER COLUMN age_in_million_years TYPE NUMERIC (10,4),
  ALTER COLUMN distance_from_earth_in_light_years TYPE NUMERIC (15,5);
```

---

2. `star`

```sql
ALTER TABLE star
  ALTER COLUMN age_in_million_years TYPE NUMERIC (10,4),
  ALTER COLUMN distance_from_earth_in_light_years TYPE NUMERIC (12,5);
```

---

3. `planet`

```sql
ALTER TABLE planet
  ALTER COLUMN age_in_million_years TYPE NUMERIC (10,4),
  ALTER COLUMN distance_from_earth_in_million_kms TYPE NUMERIC (24,4);
```

4. `observatory_planet_observation`

```sql
ALTER TABLE observatory_planet_observation
ALTER COLUMN observation_year TYPE INT USING EXTRACT(YEAR FROM observation_year)::INT;
```

Ini ga ada di materi tutorial sebelumnya.  
Ga bisa ngubah langsung ke `INT` gara-gara tipe `DATE` itu ada *dash*nya.  
Walau belum ada data, tp Postgre ngeasumsiin semua perubahan itu pas udh ada data di dalemnya.

---

### Pengisian Data

Buat *escape* tanda kutip satu pake tanda kutip satu lagi.

`'Budi''s house'`

#### Isi Table `galaxy`

```sql
INSERT INTO galaxy (name, galaxy_type, age_in_million_years, distance_from_earth_in_light_years, description)
VALUES ('Milky Way', 'Spiral', 13600, 0, 'Our home galaxy, a spiral galaxy with a diameter of approximately 100,000 light-years.'),
  ('Andromeda Galaxy', 'Spiral', 10000, 2537000, 'Nearest spiral galaxy to the Milky Way, will collide with our galaxy in 4.5 billion years.'),
  ('Triangulum Galaxy', 'Spiral', 12000, 3000000, 'Third largest spiral galaxy in the Local Group after Andromeda and Milky Way.'),
  ('Large Magellanic Cloud', 'Irregular', 13000, 160000, 'Satellite galaxy of the Milky Way, visible from the southern hemisphere.'),
  ('Small Magellanic Cloud', 'Irregular', 13000, 200000, 'Irregular galaxy that is a satellite of the Milky Way.'),
  ('Centaurus A', 'Elliptical', 12000, 13700000, '  Elliptical galaxy with an active supermassive black hole at its center.'),
  ('Whirlpool Galaxy', 'Spiral', 400, 23000000, 'Spiral galaxy interacting with smaller companion galaxy NGC 5194.');
```

---

#### Isi Table `star`

```sql
INSERT INTO star (name, galaxy_id, star_type, is_spherical, age_in_million_years, distance_from_earth_in_light_years, description)
VALUES ('Sun', 1, 'G-type main-sequence star', true, 4600, 0.00002, 'Central star of our solar system, primary energy source for life on Earth.'),
  ('Proxima Centauri', 1, 'Red dwarf', true, 4850, 4.24, 'Nearest star to the Sun, part of the Alpha Centauri system.'),
  ('Betelgeuse', 1, 'Red supergiant', true, 8.5, 700, 'Red supergiant star in Orion constellation, supernova candidate.'),
  ('Sirius', 1, 'A-type main-sequence star', true, 300, 8.6, 'Brightest star in the night sky, binary star system.'),
  ('Vega', 1, 'A-type main-sequence star', true, 455, 25.04, 'Brightest star in Lyra constellation, used as photometric standard. Rotates so fast (92% of breakup velocity) it''s flattened at poles!.'),
  ('55 Cancri', 1, 'K-type main-sequence star', true, 5800, 40.9, 'Binary star system with 5 known exoplanets (''Janssen'' is a super-Earth with possible diamond core!). Host star is metal-rich compared to Sun.'),
  ('UY Scuti', 1, 'Red hypergiant', true, 10, 9500, 'One of largest known stars (≈1,700x Sun''s radius). If placed at Sun''s position, it would engulf Jupiter! Currently in late carbon-burning phase.');
```

---

#### Isi Table `planet`

```sql
INSERT INTO planet (name, star_id, planet_type, is_spherical, has_life, age_in_million_years, distance_from_earth_in_million_kms, description)
VALUES ('Mercury', 1, 'Terrestrial', true, false, 4600, 77300000, 'Closest planet to the Sun, has no significant atmosphere.'),
  ('Venus', 1, 'Terrestrial', true, false, 4600, 41400000, 'Hottest planet in solar system with thick carbon dioxide atmosphere.'),
  ('Earth', 1, 'Terrestrial', true, false, 4600, 0, 'Only known planet with life, 71% of surface covered by water.'),
  ('Mars', 1, 'Terrestrial', true, false, 4600, 78340000, 'Red planet with two small moons, evidence of ancient water activity.'),
  ('Jupiter', 1, 'Gas giant', true, false, 4600, 628730000, 'Largest planet in solar system with over 80 moons.'),
  ('Saturn', 1, 'Gas giant', true, false, 4600, 1275000000, 'Planet with spectacular ring system and over 80 moons.'),
  ('Uranus', 1, 'Ice giant', true, false, 4600, 2723950000, 'Ice giant with 98-degree axial tilt and thin ring system.'),
  ('Neptune', 1, 'Ice giant', true, false, 4600, 4351400000, 'Farthest planet from Sun with strongest winds in solar system.'),
  ('Proxima Centauri b', 2, 'Terrestrial', true, false, 4850, 40140000000000, 'Closest exoplanet to Earth, located in habitable zone.'),
  ('Proxima Centauri c', 2, 'Super-Earth', true, false, 4850, 40140000000000, 'Second planet discovered orbiting Proxima Centauri.'),
  ('Kepler-442b', 3, 'Super-Earth', true, false, 2900, 3700000000000000, 'Exoplanet located in its star''s habitable zone.'),
  ('HD 209458 b', 3, 'Hot Jupiter', true, false, 5000, 1594000000000000, 'Gas giant exoplanet very close to its host star.'),
  ('TRAPPIST-1e', 4, 'Terrestrial', true, false, 7600, 392400000000000, 'One of the planets in TRAPPIST-1 system located in habitable zone.');
```

---

#### Isi Table `moon`

```sql
INSERT INTO moon (name, planet_id, is_spherical, description)
VALUES ('Moon', 3, true, 'Natural satellite of Earth, influences tides and Earth''s rotational stability.'),
  ('Phobos', 4, false, 'Larger and closer moon of Mars, irregularly shaped like a potato.'),
  ('Deimos', 4, false, 'Smaller and more distant moon of Mars, possibly captured asteroid.'),
  ('Io', 5, true, 'Most volcanically active moon of Jupiter with over 400 active volcanoes.'),
  ('Europa', 5, true, 'Icy moon of Jupiter with subsurface ocean, candidate for harboring life.'),
  ('Ganymede', 5, true, 'Largest moon in solar system, bigger than planet Mercury.'),
  ('Callisto', 5, true, 'Jupiter''s moon with oldest and most cratered surface.'),
  ('Amalthea', 5, false, 'Small irregularly shaped moon of Jupiter with reddish coloration.'),
  ('Himalia', 5, false, 'Jupiter''s moon that is member of the Himalia group.'),
  ('Lysithea', 5, false, 'Small moon of Jupiter with retrograde orbit.'),
  ('Titan', 6, true, 'Saturn''s largest moon with thick atmosphere and methane lakes.'),
  ('Enceladus', 6, true, 'Icy moon of Saturn that spouts water from its south pole.'),
  ('Mimas', 6, true, 'Saturn''s moon with large crater making it resemble Death Star.'),
  ('Iapetus', 6, true, 'Saturn''s moon with two-tone coloration, one bright side and one dark.'),
  ('Rhea', 6, true, 'Icy moon of Saturn with thin oxygen atmosphere.'),
  ('Dione', 6, true, 'Saturn''s moon with icy surface and craters.'),
  ('Tethys', 6, true, 'Saturn''s moon with large Odysseus crater'),
  ('Miranda', 7, true, 'Uranus moon with highly varied surface and tall cliffs.'),
  ('Ariel', 7, true, 'Brightest moon of Uranus with valleys and canyons.'),
  ('Umbriel', 7, true, 'Dark moon of Uranus with old cratered surface.'),
  ('Titania', 7, true, 'Largest moon of Uranus with canyons and craters.'),
  ('Oberon', 7, true, 'Second largest moon of Uranus with dark surface and craters.'),
  ('Triton', 8, true, 'Largest moon of Neptune with retrograde orbit and geological activity.'),
  ('Nereid', 8, false, 'Moon of Neptune with highly eccentric orbit.'),
  ('Proteus', 8, false, 'Second largest moon of Neptune with irregular shape.');
```

---

#### Isi Table `observatory`

```sql
INSERT INTO observatory (name, location, operated_by, is_space_based, first_operational_year, description)
VALUES ('Hubble Space Telescope', 'Low Earth Orbit', 'NASA/ESA', true, 1990, 'Space telescope providing high-quality images without atmospheric interference.'),
  ('Palomar Observatory', 'California, USA', 'Caltech', false, 1948, 'Observatory with 200-inch Hale telescope, once the world''s largest.'),
  ('Atacama Large Millimeter Array', 'Chile', 'International collaboration', false, 2011, 'Array of radio telescopes for observing millimeter and submillimeter waves.'),
  ('James Webb Space Telescope', 'L2 Lagrange Point', 'NASA/ESA/CSA', true, 2022, 'Largest infrared space telescope, successor to Hubble.'),
  ('Arecibo Observatory', 'Puerto Rico', 'NSF', false, 1963, 'Radio observatory with 305-meter dish, collapsed in 2020.');
```

---

#### Isi Table `observatory_planet_observation`

```sql
INSERT INTO observatory_planet_observation (name, observatory_id, planet_id, observation_year, notes)
VALUES ('Mars Surface Water Detection', 1, 4, 2003, 'Detailed observation of Mars surface using advanced cameras to search for signs of water.'),
  ('Jupiter Comet Impact Study', 1, 5, 1994, 'Observed impact of comet Shoemaker-Levy 9 collision with Jupiter.'),
  ('Neptune Discovery Confirmation', 2, 8, 1846, 'Early observation of Neptune after discovery based on mathematical predictions.'),
  ('Proxima b Habitability Assessment', 4, 9, 2022, 'Spectroscopic analysis of Proxima Centauri b atmosphere searching for biosignatures. (Preliminary spectroscopy).'),
  ('Venus Atmospheric Anomaly Detection', 3, 2, 2020, 'Tentative detection of phosphine in Venus atmosphere indicating possible biological activity.'),
  ('Uranus Ring System Mapping', 1, 7, 2005, 'Detailed mapping of Uranus rings and its moons.'),
  ('Mercury Solar Transit Observation', 2, 1, 2003, 'Observation of Mercury transit across Sun for general relativity test.');
```

---

---

---

> Instructions
> For this project, you need to log in to PostgreSQL with `psql` to create your database. Do that by entering `psql --username=freecodecamp --dbname=postgres` in the terminal. Make all the tests below pass to complete the project. Be sure to get creative, and have fun!
> 
> Don't forget to connect to your database after you create it 😄
> 
> Here's some ideas for other column and table names: `description`, `has_life`, `is_spherical`, `age_in_million_years`, `planet_types`, `galaxy_types`, `distance_from_earth`.

> Notes:
> If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp universe > universe.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `universe.sql`. The file will be located where the command was entered. If it's anything inside the project folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < universe.sql` in a terminal where the .sql file is.


**Complete the tasks below:**
- You should create a database named `universe`
- Be sure to connect to your database with `\c universe`. Then, you should add tables named `galaxy`, `star`, `planet`, and `moon`
- Each table should have a primary key
- Each primary key should automatically increment
- Each table should have a `name` column
- You should use the `INT` data type for at least two columns that are not a primary or foreign key
- You should use the `NUMERIC` data type at least once
- You should use the `TEXT` data type at least once
- You should use the `BOOLEAN` data type on at least two columns
- Each "star" should have a foreign key that references one of the rows in `galaxy`
- Each "planet" should have a foreign key that references one of the rows in `star`
- Each "moon" should have a foreign key that references one of the rows in `planet`
- Your database should have at least five tables
- Each table should have at least three rows
- The `galaxy` and `star` tables should each have at least six rows
- The `planet` table should have at least 12 rows
- The `moon` table should have at least 20 rows
- Each table should have at least three columns
- The `galaxy`, `star`, `planet`, and `moon` tables should each have at least five columns
- At least two columns per table should not accept `NULL` values
- At least one column from each table should be required to be `UNIQUE`
- All columns named `name` should be of type `VARCHAR`
- Each primary key column should follow the naming convention `table_name_id`. For example, the `moon` table should have a primary key column named `moon_id`
- Each foreign key column should have the same name as the column it is referencing
