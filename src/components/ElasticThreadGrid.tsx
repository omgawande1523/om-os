import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

interface GridPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export default function ElasticThreadGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Grid configuration
    const cols = 30;
    const rows = 30;
    const spacingX = 0.3;
    const spacingY = 0.18;
    const startX = -(cols * spacingX) / 2;
    const startY = -(rows * spacingY) / 2;

    // Initialize points grid
    const points: GridPoint[][] = [];
    for (let i = 0; i < cols; i++) {
      points[i] = [];
      for (let j = 0; j < rows; j++) {
        const x = startX + i * spacingX;
        const y = startY + j * spacingY;
        const offsetX = Math.sin(i * 0.3) * 0.1 + Math.cos(j * 0.2) * 0.08;
        const offsetY = Math.cos(i * 0.2) * 0.1 + Math.sin(j * 0.3) * 0.08;
        points[i][j] = {
          x: x + offsetX,
          y: y + offsetY,
          vx: 0,
          vy: 0,
          originX: x + offsetX,
          originY: y + offsetY,
        };
      }
    }

    // Create mesh lines
    const lines: { geometry: MeshLineGeometry; material: MeshLineMaterial; points: THREE.Vector3[] }[] = [];
    const resolution = new THREE.Vector2(container.offsetWidth, container.offsetHeight);

    for (let i = 0; i < cols; i++) {
      const linePoints: THREE.Vector3[] = [];
      for (let j = 0; j < rows; j++) {
        linePoints.push(new THREE.Vector3(points[i][j].x, points[i][j].y, 0));
      }

      const geometry = new MeshLineGeometry();
      geometry.setPoints(linePoints.map((p) => [p.x, p.y, p.z]).flat());

      const material = new MeshLineMaterial({
        color: new THREE.Color('#1F1F1F'),
        opacity: 0.1,
        lineWidth: 0.005,
        resolution: resolution,
        sizeAttenuation: 1,
      });
      material.transparent = true;
      material.depthWrite = false;

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      lines.push({ geometry, material, points: linePoints });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.vx = mouseRef.current.x - mouseRef.current.prevX;
      mouseRef.current.vy = mouseRef.current.y - mouseRef.current.prevY;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const speed = 1.7;
    const springRatio = 0.3;
    const influenceRadius = 0.8;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const mouseX = mouseRef.current.x * 5;
      const mouseY = mouseRef.current.y * 3;
      const mouseVelX = mouseRef.current.vx * 50;
      const mouseVelY = mouseRef.current.vy * 50;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const point = points[i][j];
          const dx = point.x - mouseX;
          const dy = point.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius && dist > 0) {
            const force = (1 - dist / influenceRadius) * 0.3;
            point.vx += (mouseVelX * force) / speed;
            point.vy += (mouseVelY * force) / speed;
          }

          // Spring back to origin
          point.vx += (point.originX - point.x) * springRatio;
          point.vy += (point.originY - point.y) * springRatio;

          // Damping
          point.vx *= 0.92;
          point.vy *= 0.92;

          point.x += point.vx * 0.016;
          point.y += point.vy * 0.016;

          // Update Three.js points
          lines[i].points[j].x = point.x;
          lines[i].points[j].y = point.y;
        }
      }

      // Update line geometries
      for (let i = 0; i < lines.length; i++) {
        const pts = lines[i].points;
        lines[i].geometry.setPoints(pts.map((p) => [p.x, p.y, p.z]).flat());
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      resolution.set(container.offsetWidth, container.offsetHeight);
      for (const line of lines) {
        line.material.resolution = resolution;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      for (const line of lines) {
        line.geometry.dispose();
        line.material.dispose();
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
