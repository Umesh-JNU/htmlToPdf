import http from "./httpService";

const pdfService = {
  downloadPDF: () => {
    return http.get("/api/v1/pdf", {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
  },
};

export default pdfService;
