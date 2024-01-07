


function renderChart(index) {
  let pokemonIndex = fetchPokemons['id'].indexOf(index);
  let pokeLabel = fetchPokemons['name'][pokemonIndex];
  let pokeData = fetchPokemons['stats'][pokemonIndex]
  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
    datasets: [{
      label: pokeLabel,
      data: [
        fetchPokemons['stats'][pokemonIndex][0]['base_stat'],
        fetchPokemons['stats'][pokemonIndex][1]['base_stat'],
        fetchPokemons['stats'][pokemonIndex][2]['base_stat'],
        fetchPokemons['stats'][pokemonIndex][3]['base_stat'],
        fetchPokemons['stats'][pokemonIndex][4]['base_stat'],
        fetchPokemons['stats'][pokemonIndex][5]['base_stat'],
      ],
      fill: true,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ],
    }]
  };
  document.getElementById('pokestats').classList.add('aktive')
  document.getElementById('pokeinfos').classList.remove('aktive')
  document.getElementById('pokeabilitys').classList.remove('aktive')
  document.getElementById('infoContainer').innerHTML=`
    <canvas  id="myChart" width="100%" height="50%"></canvas>
  `;
  const ctx = document.getElementById('myChart');
  
  new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 1
        }
      }
    },
  });
}