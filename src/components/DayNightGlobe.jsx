import React, { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { TextureLoader, ShaderMaterial, Vector2 } from 'three';
import * as solar from 'solar-calculator';

const VELOCITY = 1; // menit per frame

const dayNightShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #define PI 3.141592653589793
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform vec2 sunPosition;
    uniform vec2 globeRotation;
    varying vec3 vNormal;
    varying vec2 vUv;

    float toRad(in float a) {
      return a * PI / 180.0;
    }

    vec3 Polar2Cartesian(in vec2 c) {
      float theta = toRad(90.0 - c.x);
      float phi = toRad(90.0 - c.y);
      return vec3(
        sin(phi) * cos(theta),
        cos(phi),
        sin(phi) * sin(theta)
      );
    }

    void main() {
      float invLon = toRad(globeRotation.x);
      float invLat = -toRad(globeRotation.y);
      mat3 rotX = mat3(
        1, 0, 0,
        0, cos(invLat), -sin(invLat),
        0, sin(invLat), cos(invLat)
      );
      mat3 rotY = mat3(
        cos(invLon), 0, sin(invLon),
        0, 1, 0,
        -sin(invLon), 0, cos(invLon)
      );
      vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);
      float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv);
      float blendFactor = smoothstep(-0.1, 0.1, intensity);
      gl_FragColor = mix(nightColor, dayColor, blendFactor);
    }
  `
};

const sunPosAt = (dt) => {
  const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
  const t = solar.century(dt);
  const longitude = (day - dt) / 864e5 * 360 - 180;
  return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
};

const DayNightGlobe = () => {
  const [dt, setDt] = useState(+new Date());
  const [material, setMaterial] = useState(null);
  const globeRef = useRef();

  // Update waktu tiap frame
  useEffect(() => {
    const interval = setInterval(() => {
      setDt((prev) => prev + VELOCITY * 60 * 1000);
    }, 33);
    return () => clearInterval(interval);
  }, []);

  // Load shader material
  useEffect(() => {
    Promise.all([
      new TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'),
      new TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
    ]).then(([dayTexture, nightTexture]) => {
      const shader = new ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunPosition: { value: new Vector2() },
          globeRotation: { value: new Vector2() }
        },
        vertexShader: dayNightShader.vertexShader,
        fragmentShader: dayNightShader.fragmentShader
      });
      setMaterial(shader);
    });
  }, []);

  // Update posisi matahari
  useEffect(() => {
    if (material) {
      material.uniforms.sunPosition.value.set(...sunPosAt(dt));
    }
  }, [dt, material]);

  // Set rotasi globe otomatis
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.0;
    }
  }, []);

  // Simpan rotasi saat globe ready
  const handleGlobeReady = useCallback(() => {
    if (globeRef.current && material) {
      const { lat, lng } = globeRef.current.pointOfView();
      material.uniforms.globeRotation.value.set(lng, lat);
    }
  }, [material]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Globe
        ref={globeRef}
        globeMaterial={material}
        onGlobeReady={handleGlobeReady}
        backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
        width={600}
        height={400}
      />
    
    </div>
  );
};

export default DayNightGlobe;
