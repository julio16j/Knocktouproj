    var stage = document.getElementById('svs'), // Get the canvas element by Id
            ctx = stage.getContext('2d'); // Canvas 2d rendering context
    var cobra = {"x": 10, "y": 10, "wid":20, "hei":20, cor: "#299", direcao : [0,1]};
    var frutinha = {"x": 0, "y":0, "wid":15, "hei":15, cor: "#992"};
    //Draw Rectangle function		
    function drawRect(x,y,wid,hei, cor) {
        ctx.fillStyle = cor; // Fill color of rectangle drawn
        ctx.fillRect(x, y, wid, hei); //This will draw a rectangle of 20x20
    }

    drawRect(cobra.x,cobra.y,cobra.wid,cobra.hei, cobra.cor); //Drawing rectangle on initial load

    //move rectangle inside the canvas using arrow keys
    window.onkeydown = function(event) {
        var keyPr = event.keyCode; //Key code of key pressed
    
        if(keyPr === 39 && cobra.direcao[0]==0){
            cobra.direcao = [1,0]; //direita
        }
        else if(keyPr === 37 && cobra.direcao[0]==0){
            cobra.direcao = [-1,0]; //esquerda
        }
        else if(keyPr === 38 &&  cobra.direcao[1]==0) {
            cobra.direcao = [0,-1] //cima
        }
        else if(keyPr === 40 &&  cobra.direcao[1]==0){
            cobra.direcao = [0,1] //baixo
        }
    };

    function colisao(){
        if (cobra.x>500 || cobra.y>500 || cobra.x<0 || cobra.y<0)
            gameOver();
        if(cobra.x==frutinha.x && cobra.y==frutinha.y){
            comeu();
        }

        
    }

    function gameOver(){
        
    }

    function comeu(){
        cobra = {"x": 10, "y": 10, "wid":20, "hei":20, cor: "#299", direcao : [0,1]};
    }

    function cobraAnda(){
        cobra.x = cobra.x + cobra.direcao[0]*20
        cobra.y = cobra.y + cobra.direcao[1]*20
    }
    function atualiza(){
        colisao();
        ctx.clearRect(0,0, 500, 500);
        drawRect(cobra.x,cobra.y,cobra.wid,cobra.hei, cobra.cor);
        drawRect(frutinha.x,frutinha.y,frutinha.wid,frutinha.hei, frutinha.cor);
    }
    setInterval(atualiza, 100);
    setInterval(cobraAnda, 500);