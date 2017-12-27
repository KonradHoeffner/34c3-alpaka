class Sprite
{
 constructor(img, width, height)
 {
   this.img = new Image();
   this.img.src=img;
   this.width = width;
   this.height = height;
 }

 draw(ctx, x, y)
 {
  ctx.drawImage(this.img,x,y, this.width,this.height);
 }

}
