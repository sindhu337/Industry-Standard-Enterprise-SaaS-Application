export const downloadCSV = (data, filename) => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Escape quotes and wrap in quotes if there's a comma
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPDF = (title, columns, data, filename) => {
  if (!data || !data.length) return;

  // Create a hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  
  // Generate basic HTML for print
  const thead = `<tr>${columns.map((col) => `<th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">${col.headerName}</th>`).join('')}</tr>`;
  
  const tbody = data.map((row) => {
    const tds = columns.map((col) => {
      const cellValue = row[col.field] || '';
      return `<td style="padding: 8px; border-bottom: 1px solid #eee;">${cellValue}</td>`;
    });
    return `<tr>${tds.join('')}</tr>`;
  }).join('');

  const htmlContent = `
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #333; }
          h1 { color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #f5f5f5; }
          @media print {
            @page { margin: 1cm; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <table>
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
      </body>
    </html>
  `;

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for content to load then print
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 250);
};
