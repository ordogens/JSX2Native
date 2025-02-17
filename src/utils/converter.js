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
  };

  const cssToRN = {
    "background-color": "backgroundColor",
    "font-size": "fontSize",
    "text-align": "textAlign",
    "font-weight": "fontWeight",
    "line-height": "lineHeight",
    "margin-top": "marginTop",
    "margin-right": "marginRight",
    "margin-bottom": "marginBottom",
    "margin-left": "marginLeft",
    "padding-top": "paddingTop",
    "padding-right": "paddingRight",
    "padding-bottom": "paddingBottom",
    "padding-left": "paddingLeft",
    "border-radius": "borderRadius",
    "box-shadow": "shadowColor",
  };

  const usedComponents = new Set(["StyleSheet"]);
  const styles = {};
  let styleCount = 0;

  jsxCode = jsxCode.replace(/<\/([a-zA-Z0-9]+)>/g, (_, tag) => {
    return `</${replacements[tag] || tag}>`;
  });

  const converted = jsxCode.replace(
    /<([a-zA-Z0-9]+)([^>]*)>/g,
    (_, tag, attributes) => {
      const replacement = replacements[tag.toLowerCase()] || tag;

      usedComponents.add(replacement);

      let newAttributes = attributes;

      const styleMatch = attributes.match(/style=["']([^"']+)["']/);
      if (styleMatch) {
        const cssRules = styleMatch[1].split(";").map((rule) => rule.trim());
        let rnStyles = {};

        cssRules.forEach((rule) => {
          if (rule) {
            const [property, value] = rule.split(":").map((str) => str.trim());
            if (cssToRN[property]) {
              const cleanValue = value.replace(/px$/, "");
              rnStyles[cssToRN[property]] = isNaN(cleanValue)
                ? `"${cleanValue}"`
                : parseFloat(cleanValue);
            }
          }
        });

        const styleName = `style${styleCount++}`;
        styles[styleName] = rnStyles;
        newAttributes = newAttributes.replace(
          styleMatch[0],
          `style={styles.${styleName}}`
        );
      }

      return `<${replacement}${newAttributes}>`;
    }
  );

  const imports = `import { ${Array.from(usedComponents).join(", ")} } from 'react-native';`;

  const stylesObject = `const styles = StyleSheet.create({\n${Object.entries(
    styles
  )
    .map(
      ([name, style]) =>
        `  ${name}: {\n${Object.entries(style)
          .map(([key, value]) => `    ${key}: ${value},`)
          .join("\n")}\n  },`
    )
    .join("\n")}\n});`;

  return `${imports}\n\n${converted}\n\n${stylesObject}`;
};
