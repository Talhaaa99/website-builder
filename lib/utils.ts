import { useEditorStore } from '@/store/editorStore';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const exportFiles = () => {
  const { html, css, js } = useEditorStore.getState().exportProject();

  const blobHtml = new Blob([html], { type: 'text/html' });
  const blobCss = new Blob([css], { type: 'text/css' });
  const blobJs = new Blob([js], { type: 'application/javascript' });

  saveAs(blobHtml, 'index.html');
  saveAs(blobCss, 'styles.css');
  saveAs(blobJs, 'script.js');
};
