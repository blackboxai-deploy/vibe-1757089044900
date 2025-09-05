"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VoiceInputState {
  isRecording: boolean;
  isProcessing: boolean;
  transcript: string;
  confidence: number;
}

export function VoiceInput() {
  const [voiceState, setVoiceState] = useState<VoiceInputState>({
    isRecording: false,
    isProcessing: false,
    transcript: "",
    confidence: 0
  });

  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);

  // Simulate audio level animation when recording
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (voiceState.isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
        setRecordingTime(prev => prev + 1);
      }, 100);
    } else {
      setAudioLevel(0);
      setRecordingTime(0);
    }

    return () => clearInterval(interval);
  }, [voiceState.isRecording]);

  const startRecording = () => {
    setVoiceState({
      isRecording: true,
      isProcessing: false,
      transcript: "",
      confidence: 0
    });
  };

  const stopRecording = () => {
    setVoiceState(prev => ({
      ...prev,
      isRecording: false,
      isProcessing: true
    }));

    // Simulate processing and speech-to-text conversion
    setTimeout(() => {
      const samplePhrases = [
        "What are the best crops to grow in monsoon?",
        "Show me wheat prices in my area",
        "Tell me about government farming schemes",
        "How is the weather forecast for next week?",
        "What fertilizer should I use for tomatoes?"
      ];
      
      const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
      
      setVoiceState({
        isRecording: false,
        isProcessing: false,
        transcript: randomPhrase,
        confidence: 85 + Math.random() * 15 // 85-100% confidence
      });
    }, 2000);
  };

  const clearTranscript = () => {
    setVoiceState({
      isRecording: false,
      isProcessing: false,
      transcript: "",
      confidence: 0
    });
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAudioBars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-green-500 rounded-full transition-all duration-100 ${
          voiceState.isRecording ? 'animate-pulse' : ''
        }`}
        style={{
          height: voiceState.isRecording 
            ? `${Math.max(4, (audioLevel + i * 10) % 40)}px` 
            : '4px'
        }}
      />
    ));
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg h-fit">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">Voice Assistant</h3>
          <p className="text-sm text-gray-600">Speak your farming questions</p>
        </div>

        {/* Voice Input Interface */}
        <div className="flex flex-col items-center space-y-4">
          {/* Microphone Button */}
          <div className="relative">
            <Button
              onClick={voiceState.isRecording ? stopRecording : startRecording}
              disabled={voiceState.isProcessing}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                voiceState.isRecording 
                  ? 'bg-red-500 hover:bg-red-600 scale-110' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {voiceState.isProcessing ? (
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </Button>
            
            {/* Recording pulse animation */}
            {voiceState.isRecording && (
              <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-red-300 animate-ping" />
            )}
          </div>

          {/* Audio Level Visualization */}
          <div className="flex items-end space-x-1 h-8">
            {getAudioBars()}
          </div>

          {/* Recording Status */}
          <div className="text-center">
            {voiceState.isRecording && (
              <div className="space-y-1">
                <Badge className="bg-red-100 text-red-800">
                  Recording... {formatRecordingTime(recordingTime)}
                </Badge>
                <p className="text-xs text-gray-600">Tap to stop recording</p>
              </div>
            )}
            
            {voiceState.isProcessing && (
              <div className="space-y-1">
                <Badge className="bg-blue-100 text-blue-800">
                  Processing speech...
                </Badge>
                <p className="text-xs text-gray-600">Converting to text</p>
              </div>
            )}
            
            {!voiceState.isRecording && !voiceState.isProcessing && (
              <p className="text-xs text-gray-600">
                Tap to start voice input
              </p>
            )}
          </div>
        </div>

        {/* Transcript Display */}
        {voiceState.transcript && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500">Transcript</span>
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(voiceState.confidence)}% confidence
                </Badge>
              </div>
              <p className="text-gray-800 font-medium">{voiceState.transcript}</p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  // Future: Process the voice command
                  console.log("Processing voice command:", voiceState.transcript);
                }}
              >
                Process Command
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={clearTranscript}
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Voice Commands Help */}
        <div className="text-center">
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer hover:text-gray-800">
              Voice command examples
            </summary>
            <div className="mt-2 space-y-1 text-left">
              <div>• "What crops should I plant?"</div>
              <div>• "Show me weather forecast"</div>
              <div>• "Government schemes for farmers"</div>
              <div>• "Crop market prices today"</div>
            </div>
          </details>
        </div>
      </div>
    </Card>
  );
}