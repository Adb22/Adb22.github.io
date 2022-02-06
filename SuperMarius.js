var canvas;
var gl;
var movement = false;

var colorLoc;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.19, 0.58, 0.98, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var vertices = [
        vec2( -0.1, -0.9 ),
        vec2( -0.1, -0.65 ),
		vec2(  0, -0.775),
		vec2(  0.95, -0.1),
		vec2(  0.95, -0.91),
		vec2(  1.0, -0.91),
		vec2(  1.0, -0.1),
		vec2( -1.0, -0.1),
		vec2( -1.0, -0.91),
		vec2( -0.95, -0.91),
		vec2( -0.95, -0.1),
		vec2( -1.0, -0.91),
		vec2( -1.0, -1.0),
		vec2( 1.0, -1.0),
		vec2( 1.0, -0.91)

    ];
	
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );
	
	
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	

    // Event listener for keyboard
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 37:	// vinstri ör
                xmove = -0.04;
				if (vertices[2][0] > vertices[1][0])
				vertices[2][0] -= 0.2;
				movement = false;
                break;
            case 39:	// hægri ör
                xmove = 0.04;
				if (vertices[2][0] < vertices[1][0])
					vertices[2][0] += 0.2;
				movement = false;
                break;
			case 32:   // space bar
				ymove = 0.04;
				movement = true;
				if(vertices[0][1] > -0.2) 
					ymove = 0;
				break;
            default:
                xmove = 0.0;
				ymove = 0.0;
        }
		if (!movement) {
			for(i=0; i<3; i++) {
				vertices[i][0] += xmove;
			}
			
		}
		else {
			for(i=0; i<3; i++) {
				vertices[i][1] += ymove;
			}
			
		}
		
		if (vertices[1][1] > -0.2) {
			while (vertices [1][1] > -0.65) {
				for(i=0; i<3; i++) {
					vertices[i][1] -= ymove;
				}
			}
		}
		
		if (vertices[1][1] <= -0.65) {
			ymove = 0.0;
		}
		
		if ((vertices[2][0] < -0.96) && (vertices[2][1] < 0)) {
			for(i=0; i<3; i++) {
				vertices[i][0] += 0.04;
			}
		}
		
		if ((vertices[2][0] > 0.96) && (vertices[2][1] < 0)) {
			for(i=0; i<3; i++) {
				vertices[i][0] -= 0.04;
			}
		}
		

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    } );

	colorLoc = gl.getUniformLocation( program, "fColor" );
	
	

    render();
}


function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	gl.uniform4fv( colorLoc, vec4(0.99, 0.91, 0.74, 1.0) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
	
	gl.uniform4fv( colorLoc, vec4(0.98, 0.84, 0.01, 1.0));
	gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 7, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 11, 4 );
	
    window.requestAnimFrame(render);

}
