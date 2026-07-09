// New utility file for PII-related functions
export const piiPatterns = {
  name: {
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
    replacement: '[NAME]'
  },
  ssn: {
    pattern: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    replacement: '[SSN]'
  },
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[EMAIL]'
  },
  phone: {
    pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    replacement: '[PHONE]'
  },
  dob: {
    pattern: /\b(0[1-9]|1[0-2])[\/.-](0[1-9]|[12]\d|3[01])[\/.-](19|20)\d{2}\b/g,
    replacement: '[DOB]'
  },
  address: {
    pattern: /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Circle|Cir|Trail|Trl|Parkway|Pkwy|Place|Pl)\b/gi,
    replacement: '[ADDRESS]'
  },
  creditCard: {
    pattern: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g,
    replacement: '[CREDIT_CARD]'
  },
  amount: {
    pattern: /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g,
    replacement: '[AMOUNT]'
  }
};

export const checkForPII = (text: string) => {
  const detected: Array<{
    type: string;
    value: string;
    replacement: string;
  }> = [];

  Object.entries(piiPatterns).forEach(([type, { pattern, replacement }]) => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      detected.push({
        type,
        value: match[0],
        replacement
      });
    }
  });

  return detected;
};

export const anonymizeText = (text: string, detectedPII: Array<{
  type: string;
  value: string;
  replacement: string;
}>) => {
  let anonymized = text;
  detectedPII.forEach(({ value, replacement }) => {
    anonymized = anonymized.replace(value, replacement);
  });
  return anonymized;
}; 