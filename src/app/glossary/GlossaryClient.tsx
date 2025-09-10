'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Term {
  id: string;
  term: string;
  reading: string;
  category: string;
  definition: string;
  details?: string;
  relatedTerms?: string[];
  examples?: string[];
}

const glossaryTerms: Term[] = [
  // AI・機械学習カテゴリー
  {
    id: 'llmo',
    term: 'LLMO',
    reading: 'エルエルエムオー',
    category: 'AI・機械学習',
    definition: 'Large Language Model Optimization（大規模言語モデル最適化）の略。ChatGPTやGoogle Geminiなどの大規模言語モデルに対してWebサイトやコンテンツを最適化する技術手法。',
    details: 'AI検索時代において、従来のSEO対策を超えた新しいアプローチが求められています。LLMOは、AIが「理解しやすく」「引用しやすい」コンテンツ作りを通じて、AI検索結果での露出向上を目指します。',
    relatedTerms: ['SEO', 'AI検索', 'ChatGPT', 'Google Gemini'],
    examples: ['構造化データの最適化', 'AI引用されやすい文章構成', 'セマンティックHTMLの活用']
  },
  {
    id: 'ai-search',
    term: 'AI検索',
    reading: 'エーアイけんさく',
    category: 'AI・機械学習',
    definition: 'ChatGPT、Google Gemini、Claude、Microsoft Copilotなどの大規模言語モデルを活用した検索システム。自然言語での質問に対して、統合された回答を提供する。',
    details: '従来のキーワード検索とは異なり、文脈を理解して複数の情報源から最適な回答を生成します。ユーザーは「最適な会計ソフトを教えて」のような自然な質問で情報を得ることができます。',
    relatedTerms: ['LLMO', '自然言語処理', 'ChatGPT', 'RAG'],
    examples: ['ChatGPTでの企業情報検索', 'Google Geminiでの商品比較', 'Perplexityでの専門知識検索']
  },
  {
    id: 'chatgpt',
    term: 'ChatGPT',
    reading: 'チャットジーピーティー',
    category: 'AI・機械学習',
    definition: 'OpenAIが開発した大規模言語モデル。自然言語での対話を通じて、質問への回答、文章作成、プログラミング支援など幅広いタスクを実行できる。',
    details: '2022年11月の公開以降、急速に普及し、ビジネスシーンでも活用が進んでいます。企業の情報検索や意思決定支援ツールとしても注目されています。',
    relatedTerms: ['AI検索', 'LLMO', 'OpenAI', 'GPT'],
    examples: ['顧客サポートの自動化', 'マーケティング文章の作成', '会議議事録の要約']
  },
  {
    id: 'google-gemini',
    term: 'Google Gemini',
    reading: 'グーグルジェミナイ',
    category: 'AI・機械学習',
    definition: 'Googleが開発した大規模言語モデル。テキスト、画像、音声、動画を統合的に処理できるマルチモーダルAIシステム。',
    details: 'Google検索との統合により、従来の検索結果に加えてAI生成の回答も表示されるようになっています。企業のWeb戦略においてGemini対応は重要な要素となっています。',
    relatedTerms: ['AI検索', 'LLMO', 'Google検索', 'マルチモーダルAI'],
    examples: ['画像付き商品説明の理解', '複合的な質問への回答', 'Google検索結果での情報統合']
  },
  {
    id: 'claude',
    term: 'Claude',
    reading: 'クロード',
    category: 'AI・機械学習',
    definition: 'Anthropicが開発した大規模言語モデル。高度な論理的思考と安全性を重視した設計が特徴の対話型AI。',
    details: '憲法AI（Constitutional AI）という手法により、有害なコンテンツを避けながらより安全で有用な応答を提供します。長い文脈を理解する能力が高く、複雑な分析タスクに適しています。',
    relatedTerms: ['AI検索', 'ChatGPT', 'Anthropic', '憲法AI'],
    examples: ['長文書類の要約', '論理的な分析レポート作成', 'コード解析とレビュー']
  },
  {
    id: 'microsoft-copilot',
    term: 'Microsoft Copilot',
    reading: 'マイクロソフトコパイロット',
    category: 'AI・機械学習',
    definition: 'Microsoftが提供するAIアシスタント。Office 365やWindows、Edgeブラウザーなどと統合されたAIツール。',
    details: 'ChatGPTの技術を基盤としながら、Microsoft製品との深い統合により、文書作成、データ分析、プレゼンテーション作成など日常業務を支援します。',
    relatedTerms: ['ChatGPT', 'Office 365', 'Azure', 'AI検索'],
    examples: ['Excelでのデータ分析', 'PowerPointプレゼン作成', 'Wordでの文書執筆支援']
  },
  {
    id: 'perplexity-ai',
    term: 'Perplexity AI',
    reading: 'パープレキシティエーアイ',
    category: 'AI・機械学習',
    definition: 'リアルタイム検索機能を持つAI検索エンジン。質問に対して最新の情報源を引用しながら回答を提供する。',
    details: 'インターネット上の最新情報をリアルタイムで検索し、信頼できる情報源からの引用付きで回答を生成します。学術論文や最新ニュースの検索に特に優れています。',
    relatedTerms: ['AI検索', 'リアルタイム検索', '引用', '情報検索'],
    examples: ['最新ニュースの調査', '学術情報の検索', '技術トレンドの分析']
  },
  {
    id: 'gpt-4',
    term: 'GPT-4',
    reading: 'ジーピーティーフォー',
    category: 'AI・機械学習',
    definition: 'OpenAIが開発した第4世代の大規模言語モデル。GPT-3.5の後継として、より高度な推論能力と理解力を持つ。',
    details: 'テキストだけでなく画像も理解できるマルチモーダル機能、長い文脈の理解、より正確な回答生成が特徴です。ChatGPT Plusや多くのAIサービスで利用されています。',
    relatedTerms: ['ChatGPT', 'OpenAI', 'マルチモーダル', 'トランスフォーマー'],
    examples: ['複雑な推論問題の解決', '画像解析と説明', '高度なコード生成']
  },
  {
    id: 'llm',
    term: 'LLM（大規模言語モデル）',
    reading: 'エルエルエム',
    category: 'AI・機械学習',
    definition: 'Large Language Model の略。膨大なテキストデータで学習された大規模なニューラルネットワークモデル。',
    details: 'パラメータ数が数十億から数千億に及ぶ言語モデルで、文章生成、翻訳、要約、質問応答など幅広い言語タスクを実行できます。',
    relatedTerms: ['GPT', 'Transformer', '自然言語処理', 'パラメータ'],
    examples: ['ChatGPT', 'Google Gemini', 'Claude', 'GPT-4']
  },
  {
    id: 'rag',
    term: 'RAG',
    reading: 'ラグ',
    category: 'AI・機械学習',
    definition: 'Retrieval-Augmented Generation（検索拡張生成）の略。外部のデータベースから関連情報を検索して、それを基に回答を生成するAI技術。',
    details: '大規模言語モデルの知識不足を補うため、リアルタイムで外部情報を検索・活用します。企業の内部文書や最新情報を活用したAIシステム構築に重要な技術です。',
    relatedTerms: ['LLM', 'ベクトル検索', 'エンベディング', 'AI検索'],
    examples: ['企業内FAQシステム', '専門文書検索', '最新情報を含む回答生成']
  },
  {
    id: 'prompt-engineering',
    term: 'プロンプトエンジニアリング',
    reading: 'プロンプトエンジニアリング',
    category: 'AI・機械学習',
    definition: 'AI（大規模言語モデル）から最適な出力を得るため、入力テキスト（プロンプト）を設計・最適化する技術。',
    details: '適切な指示の書き方、文脈の提供方法、出力フォーマットの指定など、AIとの効果的なコミュニケーション手法を体系化した分野です。',
    relatedTerms: ['ChatGPT', 'Claude', 'LLM', 'Few-shot学習'],
    examples: ['ロールプレイ指示', 'ステップバイステップ思考', '具体例を含む指示']
  },
  {
    id: 'fine-tuning',
    term: 'ファインチューニング',
    reading: 'ファインチューニング',
    category: 'AI・機械学習',
    definition: '事前に学習済みのAIモデルを、特定のタスクやドメインに合わせて追加学習させる手法。',
    details: '汎用的な大規模言語モデルを企業固有のデータで再学習させることで、より専門的で精度の高いAIシステムを構築できます。',
    relatedTerms: ['機械学習', '転移学習', 'LLM', 'カスタムAI'],
    examples: ['業界特化型チャットボット', '企業向け文書要約AI', '専門用語対応翻訳AI']
  },
  {
    id: 'machine-learning',
    term: '機械学習',
    reading: 'きかいがくしゅう',
    category: 'AI・機械学習',
    definition: 'データからパターンを学習し、新しいデータに対して予測や分類を行うAI技術の一分野。',
    details: '明示的にプログラムされることなく、経験（データ）から自動的に改善する能力を持つシステムです。教師あり学習、教師なし学習、強化学習に分類されます。',
    relatedTerms: ['深層学習', 'AI', 'データサイエンス', '予測分析'],
    examples: ['画像認識', 'レコメンドシステム', '異常検知', '需要予測']
  },
  {
    id: 'deep-learning',
    term: '深層学習（ディープラーニング）',
    reading: 'しんそうがくしゅう',
    category: 'AI・機械学習',
    definition: '多層のニューラルネットワークを用いた機械学習手法。人間の脳の神経回路を模倣した学習システム。',
    details: '大量のデータから複雑なパターンを自動で学習できるため、画像認識、音声認識、自然言語処理などで革新的な成果を上げています。',
    relatedTerms: ['ニューラルネットワーク', '機械学習', 'CNN', 'RNN'],
    examples: ['画像分類', '音声認識', '自動運転', '医療診断支援']
  },
  {
    id: 'neural-network',
    term: 'ニューラルネットワーク',
    reading: 'ニューラルネットワーク',
    category: 'AI・機械学習',
    definition: '人間の脳の神経細胞（ニューロン）の働きを模倣した数学的モデル。機械学習の基礎技術の一つ。',
    details: '入力層、隠れ層、出力層から構成され、各層のノード間の重みを調整することで学習を行います。パターン認識や予測に広く使用されています。',
    relatedTerms: ['深層学習', '機械学習', 'パーセプトロン', 'バックプロパゲーション'],
    examples: ['手書き文字認識', '株価予測', '画像分類', '自然言語処理']
  },
  {
    id: 'transformer',
    term: 'トランスフォーマー',
    reading: 'トランスフォーマー',
    category: 'AI・機械学習',
    definition: 'Attention機構を基盤とした深層学習アーキテクチャ。現在の大規模言語モデルの基礎技術。',
    details: '「Attention Is All You Need」論文で提案された手法で、並列処理が可能で高速な学習ができます。GPTやBERTなど多くの言語モデルで採用されています。',
    relatedTerms: ['GPT', 'BERT', 'Attention', 'Self-Attention'],
    examples: ['GPT-4', 'Google Gemini', 'Claude', '機械翻訳システム']
  },
  {
    id: 'natural-language-processing',
    term: '自然言語処理（NLP）',
    reading: 'しぜんげんごしょり',
    category: 'AI・機械学習',
    definition: 'Natural Language Processing の略。コンピューターが人間の言語を理解、解析、生成するためのAI技術分野。',
    details: 'テキスト分析、機械翻訳、感情分析、文書要約、質問応答など、言語に関わる様々なタスクを自動化する技術の総称です。',
    relatedTerms: ['機械学習', 'トークン化', '形態素解析', 'トランスフォーマー'],
    examples: ['機械翻訳', '感情分析', 'チャットボット', '文書要約']
  },
  {
    id: 'generative-ai',
    term: '生成AI',
    reading: 'せいせいエーアイ',
    category: 'AI・機械学習',
    definition: '新しいコンテンツ（テキスト、画像、音声、動画など）を創造・生成するAI技術の総称。',
    details: '既存のデータから学習したパターンを基に、新しく創造的なコンテンツを生み出します。ChatGPTやMidjourney、Stable Diffusionなどが代表例です。',
    relatedTerms: ['ChatGPT', 'Midjourney', 'DALL-E', 'Stable Diffusion'],
    examples: ['AI文章作成', 'AI画像生成', 'AI動画制作', 'AI音楽作成']
  },
  {
    id: 'multimodal-ai',
    term: 'マルチモーダルAI',
    reading: 'マルチモーダルエーアイ',
    category: 'AI・機械学習',
    definition: 'テキスト、画像、音声、動画など複数の異なる形式のデータを統合的に処理できるAIシステム。',
    details: 'これまでのAIは単一のデータ形式に特化していましたが、マルチモーダルAIは人間のように複数の感覚情報を統合して理解・判断できます。',
    relatedTerms: ['GPT-4V', 'Google Gemini', '画像認識', '音声認識'],
    examples: ['画像説明文生成', '動画内容要約', '音声付き画像検索', '複合メディア分析']
  },
  {
    id: 'hallucination',
    term: 'ハルシネーション',
    reading: 'ハルシネーション',
    category: 'AI・機械学習',
    definition: 'AIが実際には存在しない情報や事実と異なる内容を、あたかも真実であるかのように生成してしまう現象。',
    details: '大規模言語モデルの重要な課題の一つで、学習データにない情報を「創作」してしまうことがあります。事実確認とソース提示が重要です。',
    relatedTerms: ['事実確認', 'ソース検証', 'AI安全性', '情報信頼性'],
    examples: ['存在しない論文の引用', '架空の統計データ', '事実と異なる歴史情報', '誤った技術仕様']
  },
  {
    id: 'context-window',
    term: 'コンテキストウィンドウ',
    reading: 'コンテキストウィンドウ',
    category: 'AI・機械学習',
    definition: 'AIモデルが一度に処理できるテキストの最大長。トークン数で表される制限。',
    details: 'GPT-4では約32,000トークン、Claudeでは約200,000トークンなど、モデルによって異なります。長い文書の処理能力を左右する重要な仕様です。',
    relatedTerms: ['トークン', 'LLM', 'テキスト処理', '文脈理解'],
    examples: ['長文書類の一括分析', '大量データの要約', '複数文書の比較', '詳細な指示の実行']
  },
  {
    id: 'token',
    term: 'トークン',
    reading: 'トークン',
    category: 'AI・機械学習',
    definition: 'AIが処理するテキストの最小単位。単語や文字、句読点などを数値に変換した単位。',
    details: '日本語では約1文字が1トークン、英語では約0.75単語が1トークンに相当します。API利用料金やコンテキスト長の計算に使用されます。',
    relatedTerms: ['トークン化', 'コンテキストウィンドウ', 'API料金', 'テキスト処理'],
    examples: ['API使用量の計算', 'プロンプト設計', 'コスト見積もり', 'テキスト分割']
  },
  {
    id: 'embedding',
    term: 'エンベディング',
    reading: 'エンベディング',
    category: 'AI・機械学習',
    definition: '単語や文章、画像などを高次元ベクトル空間で表現する技術。意味的な類似性を数値で表現できる。',
    details: '似た意味のものは近い位置に、異なる意味のものは遠い位置に配置されます。検索、推薦、クラスタリングなど様々なAIアプリケーションの基盤技術です。',
    relatedTerms: ['ベクトル検索', 'RAG', 'Word2Vec', 'Sentence-BERT'],
    examples: ['類似文書検索', 'レコメンドシステム', 'セマンティック検索', 'クラスタリング分析']
  },
  {
    id: 'ai-ethics',
    term: 'AI倫理',
    reading: 'エーアイりんり',
    category: 'AI・機械学習',
    definition: 'AI技術の開発・利用において考慮すべき倫理的課題や原則を扱う分野。',
    details: 'バイアスの回避、プライバシー保護、透明性確保、責任の所在など、AIが社会に与える影響を適切に管理するための指針を研究します。',
    relatedTerms: ['AIガバナンス', 'バイアス', '説明可能AI', 'AI規制'],
    examples: ['採用選考での公平性', '医療診断の透明性', '金融審査の説明責任', 'プライバシー保護']
  },
  {
    id: 'computer-vision',
    term: 'コンピュータビジョン',
    reading: 'コンピュータビジョン',
    category: 'AI・機械学習',
    definition: 'コンピューターが画像や動画から情報を抽出・理解する技術分野。画像認識、物体検出、顔認識などが含まれる。',
    details: '深層学習の発展により精度が大幅に向上し、自動運転、医療診断、製造業の品質管理など幅広い分野で実用化されています。',
    relatedTerms: ['画像認識', '物体検出', '深層学習', 'CNN'],
    examples: ['顔認識システム', '自動運転車の画像解析', '医療画像診断', '製品の品質検査']
  },
  {
    id: 'voice-recognition',
    term: '音声認識',
    reading: 'おんせいにんしき',
    category: 'AI・機械学習',
    definition: '人間の話した言葉をコンピューターが理解し、テキストに変換する技術。',
    details: 'スマートスピーカー、音声アシスタント、会議の議事録自動作成などで活用されています。ノイズ環境での精度向上や多言語対応が課題です。',
    relatedTerms: ['自然言語処理', '音声合成', 'スマートスピーカー', '音声アシスタント'],
    examples: ['Siri、Alexa', '会議の文字起こし', 'コールセンターの応対記録', '音声検索']
  },
  {
    id: 'recommendation-system',
    term: 'レコメンドシステム',
    reading: 'レコメンドシステム',
    category: 'AI・機械学習',
    definition: 'ユーザーの過去の行動や嗜好を分析し、興味を持ちそうな商品やコンテンツを推薦するシステム。',
    details: 'ECサイト、動画配信サービス、音楽ストリーミングなどで利用され、ユーザー体験向上と売上アップに貢献します。協調フィルタリング、内容ベース、ハイブリッド手法があります。',
    relatedTerms: ['協調フィルタリング', '機械学習', 'パーソナライゼーション', 'クリック率'],
    examples: ['Amazonの「この商品を見た人はこれも見ています」', 'NetflixやYouTubeの動画推薦', 'Spotifyの音楽レコメンド']
  },
  {
    id: 'anomaly-detection',
    term: '異常検知',
    reading: 'いじょうけんち',
    category: 'AI・機械学習',
    definition: '正常なパターンから外れた異常なデータや行動を自動的に発見する技術。',
    details: 'ネットワークセキュリティ、製造業の品質管理、金融の不正検出、システム監視など、幅広い分野で応用されています。教師なし学習手法が主に使用されます。',
    relatedTerms: ['教師なし学習', '統計的検定', 'セキュリティ', '品質管理'],
    examples: ['クレジットカード不正利用検出', '工場設備の故障予兆', 'ネットワーク侵入検知', 'システム性能異常']
  },
  {
    id: 'supervised-learning',
    term: '教師あり学習',
    reading: 'きょうしありがくしゅう',
    category: 'AI・機械学習',
    definition: '正解ラベル付きのデータを使ってモデルを訓練する機械学習手法。分類と回帰に分けられる。',
    details: '入力データと正解データのペアを大量に用意し、パターンを学習させます。スパムメール検知、画像分類、価格予測など明確な正解があるタスクに適用されます。',
    relatedTerms: ['教師なし学習', '分類', '回帰', '訓練データ'],
    examples: ['メール分類（スパム/正常）', '画像の物体識別', '住宅価格予測', '病気診断支援']
  },
  {
    id: 'unsupervised-learning',
    term: '教師なし学習',
    reading: 'きょうしなしがくしゅう',
    category: 'AI・機械学習',
    definition: '正解ラベルのないデータからパターンや構造を発見する機械学習手法。',
    details: 'データの中に隠れている規則性や特徴を自動的に見つけ出します。クラスタリング、次元削減、異常検知などの手法があり、データ分析の初期段階でよく使用されます。',
    relatedTerms: ['クラスタリング', '次元削減', '異常検知', 'PCA'],
    examples: ['顧客セグメンテーション', 'マーケットバスケット分析', '遺伝子解析', 'Web行動分析']
  },
  {
    id: 'reinforcement-learning',
    term: '強化学習',
    reading: 'きょうかがくしゅう',
    category: 'AI・機械学習',
    definition: '環境との相互作用を通じて、報酬を最大化する行動を学習する機械学習手法。',
    details: '試行錯誤を繰り返しながら最適な行動戦略を学習します。ゲームAI、ロボット制御、自動運転、金融取引など、連続的な意思決定が必要な分野で活用されています。',
    relatedTerms: ['報酬学習', 'Q学習', 'エージェント', '方策'],
    examples: ['囲碁・チェスAI', 'ロボットの歩行学習', 'ゲームキャラクターのAI', '投資戦略最適化']
  },
  {
    id: 'data-mining',
    term: 'データマイニング',
    reading: 'データマイニング',
    category: 'AI・機械学習',
    definition: '大量のデータから有用なパターンや知識を発見する技術・プロセス。',
    details: '統計学、機械学習、データベース技術を組み合わせて、ビジネスに役立つ洞察を抽出します。マーケティング分析、リスク管理、品質改善など企業の意思決定支援に活用されます。',
    relatedTerms: ['ビッグデータ', '機械学習', 'データ分析', 'KDD'],
    examples: ['購買パターン分析', '顧客離反予測', 'クロスセル提案', 'リスク評価モデル']
  },
  {
    id: 'big-data',
    term: 'ビッグデータ',
    reading: 'ビッグデータ',
    category: 'AI・機械学習',
    definition: '従来のデータベース管理ツールでは処理困難な巨大で複雑なデータセット。3V（Volume、Velocity、Variety）で特徴づけられる。',
    details: 'Volume（量）、Velocity（速度）、Variety（多様性）の3つの特徴があり、近年はVeracity（正確性）、Value（価値）を加えた5Vで定義されることも多いです。',
    relatedTerms: ['データサイエンス', 'Hadoop', 'Spark', 'NoSQL'],
    examples: ['SNSの投稿データ', 'IoTセンサーデータ', 'Webアクセスログ', '金融取引記録']
  },
  {
    id: 'data-science',
    term: 'データサイエンス',
    reading: 'データサイエンス',
    category: 'AI・機械学習',
    definition: '統計学、機械学習、プログラミング、ドメイン知識を組み合わせてデータから価値を抽出する学際的分野。',
    details: 'データの収集、前処理、分析、可視化、モデル構築、結果の解釈まで一連のプロセスを担います。ビジネス課題の解決と意思決定支援が主な目的です。',
    relatedTerms: ['データアナリスト', '機械学習', 'ビッグデータ', 'Python'],
    examples: ['売上予測モデル', 'カスタマーセグメンテーション', 'A/Bテスト分析', '需要予測システム']
  },
  {
    id: 'feature-engineering',
    term: '特徴量エンジニアリング',
    reading: 'とくちょうりょうエンジニアリング',
    category: 'AI・機械学習',
    definition: '機械学習の性能向上のために、生データから有用な特徴量（特徴量）を作成・選択・変換するプロセス。',
    details: 'データの前処理、新しい変数の作成、不要な変数の除去、カテゴリ変数の数値化など、モデルの予測精度に大きく影響する重要な工程です。',
    relatedTerms: ['前処理', '特徴選択', 'データクリーニング', 'モデル精度'],
    examples: ['カテゴリ変数のワンホットエンコーディング', '欠損値の補完', '外れ値の処理', '新しい特徴量の組み合わせ作成']
  },
  {
    id: 'model-evaluation',
    term: 'モデル評価',
    reading: 'モデルひょうか',
    category: 'AI・機械学習',
    definition: '機械学習モデルの性能や品質を測定・評価する手法。適切な指標選択と評価方法が重要。',
    details: '分類問題では精度、適合率、再現率、F値、AUCなど、回帰問題ではRMSE、MAE、R²などの指標を使用します。交差検証や holdout法で評価の信頼性を高めます。',
    relatedTerms: ['交差検証', '過学習', '精度', 'AUC'],
    examples: ['分類精度の測定', '予測誤差の計算', 'ROC曲線の分析', 'モデル間の性能比較']
  },
  {
    id: 'overfitting',
    term: '過学習（オーバーフィッティング）',
    reading: 'かがくしゅう',
    category: 'AI・機械学習',
    definition: '機械学習モデルが訓練データに過度に適応し、新しいデータに対する汎化性能が低下する現象。',
    details: 'モデルが訓練データの細かなノイズまで学習してしまい、未知データでの予測精度が著しく低下します。正則化、ドロップアウト、早期停止などの手法で防止できます。',
    relatedTerms: ['汎化性能', '正則化', 'バイアス-バリアンス', '交差検証'],
    examples: ['訓練精度99%、テスト精度60%の状態', 'モデルの複雑度が高すぎる場合', '訓練データが少なすぎる場合']
  },
  {
    id: 'cross-validation',
    term: '交差検証',
    reading: 'こうさけんしょう',
    category: 'AI・機械学習',
    definition: 'データを複数に分割し、訓練とテストを繰り返してモデルの汎化性能を評価する統計的手法。',
    details: 'k-fold交差検証が一般的で、データをk個に分割し、k-1個で訓練、1個でテストを行い、これをk回繰り返します。限られたデータでも信頼性の高い評価が可能です。',
    relatedTerms: ['k-fold', '汎化性能', 'ホールドアウト法', 'モデル選択'],
    examples: ['5-fold交差検証', '10-fold交差検証', 'Leave-One-Out交差検証', '時系列データの交差検証']
  },

  // SEO・Webマーケティングカテゴリー
  {
    id: 'seo',
    term: 'SEO',
    reading: 'エスイーオー',
    category: 'SEO・Webマーケティング',
    definition: 'Search Engine Optimization（検索エンジン最適化）の略。GoogleやYahoo!などの検索エンジンでWebサイトが上位表示されるよう最適化すること。',
    details: 'キーワード選定、コンテンツ最適化、内部リンク構造、被リンク獲得など多岐にわたる施策があります。AI検索時代においてもSEOの基礎は重要ですが、LLMO対応も併せて必要です。',
    relatedTerms: ['LLMO', 'キーワード', '被リンク', 'コンテンツマーケティング'],
    examples: ['タイトルタグの最適化', 'メタディスクリプションの設定', '内部リンク構造の改善']
  },
  {
    id: 'content-marketing',
    term: 'コンテンツマーケティング',
    reading: 'コンテンツマーケティング',
    category: 'SEO・Webマーケティング',
    definition: '価値あるコンテンツを作成・配信することで、見込み客を引き付け、関係性を構築し、最終的に収益性の高い顧客行動を促すマーケティング手法。',
    details: 'ブログ記事、動画、インフォグラフィック、eBookなど様々な形式でコンテンツを提供します。SEOと組み合わせることで、長期的な集客効果が期待できます。',
    relatedTerms: ['SEO', 'ブログマーケティング', 'インバウンドマーケティング', 'オウンドメディア'],
    examples: ['業界知識を解説するブログ記事', '商品の使い方動画', '業界レポートのダウンロード資料']
  },
  {
    id: 'sem',
    term: 'SEM',
    reading: 'エスイーエム',
    category: 'SEO・Webマーケティング',
    definition: 'Search Engine Marketing（検索エンジンマーケティング）の略。検索エンジンを活用した総合的なマーケティング活動。',
    details: 'SEO（検索エンジン最適化）とリスティング広告（検索連動型広告）を組み合わせた手法です。検索結果での露出を最大化し、質の高いトラフィックを獲得します。',
    relatedTerms: ['SEO', 'リスティング広告', 'PPC', 'Google Ads'],
    examples: ['Google検索での上位表示', 'Yahoo!検索広告', 'Bing広告', 'ショッピング広告']
  },
  {
    id: 'ppc',
    term: 'PPC',
    reading: 'ピーピーシー',
    category: 'SEO・Webマーケティング',
    definition: 'Pay Per Click（クリック課金）の略。広告がクリックされるたびに料金が発生する広告モデル。',
    details: 'Google AdsやYahoo!広告などで採用されている料金体系で、表示回数ではなく実際のクリック数に応じて課金されます。費用対効果を測定しやすいのが特徴です。',
    relatedTerms: ['Google Ads', 'CPC', 'リスティング広告', '品質スコア'],
    examples: ['Google検索広告', 'Yahoo!検索広告', 'Facebook広告', 'Instagram広告']
  },
  {
    id: 'ctr',
    term: 'CTR（クリック率）',
    reading: 'シーティーアール',
    category: 'SEO・Webマーケティング',
    definition: 'Click Through Rate の略。広告やWebページの表示回数に対するクリック数の割合。',
    details: '「クリック数 ÷ 表示回数 × 100」で算出されます。広告の魅力度やSEO対策の効果を測る重要な指標で、一般的に2-5%程度が平均的です。',
    relatedTerms: ['インプレッション', 'CPC', '品質スコア', 'SERP'],
    examples: ['検索広告のクリック率', 'メール開封後のクリック率', 'バナー広告の反応率', 'SNS投稿のエンゲージメント率']
  },
  {
    id: 'impression',
    term: 'インプレッション',
    reading: 'インプレッション',
    category: 'SEO・Webマーケティング',
    definition: '広告やWebページがユーザーの画面に表示された回数。表示回数とも呼ばれる。',
    details: '実際にクリックされたかどうかに関係なく、画面に表示された回数をカウントします。CTRやCPMの計算基準として重要な指標です。',
    relatedTerms: ['CTR', 'CPM', 'リーチ', 'フリークエンシー'],
    examples: ['Google検索での表示回数', 'バナー広告の表示数', 'SNS投稿のリーチ数', 'YouTube動画の再生回数']
  },
  {
    id: 'serp',
    term: 'SERP',
    reading: 'サープ',
    category: 'SEO・Webマーケティング',
    definition: 'Search Engine Results Page（検索結果ページ）の略。ユーザーが検索エンジンで検索した際に表示されるページ。',
    details: '自然検索結果、広告、強調スニペット、ローカル検索結果などが含まれます。SERPでの順位や表示形式がクリック率に大きく影響します。',
    relatedTerms: ['SEO', '検索順位', '強調スニペット', 'ローカルSEO'],
    examples: ['Google検索結果', 'Yahoo!検索結果', 'Bing検索結果', 'モバイル検索結果']
  },
  {
    id: 'meta-description',
    term: 'メタディスクリプション',
    reading: 'メタディスクリプション',
    category: 'SEO・Webマーケティング',
    definition: 'WebページのHTMLのmeta要素で記述する、ページ内容の要約文。検索結果に表示されるスニペットとして使用される。',
    details: '160文字程度でページの魅力的な要約を記述し、検索ユーザーのクリックを促します。直接的なSEO効果はないものの、CTR向上に重要です。',
    relatedTerms: ['タイトルタグ', 'SEO', 'スニペット', 'CTR'],
    examples: ['商品ページの説明文', 'ブログ記事の要約', 'サービス紹介の概要', '会社概要ページの説明']
  },
  {
    id: 'title-tag',
    term: 'タイトルタグ',
    reading: 'タイトルタグ',
    category: 'SEO・Webマーケティング',
    definition: 'HTMLのtitle要素で記述するページのタイトル。検索結果やブラウザのタブに表示される。',
    details: 'SEOにおいて最も重要な要素の一つで、30-35文字程度でキーワードを含むわかりやすいタイトルを設定します。検索順位に直接影響します。',
    relatedTerms: ['SEO', 'メタディスクリプション', 'H1タグ', 'キーワード'],
    examples: ['「LLMO対策なら合同会社GYAKUTEN」', '「中小企業のDX推進支援サービス」', '「SEO・Web制作の専門企業」']
  },
  {
    id: 'h1-tag',
    term: 'H1タグ',
    reading: 'エイチワンタグ',
    category: 'SEO・Webマーケティング',
    definition: 'HTMLの見出しタグの一つで、ページの主要な見出しを表すタグ。最も重要な見出しに使用される。',
    details: 'ページ内容を端的に表す重要なSEO要素で、通常1ページに1つだけ使用します。タイトルタグとは異なる表現でキーワードを含めることが推奨されます。',
    relatedTerms: ['H2タグ', 'H3タグ', 'タイトルタグ', 'コンテンツ構造'],
    examples: ['「デジタルマーケティングの専門企業」', '「AI時代のSEO対策サービス」', '「中小企業向けDXソリューション」']
  },
  {
    id: 'alt-attribute',
    term: 'alt属性',
    reading: 'オルトぞくせい',
    category: 'SEO・Webマーケティング',
    definition: 'HTML画像タグ（img）の属性で、画像の代替テキストを指定する。画像が表示されない場合に代わりに表示される。',
    details: '視覚障害者向けのスクリーンリーダーや、画像検索SEOにおいて重要な要素です。画像の内容を具体的に説明するテキストを設定します。',
    relatedTerms: ['画像SEO', 'アクセシビリティ', 'HTML', 'スクリーンリーダー'],
    examples: ['alt="合同会社GYAKUTENのロゴ"', 'alt="LLMO対策の効果を示すグラフ"', 'alt="代表取締役の写真"']
  },
  {
    id: 'canonical-url',
    term: 'カノニカルURL',
    reading: 'カノニカルユーアールエル',
    category: 'SEO・Webマーケティング',
    definition: '重複コンテンツがある場合に、検索エンジンに「正規版」として認識させたいページのURLを指定する仕組み。',
    details: 'rel="canonical"タグを使用して、類似または重複するページの中で、どれを主要なページとして扱うかを検索エンジンに伝えます。SEO評価の分散を防ぎます。',
    relatedTerms: ['重複コンテンツ', 'SEO', 'HTML', 'インデックス'],
    examples: ['商品ページの複数URL統一', 'HTTPとHTTPS版の統一', 'パラメータ付きURLの正規化']
  },
  {
    id: 'internal-link',
    term: '内部リンク',
    reading: 'ないぶリンク',
    category: 'SEO・Webマーケティング',
    definition: '同一ドメイン内のページ同士を繋ぐリンク。サイト内の他のページへのリンクを指す。',
    details: 'サイト構造を明確にし、ユーザーの回遊性を高めるとともに、SEO効果も期待できます。重要なページに多くの内部リンクを集めることで、そのページの重要性を検索エンジンに伝えられます。',
    relatedTerms: ['外部リンク', 'アンカーテキスト', 'サイト構造', 'ページランク'],
    examples: ['関連記事リンク', 'パンくずナビゲーション', 'サイトメニュー', 'フッターリンク']
  },
  {
    id: 'external-link',
    term: '外部リンク',
    reading: 'がいぶリンク',
    category: 'SEO・Webマーケティング',
    definition: '他のドメインのWebサイトへのリンク。自サイトから他サイトに向けるリンクを指す。',
    details: '適切な外部リンクは、ユーザーに価値ある情報を提供し、サイトの信頼性を高めます。ただし、リンク先の品質やrel属性の設定に注意が必要です。',
    relatedTerms: ['内部リンク', '被リンク', 'nofollow', 'リンクジュース'],
    examples: ['参考資料へのリンク', '提携企業サイトへのリンク', '公式情報源への引用リンク']
  },
  {
    id: 'backlink',
    term: '被リンク（バックリンク）',
    reading: 'ひリンク',
    category: 'SEO・Webマーケティング',
    definition: '他のWebサイトから自サイトに向けられたリンク。外部サイトからの被リンクとも呼ばれる。',
    details: '検索エンジンは被リンクをサイトの人気や権威性を示す重要な指標として評価します。質の高い被リンクほど、SEO効果が高くなります。',
    relatedTerms: ['ドメインオーソリティ', 'リンクビルディング', 'アンカーテキスト', 'nofollow'],
    examples: ['他社ブログからの紹介リンク', 'ニュースサイトでの言及', '業界メディアでの掲載']
  },
  {
    id: 'domain-authority',
    term: 'ドメインオーソリティ',
    reading: 'ドメインオーソリティ',
    category: 'SEO・Webマーケティング',
    definition: 'ドメイン全体の検索エンジンでの権威性や信頼度を数値化した指標。主にMozが提供する指標として知られる。',
    details: '1-100のスコアで表され、被リンクの質と量、ドメインの年数、コンテンツの質などが影響します。高いドメインオーソリティは上位表示に有利です。',
    relatedTerms: ['ページオーソリティ', '被リンク', 'Moz', 'SEO指標'],
    examples: ['大手ニュースサイト（DA90+）', '政府機関サイト（DA95+）', '新興企業サイト（DA20-40）']
  },
  {
    id: 'local-seo',
    term: 'ローカルSEO',
    reading: 'ローカルエスイーオー',
    category: 'SEO・Webマーケティング',
    definition: '特定の地域や場所に関連する検索において上位表示を目指すSEO対策。地域密着型ビジネスに重要。',
    details: 'Googleマイビジネス（現：Googleビジネスプロフィール）の最適化、地域名を含むキーワード対策、地域情報の充実などが含まれます。「渋谷 美容院」のような検索で効果を発揮します。',
    relatedTerms: ['Googleビジネスプロフィール', 'マップSEO', '地域キーワード', 'レビュー管理'],
    examples: ['「地域名 + サービス名」での上位表示', 'Googleマップでの表示', '口コミ評価の向上', 'NAP情報の統一']
  },
  {
    id: 'technical-seo',
    term: 'テクニカルSEO',
    reading: 'テクニカルエスイーオー',
    category: 'SEO・Webマーケティング',
    definition: 'Webサイトの技術的側面を最適化するSEO対策。検索エンジンがサイトを正しく理解・評価できるようにする。',
    details: 'サイト速度、モバイル対応、構造化データ、XML サイトマップ、robots.txt、SSL化などの技術的な要素を改善します。コンテンツSEOとは異なる専門領域です。',
    relatedTerms: ['Core Web Vitals', '構造化データ', 'サイト速度', 'モバイルファースト'],
    examples: ['ページ速度最適化', 'モバイル表示改善', 'HTTPS化', 'XMLサイトマップ設定']
  },
  {
    id: 'core-web-vitals',
    term: 'Core Web Vitals',
    reading: 'コアウェブバイタルズ',
    category: 'SEO・Webマーケティング',
    definition: 'Googleが重視するWebサイトのユーザー体験を測定する3つの指標。LCP、FID、CLSで構成される。',
    details: 'LCP（最大コンテンツフルペイント）は読み込み性能、FID（初回入力遅延）は応答性、CLS（累積レイアウトシフト）は表示安定性を測定します。2021年からSEOランキング要素に含まれています。',
    relatedTerms: ['ページスピード', 'UX', 'LCP', 'FID', 'CLS'],
    examples: ['画像の最適化でLCP改善', 'JavaScriptの軽量化でFID改善', 'レイアウト固定でCLS改善']
  },
  {
    id: 'structured-data',
    term: '構造化データ',
    reading: 'こうぞうかデータ',
    category: 'SEO・Webマーケティング',
    definition: '検索エンジンがWebページの内容を理解しやすくするために、決められた形式で記述するデータ。',
    details: 'Schema.orgの語彙を使用し、JSON-LD、Microdata、RDFaなどの形式で実装します。リッチスニペット表示や音声検索対応に効果的です。',
    relatedTerms: ['Schema.org', 'リッチスニペット', 'JSON-LD', 'セマンティックWeb'],
    examples: ['商品情報のマークアップ', 'レビュー評価の表示', 'パンくずリストの構造化', 'FAQ構造化']
  },
  {
    id: 'rich-snippets',
    term: 'リッチスニペット',
    reading: 'リッチスニペット',
    category: 'SEO・Webマーケティング',
    definition: '検索結果に表示される通常のタイトル・説明文に加えて、星評価、価格、画像などの追加情報が表示される拡張された検索結果。',
    details: '構造化データをWebページに実装することで表示されます。CTRの向上と、ユーザーにとって有用な情報提供が可能になります。',
    relatedTerms: ['構造化データ', 'Schema.org', 'SERP', 'CTR向上'],
    examples: ['商品の星評価表示', 'レシピの調理時間表示', 'イベント情報の日時表示', 'FAQ情報の直接表示']
  },
  {
    id: 'featured-snippet',
    term: '強調スニペット',
    reading: 'きょうちょうスニペット',
    category: 'SEO・Webマーケティング',
    definition: '検索結果の最上位に表示される、質問に対する回答を抜粋して表示する枠。「位置0」とも呼ばれる。',
    details: 'リスト、表、段落形式で表示され、音声検索の回答としても利用されます。「ポジションゼロ」獲得により大幅なクリック率向上が期待できます。',
    relatedTerms: ['音声検索', 'ポジションゼロ', 'SERP', '質問キーワード'],
    examples: ['「〜とは」の定義回答', 'ステップバイステップのリスト', '比較表の表示', 'FAQ回答の抜粋']
  },
  {
    id: 'mobile-first-indexing',
    term: 'モバイルファーストインデックス',
    reading: 'モバイルファーストインデックス',
    category: 'SEO・Webマーケティング',
    definition: 'Googleが主にモバイル版のWebページを基準にしてインデックス登録やランキング決定を行う仕組み。',
    details: '2018年から段階的に導入され、現在はすべてのサイトが対象です。モバイル版でのコンテンツ、構造化データ、メタデータが重要になります。',
    relatedTerms: ['レスポンシブデザイン', 'モバイル最適化', 'AMP', 'ページスピード'],
    examples: ['モバイル版でのフル機能提供', 'タップ可能な要素の適切配置', 'モバイル表示速度の最適化']
  },
  {
    id: 'e-a-t',
    term: 'E-A-T',
    reading: 'イーエーティー',
    category: 'SEO・Webマーケティング',
    definition: 'Expertise（専門性）、Authoritativeness（権威性）、Trustworthiness（信頼性）の略。Googleの品質評価ガイドラインの重要な概念。',
    details: '特にYMYL（Your Money or Your Life）分野において重要視される評価基準です。専門的な知識、業界での権威、情報の信頼性がサイトの評価に大きく影響します。',
    relatedTerms: ['YMYL', '品質評価', '専門性', '権威性'],
    examples: ['専門家による記事執筆', '権威あるサイトからの被リンク', '運営者情報の明示', '正確な情報の提供']
  },
  {
    id: 'ymyl',
    term: 'YMYL',
    reading: 'ワイエムワイエル',
    category: 'SEO・Webマーケティング',
    definition: 'Your Money or Your Life の略。人の健康、安全、経済的安定、社会の福利に影響を与える可能性のあるトピック。',
    details: '医療、法律、金融、ニュース、政治などの分野が該当し、Googleはこれらのトピックに対してより厳しい品質基準を適用します。E-A-Tが特に重要です。',
    relatedTerms: ['E-A-T', '品質ガイドライン', '専門性', '医療SEO'],
    examples: ['医療・健康情報', '投資・金融アドバイス', '法律相談', '税務情報', '育児・安全情報']
  },
  {
    id: 'anchor-text',
    term: 'アンカーテキスト',
    reading: 'アンカーテキスト',
    category: 'SEO・Webマーケティング',
    definition: 'リンクに設定されているクリック可能なテキスト部分。リンクテキストとも呼ばれる。',
    details: '内部リンクと外部リンクの両方において、リンク先ページの内容を適切に表現するテキストを設定することがSEO上重要です。キーワードを含めることで関連性を高められます。',
    relatedTerms: ['内部リンク', '外部リンク', 'リンク最適化', 'キーワード密度'],
    examples: ['「SEO対策サービス詳細はこちら」', '「LLMO診断について」', '「料金表を確認する」']
  },
  {
    id: 'robots-txt',
    term: 'robots.txt',
    reading: 'ロボッツテキスト',
    category: 'SEO・Webマーケティング',
    definition: '検索エンジンのクローラーに対して、サイトのどの部分をクロールしてよいかを指示するファイル。',
    details: 'ウェブサイトのルートディレクトリに設置し、クロールを許可しないページやディレクトリを指定できます。サイトマップの場所を記載することも可能です。',
    relatedTerms: ['クローラー', 'サイトマップ', 'インデックス制御', 'noindex'],
    examples: ['管理画面のクロール禁止', '重複ページの除外', 'サイトマップの場所指定', 'テスト環境の非表示']
  },
  {
    id: 'xml-sitemap',
    term: 'XMLサイトマップ',
    reading: 'エックスエムエルサイトマップ',
    category: 'SEO・Webマーケティング',
    definition: 'Webサイトの全ページのURLと更新情報を検索エンジンに伝えるXML形式のファイル。',
    details: '各ページの重要度、更新頻度、最終更新日を記載し、検索エンジンの効率的なクロールを支援します。Google Search Consoleに提出することでインデックス状況を監視できます。',
    relatedTerms: ['Google Search Console', 'インデックス', 'クローリング', 'robots.txt'],
    examples: ['全商品ページのURL一覧', 'ブログ記事の更新情報', '多言語サイトのhreflang指定', '画像サイトマップ']
  },
  {
    id: 'google-search-console',
    term: 'Google Search Console',
    reading: 'グーグルサーチコンソール',
    category: 'SEO・Webマーケティング',
    definition: 'Googleが無料で提供するWebマスター向けツール。検索パフォーマンス、インデックス状況、技術的問題を監視できる。',
    details: '検索クエリ、表示回数、クリック数、掲載順位などのデータを確認できます。サイトマップの送信、URLの検査、モバイルユーザビリティのチェックなど、SEO運用に必須のツールです。',
    relatedTerms: ['検索パフォーマンス', 'インデックス', 'クロール', 'サイトマップ'],
    examples: ['検索クエリの分析', 'インデックス登録状況の確認', 'Core Web Vitalsの監視', 'ペナルティの通知受信']
  },
  {
    id: 'keyword-research',
    term: 'キーワード調査',
    reading: 'キーワードちょうさ',
    category: 'SEO・Webマーケティング',
    definition: 'ターゲットユーザーが検索エンジンで使用するキーワードを調査・分析し、SEO戦略に活用する手法。',
    details: '検索ボリューム、競合性、検索意図を分析し、効果的なキーワード戦略を立案します。Google キーワードプランナーやUbersuggestなどのツールを活用します。',
    relatedTerms: ['検索ボリューム', 'ロングテールキーワード', '検索意図', 'キーワード難易度'],
    examples: ['月間検索数の調査', '競合サイトのキーワード分析', '関連キーワードの発見', '季節性キーワードの特定']
  },
  {
    id: 'long-tail-keywords',
    term: 'ロングテールキーワード',
    reading: 'ロングテールキーワード',
    category: 'SEO・Webマーケティング',
    definition: '3-4語以上の具体的で検索ボリュームは少ないが、コンバージョン率が高いキーワード。',
    details: '「SEO」よりも「中小企業 SEO対策 費用」のような具体的なキーワードを指します。競合が少なく、ユーザーの検索意図が明確なため、質の高いトラフィックを獲得できます。',
    relatedTerms: ['検索意図', 'コンバージョン', 'ニッチキーワード', 'テールワード'],
    examples: ['「東京 Webサイト制作 格安」', '「WordPress セキュリティ対策 方法」', '「GA4 設定 代行 料金」']
  },
  {
    id: 'search-intent',
    term: '検索意図',
    reading: 'けんさくいと',
    category: 'SEO・Webマーケティング',
    definition: 'ユーザーが検索エンジンでキーワードを入力する際の目的や意図。4つのタイプに分類される。',
    details: 'Informational（情報収集）、Navigational（特定サイト訪問）、Commercial（商品調査）、Transactional（取引実行）に分けられます。検索意図に合致したコンテンツ作成が重要です。',
    relatedTerms: ['キーワード調査', 'コンテンツ戦略', 'ユーザー体験', 'SERP'],
    examples: ['「SEOとは」（情報収集）', '「Google Analytics」（特定サイト）', '「SEO対策 比較」（商品調査）', '「SEO対策 申込み」（取引実行）']
  },
  {
    id: 'content-cluster',
    term: 'コンテンツクラスター',
    reading: 'コンテンツクラスター',
    category: 'SEO・Webマーケティング',
    definition: '1つのメイントピック（ピラーページ）を中心に、関連する複数のサブトピック（クラスターページ）を相互リンクで結ぶコンテンツ戦略。',
    details: '「SEO対策」をピラーページとし、「キーワード選定」「内部リンク」「被リンク獲得」などのクラスターページを作成し、内部リンクで結びます。トピック権威性の向上が期待できます。',
    relatedTerms: ['ピラーページ', '内部リンク', 'トピッククラスター', 'サイト構造'],
    examples: ['デジタルマーケティング総合ページ + SEO、SNS、広告の個別ページ', 'Web制作サービス + WordPress、EC、LP制作ページ']
  },
  {
    id: 'pillar-page',
    term: 'ピラーページ',
    reading: 'ピラーページ',
    category: 'SEO・Webマーケティング',
    definition: 'コンテンツクラスター戦略における中心となる包括的なページ。特定のトピックについて幅広く詳細に解説する。',
    details: '通常3000-5000語程度の長文コンテンツで、そのトピックについて網羅的に説明します。複数のクラスターページへのリンクを含み、サイト内でのハブ的役割を果たします。',
    relatedTerms: ['コンテンツクラスター', '長文コンテンツ', 'トピック権威性', '包括的コンテンツ'],
    examples: ['「デジタルマーケティング完全ガイド」', '「中小企業のDX推進方法」', '「SEO対策の全て」']
  },

  // DX・システム開発カテゴリー
  {
    id: 'dx',
    term: 'DX',
    reading: 'ディーエックス',
    category: 'DX・システム開発',
    definition: 'Digital Transformation（デジタル変革）の略。デジタル技術を活用して、ビジネスモデルや組織文化を変革し、競争優位性を確立すること。',
    details: '単なるIT化ではなく、デジタル技術を活用した抜本的な業務プロセスの見直しや新たなビジネスモデルの創造を指します。中小企業においても経営戦略の重要な要素となっています。',
    relatedTerms: ['IT化', 'デジタル化', 'システム開発', 'クラウド'],
    examples: ['紙ベース業務の電子化', 'AIチャットボットの導入', 'データ分析による意思決定の自動化']
  },
  {
    id: 'saas',
    term: 'SaaS',
    reading: 'サース',
    category: 'DX・システム開発',
    definition: 'Software as a Service（サービスとしてのソフトウェア）の略。インターネット経由でソフトウェアを利用するクラウドサービスの形態。',
    details: '従来のパッケージソフトウェア購入と異なり、月額課金制でソフトウェアを利用できます。初期投資を抑えつつ、常に最新機能を利用できるため、中小企業での導入が進んでいます。',
    relatedTerms: ['クラウド', 'サブスクリプション', 'ASP', 'PaaS'],
    examples: ['Salesforce', 'Microsoft 365', 'freee', 'サイボウズ']
  },
  {
    id: 'cloud-computing',
    term: 'クラウドコンピューティング',
    reading: 'クラウドコンピューティング',
    category: 'DX・システム開発',
    definition: 'インターネット経由でサーバー、ストレージ、データベース、ソフトウェアなどのITリソースを利用するコンピューティングサービス。',
    details: '自社でサーバーを保有・運用する必要がなく、必要な時に必要な分だけリソースを利用できます。コスト削減、拡張性、運用負荷軽減などのメリットがあります。',
    relatedTerms: ['AWS', 'Azure', 'Google Cloud', 'SaaS'],
    examples: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform', 'オンプレミスからの移行']
  },
  {
    id: 'paas',
    term: 'PaaS',
    reading: 'パース',
    category: 'DX・システム開発',
    definition: 'Platform as a Service（サービスとしてのプラットフォーム）の略。アプリケーション開発・実行環境をクラウドサービスとして提供する形態。',
    details: 'OS、ミドルウェア、開発ツールなどが統合されたプラットフォームを提供し、開発者はアプリケーションの開発に集中できます。インフラ管理が不要で、迅速な開発が可能です。',
    relatedTerms: ['SaaS', 'IaaS', 'Heroku', 'Firebase'],
    examples: ['Google App Engine', 'Heroku', 'Azure App Service', 'Firebase']
  },
  {
    id: 'iaas',
    term: 'IaaS',
    reading: 'イアース',
    category: 'DX・システム開発',
    definition: 'Infrastructure as a Service（サービスとしてのインフラ）の略。仮想サーバー、ストレージ、ネットワークなどのITインフラをクラウドサービスとして提供する形態。',
    details: '物理的なハードウェアを仮想化し、インターネット経由で利用できるサービスです。必要な時に必要なスペックのサーバーを即座に利用開始できる柔軟性があります。',
    relatedTerms: ['PaaS', 'SaaS', '仮想化', 'AWS EC2'],
    examples: ['Amazon EC2', 'Azure Virtual Machines', 'Google Compute Engine', 'さくらのクラウド']
  },
  {
    id: 'api',
    term: 'API',
    reading: 'エーピーアイ',
    category: 'DX・システム開発',
    definition: 'Application Programming Interface（アプリケーション プログラミング インターフェース）の略。ソフトウェア同士が情報をやり取りするための仕組み。',
    details: '異なるシステムやアプリケーション間でデータを連携させるための標準的な手法です。REST API、GraphQL APIなど様々な形式があり、現代のシステム開発には欠かせない技術です。',
    relatedTerms: ['REST', 'GraphQL', 'JSON', 'Web API'],
    examples: ['Google Maps API', 'Twitter API', '決済API', '在庫管理システム連携']
  },
  {
    id: 'microservices',
    term: 'マイクロサービス',
    reading: 'マイクロサービス',
    category: 'DX・システム開発',
    definition: '大きなアプリケーションを小さく独立した複数のサービスに分割するアーキテクチャパターン。各サービスが独立してデプロイ・運用される。',
    details: '従来のモノリシック（一枚岩）なアプリケーションとは対照的で、機能ごとに分離されたサービスとして構築されます。スケーラビリティと保守性の向上が期待できます。',
    relatedTerms: ['モノリス', 'API', 'コンテナ', 'DevOps'],
    examples: ['ユーザー管理サービス', '決済処理サービス', '商品カタログサービス', '通知サービス']
  },
  {
    id: 'docker',
    term: 'Docker',
    reading: 'ドッカー',
    category: 'DX・システム開発',
    definition: 'アプリケーションとその実行環境をコンテナという単位でパッケージ化し、どこでも同じように動作させることができるプラットフォーム。',
    details: '「コンテナ型仮想化」技術の代表的なツールで、開発環境と本番環境の差異をなくし、デプロイの簡素化やスケーラビリティの向上を実現します。',
    relatedTerms: ['コンテナ', 'Kubernetes', 'DevOps', 'CI/CD'],
    examples: ['アプリケーションの本番デプロイ', '開発環境の統一', 'マイクロサービス運用', 'クラウド移行']
  },
  {
    id: 'kubernetes',
    term: 'Kubernetes',
    reading: 'クーベネイティス',
    category: 'DX・システム開発',
    definition: 'コンテナ化されたアプリケーションのデプロイ、スケーリング、管理を自動化するオーケストレーションプラットフォーム。',
    details: 'Googleが開発したコンテナオーケストレーションツールで、大規模なコンテナ環境の運用を効率化します。自動スケーリング、ロードバランシング、ヘルスチェックなどの機能があります。',
    relatedTerms: ['Docker', 'コンテナ', 'オーケストレーション', 'クラウドネイティブ'],
    examples: ['Webアプリケーションの自動スケーリング', 'マイクロサービスの管理', 'CI/CDパイプライン', 'クラウド環境での運用']
  },
  {
    id: 'devops',
    term: 'DevOps',
    reading: 'デブオプス',
    category: 'DX・システム開発',
    definition: 'Development（開発）とOperations（運用）を組み合わせた概念。開発チームと運用チームが連携し、ソフトウェアデリバリーを迅速化する手法。',
    details: '従来の開発と運用の分離を解消し、継続的インテグレーション、継続的デリバリーを通じて、高品質なソフトウェアを迅速にリリースする文化・プラクティスです。',
    relatedTerms: ['CI/CD', 'アジャイル', '継続的インテグレーション', 'Infrastructure as Code'],
    examples: ['自動テスト・デプロイ', 'インフラのコード管理', 'モニタリング・ログ管理', 'チーム間コラボレーション']
  },
  {
    id: 'ci-cd',
    term: 'CI/CD',
    reading: 'シーアイシーディー',
    category: 'DX・システム開発',
    definition: 'Continuous Integration/Continuous Deployment（継続的インテグレーション/継続的デプロイメント）の略。コード変更を自動的にテスト・ビルド・デプロイする手法。',
    details: '開発者がコードを変更するたびに自動的にテストが実行され、問題がなければ本番環境に自動デプロイされる仕組みです。品質向上とリリース速度の向上を同時に実現します。',
    relatedTerms: ['DevOps', '自動テスト', 'Jenkins', 'GitHub Actions'],
    examples: ['自動テスト実行', '本番環境への自動デプロイ', 'コード品質チェック', 'リリース作業の自動化']
  },
  {
    id: 'agile',
    term: 'アジャイル開発',
    reading: 'アジャイルかいはつ',
    category: 'DX・システム開発',
    definition: '短期間でのイテレーション（反復）を重ね、顧客との協働を通じて価値の高いソフトウェアを開発する手法。',
    details: '従来のウォーターフォール開発とは異なり、計画の変更を歓迎し、動くソフトウェアを短期間でリリースすることで、顧客のニーズに柔軟に対応します。',
    relatedTerms: ['スクラム', 'スプリント', 'DevOps', 'イテレーション'],
    examples: ['2週間スプリント', 'デイリースクラム', 'スプリントレビュー', 'レトロスペクティブ']
  },
  {
    id: 'scrum',
    term: 'スクラム',
    reading: 'スクラム',
    category: 'DX・システム開発',
    definition: 'アジャイル開発手法の一つ。チームが協力して複雑な製品開発を行うためのフレームワーク。',
    details: 'スプリントと呼ばれる短期間（通常2-4週間）の開発サイクルを繰り返し、スクラムマスター、プロダクトオーナー、開発チームの3つの役割で進行します。',
    relatedTerms: ['アジャイル', 'スプリント', 'スクラムマスター', 'プロダクトオーナー'],
    examples: ['スプリントプランニング', 'デイリースタンドアップ', 'スプリントレビュー', 'レトロスペクティブ']
  },
  {
    id: 'database',
    term: 'データベース',
    reading: 'データベース',
    category: 'DX・システム開発',
    definition: '大量のデータを体系的に格納・管理し、効率的な検索・更新を可能にするシステム。',
    details: '関係データベース（RDBMS）、NoSQLデータベース、分散データベースなど様々な種類があります。企業の基幹システムやWebアプリケーションの重要な構成要素です。',
    relatedTerms: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB'],
    examples: ['顧客情報管理', '在庫管理システム', 'ECサイトの商品データ', '売上データ分析']
  },
  {
    id: 'sql',
    term: 'SQL',
    reading: 'エスキューエル',
    category: 'DX・システム開発',
    definition: 'Structured Query Language（構造化問い合わせ言語）の略。関係データベース管理システム（RDBMS）でデータの操作や問い合わせを行うための言語。',
    details: 'データの検索（SELECT）、挿入（INSERT）、更新（UPDATE）、削除（DELETE）などの操作を、直感的な英語に近い構文で記述できます。',
    relatedTerms: ['データベース', 'RDBMS', 'MySQL', 'PostgreSQL'],
    examples: ['顧客データの検索', '売上データの集計', '在庫情報の更新', 'レポート作成']
  },
  {
    id: 'no-code-low-code',
    term: 'NoCode・ローコード',
    reading: 'ノーコードローコード',
    category: 'DX・システム開発',
    definition: 'プログラミングの知識がなくても（NoCode）、または最小限の知識で（ローコード）アプリケーションを開発できるプラットフォーム。',
    details: 'ドラッグ&ドロップやビジュアルな操作でシステム開発が可能で、業務部門でも簡単にアプリケーションを作成できます。開発速度の向上とIT人材不足の解決に寄与します。',
    relatedTerms: ['DX', 'システム開発', '業務効率化', 'RPA'],
    examples: ['kintone', 'Salesforce Lightning', 'Microsoft Power Platform', 'Bubble']
  },
  {
    id: 'rpa',
    term: 'RPA',
    reading: 'アールピーエー',
    category: 'DX・システム開発',
    definition: 'Robotic Process Automation（ロボティック プロセス オートメーション）の略。定型的な業務を自動化するソフトウェアロボット技術。',
    details: '人間が行っているルーティンワークをロボット（ソフトウェア）が代行し、24時間365日稼働できます。データ入力、転記作業、レポート作成などの業務を自動化できます。',
    relatedTerms: ['DX', '業務自動化', 'AI', 'ワークフロー'],
    examples: ['請求書処理の自動化', 'データ入力作業', '売上レポート作成', '在庫管理業務']
  },
  {
    id: 'blockchain',
    term: 'ブロックチェーン',
    reading: 'ブロックチェーン',
    category: 'DX・システム開発',
    definition: '取引データを暗号技術によって鎖状に連結し、改ざん困難な分散台帳を実現する技術。',
    details: 'データが複数のコンピューターに分散保存され、中央集権的な管理者なしに信頼性の高い記録を維持できます。仮想通貨以外にも、契約管理、トレーサビリティなど幅広い用途があります。',
    relatedTerms: ['仮想通貨', 'スマートコントラクト', '分散台帳', 'Web3'],
    examples: ['仮想通貨取引', 'サプライチェーン管理', 'デジタルアイデンティティ', '不動産取引記録']
  },

  // Web制作・デザインカテゴリー
  {
    id: 'responsive-design',
    term: 'レスポンシブデザイン',
    reading: 'レスポンシブデザイン',
    category: 'Web制作・デザイン',
    definition: 'PC、タブレット、スマートフォンなど、異なる画面サイズの端末に自動的に最適化表示されるWebデザイン手法。',
    details: '1つのHTMLファイルで全デバイスに対応できるため、制作・運用コストを削減できます。Googleのモバイルファーストインデックスにおいても重要な要素です。',
    relatedTerms: ['モバイルファースト', 'UX', 'CSS', 'ブレークポイント'],
    examples: ['画面サイズに応じたメニューの変化', 'タブレット表示時のレイアウト調整', 'スマホでの文字サイズ最適化']
  },
  {
    id: 'ui',
    term: 'UI（ユーザーインターフェース）',
    reading: 'ユーアイ',
    category: 'Web制作・デザイン',
    definition: 'User Interface（ユーザーインターフェース）の略。ユーザーとシステムとの接点となる画面や操作要素の総称。',
    details: 'ボタン、メニュー、フォーム、アイコンなど、ユーザーが直接操作する要素すべてを指します。使いやすく直感的なUIデザインは、サイトの成果に大きく影響します。',
    relatedTerms: ['UX', 'ユーザビリティ', 'インタラクションデザイン', 'ワイヤーフレーム'],
    examples: ['ナビゲーションメニュー', 'お問い合わせフォーム', '検索バー', 'CTAボタン']
  },
  {
    id: 'ux',
    term: 'UX（ユーザーエクスペリエンス）',
    reading: 'ユーエックス',
    category: 'Web制作・デザイン',
    definition: 'User Experience（ユーザーエクスペリエンス）の略。ユーザーが製品・サービスを利用する際の総合的な体験や満足度。',
    details: 'UIデザインだけでなく、サイトの読み込み速度、コンテンツの質、情報の見つけやすさ、利用後の感情まで含む包括的な概念です。',
    relatedTerms: ['UI', 'ユーザビリティ', 'カスタマージャーニー', 'ペルソナ'],
    examples: ['サイト閲覧の快適さ', '目的達成までの効率性', '利用後の満足感', 'ブランドへの印象']
  },
  {
    id: 'wireframe',
    term: 'ワイヤーフレーム',
    reading: 'ワイヤーフレーム',
    category: 'Web制作・デザイン',
    definition: 'Webページやアプリの骨組みを示す設計図。レイアウトや機能配置を線画で表現したもの。',
    details: 'デザイン制作前に情報構造や機能配置を整理するために作成します。色やフォントを使わず、要素の配置と優先度に集中できるため、効率的な設計が可能です。',
    relatedTerms: ['プロトタイプ', 'モックアップ', '情報設計', 'UI'],
    examples: ['ヘッダー・フッター配置', 'コンテンツエリア設計', 'ナビゲーション構造', 'CTA配置計画']
  },
  {
    id: 'prototype',
    term: 'プロトタイプ',
    reading: 'プロトタイプ',
    category: 'Web制作・デザイン',
    definition: '実際の製品・サービスの動作を模擬した試作品。Webサイトでは、インタラクションを含む動的なモックアップ。',
    details: 'ワイヤーフレームより詳細で、実際のクリックやページ遷移を体験できます。制作前にユーザーテストを行い、問題を発見・修正するために重要です。',
    relatedTerms: ['ワイヤーフレーム', 'モックアップ', 'ユーザーテスト', 'アジャイル開発'],
    examples: ['クリック可能なモックアップ', 'フォーム入力体験', 'ナビゲーション動作', 'レスポンシブ挙動']
  },
  {
    id: 'css',
    term: 'CSS',
    reading: 'シーエスエス',
    category: 'Web制作・デザイン',
    definition: 'Cascading Style Sheets（カスケーディング スタイル シート）の略。HTMLで構造化されたWebページの見た目やデザインを定義する言語。',
    details: 'フォント、色、レイアウト、アニメーションなどの視覚的表現を担当します。CSS3では、グラデーション、シャドウ、アニメーションなど高度な表現が可能になりました。',
    relatedTerms: ['HTML', 'JavaScript', 'SCSS', 'Tailwind CSS'],
    examples: ['フォントスタイル設定', 'レイアウトデザイン', 'ホバーエフェクト', 'レスポンシブ対応']
  },
  {
    id: 'html',
    term: 'HTML',
    reading: 'エイチティーエムエル',
    category: 'Web制作・デザイン',
    definition: 'HyperText Markup Language（ハイパーテキスト マークアップ言語）の略。Webページの基本構造を定義するマークアップ言語。',
    details: '見出し、段落、リスト、リンク、画像などの要素をタグで囲んで記述します。HTML5では、セマンティックな要素が追加され、SEOとアクセシビリティが向上しました。',
    relatedTerms: ['CSS', 'JavaScript', 'SEO', 'セマンティックHTML'],
    examples: ['見出しタグ（h1-h6）', 'パラグラフ（p）', 'リンク（a）', '画像（img）']
  },
  {
    id: 'javascript',
    term: 'JavaScript',
    reading: 'ジャバスクリプト',
    category: 'Web制作・デザイン',
    definition: 'Webページに動的な機能を追加するプログラミング言語。ブラウザ上で動作し、ユーザーとのインタラクションを実現する。',
    details: 'フォームバリデーション、アニメーション、Ajax通信、SPAの構築など、現代のWebサイトには欠かせない技術です。React、Vue.jsなどのフレームワークも人気です。',
    relatedTerms: ['HTML', 'CSS', 'React', 'Vue.js'],
    examples: ['フォーム入力チェック', 'スライダー', 'ポップアップ表示', '非同期データ取得']
  },
  {
    id: 'cms',
    term: 'CMS',
    reading: 'シーエムエス',
    category: 'Web制作・デザイン',
    definition: 'Content Management System（コンテンツ管理システム）の略。専門知識なしにWebサイトのコンテンツを作成・更新・管理できるシステム。',
    details: 'WordPressが最も有名で、ブログ記事や固定ページを管理画面から簡単に編集できます。中小企業のWebサイト運用において非常に重要なツールです。',
    relatedTerms: ['WordPress', 'Drupal', 'コンテンツ管理', 'ブログ'],
    examples: ['WordPress', 'Drupal', 'Joomla', 'microCMS']
  },
  {
    id: 'wordpress',
    term: 'WordPress',
    reading: 'ワードプレス',
    category: 'Web制作・デザイン',
    definition: '世界で最も利用されているオープンソースのCMS。ブログから企業サイトまで幅広く使用されている。',
    details: '全Webサイトの約40%で使用されており、豊富なテーマ・プラグインが利用できます。SEO対策機能も充実しており、中小企業のWebサイト構築に最適です。',
    relatedTerms: ['CMS', 'プラグイン', 'テーマ', 'SEO'],
    examples: ['企業サイト構築', 'ブログ運営', 'ECサイト', 'ポートフォリオサイト']
  },
  {
    id: 'landing-page',
    term: 'ランディングページ（LP）',
    reading: 'ランディングページ',
    category: 'Web制作・デザイン',
    definition: '広告やメール、SNSなどからの流入ユーザーが最初に到着する単一のWebページ。特定のアクションを促すことを目的とする。',
    details: '1ページで商品・サービスの魅力を伝え、問い合わせや購入などのコンバージョンを獲得します。ストーリー性のある構成と強力なCTAが重要です。',
    relatedTerms: ['コンバージョン', 'CTA', 'A/Bテスト', 'CVR'],
    examples: ['商品販売ページ', 'セミナー申込みページ', '資料請求ページ', 'サービス紹介ページ']
  },
  {
    id: 'cta',
    term: 'CTA',
    reading: 'シーティーエー',
    category: 'Web制作・デザイン',
    definition: 'Call To Action（行動喚起）の略。ユーザーに特定のアクションを促すボタンやリンク。',
    details: '「お問い合わせ」「資料請求」「購入する」などのボタンで、コンバージョンに直結する重要な要素です。色、文言、配置がクリック率に大きく影響します。',
    relatedTerms: ['コンバージョン', 'ランディングページ', 'ボタンデザイン', 'CVR'],
    examples: ['「今すぐお問い合わせ」ボタン', '「無料診断を受ける」リンク', '「資料をダウンロード」ボタン', '「購入手続きへ」ボタン']
  },
  {
    id: 'ab-testing',
    term: 'A/Bテスト',
    reading: 'エービーテスト',
    category: 'Web制作・デザイン',
    definition: '2つの異なるバージョンのWebページを用意し、どちらがより高い成果を上げるかを比較検証する手法。',
    details: 'ボタンの色、文言、レイアウトなどを変更した複数パターンを同時運用し、統計的に有意な結果を得ます。継続的な改善によりコンバージョン率を向上できます。',
    relatedTerms: ['CVR', 'コンバージョン最適化', '統計的有意性', 'CRO'],
    examples: ['CTAボタンの色比較', '見出し文言の効果測定', 'フォーム項目数の最適化', 'レイアウトパターンの検証']
  },
  {
    id: 'usability',
    term: 'ユーザビリティ',
    reading: 'ユーザビリティ',
    category: 'Web制作・デザイン',
    definition: 'ユーザーが製品・サービスをどの程度効率的、効果的、満足感を持って利用できるかを示す指標。使いやすさ。',
    details: 'ISO 9241-11で「特定の利用状況において、特定のユーザーが特定の目標を達成するために用いる製品の、有効性、効率性、満足度の度合い」と定義されています。',
    relatedTerms: ['UX', 'UI', 'アクセシビリティ', 'ユーザーテスト'],
    examples: ['直感的なナビゲーション', '明確なエラーメッセージ', 'わかりやすいフォーム', '素早いページ読み込み']
  },
  {
    id: 'accessibility',
    term: 'アクセシビリティ',
    reading: 'アクセシビリティ',
    category: 'Web制作・デザイン',
    definition: '障がいの有無や年齢、利用環境に関係なく、すべてのユーザーが平等にWebサイトを利用できることを目指す概念。',
    details: 'WCAG（Web Content Accessibility Guidelines）に基づいて、色彩のコントラスト、キーボード操作、スクリーンリーダー対応などを考慮します。',
    relatedTerms: ['WCAG', 'スクリーンリーダー', 'alt属性', 'ユニバーサルデザイン'],
    examples: ['画像のalt属性設定', '十分なコントラスト比', 'キーボードナビゲーション', '音声読み上げ対応']
  },
  {
    id: 'font',
    term: 'Webフォント',
    reading: 'ウェブフォント',
    category: 'Web制作・デザイン',
    definition: 'インターネット経由で読み込んで使用するフォント。ユーザーの端末にインストールされていないフォントも表示可能。',
    details: 'Google FontsやAdobe Fontsなどのサービスを利用し、ブランドに合ったフォントを選択できます。読み込み速度とデザイン性のバランスが重要です。',
    relatedTerms: ['Google Fonts', 'Adobe Fonts', 'タイポグラフィ', 'フォント最適化'],
    examples: ['Google Fontsの導入', '日本語Webフォント', 'アイコンフォント', 'フォント表示最適化']
  },
  {
    id: 'image-optimization',
    term: '画像最適化',
    reading: 'がぞうさいてきか',
    category: 'Web制作・デザイン',
    definition: 'Webサイトの画像ファイルサイズを削減し、読み込み速度を向上させる技術的手法。',
    details: 'WebPフォーマットの使用、適切な圧縮、レスポンシブ画像、遅延読み込み（Lazy Loading）などの技術を組み合わせます。SEOとUXの両方に影響する重要な要素です。',
    relatedTerms: ['WebP', 'Lazy Loading', 'PageSpeed', 'Core Web Vitals'],
    examples: ['WebPフォーマット変換', '画像圧縮', 'srcset属性', 'Intersection Observer API']
  },

  // マーケティング分析・データカテゴリー
  {
    id: 'google-analytics',
    term: 'Google Analytics',
    reading: 'グーグルアナリティクス',
    category: 'マーケティング分析・データ',
    definition: 'Googleが提供する無料のWebサイト分析ツール。サイトへのアクセス状況、ユーザー行動、コンバージョンなどを詳細に分析できる。',
    details: 'GA4（Google Analytics 4）が最新版で、機械学習を活用した予測機能や、アプリとWebサイトを横断した分析が可能です。マーケティング効果測定の基本ツールです。',
    relatedTerms: ['GA4', 'コンバージョン', 'セッション', 'Google Tag Manager'],
    examples: ['月間訪問者数の把握', '流入元別の分析', 'コンバージョン率の測定']
  },
  {
    id: 'ga4',
    term: 'GA4',
    reading: 'ジーエーフォー',
    category: 'マーケティング分析・データ',
    definition: 'Google Analytics 4の略。Googleが提供する次世代のWeb解析プラットフォーム。従来のUniversal Analytics（UA）の後継版。',
    details: 'イベントベースのデータ収集、機械学習による予測分析、プライバシー重視の設計が特徴です。クッキーレス時代に対応した分析が可能で、2023年7月にUAの後継として完全移行しました。',
    relatedTerms: ['Google Analytics', 'イベントトラッキング', '機械学習', 'プライバシー'],
    examples: ['イベント設定', '予測指標', 'オーディエンス分析', '探索レポート']
  },
  {
    id: 'conversion',
    term: 'コンバージョン',
    reading: 'コンバージョン',
    category: 'マーケティング分析・データ',
    definition: 'Webサイト上でユーザーが企業の望む行動を取ること。転換、成果とも呼ばれる。',
    details: 'お問い合わせ、資料請求、商品購入、メルマガ登録など、ビジネス目標に直結するユーザー行動を指します。コンバージョン率（CVR）の向上がWebマーケティングの重要な指標です。',
    relatedTerms: ['CVR', 'CTA', 'ランディングページ', 'ファネル'],
    examples: ['お問い合わせ送信', '商品購入完了', '資料ダウンロード', '会員登録']
  },
  {
    id: 'cvr',
    term: 'CVR（コンバージョン率）',
    reading: 'シーブイアール',
    category: 'マーケティング分析・データ',
    definition: 'Conversion Rate の略。Webサイトの訪問者数に対するコンバージョン数の割合。',
    details: '「コンバージョン数 ÷ 訪問者数 × 100」で算出されます。業界や商品により異なりますが、一般的なECサイトで1-3%、BtoBサイトで2-5%程度が平均的です。',
    relatedTerms: ['コンバージョン', 'CTA', 'A/Bテスト', 'LPO'],
    examples: ['ECサイトの購入率', 'お問い合わせフォームの送信率', '資料請求率', 'メルマガ登録率']
  },
  {
    id: 'session',
    term: 'セッション',
    reading: 'セッション',
    category: 'マーケティング分析・データ',
    definition: 'ユーザーがWebサイトを訪問してから離脱するまでの一連の行動期間。Google Analyticsでは30分間の非アクティブで終了する。',
    details: '同一ユーザーでも日をまたいだり、30分以上間隔が空くと別セッションとしてカウントされます。サイトの利用実態を把握する重要な指標です。',
    relatedTerms: ['ユーザー', 'ページビュー', '直帰率', '滞在時間'],
    examples: ['1回の訪問での複数ページ閲覧', '30分以内の連続操作', '1日に複数回の訪問（複数セッション）']
  },
  {
    id: 'pageview',
    term: 'ページビュー（PV）',
    reading: 'ページビュー',
    category: 'マーケティング分析・データ',
    definition: 'Webページが表示された回数。同一ユーザーが同じページを複数回閲覧した場合も、それぞれカウントされる。',
    details: 'サイトの人気度やコンテンツの需要を測る基本的な指標です。月間PV、日間PVなどの単位で集計され、サイト運営の効果測定に活用されます。',
    relatedTerms: ['ユニークユーザー', 'セッション', '滞在時間', 'リピート率'],
    examples: ['ブログ記事の閲覧数', '商品ページの表示回数', 'トップページのアクセス数', 'カテゴリーページの人気度']
  },
  {
    id: 'bounce-rate',
    term: '直帰率',
    reading: 'ちょっきりつ',
    category: 'マーケティング分析・データ',
    definition: '1ページだけを見てサイトを離脱したセッションの割合。そのページだけで満足したか、期待に応えられなかったかを示す指標。',
    details: '「直帰セッション数 ÷ 総セッション数 × 100」で計算されます。業界により異なりますが、40-60%が一般的です。高すぎる場合はコンテンツの改善が必要です。',
    relatedTerms: ['離脱率', 'セッション', 'ページビュー', 'ユーザビリティ'],
    examples: ['ブログ記事の直帰率', 'ランディングページの直帰率', '検索流入の直帰率', 'モバイルでの直帰率']
  },
  {
    id: 'funnel-analysis',
    term: 'ファネル分析',
    reading: 'ファネルぶんせき',
    category: 'マーケティング分析・データ',
    definition: 'ユーザーが目標達成までの各段階でどの程度離脱しているかを漏斗（ファネル）状のグラフで可視化する分析手法。',
    details: '認知→興味→検討→購入といった顧客の購買プロセスを段階的に分析し、離脱が多い箇所を特定します。コンバージョン率改善の重要な分析手法です。',
    relatedTerms: ['コンバージョン', '離脱率', 'カスタマージャーニー', 'CVR'],
    examples: ['ECサイトの購入プロセス', 'お問い合わせフォーム', '会員登録プロセス', 'アプリダウンロード導線']
  },
  {
    id: 'cohort-analysis',
    term: 'コホート分析',
    reading: 'コホートぶんせき',
    category: 'マーケティング分析・データ',
    definition: '同時期に特定の体験をしたユーザー群（コホート）の行動を時系列で追跡する分析手法。',
    details: '同じ月に初回訪問したユーザーのリテンション率や、同じ商品を購入したユーザーのリピート率などを分析できます。ユーザーの長期的な価値を理解するのに重要です。',
    relatedTerms: ['リテンション率', 'LTV', 'ユーザー分析', 'RFM分析'],
    examples: ['月別初回訪問者の継続率', '商品別購入者のリピート率', 'キャンペーン別ユーザーの行動追跡']
  },
  {
    id: 'ltv',
    term: 'LTV（顧客生涯価値）',
    reading: 'エルティーブイ',
    category: 'マーケティング分析・データ',
    definition: 'Life Time Value（ライフタイムバリュー）の略。1人の顧客が企業との関係を持ち続ける期間中に、企業にもたらす利益の総額。',
    details: '顧客獲得コスト（CAC）と組み合わせて分析し、マーケティング投資の効率性を評価します。LTV > CACであれば、そのマーケティング施策は利益を生むと判断できます。',
    relatedTerms: ['CAC', 'リテンション率', 'リピート率', 'ARPU'],
    examples: ['サブスクリプションサービスの顧客価値', 'ECサイトでのリピート購入価値', 'SaaSサービスの月額収益価値']
  },
  {
    id: 'cac',
    term: 'CAC（顧客獲得単価）',
    reading: 'シーエーシー',
    category: 'マーケティング分析・データ',
    definition: 'Customer Acquisition Cost（顧客獲得コスト）の略。新規顧客を1人獲得するのに必要な費用。',
    details: '「マーケティング費用 ÷ 獲得顧客数」で算出されます。LTVと比較してCACが低いほど効率的なマーケティングと評価できます。',
    relatedTerms: ['LTV', 'CPC', 'CPA', 'ROAS'],
    examples: ['広告経由の顧客獲得コスト', 'SEO施策の顧客獲得コスト', 'イベント参加者の獲得コスト']
  },
  {
    id: 'roas',
    term: 'ROAS',
    reading: 'ロアス',
    category: 'マーケティング分析・データ',
    definition: 'Return On Advertising Spend（広告費用対効果）の略。広告費に対してどれだけの売上が得られたかを示す指標。',
    details: '「広告経由の売上 ÷ 広告費 × 100」で算出され、パーセントで表示されます。ROAS 400%なら広告費1円に対して4円の売上を意味します。',
    relatedTerms: ['ROI', 'CPA', '広告効果測定', 'コンバージョン'],
    examples: ['Google広告のROAS', 'Facebook広告の効果測定', 'ディスプレイ広告の成果', 'リスティング広告の収益性']
  },
  {
    id: 'roi',
    term: 'ROI',
    reading: 'アールオーアイ',
    category: 'マーケティング分析・データ',
    definition: 'Return On Investment（投資収益率）の略。投資に対してどれだけの利益が得られたかを示す指標。',
    details: '「(売上-投資額) ÷ 投資額 × 100」で算出されます。ROASが売上ベースなのに対し、ROIは利益ベースで計算するため、より正確な投資効果を測定できます。',
    relatedTerms: ['ROAS', '利益率', '投資効果', 'マーケティングROI'],
    examples: ['Webサイト制作投資のROI', 'SEO対策投資の収益性', 'システム導入の投資効果', 'マーケティング全体のROI']
  },
  {
    id: 'cpa',
    term: 'CPA',
    reading: 'シーピーエー',
    category: 'マーケティング分析・データ',
    definition: 'Cost Per Acquisition（顧客獲得単価）または Cost Per Action（行動単価）の略。1つのコンバージョンを獲得するのに必要な費用。',
    details: '「広告費 ÷ コンバージョン数」で算出されます。目標CPAを設定し、それを下回る効率的な広告運用を目指します。業界や商品により適正値は大きく異なります。',
    relatedTerms: ['CAC', 'CPC', 'CVR', 'コンバージョン'],
    examples: ['お問い合わせ1件あたりの費用', '商品購入1件あたりの広告費', '会員登録1件あたりのコスト']
  },
  {
    id: 'cpc',
    term: 'CPC',
    reading: 'シーピーシー',
    category: 'マーケティング分析・データ',
    definition: 'Cost Per Click（クリック単価）の略。1クリックあたりの広告費用。',
    details: '「広告費 ÷ クリック数」で算出されます。競合の多いキーワードほどCPCが高くなる傾向があります。品質スコアが高いほどCPCを抑えられます。',
    relatedTerms: ['CPA', 'CTR', '品質スコア', 'キーワード入札'],
    examples: ['Google広告のクリック単価', 'Facebook広告の1クリック費用', 'Yahoo!広告の入札価格']
  },
  {
    id: 'heat-map',
    term: 'ヒートマップ',
    reading: 'ヒートマップ',
    category: 'マーケティング分析・データ',
    definition: 'Webページ上でのユーザーの行動（クリック、スクロール、マウスの動きなど）を色の濃淡で可視化するツール。',
    details: '赤い部分が最も注目度が高く、青い部分が低いことを示します。ユーザーの関心エリアや問題箇所を特定し、UI/UX改善に活用できます。',
    relatedTerms: ['ユーザビリティ', 'UI改善', 'UX分析', 'A/Bテスト'],
    examples: ['クリック分布の可視化', 'スクロール到達率', 'フォーム離脱箇所の特定', 'CTA効果の検証']
  },
  {
    id: 'attribution',
    term: 'アトリビューション',
    reading: 'アトリビューション',
    category: 'マーケティング分析・データ',
    definition: 'コンバージョンに至るまでの複数のタッチポイント（接触点）それぞれの貢献度を評価する手法。',
    details: 'ユーザーは通常、複数のチャネル（検索、SNS、メール、広告など）を経由してコンバージョンに至ります。各チャネルの役割を正しく評価することで、効果的なマーケティング予算配分が可能です。',
    relatedTerms: ['タッチポイント', 'カスタマージャーニー', 'マルチチャネル', 'コンバージョン'],
    examples: ['初回接触から購入までの経路分析', 'チャネル別貢献度評価', '広告の間接効果測定']
  },
  {
    id: 'customer-journey',
    term: 'カスタマージャーニー',
    reading: 'カスタマージャーニー',
    category: 'マーケティング分析・データ',
    definition: '顧客が商品・サービスを認知してから購入、継続利用に至るまでの一連の体験プロセス。',
    details: '認知→興味→検討→購入→継続利用といった各段階での顧客の行動、感情、タッチポイントをマップ化します。顧客視点でのマーケティング戦略立案に重要です。',
    relatedTerms: ['タッチポイント', 'ペルソナ', 'ファネル分析', 'UX'],
    examples: ['BtoBサービスの検討プロセス', 'ECサイトでの購買行動', 'SaaSサービスの導入検討']
  },
  {
    id: 'persona',
    term: 'ペルソナ',
    reading: 'ペルソナ',
    category: 'マーケティング分析・データ',
    definition: '実在する顧客データを基に作成された、架空の具体的な顧客像。ターゲットユーザーの代表的なプロフィール。',
    details: '年齢、職業、趣味、課題、行動パターンなどを詳細に設定し、マーケティング施策やコンテンツ制作の指針とします。チーム内での顧客理解を統一する効果があります。',
    relatedTerms: ['ターゲティング', 'カスタマージャーニー', 'セグメンテーション', 'ユーザーリサーチ'],
    examples: ['35歳の中小企業経営者ペルソナ', '20代のWebデザイナーペルソナ', '40代の人事担当者ペルソナ']
  },
  {
    id: 'segment',
    term: 'セグメント',
    reading: 'セグメント',
    category: 'マーケティング分析・データ',
    definition: '共通の特性を持つ顧客やユーザーのグループ。市場をより小さく均質な集団に分割すること。',
    details: '地理的、人口統計学的、心理的、行動的な基準でユーザーを分類します。各セグメントに最適化されたマーケティングメッセージを展開することで、効果を高められます。',
    relatedTerms: ['ターゲティング', 'ペルソナ', 'セグメンテーション', '顧客分析'],
    examples: ['年代別セグメント', '地域別セグメント', '利用頻度別セグメント', '購買行動別セグメント']
  },
  {
    id: 'rfm-analysis',
    term: 'RFM分析',
    reading: 'アールエフエムぶんせき',
    category: 'マーケティング分析・データ',
    definition: '顧客をRecency（最終購買日）、Frequency（購買頻度）、Monetary（購買金額）の3つの軸で分析する手法。',
    details: '各軸で顧客をランク分けし、8つの顧客セグメント（優良顧客、新規顧客、休眠顧客など）に分類します。セグメント別に最適なマーケティング施策を実施できます。',
    relatedTerms: ['顧客分析', 'セグメンテーション', 'LTV', 'リテンション'],
    examples: ['優良顧客の特別オファー', '休眠顧客の再活性化', '新規顧客のフォロー施策']
  },
];

