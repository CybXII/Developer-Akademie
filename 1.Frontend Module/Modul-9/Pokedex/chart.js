function renderChart() {
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