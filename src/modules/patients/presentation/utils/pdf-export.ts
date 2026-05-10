import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Patient } from '@/modules/patients/domain/entities/Patient';

export const exportPatientsToPDF = (patients: Patient[]) => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('Listado de Pacientes', 14, 22);

  // Add Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

  const tableColumn = ["Nombre Completo", "Identificación", "Email", "Teléfono", "Última Visita", "Estado"];
  const tableRows: any[] = [];

  patients.forEach(patient => {
    const patientData = [
      `${patient.firstName} ${patient.lastName}`,
      patient.documentId,
      patient.email,
      patient.phone,
      patient.lastVisit,
      patient.status,
    ];
    tableRows.push(patientData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [71, 101, 245], textColor: 255 }, // Medical blue matching --primary roughly
    alternateRowStyles: { fillColor: [245, 247, 255] },
  });

  doc.save(`pacientes_${new Date().getTime()}.pdf`);
};
