import PDFParser from "pdf2json";

export async function extractText(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.flatMap((page) =>
        page.Texts.map((item) => decodeURIComponent(item.R[0].T))
      ).join(" ");

      resolve(text);
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.loadPDF(filePath);
  });
}