'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WireframeSphere({ color = '#8f2c34' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.LineSegments>(null);
  const auxRef = useRef<THREE.LineSegments>(null);
  const lightPointsRef = useRef<THREE.Points>(null);
  const [, setTime] = useState(0);
  const [brainState, setBrainState] = useState({ 
    attention: 0.5, 
    activity: 0.3, 
    focus: new THREE.Vector3(0, 0, 0),
    lastThought: 0,
    thoughtIntensity: 0,
    deepThinking: false,
    learningStrength: 0,
    knowledgeCluster: new THREE.Vector3(0, 0, 0),
    processingMode: 'idle' as 'idle' | 'analyzing' | 'generating' | 'deep-think',
    heartbeat: 0,
    heartbeatPhase: 0,
    heartbeatIntensity: 1,
    lastHeartbeat: 0,
    breathing: 0,
    breathingPhase: 0,
    temperature: 37.0, // 体温
    bloodFlow: 0,
    nervousResponse: 0,
    metabolicRate: 1.0,
    oxygenLevel: 0.98,
    stress: 0.1,
    fatigue: 0.0
  });
  
  // IcosahedronGeometry のワイヤーフレーム生成 + 光点
  const { wireframeGeometry, auxiliaryLines, lightPoints } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(2.5, 5);
    const edges = new THREE.EdgesGeometry(geometry);
    
    // 補助ライン80本をランダム頂点ペアで生成
    const vertices = geometry.attributes.position.array;
    const auxiliaryPoints: number[] = [];
    
    for (let i = 0; i < 80; i++) {
      const idx1 = Math.floor(Math.random() * vertices.length / 3) * 3;
      const idx2 = Math.floor(Math.random() * vertices.length / 3) * 3;
      
      auxiliaryPoints.push(
        vertices[idx1], vertices[idx1 + 1], vertices[idx1 + 2],
        vertices[idx2], vertices[idx2 + 1], vertices[idx2 + 2]
      );
    }
    
    const auxGeometry = new THREE.BufferGeometry();
    auxGeometry.setAttribute('position', new THREE.Float32BufferAttribute(auxiliaryPoints, 3));
    
    // 線上に配置する光点を生成（各線に3つずつ）
    const lightPointPositions: number[] = [];
    const totalLines = auxiliaryPoints.length / 6; // 2頂点 × 3座標 = 6
    
    for (let i = 0; i < totalLines; i++) {
      const startIdx = i * 6;
      const start = new THREE.Vector3(
        auxiliaryPoints[startIdx], 
        auxiliaryPoints[startIdx + 1], 
        auxiliaryPoints[startIdx + 2]
      );
      const end = new THREE.Vector3(
        auxiliaryPoints[startIdx + 3], 
        auxiliaryPoints[startIdx + 4], 
        auxiliaryPoints[startIdx + 5]
      );
      
      // 線上の3点を配置
      for (let j = 0; j < 3; j++) {
        const t = (j + 1) / 4; // 0.25, 0.5, 0.75の位置
        const point = start.clone().lerp(end, t);
        lightPointPositions.push(point.x, point.y, point.z);
      }
    }
    
    const lightGeometry = new THREE.BufferGeometry();
    lightGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lightPointPositions, 3));
    
    return { wireframeGeometry: edges, auxiliaryLines: auxGeometry, lightPoints: lightGeometry };
  }, []);

  // 各光点の"ニューロン"パラメータ（思考パターンを模倣）
  const neuronParams = useMemo(() => {
    const params: Array<{
      frequency: number, 
      phase: number, 
      amplitude: number,
      position: THREE.Vector3,
      connections: number[],
      firing: boolean,
      fireStrength: number
    }> = [];
    const totalPoints = 80 * 3; // 80線 × 3点
    const positions: THREE.Vector3[] = [];
    
    // 位置情報を先に計算
    for (let i = 0; i < totalPoints; i++) {
      const posIdx = i * 3;
      positions.push(new THREE.Vector3(
        lightPoints.attributes.position.array[posIdx],
        lightPoints.attributes.position.array[posIdx + 1],
        lightPoints.attributes.position.array[posIdx + 2]
      ));
    }
    
    for (let i = 0; i < totalPoints; i++) {
      // 近くのポイントとの"接続"を計算
      const connections: number[] = [];
      const currentPos = positions[i];
      
      for (let j = 0; j < totalPoints; j++) {
        if (i !== j && currentPos.distanceTo(positions[j]) < 1.5) {
          connections.push(j);
        }
      }
      
      params.push({
        frequency: Math.random() * 2 + 0.8, // 0.8-2.8Hz（思考の波長）
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 0.7 + 0.4, // 0.4-1.1の振幅
        position: currentPos,
        connections,
        firing: false,
        fireStrength: 0
      });
    }
    return params;
  }, [lightPoints]);

  // "神経回路"パラメータ（線の知的活動を模倣）
  const circuitParams = useMemo(() => {
    const mainLineCount = wireframeGeometry.attributes.position.count / 2;
    const auxLineCount = 80;
    
    const mainParams: Array<{
      frequency: number, 
      phase: number, 
      amplitude: number,
      importance: number,
      lastActivity: number,
      isCore: boolean
    }> = [];
    const auxParams: Array<{
      frequency: number, 
      phase: number, 
      amplitude: number,
      importance: number,
      lastActivity: number,
      isMemory: boolean
    }> = [];
    
    // メイン回路（重要な思考経路）
    for (let i = 0; i < mainLineCount; i++) {
      const isCore = Math.random() < 0.3; // 30%がコア回路
      mainParams.push({
        frequency: isCore ? Math.random() * 1.5 + 1.5 : Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2,
        amplitude: isCore ? Math.random() * 0.4 + 0.3 : Math.random() * 0.3 + 0.2,
        importance: Math.random(),
        lastActivity: 0,
        isCore
      });
    }
    
    // 補助回路（記憶と連想）
    for (let i = 0; i < auxLineCount; i++) {
      const isMemory = Math.random() < 0.4; // 40%が記憶回路
      auxParams.push({
        frequency: isMemory ? Math.random() * 1 + 0.3 : Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2,
        amplitude: isMemory ? Math.random() * 0.25 + 0.15 : Math.random() * 0.2 + 0.1,
        importance: Math.random() * 0.7,
        lastActivity: 0,
        isMemory
      });
    }
    
    return { main: mainParams, aux: auxParams };
  }, [wireframeGeometry]);


  // 頂点ごとにランダムカラー生成 + 光点の色とサイズ
  const { mainColors, auxColors, lightPointColors, lightPointSizes } = useMemo(() => {
    const mainColorArray: number[] = [];
    const auxColorArray: number[] = [];
    
    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color(color);
    
    // メインワイヤーフレーム用
    const mainVertexCount = wireframeGeometry.attributes.position.count;
    for (let i = 0; i < mainVertexCount; i++) {
      const color = color1.clone().lerp(color2, Math.random());
      mainColorArray.push(color.r, color.g, color.b);
    }
    
    // 補助ライン用
    const auxVertexCount = auxiliaryLines.attributes.position.count;
    for (let i = 0; i < auxVertexCount; i++) {
      const color = color1.clone().lerp(color2, Math.random());
      auxColorArray.push(color.r, color.g, color.b);
    }
    
    // 光点用の色とサイズ
    const lightColorArray: number[] = [];
    const lightSizeArray: number[] = [];
    const lightVertexCount = lightPoints.attributes.position.count;
    
    for (let i = 0; i < lightVertexCount; i++) {
      const lightColor = color1.clone();
      lightColor.multiplyScalar(2); // より明るく
      lightColorArray.push(lightColor.r, lightColor.g, lightColor.b);
      lightSizeArray.push(Math.random() * 8 + 4); // サイズ4-12のランダム
    }
    
    return { 
      mainColors: new Float32Array(mainColorArray),
      auxColors: new Float32Array(auxColorArray),
      lightPointColors: new Float32Array(lightColorArray),
      lightPointSizes: new Float32Array(lightSizeArray)
    };
  }, [wireframeGeometry, auxiliaryLines, lightPoints, color]);

  // "意識"を持つ球体のアニメーション
  useFrame((state) => {
    const newTime = state.clock.elapsedTime;
    setTime(newTime);
    
    // "生命の鼓動"を計算（約60-80 BPM）
    const baseHeartRate = 1.2 + (brainState.stress * 0.3) - (brainState.fatigue * 0.2);
    const heartbeatCycle = newTime * baseHeartRate * 2 * Math.PI;
    
    // 鼓動のパターン：ドクン、ドクン
    const heartbeatWave = Math.max(0, Math.sin(heartbeatCycle)) ** 8 * 
                         (1 + 0.3 * Math.sin(heartbeatCycle * 2.1)); // 複雑な波形
    
    // "呼吸"の計算（約12-20回/分）
    const breathingRate = 0.25 + (brainState.stress * 0.1) - (brainState.fatigue * 0.05);
    const breathingCycle = newTime * breathingRate * 2 * Math.PI;
    const breathingWave = (Math.sin(breathingCycle) + 1) / 2; // 0-1の範囲
    
    // "血流"の計算（心拍と連動）
    const bloodFlowWave = heartbeatWave * 0.7 + breathingWave * 0.3;
    
    // "神経反応"の計算（ランダムな神経活動）
    const nervousWave = Math.sin(newTime * 15.7) * Math.sin(newTime * 23.1) * 
                       Math.sin(newTime * 31.4) * 0.5 + 0.5;
    
    // より複雑な思考パターンに基づく回転
    let rotationSpeed = 0.003;
    let rotationVariation = Math.sin(newTime * 0.3) * 0.002;
    
    // 処理モードに応じた回転パターン
    if (brainState.processingMode === 'analyzing') {
      rotationSpeed *= 1.2;
      rotationVariation *= 0.8; // より安定した回転
    } else if (brainState.processingMode === 'generating') {
      rotationSpeed *= 0.8;
      rotationVariation *= 1.5; // より変動の激しい回転
    } else if (brainState.processingMode === 'deep-think') {
      rotationSpeed *= 0.6;
      rotationVariation *= 0.4; // ゆっくりと深い回転
    }
    
    const thoughtRhythm = rotationVariation + rotationSpeed;
    const attentionShift = Math.sin(newTime * 0.15) * 0.001;
    const deepThinkingInfluence = brainState.deepThinking ? Math.sin(newTime * 0.05) * 0.0005 : 0;
    
    if (groupRef.current) {
      // 呼吸による微細な揺れを追加
      const breathingTremble = breathingWave * 0.0003;
      const nervousTremble = nervousWave * brainState.stress * 0.0002;
      
      groupRef.current.rotation.y += thoughtRhythm + deepThinkingInfluence + breathingTremble;
      groupRef.current.rotation.x += thoughtRhythm * 0.6 + attentionShift + nervousTremble;
      groupRef.current.rotation.z += thoughtRhythm * 0.3 - deepThinkingInfluence * 0.5 + breathingTremble * 0.5;
      
      // 鼓動と呼吸を組み合わせたスケール変化
      const heartbeatScale = 1 + (heartbeatWave * brainState.heartbeatIntensity * 0.04);
      const breathingScale = 1 + (breathingWave * 0.008); // 呼吸による膨らみ
      const combinedScale = heartbeatScale * breathingScale;
      groupRef.current.scale.setScalar(combinedScale);
      
      // 体温による微細な位置変動（熱による分子運動）
      const thermalNoise = (brainState.temperature - 36.5) * 0.00001;
      groupRef.current.position.x = Math.sin(newTime * 100) * thermalNoise;
      groupRef.current.position.y = Math.cos(newTime * 97.3) * thermalNoise;
      groupRef.current.position.z = Math.sin(newTime * 103.7) * thermalNoise;
    }
    
    // "意識状態"の更新
    setBrainState(prev => {
      const timeSinceLastThought = newTime - prev.lastThought;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      newTime - prev.lastHeartbeat;
      let newThoughtIntensity = prev.thoughtIntensity;
      let newLastThought = prev.lastThought;
      const newLastHeartbeat = prev.lastHeartbeat;
      let newHeartbeatIntensity = prev.heartbeatIntensity;
      
      // より複雑な思考パターン
      let newProcessingMode = prev.processingMode;
      let newDeepThinking = prev.deepThinking;
      let newLearningStrength = prev.learningStrength * 0.98;
      const newKnowledgeCluster = prev.knowledgeCluster.clone();
      
      // 思考モードの遷移
      if (timeSinceLastThought > 3 && Math.random() < 0.015) {
        const modes = ['analyzing', 'generating', 'deep-think'];
        newProcessingMode = modes[Math.floor(Math.random() * modes.length)] as 'idle' | 'analyzing' | 'generating' | 'deep-think';
        newThoughtIntensity = Math.random() * 0.9 + 0.3;
        newLastThought = newTime;
        
        // 知識クラスターの移動（関連概念の活性化）
        newKnowledgeCluster.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        );
        
        // 深い思考モードの開始
        if (newProcessingMode === 'deep-think') {
          newDeepThinking = true;
          newLearningStrength = Math.random() * 0.7 + 0.3;
          // 深い思考時は心拍数が少し上がる
          newHeartbeatIntensity = Math.min(1.8, prev.heartbeatIntensity * 1.2);
        }
      } else if (timeSinceLastThought > 1.5) {
        newProcessingMode = 'idle';
        newDeepThinking = false;
        newThoughtIntensity *= 0.95;
        // アイドル時は心拍数が正常に戻る
        newHeartbeatIntensity = Math.max(1.0, prev.heartbeatIntensity * 0.99);
      } else {
        newThoughtIntensity *= 0.92;
      }
      
      // 鼓動の強度を思考状態に連動
      if (newThoughtIntensity > 0.5) {
        newHeartbeatIntensity = Math.min(2.0, prev.heartbeatIntensity + 0.02);
      } else {
        newHeartbeatIntensity = Math.max(0.8, prev.heartbeatIntensity - 0.01);
      }
      
      // 生体機能の更新
      let newTemperature = prev.temperature;
      let newStress = prev.stress;
      let newFatigue = prev.fatigue;
      let newMetabolicRate = prev.metabolicRate;
      let newOxygenLevel = prev.oxygenLevel;
      
      // 思考活動による体温上昇
      if (newThoughtIntensity > 0.4) {
        newTemperature = Math.min(38.5, prev.temperature + 0.001);
        newStress = Math.min(1.0, prev.stress + 0.002);
        newMetabolicRate = Math.min(1.5, prev.metabolicRate + 0.001);
      } else {
        newTemperature = Math.max(36.8, prev.temperature - 0.0005);
        newStress = Math.max(0.05, prev.stress - 0.001);
        newMetabolicRate = Math.max(0.8, prev.metabolicRate - 0.0005);
      }
      
      // 深い思考時の酸素消費
      if (newDeepThinking) {
        newOxygenLevel = Math.max(0.92, prev.oxygenLevel - 0.001);
        newFatigue = Math.min(1.0, prev.fatigue + 0.0008);
      } else {
        newOxygenLevel = Math.min(0.99, prev.oxygenLevel + 0.0005);
        newFatigue = Math.max(0.0, prev.fatigue - 0.0003);
      }
      
      return {
        attention: 0.5 + Math.sin(newTime * 0.2) * 0.3,
        activity: 0.3 + Math.sin(newTime * 0.1) * 0.2 + newThoughtIntensity * 0.4,
        focus: new THREE.Vector3(
          Math.sin(newTime * 0.08) * 2,
          Math.cos(newTime * 0.12) * 2,
          Math.sin(newTime * 0.05) * 2
        ),
        thoughtIntensity: newThoughtIntensity,
        lastThought: newLastThought,
        deepThinking: newDeepThinking,
        learningStrength: newLearningStrength,
        knowledgeCluster: newKnowledgeCluster,
        processingMode: newProcessingMode,
        heartbeat: heartbeatWave,
        heartbeatPhase: heartbeatCycle,
        heartbeatIntensity: newHeartbeatIntensity,
        lastHeartbeat: newLastHeartbeat,
        breathing: breathingWave,
        breathingPhase: breathingCycle,
        temperature: newTemperature,
        bloodFlow: bloodFlowWave,
        nervousResponse: nervousWave,
        metabolicRate: newMetabolicRate,
        oxygenLevel: newOxygenLevel,
        stress: newStress,
        fatigue: newFatigue
      };
    });
    
    // "神経回路"の知的活動
    if (meshRef.current && meshRef.current.geometry) {
      const geometry = meshRef.current.geometry;
      const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute;
      
      if (colorAttribute) {
        const colors = colorAttribute.array as Float32Array;
        const baseColor = new THREE.Color('#8f2c34');
        
        for (let i = 0; i < circuitParams.main.length && i * 6 < colors.length; i++) {
          const param = circuitParams.main[i];
          
          // 処理モードに応じた強化
          let modeBoost = 0;
          if (brainState.processingMode === 'analyzing' && param.importance > 0.6) {
            modeBoost = brainState.thoughtIntensity * 0.6;
          } else if (brainState.processingMode === 'generating' && param.isCore) {
            modeBoost = brainState.thoughtIntensity * 0.7;
          } else if (brainState.processingMode === 'deep-think') {
            modeBoost = brainState.thoughtIntensity * (param.isCore ? 0.9 : 0.4);
          }
          
          // 学習による経路強化
          let learningBoost = 0;
          if (brainState.learningStrength > 0.1 && (newTime - param.lastActivity) < 2) {
            learningBoost = brainState.learningStrength * 0.5;
          }
          
          // 生体機能に連動した複合的な活動レベル
          const heartbeatBoost = brainState.heartbeat * brainState.heartbeatIntensity * 0.15;
          const breathingBoost = brainState.breathing * 0.05;
          const bloodFlowBoost = brainState.bloodFlow * 0.08;
          const temperatureBoost = (brainState.temperature - 37.0) * 0.1;
          const oxygenBoost = (brainState.oxygenLevel - 0.95) * 0.3;
          const fatigueReduction = brainState.fatigue * -0.1;
          
          // コア回路は"注意"レベルに応じて活動
          const attentionBoost = param.isCore ? brainState.attention * 0.3 : 0;
          
          const pulse = Math.sin(newTime * param.frequency + param.phase) * param.amplitude + 0.7;
          const vitalSigns = heartbeatBoost + breathingBoost + bloodFlowBoost + temperatureBoost + oxygenBoost + fatigueReduction;
          const intensity = pulse + modeBoost + learningBoost + attentionBoost + vitalSigns;
          
          // 体温に応じた色調変化
          const colorTemperature = baseColor.clone();
          if (brainState.temperature > 37.5) {
            colorTemperature.lerp(new THREE.Color('#af4c54'), 0.1); // 熱で赤く
          } else if (brainState.temperature < 36.8) {
            colorTemperature.lerp(new THREE.Color('#6f8c94'), 0.1); // 冷えで青く
          }
          
          const brightColor = colorTemperature.multiplyScalar(Math.min(intensity, 2.2));
          
          colors[i * 6] = brightColor.r;
          colors[i * 6 + 1] = brightColor.g;
          colors[i * 6 + 2] = brightColor.b;
          colors[i * 6 + 3] = brightColor.r;
          colors[i * 6 + 4] = brightColor.g;
          colors[i * 6 + 5] = brightColor.b;
          
          // 活動記録の更新
          if (intensity > 1.2) {
            param.lastActivity = newTime;
          }
        }
        colorAttribute.needsUpdate = true;
      }
    }
    
    // "記憶回路"の穏やかな活動
    if (auxRef.current && auxRef.current.geometry) {
      const geometry = auxRef.current.geometry;
      const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute;
      
      if (colorAttribute) {
        const colors = colorAttribute.array as Float32Array;
        const baseColor = new THREE.Color('#8f2c34');
        
        for (let i = 0; i < circuitParams.aux.length && i * 6 < colors.length; i++) {
          const param = circuitParams.aux[i];
          
          // 記憶回路は過去の活動に基づいてゆっくり光る
          let memoryGlow = 0;
          if (param.isMemory && (newTime - param.lastActivity) < 5) {
            memoryGlow = Math.exp(-(newTime - param.lastActivity) / 3) * 0.4;
          }
          
          // 補助回路にも生体機能の影響を追加（弱め）
          const auxHeartbeatBoost = brainState.heartbeat * brainState.heartbeatIntensity * 0.08;
          const auxBreathingBoost = brainState.breathing * 0.03;
          const auxBloodFlowBoost = brainState.bloodFlow * 0.04;
          const auxVitalSigns = auxHeartbeatBoost + auxBreathingBoost + auxBloodFlowBoost;
          
          const pulse = Math.sin(newTime * param.frequency + param.phase) * param.amplitude + 0.5;
          const intensity = pulse + memoryGlow + brainState.activity * param.importance + auxVitalSigns;
          const brightColor = baseColor.clone().multiplyScalar(Math.min(intensity, 1.5));
          
          colors[i * 6] = brightColor.r;
          colors[i * 6 + 1] = brightColor.g;
          colors[i * 6 + 2] = brightColor.b;
          colors[i * 6 + 3] = brightColor.r;
          colors[i * 6 + 4] = brightColor.g;
          colors[i * 6 + 5] = brightColor.b;
        }
        colorAttribute.needsUpdate = true;
      }
    }
    
    // "ニューロン"の知的発火パターン
    if (lightPointsRef.current && lightPointsRef.current.geometry) {
      const geometry = lightPointsRef.current.geometry;
      const sizeAttribute = geometry.getAttribute('size') as THREE.BufferAttribute;
      const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute;
      
      if (sizeAttribute && colorAttribute) {
        const sizes = sizeAttribute.array as Float32Array;
        const colors = colorAttribute.array as Float32Array;
        
        for (let i = 0; i < neuronParams.length; i++) {
          const neuron = neuronParams[i];
          
          // "注意の焦点"と"知識クラスター"の両方に反応
          const distanceToFocus = neuron.position.distanceTo(brainState.focus);
          const focusInfluence = Math.max(0, 1 - distanceToFocus / 3) * brainState.attention;
          
          const distanceToCluster = neuron.position.distanceTo(brainState.knowledgeCluster);
          const clusterInfluence = Math.max(0, 1 - distanceToCluster / 2.5) * brainState.learningStrength;
          
          // 接続されたニューロンからの"信号伝播"（連鎖反応）
          let connectionFire = 0;
          let chainReaction = 0;
          for (const connectedIdx of neuron.connections) {
            if (neuronParams[connectedIdx]?.firing) {
              connectionFire += neuronParams[connectedIdx].fireStrength * 0.4;
              // 連鎖反応の確率を上げる
              if (Math.random() < 0.3) {
                chainReaction += 0.2;
              }
            }
          }
          
          // 深い思考モードでの同期発火
          let deepThoughtSync = 0;
          if (brainState.deepThinking && Math.random() < 0.15) {
            deepThoughtSync = brainState.thoughtIntensity * 0.8;
          }
          
          // 処理モードに応じた発火パターン
          let modeInfluence = 0;
          if (brainState.processingMode === 'analyzing' && neuron.frequency > 1.5) {
            modeInfluence = brainState.thoughtIntensity * 0.3;
          } else if (brainState.processingMode === 'generating' && neuron.frequency < 1.2) {
            modeInfluence = brainState.thoughtIntensity * 0.4;
          }
          
          // 生体機能に連動したニューロンの基本活動レベル
          const heartbeatPulse = brainState.heartbeat * brainState.heartbeatIntensity * 0.12;
          const breathingPulse = brainState.breathing * 0.06;
          const bloodFlowPulse = brainState.bloodFlow * 0.05;
          const nervousSystemPulse = brainState.nervousResponse * brainState.stress * 0.04;
          const metabolicPulse = (brainState.metabolicRate - 1.0) * 0.03;
          const vitalPulse = heartbeatPulse + breathingPulse + bloodFlowPulse + nervousSystemPulse + metabolicPulse;
          
          const basePulse = Math.sin(newTime * neuron.frequency + neuron.phase) * neuron.amplitude + 0.5;
          const totalIntensity = basePulse + focusInfluence + clusterInfluence + connectionFire + chainReaction + deepThoughtSync + modeInfluence + vitalPulse;
          
          // ニューロンの発火状態を更新（より動的な閾値）
          const firingThreshold = brainState.deepThinking ? 0.6 : 0.8;
          neuron.firing = totalIntensity > firingThreshold;
          neuron.fireStrength = Math.min(totalIntensity, 1.4);
          
          // 色の変化：処理モードに応じて色調を微調整
          const colorShift = new THREE.Color('#8f2c34');
          if (brainState.processingMode === 'analyzing') {
            colorShift.lerp(new THREE.Color('#6f4c94'), 0.2); // より青紫がかった色
          } else if (brainState.processingMode === 'generating') {
            colorShift.lerp(new THREE.Color('#af3c44'), 0.2); // より明るい赤
          } else if (brainState.processingMode === 'deep-think') {
            colorShift.lerp(new THREE.Color('#4f6c84'), 0.3); // 深い青色
          }
          
          // サイズと色の更新（生命活動とともに脈動）
          const vitalSizeBoost = (brainState.heartbeat * brainState.heartbeatIntensity * 3) + 
                                (brainState.breathing * 1.5) + 
                                (brainState.bloodFlow * 2);
          sizes[i] = 3 + totalIntensity * 12 + vitalSizeBoost;
          
          // 生命活動時に明るく光る + 酸素レベルで明度調整
          const vitalBrightness = (brainState.heartbeat * brainState.heartbeatIntensity * 0.3) + 
                                 (brainState.breathing * 0.1) + 
                                 (brainState.oxygenLevel * 0.2);
          
          // 疲労度で色を微調整
          const fatigueColor = colorShift.clone();
          if (brainState.fatigue > 0.5) {
            fatigueColor.lerp(new THREE.Color('#6f6c84'), brainState.fatigue * 0.2); // 疲労で暗く
          }
          
          const neuronColor = fatigueColor.multiplyScalar(0.7 + totalIntensity * 1.5 + vitalBrightness);
          colors[i * 3] = neuronColor.r;
          colors[i * 3 + 1] = neuronColor.g;
          colors[i * 3 + 2] = neuronColor.b;
        }
        
        sizeAttribute.needsUpdate = true;
        colorAttribute.needsUpdate = true;
      }
    }
    
  });

  wireframeGeometry.setAttribute('color', new THREE.BufferAttribute(mainColors, 3));
  auxiliaryLines.setAttribute('color', new THREE.BufferAttribute(auxColors, 3));
  lightPoints.setAttribute('color', new THREE.BufferAttribute(lightPointColors, 3));
  lightPoints.setAttribute('size', new THREE.BufferAttribute(lightPointSizes, 1));

  return (
    <group ref={groupRef}>
      {/* メインワイヤーフレーム */}
      <lineSegments ref={meshRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.85}
          linewidth={3}
        />
      </lineSegments>
      
      {/* 補助ライン */}
      <lineSegments ref={auxRef} geometry={auxiliaryLines}>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.4}
          linewidth={2}
        />
      </lineSegments>
      
      {/* 線上の光点（丸く） */}
      <points ref={lightPointsRef} geometry={lightPoints}>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.9}
          size={8}
          sizeAttenuation={false}
          blending={THREE.AdditiveBlending}
          map={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d')!;
            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
        />
      </points>
      
    </group>
  );
}

export default function AnimatedSphere({ color }: { color?: string }) {
  return (
    <Canvas 
      dpr={[1, 2]} 
      frameloop="demand"
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* ライティング */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8f2c34" />
      <pointLight position={[-10, -5, 5]} intensity={0.2} color="#8f2c34" />
      
      <WireframeSphere color={color} />
    </Canvas>
  );
}