import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import GlossaryClient from './GlossaryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'デジタルマーケティング用語集 | AI・LLMO・SEO・DX専門用語を網羅 | 合同会社GYAKUTEN',
  description: 'LLMO、SEO、AI検索、DX、SaaS、Web制作など、デジタルマーケティングに関する200以上の専門用語を分かりやすく解説。中小企業の経営者・マーケティング担当者必見の用語集です。',
  keywords: 'デジタルマーケティング, 用語集, LLMO, SEO, AI検索, DX, SaaS, Web制作, マーケティング用語, IT用語',
  openGraph: {
    title: 'デジタルマーケティング用語集 | AI・LLMO・SEO・DX専門用語を網羅',
    description: 'デジタルマーケティングの専門用語を分かりやすく解説。LLMO、SEO、AI検索、DXなど200以上の用語を収録した中小企業向け用語集です。',
    type: 'website',
    url: 'https://gyaku-ten.jp/glossary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'デジタルマーケティング用語集',
    description: 'LLMO、SEO、AI検索、DX等の専門用語を分かりやすく解説',
  },
  alternates: {
    canonical: 'https://gyaku-ten.jp/glossary',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
    id: 'nlp',
    term: '自然言語処理（NLP）',
    reading: 'しぜんげんごしょり',
    category: 'AI・機械学習',
    definition: 'Natural Language Processing の略。コンピューターが人間の言語を理解、解析、生成するためのAI技術分野。',
    details: 'テキスト分析、機械翻訳、感情分析、文書要約、質問応答など、言語に関わる様々なタスクを自動化する技術の総称です。',
    relatedTerms: ['機械学習', 'トークン化', '形態素解析', 'トランスフォーマー'],
    examples: ['機械翻訳', '感情分析', 'チャットボット', '文書要約']
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
    id: 'vector-embedding',
    term: 'ベクトル埋め込み',
    reading: 'ベクトルうめこみ',
    category: 'AI・機械学習',
    definition: '単語や文章を数値ベクトルとして表現する技術。意味的な類似性を数値的に計算可能にする。',
    details: '似た意味の単語は近いベクトル空間に配置されるため、検索や推薦システムで活用されます。RAGシステムの核となる技術です。',
    relatedTerms: ['RAG', 'ベクトル検索', 'Word2Vec', 'Sentence-BERT'],
    examples: ['文書類似度計算', 'セマンティック検索', '推薦システム', 'クラスタリング']
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
    id: 'agi',
    term: 'AGI（汎用人工知能）',
    reading: 'エージーアイ',
    category: 'AI・機械学習',
    definition: 'Artificial General Intelligence の略。人間と同等かそれ以上の知能を持つ汎用的なAI。',
    details: '現在のAIは特定タスクに特化していますが、AGIは人間のように様々な分野で学習・思考・創造ができる汎用的な知能を指します。',
    relatedTerms: ['ASI', 'シンギュラリティ', '汎用AI', 'AGI安全性'],
    examples: ['まだ実現されていない未来技術', '研究開発中の分野', '理論的な概念']
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
    id: 'api',
    term: 'API',
    reading: 'エーピーアイ',
    category: 'AI・機械学習',
    definition: 'Application Programming Interface の略。ソフトウェア間でデータや機能をやり取りするためのインターフェース。',
    details: 'ChatGPT APIやGoogle Gemini APIなど、AIサービスを外部システムから利用するための仕組みです。Webアプリやビジネスシステムへの組み込みが可能になります。',
    relatedTerms: ['RESTful API', 'JSON', 'Webhook', 'SDK'],
    examples: ['ChatGPT API連携', 'カスタムAIアプリ開発', 'システム間データ連携', '自動化ツール']
  },
  {
    id: 'openai',
    term: 'OpenAI',
    reading: 'オープンエーアイ',
    category: 'AI・機械学習',
    definition: 'ChatGPTやGPT-4を開発したAI研究企業。AGI（汎用人工知能）の安全な実現を目指す。',
    details: '2015年に設立され、GPTシリーズの開発で生成AIブームを牽引しました。現在はMicrosoftと戦略的パートナーシップを結んでいます。',
    relatedTerms: ['ChatGPT', 'GPT-4', 'Microsoft', 'AGI'],
    examples: ['ChatGPT', 'DALL-E', 'Codex', 'Whisper']
  },
  {
    id: 'anthropic',
    term: 'Anthropic',
    reading: 'アンソロピック',
    category: 'AI・機械学習',
    definition: 'Claudeを開発したAI安全性研究企業。OpenAIの元メンバーが設立した会社。',
    details: '憲法AI（Constitutional AI）という独自の安全性技術を開発し、より安全で有用なAIシステムの構築を目指しています。',
    relatedTerms: ['Claude', '憲法AI', 'AI安全性', 'AI研究'],
    examples: ['Claude', '憲法AI技術', 'AI安全性研究', 'Constitutional AI論文']
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
    id: 'organic-search',
    term: 'オーガニック検索',
    reading: 'オーガニックけんさく',
    category: 'SEO・Webマーケティング',
    definition: '広告ではない自然検索結果からのWebサイトへの流入。SEO施策により獲得できるトラフィック。',
    details: '広告費がかからず、継続的な流入が期待できるため、多くの企業が重視している集客チャネルです。AI検索時代においても、オーガニック検索の重要性は変わりません。',
    relatedTerms: ['SEO', '検索エンジン', 'SEM', 'キーワード'],
    examples: ['Googleからの自然流入', 'Yahoo!検索からの訪問', 'Bingからのアクセス']
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
    term: 'CTR',
    reading: 'シーティーアール',
    category: 'SEO・Webマーケティング',
    definition: 'Click Through Rate（クリック率）の略。広告やWebページの表示回数に対するクリック数の割合。',
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
    examples: ['「LLMO対策なら合同会社GYAKUTEN」', '「中小企業のDX推進支援サービス」', '「SEO・Web制作の専門企業」', '「AI検索時代のマーケティング」']
  },
  {
    id: 'h1-tag',
    term: 'H1タグ',
    reading: 'エイチワンタグ',
    category: 'SEO・Webマーケティング',
    definition: 'HTMLの見出しタグの一つで、ページの主要な見出しを表すタグ。最も重要な見出しに使用される。',
    details: 'ページ内容を端的に表す重要なSEO要素で、通常1ページに1つだけ使用します。タイトルタグとは異なる表現でキーワードを含めることが推奨されます。',
    relatedTerms: ['H2タグ', 'H3タグ', 'タイトルタグ', 'コンテンツ構造'],
    examples: ['「デジタルマーケティングの専門企業」', '「AI時代のSEO対策サービス」', '「中小企業向けDXソリューション」', '「LLMO対策の基礎知識」']
  },
  {
    id: 'alt-attribute',
    term: 'alt属性',
    reading: 'オルトぞくせい',
    category: 'SEO・Webマーケティング',
    definition: 'HTML画像タグ（img）の属性で、画像の代替テキストを指定する。画像が表示されない場合に代わりに表示される。',
    details: '視覚障害者向けのスクリーンリーダーや、画像検索SEOにおいて重要な要素です。画像の内容を具体的に説明するテキストを設定します。',
    relatedTerms: ['画像SEO', 'アクセシビリティ', 'HTML', 'スクリーンリーダー'],
    examples: ['alt="合同会社GYAKUTENのロゴ"', 'alt="LLMO対策の効果を示すグラフ"', 'alt="代表取締役の写真"', 'alt="サービス比較表"']
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
    id: 'cloud',
    term: 'クラウド',
    reading: 'クラウド',
    category: 'DX・システム開発',
    definition: 'インターネット経由でコンピューティングリソース（サーバー、ストレージ、データベース、ソフトウェアなど）を提供するサービス形態。',
    details: '従来の自社サーバー運用と比較して、初期投資の削減、運用負荷の軽減、スケーラビリティの向上などのメリットがあります。DX推進の基盤技術として重要です。',
    relatedTerms: ['SaaS', 'AWS', 'Azure', 'オンプレミス'],
    examples: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform']
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
    id: 'ui-ux',
    term: 'UI/UX',
    reading: 'ユーアイ・ユーエックス',
    category: 'Web制作・デザイン',
    definition: 'UI（User Interface：ユーザーインターフェース）とUX（User Experience：ユーザーエクスペリエンス）の総称。UIは画面設計、UXは利用体験全体を指す。',
    details: 'UIは見た目の美しさや操作のしやすさ、UXは利用者が感じる価値や満足度全体を設計します。優れたUI/UXは、コンバージョン率向上や顧客満足度アップに直結します。',
    relatedTerms: ['ユーザビリティ', 'アクセシビリティ', 'デザインシステム', 'プロトタイプ'],
    examples: ['直感的なボタン配置', '分かりやすいナビゲーション', 'スムーズな購入フロー']
  },
  {
    id: 'cms',
    term: 'CMS',
    reading: 'シーエムエス',
    category: 'Web制作・デザイン',
    definition: 'Content Management System（コンテンツ管理システム）の略。専門知識がなくてもWebサイトのコンテンツを管理・更新できるシステム。',
    details: 'WordPress、Drupal、MovableTypeなどが代表的なCMSです。記事の投稿、画像のアップロード、ページの編集などを管理画面から簡単に行えます。',
    relatedTerms: ['WordPress', 'ブログ', 'オウンドメディア', 'コンテンツ更新'],
    examples: ['WordPress', 'Shopify', 'Wix', 'Squarespace']
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
    id: 'conversion-rate',
    term: 'コンバージョン率',
    reading: 'コンバージョンりつ',
    category: 'マーケティング分析・データ',
    definition: 'Webサイトの訪問者のうち、問い合わせや購入などの目標行動を取ったユーザーの割合。CVR（Conversion Rate）とも呼ばれる。',
    details: '「コンバージョン数 ÷ 訪問者数 × 100」で算出されます。業界平均は1-3%程度で、この数値の改善により売上向上が期待できます。',
    relatedTerms: ['CV', 'CRO', 'A/Bテスト', 'LPO'],
    examples: ['ECサイトでの購入率', 'BtoBサイトでの資料請求率', '予約サイトでの予約完了率']
  },
  {
    id: 'kpi',
    term: 'KPI',
    reading: 'ケーピーアイ',
    category: 'マーケティング分析・データ',
    definition: 'Key Performance Indicator（重要業績評価指標）の略。目標達成度を測定するための重要な指標。',
    details: 'マーケティング活動の効果を定量的に評価するために設定します。売上、リード獲得数、コンバージョン率、顧客獲得コストなど、ビジネス目標に応じて設定します。',
    relatedTerms: ['KGI', 'ROI', 'ROAS', 'CPA'],
    examples: ['月間リード獲得数', 'サイト滞在時間', 'メール開封率']
  },

  // その他重要用語
  {
    id: 'omnichannel',
    term: 'オムニチャネル',
    reading: 'オムニチャネル',
    category: 'マーケティング戦略',
    definition: '店舗、EC、SNS、メール、電話など、あらゆる顧客接点を統合し、一貫した顧客体験を提供するマーケティング戦略。',
    details: 'デジタルとリアルの境界を超えて、顧客がいつでもどこでも同じ品質のサービスを受けられることを目指します。顧客情報の一元管理が重要な要素です。',
    relatedTerms: ['CRM', '顧客体験', 'O2O', 'マルチチャネル'],
    examples: ['店舗での商品確認後オンラインで購入', 'アプリでの注文を店舗で受け取り', 'SNSでの問い合わせから電話サポートへの連携']
  },
  {
    id: 'marketing-automation',
    term: 'マーケティングオートメーション',
    reading: 'マーケティングオートメーション',
    category: 'マーケティング戦略',
    definition: '見込み客の行動や属性に応じて、メール配信、スコアリング、セグメント分けなどのマーケティング活動を自動化するツール・手法。',
    details: 'リード育成（リードナーチャリング）を効率的に行い、営業部門への質の高いリード引き渡しを実現します。中小企業でも導入しやすいツールが増えています。',
    relatedTerms: ['MA', 'リードナーチャリング', 'スコアリング', 'CRM'],
    examples: ['資料ダウンロード後の自動メール配信', '行動履歴に基づくセグメント配信', 'スコアに応じた営業アラート']
  }
];


