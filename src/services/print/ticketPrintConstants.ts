// Constantes de layout y recursos para ticket
export const PRINT_TITLE = 'Ticket de turno';
export const TICKET_LOGO = '/src/assets/img/Corpico_logo.svg';
export const TICKET_LAYOUT = `
  @page {
    size: 80mm 60mm;
    margin: 0;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 80mm;
    height: 60mm;
    font-family: 'Calibri', 'Arial', sans-serif;
    color: #000;
    background: #fff;
    box-sizing: border-box;
  }
  .ticket {
    width: 80mm;
    height: 60mm;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .logo {
    display: flex;
    align-items: flex-start;
    margin: 4mm 0 0 4mm;
    height: 10mm;
  }
  .logo img {
    width: 25mm;
    height: 10mm;
    object-fit: contain;
    display: block;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2mm;
    margin-bottom: 2mm;
  }
  .code {
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    margin: 0 0 2mm 0;
    letter-spacing: 2px;
    line-height: 1.1;
  }
  .en-espera-label {
    font-size: 18px;
    text-align: center;
    margin: 0 0 1mm 0;
    font-weight: normal;
  }
  .en-espera {
    font-size: 18px;
    text-align: center;
    font-weight: normal;
    margin-bottom: 0;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 10px;
    width: 100%;
    margin-top: auto;
    margin-bottom: 2mm;
    padding: 0 4mm;
    box-sizing: border-box;
  }
  .footer-col {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  .footer-col.left {
    align-items: flex-start;
    text-align: left;
  }
  .footer-col.right {
    align-items: flex-end;
    text-align: right;
  }
  .footer-line {
    margin: 0;
    padding: 0;
    line-height: 1.2;
  }
`;
