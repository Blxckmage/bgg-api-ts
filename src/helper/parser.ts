import { XMLParser } from "fast-xml-parser";
import type { X2jOptions, validationOptions } from "fast-xml-parser";

const xmlParserOptions: Partial<X2jOptions & validationOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseAttributeValue: true,
  parseTagValue: true,
};

export const parseXml = (xmlData: string) => {
  const parser = new XMLParser(xmlParserOptions);

  return parser.parse(xmlData);
};
