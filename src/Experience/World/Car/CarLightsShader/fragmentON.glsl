varying vec2 vUv;

void main(){
    vec2 vUv = vec2(vUv.x, vUv.y);
    vec3 color = vec3(0.);
    color = vec3(1.0, 0.0078, 0.0078);
    gl_FragColor = vec4(color, 0.5);
}