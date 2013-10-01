function Circle(name)
{
	this.x = Math.random()*100+300;
	this.y = Math.random()*100+150;
	
	if(name == "master")
		this.charge = 0.0000000000000001;
	else
		this.charge = Math.random()*50+10;

	this.mass = this.radius = this.charge;
	this.name = name;
	
	//method that draws the circle
	this.draw = function(selector)
	{
		var target = document.getElementById(selector);

		if(this.name != 'master')
		target.innerHTML = target.innerHTML + "<div id='circle_"+this.name+"'><div style='text-align:center; vertical-align:middle; position:absolute; top: "+this.y+"px; left: "+this.x+"px; border: 1px solid red; border-radius: "+this.radius+"px; width: "+this.radius+"px; background-color:blue; height: "+this.radius+"px;'>"+this.mass.toFixed(1)+"</div></div>";
		return this;
	}

	this.redraw = function()
	{
		var target = document.getElementById('circle_'+this.name);

		if(this.name != 'master')
		target.innerHTML = "<div style='text-align:center; vertical-align:middle; position:absolute; top: "+this.y+"px; left: "+this.x+"px; border: 1px solid red; border-radius: "+this.radius+"px; width: "+this.radius+"px; background-color:blue;  height: "+this.radius+"px;'>"+this.mass.toFixed(1)+"</div>";
		return this;
	}

	this.move = function(delta_x, delta_y)
	{
		this.x = this.x + delta_x;
		this.y = this.y + delta_y;
		return this;
	}
}

function Field(total_circles)
{
	this.total_circles = total_circles;
	this.circles = new Array();
	
	//have the first circle be where the mouse currently is
	this.circles[0] = new Circle("master");

	//create the circles
	for(var i=1; i<=total_circles; i++)
	{
		this.circles[i] = new Circle(i);
	}

	//method that would draw the circles in the html
	this.draw_circles = function(selector)
	{
		for(var i=0; i<this.circles.length; i++)
		{
			this.circles[i].draw(selector);
		}
	}

	this.SetCursor = function(mouse_x, mouse_y, weight)
	{
		if(mouse_x != null && mouse_y != null)
		{
			this.circles[0].x = mouse_x;
			this.circles[0].y = mouse_y;
			this.circles[0].mass = this.circles[0].radius = this.circles[0].charge = weight;
		}
	}

	//calculate accelerator for each circle
	this.calculateAccelerationAndMove = function()
	{
		for(var i=0; i<this.circles.length; i++)
		{
			var force_x = 0;
			var force_y = 0;

			//calculate the force felt by other circles/particles
			for(var j=0; j<this.circles.length; j++)
			{
				if(i!==j)
				{
					var x_distance = this.circles[i].x - this.circles[j].x;
					var y_distance = this.circles[i].y - this.circles[j].y;
					var distance = Math.sqrt(Math.pow(x_distance,2)+Math.pow(y_distance,2));

					var force = this.circles[i].charge * this.circles[j].charge / Math.pow(distance,2)*5;

					force_x = force_x + x_distance*force/distance;
					force_y = force_y + y_distance*force/distance;
				}
			}

			var acceleration_x = force_x / this.circles[i].mass;
			var acceleration_y = force_y / this.circles[i].mass;

			this.circles[i].move(acceleration_x, acceleration_y).redraw();
			// console.log(i+" is feeling a_x of " + acceleration_x + " and a_y of " + acceleration_y);
		}	//close of for loop

	} //close of calculateAcceleration

}