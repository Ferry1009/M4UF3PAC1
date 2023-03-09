document.addEventListener('DOMContentLoaded', () => {
    const pantalla      = document.querySelector("#pantalla");
    const hippo = document.querySelector(".hippo");
    let punts = 0;
//  Situem el hippo en el centre de la pantalla
    hippo.style.top  = (pantalla.clientHeight - hippo.clientHeight)/2 + "px";
    hippo.style.left = (pantalla.clientWidth - hippo.clientWidth)/2 + "px";


//  Controlem que el hippo no surti de la pantalla
    function controlarLimits(){
        if(hippo.offsetLeft < 0) 
            hippo.style.left = 0;
        if(hippo.offsetTop < 0)  
            hippo.style.top  = 0;
        if(hippo.offsetTop+hippo.clientHeight > pantalla.clientHeight) 
            hippo.style.top  = (pantalla.clientHeight - hippo.clientHeight) + "px";
        if(hippo.offsetLeft+hippo.clientWidth > pantalla.clientWidth)
            hippo.style.left = (pantalla.clientWidth - hippo.clientWidth) + "px";
    }


    boles = generateBalls(20);
    function generateBalls(amountBalls){
        
        let boles = [];
        let color; 
        let left;
        let top;
        let tamany;

        for(let i=0; i<amountBalls; i++){
            boles[i]= document.createElement("div");
            document.body.appendChild(boles[i]);

            boles[i].style.border = "solid black 2px";
            boles[i].style.borderRadius = "100%";
            
            boles[i].style.position = "absolute";

            // boles[i].style.width = 30 + "px";
            // boles[i].style.height = 30 + "px"

            color = Math.random() * (4 - 1) + 1;

            if(Math.round(color)==1) boles[i].style.backgroundColor = "yellow";
            else if(Math.round(color)==2) boles[i].style.backgroundColor = "green";
            else if(Math.round(color)==3) boles[i].style.backgroundColor = "red";
            else if(Math.round(color)==4) boles[i].style.backgroundColor = "blue";
           
            // TAMANY ALEATORI DE LES BOLES
            tamany = Math.random() * (60 - 30) + 30;

            boles[i].style.width = tamany + "px";
            boles[i].style.height = tamany + "px";

            left = Math.random() * (pantalla.clientWidth-boles[i].clientWidth - 0) + 0;
            top = Math.random() * (pantalla.clientHeight-boles[i].clientHeight - 0) + 0;

            boles[i].style.top = top + "px";
            boles[i].style.left = left + "px";


        }
        return boles;
    }
    
    function bolesGrogues()
    {
        let cont=0;

        for(let i=0; i<20; i++)
        {
            if(boles[i].style.backgroundColor=="yellow") cont++;
        }
        return cont;
    }

    let grogues = bolesGrogues();

    function detectarXoc(boles)
    {
        for(let i=0; i<20;i++)
        {
            if(
            (hippo.offsetTop < boles[i].offsetTop+boles[i].clientHeight) && 
            (hippo.offsetTop+hippo.clientHeight > boles[i].offsetTop) &&
            (hippo.offsetLeft+hippo.clientWidth > boles[i].offsetLeft) &&
            (hippo.offsetLeft < boles[i].offsetLeft+boles[i].clientWidth)
            
        )
        {
            if(boles[i].style.backgroundColor=="yellow") {
                punts++;
                grogues--;
            }
            else punts --;

            console.log(punts);
            boles[i].remove();
        } 
        }
    
    }

    function mostraResultat()
    {
        document.body.innerHTML = '';

        const resultat = document.createElement("h1");
        const puntuacio = document.createElement("h2");

        if(punts>=1)
        {
            resultat.textContent = "Victory!";
        }
        else 
        {
            resultat.textContent = "Game Over!";
        }

        puntuacio.textContent = "Puntuació: "+ punts;
        
        resultat.style.textAlign = "Center";
        puntuacio.style.textAlign = "Center";
        document.body.appendChild(resultat);
        document.body.appendChild(puntuacio);

    }

    //  Habilitem que el hippo es mogui amb el ratolí
    window.addEventListener('mousemove', (e) => {                  
        hippo.style.top  = e.clientY - hippo.clientHeight/2 + "px";
        hippo.style.left = e.clientX - hippo.clientWidth/2  + "px";
        controlarLimits();   
        detectarXoc(boles);  
        if(grogues ==0 )
        {
            mostraResultat();
        }
    });
});

