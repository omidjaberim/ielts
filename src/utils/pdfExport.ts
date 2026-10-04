function copyFormControlValues(source: ParentNode, target: ParentNode): void {
  const sourceControls = Array.from(source.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >('input, textarea, select'));
  const targetControls = Array.from(target.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >('input, textarea, select'));

  sourceControls.forEach((sourceControl, index) => {
    const targetControl = targetControls[index];
    if (!targetControl) return;

    if (sourceControl.localName === 'select') {
      (targetControl as HTMLSelectElement).selectedIndex =
        (sourceControl as HTMLSelectElement).selectedIndex;
    } else if (
      sourceControl.localName === 'input'
      && ['checkbox', 'radio'].includes((sourceControl as HTMLInputElement).type)
    ) {
      (targetControl as HTMLInputElement).checked =
        (sourceControl as HTMLInputElement).checked;
    } else {
      (targetControl as HTMLInputElement | HTMLTextAreaElement).value =
        (sourceControl as HTMLInputElement | HTMLTextAreaElement).value;
    }
  });
}

function replaceFormControlsWithText(sourcePage: HTMLElement, printPage: HTMLElement): void {
  const sourceControls = Array.from(sourcePage.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >('input, textarea, select'));
  const printControls = Array.from(printPage.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >('input, textarea, select'));

  sourceControls.forEach((sourceControl, index) => {
    const printControl = printControls[index];
    if (!printControl?.parentNode) return;

    if (
      sourceControl.localName === 'input'
      && !['text', 'number', 'date', 'email', 'tel', 'url', 'search'].includes(
        (sourceControl as HTMLInputElement).type,
      )
    ) {
      return;
    }

    const computedStyle = window.getComputedStyle(sourceControl);
    const text = sourceControl.localName === 'select'
      ? (sourceControl as HTMLSelectElement).options[
          (sourceControl as HTMLSelectElement).selectedIndex
        ]?.text || ''
      : sourceControl.value
        || (sourceControl.localName === 'textarea'
          ? (sourceControl as HTMLTextAreaElement).placeholder
          : (sourceControl as HTMLInputElement).placeholder);
    const textBlock = printPage.ownerDocument.createElement('div');
    textBlock.className = sourceControl.className;
    textBlock.textContent = text;

    const preservedProperties = [
      'color',
      'backgroundColor',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'fontStyle',
      'lineHeight',
      'letterSpacing',
      'textAlign',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'borderRadius',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'boxShadow',
    ] as const;

    preservedProperties.forEach((property) => {
      textBlock.style[property] = computedStyle[property];
    });
    Object.assign(textBlock.style, {
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
      overflow: 'visible',
      height: 'auto',
      minHeight: `${sourceControl.getBoundingClientRect().height}px`,
      maxHeight: 'none',
      flex: 'none',
    });

    if (!sourceControl.value && sourceControl.localName === 'input') {
      textBlock.style.color = '#94a3b8';
    }

    printControl.parentNode.replaceChild(textBlock, printControl);
  });
}

export async function exportLessonPlanToPdf(
  filename = 'Teaching_Practice_Lesson_Plan.pdf',
): Promise<void> {
  const sourceContainer = document.getElementById('pdf-export-container');
  if (!sourceContainer) {
    throw new Error('The lesson plan document is not available to print.');
  }

  const printRoot = document.createElement('main');
  printRoot.id = 'pdf-print-root';
  Object.assign(printRoot.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    width: '210mm',
    visibility: 'hidden',
    zIndex: '-1',
  });

  const printStyles = document.createElement('style');
  printStyles.textContent = `
    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      html,
      body {
        width: 100%;
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        color: #0f172a;
      }

      body > *:not(#pdf-print-root) {
        display: none !important;
      }

      #pdf-print-root {
        display: block !important;
        position: static !important;
        left: auto !important;
        top: auto !important;
        width: 210mm !important;
        margin: 0 auto !important;
        padding: 0 !important;
        visibility: visible !important;
        z-index: auto !important;
      }

      #pdf-print-root .a4-page {
        display: block !important;
        box-sizing: border-box;
        width: 210mm !important;
        max-width: none !important;
        min-height: 0 !important;
        height: auto !important;
        margin: 0 auto !important;
        padding: 0 8mm !important;
        overflow: visible !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        break-after: auto;
        page-break-after: auto;
      }

      #pdf-print-root .a4-page > div > * {
        break-inside: auto;
        page-break-inside: auto;
      }

      #pdf-print-root [data-pdf-page="2"] > div > .bg-gradient-to-r,
      #pdf-print-root [data-pdf-page="3"] > div > .bg-gradient-to-r,
      #pdf-print-root [data-pdf-page="4"] > div > .bg-gradient-to-r {
        break-inside: avoid-page;
        page-break-inside: avoid;
        break-after: avoid-page;
        page-break-after: avoid;
      }

      #pdf-print-root .overflow-hidden {
        overflow: visible !important;
      }

      #pdf-print-root .a4-page .divide-y-2 > .grid,
      #pdf-print-root .a4-page .grid.grid-cols-12 {
        break-inside: avoid-page;
        page-break-inside: avoid;
      }

      #pdf-print-root input,
      #pdf-print-root textarea,
      #pdf-print-root select,
      #pdf-print-root button {
        display: none !important;
      }

      *,
      *::before,
      *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;
  document.head.appendChild(printStyles);
  const sourcePages = Array.from(
    sourceContainer.querySelectorAll<HTMLElement>('[data-pdf-page]'),
  );
  if (sourcePages.length === 0) {
    printStyles.remove();
    throw new Error('No lesson plan pages were found to print.');
  }

  sourcePages.forEach((sourcePage) => {
    const printPage = sourcePage.cloneNode(true) as HTMLElement;
    copyFormControlValues(sourcePage, printPage);
    replaceFormControlsWithText(sourcePage, printPage);
    printRoot.appendChild(printPage);
  });
  document.body.appendChild(printRoot);

  const originalTitle = document.title;
  document.title = filename.replace(/\.pdf$/i, '');
  const cleanup = () => {
    printRoot.remove();
    printStyles.remove();
    document.title = originalTitle;
  };
  window.addEventListener('afterprint', cleanup, { once: true });

  await document.fonts.ready;
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });

  window.print();
}

export function printLessonPlan(): void {
  window.print();
}
