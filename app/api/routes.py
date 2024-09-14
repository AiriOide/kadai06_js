from flask import Blueprint, request, jsonify
from google.cloud import language_v1

api_bp = Blueprint('api', __name__)
client = language_v1.LanguageServiceClient()

def analyze_sentiment(text):
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    
    # スコアを0-1の範囲に正規化
    normalized_score = (sentiment.score + 1) / 2
    return {
        "positive": normalized_score,
        "negative": 1 - normalized_score,
        "magnitude": sentiment.magnitude
    }

@api_bp.route('/analyze', methods=['POST'])
def analyze_candidate():
    data = request.json
    eq_scores = data['eqScores']
    interview_responses = data['interviewResponses']

    # 感情分析
    sentiments = [analyze_sentiment(response) for response in interview_responses]
    positive_ratio = sum(s['positive'] for s in sentiments) / len(sentiments)
    negative_ratio = sum(s['negative'] for s in sentiments) / len(sentiments)
    sentiment_volatility = sum(s['magnitude'] for s in sentiments) / len(sentiments)

    # 簡単な適性予測（実際にはもっと複雑なモデルを使用すべきです）
    avg_eq_score = sum(eq_scores) / len(eq_scores)
    suitability_score = (avg_eq_score / 10 + positive_ratio) / 2

    return jsonify({
        "適性予測": "適している" if suitability_score > 0.6 else "適していない",
        "適性確率": f"{suitability_score:.2f}",
        "ポジティブ感情比率": f"{positive_ratio:.2f}",
        "ネガティブ感情比率": f"{negative_ratio:.2f}",
        "感情変動性": f"{sentiment_volatility:.2f}"
    })