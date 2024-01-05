function renderchart() {


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