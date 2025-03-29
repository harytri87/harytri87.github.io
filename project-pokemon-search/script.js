const searchInput 				= document.getElementById("search-input");
const searchButton 				= document.getElementById("search-button");
const searchForm 					= document.getElementById("search-form");
const pokemonNameOutput 	= document.getElementById("pokemon-name");
const pokemonIdOutput 		= document.getElementById("pokemon-id");
const weightOutput 				= document.getElementById("weight");
const heightOutput 				= document.getElementById("height");
const pokemonImageOutput 	= document.getElementById("sprite");
const typesOutput 				= document.getElementById("types");
const hpOutput 						= document.getElementById("hp");
const attackOutput 				= document.getElementById("attack");
const defenseOutput 			= document.getElementById("defense");
const specialAtkOutput		= document.getElementById("special-attack");
const specialDefOutput		= document.getElementById("special-defense");
const speedOutput 				= document.getElementById("speed");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

let pokemonList = null;

// ngambil data dari api terus return datanya
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

// Cek ada ga Pokemonnya, kalo ada kirim datanya ke display
const checkPokemon = async (pokemonIdentity) => {

	/*
			window.onload ada loophole, jadinya di sini.
			Pas pertama kali klik tombol search bakal agak lama,
			tapi seterusnya bakal lancar (ga bakal fetch lagi).
	*/
  if (!pokemonList) {
    pokemonList = await fetchData(pokemonUrl);
  }

  const { results } = pokemonList;
  const searchKey = pokemonIdentity.toLowerCase().trim();

  const pokemon = results.find(({ id, name, url }) => {
  	return id === Number(searchKey) || name === searchKey;
  });

  if (!pokemon) {
  	alert("Pokémon not found");
  	resetDisplay();
  	return;
  }

  const pokemonDetails = await fetchData(pokemon.url);

  displayPokemon(pokemonDetails);
};

// Nampilin rincian Pokemon ke browser
const displayPokemon = (pokemonInfo) => {
	const { id, name, sprites, types, stats, weight, height } = pokemonInfo;

	pokemonNameOutput.textContent = name;
	pokemonIdOutput.textContent = "#" + id;
	weightOutput.textContent = `Weight: ${weight}`;
	heightOutput.textContent = `Height: ${height}`;
	pokemonImageOutput.src = sprites.front_default;

	typesOutput.innerHTML = "";
	types.forEach(type => {
		typesOutput.innerHTML += `<li class="pokemon-type ${type.type.name}">${type.type.name}</li>`;
	});

	stats.forEach(({ base_stat, stat }) => {
		const elementTag = document.getElementById(stat.name);
		elementTag.textContent = base_stat;
	});
};

// Ngereset tampilan browser
const resetDisplay = () => {
	searchInput.value = "";
	pokemonNameOutput.textContent = "";
	pokemonIdOutput.textContent = "";
	weightOutput.textContent = "";
	heightOutput.textContent = "";
	// <img> kalo srcnya kosong jadi ada border bawaan. Ini gambar transparant kecil
	pokemonImageOutput.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgX5A1rYAAAAASUVORK5CYII=";
	typesOutput.innerHTML = "";
	hpOutput.textContent = "";
	attackOutput.textContent = "";
	defenseOutput.textContent = "";
	specialAtkOutput.textContent = "";
	specialDefOutput.textContent = "";
	speedOutput.textContent = "";
};

/*
		Ini buat ngeload 1x di awal doang. Tapi kalo user ngeklik cari
		sebelum ini berhasil load, bakal error. Balapan jadinya
*/
// window.addEventListener("DOMContentLoaded", async () => {
//   pokemonList = await fetchData(pokemonUrl);
// });


/*
	Pake form submit biar validasi input kayak "require" itu tetep jalan.
	Tapi bakal ngerefresh halaman (defaultnya form submit).
*/
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkPokemon(searchInput.value);
});
