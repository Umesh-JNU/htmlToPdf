const puppeteer = require("puppeteer");
const { join } = require("path");

const htmlToPDF = async (webURL) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const coverPage = await browser.newPage();
  await coverPage.setCacheEnabled(false);
  await coverPage.send("Network.setCacheDisabled", { cacheDisabled: true });
  await coverPage.goto(webURL, { waitUntil: "networkidle0" });

  return await coverPage.pdf({
    preferCSSPageSize: true,
    margin: "none",
    // format: "A4",
    printBackground: true,
  });
};

exports.generatePDF = async (req, res, next) => {
  await htmlToPDF(
    `${req.protocol}://${req.get(
      "host"
    )}/actionpage/6399c12f5e839c88b475cd7d/?role=admin`
  )
    .then((pdfdata) => {
      res.set("Content-Type", "application/pdf");
      res.status(200).send(Buffer.from(pdfdata, "binary"));
    })
    .catch((err) => {
      console.log(err);
    });
};
