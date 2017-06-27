/*function main() {

	var middleThickness = 1;
	var helixWidth = 5;
	var stringRadius = 1;
	
	var helix = square([middleThickness, helixWidth]);
	helix = helix.center([true, true]);

	var string = circle(stringRadius);
	string = string.center([true, true]);

	helix = union(
		 helix
		,string.translate([0, helixWidth/2, 0])
		,string.translate([0, 0-helixWidth/2, 0])
	);
	
	helix = linear_extrude({ height: 20, twist: 360, slices: 20}, helix);
	
	return helix;
}*/

/*
function main() {

	var middleThickness = 1;
	var helixWidth = 5;
	var stringRadius = 1;
	
	var helix = square([middleThickness, helixWidth]);
	helix = helix.center([true, true]);

	var string = circle(stringRadius);
	string = string.center([true, true]);

	string = string.translate([0, 0-helixWidth/2, 0]);
	
	helix = union(
		 linear_extrude({ height: 30, twist: 720, slices: 20}, string).center([true, true, false])
		,linear_extrude({ height: 30, twist: 720, slices: 20}, string).center([true, true, false]).rotateZ(180+60)
	);
	
	return helix;
}*/

function main() {

	var angle = 140;
	var height = 25;
	var slices = 150;
	var turns = 1.16;
	var basesPerTurn = 10;
	var baseCount = basesPerTurn * turns;

	/*var c = circle({r: 0.5, fn: 10, center: true});
	
	var helix = chain_hull(
		 c.translate([3, 0, 0])
		,c.translate([0, 0, 0]).rotateZ(angle/2)
		,c.translate([3, 0, 0]).rotateZ(angle)
	);*/

	var c = circle({r: 1, fn: 40, center: true});

	var border = circle({r: 1, fn: 50, center: true});
	border = border.scale([1, 1.41, 1]);

	var helix = union(
		//helix
		 border.translate([3.5, 0, 0])
		,border.translate([3.5, 0, 0]).rotateZ(angle)
	);

	helix = linear_extrude({ height: height, twist: 360*turns, slices: slices}, helix).setColor([1, 1, 0]);

	c = c.scale([1, 1.41, 1]);
	
	var basepair = chain_hull(
		 c.translate([3.5, 0, 0])
		,c.translate([0, 0, 0]).rotateZ(angle/2)
		,c.translate([3.5, 0, 0]).rotateZ(angle)
	);

	var basepairheight = 1.2;
	var relativeheight = basepairheight / height;

	basepair = linear_extrude({ height: basepairheight, twist: 360*turns*relativeheight, slices: slices*relativeheight}, basepair).setColor([0, 1, 0]);

	var basepairs = [];

	for(var i = 0; i < baseCount; i++){
		basepairs.push(
			basepair
				.translate([0, 0, (height/baseCount) * i])
				.rotateZ((turns*360)/baseCount * i)
		);
	}
	
	helix = union(
		helix,
		basepairs
	);

	var grommetRadius = 2;

	var grommet = rotate_extrude({fn:50}, circle({radius: 0.7, center: true, fn: 30}).translate([grommetRadius,0,0]) );

	grommet = grommet.rotateX(90);
	grommet = grommet.rotateZ(turns*360 + angle/2 + 90);

	grommet = grommet.translate([0, 0, height + grommetRadius - 0.7]);

	helix = union(
		 helix
		,grommet
	);

	helix = union(
		helix,
		helix.translate([15, 0, 0])
	);
	
	return helix;
}