export default function GlossaryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'デジタルマーケティング用語集',
    description: 'LLMO、SEO、AI検索、DX、SaaSなど、デジタルマーケティングに関する専門用語を分かりやすく解説した用語集',
    publisher: {
      '@type': 'Organization',
      name: '合同会社GYAKUTEN',
      url: 'https://gyaku-ten.jp',
    },
    hasDefinedTerm: glossaryTerms.map(term => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.definition,
      identifier: term.id,
      inDefinedTermSet: 'https://gyaku-ten.jp/glossary',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout>
        <main className="min-h-screen bg-white">
          {/* パンくずリスト */}
          <nav className="bg-white border-b border-gray-200 pt-5">
            <div className="max-w-6xl mx-auto px-4 py-3">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-primary">
                    ホーム
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li className="text-black font-medium">
                  デジタルマーケティング用語集
                </li>
              </ol>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto px-4 pt-2 pb-6">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-black mb-8 tracking-wide">
                デジタルマーケティング用語集
              </h1>
              <div className="text-lg leading-relaxed text-gray-800">
                <p className="leading-loose mb-4">
                  LLMO、SEO、AI検索、DX、SaaSなど、デジタルマーケティングに関する専門用語を分かりやすく解説します。中小企業の経営者・マーケティング担当者の皆様が、最新のデジタル技術とマーケティング手法を理解するためのリファレンスとしてお役立てください。
                </p>
                <p className="text-base text-gray-700">
                  各用語には詳細説明、関連用語、実践例を含めて解説しており、実務で活用できる知識を提供します。
                </p>
              </div>
            </header>

            {/* インタラクティブな用語集本体をクライアントコンポーネントに委譲 */}
            <GlossaryClient />

          </div>
        </main>
      </Layout>
    </>
  );
}


