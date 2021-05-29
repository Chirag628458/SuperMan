class Hero{
    constructor(x,y,width,height){

        this.body= Bodies.rectangle(200,250,width,height);
        this.width= width;
        this.height=height;
        World.add(world,this.body);
        this.image=loadImage("spiderman1.png")
    }

    display(){
         image(this.image, x,y, this.width, this.height)
    }
    
}