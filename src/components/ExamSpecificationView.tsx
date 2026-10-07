import React, { useState } from 'react';
import { ExamSpecification, MatrixTopicRow, Subject } from '../types';
import { 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Calculator, 
  Percent, 
  Check, 
  Edit3,
  Sliders,
  Award,
  BookOpen
} from 'lucide-react';
import { downloadFile } from '../utils/templateGenerators';

interface ExamSpecificationViewProps {
  subjects: Subject[];
  initialSubjectId?: string;
  onBack?: () => void;
}

export const ExamSpecificationView: React.FC<ExamSpecificationViewProps> = ({
  subjects,
  initialSubjectId = 'math',
  onBack,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId);
  const [gradeLevel, setGradeLevel] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'matrix' | 'specification'>('matrix');
  const [ratioPreset, setRatioPreset] = useState<'70_30' | '50_50' | '60_40' | '100_0'>('70_30');
  const [notification, setNotification] = useState<string | null>(null);

  // Sinh dữ liệu Ma trận & Bản đặc tả mẫu chuẩn Bộ GD&ĐT
  const generateDefaultSpecification = (subId: string, grade: number, preset: string): ExamSpecification => {
    const isMath = subId === 'math';
    const isLit = subId === 'lit';
    const isPhys = subId === 'phys';
    const subName = subjects.find((s) => s.id === subId)?.name || 'Toán học';

    let tnkqRatio = 70;
    let tlRatio = 30;
    if (preset === '50_50') { tnkqRatio = 50; tlRatio = 50; }
    else if (preset === '60_40') { tnkqRatio = 60; tlRatio = 40; }
    else if (preset === '100_0') { tnkqRatio = 100; tlRatio = 0; }

    const rows: MatrixTopicRow[] = isMath ? [
      {
        id: 'row-m1',
        topicTitle: 'Mệnh đề và Tập hợp',
        subTopic: '1. Mệnh đề, mệnh đề chứa biến và mệnh đề phủ định',
        tnRecognition: 3,
        tnComprehension: 2,
        tnApplication: 1,
        tnHighApp: 0,
        tlRecognition: 0,
        tlComprehension: 0,
        tlApplication: 0,
        tlHighApp: 0,
        recognitionCriteria: 'Nhận biết được mệnh đề toán học, mệnh đề phủ định, mệnh đề kéo theo, mệnh đề tương đương.',
        comprehensionCriteria: 'Xác định được tính đúng/sai của một mệnh đề trong các tình huống toán học quen thuộc.',
        applicationCriteria: 'Sử dụng các kí hiệu với mọi (∀) và tồn tại (∃) trong biểu diễn các mệnh đề toán học.',
        highAppCriteria: 'Vận dụng mệnh đề chứng minh các bài toán suy luận logic thực tế.',
      },
      {
        id: 'row-m2',
        topicTitle: 'Mệnh đề và Tập hợp',
        subTopic: '2. Các phép toán trên tập hợp (Giao, Hợp, Hiệu)',
        tnRecognition: 3,
        tnComprehension: 2,
        tnApplication: 1,
        tnHighApp: 0,
        tlRecognition: 0,
        tlComprehension: 1,
        tlApplication: 0,
        tlHighApp: 0,
        recognitionCriteria: 'Nhận biết các tập hợp số N, Z, Q, R và các tập con của tập số thực (khoảng, đoạn, nửa khoảng).',
        comprehensionCriteria: 'Thực hiện được các phép toán giao, hợp, hiệu của hai tập hợp cơ bản.',
        applicationCriteria: 'Vận dụng các phép toán trên tập hợp giải quyết bài toán chứa tham số m đơn giản.',
        highAppCriteria: 'Giải quyết bài toán thực tế bằng biểu đồ Ven và các phép toán tập hợp.',
      },
      {
        id: 'row-m3',
        topicTitle: 'Bất phương trình & Hệ BPT bậc nhất hai ẩn',
        subTopic: '3. Bất phương trình và Hệ BPT bậc nhất hai ẩn',
        tnRecognition: 2,
        tnComprehension: 2,
        tnApplication: 2,
        tnHighApp: 1,
        tlRecognition: 0,
        tlComprehension: 0,
        tlApplication: 1,
        tlHighApp: 0,
        recognitionCriteria: 'Nhận biết bất phương trình và hệ bất phương trình bậc nhất hai ẩn.',
        comprehensionCriteria: 'Biểu diễn được miền nghiệm của bất phương trình bậc nhất hai ẩn trên mặt phẳng tọa độ Oxy.',
        applicationCriteria: 'Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn.',
        highAppCriteria: 'Vận dụng giải bài toán quy hoạch tuyến tính thực tế tìm giá trị lớn nhất, nhỏ nhất.',
      },
      {
        id: 'row-m4',
        topicTitle: 'Hệ thức lượng trong tam giác',
        subTopic: '4. Giá trị lượng giác & Định lí Côsin, Sin',
        tnRecognition: 2,
        tnComprehension: 3,
        tnApplication: 2,
        tnHighApp: 1,
        tlRecognition: 0,
        tlComprehension: 0,
        tlApplication: 1,
        tlHighApp: 1,
        recognitionCriteria: 'Nhận biết giá trị lượng giác của một góc từ 0° đến 180°; định lí cosin và sin trong tam giác.',
        comprehensionCriteria: 'Tính được các cạnh, các góc và diện tích của tam giác bằng hệ thức lượng.',
        applicationCriteria: 'Giải tam giác và tính bán kính đường tròn ngoại tiếp, nội tiếp tam giác.',
        highAppCriteria: 'Ứng dụng định lí sin, cosin vào bài toán đo đạc thực tế (đo chiều cao tháp, khoảng cách hai điểm).',
      },
    ] : [
      {
        id: 'row-g1',
        topicTitle: 'Chủ đề 1: Kiến thức trọng tâm nửa đầu học kỳ I',
        subTopic: '1. Khái niệm và quy luật cơ bản',
        tnRecognition: 5,
        tnComprehension: 4,
        tnApplication: 2,
        tnHighApp: 1,
        tlRecognition: 0,
        tlComprehension: 1,
        tlApplication: 0,
        tlHighApp: 0,
        recognitionCriteria: 'Nhận biết định nghĩa, định luật, mốc sự kiện và đặc trưng cơ bản.',
        comprehensionCriteria: 'Hiểu và giải thích được bản chất hiện tượng, so sánh phân tích.',
        applicationCriteria: 'Vận dụng công thức và kiến thức giải bài tập định lượng / trả lời câu hỏi thực hành.',
        highAppCriteria: 'Vận dụng tổng hợp giải quyết vấn đề mới phát sinh trong đời sống.',
      },
      {
        id: 'row-g2',
        topicTitle: 'Chủ đề 2: Kỹ năng thực hành & Vận dụng liên môn',
        subTopic: '2. Bài toán thực tiễn và phương pháp nghiên cứu',
        tnRecognition: 5,
        tnComprehension: 4,
        tnApplication: 2,
        tnHighApp: 1,
        tlRecognition: 0,
        tlComprehension: 0,
        tlApplication: 1,
        tlHighApp: 1,
        recognitionCriteria: 'Nhận diện phương pháp và công cụ nghiên cứu.',
        comprehensionCriteria: 'Đọc hiểu bảng số liệu, biểu đồ và lược đồ chuyên ngành.',
        applicationCriteria: 'Tính toán các đại lượng đặc trưng, phân tích tình huống.',
        highAppCriteria: 'Đề xuất giải pháp sáng tạo, giải quyết bài toán mô phỏng thực tế.',
      },
    ];

    return {
      id: `spec-${subId}-${Date.now()}`,
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA HỌC KỲ I - NĂM HỌC 2024 - 2025`,
      subjectName: subName,
      gradeLevel: grade,
      className: `Khối ${grade}`,
      academicYear: '2024 - 2025',
      semester: 'Học kỳ I',
      durationMinutes: isMath || isLit ? 90 : 45,
      schoolName: 'TRƯỜNG THPT LÊ QUÝ ĐÔN',
      tnkqRatio,
      tlRatio,
      pointPerTnkqQuestion: 0.25,
      totalPoints: 10.0,
      rows,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
  };

  const [specData, setSpecData] = useState<ExamSpecification>(() => 
    generateDefaultSpecification(selectedSubjectId, gradeLevel, ratioPreset)
  );

  // Khi thay đổi môn học, khối lớp hoặc tỉ lệ Preset
  const handleApplyPreset = (preset: '70_30' | '50_50' | '60_40' | '100_0') => {
    setRatioPreset(preset);
    const fresh = generateDefaultSpecification(selectedSubjectId, gradeLevel, preset);
    setSpecData(fresh);
    setNotification(`Đã tự động tính toán lại Ma trận & Bản đặc tả theo tỉ lệ: ${preset === '70_30' ? '70% TNKQ - 30% Tự luận' : preset === '50_50' ? '50% TNKQ - 50% Tự luận' : preset === '60_40' ? '60% TNKQ - 40% Tự luận' : '100% Trắc nghiệm'}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubjectId(newSubId);
    const fresh = generateDefaultSpecification(newSubId, gradeLevel, ratioPreset);
    setSpecData(fresh);
    setNotification(`Đã sinh tự động Bản đặc tả đề thi cho môn: ${fresh.subjectName}!`);
    setTimeout(() => setNotification(null), 2500);
  };

  // Tính toán tổng số câu và điểm số
  const totalTnkqRec = specData.rows.reduce((sum, r) => sum + r.tnRecognition, 0);
  const totalTnkqCom = specData.rows.reduce((sum, r) => sum + r.tnComprehension, 0);
  const totalTnkqApp = specData.rows.reduce((sum, r) => sum + r.tnApplication, 0);
  const totalTnkqHigh = specData.rows.reduce((sum, r) => sum + r.tnHighApp, 0);
  const totalTnkqQuestions = totalTnkqRec + totalTnkqCom + totalTnkqApp + totalTnkqHigh;

  const totalTlRec = specData.rows.reduce((sum, r) => sum + r.tlRecognition, 0);
  const totalTlCom = specData.rows.reduce((sum, r) => sum + r.tlComprehension, 0);
  const totalTlApp = specData.rows.reduce((sum, r) => sum + r.tlApplication, 0);
  const totalTlHigh = specData.rows.reduce((sum, r) => sum + r.tlHighApp, 0);
  const totalTlQuestions = totalTlRec + totalTlCom + totalTlApp + totalTlHigh;

  // Điểm số TNKQ
  const tnkqPoints = totalTnkqQuestions * specData.pointPerTnkqQuestion;
  // Điểm số Tự luận
  const tlPoints = 10.0 - tnkqPoints;

  // Điểm theo 4 mức độ
  const recPoints = Math.round((totalTnkqRec * specData.pointPerTnkqQuestion + totalTlRec * 1.0) * 10) / 10;
  const comPoints = Math.round((totalTnkqCom * specData.pointPerTnkqQuestion + totalTlCom * 1.0) * 10) / 10;
  const appPoints = Math.round((totalTnkqApp * specData.pointPerTnkqQuestion + totalTlApp * 1.0) * 10) / 10;
  const highPoints = Math.round((10.0 - recPoints - comPoints - appPoints) * 10) / 10;

  // Xuất file Word (.doc) chuẩn mẫu Bộ GD&ĐT
  const handleExportWord = () => {
    const docContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Ma trận và Bản đặc tả đề kiểm tra</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.3; }
  h1 { font-size: 13.5pt; text-align: center; text-transform: uppercase; margin-bottom: 2pt; color: #065f46; font-weight: bold; }
  h2 { font-size: 12pt; text-align: center; margin-top: 2pt; font-weight: bold; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
  th, td { border: 1px solid black; padding: 5px; font-size: 10pt; text-align: left; }
  th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
  .text-center { text-align: center; }
  .header-table { width: 100%; border: none; margin-bottom: 15px; }
  .header-table td { border: none; padding: 2px; }
</style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td style="width: 45%; text-align: center;">
        <strong>SỞ GIÁO DỤC VÀ ĐÀO TẠO</strong><br>
        <strong>${specData.schoolName.toUpperCase()}</strong>
      </td>
      <td style="width: 55%; text-align: center;">
        <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
        <strong>Độc lập - Tự do - Hạnh phúc</strong>
      </td>
    </tr>
  </table>

  <h1>MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ</h1>
  <h2>MÔN: ${specData.subjectName.toUpperCase()} - LỚP ${specData.gradeLevel}</h2>
  <p style="text-align: center; font-style: italic;">
    Thời gian làm bài: ${specData.durationMinutes} phút | Tỉ lệ: ${specData.tnkqRatio}% TNKQ - ${specData.tlRatio}% Tự luận
  </p>

  <!-- BẢNG MA TRẬN 2 CHIỀU -->
  <table>
    <thead>
      <tr>
        <th rowspan="3" style="width: 4%;">TT</th>
        <th rowspan="3" style="width: 18%;">Chủ đề / Mạch kiến thức</th>
        <th rowspan="3" style="width: 22%;">Đơn vị kiến thức / Kĩ năng</th>
        <th colspan="8">Mức độ nhận thức</th>
        <th colspan="2">Tổng</th>
        <th rowspan="3" style="width: 6%;">% Điểm</th>
      </tr>
      <tr>
        <th colspan="4">Trắc nghiệm khách quan (TNKQ)</th>
        <th colspan="4">Tự luận (TL)</th>
        <th rowspan="2" style="width: 5%;">Câu</th>
        <th rowspan="2" style="width: 5%;">Điểm</th>
      </tr>
      <tr>
        <th>NB</th>
        <th>TH</th>
        <th>VD</th>
        <th>VDC</th>
        <th>NB</th>
        <th>TH</th>
        <th>VD</th>
        <th>VDC</th>
      </tr>
    </thead>
    <tbody>
      ${specData.rows.map((r, idx) => {
        const rowTn = r.tnRecognition + r.tnComprehension + r.tnApplication + r.tnHighApp;
        const rowTl = r.tlRecognition + r.tlComprehension + r.tlApplication + r.tlHighApp;
        const rowPoints = rowTn * specData.pointPerTnkqQuestion + rowTl * 1.0;
        return `
        <tr>
          <td class="text-center">${idx + 1}</td>
          <td><strong>${r.topicTitle}</strong></td>
          <td>${r.subTopic}</td>
          <td class="text-center">${r.tnRecognition || '-'}</td>
          <td class="text-center">${r.tnComprehension || '-'}</td>
          <td class="text-center">${r.tnApplication || '-'}</td>
          <td class="text-center">${r.tnHighApp || '-'}</td>
          <td class="text-center">${r.tlRecognition || '-'}</td>
          <td class="text-center">${r.tlComprehension || '-'}</td>
          <td class="text-center">${r.tlApplication || '-'}</td>
          <td class="text-center">${r.tlHighApp || '-'}</td>
          <td class="text-center"><strong>${rowTn + rowTl}</strong></td>
          <td class="text-center"><strong>${rowPoints.toFixed(2)}</strong></td>
          <td class="text-center">${Math.round(rowPoints * 10)}%</td>
        </tr>
        `;
      }).join('')}
      <tr style="background-color: #f9f9f9; font-weight: bold;">
        <td colspan="3" class="text-center">TỔNG CỘNG</td>
        <td class="text-center">${totalTnkqRec}</td>
        <td class="text-center">${totalTnkqCom}</td>
        <td class="text-center">${totalTnkqApp}</td>
        <td class="text-center">${totalTnkqHigh}</td>
        <td class="text-center">${totalTlRec}</td>
        <td class="text-center">${totalTlCom}</td>
        <td class="text-center">${totalTlApp}</td>
        <td class="text-center">${totalTlHigh}</td>
        <td class="text-center">${totalTnkqQuestions + totalTlQuestions}</td>
        <td class="text-center">10.0</td>
        <td class="text-center">100%</td>
      </tr>
    </tbody>
  </table>

  <br><br>
  <h1>BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ</h1>
  <h2>MÔN: ${specData.subjectName.toUpperCase()} - LỚP ${specData.gradeLevel}</h2>

  <!-- BẢNG BẢN ĐẶC TẢ -->
  <table>
    <thead>
      <tr>
        <th style="width: 4%;">STT</th>
        <th style="width: 18%;">Chủ đề</th>
        <th style="width: 20%;">Đơn vị kiến thức</th>
        <th style="width: 40%;">Mức độ đánh giá (Yêu cầu cần đạt chi tiết)</th>
        <th style="width: 9%;">Số câu TNKQ</th>
        <th style="width: 9%;">Số câu Tự luận</th>
      </tr>
    </thead>
    <tbody>
      ${specData.rows.map((r, idx) => `
      <tr>
        <td class="text-center">${idx + 1}</td>
        <td><strong>${r.topicTitle}</strong></td>
        <td><strong>${r.subTopic}</strong></td>
        <td>
          <p><strong>* Nhận biết:</strong> ${r.recognitionCriteria}</p>
          <p><strong>* Thông hiểu:</strong> ${r.comprehensionCriteria}</p>
          <p><strong>* Vận dụng:</strong> ${r.applicationCriteria}</p>
          <p><strong>* Vận dụng cao:</strong> ${r.highAppCriteria}</p>
        </td>
        <td class="text-center">
          ${r.tnRecognition} NB<br>
          ${r.tnComprehension} TH<br>
          ${r.tnApplication} VD<br>
          ${r.tnHighApp} VDC
        </td>
        <td class="text-center">
          ${r.tlRecognition ? `${r.tlRecognition} NB<br>` : ''}
          ${r.tlComprehension ? `${r.tlComprehension} TH<br>` : ''}
          ${r.tlApplication ? `${r.tlApplication} VD<br>` : ''}
          ${r.tlHighApp ? `${r.tlHighApp} VDC` : ''}
          ${!r.tlRecognition && !r.tlComprehension && !r.tlApplication && !r.tlHighApp ? '-' : ''}
        </td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <br><br>
  <table style="border: none; width: 100%;">
    <tr style="border: none;">
      <td style="border: none; width: 33%; text-align: center;">
        <strong>HIỆU TRƯỞNG DUYỆT</strong><br>
        <em>(Ký và đóng dấu)</em><br><br><br><br>
        <strong>Ban Giám Hiệu</strong>
      </td>
      <td style="border: none; width: 33%; text-align: center;">
        <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br>
        <em>(Ký và ghi rõ họ tên)</em><br><br><br><br>
        <strong>Tổ trưởng</strong>
      </td>
      <td style="border: none; width: 33%; text-align: center;">
        <em>Ngày ...... tháng ...... năm 202...</em><br>
        <strong>GIÁO VIÊN RA ĐỀ</strong><br>
        <em>(Ký và ghi rõ họ tên)</em><br><br><br><br>
        <strong>Cô Lê Thị Hoài Bảo</strong>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const blob = new Blob(['\uFEFF' + docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ma_Tran_Ban_Dac_Ta_${specData.subjectName}_Lop${specData.gradeLevel}.doc`;
    link.click();
    setNotification('Đã xuất file Word (.doc) Ma trận & Bản đặc tả thành công!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner Control */}
      <div className="no-print bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <span>Ma trận & Bản đặc tả đề kiểm tra định kỳ (Chuẩn Bộ GD&ĐT)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                TT 22/BGDĐT
              </span>
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Sinh tự động bảng ma trận 2 chiều và bản đặc tả 4 mức độ nhận thức, tự động tính điểm số và tỉ lệ % giữa TNKQ và Tự luận
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportWord}
              className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              title="Xuất file Word (.doc) hoàn chỉnh cả Ma trận và Bản đặc tả"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xuất file Word</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-300 flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span>In ấn (Print)</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* BỘ LỰA CHỌN MÔN HỌC, KHỐI LỚP & TỈ LỆ % TNKQ / TỰ LUẬN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-neutral-100 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">Môn học:</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">Khối lớp:</label>
            <select
              value={gradeLevel}
              onChange={(e) => {
                const g = Number(e.target.value);
                setGradeLevel(g);
                setSpecData(generateDefaultSpecification(selectedSubjectId, g, ratioPreset));
              }}
              className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
            >
              {[10, 11, 12, 6, 7, 8, 9].map((g) => (
                <option key={g} value={g}>
                  Khối {g}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Tỉ lệ cấu trúc điểm (TNKQ / Tự luận):
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleApplyPreset('70_30')}
                className={`py-1.5 px-2 rounded-lg font-bold text-center border transition-all text-xs ${
                  ratioPreset === '70_30'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                70% - 30%
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('50_50')}
                className={`py-1.5 px-2 rounded-lg font-bold text-center border transition-all text-xs ${
                  ratioPreset === '50_50'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                50% - 50%
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('60_40')}
                className={`py-1.5 px-2 rounded-lg font-bold text-center border transition-all text-xs ${
                  ratioPreset === '60_40'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                60% - 40%
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('100_0')}
                className={`py-1.5 px-2 rounded-lg font-bold text-center border transition-all text-xs ${
                  ratioPreset === '100_0'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                100% TN
              </button>
            </div>
          </div>
        </div>

        {/* THẺ THỐNG KÊ TỔNG ĐIỂM & TỈ LỆ 4 MỨC ĐỘ NHẬN THỨC */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">1. Nhận biết (~40%):</span>
            <div className="font-bold text-neutral-900 mt-0.5 flex items-center justify-between">
              <span>{recPoints.toFixed(1)} điểm</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-mono">
                {Math.round(recPoints * 10)}%
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5 block">{totalTnkqRec} câu TN</span>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">2. Thông hiểu (~30%):</span>
            <div className="font-bold text-neutral-900 mt-0.5 flex items-center justify-between">
              <span>{comPoints.toFixed(1)} điểm</span>
              <span className="text-[10px] text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded font-mono">
                {Math.round(comPoints * 10)}%
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5 block">{totalTnkqCom} câu TN, {totalTlCom} câu TL</span>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">3. Vận dụng (~20%):</span>
            <div className="font-bold text-neutral-900 mt-0.5 flex items-center justify-between">
              <span>{appPoints.toFixed(1)} điểm</span>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-mono">
                {Math.round(appPoints * 10)}%
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5 block">{totalTnkqApp} câu TN, {totalTlApp} câu TL</span>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">4. Vận dụng cao (~10%):</span>
            <div className="font-bold text-neutral-900 mt-0.5 flex items-center justify-between">
              <span>{highPoints.toFixed(1)} điểm</span>
              <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded font-mono">
                {Math.round(highPoints * 10)}%
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5 block">{totalTnkqHigh} câu TN, {totalTlHigh} câu TL</span>
          </div>
        </div>

        {/* SWITCHER GIỮA MA TRẬN 2 CHIỀU VÀ BẢN ĐẶC TẢ */}
        <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. BẢNG MA TRẬN 2 CHIỀU (TỔNG HỢP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specification')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'specification'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. BẢN ĐẶC TẢ CHI TIẾT (YÊU CẦU CẦN ĐẠT 4 MỨC ĐỘ)</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT RENDER CONTAINER */}
      <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm p-6 print:p-0 print:border-none space-y-4">
        {/* Tiêu đề tài liệu chính thức */}
        <div className="text-center space-y-1 pb-4 border-b border-neutral-200">
          <div className="flex justify-between items-start text-xs text-neutral-600 mb-2">
            <div className="text-left font-semibold">
              <div>SỞ GIÁO DỤC VÀ ĐÀO TẠO</div>
              <div className="uppercase">{specData.schoolName}</div>
            </div>
            <div className="text-right font-semibold">
              <div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div className="italic font-normal">Độc lập - Tự do - Hạnh phúc</div>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-emerald-950">
            {activeTab === 'matrix' ? 'MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (CHUẨN 2 CHIỀU)' : 'BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ (CHI TIẾT 4 MỨC ĐỘ)'}
          </h2>
          <p className="text-xs text-neutral-600 italic">
            Môn: <strong>{specData.subjectName}</strong> · Lớp: <strong>{specData.gradeLevel}</strong> · Thời gian làm bài: <strong>{specData.durationMinutes} phút</strong> · Cấu trúc: <strong>{specData.tnkqRatio}% TNKQ - {specData.tlRatio}% Tự luận</strong>
          </p>
        </div>

        {/* TAB 1: BẢNG MA TRẬN 2 CHIỀU */}
        {activeTab === 'matrix' && (
          <div className="overflow-x-auto border border-neutral-300 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-100 text-neutral-800 border-b border-neutral-300 font-bold divide-x divide-neutral-200 text-center">
                  <th rowSpan={3} className="py-2 px-1 w-10">TT</th>
                  <th rowSpan={3} className="py-2 px-3 text-left min-w-[150px]">Chủ đề / Mạch kiến thức</th>
                  <th rowSpan={3} className="py-2 px-3 text-left min-w-[180px]">Đơn vị kiến thức / Kĩ năng</th>
                  <th colSpan={8} className="py-1 px-2 bg-emerald-50 text-emerald-950">Mức độ nhận thức</th>
                  <th colSpan={2} className="py-1 px-2 bg-neutral-200/60">Tổng</th>
                  <th rowSpan={3} className="py-2 px-2 w-14">% Điểm</th>
                </tr>
                <tr className="bg-neutral-50 text-neutral-700 border-b border-neutral-200 font-semibold divide-x divide-neutral-200 text-center">
                  <th colSpan={4} className="py-1 px-2 bg-cyan-50/70 text-cyan-950">Trắc nghiệm khách quan ({specData.tnkqRatio}%)</th>
                  <th colSpan={4} className="py-1 px-2 bg-amber-50/70 text-amber-950">Tự luận ({specData.tlRatio}%)</th>
                  <th rowSpan={2} className="py-1 px-1.5 w-12">Số câu</th>
                  <th rowSpan={2} className="py-1 px-1.5 w-14">Điểm</th>
                </tr>
                <tr className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 font-medium divide-x divide-neutral-200 text-center text-[11px]">
                  <th className="py-1 px-1 w-9 bg-cyan-50/40">NB</th>
                  <th className="py-1 px-1 w-9 bg-cyan-50/40">TH</th>
                  <th className="py-1 px-1 w-9 bg-cyan-50/40">VD</th>
                  <th className="py-1 px-1 w-9 bg-cyan-50/40">VDC</th>
                  <th className="py-1 px-1 w-9 bg-amber-50/40">NB</th>
                  <th className="py-1 px-1 w-9 bg-amber-50/40">TH</th>
                  <th className="py-1 px-1 w-9 bg-amber-50/40">VD</th>
                  <th className="py-1 px-1 w-9 bg-amber-50/40">VDC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {specData.rows.map((r, idx) => {
                  const rowTn = r.tnRecognition + r.tnComprehension + r.tnApplication + r.tnHighApp;
                  const rowTl = r.tlRecognition + r.tlComprehension + r.tlApplication + r.tlHighApp;
                  const rowPoints = rowTn * specData.pointPerTnkqQuestion + rowTl * 1.0;
                  const rowPercent = Math.round(rowPoints * 10);

                  return (
                    <tr key={r.id} className="hover:bg-neutral-50/80 divide-x divide-neutral-200">
                      <td className="py-2 px-1 text-center font-mono font-semibold text-neutral-600">{idx + 1}</td>
                      <td className="py-2 px-3 font-semibold text-neutral-900">{r.topicTitle}</td>
                      <td className="py-2 px-3 text-neutral-700">{r.subTopic}</td>
                      <td className="py-2 px-1 text-center font-mono bg-cyan-50/20">{r.tnRecognition || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-cyan-50/20">{r.tnComprehension || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-cyan-50/20">{r.tnApplication || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-cyan-50/20">{r.tnHighApp || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-amber-50/20">{r.tlRecognition || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-amber-50/20">{r.tlComprehension || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-amber-50/20">{r.tlApplication || '-'}</td>
                      <td className="py-2 px-1 text-center font-mono bg-amber-50/20">{r.tlHighApp || '-'}</td>
                      <td className="py-2 px-1.5 text-center font-mono font-bold text-neutral-800">{rowTn + rowTl}</td>
                      <td className="py-2 px-1.5 text-center font-mono font-bold text-emerald-800">{rowPoints.toFixed(2)}</td>
                      <td className="py-2 px-2 text-center font-mono font-semibold text-neutral-600">{rowPercent}%</td>
                    </tr>
                  );
                })}

                {/* DÒNG TỔNG CỘNG */}
                <tr className="bg-neutral-100 font-bold divide-x divide-neutral-300 text-neutral-900 border-t-2 border-neutral-300">
                  <td colSpan={3} className="py-2.5 px-3 text-center uppercase tracking-wider">
                    Tổng số câu / điểm
                  </td>
                  <td className="py-2 px-1 text-center font-mono text-cyan-900">{totalTnkqRec}</td>
                  <td className="py-2 px-1 text-center font-mono text-cyan-900">{totalTnkqCom}</td>
                  <td className="py-2 px-1 text-center font-mono text-cyan-900">{totalTnkqApp}</td>
                  <td className="py-2 px-1 text-center font-mono text-cyan-900">{totalTnkqHigh}</td>
                  <td className="py-2 px-1 text-center font-mono text-amber-900">{totalTlRec}</td>
                  <td className="py-2 px-1 text-center font-mono text-amber-900">{totalTlCom}</td>
                  <td className="py-2 px-1 text-center font-mono text-amber-900">{totalTlApp}</td>
                  <td className="py-2 px-1 text-center font-mono text-amber-900">{totalTlHigh}</td>
                  <td className="py-2 px-1.5 text-center font-mono text-emerald-950 font-extrabold">{totalTnkqQuestions + totalTlQuestions}</td>
                  <td className="py-2 px-1.5 text-center font-mono text-emerald-950 font-extrabold">10.0</td>
                  <td className="py-2 px-2 text-center font-mono text-emerald-950 font-extrabold">100%</td>
                </tr>

                {/* DÒNG TỔNG ĐIỂM THEO MỨC ĐỘ NHẬN THỨC */}
                <tr className="bg-emerald-50/50 text-[11px] font-semibold divide-x divide-neutral-200 text-emerald-950">
                  <td colSpan={3} className="py-2 px-3 text-right">
                    Tổng điểm từng mức độ:
                  </td>
                  <td colSpan={4} className="py-2 px-2 text-center font-mono">
                    TNKQ: {tnkqPoints.toFixed(1)} điểm ({specData.tnkqRatio}%)
                  </td>
                  <td colSpan={4} className="py-2 px-2 text-center font-mono">
                    Tự luận: {tlPoints.toFixed(1)} điểm ({specData.tlRatio}%)
                  </td>
                  <td colSpan={3} className="py-2 px-2 text-center font-mono">
                    Nhận biết: {recPoints.toFixed(1)}đ | TH: {comPoints.toFixed(1)}đ | VD: {appPoints.toFixed(1)}đ | VDC: {highPoints.toFixed(1)}đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: BẢNG BẢN ĐẶC TẢ CHI TIẾT */}
        {activeTab === 'specification' && (
          <div className="overflow-x-auto border border-neutral-300 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-100 text-neutral-800 border-b border-neutral-300 font-bold divide-x divide-neutral-200">
                  <th className="py-2.5 px-2 text-center w-12">STT</th>
                  <th className="py-2.5 px-3 min-w-[150px]">Chủ đề</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Đơn vị kiến thức</th>
                  <th className="py-2.5 px-4 min-w-[320px]">Mức độ đánh giá (Yêu cầu cần đạt chi tiết)</th>
                  <th className="py-2.5 px-2 text-center min-w-[110px] bg-cyan-50/70 text-cyan-950">Số câu TNKQ</th>
                  <th className="py-2.5 px-2 text-center min-w-[110px] bg-amber-50/70 text-amber-950">Số câu Tự luận</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {specData.rows.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-neutral-50/80 divide-x divide-neutral-200 items-start">
                    <td className="py-3 px-2 text-center font-mono font-semibold text-neutral-600">{idx + 1}</td>
                    <td className="py-3 px-3 font-semibold text-neutral-900">{r.topicTitle}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-950">{r.subTopic}</td>
                    <td className="py-3 px-4 space-y-2 text-[11px] leading-relaxed">
                      <div>
                        <strong className="text-neutral-900 font-bold">a) Nhận biết: </strong>
                        <span className="text-neutral-700">{r.recognitionCriteria}</span>
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-bold">b) Thông hiểu: </strong>
                        <span className="text-neutral-700">{r.comprehensionCriteria}</span>
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-bold">c) Vận dụng: </strong>
                        <span className="text-neutral-700">{r.applicationCriteria}</span>
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-bold">d) Vận dụng cao: </strong>
                        <span className="text-neutral-700">{r.highAppCriteria}</span>
                      </div>
                    </td>

                    {/* Số câu TNKQ */}
                    <td className="py-3 px-2 text-center bg-cyan-50/20 font-medium">
                      <div className="space-y-1">
                        <span className="block">{r.tnRecognition} câu NB</span>
                        <span className="block">{r.tnComprehension} câu TH</span>
                        <span className="block">{r.tnApplication} câu VD</span>
                        <span className="block">{r.tnHighApp} câu VDC</span>
                      </div>
                    </td>

                    {/* Số câu Tự luận */}
                    <td className="py-3 px-2 text-center bg-amber-50/20 font-medium">
                      <div className="space-y-1">
                        {r.tlRecognition > 0 && <span className="block">{r.tlRecognition} câu NB</span>}
                        {r.tlComprehension > 0 && <span className="block">{r.tlComprehension} câu TH</span>}
                        {r.tlApplication > 0 && <span className="block">{r.tlApplication} câu VD</span>}
                        {r.tlHighApp > 0 && <span className="block">{r.tlHighApp} câu VDC</span>}
                        {!r.tlRecognition && !r.tlComprehension && !r.tlApplication && !r.tlHighApp && <span>-</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Khung chữ ký chính thức */}
        <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-xs text-center">
          <div>
            <div className="font-bold text-neutral-800 uppercase">HIỆU TRƯỞNG DUYỆT</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và đóng dấu)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              Ban Giám Hiệu
            </div>
          </div>

          <div>
            <div className="font-bold text-neutral-800 uppercase">TỔ TRƯỞNG CHUYÊN MÔN</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và ghi rõ họ tên)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              Tổ trưởng
            </div>
          </div>

          <div>
            <div className="text-[11px] text-neutral-500 italic">Ngày ... tháng ... năm 202...</div>
            <div className="font-bold text-neutral-800 uppercase mt-0.5">GIÁO VIÊN RA ĐỀ</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và ghi rõ họ tên)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              Cô Lê Thị Hoài Bảo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
