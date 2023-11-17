function startslider(){
    setTimeout(function(){
        document.getElementById('img1').style = `transform:translateX(-100%)`
        document.getElementById('img2').style = `transform:translateX(0%)`
        document.getElementById('img3').style = `transform:translateX(100%)`
    }, 3000)
    setTimeout(function(){
        document.getElementById('img1').style = `transform:translateX(-200%)`
        document.getElementById('img2').style = `transform:translateX(100%)`
        document.getElementById('img3').style = `transform:translateX(0%)`
    }, 6000)
    setTimeout(function(){
        document.getElementById('img1').style = `transform:translateX(-0%)`
        document.getElementById('img2').style = `transform:translateX(-100%)`
        document.getElementById('img3').style = `transform:translateX(-200%)`
    }, 9000)
    startslider()
}
    
