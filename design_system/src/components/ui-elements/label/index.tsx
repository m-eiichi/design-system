import { useMemo } from "react";
import clsx from "clsx";
import { createStyle } from "./styles";

import { LabelProps } from "./types";

export const Label = ({
  style,
  as,
  color = "primary",
  size,
  margin = "none",
  fontWeight,
  fontSize,
  display,
  children,
}: LabelProps) => {
  // デフォルトタグとサイズをメモ化して計算を最適化
  const { defaultSize, As } = useMemo(() => {
    // レスポンシブ値から文字列値を取得するヘルパー関数
    const getStringValue = (
      value: string | object | undefined,
    ): string | undefined => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object" && "sp" in value) {
        const spValue = (value as { sp: string }).sp;
        return typeof spValue === "string" ? spValue : undefined;
      }
      return undefined;
    };

    // sizeに基づいてデフォルトのタグを決定（asが指定されている場合は処理しない）
    const getDefaultTag = () => {
      if (as) return undefined; // asが指定されている場合はデフォルトタグを適用しない

      const sizeValue = getStringValue(size);
      if (sizeValue) {
        switch (sizeValue) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return sizeValue; // h1-h6サイズ → 対応するh1-h6タグ
          default:
            return "p"; // body, caption等 → pタグ
        }
      }
      return "p"; // デフォルトはpタグ
    };

    // asに基づいてデフォルトのサイズを決定
    // sizeが指定されていない場合のみ使用される
    const getDefaultSize = () => {
      if (!as) return undefined; // asがない場合はデフォルトサイズを適用しない

      switch (as) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return as; // h1-h6タグ → 対応するh1-h6サイズ
        case "p":
        case "span":
        case "a":
          return "body"; // p, span, aタグ → bodyサイズ
        default:
          return "body"; // その他 → bodyサイズ
      }
    };

    const defaultTag = getDefaultTag();
    const defaultSize = getDefaultSize();
    const As = as || defaultTag || "p"; // asが優先、なければdefaultTag、それもなければp

    return { defaultSize, As };
  }, [as, size]);

  const { classNames, inlineStyles } = createStyle({
    color,
    display,
    fontWeight,
    fontSize,
    // sizeが指定されていない場合はdefaultSizeを使用
    size: size || defaultSize,
    margin,
  });

  return (
    <As
      className={clsx(classNames)} // Typography クラスを追加
      style={
        Object.keys(inlineStyles).length > 0
          ? { ...style, ...inlineStyles }
          : style
      }
    >
      {children}
    </As>
  );
};
