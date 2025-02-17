export const convertJSXToReactNative = (jsxCode) => {
  const replacements = {
    div: "View",
    span: "Text",
    p: "Text",
    h1: "Text",
    h2: "Text",
    h3: "Text",
    h4: "Text",
    h5: "Text",
    h6: "Text",
    img: "Image",
    button: "Pressable",
    // Agrega más elementos según sea necesario
  };

  const usedComponents = new Set();

  const converted = jsxCode.replace(
    /<\/?([a-zA-Z0-9]+)([^>]*)>/g,
    (match, tag) => {
      const replacement = replacements[tag.toLowerCase()];
      if (replacement) {
        usedComponents.add(replacement);
        const isClosingTag = match.startsWith("</");
        return isClosingTag ? `</${replacement}>` : `<${replacement}>`;
      }
      return match;
    }
  );

  const imports = `import { ${Array.from(usedComponents).join(", ")} } from 'react-native';`;

  return `${imports}\n\n${converted}`;
};
