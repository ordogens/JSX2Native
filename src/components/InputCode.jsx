import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/InputCode.css";

export const InputCode = ({ code, onCodeChange }) => {
  const monaco = useMonaco();
  const [themeDefined, setThemeDefined] = useState(false);

  useEffect(() => {
    if (monaco && !themeDefined) {
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e1e99",
          "editor.border": "#00000000",
          focusBorder: "#00000000",
        },
      });
      setThemeDefined(true);
    }
  }, [monaco, themeDefined]);

  useEffect(() => {
    if (monaco) {
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordAtPosition(position);
          const suggestions = [
            {
              label: "console.log",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "console.log(${1});",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
            {
              label: "let",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "let ${1};",
            },
            {
              label: "function",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "function ${1}() {${2}}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ];

          if (word) {
            return {
              suggestions: suggestions.filter((suggestion) =>
                suggestion.label.startsWith(word.word)
              ),
            };
          }
          return { suggestions };
        },
      });

      monaco.languages.setMonarchTokensProvider("html", {
        tokenizer: {
          root: [
            [/<[^/]*$/, "tag.open"],
            [/<\/[^>]*$/, "tag.close"],
          ],
        },
      });
    }
  }, [monaco]);

  return (
    <div className="InputCode">
      <Editor
        defaultLanguage="javascript"
        theme={themeDefined ? "custom-dark" : "vs-dark"}
        value={code}
        onChange={onCodeChange}
        loading={
          <div style={{ color: "#000", textAlign: "center" }}>
            Loading editor...
          </div>
        }
        options={{
          lineNumbersMinChars: 3,
          padding: { top: 10, bottom: 10 },
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
};

InputCode.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};
