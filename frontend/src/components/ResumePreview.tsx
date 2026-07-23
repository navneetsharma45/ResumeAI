import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type ResumePreviewProps = {
  file: File | null;
};

function ResumePreview({ file }: ResumePreviewProps) {
  const [numPages, setNumPages] = useState(0);
const [scale, setScale] = useState(1);

  if (!file) return null;

  return (
<div className="sticky top-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">

<div className="mb-4 flex items-center justify-between">
  <h2 className="text-xl font-bold">Resume Preview</h2>

<div className="flex items-center gap-2">
      <button
      onClick={() => setScale((prev) => Math.max(0.6, prev - 0.1))}
      className="rounded-lg bg-slate-700 px-3 py-1 hover:bg-slate-600"
    >
      −
    </button>

<span className="min-w-16 text-center text-sm text-slate-300">
  {Math.round(scale * 100)}%
</span>

    <button
      onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
      className="rounded-lg bg-slate-700 px-3 py-1 hover:bg-slate-600"
    >
      +
    </button>
  </div>
</div>

      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
<div className="flex justify-center rounded-2xl bg-white p-4 shadow-inner">
  <Page
  pageNumber={1}
  scale={scale}
  renderTextLayer={false}
  renderAnnotationLayer={false}
/>
</div>
      </Document>

      <div className="mt-4 flex items-center justify-center rounded-xl bg-slate-800/60 py-2 text-sm text-slate-300">
  📄 Page 1 of {numPages}
</div>
    </div>
  );
}

export default ResumePreview;