// カテゴリー別にグループ化
const categorizedTerms = glossaryTerms.reduce((acc, term) => {
  if (!acc[term.category]) {
    acc[term.category] = [];
  }
  acc[term.category].push(term);
  return acc;
}, {} as Record<string, Term[]>);

export default function GlossaryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  // 検索とフィルタリング
  const filteredTerms = useMemo(() => {
    let filtered = glossaryTerms;

    // カテゴリーフィルター
    if (selectedCategory) {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    // 検索クエリフィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.reading.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.details && term.details.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // 用語の展開/折りたたみ
  const toggleExpanded = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
    }
    setExpandedTerms(newExpanded);
  };

  return (
    <>
      {/* 検索とフィルター */}
      <div className="mb-8 space-y-4">
        {/* 検索ボックス */}
        <div className="relative">
          <input
            type="text"
            placeholder="用語名、読み方、説明から検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* カテゴリーフィルター */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-2 text-sm rounded-full transition-colors ${
              selectedCategory === ''
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて ({glossaryTerms.length})
          </button>
          {Object.keys(categorizedTerms).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category} ({categorizedTerms[category].length})
            </button>
          ))}
        </div>
      </div>

      {/* 検索結果の件数表示 */}
      {searchQuery && (
        <div className="mb-6 text-sm text-gray-600">
          「{searchQuery}」の検索結果: {filteredTerms.length}件
        </div>
      )}

      {/* 用語一覧 */}
      <div className="space-y-4">
        {filteredTerms.map((term) => (
          <div key={term.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* クリック可能なヘッダー部分 */}
            <button
              onClick={() => toggleExpanded(term.id)}
              className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-black">
                      {term.term}
                    </h3>
                    <span className="text-base text-gray-600">
                      ({term.reading})
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
                <div className="ml-4">
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedTerms.has(term.id) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* 展開される詳細部分 */}
            {expandedTerms.has(term.id) && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {term.details && (
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-black mb-2">詳細説明</h4>
                    <p className="text-gray-800 leading-relaxed">
                      {term.details}
                    </p>
                  </div>
                )}

                {term.examples && term.examples.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-black mb-2">具体例</h4>
                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                      {term.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-black mb-2">関連用語</h4>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((relatedTerm, index) => {
                        const relatedTermData = glossaryTerms.find(t => t.term === relatedTerm);
                        return (
                          <span key={index}>
                            {relatedTermData ? (
                              <button
                                onClick={() => {
                                  setSearchQuery(relatedTerm);
                                  setSelectedCategory('');
                                }}
                                className="inline-block px-3 py-1 bg-gray-100 text-primary text-sm rounded hover:bg-gray-200 transition-colors"
                              >
                                {relatedTerm}
                              </button>
                            ) : (
                              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                                {relatedTerm}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 検索結果が0件の場合 */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">該当する用語が見つかりませんでした</p>
          <p className="text-sm">検索キーワードやカテゴリーを変更してお試しください</p>
        </div>
      )}

      {/* CTA セクション */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-black mb-4">
          デジタルマーケティングでお困りですか？
        </h2>
        <p className="text-gray-800 mb-6 leading-relaxed">
          用語を理解したら、次は実践です。GYAKUTENでは、LLMO、SEO、DXなど、<br />
          最新のデジタルマーケティング手法で貴社の成長を支援します。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services/llmo-diagnosis"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            無料LLMO診断を受ける
          </Link>
          <Link
            href="/contact"
            className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary hover:text-white transition-colors"
          >
            専門家に相談する
          </Link>
        </div>
      </section>

      {/* 関連ページリンク */}
      <section className="mt-12">
        <h3 className="text-lg font-semibold text-black mb-6">関連サービス</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/services/llmo-diagnosis" className="block p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-medium text-black mb-2">GYAKUTEN LLMO診断</h4>
            <p className="text-sm text-gray-600">現在のAI検索対応状況を詳しく診断</p>
          </Link>
          <Link href="/services/web-llmo" className="block p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-medium text-black mb-2">GYAKUTEN LLMOウェブ制作</h4>
            <p className="text-sm text-gray-600">AI最適化されたWebサイトの制作</p>
          </Link>
          <Link href="/services/write-llmo" className="block p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-medium text-black mb-2">GYAKUTEN LLMOライティング</h4>
            <p className="text-sm text-gray-600">AI引用されやすい文章作成サービス</p>
          </Link>
          <Link href="/services/llmo-consulting" className="block p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
            <h4 className="font-medium text-black mb-2">GYAKUTEN LLMO コンサル</h4>
            <p className="text-sm text-gray-600">総合的なLLMO戦略立案・実行支援</p>
          </Link>
        </div>
      </section>

      {/* 更新情報 */}
      <div className="mt-12 pt-8 border-t border-gray-300 text-center">
        <p className="text-sm text-gray-600">
          最終更新日: 2024年12月10日 | 
          <Link href="/contact" className="text-primary hover:underline ml-2">
            用語の追加・修正のご要望
          </Link>
        </p>
      </div>
    </>
  );
}