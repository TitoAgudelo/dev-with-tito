"use client";

import { useEffect, useRef } from "react";

/*
 * Adapted from ThreeUI's MIT-licensed Cloud Field / Strata renderer.
 * Copyright (c) 2026 Meng To. See THIRD_PARTY_NOTICES.md.
 * Source: https://threeui.com/backgrounds/portal-field/cloud-field
 */

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_quality;

float hash(float value) { return fract(sin(value) * 43758.5453123); }
float hash2(vec2 point) { return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453); }

float noise(float value) {
  float integer = floor(value);
  float fraction = fract(value);
  fraction = fraction * fraction * (3.0 - 2.0 * fraction);
  return mix(hash(integer), hash(integer + 1.0), fraction);
}

float fbm(float value, float octaves) {
  float result = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int index = 0; index < 6; index++) {
    if (float(index) >= octaves) break;
    result += amplitude * noise(value * frequency);
    frequency *= 2.17;
    amplitude *= 0.48;
  }
  return result;
}

float meteor(vec2 uv, float time) {
  float cycle = mod(time * 0.11, 1.0);
  float seed = floor(time * 0.11);
  float first = hash(seed * 7.31);
  float second = hash(seed * 13.17);
  if (first > 0.24) return 0.0;
  vec2 start = vec2(0.18 + second * 0.64, 0.72 + first * 0.2);
  vec2 direction = normalize(vec2(1.0, -0.62 - first * 0.24));
  float progress = smoothstep(0.0, 0.7, cycle);
  vec2 position = start + direction * progress * 0.48;
  vec2 delta = uv - position;
  float along = dot(delta, direction);
  float perpendicular = length(delta - direction * along);
  float trail = smoothstep(0.0, -0.12, along) * smoothstep(-0.18, -0.04, along);
  float core = smoothstep(0.003, 0.0, perpendicular) * trail;
  float glow = smoothstep(0.012, 0.0, perpendicular) * trail * 0.3;
  float fade = smoothstep(0.0, 0.1, cycle) * smoothstep(0.8, 0.55, cycle);
  return (core + glow) * fade;
}

