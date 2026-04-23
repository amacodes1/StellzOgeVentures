import jsPDF from 'jspdf';
import { Order } from '../store/slices/orderSlice';
export const generateOrderInvoice = (order: Order): jsPDF => {
  const pdf = new jsPDF();
  // Add company logo/header
  pdf.setFontSize(20);
  pdf.setTextColor(0, 128, 0); // Green color
  pdf.text('WholesalePro', 105, 20, {
    align: 'center'
  });
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0); // Black color
  pdf.text('INVOICE', 105, 30, {
    align: 'center'
  });
  // Add invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice #: ${order.id}`, 20, 45);
  pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 50);
  pdf.text(`Status: ${order.status.toUpperCase()}`, 20, 55);
  // Add customer details
  pdf.text('Bill To:', 20, 70);
  pdf.text(order.billingAddress.name, 20, 75);
  if (order.billingAddress.company) {
    pdf.text(order.billingAddress.company, 20, 80);
  }
  pdf.text(order.billingAddress.address, 20, 85);
  pdf.text(`${order.billingAddress.city}, ${order.billingAddress.state} ${order.billingAddress.zipCode}`, 20, 90);
  pdf.text(order.billingAddress.country, 20, 95);
  pdf.text(`Phone: ${order.billingAddress.phone}`, 20, 100);
  // Add shipping details if different
  if (!order.sameAsBilling) {
    pdf.text('Ship To:', 120, 70);
    pdf.text(order.shippingAddress.name, 120, 75);
    if (order.shippingAddress.company) {
      pdf.text(order.shippingAddress.company, 120, 80);
    }
    pdf.text(order.shippingAddress.address, 120, 85);
    pdf.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`, 120, 90);
    pdf.text(order.shippingAddress.country, 120, 95);
    pdf.text(`Phone: ${order.shippingAddress.phone}`, 120, 100);
  }
  // Add table headers
  pdf.setFillColor(240, 240, 240);
  pdf.rect(20, 115, 170, 7, 'F');
  pdf.text('Item', 22, 120);
  pdf.text('Quantity', 90, 120);
  pdf.text('Price', 120, 120);
  pdf.text('Total', 170, 120);
  // Add items
  let y = 130;
  order.items.forEach((item, index) => {
    pdf.text(item.name, 22, y);
    pdf.text(item.quantity.toString(), 90, y);
    pdf.text(`$${item.price.toFixed(2)}`, 120, y);
    pdf.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, y, {
      align: 'right'
    });
    y += 10;
  });
  // Add totals
  const totalsY = y + 10;
  pdf.line(20, totalsY - 5, 190, totalsY - 5);
  pdf.text('Subtotal:', 120, totalsY);
  pdf.text(`$${order.subtotal.toFixed(2)}`, 170, totalsY, {
    align: 'right'
  });
  if (order.discount > 0) {
    pdf.text('Discount:', 120, totalsY + 7);
    pdf.text(`-$${order.discount.toFixed(2)}`, 170, totalsY + 7, {
      align: 'right'
    });
  }
  pdf.text('Shipping:', 120, totalsY + 14);
  pdf.text(`$${order.shipping.toFixed(2)}`, 170, totalsY + 14, {
    align: 'right'
  });
  pdf.text('Tax:', 120, totalsY + 21);
  pdf.text(`$${order.tax.toFixed(2)}`, 170, totalsY + 21, {
    align: 'right'
  });
  // Total
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.text('Total:', 120, totalsY + 30);
  pdf.text(`$${order.total.toFixed(2)}`, 170, totalsY + 30, {
    align: 'right'
  });
  // Add footer
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('Thank you for your business!', 105, 260, {
    align: 'center'
  });
  pdf.text('For questions about this invoice, please contact support@wholesalepro.com', 105, 265, {
    align: 'center'
  });
  return pdf;
};
export const downloadOrderInvoice = (order: Order): void => {
  const pdf = generateOrderInvoice(order);
  pdf.save(`invoice-${order.id}.pdf`);
};