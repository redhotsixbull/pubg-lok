"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResultDisplay from "./ResultDisplay";

interface Result {
  label: string;
  value: string;
}

export default function VerticalSensitivityCalculator() {
  // 수직 감도 계산기 입력값
  const [verticalInputs, setVerticalInputs] = useState(["", "", ""]);
  const [verticalResults, setVerticalResults] = useState<Result[]>([]);

  // DPI 변경 계산기 입력값
  const [dpiInputs, setDpiInputs] = useState(["", "", ""]);
  const [dpiResults, setDpiResults] = useState<Result[]>([]);

  // PUBG eDPI 계산기 입력값
  const [pubgInputs, setPubgInputs] = useState(["", ""]);
  const [pubgResults, setPubgResults] = useState<Result[]>([]);

  // 공통 입력 핸들러
  const handleInputChange = (
    section: "vertical" | "dpi" | "pubg",
    index: number,
    value: string
  ) => {
    if (section === "vertical") {
      const updated = [...verticalInputs];
      updated[index] = value;
      setVerticalInputs(updated);

      // 숫자가 모두 유효할 때만 계산
      if (updated.every((v) => v !== "" && !isNaN(Number(v)))) {
        calculateVertical(updated);
      } else {
        setVerticalResults([]);
      }
    } else if (section === "dpi") {
      const updated = [...dpiInputs];
      updated[index] = value;
      setDpiInputs(updated);

      if (updated.every((v) => v !== "" && !isNaN(Number(v)))) {
        calculateDpi(updated);
      } else {
        setDpiResults([]);
      }
    } else {
      const updated = [...pubgInputs];
      updated[index] = value;
      setPubgInputs(updated);

      if (updated.every((v) => v !== "" && !isNaN(Number(v)))) {
        calculatePubg(updated);
      } else {
        setPubgResults([]);
      }
    }
  };

  // 수직 감도 계산
  const calculateVertical = (inputs: string[]) => {
    try {
      const [current, currentVertical, newSens] = inputs.map(parseFloat);
      const diff = newSens - current;
      const ratio = Math.pow(2, diff / 15);
      const newVertical = currentVertical / ratio;

      setVerticalResults([
        { label: "감도 차이", value: diff.toFixed(2) },
        { label: "감도 계산 비율", value: `${ratio.toFixed(4)}%` },
        { label: "변경할 감도의 수직감도 값", value: newVertical.toString() },
        {
          label: "반올림",
          value: (Math.round(newVertical * 100) / 100).toFixed(2),
        },
        {
          label: "버림",
          value: (Math.floor(newVertical * 100) / 100).toFixed(2),
        },
      ]);
    } catch {
      setVerticalResults([{ label: "오류", value: "잘못된 입력" }]);
    }
  };

  // DPI 변경 계산
  const calculateDpi = (inputs: string[]) => {
    try {
      const [currentSens, currentDpi, newDpi] = inputs.map(parseFloat);
      const diff = Math.log(currentDpi / newDpi) / Math.log(2);
      const result = currentSens + 15 * diff;

      setDpiResults([
        { label: "DPI 차이", value: diff.toFixed(2) },
        { label: "감도 배율", value: result.toFixed(2) },
      ]);
    } catch {
      setDpiResults([{ label: "오류", value: "잘못된 입력" }]);
    }
  };

  // PUBG eDPI 계산
  const calculatePubg = (inputs: string[]) => {
    try {
      const [dpi, sens] = inputs.map(parseFloat);
      const standardDpi = 800;
      const standardSens = 11;
      //const standardEdpi = (standardDpi * standardSens) / 11;
      const dpiDiff = Math.log(dpi / standardDpi) / Math.log(2);
      const mySens = sens + 15 * dpiDiff;


      const result = standardDpi * 2 ** ((mySens - standardSens) / 15);

      setPubgResults([{ label: "eDPI", value: result.toFixed(2) }]);
    } catch {
      setPubgResults([{ label: "오류", value: "잘못된 입력" }]);
    }
  };

  // 재사용 가능한 입력 필드 렌더러
  const renderInputGroup = (
    section: "vertical" | "dpi" | "pubg",
    labels: string[]
  ) => {
    const inputs =
      section === "vertical"
        ? verticalInputs
        : section === "dpi"
          ? dpiInputs
          : pubgInputs;

    return labels.map((label, index) => (
      <div key={index} className="space-y-2">
        <Label>{label}</Label>
        <Input
          type="number"
          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          value={inputs[index]}
          onChange={(e) => handleInputChange(section, index, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      {/* 수직 감도 */}
      <Card className="bg-card text-foreground border border-border shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            수직감도 계산기
          </h2>
          {renderInputGroup("vertical", [
            "기존 감도",
            "기존 수직 감도",
            "변경할 감도",
          ])}
          <ResultDisplay results={verticalResults} />
        </CardContent>
      </Card>

      {/* DPI 변경 */}
      <Card className="bg-card text-foreground border border-border shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-primary">DPI 변경</h2>
          {renderInputGroup("dpi", ["기존 감도", "기본 DPI", "변경할 DPI"])}
          <ResultDisplay results={dpiResults} />
        </CardContent>
      </Card>

      {/* PUBG eDPI */}
      <Card className="bg-card text-foreground border border-border shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-primary">
            PUBG eDPI 계산기
          </h2>
          {renderInputGroup("pubg", ["내 DPI", "내 감도"])}
          <ResultDisplay results={pubgResults} />
        </CardContent>
      </Card>
    </div>
  );
}