float stars(vec2 uv, float density) {
  vec2 cell = floor(uv * density);
  vec2 subdivision = fract(uv * density);
  float random = hash2(cell);
  float brightness = step(0.978, random);
  float size = 0.025 + random * 0.04;
  float distanceToStar = length(subdivision - vec2(hash2(cell + 100.0), hash2(cell + 200.0)));
  float star = brightness * smoothstep(size, 0.0, distanceToStar);
  star *= 0.58 + 0.42 * sin(u_time * (0.7 + random * 2.0) + random * 6.28);
  return star;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pointer = u_pointer * 2.0 - 1.0;

  vec3 skyTop = vec3(0.965, 0.961, 0.949);
  vec3 skyMiddle = vec3(0.925, 0.910, 0.949);
  vec3 skyBottom = vec3(0.871, 0.835, 0.933);
  vec3 color = mix(skyBottom, skyMiddle, smoothstep(0.3, 0.62, uv.y));
  color = mix(color, skyTop, smoothstep(0.6, 1.0, uv.y));

  float horizon = 0.34;
  float horizonGlow = exp(-pow((uv.y - horizon) * 3.8, 2.0));
  color += vec3(0.10, 0.04, 0.18) * horizonGlow * 0.13;
  float centerGlow = exp(-pow((uv.x - 0.58) * 1.45, 2.0)) * exp(-pow((uv.y - horizon) * 4.0, 2.0));
  color += vec3(0.11, 0.06, 0.20) * centerGlow * 0.11;

  float starField = stars(uv * vec2(aspect, 1.0), 58.0);
  if (u_quality > 0.75) {
    starField += stars(uv * vec2(aspect, 1.0) + 500.0, 96.0) * 0.55;
    starField += stars(uv * vec2(aspect, 1.0) + 900.0, 142.0) * 0.25;
  }

  float starMask = 1.0;
  float coordinate;
  float verticalShift;
  float profile;
  float ridge;
  float mountain;
  float ridgeDistance;
  float ridgeGlow;
  vec3 layerColor;

  layerColor = vec3(0.815, 0.775, 0.875);
  coordinate = uv.x * aspect * 1.6 + u_time * 0.006 + pointer.x * 0.010;
  verticalShift = pointer.y * 0.003;
  profile = fbm(coordinate, 5.0) * 0.10 + fbm(coordinate * 0.3 + 17.0, 3.0) * 0.07;
  ridge = 0.40 + profile + verticalShift;
  mountain = smoothstep(ridge + 0.003, ridge - 0.001, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = smoothstep(0.014, 0.0, ridgeDistance) * 0.12;
  color = mix(color, layerColor, mountain * 0.66);
  color += vec3(0.25, 0.12, 0.44) * ridgeGlow;
  starMask *= 1.0 - mountain;

  layerColor = vec3(0.850, 0.820, 0.900);
  coordinate = uv.x * aspect * 2.0 + u_time * 0.012 + pointer.x * 0.020;
  verticalShift = pointer.y * 0.006;
  profile = fbm(coordinate, 5.0) * 0.13 + fbm(coordinate * 0.3 + 34.0, 3.0) * 0.091;
  ridge = 0.33 + profile + verticalShift;
  mountain = smoothstep(ridge + 0.003, ridge - 0.001, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = smoothstep(0.014, 0.0, ridgeDistance) * 0.10;
  color = mix(color, layerColor, mountain * 0.70);
  color += vec3(0.25, 0.12, 0.44) * ridgeGlow;
  starMask *= 1.0 - mountain;

  layerColor = vec3(0.885, 0.855, 0.915);
  coordinate = uv.x * aspect * 2.6 + u_time * 0.020 + pointer.x * 0.034;
  verticalShift = pointer.y * 0.010;
  profile = fbm(coordinate, 5.0) * 0.16 + fbm(coordinate * 0.3 + 51.0, 3.0) * 0.112;
  ridge = 0.26 + profile + verticalShift;
  mountain = smoothstep(ridge + 0.003, ridge - 0.001, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = smoothstep(0.014, 0.0, ridgeDistance) * 0.08;
  color = mix(color, layerColor, mountain * 0.74);
  color += vec3(0.25, 0.12, 0.44) * ridgeGlow;
  starMask *= 1.0 - mountain;

  layerColor = vec3(0.915, 0.895, 0.930);
  coordinate = uv.x * aspect * 3.2 + u_time * 0.030 + pointer.x * 0.050;
  verticalShift = pointer.y * 0.015;
  profile = fbm(coordinate, 5.0) * 0.14 + fbm(coordinate * 0.3 + 68.0, 3.0) * 0.098;
  ridge = 0.18 + profile + verticalShift;
  mountain = smoothstep(ridge + 0.003, ridge - 0.001, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = smoothstep(0.014, 0.0, ridgeDistance) * 0.055;
  color = mix(color, layerColor, mountain * 0.78);
  color += vec3(0.25, 0.12, 0.44) * ridgeGlow;
  starMask *= 1.0 - mountain;

  layerColor = vec3(0.945, 0.930, 0.945);
  coordinate = uv.x * aspect * 4.0 + u_time * 0.044 + pointer.x * 0.070;
  verticalShift = pointer.y * 0.021;
  profile = fbm(coordinate, 5.0) * 0.11 + fbm(coordinate * 0.3 + 85.0, 3.0) * 0.077;
  ridge = 0.09 + profile + verticalShift;
  mountain = smoothstep(ridge + 0.003, ridge - 0.001, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = smoothstep(0.014, 0.0, ridgeDistance) * 0.035;
  color = mix(color, layerColor, mountain * 0.82);
  color += vec3(0.25, 0.12, 0.44) * ridgeGlow;
  starMask *= 1.0 - mountain;

  color -= vec3(0.20, 0.10, 0.34) * starField * starMask * 0.22;
  if (u_quality > 0.75) {
    color -= vec3(0.24, 0.12, 0.40) * meteor(uv * vec2(aspect, 1.0), u_time) * starMask * 0.30;
  }
  float vignette = 1.0 - 0.10 * pow(length((uv - 0.5) * vec2(1.1, 1.5)), 2.0);
  color *= vignette;
  color += vec3(0.10, 0.05, 0.20) * exp(-pow((uv.y - 0.33) * 5.0, 2.0)) * 0.025;
  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to allocate a WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "WebGL shader compilation failed.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let gl: WebGLRenderingContext | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let animationFrame = 0;
    let elapsed = 0;
    let previousFrame = 0;
    let inViewport = true;
    let pageVisible = document.visibilityState === "visible";
    let contextAvailable = true;
    let disposed = false;
    let pointerX = 0.58;
    let pointerY = 0.52;
    let smoothPointerX = pointerX;
    let smoothPointerY = pointerY;

    const initialize = () => {
      try {
        gl = canvas.getContext("webgl", {
          alpha: false,
          antialias: false,
          depth: false,
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
          stencil: false,
        });
        if (!gl) return;

        vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        program = gl.createProgram();
        if (!program) throw new Error("Unable to allocate a WebGL program.");
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) ?? "WebGL program linking failed.");
        }
        gl.useProgram(program);

        buffer = gl.createBuffer();
        if (!buffer) throw new Error("Unable to allocate a WebGL buffer.");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const resolution = gl.getUniformLocation(program, "u_resolution");
        const time = gl.getUniformLocation(program, "u_time");
        const pointer = gl.getUniformLocation(program, "u_pointer");
        const quality = gl.getUniformLocation(program, "u_quality");

        const resize = () => {
          if (!gl) return;
          const { width, height } = root.getBoundingClientRect();
          const mobile = width < 768;
          const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
          const renderWidth = Math.max(1, Math.round(width * pixelRatio));
          const renderHeight = Math.max(1, Math.round(height * pixelRatio));
          if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
            canvas.width = renderWidth;
            canvas.height = renderHeight;
            gl.viewport(0, 0, renderWidth, renderHeight);
          }
          gl.uniform1f(quality, mobile ? 0.5 : 1);
        };

        const draw = (timestamp: number) => {
          animationFrame = 0;
          if (disposed || !gl || !program || !inViewport || !pageVisible || !contextAvailable || reducedMotion.matches) return;
          const delta = previousFrame ? Math.min(timestamp - previousFrame, 50) : 16.67;
          previousFrame = timestamp;
          elapsed += delta;
          smoothPointerX += (pointerX - smoothPointerX) * 0.035;
          smoothPointerY += (pointerY - smoothPointerY) * 0.035;
          gl.useProgram(program);
          gl.uniform2f(resolution, canvas.width, canvas.height);
          gl.uniform1f(time, elapsed * 0.00072);
          gl.uniform2f(pointer, smoothPointerX, smoothPointerY);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          animationFrame = window.requestAnimationFrame(draw);
        };

        const syncAnimation = () => {
          if (inViewport && pageVisible && contextAvailable && !reducedMotion.matches) {
            if (!animationFrame) {
              previousFrame = 0;
              animationFrame = window.requestAnimationFrame(draw);
            }
          } else if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
          }
          root.dataset.ready = String(contextAvailable && !reducedMotion.matches);
        };

        const onVisibilityChange = () => {
          pageVisible = document.visibilityState === "visible";
          syncAnimation();
        };
        const onMotionChange = () => syncAnimation();
        const onContextLost = (event: Event) => {
          event.preventDefault();
          contextAvailable = false;
          syncAnimation();
        };
        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          pointerX = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
          pointerY = 1 - ((event.clientY - bounds.top) / Math.max(bounds.height, 1));
        };
        const onPointerLeave = () => {
          pointerX = 0.58;
          pointerY = 0.52;
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(root);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
          inViewport = entry?.isIntersecting ?? false;
          syncAnimation();
        }, { threshold: 0 });
        intersectionObserver.observe(root);

        const finePointer = window.matchMedia("(pointer: fine)");
        const hero = root.closest<HTMLElement>(".experience-hero");
        if (finePointer.matches && hero) {
          hero.addEventListener("pointermove", onPointerMove, { passive: true });
          hero.addEventListener("pointerleave", onPointerLeave);
        }
        document.addEventListener("visibilitychange", onVisibilityChange);
        reducedMotion.addEventListener("change", onMotionChange);
        canvas.addEventListener("webglcontextlost", onContextLost);
        resize();
        syncAnimation();

        return () => {
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibilityChange);
          reducedMotion.removeEventListener("change", onMotionChange);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          if (hero) {
            hero.removeEventListener("pointermove", onPointerMove);
            hero.removeEventListener("pointerleave", onPointerLeave);
          }
        };
      } catch {
        root.dataset.ready = "false";
        return;
      }
    };

    let detachListeners: (() => void) | undefined;
    const initializeTimer = window.setTimeout(() => {
      if (!disposed) detachListeners = initialize();
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(initializeTimer);
      detachListeners?.();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
      }
      delete root.dataset.ready;
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-background" aria-hidden="true">
      <div className="hero-background__fallback" />
      <canvas ref={canvasRef} className="hero-background__canvas" />
      <div className="hero-background__veil" />
    </div>
  );
}
