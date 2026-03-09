import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-color-converter',
  imports: [],
  templateUrl: './color-converter.html',
  styleUrl: './color-converter.scss',
})
export class ColorConverter {
  hex = signal('#ff0000');
  rgb = signal('rgb(255, 0, 0)');
  hsl = signal('hsl(0, 100%, 50%)');

  // --- HEX -> RGB / HSL
  onHexChange(value: string) {
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) return;
    this.hex.set(value);
    const { r, g, b } = this.hexToRgb(value);
    this.rgb.set(`rgb(${r}, ${g}, ${b})`);
    const { h, s, l } = this.rgbToHsl(r, g, b);
    this.hsl.set(`hsl(${h}, ${s}%, ${l}%)`);
  }

  // --- RGB -> HEX / HSL
  onRgbChange(value: string) {
    const match = value.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
    if (!match) return;
    const r = +match[1],
      g = +match[2],
      b = +match[3];
    this.rgb.set(`rgb(${r}, ${g}, ${b})`);
    this.hex.set(this.rgbToHex(r, g, b));
    const { h, s, l } = this.rgbToHsl(r, g, b);
    this.hsl.set(`hsl(${h}, ${s}%, ${l}%)`);
  }

  // --- HSL -> RGB / HEX
  onHslChange(value: string) {
    const match = value.match(/hsl\(\s*(\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    if (!match) return;
    const h = +match[1],
      s = +match[2],
      l = +match[3];
    this.hsl.set(`hsl(${h}, ${s}%, ${l}%)`);
    const { r, g, b } = this.hslToRgb(h, s, l);
    this.rgb.set(`rgb(${r}, ${g}, ${b})`);
    this.hex.set(this.rgbToHex(r, g, b));
  }

  // --- Conversion helpers
  hexToRgb(hex: string) {
    let c = hex.substring(1);
    if (c.length === 3)
      c = c
        .split('')
        .map((x) => x + x)
        .join('');
    const num = parseInt(c, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  rgbToHex(r: number, g: number, b: number) {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  }

  rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = Math.round(h * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return { h, s, l };
  }

  hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }
}
