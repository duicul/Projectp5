var ball_size = 50;
var ball_trans;
var ball_rot;
var ball_speed={x:7,y:7,z:7};;
var ball_acc;
var missles = [];
var rockets = [];
var missle_size=8;
var rocket_speed=5;
var wood,floor_text,brick,fire,space,void_imag,steel;
var can;
var floor_width=40;
var score=0;
var window_height=400,window_width=720;
var targets=[];
var target_count=3;
var inc=100;
var last_fire;
var last_rocket;
var last_barrage;
var rocket_remain;
var barrage_remain;
var rocket_time=500;
var barrage_time=2000;
var rocket_size={radius:20,height:30};
var last_shootgun;
var score_color={r:230,g:25,b:0};
var stage=1;
var score_rot=0;
var rot_inc=Math.PI/36;
function preload() {
  
}

function setup() {
  wood = loadImage('wood.jpg');
  floor_text = loadImage('floor.jpg');
  brick = loadImage('brick.jpg');
  fire = loadImage('fire.jpg');
  space = loadImage('space.jpg');
    steel = loadImage('steel.jpg');
void_imag=loadImage("void.png");
  can=createCanvas(window_width, window_height,WEBGL);
    camera(0, -window_height/1.2, window_height, 0, 0, 0, 0, 1, 0);
  ball_trans = {x:-window_width/2+ball_size,y:-ball_size-floor_width,z:0};
  ball_rot = {x:0,y:0,z:0};    
    last_fire=frameCount;
    last_rocket=frameCount;
    last_barrage=frameCount;
    last_shootgun=frameCount;
}

function keyPressed() {
  if (keyCode === 32) {
   ball_acc=3;
   ball_speed.y=-25;}
    
    if (keyCode === 83)
        shootgun();
    if (keyCode === 87)
        launch_rocket();
    if (keyCode === 69)
        launch_barrage();
 return true;
}

function draw_background()
{push();
 background(130,150,50);
  texture(void_imag);
  translate(0, -window_height/8, -window_height);
  plane(window_width*2,window_height);
 pop();
push();
 texture(void_imag);
 translate(0,window_height*3/8,0);
 rotateX(PI/2);
 plane(window_width*2,window_height*3);
pop();
 push();
 texture(void_imag);
 translate(window_width,-window_height/8,0);
 rotateY(PI/2);
 plane(window_height*3,window_height);
 pop();
 push();
 texture(void_imag);
 translate(-window_width,-window_height/8,0);
 rotateY(PI/2);
 plane(window_height*3,window_height);
 pop();
}

function increase_color()
{if(stage===1)
{score_color.r-=2;
 score_color.g+=2;
if(score_color.r<=0)
    score_color.r=0;
 if(score_color.g>=255)
 {score_color.g=255;
 stage=2;}
}
 else if(stage===2)
{score_color.g-=2;
 score_color.b+=2;
if(score_color.g<=0)
    score_color.g=0;
 if(score_color.b>=255)
 {score_color.b=255;
 stage=3;}
}
 else if(stage===3)
{score_color.b-=2;
 score_color.r+=2;
if(score_color.b<=0)
    score_color.b=0;
 if(score_color.r>=255)
 {score_color.r=255;
 stage=1;rot_inc*=-1;}

}
}

function draw_score()
{score_rot+=rot_inc;
    push();
 translate(0,-200,0);
 rotateY(score_rot);
 //texture();
 //fill(180,90,170);
 fill(color(score_color.r,score_color.g,score_color.b));
 box(50,30,30,24,24);
 pop();    
}


function check_input(){
if (keyIsDown(UP_ARROW)) {
    if(ball_trans.z>=-window_height/2/*+ball_size/2*/)
    ball_trans.z-=ball_speed.z;
     ball_rot.x-=PI/4;}

  if (keyIsDown(DOWN_ARROW)) {
   if(ball_trans.z<=window_height/2/*-ball_size/2*/)
   ball_trans.z+=ball_speed.z;
     ball_rot.x-=PI/4;}
 
 if (keyIsDown(68)) {launch_missle();}
}

