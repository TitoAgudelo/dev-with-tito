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

float inverseSmoothstep(float lowerEdge, float upperEdge, float value) {
  return 1.0 - smoothstep(lowerEdge, upperEdge, value);
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
  float trail = inverseSmoothstep(-0.12, 0.0, along) * smoothstep(-0.18, -0.04, along);
  float core = inverseSmoothstep(0.0, 0.003, perpendicular) * trail;
  float glow = inverseSmoothstep(0.0, 0.012, perpendicular) * trail * 0.3;
  float fade = smoothstep(0.0, 0.1, cycle) * inverseSmoothstep(0.55, 0.8, cycle);
  return (core + glow) * fade;
}

float stars(vec2 uv, float density, float threshold, float scale, float speed) {
  vec2 cell = floor(uv * density);
  vec2 subdivision = fract(uv * density);
  float random = hash2(cell);
  float brightness = smoothstep(threshold, 1.0, random);
  float size = (0.022 + random * 0.045) * scale;
  float distanceToStar = length(subdivision - vec2(hash2(cell + 100.0), hash2(cell + 200.0)));
  float core = inverseSmoothstep(0.0, size, distanceToStar);
  float halo = inverseSmoothstep(0.0, size * 3.4, distanceToStar) * 0.22;
  float twinkle = 0.68 + 0.32 * sin(u_time * (speed + random * 1.8) + random * 6.2832);
  return brightness * (core + halo) * twinkle;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pointer = u_pointer * 2.0 - 1.0;

  vec3 skyTop = vec3(0.018, 0.022, 0.070);
  vec3 skyMiddle = vec3(0.065, 0.045, 0.145);
  vec3 skyBottom = vec3(0.190, 0.095, 0.330);
  vec3 color = mix(skyBottom, skyMiddle, smoothstep(0.3, 0.62, uv.y));
  color = mix(color, skyTop, smoothstep(0.6, 1.0, uv.y));

  float horizon = 0.34;
  float horizonGlow = exp(-pow((uv.y - horizon) * 3.8, 2.0));
  color += vec3(0.22, 0.10, 0.42) * horizonGlow * 0.48;
  float centerGlow = exp(-pow((uv.x - 0.58) * 1.45, 2.0)) * exp(-pow((uv.y - horizon) * 4.0, 2.0));
  color += vec3(0.28, 0.13, 0.52) * centerGlow * 0.34;

  vec2 starUv = uv * vec2(aspect, 1.0);
  float starField = stars(starUv, 44.0, 0.955, 1.12, 0.65);
  starField += stars(starUv + 500.0, 78.0, 0.972, 0.86, 1.15) * 0.72;
  if (u_quality > 0.75) {
    starField += stars(starUv + 900.0, 128.0, 0.982, 0.64, 1.7) * 0.46;
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

  layerColor = vec3(0.225, 0.145, 0.365);
  coordinate = uv.x * aspect * 1.6 + u_time * 0.006 + pointer.x * 0.010;
  verticalShift = pointer.y * 0.003;
  profile = fbm(coordinate, 5.0) * 0.10 + fbm(coordinate * 0.3 + 17.0, 3.0) * 0.07;
  ridge = 0.40 + profile + verticalShift;
  mountain = inverseSmoothstep(ridge - 0.001, ridge + 0.003, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = inverseSmoothstep(0.0, 0.014, ridgeDistance) * 0.12;
  color = mix(color, layerColor, mountain * 0.84);
  color += vec3(0.42, 0.22, 0.66) * ridgeGlow;
  starMask *= clamp(1.0 - mountain, 0.0, 1.0);

  layerColor = vec3(0.175, 0.105, 0.310);
  coordinate = uv.x * aspect * 2.0 + u_time * 0.012 + pointer.x * 0.020;
  verticalShift = pointer.y * 0.006;
  profile = fbm(coordinate, 5.0) * 0.13 + fbm(coordinate * 0.3 + 34.0, 3.0) * 0.091;
  ridge = 0.33 + profile + verticalShift;
  mountain = inverseSmoothstep(ridge - 0.001, ridge + 0.003, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = inverseSmoothstep(0.0, 0.014, ridgeDistance) * 0.10;
  color = mix(color, layerColor, mountain * 0.88);
  color += vec3(0.38, 0.18, 0.60) * ridgeGlow;
  starMask *= clamp(1.0 - mountain, 0.0, 1.0);

  layerColor = vec3(0.128, 0.072, 0.240);
  coordinate = uv.x * aspect * 2.6 + u_time * 0.020 + pointer.x * 0.034;
  verticalShift = pointer.y * 0.010;
  profile = fbm(coordinate, 5.0) * 0.16 + fbm(coordinate * 0.3 + 51.0, 3.0) * 0.112;
  ridge = 0.26 + profile + verticalShift;
  mountain = inverseSmoothstep(ridge - 0.001, ridge + 0.003, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = inverseSmoothstep(0.0, 0.014, ridgeDistance) * 0.08;
  color = mix(color, layerColor, mountain * 0.91);
  color += vec3(0.34, 0.15, 0.54) * ridgeGlow;
  starMask *= clamp(1.0 - mountain, 0.0, 1.0);

  layerColor = vec3(0.085, 0.045, 0.165);
  coordinate = uv.x * aspect * 3.2 + u_time * 0.030 + pointer.x * 0.050;
  verticalShift = pointer.y * 0.015;
  profile = fbm(coordinate, 5.0) * 0.14 + fbm(coordinate * 0.3 + 68.0, 3.0) * 0.098;
  ridge = 0.18 + profile + verticalShift;
  mountain = inverseSmoothstep(ridge - 0.001, ridge + 0.003, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = inverseSmoothstep(0.0, 0.014, ridgeDistance) * 0.055;
  color = mix(color, layerColor, mountain * 0.94);
  color += vec3(0.30, 0.13, 0.48) * ridgeGlow;
  starMask *= clamp(1.0 - mountain, 0.0, 1.0);

  layerColor = vec3(0.045, 0.025, 0.095);
  coordinate = uv.x * aspect * 4.0 + u_time * 0.044 + pointer.x * 0.070;
  verticalShift = pointer.y * 0.021;
  profile = fbm(coordinate, 5.0) * 0.11 + fbm(coordinate * 0.3 + 85.0, 3.0) * 0.077;
  ridge = 0.09 + profile + verticalShift;
  mountain = inverseSmoothstep(ridge - 0.001, ridge + 0.003, uv.y);
  ridgeDistance = abs(uv.y - ridge);
  ridgeGlow = inverseSmoothstep(0.0, 0.014, ridgeDistance) * 0.035;
  color = mix(color, layerColor, mountain * 0.97);
  color += vec3(0.26, 0.11, 0.42) * ridgeGlow;
  starMask *= clamp(1.0 - mountain, 0.0, 1.0);

  color += vec3(0.78, 0.83, 1.0) * starField * starMask * 1.05;
  if (u_quality > 0.75) {
    color += vec3(0.72, 0.78, 1.0) * meteor(uv * vec2(aspect, 1.0), u_time) * starMask * 0.46;
  }
  float vignette = 1.0 - 0.10 * pow(length((uv - 0.5) * vec2(1.1, 1.5)), 2.0);
  color *= vignette;
  color += vec3(0.18, 0.08, 0.34) * exp(-pow((uv.y - 0.33) * 5.0, 2.0)) * 0.08;
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
          gl.uniform1f(time, elapsed * 0.0009);
          gl.uniform2f(pointer, smoothPointerX, smoothPointerY);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          if (root.dataset.ready !== "true") root.dataset.ready = "true";
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
          if (!inViewport || !pageVisible || !contextAvailable || reducedMotion.matches) {
            root.dataset.ready = "false";
          }
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
