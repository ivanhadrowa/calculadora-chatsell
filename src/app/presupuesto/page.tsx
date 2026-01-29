'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Integration {
  id: string;
  description: string;
  price: number;
}

export default function PresupuestoCreator() {
  const [clientName, setClientName] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: '1', description: '', price: 0 }
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [validUntilStr, setValidUntilStr] = useState('');

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setDateStr(now.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    setTimeStr(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    setTrackingId(`CS-${Math.random().toString(36).substring(2, 7).toUpperCase()}X${Math.random().toString(36).substring(2, 4).toUpperCase()}`);

    const validUntil = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    setValidUntilStr(validUntil.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
  }, []);

  const addIntegration = () => {
    setIntegrations([...integrations, { id: Date.now().toString(), description: '', price: 0 }]);
  };

  const removeIntegration = (id: string) => {
    if (integrations.length > 1) {
      setIntegrations(integrations.filter(i => i.id !== id));
    }
  };

  const updateIntegration = (id: string, field: 'description' | 'price', value: string | number) => {
    setIntegrations(integrations.map(i =>
      i.id === id ? { ...i, [field]: value } : i
    ));
  };

  const calculateTotal = () => {
    return integrations.reduce((sum, integration) => sum + integration.price, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleExport = async () => {
    if (!printableRef.current) return;

    if (!clientName.trim()) {
      alert('Por favor ingresa el nombre del cliente antes de generar el presupuesto.');
      return;
    }

    if (integrations.some(i => !i.description.trim() || i.price <= 0)) {
      alert('Por favor completa todas las integraciones con descripción y precio válido.');
      return;
    }

    setIsExporting(true);
    try {
      // Hide logo temporarily
      // Hide logo temporarily -> REMOVED


      await new Promise(r => setTimeout(r, 300));

      const canvas = await html2canvas(printableRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // Show logo again
      // Show logo again -> REMOVED


      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the canvas content as image
      const canvasData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(canvasData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      const safeClientName = clientName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const dateFilename = new Date().toISOString().split('T')[0];
      const finalFilename = `presupuesto_chatsell_${safeClientName}_${dateFilename}.pdf`;

      pdf.save(finalFilename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hidden Printable Section */}
      <div className="fixed left-[-9999px] top-0 opacity-0 pointer-events-none">
        <div
          ref={printableRef}
          id="printable-quote"
          className="p-12 bg-[#ffffff] text-[#000000] min-h-[1100px] w-[800px]"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-12 bg-[#0f0f0f] -m-12 p-12 mb-8">
            <div>
              <img src="/logo.png" alt="Chatsell" className="h-10 mb-2" />
              <p className="text-[#9ca3af] text-xs">Automatización Inteligente para tu Negocio</p>
            </div>
            <div className="text-right">
              <h2 className="text-[#ffffff] text-xl font-bold tracking-tight">
                PRESUPUESTO
              </h2>
              <p className="text-[#6b7280] text-xs mt-1 lowercase">chatsell.net</p>
            </div>
          </div>

          <div className="flex justify-between mb-12 px-2">
            <div>
              <h3 className="text-[#6b7280] uppercase text-[10px] font-bold tracking-widest mb-2">Detalles del Presupuesto</h3>
              <p className="text-sm font-bold">Fecha: {mounted ? dateStr : ''}</p>
              <p className="text-sm">Hora: {mounted ? timeStr : ''}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[#6b7280] uppercase text-[10px] font-bold tracking-widest mb-2">ID de Seguimiento</h3>
              <p className="text-sm font-mono text-[#2563eb]">{mounted ? trackingId : 'CS-...'}</p>
            </div>
          </div>

          <div className="mb-8 px-2">
            <h3 className="text-[#6b7280] uppercase text-[10px] font-bold tracking-widest mb-2">Nombre del Cliente</h3>
            <p className="text-lg font-bold">{clientName}</p>
          </div>

          <table className="w-full mb-12 border-collapse">
            <thead>
              <tr className="border-b-2 border-[#f3f4f6] text-left">
                <th className="py-4 text-xs font-bold uppercase tracking-wider text-[#6b7280]">Descripción</th>
                <th className="py-4 text-xs font-bold uppercase tracking-wider text-[#6b7280] text-center">Cantidad</th>
                <th className="py-4 text-xs font-bold uppercase tracking-wider text-[#6b7280] text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((integration, idx) => (
                <tr key={integration.id} className="border-b border-[#f9fafb]">
                  <td className="py-5">
                    <p className="font-bold text-sm">{integration.description}</p>
                  </td>
                  <td className="py-5 text-sm text-center">1</td>
                  <td className="py-5 text-sm font-bold text-right">{formatCurrency(integration.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-24 pr-2">
            <div className="w-72 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6b7280]">Subtotal</span>
                <span className="font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
              <div className="pt-4 border-t-2 border-[#111827] flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-tighter">Total Mensual</span>
                <span className="text-2xl font-black text-[#2563eb] leading-none">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-[#e5e7eb] pt-8">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#111827]">Términos y Condiciones</h4>
            <ul className="text-[10px] text-[#4b5563] space-y-2 leading-relaxed">
              <li>1. Este presupuesto tiene una validez de 2 días a partir de su envío</li>
              <li>2. Los precios están expresados en Dólares Estadounidenses (USD).</li>
            </ul>
            <p className="text-center text-[9px] text-[#9ca3af] mt-12 italic">
              Este es un presupuesto informativo generado automáticamente por el sistema de Chatsell.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Generador de <span className="gradient-text">Presupuestos</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Crea presupuestos personalizados para tus clientes con integraciones a medida
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Client Name */}
          <section className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Información del Cliente</h2>
                <p className="text-sm text-gray-400">Ingresa el nombre de la empresa o cliente</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Nombre del Cliente o Empresa"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary/50 transition-all text-lg font-medium"
            />
          </section>

          {/* Integrations */}
          <section className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                  <Plus size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Integraciones</h2>
                  <p className="text-sm text-gray-400">Define las integraciones y sus precios</p>
                </div>
              </div>
              <button
                onClick={addIntegration}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Agregar
              </button>
            </div>

            <div className="space-y-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                          Descripción
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Integración con WhatsApp Business API"
                          value={integration.description}
                          onChange={(e) => updateIntegration(integration.id, 'description', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                          Precio Unitario (USD)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={integration.price || ''}
                          onChange={(e) => updateIntegration(integration.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>
                    {integrations.length > 1 && (
                      <button
                        onClick={() => removeIntegration(integration.id)}
                        className="self-start mt-6 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText size={24} className="text-primary" />
              Resumen
            </h2>

            <div className="space-y-4 mb-8">
              <div className="text-sm text-gray-400">
                <p className="mb-2">ID: {mounted ? trackingId : 'CS-...'}</p>
                <p className="mb-2">Fecha: {mounted ? dateStr : ''}</p>
                <p>Válido hasta: {mounted ? validUntilStr : ''}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Items:</span>
                  <span className="font-medium">{integrations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Mensual</p>
                <div className="text-5xl font-black gradient-text">
                  {formatCurrency(calculateTotal())}
                </div>
              </div>

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? 'Generando...' : 'Generar Presupuesto'}
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-gray-500 px-4">
                * Los precios están expresados en USD y no incluyen impuestos locales si aplican.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