function draw_floor()
{push();
 texture(floor_text);
  //rotateX(PI/2);
  //fill(255,0,0);
  box(window_width,floor_width,window_height);
  pop();}

function draw_ball()
{
 if(ball_trans.y>-ball_size-floor_width)
{ball_acc=0;
 ball_speed.y=0;
 ball_trans.y=-ball_size-floor_width;}
 else
 {ball_trans.y+=ball_speed.y;
  ball_speed.y+=ball_acc;} 
 push();
 texture(wood);
 translate(ball_trans.x,ball_trans.y,ball_trans.z);
 rotateX(ball_rot.x);
 rotateY(ball_rot.y);
 rotateZ(ball_rot.z);
 sphere(ball_size);
 pop();}

function launch_missle()
{if(frameCount>=last_fire+5)
    {last_fire=frameCount;
 missles.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z,xspeed:rocket_speed,yspeed:0,zspeed:0});
 }
}

function launch_barrage()
{if(frameCount>=last_barrage+barrage_time)
    {last_barrage=frameCount;
rockets.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z,xspeed:rocket_speed,yspeed:0,zspeed:-2*rocket_speed});     
rockets.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z,xspeed:rocket_speed,yspeed:0,zspeed:0});
rockets.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z,xspeed:rocket_speed,yspeed:0,zspeed:2*rocket_speed}); }}

function launch_rocket()
{if(frameCount>=last_rocket+rocket_time)
    {last_rocket=frameCount;
rockets.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z,xspeed:rocket_speed,yspeed:0,zspeed:0}); }}

function move_rockets()
{var i;
    for(i=0;i<rockets.length;i++)
    {rockets[i].x+=rockets[i].xspeed;
    rockets[i].y+=rockets[i].yspeed;
     rockets[i].z+=rockets[i].zspeed;
    }}

function check_rockets()
{var len=rockets.length,j;
    for(j=0;j<len;j++)
        if(rockets[j].x>window_width/2+targets[j].size)
            {rockets.splice(j,1);
             len--;
            }
    for(j=0;j<rockets.length;j++)
        if(rockets[j].z>window_height/2-rocket_size.height/2||rockets[j].z<-window_height/2+rocket_size.height/2)
            rockets[j].zspeed*=-1;
}

function draw_rockets()
{var i;
    for(i=0;i<rockets.length;i++)
    {push();
     texture(steel);
     translate(rockets[i].x,rockets[i].y,rockets[i].z);
     rotateY(Math.atan(-rockets[i].zspeed/rockets[i].xspeed));
     rotateZ(-Math.PI/2);
     cone(rocket_size.radius,rocket_size.height);
     pop();}}

function shootgun()
{var i;
 //if(frameCount>=last_shootgun+30)
 {last_shootgun=frameCount;
     for(i=0;i<5;i++)
 {if(ball_trans.z+i*missle_size*2<window_height/2)
     missles.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z+i*(missle_size+10)*2}); 
  if(ball_trans.z-i*missle_size*2>-window_height/2)
  missles.push({x:ball_trans.x,y:ball_trans.y,z:ball_trans.z-i*(missle_size+10)*2});}
}}

function move_missles()
{var i;
 for(i=0;i<missles.length;i++)
 {missles[i].x+=Math.random()*3+5;}
 for(i=0;i<missles.length;i++)
 {if(missles[i].x>=window_width/2)
  missles.splice(i,1);}}

function draw_missles()
{var i;
 for(i=0;i<missles.length;i++)
 {push();    
  //fill(0,0,180);
  texture(fire);
  translate(missles[i].x,missles[i].y,missles[i].z);
  sphere(missle_size);
  pop();}}

