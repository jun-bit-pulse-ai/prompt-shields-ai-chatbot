"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, User, Calendar, Home, Users } from "lucide-react";

interface PIIShieldProps {
  isOpen: boolean;
  onClose: () => void;
  detectedPII: {
    type: string;
    value: string;
    replacement?: string;
  }[];
  onAnonymize: (anonymizedText: string) => void;
  onProceed: () => void;
  originalText: string;
}

export function PIIShield({
  isOpen,
  onClose,
  detectedPII,
  onAnonymize,
  onProceed,
  originalText
}: PIIShieldProps) {
  const [showPreview, setShowPreview] = useState(false);

  const getAnonymizedText = () => {
    let text = originalText;
    detectedPII.forEach(({ value, replacement }) => {
      text = text.replace(value, replacement || `[REDACTED-${value.type}]`);
    });
    return text;
  };

  const handleAnonymize = () => {
    const anonymizedText = getAnonymizedText();
    onAnonymize(anonymizedText);
  };

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'name': return <User className="h-5 w-5" />;
      case 'dob': return <Calendar className="h-5 w-5" />;
      case 'address': return <Home className="h-5 w-5" />;
      case 'family': return <Users className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Warning: Sensitive Information Detected
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription>
          <div className="space-y-4">
            <p className="font-medium text-gray-700">
              The following sensitive information was detected:
            </p>
            <ul className="space-y-2">
              {detectedPII.map((item, index) => (
                <li key={index} className="flex items-center gap-2 bg-white rounded-md p-3 shadow-sm">
                  {getIconForType(item.type)}
                  <div>
                    <strong>{item.type}:</strong>
                    <p className="mt-1">
                      <span className="line-through text-red-500">{item.value}</span>
                      {item.replacement && (
                        <span className="text-green-500"> → {item.replacement}</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {showPreview && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-bold mb-2">Preview of anonymized text:</h4>
                <p>{getAnonymizedText()}</p>
              </div>
            )}
          </div>
        </DialogDescription>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleAnonymize}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white"
          >
            Anonymize Information
          </Button>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button
            onClick={onProceed}
            variant="outline"
            className="w-full sm:w-auto text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            Proceed Without Anonymizing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 