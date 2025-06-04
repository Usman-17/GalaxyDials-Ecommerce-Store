import moment from "moment";

export const handlePrint = (order) => {
  const itemsList = order.items
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td style="font-weight:bold; font-size:12px">${item.title}</td>
          <td>${item.quantity}</td>
          <td>Rs. ${item.price}</td>
          <td>Rs. ${item.quantity * item.price}</td>
        </tr>`
    )
    .join("");

  const htmlContent = `
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }

          .company-details {
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
          }

          .company-address {
            font-size: 14px;
            margin-top: 1px;
            font-style: italic;
          }

          .invoice-title {
            text-align: left;
            font-size: 30px;
            font-weight: medium;
            margin-right: 130px;
            text-transform: uppercase;
            color: lightgray;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .info-box {
            text-align: right;
            font-size: 14px;
          }

          .info-title {
            margin-bottom: -12px;
            text-transform: uppercase;
          }

          .bill-to {
            font-size: 16px;
            margin-top: 50px;
            p{
              font-size: 14px;
              margin-bottom: -12px;
              
              }
          
          }

          .section-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
          }

          td:nth-child(2) {
            width: 55%;
          }

          .total {
            text-align: right;
            font-weight: bold;
            font-size: 16px;
            margin-top: 20px;
          }

          .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 30px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-details">
            <div class="company-name">Galaxy Dials</div>
            <div class="company-address">Johar Town, Lahore</div>
          </div>
          <div class="invoice-title">Invoice</div>
        </div>

        <div class="info-row">
          <div class="bill-to">
            <div class="section-title">Bill To:</div>
            <p><strong>Name:</strong>
             ${order.address.firstName}
             ${order.address.lastName}
            </p>
            <p><strong>Phone:</strong> 
            ${order.address.phone}
            </p>
            <p><strong>Address:</strong> ${order.address.city}, ${
    order.address.city
  }</p>
          </div>

          <div class="info-box">
            <p class="info-title"><strong>Date:</strong>
             ${moment(order.date).format("DD MMMM YYYY")}</p>
            <p><strong>PAYMENT METHOD:</strong> ${order.paymentMethod}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>

        <div class="total">Total: Rs. ${order.amount.toLocaleString()}</div>

        <div class="footer">
          Thank you for your purchase! For more information, contact us at usmandev580@gmail.com
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
