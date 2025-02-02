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
import { AlertTriangle, Check } from "lucide-react";

interface PIIShieldProps {
  isOpen: boolean;
  onClose: () => void;
  detectedPII: {
    type: string;
    value: string;
  }[];
  onAnonymize: () => void;
  onProceed: () => void;
}

export function PIIShield({ isOpen, onClose, detectedPII, onAnonymize, onProceed }: PIIShieldProps) {
  const [showAnonymizePreview, setShowAnonymizePreview] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Warning: Sensitive Information Detected
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription>
          <div className="space-y-4">
            <p>The following sensitive information was detected:</p>
            <ul className="space-y-2">
              {detectedPII.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>{item.type}:</strong> {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </DialogDescription>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button onClick={onAnonymize} className="flex-1">
              Anonymize Information
            </Button>
            <Button onClick={onProceed} variant="outline" className="flex-1">
              Proceed Anyway
            </Button>
            <Button onClick={onClose} variant="ghost" className="flex-1">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 