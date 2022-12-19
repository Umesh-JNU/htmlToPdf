const fs = require("fs");
const puppeteer = require("puppeteer");
const { merge } = require('merge-pdf-buffers');


exports.generatePDF = async (req, res, next) => {
  await htmlToPDF(req.headers.referer)
    .then((pdfdata) => {
      res.set("Content-Type", "application/pdf");
      res.status(200).send(Buffer.from(pdfdata, "binary"));
    })
    .catch((err) => {
      console.log(err);
    });
};

const htmlToPDF = async (webURL) => {
  const frontend_url = webURL.split("action")[0];

  const browser = await puppeteer.launch({
    userDataDir: "./cache",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(webURL, { waitUntil: "networkidle0" });

  const all_row_val = await page.evaluate(async () => {
    const rows = document.querySelectorAll("div.MuiDataGrid-row");

    const row_val = [];
    rows.forEach((row) => {
      const cols = row.querySelectorAll("div.MuiDataGrid-cellContent");

      row_val.push(
        `${cols[2].innerHTML}/?a=${cols[0].innerHTML}&b=${cols[3].innerHTML}&c=${cols[4].innerHTML}`
      );
    });

    return row_val;
  });

  const all_pages = [];

  for (let i = 0; i < all_row_val.length; i++) {
    const url = `${frontend_url}${all_row_val[i]}`;
    const promise = page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.goto(url, { waitUntil: "networkidle0" });

    const p = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
    await promise;
    all_pages.push(p);
  }

  await browser.close();
  return await merge(all_pages);
};

