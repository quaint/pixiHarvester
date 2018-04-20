precision mediump float;

varying vec2 v_tex_coord;

uniform sampler2D u_texture;
uniform sampler2D mask;
uniform sampler2D field_ground;
uniform sampler2D field_done;

void main()
{
    vec4 val = texture2D(mask, v_tex_coord);
    if (val.a > 0.0 && val.b > 0.0) {
        gl_FragColor = texture2D(field_ground, v_tex_coord);
    } else if (val.a > 0.0 && val.r > 0.0) {
        gl_FragColor = texture2D(field_done, v_tex_coord);
    } else {
        gl_FragColor = texture2D(u_texture, v_tex_coord);
    }
}
