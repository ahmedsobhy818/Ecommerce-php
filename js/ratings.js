class StarsReviews extends HTMLElement{
    
    tmpValue=-1;
    OldValue=-1;

    constructor(){
        super();
        this.readonly=  this.getAttribute('readonly');
        this.AutoRedraw=this.getAttribute('AutoRedraw');
        this.max=parseInt( this.getAttribute('max'));
        this.value=parseInt( this.getAttribute('value'));
        if(this.AutoRedraw!='')//AutoRedraw is not set
            this.drawStars();
        
this.addEventListener('mouseleave',function(){
    this.tmpValue=-1;
    this.drawStars();
})
         
               let rateEvent =new Event('rate');
               this.dispatchEvent(rateEvent)
    
 if(this.AutoRedraw==''){//AutoRedraw is set

var intval;

    intval=setInterval(() => {
        //console.log(this.max);
        //console.log(this.querySelectorAll('i').length);
        //console.log('-------------')
        if(this.AutoRedraw==3)
         {
            clearInterval(intval);
            return;
         }
        
        //if (this.getAttribute('value') !=this.OldValue)
        //if (this.max !=this.querySelectorAll('i').length)
        //{
           // this.OldValue=this.getAttribute('value');
           //if(isDrawn==false) 
            this.drawStars();

            //this.AutoRedraw++;
             //console.log("asd")
        //}
    }, 1000)};

            }

           // isDrawn=false;
    drawStars(){
        
    this.innerHTML='';
    
    var input=document.createElement('input');
    input.setAttribute('type','hidden');
    input.setAttribute('name',this.id);
    input.value=this.getAttribute('value');
    this.OldValue=input.value;
    this.append(input);
    

    let value= parseFloat(this.getAttribute('value'));
    let max=parseInt( this.getAttribute('max'));

    if (this.tmpValue!=-1)
         value=this.tmpValue;

    if(value>max)
       value=max;


       let nWholes = Math.floor(value);
       let nParts= value%1==0?0:1;
       let nEmpty=max-nWholes-nParts;

       for(let i=0;i<nWholes;i++){
           var iElement=document.createElement('i');
           iElement.setAttribute('index',i)
           iElement.classList.add('fas')
           iElement.classList.add('fa-star')
           this.append(iElement)
       }

       for(let i=0;i<nParts;i++){
        var iElement=document.createElement('i');
        iElement.setAttribute('index',i+ nWholes)
        iElement.classList.add('fas')
        iElement.classList.add('fa-star-half-alt')
        this.append(iElement)
       }

       for(let i=0;i<nEmpty;i++){
        var iElement=document.createElement('i');
        iElement.setAttribute('index',i+ nWholes+ nParts)
        iElement.classList.add('far')
        iElement.classList.add('fa-star')
        this.append(iElement)
       }

       this.querySelectorAll('.fa-star').forEach(item=>{
          item.addEventListener('click',event=>{
              if(this.readonly=='')
               return;

               var index=parseInt( item.getAttribute('index'));
               
               this.tmpValue=-1;
               this.setAttribute('value',index+1);
               this.value=index+1;
               this.drawStars();

               let rateEvent =new Event('rate');
               this.dispatchEvent(rateEvent)

          })
       })

       this.querySelectorAll('.fa-star').forEach(item=>{
        item.addEventListener('mousemove',event=>{

            if(this.readonly=='')
               return;

             var index=parseInt( item.getAttribute('index'));
             this.tmpValue=index+1;

             //this.setAttribute('value',index+1);
             this.drawStars();

        })
     })


// isDrawn=true;
    }
}

window.customElements.define('stars-reviews', StarsReviews)

