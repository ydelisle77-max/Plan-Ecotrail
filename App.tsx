import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { profilData, pacingPlanData, nutritionPlanData, gearData } from './constants';
import type { ProfileDataItem, PacingPlanItem, NutritionPlanItem, GearItem } from './types';

// Helper Components (defined outside the main App to prevent re-renders)

interface SectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-[#2A2A2A] mb-6 flex items-center">
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
);

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  footer?: React.ReactNode;
}

const Table = <T,>({ headers, data, renderRow, footer }: TableProps<T>) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table className="w-full text-left text-[#2A2A2A]">
      <thead className="bg-gray-100 border-b-2 border-gray-200">
        <tr>
          {headers.map((header) => (
            <th key={header} className="p-4 font-semibold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
            {renderRow(item, index)}
          </tr>
        ))}
      </tbody>
    </table>
    {footer && (
      <div className="p-4 bg-gray-100 font-semibold text-center rounded-b-xl">
        {footer}
      </div>
    )}
  </div>
);


// Main App Component
const App: React.FC = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const generatePDF = async () => {
    const pdfContent = document.getElementById('pdf-content');
    if (!pdfContent) return;
    
    setIsPrinting(true);

    // Give time for the DOM to update (hide the button)
    await new Promise(resolve => setTimeout(resolve, 50));

    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#EDE6D6'
    });
    
    setIsPrinting(false);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = -heightLeft;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('MonPlanEcoTrail2026.pdf');
  };

  return (
    <>
      <div className="bg-[#26734D] h-2 w-full fixed top-0 left-0 z-10"></div>
      <div id="pdf-content" className="pt-2">
        <main className="max-w-5xl mx-auto p-4 md:p-8 text-[#2A2A2A]">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-3">
              Mon Plan EcoTrail Paris 2026 🗼
            </h1>
            <p className="text-lg text-gray-700 font-semibold">
              84,1 km – 1 264 m D+ – Objectif : 9 h 59 – Samedi 21 mars 2026
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Mon plan personnel de pacing, de nutrition et de matériel pour franchir la Tour Eiffel avant la nuit.
            </p>
          </header>

          {/* Map & Profile */}
          <Section title="Parcours & Profil Altimétrique">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <img src="https://images.ctfassets.net/74s6y3stf7s4/2z5b6s1h9K4wG4e8y0u0Sg/51a31b40974cfc7961c944a942544c41/Ecotrail_Paris_80km_finish_2.jpg" alt="Coureur de l'EcoTrail Paris arrivant à la Tour Eiffel" className="rounded-lg shadow-md w-full mb-6" />
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={profilData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="km" unit="km" stroke="#2A2A2A" />
                    <YAxis unit="m" stroke="#2A2A2A" domain={['dataMin - 20', 'dataMax + 20']}/>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '0.5rem' }} />
                    <Legend />
                    <Line type="monotone" dataKey="alt" name="Altitude (m)" stroke="#26734D" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>

          {/* Pacing Plan */}
          <Section title="Plan de course">
            <Table<PacingPlanItem>
              headers={['Segment', 'Distance', 'D+', 'Allure cible', 'Durée', 'Pause', 'Heure estimée']}
              data={pacingPlanData}
              renderRow={(item) => (
                <>
                  <td className="p-4 font-semibold">{item.segment}</td>
                  <td className="p-4">{item.distance}</td>
                  <td className="p-4">{item.dPlus}</td>
                  <td className="p-4">{item.pace}</td>
                  <td className="p-4">{item.duration}</td>
                  <td className="p-4">{item.pause}</td>
                  <td className="p-4">{item.time}</td>
                </>
              )}
              footer={
                <div className="text-sm md:text-base">
                  <span className="font-bold">Total : 9 h 59</span> (22 min de pauses cumulées)
                  <span className="mx-2 hidden md:inline">|</span><br className="md:hidden"/>
                  <span className="font-bold">Objectif moyen :</span> 8,4 km/h – Allure 7’08/km
                </div>
              }
            />
          </Section>

          {/* Nutrition Plan */}
          <Section title="Plan nutrition & hydratation">
            <Table<NutritionPlanItem>
              headers={['Ravito', 'Km', 'Heure estimée', 'Boire', 'Manger', 'Caféine', 'Pause']}
              data={nutritionPlanData}
              renderRow={(item) => (
                <>
                  <td className="p-4 font-semibold">{item.station}</td>
                  <td className="p-4">{item.km}</td>
                  <td className="p-4">{item.time}</td>
                  <td className="p-4">{item.drink}</td>
                  <td className="p-4">{item.eat}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.caffeine === 'Oui' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.caffeine}
                    </span>
                  </td>
                  <td className="p-4">{item.pause}</td>
                </>
              )}
              footer={
                 <div className="text-sm md:text-base grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                  <span><span className="font-bold">8 500</span> kcal dépensées</span>
                  <span><span className="font-bold">2 900</span> kcal consommées</span>
                  <span><span className="font-bold">5,8 L</span> d’eau</span>
                  <span><span className="font-bold">12</span> gels / <span className="font-bold">4</span> barres</span>
                </div>
              }
            />
          </Section>
          
          {/* Gear */}
          <Section title="Matériel obligatoire" icon="🧳">
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
                <Table<GearItem>
                    headers={['Matériel', 'Exigence', 'Pénalité']}
                    data={gearData}
                    renderRow={(item) => (
                      <>
                        <td className="p-4 font-semibold flex items-center">{item.icon} <span className="ml-3">{item.item}</span></td>
                        <td className="p-4">{item.requirement}</td>
                        <td className="p-4">{item.penalty}</td>
                      </>
                    )}
                />
                <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-r-lg">
                    <p className="font-bold">⚠️ Pénalités en cas de non-respect : jusqu’à disqualification.</p>
                </div>
            </div>
          </Section>

          {/* Summary */}
          <Section title="Résumé de la stratégie">
            <div className="bg-white border-l-4 border-[#F7A440] p-6 rounded-r-lg shadow-md">
                <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                    “Sur l’EcoTrail Paris 84 km (1 264 m D+), mon objectif de 9 h 59 est réaliste. Je devrai consommer 2 900 kcal, boire 5,8 L d’eau et gérer 22 min de pauses. Les sections Versailles → Meudon et Meudon → Saint-Cloud seront décisives. L’arrivée à la Tour Eiffel, de nuit, sera ma plus belle récompense.”
                </blockquote>
                <p className="text-right mt-4 font-semibold text-gray-700">- Yannick Delisle</p>
            </div>
          </Section>
        </main>
      </div>
      
      {/* Sticky Export Button */}
      <div className={`sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 text-center border-t border-gray-200 shadow-top ${isPrinting ? 'hidden' : ''}`}>
          <button 
            onClick={generatePDF} 
            className="bg-[#F7A440] hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
            disabled={isPrinting}
          >
            {isPrinting ? 'Génération en cours...' : '📄 Télécharger mon plan de course'}
          </button>
      </div>
    </>
  );
};

export default App;