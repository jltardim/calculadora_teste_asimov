"use client";

import * as React from "react";
import { useState } from "react";
import { Divide, Minus, Plus, X } from "lucide-react";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

interface CalculatorProps {
  className?: string;
}

type Operation = "add" | "subtract" | "multiply" | "divide";

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFirstNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNumber(Number(e.target.value));
  };

  const handleSecondNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondNumber(Number(e.target.value));
  };

  const handleOperationChange = (value: string) => {
    setOperation(value as Operation);
  };

  const calculateResult = () => {
    setError(null);
    
    switch (operation) {
      case "add":
        setResult(firstNumber + secondNumber);
        break;
      case "subtract":
        setResult(firstNumber - secondNumber);
        break;
      case "multiply":
        setResult(firstNumber * secondNumber);
        break;
      case "divide":
        if (secondNumber === 0) {
          setError("Não é possível dividir por zero");
          setResult(null);
        } else {
          setResult(firstNumber / secondNumber);
        }
        break;
    }
  };

  const getOperationSymbol = () => {
    switch (operation) {
      case "add": return "+";
      case "subtract": return "-";
      case "multiply": return "×";
      case "divide": return "÷";
    }
  };

  return (
    <Card className={cn("w-full max-w-md p-6", className)}>
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center text-foreground">Calculadora</div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first-number">Primeiro número</Label>
            <div className="relative">
              <Input
                id="first-number"
                type="number"
                value={firstNumber}
                onChange={handleFirstNumberChange}
                className="pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-l-none"
                  onClick={() => setFirstNumber(firstNumber - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-l-none"
                  onClick={() => setFirstNumber(firstNumber + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operation">Operação</Label>
            <Select value={operation} onValueChange={handleOperationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma operação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Adição (+)</SelectItem>
                <SelectItem value="subtract">Subtração (-)</SelectItem>
                <SelectItem value="multiply">Multiplicação (×)</SelectItem>
                <SelectItem value="divide">Divisão (÷)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="second-number">Segundo número</Label>
            <div className="relative">
              <Input
                id="second-number"
                type="number"
                value={secondNumber}
                onChange={handleSecondNumberChange}
                className="pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-l-none"
                  onClick={() => setSecondNumber(secondNumber - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full rounded-l-none"
                  onClick={() => setSecondNumber(secondNumber + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={calculateResult}
          >
            Calcular
          </Button>

          {(result !== null || error) && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              {error ? (
                <p className="text-destructive font-medium">{error}</p>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Resultado:</p>
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                    <span>{firstNumber}</span>
                    <span>{getOperationSymbol()}</span>
                    <span>{secondNumber}</span>
                    <span>=</span>
                    <span className="text-primary">{result}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

function CalculatorDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Calculator />
    </div>
  );
}

export default CalculatorDemo;
