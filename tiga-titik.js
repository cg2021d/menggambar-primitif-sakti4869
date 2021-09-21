function main() {
    /**
    * @type {HTMLCanvasElement} canvas
    */
   const canvas = document.getElementById('myCanvas');
 
   /**
    * @type {WebGLRenderingContext} gl
    */
   const gl = canvas.getContext('webgl');

   const vertices = [
       0.5, 0.5,        //titik a
       0.5, -0.5,       //titik b
       -0.5, -0.5       //titik c
   ];

   // assign vertices ke buffer
   const positionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   gl.bindBuffer(gl.ARRAY_BUFFER, null);

   //mendefinisikan titik
   const vertexShaderCode = document.getElementById("vertexShaderCode").textContent;
//    const vertexShaderCode = `
//    void main() {
//        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
//        gl_PointSize = 15.0;
//    }
//    `;
 
   //membuat titik
   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, vertexShaderCode);
   gl.compileShader(vertexShader);
 
   //mendefinisikan warna
   const fragmentShaderCode = document.getElementById("fragmentShaderCode").textContent;
//    const fragmentShaderCode = `
//    void main() {
//        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
//    }
//    `;
 
   //membuat warna
   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentShader, fragmentShaderCode);
   gl.compileShader(fragmentShader);
 
   //eksekusi program
   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);
   gl.useProgram(shaderProgram);

   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
   const a_position = gl.getAttribLocation(shaderProgram, 'a_position');
   gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(a_position)
 
   //clear canvas
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
 
   gl.drawArrays(gl.POINTS, 0, 3);
 }