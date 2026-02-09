'use client';

import React, { useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import type { ResumeContent } from '@/lib/aiService';

interface ResumePreviewProps {
  resume: ResumeContent;
  onDownloadStart?: () => void;
  onDownloadEnd?: () => void;
}

export default function ResumePreview({
  resume,
  onDownloadStart,
  onDownloadEnd,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    onDownloadStart?.();
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height) * 0.95;
      const imgW = canvas.width * ratio;
      const imgH = canvas.height * ratio;
      const x = (pdfW - imgW) / 2;
      pdf.addImage(imgData, 'PNG', x, 5, imgW, imgH);
      pdf.save(`ATS-Resume-${(resume.name || 'Resume').replace(/\s+/g, '-')}.pdf`);
    } catch (e) {
      console.error('PDF export failed:', e);
    } finally {
      onDownloadEnd?.();
    }
  }, [resume.name, onDownloadStart, onDownloadEnd]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-cyan-400 uppercase tracking-wider">
          Preview
        </h3>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div
        ref={containerRef}
        className="bg-white text-black p-8 rounded-lg shadow-xl max-w-[210mm] mx-auto"
        style={{ minHeight: '297mm' }}
      >
        {/* ATS-friendly single-page resume layout */}
        <div className="font-sans text-sm leading-snug">
          <header className="border-b-2 border-gray-800 pb-2 mb-4">
            <h1 className="text-2xl font-bold uppercase tracking-tight">
              {resume.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-700 text-xs">
              {resume.email && <span>{resume.email}</span>}
              {resume.phone && <span>{resume.phone}</span>}
            </div>
          </header>

          {resume.summary && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-gray-800">{resume.summary}</p>
            </section>
          )}

          {resume.skills && resume.skills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Skills
              </h2>
              <p className="text-gray-800">
                {resume.skills.join(' • ')}
              </p>
            </section>
          )}

          {resume.experience && resume.experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Experience
              </h2>
              {resume.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">{exp.title}</span>
                    <span className="text-xs text-gray-600">{exp.dates}</span>
                  </div>
                  <div className="text-gray-700 text-xs mb-1">{exp.company}</div>
                  <ul className="list-disc list-inside text-gray-800 text-xs space-y-0.5">
                    {exp.bullets?.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {resume.education && resume.education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              {resume.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">{edu.degree}</span>
                    <span className="text-xs text-gray-600">{edu.year}</span>
                  </div>
                  <div className="text-gray-700 text-xs">{edu.institution}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
