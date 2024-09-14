import React, { useState } from 'react';

const RecruitmentToolPreview = () => {
  const [eqScores, setEqScores] = useState({
    selfAwareness: '',
    selfManagement: '',
    socialAwareness: '',
    relationshipManagement: ''
  });
  const [interviewResponses, setInterviewResponses] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scores = Object.values(eqScores).map(Number);
    const responses = interviewResponses.split('\n');
    const dummyResult = analyzeCandidateDummy(scores, responses);
    setResult(dummyResult);
  };

  const analyzeCandidateDummy = (eqScores, interviewResponses) => {
    const avgEqScore = eqScores.reduce((a, b) => a + b, 0) / eqScores.length;
    const probability = Math.min(Math.max(avgEqScore / 10, 0), 1);
    
    return {
      適性予測: probability > 0.6 ? "適している" : "適していない",
      適性確率: probability.toFixed(2),
      ポジティブ感情比率: (Math.random() * 0.5 + 0.5).toFixed(2),
      ネガティブ感情比率: (Math.random() * 0.3).toFixed(2),
      感情変動性: (Math.random() * 0.5).toFixed(2)
    };
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">学生インターン離職防止・採用支援ツール</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <h2 className="text-xl font-semibold mb-2">EQスコア</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.keys(eqScores).map((key) => (
            <input
              key={key}
              type="number"
              placeholder={key}
              value={eqScores[key]}
              onChange={(e) => setEqScores({...eqScores, [key]: e.target.value})}
              className="border p-2 rounded"
              required
            />
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">面接回答</h2>
        <textarea
          value={interviewResponses}
          onChange={(e) => setInterviewResponses(e.target.value)}
          rows="5"
          placeholder="面接での回答を入力してください（複数の回答は改行で区切ってください）"
          className="w-full border p-2 rounded mb-4"
          required
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">分析</button>
      </form>
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">分析結果</h2>
          <p>適性予測: {result.適性予測}</p>
          <p>適性確率: {result.適性確率}</p>
          <h3 className="text-lg font-semibold mt-2 mb-1">感情分析結果</h3>
          <p>ポジティブ感情比率: {result.ポジティブ感情比率}</p>
          <p>ネガティブ感情比率: {result.ネガティブ感情比率}</p>
          <p>感情変動性: {result.感情変動性}</p>
        </div>
      )}
    </div>
  );
};

export default RecruitmentToolPreview;