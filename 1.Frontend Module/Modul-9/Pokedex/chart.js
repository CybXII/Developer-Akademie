function renderchart() {


  const ctx = document.getElementById('myChart');
  
  new Chart(ctx, {
    type: 'radar',
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