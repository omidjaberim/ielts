// Keep these libraries out of the main bundle so the app stays lighter on initial load.
// They are loaded only when the user actually triggers PDF export.

function oklabToRgbValues(L: number, aLab: number, bLab: number, A: number): string {
  const l_ = L + 0.3963377774 * aLab + 0.2158037573 * bLab;
  const m_ = L - 0.1055613458 * aLab - 0.0638541728 * bLab;
  const s_ = L - 0.0894841775 * aLab - 1.2914855480 * bLab;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  const gamma = (c: number) => {
    const abs = Math.abs(c);
    const corr = abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
    return c < 0 ? -corr : corr;
  };

  const r = Math.round(Math.max(0, Math.min(255, gamma(rLin) * 255)));
  const g = Math.round(Math.max(0, Math.min(255, gamma(gLin) * 255)));
  const b = Math.round(Math.max(0, Math.min(255, gamma(bLin) * 255)));

  if (A < 1) {
    return `rgba(${r}, ${g}, ${b}, ${Number(A.toFixed(3))})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function oklchToRgb(lStr: string, cStr: string, hStr: string, aStr?: string): string {
  let L = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
  let C = cStr === 'none' ? 0 : parseFloat(cStr);
  let H = hStr === 'none' ? 0 : parseFloat(hStr);
  let A = aStr ? (aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr)) : 1;

  if (isNaN(L)) L = 0;
  if (isNaN(C)) C = 0;
  if (isNaN(H)) H = 0;
  if (isNaN(A)) A = 1;

  const hRad = (H * Math.PI) / 180;
  const aLab = C * Math.cos(hRad);
  const bLab = C * Math.sin(hRad);

  return oklabToRgbValues(L, aLab, bLab, A);
}

/**
 * Converts oklch(...), oklab(...), color-mix(...), light-dark(...) color expressions
 * into standard rgb(...) or rgba(...) color expressions supported by html2canvas.
 */
function replaceUnsupportedColorsInCss(cssText: string): string {
  if (!cssText) return '';

  let sanitized = cssText;

  const replaceFunction = (match: string, fallback: string) => {
    try {
      return match;
    } catch {
      return fallback;
    }
  };

  // 1. Replace color-mix(...)
  sanitized = sanitized.replace(/color-mix\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, () => {
    return 'rgba(0, 0, 0, 0.05)';
  });

  // 2. Replace light-dark(...)
  sanitized = sanitized.replace(/light-dark\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, () => {
    return 'rgb(0, 0, 0)';
  });

  // 3. Replace oklch(...)
  sanitized = sanitized.replace(/oklch\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, (match) => {
    try {
      const inner = match.slice(6, -1).trim();
      const slashSplit = inner.split('/');
      const colorParts = slashSplit[0].trim().split(/[\s,]+/);
      const alphaPart = slashSplit[1] ? slashSplit[1].trim() : undefined;

      const lRaw = colorParts[0] || '0';
      const cRaw = colorParts[1] || '0';
      const hRaw = colorParts[2] || '0';

      return oklchToRgb(lRaw, cRaw, hRaw, alphaPart);
    } catch {
      return 'rgb(0, 0, 0)';
    }
  });

  // 4. Replace oklab(...)
  sanitized = sanitized.replace(/oklab\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/gi, (match) => {
    try {
      const inner = match.slice(6, -1).trim();
      const slashSplit = inner.split('/');
      const colorParts = slashSplit[0].trim().split(/[\s,]+/);
      const alphaPart = slashSplit[1] ? slashSplit[1].trim() : undefined;

      const lRaw = colorParts[0] || '0';
      const aRaw = colorParts[1] || '0';
      const bRaw = colorParts[2] || '0';

      let L = lRaw.endsWith('%') ? parseFloat(lRaw) / 100 : parseFloat(lRaw);
      let aLab = aRaw.endsWith('%') ? parseFloat(aRaw) / 100 : parseFloat(aRaw);
      let bLab = bRaw.endsWith('%') ? parseFloat(bRaw) / 100 : parseFloat(bRaw);
      let A = alphaPart ? (alphaPart.endsWith('%') ? parseFloat(alphaPart) / 100 : parseFloat(alphaPart)) : 1;

      if (isNaN(L)) L = 0;
      if (isNaN(aLab)) aLab = 0;
      if (isNaN(bLab)) bLab = 0;
      if (isNaN(A)) A = 1;

      return oklabToRgbValues(L, aLab, bLab, A);
    } catch {
      return 'rgb(0, 0, 0)';
    }
  });

  // 5. Replace any remaining modern CSS color tokens used by Tailwind v4 in production.
  sanitized = sanitized.replace(/\boklab\b/gi, 'srgb');
  sanitized = sanitized.replace(/\boklch\b/gi, 'srgb');
  sanitized = sanitized.replace(/\bcolor-mix\b/gi, 'rgb');
  sanitized = sanitized.replace(/\blight-dark\b/gi, 'rgb');

  return sanitized;
}

function sanitizeNodeTree(root: ParentNode): void {
  const nodes = Array.from(root.querySelectorAll('*'));
  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.style && node.getAttribute('style')) {
      node.setAttribute('style', replaceUnsupportedColorsInCss(node.getAttribute('style') || ''));
    }
  });
}

/**
 * Sanitizes the cloned document so that html2canvas does not fail on unsupported CSS color functions.
 */
function sanitizeClonedDocumentForHtml2Canvas(clonedDoc: Document): void {
  // 1. Sanitize all <style> elements
  const styleElements = Array.from(clonedDoc.querySelectorAll('style'));
  styleElements.forEach((styleEl) => {
    if (styleEl.textContent) {
      styleEl.textContent = replaceUnsupportedColorsInCss(styleEl.textContent);
    }
  });

  // 2. Sanitize all element inline styles
  const styledElements = Array.from(clonedDoc.querySelectorAll<HTMLElement>('[style]'));
  styledElements.forEach((el) => {
    const styleAttr = el.getAttribute('style');
    if (styleAttr) {
      el.setAttribute('style', replaceUnsupportedColorsInCss(styleAttr));
    }
  });

  // 3. Check for any rules in styleSheets
  try {
    const sheets = Array.from(clonedDoc.styleSheets);
    sheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          if (rule.cssText && ('style' in rule) && (rule as CSSStyleRule).style) {
            const styleRule = rule as CSSStyleRule;
            for (let i = 0; i < styleRule.style.length; i++) {
              const prop = styleRule.style[i];
              const val = styleRule.style.getPropertyValue(prop);
              if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color-mix') || val.includes('light-dark'))) {
                styleRule.style.setProperty(prop, replaceUnsupportedColorsInCss(val));
              }
            }
          }
        });
      } catch {
        // Cross-origin stylesheet access safely caught
      }
    });
  } catch {
    // Ignore
  }
}

/**
 * Copies resolved computed RGB color values from source DOM nodes onto cloned DOM nodes.
 */
function inlineComputedStyles(sourceEl: Element, targetEl: Element): void {
  const sourceNodes = Array.from(sourceEl.querySelectorAll('*'));
  const targetNodes = Array.from(targetEl.querySelectorAll('*'));

  const pairs: [Element, Element][] = [[sourceEl, targetEl]];
  for (let i = 0; i < Math.min(sourceNodes.length, targetNodes.length); i++) {
    pairs.push([sourceNodes[i], targetNodes[i]]);
  }

  for (const [src, tgt] of pairs) {
    if (!(src instanceof HTMLElement) || !(tgt instanceof HTMLElement)) continue;
    try {
      const cs = window.getComputedStyle(src);

      const colorProps = [
        'color',
        'backgroundColor',
        'borderColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
        'outlineColor',
        'boxShadow',
      ] as const;

      for (const prop of colorProps) {
        const val = cs[prop as keyof CSSStyleDeclaration] as string;
        if (val && val !== 'transparent' && val !== 'rgba(0, 0, 0, 0)') {
          tgt.style[prop as any] = replaceUnsupportedColorsInCss(val);
        }
      }
    } catch {
      // Ignore
    }
  }
}

export async function exportLessonPlanToPdf(filename = 'Teaching_Practice_Lesson_Plan.pdf'): Promise<void> {
  const html2canvasModule = await import('html2canvas');
  const html2canvas = (html2canvasModule as any).default ?? html2canvasModule;
  const jsPDFModule = await import('jspdf');
  const jsPDF = (jsPDFModule as any).default ?? (jsPDFModule as any).jsPDF ?? jsPDFModule;

  // First look for pages in dedicated offscreen export container
  let pageElements = Array.from(
    document.querySelectorAll<HTMLElement>('#pdf-export-container [data-pdf-page]')
  );

  // Fallback to any visible document pages
  if (pageElements.length === 0) {
    pageElements = Array.from(document.querySelectorAll<HTMLElement>('[data-pdf-page]'));
  }

  if (!pageElements || pageElements.length === 0) {
    console.warn('No document pages found for PDF export.');
    return;
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = 210; // A4 width mm
  const pdfHeight = 297; // A4 height mm

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];

    try {
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          sanitizeClonedDocumentForHtml2Canvas(clonedDoc);
          sanitizeNodeTree(clonedDoc);

          const selectElements = Array.from(clonedDoc.querySelectorAll('select'));
          selectElements.forEach((sel) => {
            const selectEl = sel as unknown as HTMLSelectElement;
            const selectedText = selectEl.options[selectEl.selectedIndex]?.text || selectEl.value || '';
            if (selectedText && selectedText.trim()) {
              const textNode = clonedDoc.createElement('div');
              textNode.className = 'w-full text-xs font-black p-1.5 rounded-xs border border-emerald-800 bg-emerald-900 text-amber-300 font-sans leading-snug whitespace-normal break-words shadow-2xs';
              textNode.textContent = selectedText;
              selectEl.parentNode?.replaceChild(textNode, selectEl);
            }
          });

          const container = clonedDoc.getElementById('pdf-export-container');
          if (container) {
            container.style.position = 'static';
            container.style.left = '0';
            container.style.top = '0';
            container.style.zIndex = '99999';
            container.style.opacity = '1';
            container.style.display = 'block';
            container.style.visibility = 'visible';

            const clonedPage = container.querySelector(`[data-pdf-page="${i + 1}"]`) || container;
            inlineComputedStyles(pageEl, clonedPage);
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight));
    } catch (error) {
      console.error(`PDF export failed while rendering page ${i + 1}:`, error);
      throw new Error(
        `PDF export failed while rendering page ${i + 1}. This usually happens because the browser cannot parse newer CSS color syntax in the document. Please use the browser print option instead.`
      );
    }
  }

  pdf.save(filename);
}

export function printLessonPlan(): void {
  window.print();
}