function gen_targets()
{var i;
    for(i=targets.length;i<=target_count;i++)
        {var val=Math.random();
         var target_mode;
         if(val>0.9)
             target_mode=3;
         else if(val>0.6)
             target_mode=2;
         else target_mode=1;
        targets.push({x:window_width/2,y:-target_mode*20-floor_width,z:(Math.random()*1.9-1)*window_height/2,size:target_mode*20,mode:target_mode,count:target_mode*2,speed:1/target_mode});
        console.log(target_mode);
        }
}

function move_targets()
{var i;
for(i=0;i<targets.length;i++)
    {targets[i].x-=targets[i].speed;}   
}

function check_targets()
{var i,j;
 var len1=missles.length;
 var len2=targets.length;
 for(i=0;i<len1;i++)
     for(j=0;j<len2;j++)
         if((missles[i].x+missle_size>=targets[j].x-targets[j].size)&&((missles[i].z-missle_size<=targets[j].z+targets[j].size&&missles[i].z+missle_size>=targets[j].z-targets[j].size)||(missles[i].z+missle_size>=targets[j].z-targets[j].size&&missles[i].z-missle_size<=targets[j].z+targets[j].size)))
             {targets[j].count--;
              missles.splice(i,1);
              len1--;
             if(targets[j].count<=0)
             {score+=targets[j].mode*10;
              increase_color();   
              targets[j].mode--;
                 targets[j].size=targets[j].mode*20;
                 targets[j].count=targets[j].mode*2;
                 targets[j].speed=1/targets[j].mode;}
              break;
             }
 len1=rockets.length;
 len2=targets.length;
 for(i=0;i<len1;i++)
     for(j=0;j<len2;j++)
         if((rockets[i].x>=targets[j].x-targets[j].size) && (rockets[i].x<=targets[j].x+targets[j].size) &&
            ( (rockets[i].z<=targets[j].z+targets[j].size && rockets[i].z>=targets[j].z-targets[j].size) || (rockets[i].z>=targets[j].z-targets[j].size && rockets[i].z<=targets[j].z+targets[j].size) ) )
             {score+=targets[j].mode*10;targets.splice(j,1);len2--;
             }
  var len=targets.length;
     for(j=0;j<len;j++)
         {if(targets[j].mode<=0)
         {targets.splice(j,1);len--;
         console.log("exploded");
         }
         }
 len=targets.length;
    for(j=0;j<len;j++)
        if(targets[j].x<-window_width/2+targets[j].size)
            {score-=30*targets[j].mode;
             targets.splice(j,1);
             len--;
             console.log("exited");
            }
    if(score>=inc)
    {target_count++;
        inc+=200;}
}

function draw_targets()
{var i;
for(i=0;i<targets.length;i++)
{push();
 var tex;
if(targets[i].mode===1)
    tex=wood;
 else if(targets[i].mode==2)
     tex=brick;
 else tex=steel;
 var l=texture(tex);
 translate(targets[i].x,-floor_width-targets[i].size,targets[i].z);
 box(targets[i].size); 
 pop();
}    
}


function draw()
{ rocket_remain=frameCount-last_rocket;
 if(rocket_remain>=rocket_time)
     rocket_remain=rocket_time;
 barrage_remain=frameCount-last_barrage;
 if(barrage_remain>=barrage_time)
     barrage_remain=barrage_time;
    document.getElementById("score").innerHTML=score+" "+target_count+" "+inc+" rocket: "+Math.floor(rocket_remain/(rocket_time/100))+"% barrage : "+Math.floor(barrage_remain/(barrage_time/100))+"%"; 
 check_input();
 orbitControl();
 draw_background();
 draw_score();
 draw_floor();
 draw_ball();
 move_missles();
 draw_missles();
 move_rockets();
 check_rockets();
 draw_rockets();
 gen_targets();
 move_targets();
 check_targets();
 draw_targets();
 
 
}
