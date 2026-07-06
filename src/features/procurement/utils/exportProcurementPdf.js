import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export function exportProcurementPdf(rows, title = 'Procurement Requisitions') {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();

  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 40, 40);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`, 40, 56);
  doc.text(`Total records: ${rows.length}`, pageWidth - 40, 56, { align: 'right' });

  doc.setDrawColor(200);
  doc.line(40, 64, pageWidth - 40, 64);
  doc.setTextColor(0);

  
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Title', dataKey: 'title' },
    { header: 'Department', dataKey: 'department' },
    { header: 'Requested By', dataKey: 'requestedBy' },
    { header: 'Vendor', dataKey: 'vendor' },
    { header: 'Budget (₹)', dataKey: 'amount' },
    { header: 'Priority', dataKey: 'priority' },
    { header: 'Status', dataKey: 'status' },
    { header: 'Request Date', dataKey: 'requestedDate' },
  ];

  
  const body = rows.map((row) => ({
    id: row.id,
    title: row.title || '',
    department: row.department || '',
    requestedBy: row.requestedBy || '',
    vendor: row.vendor || '',
    amount: row.amount != null ? `₹${Number(row.amount).toLocaleString('en-IN')}` : '',
    priority: row.priority || '',
    status: row.status || '',
    requestedDate: row.requestedDate || '',
  }));

  
  const priorityColors = {
    Critical: [220, 38, 38],
    High: [234, 88, 12],
    Medium: [37, 99, 235],
    Low: [100, 116, 139],
  };

  const statusColors = {
    Approved: [22, 163, 74],
    'Pending': [202, 138, 4],
    'Pending Approval': [202, 138, 4],
    Rejected: [220, 38, 38],
    Draft: [100, 116, 139],
  };

  
  autoTable(doc, {
    columns,
    body,
    startY: 76,
    margin: { left: 40, right: 40 },
    styles: {
      fontSize: 8,
      cellPadding: 6,
      overflow: 'linebreak',
      lineColor: [220, 220, 220],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      id: { cellWidth: 60, fontStyle: 'bold' },
      title: { cellWidth: 'auto' },
      amount: { halign: 'right', cellWidth: 80 },
    },
    didParseCell: (data) => {
      if (data.section !== 'body') return;

      
      if (data.column.dataKey === 'priority') {
        const color = priorityColors[data.cell.raw];
        if (color) {
          data.cell.styles.textColor = color;
          data.cell.styles.fontStyle = 'bold';
        }
      }

      
      if (data.column.dataKey === 'status') {
        const color = statusColors[data.cell.raw];
        if (color) {
          data.cell.styles.textColor = color;
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
    didDrawPage: (data) => {
      
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${data.pageNumber} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 20,
        { align: 'center' }
      );
    },
  });

  
  const timestamp = new Date().toISOString().slice(0, 10);
  doc.save(`procurement-report-${timestamp}.pdf`);
}
