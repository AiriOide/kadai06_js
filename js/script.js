document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('candidateForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // フォームデータの取得
        const eqScores = [
            document.getElementById('selfAwareness').value,
            document.getElementById('selfManagement').value,
            document.getElementById('socialAwareness').value,
            document.getElementById('relationshipManagement').value
        ].map(Number);

        const interviewResponses = document.getElementById('interviewResponses').value.split('\n');

        // APIリクエストの代わりに、ダミーの分析結果を生成
        const result = analyzeCandidateDummy(eqScores, interviewResponses);

        // 結果の表示
        document.getElementById('prediction').textContent = result.適性予測;
        document.getElementById('probability').textContent = result.適性確率;
        document.getElementById('positiveRatio').textContent = result.ポジティブ感情比率;
        document.getElementById('negativeRatio').textContent = result.ネガティブ感情比率;
        document.getElementById('sentimentVolatility').textContent = result.感情変動性;

        resultDiv.classList.remove('hidden');
    });
});

// ダミーの分析関数（実際のAPIリクエストの代わり）
function analyzeCandidateDummy(eqScores, interviewResponses) {
    const avgEqScore = eqScores.reduce((a, b) => a + b, 0) / eqScores.length;
    const probability = Math.min(Math.max(avgEqScore / 10, 0), 1);
    
    return {
        適性予測: probability > 0.6 ? "適している" : "適していない",
        適性確率: probability.toFixed(2),
        ポジティブ感情比率: (Math.random() * 0.5 + 0.5).toFixed(2),
        ネガティブ感情比率: (Math.random() * 0.3).toFixed(2),
        感情変動性: (Math.random() * 0.5).toFixed(2)
    };
}