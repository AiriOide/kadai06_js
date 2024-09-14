
document.getElementById('candidateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    analyzeCandidate();
});

function analyzeCandidate() {
    // 実際のアプリケーションでは、ここでバックエンドAPIにデータを送信します
    // この例では、ダミーデータを使用してレスポンスをシミュレートします
    const dummyResponse = {
        "適性予測": Math.random() > 0.5 ? "適している" : "適していない",
        "適性確率": (Math.random() * 0.5 + 0.5).toFixed(2),
        "EQスコア": [
            parseFloat(document.getElementById('selfAwareness').value),
            parseFloat(document.getElementById('selfManagement').value),
            parseFloat(document.getElementById('socialAwareness').value),
            parseFloat(document.getElementById('relationshipManagement').value)
        ],
        "ポジティブ感情比率": (Math.random() * 0.5 + 0.3).toFixed(2),
        "ネガティブ感情比率": (Math.random() * 0.3).toFixed(2),
        "感情変動性": (Math.random() * 0.5).toFixed(2)
    };

    displayResult(dummyResponse);
}

function displayResult(result) {
    document.getElementById('prediction').textContent = `適性予測: ${result['適性予測']}`;
    document.getElementById('probability').textContent = `適性確率: ${result['適性確率']}`;

    createEQChart(result['EQスコア']);
    createSentimentChart(result['ポジティブ感情比率'], result['ネガティブ感情比率'], result['感情変動性']);

    document.getElementById('result').style.display = 'block';
}

function createEQChart(eqScores) {
    const ctx = document.getElementById('eqChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['自己認識', '自己管理', '社会的認識', '関係管理'],
            datasets: [{
                label: 'EQスコア',
                data: eqScores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }
        }
    });
}

function createSentimentChart(positive, negative, volatility) {
    const ctx = document.getElementById('sentimentChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ポジティブ感情比率', 'ネガティブ感情比率', '感情変動性'],
            datasets: [{
                label: '感情分析結果',
                data: [positive, negative, volatility],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
}